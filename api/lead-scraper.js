// api/lead-scraper.js
// Lead Generation via Google Places API + AI enrichment
// Legal: Google Places API is official and ToS-compliant for business data

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;
  const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const GEMINI_KEY = process.env.GEMINI_API_KEY;

  // ══════════════════════════════════════
  // ACTION: Search businesses via Google Places API
  // ══════════════════════════════════════
  if (action === 'search-places' && req.method === 'POST') {
    if (!PLACES_KEY) {
      return res.status(503).json({
        error: 'GOOGLE_PLACES_API_KEY nicht konfiguriert.',
        setup: [
          '1. Gehe zu console.cloud.google.com',
          '2. Erstelle ein Projekt und aktiviere "Places API (New)"',
          '3. Erstelle einen API Key unter APIs & Services → Credentials',
          '4. Füge ihn in Vercel ein als: GOOGLE_PLACES_API_KEY=dein_key',
        ],
        fallback: true
      });
    }

    const { query, location, radius = 15000, maxResults = 20 } = req.body;
    // query: z.B. "Pflegeheim" or "Autohaus" or "Zahnarzt"
    // location: z.B. "Kaiserslautern, Germany" or "48.1351,11.5820" (lat,lng)

    if (!query || !location) {
      return res.status(400).json({ error: 'query and location are required' });
    }

    try {
      // Step 1: Geocode location to coordinates if it's a text string
      let lat, lng;
      if (location.includes(',') && !isNaN(parseFloat(location.split(',')[0]))) {
        [lat, lng] = location.split(',').map(Number);
      } else {
        // Use Google Geocoding API
        const geoRes = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${PLACES_KEY}`
        );
        const geoData = await geoRes.json();
        if (!geoData.results?.[0]) {
          return res.status(400).json({ error: `Standort "${location}" nicht gefunden.` });
        }
        lat = geoData.results[0].geometry.location.lat;
        lng = geoData.results[0].geometry.location.lng;
      }

      // Step 2: Text Search via Places API (New)
      const placesRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': PLACES_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.types,places.businessStatus,places.googleMapsUri',
        },
        body: JSON.stringify({
          textQuery: `${query} in ${location}`,
          locationBias: {
            circle: { center: { latitude: lat, longitude: lng }, radius: radius }
          },
          maxResultCount: Math.min(maxResults, 20),
          languageCode: 'de',
        })
      });

      const placesData = await placesRes.json();

      if (!placesRes.ok) {
        return res.status(400).json({ error: 'Google Places API Fehler', details: placesData });
      }

      const places = (placesData.places || []).map((p) => ({
        id: p.id,
        name: p.displayName?.text || 'Unbekannt',
        address: p.formattedAddress || '',
        phone: p.nationalPhoneNumber || p.internationalPhoneNumber || '',
        website: p.websiteUri || '',
        rating: p.rating || null,
        reviewCount: p.userRatingCount || 0,
        types: p.types || [],
        status: p.businessStatus || 'OPERATIONAL',
        googleMapsUrl: p.googleMapsUri || '',
        // Derived fields for CRM
        email: '', // Will be enriched separately
        notes: '',
        leadScore: p.rating ? Math.round(p.rating * 20) : 50, // Simple lead score 0-100
        source: 'Google Places',
        addedAt: new Date().toISOString(),
      }));

      return res.status(200).json({
        success: true,
        total: places.length,
        location: { lat, lng, query: location },
        places,
      });

    } catch (e) {
      console.error('Places API error:', e);
      return res.status(500).json({ error: 'Fehler bei der Suche: ' + e.message });
    }
  }

  // ══════════════════════════════════════
  // ACTION: AI-powered lead enrichment
  // ══════════════════════════════════════
  if (action === 'enrich-lead' && req.method === 'POST') {
    if (!GEMINI_KEY) return res.status(503).json({ error: 'GEMINI_API_KEY not configured.' });

    const { business } = req.body;
    if (!business) return res.status(400).json({ error: 'business data required' });

    const prompt = `
Du bist ein Lead-Qualifizierungs-Experte für eine Videoproduktions-Agentur (Rezai Vision, Kaiserslautern).
Analysiere dieses Unternehmen und erstelle ein Lead-Profil.

Unternehmen: ${business.name}
Adresse: ${business.address}
Website: ${business.website || 'Unbekannt'}
Telefon: ${business.phone || 'Unbekannt'}
Google-Bewertung: ${business.rating || 'Keine'} (${business.reviewCount || 0} Bewertungen)
Branchen-Tags: ${(business.types || []).join(', ')}

Erstelle ein JSON-Lead-Profil:
{
  "branche": "Genaue Branche (z.B. Pflegeheim, Autohaus, Zahnarztpraxis)",
  "potential": "Hoch | Mittel | Niedrig",
  "potential_begruendung": "Warum ist dieses Unternehmen ein guter Lead für Videoproduktion?",
  "hauptschmerzen": ["Schmerz 1", "Schmerz 2"],
  "video_ideen": ["Video-Idee 1", "Video-Idee 2", "Video-Idee 3"],
  "ansprache_empfehlung": "Wie sollte man dieses Unternehmen ansprechen?",
  "erstkontak_vorlage": "Kurze, personalisierte Erstkontakt-Nachricht (2-3 Sätze)",
  "budget_schaetzung": "Geschätztes Video-Budget (z.B. 2.000-5.000€)",
  "kontakt_kanal": "Telefon | E-Mail | LinkedIn | Vor Ort"
}

Antworte NUR mit dem JSON.
    `;

    try {
      const gemRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3 } })
        }
      );
      const gemData = await gemRes.json();
      const raw = gemData?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const clean = raw.replace(/^```json\n?/m, '').replace(/^```\n?/m, '').replace(/\n?```$/m, '').trim();
      return res.status(200).json({ success: true, enrichment: JSON.parse(clean) });
    } catch (e) {
      return res.status(500).json({ error: 'AI enrichment failed' });
    }
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
