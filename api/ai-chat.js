// api/ai-chat.js
// Upgraded to support:
// - Gemini 1.5 Pro (for video understanding via YouTube URLs)
// - Gemini 2.0 Flash (for fast text tasks)
// - Video URL analysis via YouTube URI parts
// - Image analysis via base64 or URL
// - Integrated Video Intelligence (analyze, rebuild, format-finder modes) to optimize Serverless slots

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    prompt, 
    systemInstruction, 
    videoUrl, 
    imageUrl, 
    model: requestedModel,
    mode,          // 'analyze' | 'rebuild' | 'format-finder'
    text,          // caption / hook / script text
    niche,         // e.g. "Recruiting"
    platform,      // 'instagram' etc
    clientContext, // for rebuild
    analysisResult // for rebuild
  } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
  }

  // ══════════════════════════════════════════════════════
  // IF A MODE IS SPECIFIED (Video Intelligence Integration)
  // ══════════════════════════════════════════════════════
  if (mode) {
    // Mode: analyze
    if (mode === 'analyze') {
      const isYouTube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
      const parts = [];

      if (isYouTube) {
        parts.push({
          file_data: { mime_type: 'video/mp4', file_uri: videoUrl }
        });
      }

      const platformContext = platform ? `Plattform: ${platform.toUpperCase()}` : '';
      const urlContext = videoUrl && !isYouTube
        ? `Video URL: ${videoUrl}\n(Hinweis: Analysiere anhand der URL-Struktur, des Textes und des Kontexts)`
        : '';

      const systemPrompt = `
Du bist der weltweit beste Video-Stratege und Kauf-Psychologe, spezialisiert auf Viral-Content und Performance-Marketing für Social Media.
Du sezierst Videos wie ein Chirurg: du verstehst was in der ERSTEN SEKUNDE passiert, welche EMOTION ausgelöst wird, warum jemand NICHT wegscrollt, wie der SOUND die Psyche manipuliert und warum der CTA konvertiert.
Antworte IMMER auf Deutsch. Sei konkret, präzise, und praxisorientiert.
      `;

      const analysisPrompt = `
${platformContext}
${urlContext}
${text ? `Caption / Hook / Script:\n"${text}"` : ''}
${niche ? `Nische: ${niche}` : ''}

${isYouTube ? 'Analysiere dieses Video vollständig.' : 'Analysiere diesen Content vollständig.'}

Erstelle eine tiefe, strukturierte Analyse in folgendem JSON-Format:

{
  "zusammenfassung": "1-2 Sätze: Was macht dieses Video/Content so erfolgreich?",
  
  "hook": {
    "sekunden": "0-3",
    "text": "Exakter Hook-Text",
    "mechanismus": "FOMO / Neugier / Schock / Empathie / Widerspruch / ...",
    "warum_es_funktioniert": "Psychologische Erklärung",
    "emotion": "Welche Emotion wird sofort ausgelöst?"
  },
  
  "struktur": [
    {"zeitstempel": "0-5s", "was_passiert": "...", "psychologie": "..."},
    {"zeitstempel": "5-15s", "was_passiert": "...", "psychologie": "..."},
    {"zeitstempel": "15-30s", "was_passiert": "...", "psychologie": "..."},
    {"zeitstempel": "30-45s", "was_passiert": "...", "psychologie": "..."},
    {"zeitstempel": "45-60s", "was_passiert": "...", "psychologie": "..."}
  ],
  
  "copy_analyse": {
    "schluessel_woerter": ["Wort1", "Wort2", "Wort3"],
    "trigger_phrasen": ["Phrase 1", "Phrase 2"],
    "storytelling_typ": "Before/After | Problem/Lösung | Transformation | ...",
    "tonalitaet": "Beschreibung des Tons",
    "frameworks": ["PAS", "AIDA", "Storytelling", "Social Proof", ...]
  },
  
  "sound_strategie": {
    "musik_tempo": "langsam / mittel / schnell / dynamisch",
    "musik_stimmung": "emotional / motivierend / dramatisch / entspannend / ...",
    "soundeffekte": ["Effekt 1", "Effekt 2"],
    "voice_tonalitaet": "authentisch / professionell / flüsternd / energetisch / ...",
    "warum_dieser_sound": "Psychologische Wirkung des Sounds auf die Zielgruppe"
  },
  
  "visuelle_sprache": {
    "schnitt_rhythmus": "schnell (0.5-1s) / mittel (2-3s) / langsam (3-5s)",
    "farbwelt": "Beschreibung",
    "kamera_stil": "handheld / statisch / drohne / close-up ...",
    "besondere_elemente": ["Text-Overlays", "Captions", "Zoom-Effekte", ...]
  },
  
  "psychologie_framework": {
    "hauptprinzip": "Das dominante Cialdini-Prinzip oder psychologische Trigger",
    "zielgruppen_schmerz": "Welcher spezifische Schmerz wird angesprochen?",
    "warum_kein_wegscrollen": "Der genaue Grund warum man dranbleibt",
    "vertrauen_aufbau": "Wie wird Glaubwürdigkeit aufgebaut?"
  },
  
  "cta_analyse": {
    "cta_text": "Exakter Text",
    "cta_timing": "Wann kommt der CTA",
    "cta_psychologie": "Warum dieser CTA funktioniert",
    "dringlichkeit": "Wie wird Urgency erzeugt?"
  },
  
  "erfolgs_faktoren": ["Faktor 1", "Faktor 2", "Faktor 3", "Faktor 4", "Faktor 5"],
  
  "schwaechen": ["Was könnte besser sein", "..."],
  
  "plattform_optimierung": {
    "warum_viral_auf_dieser_plattform": "...",
    "algorithmus_faktoren": ["Watch Time", "Saves", "Shares", "..."]
  }
}

Antworte NUR mit dem JSON-Objekt, ohne Markdown, ohne Codeblöcke, ohne zusätzlichen Text.
      `;

      parts.push({ text: analysisPrompt });

      try {
        const selectedModel = isYouTube ? 'gemini-1.5-pro' : 'gemini-2.0-flash';
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts }],
              system_instruction: { parts: [{ text: systemPrompt }] },
              generationConfig: { temperature: 0.4, maxOutputTokens: 8192 }
            })
          }
        );

        const data = await response.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const clean = raw.replace(/^```json\n?/m, '').replace(/^```\n?/m, '').replace(/\n?```$/m, '').trim();

        try {
          const parsed = JSON.parse(clean);
          return res.status(200).json({ success: true, analysis: parsed, model: selectedModel, source: isYouTube ? 'video' : 'text' });
        } catch {
          return res.status(200).json({ success: true, analysis: null, rawText: clean, model: selectedModel });
        }
      } catch (e) {
        return res.status(500).json({ error: 'Analysis failed: ' + e.message });
      }
    }

    // Mode: rebuild
    if (mode === 'rebuild') {
      if (!clientContext) return res.status(400).json({ error: 'clientContext is required for rebuild' });

      const systemPrompt = `
Du bist der kreativste Video-Direktor und Copywriter Deutschlands, spezialisiert auf datengetriebene Video-Produktion.
Du kennst jedes psychologische Verkaufsprinzip und weißt genau, wie man erfolgreiche Video-Formate für neue Nischen adaptiert.
Antworte auf Deutsch. Sei so konkret, dass man das sofort in die Kamera sprechen oder drehen kann.
      `;

      const rebuildPrompt = `
Hier ist die Analyse eines erfolgreichen Videos:
${analysisResult ? JSON.stringify(analysisResult, null, 2) : text}

Und hier ist der neue Kontext:
${clientContext}
${niche ? `Ziel-Nische: ${niche}` : ''}
${platform ? `Ziel-Plattform: ${platform}` : ''}

AUFGABE: Baue dieses erfolgreiche Format EXAKT für den neuen Kontext um.
Behalte die Struktur, den Rhythmus, die psychologischen Trigger — aber passe alles an die neue Nische an.

Antworte im JSON-Format:

{
  "titel": "Projekttitel für das neue Video",
  
  "angepasster_hook": {
    "text": "Exakter Hook-Text (sprechfertig)",
    "warum": "Warum dieser Hook für diese Zielgruppe funktioniert",
    "varianten": ["Variante A", "Variante B", "Variante C"]
  },
  
  "video_skript": [
    {
      "sekunden": "0-5s",
      "sprecher_text": "Exakter Text zum Vorlesen/Sprechen",
      "visual": "Was im Bild zu sehen ist",
      "ton": "Musik/Sound Anweisung"
    },
    {
      "sekunden": "5-15s",
      "sprecher_text": "...",
      "visual": "...",
      "ton": "..."
    },
    {
      "sekunden": "15-30s",
      "sprecher_text": "...",
      "visual": "...",
      "ton": "..."
    },
    {
      "sekunden": "30-45s",
      "sprecher_text": "...",
      "visual": "...",
      "ton": "..."
    },
    {
      "sekunden": "45-60s",
      "sprecher_text": "...",
      "visual": "...",
      "ton": "..."
    }
  ],
  
  "caption": {
    "instagram": "Fertige Instagram Caption mit Emojis und Hashtags",
    "tiktok": "Fertige TikTok Caption (kürzer, direkter)",
    "facebook": "Fertige Facebook Ad Text"
  },
  
  "sound_empfehlung": {
    "musik_stil": "...",
    "tempo_bpm": "ca. X BPM",
    "suno_prompt": "Fertiger Suno AI Prompt für die perfekte Hintergrundmusik",
    "sound_effekte": ["Effekt 1", "Effekt 2"]
  },
  
  "dreh_anweisungen": {
    "equipment": ["Kamera-Setup", "Licht-Setup"],
    "location": "Ideale Location Beschreibung",
    "shots": [
      {"shot": "Shot 1", "beschreibung": "...", "kamera": "..."},
      {"shot": "Shot 2", "beschreibung": "...", "kamera": "..."},
      {"shot": "Shot 3", "beschreibung": "...", "kamera": "..."}
    ]
  },
  
  "higgsfield_prompts": [
    "Prompt 1 (auf Englisch)",
    "Prompt 2 (auf Englisch)"
  ],
  
  "cta": {
    "text": "Exakter CTA Text",
    "timing": "Bei Sekunde X",
    "link_empfehlung": "Wohin sollte der Link zeigen?"
  }
}

Antworte NUR mit dem JSON, ohne Markdown, ohne Codeblöcke.
      `;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: rebuildPrompt }] }],
              system_instruction: { parts: [{ text: systemPrompt }] },
              generationConfig: { temperature: 0.65, maxOutputTokens: 8192 }
            })
          }
        );

        const data = await response.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const clean = raw.replace(/^```json\n?/m, '').replace(/^```\n?/m, '').replace(/\n?```$/m, '').trim();

        try {
          const parsed = JSON.parse(clean);
          return res.status(200).json({ success: true, rebuild: parsed });
        } catch {
          return res.status(200).json({ success: true, rebuild: null, rawText: clean });
        }
      } catch (e) {
        return res.status(500).json({ error: 'Rebuild failed: ' + e.message });
      }
    }

    // Mode: format-finder
    if (mode === 'format-finder') {
      if (!niche) return res.status(400).json({ error: 'niche is required' });

      const formatPrompt = `
Du bist ein datengetriebener Social Media Stratege. Analysiere die 7 erfolgreichsten Video-Formate für folgende Nische:

Nische: ${niche}
${platform ? `Hauptplattform: ${platform}` : 'Plattformen: Instagram, TikTok, Facebook'}

Antworte im JSON-Format:

{
  "nische": "${niche}",
  "markt_analyse": "Kurze Analyse: Was bewegt diese Zielgruppe? Was sind ihre größten Ängste und Wünsche?",
  
  "formate": [
    {
      "rang": 1,
      "name": "Format-Name",
      "beschreibung": "Was ist dieses Format",
      "warum_viral": "Psychologischer Grund für den Erfolg",
      "struktur": ["0-3s: Hook", "3-15s: Problem/Story", "15-45s: Lösung", "45-60s: CTA"],
      "hook_beispiele": ["Beispiel Hook 1", "Beispiel Hook 2", "Beispiel Hook 3"],
      "sound_typ": "Musiktyp / Ton",
      "beste_plattform": "Instagram | TikTok | Facebook",
      "schwierigkeitsgrad": "Einfach | Mittel | Komplex",
      "produktionszeit": "z.B. 2 Stunden",
      "conversion_potential": "Hoch | Sehr hoch | Mittel",
      "beispiel_nischen": ["Ähnliche Nischen wo das gut funktioniert"]
    }
  ],
  
  "top_hooks_fuer_nische": [
    "Fertiger Hook 1",
    "Fertiger Hook 2", 
    "Fertiger Hook 3",
    "Fertiger Hook 4",
    "Fertiger Hook 5"
  ],
  
  "psychologie_der_nische": {
    "hauptschmerzen": ["Schmerz 1", "Schmerz 2", "Schmerz 3"],
    "groesste_wuensche": ["Wunsch 1", "Wunsch 2", "Wunsch 3"],
    "vertrauen_aufbau": "So baut man Vertrauen in dieser Nische auf",
    "trigger_woerter": ["Wort 1", "Wort 2", "Wort 3", "Wort 4", "Wort 5"]
  },
  
  "content_kalender": {
    "woche_1": ["Format 1", "Format 2", "Format 3"],
    "woche_2": ["Format 4", "Format 5", "Format 1"],
    "woche_3": ["Format 2", "Format 3", "Format 6"],
    "woche_4": ["Format 7", "Format 4", "Format 1"]
  }
}

Antworte NUR mit dem JSON, ohne Markdown.
      `;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: formatPrompt }] }],
              generationConfig: { temperature: 0.5, maxOutputTokens: 8192 }
            })
          }
        );

        const data = await response.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const clean = raw.replace(/^```json\n?/m, '').replace(/^```\n?/m, '').replace(/\n?```$/m, '').trim();

        try {
          const parsed = JSON.parse(clean);
          return res.status(200).json({ success: true, formatData: parsed });
        } catch {
          return res.status(200).json({ success: true, formatData: null, rawText: clean });
        }
      } catch (e) {
        return res.status(500).json({ error: 'Format finder failed: ' + e.message });
      }
    }
  }

  // ══════════════════════════════════════════════════════
  // DEFAULT CHAT ROUTE (Gemini 2.0 / 1.5 Pro)
  // ══════════════════════════════════════════════════════
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  let model = 'gemini-2.0-flash';
  if (videoUrl || requestedModel === 'pro') {
    model = 'gemini-1.5-pro';
  } else if (requestedModel) {
    model = requestedModel;
  }

  try {
    const parts = [];

    if (videoUrl) {
      const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
      if (isYouTube) {
        parts.push({
          file_data: { mime_type: 'video/mp4', file_uri: videoUrl }
        });
      } else {
        parts.push({ text: `[Analyse dieses Videos: ${videoUrl}]` });
      }
    }

    if (imageUrl && !videoUrl) {
      try {
        const imgRes = await fetch(imageUrl);
        const imgBuffer = await imgRes.arrayBuffer();
        const base64 = Buffer.from(imgBuffer).toString('base64');
        const mimeType = imgRes.headers.get('content-type') || 'image/jpeg';
        parts.push({
          inline_data: { mime_type: mimeType, data: base64 }
        });
      } catch (e) {
        console.warn('Could not fetch image:', e);
      }
    }

    parts.push({ text: prompt });

    const payload = {
      contents: [{ parts }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
    };

    if (systemInstruction) {
      payload.system_instruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Gemini API Error (${model}):`, errorData);

      if (model === 'gemini-1.5-pro' && !videoUrl) {
        console.log('Retrying with gemini-2.0-flash...');
        payload.contents[0].parts = [{ text: prompt }];
        const fallbackRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
        );
        const fallbackData = await fallbackRes.json();
        const fallbackText = fallbackData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Keine Antwort generiert.';
        return res.status(200).json({ reply: fallbackText, model: 'gemini-2.0-flash-fallback' });
      }

      return res.status(response.status).json({ error: 'Failed to fetch from AI', details: errorData.substring(0, 500) });
    }

    const data = await response.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Keine Antwort generiert.';

    return res.status(200).json({ reply: textResponse, model });

  } catch (error) {
    console.error('Error communicating with AI:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
