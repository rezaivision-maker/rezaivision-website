export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  // Cache the sitemap on edge for 1 hour, and allow background updates
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  // Parser helper for German date strings (e.g. "15. April 2026" -> "2026-04-15")
  function parseGermanDate(dateStr) {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    const parts = dateStr.trim().split(' ');
    if (parts.length !== 3) return new Date().toISOString().split('T')[0];
    
    const day = parts[0].replace('.', '').padStart(2, '0');
    const monthName = parts[1].toLowerCase()
      .replace('ä', 'ae')
      .replace('ö', 'oe')
      .replace('ü', 'ue');
    const year = parts[2];
    
    const months = {
      januar: '01',
      februar: '02',
      maerz: '03',
      april: '04',
      mai: '05',
      juni: '06',
      juli: '07',
      august: '08',
      september: '09',
      oktober: '10',
      november: '11',
      dezember: '12'
    };
    
    const month = months[monthName] || '01';
    return `${year}-${month}-${day}`;
  }

  // 1. Fetch dynamic posts from Firestore REST API
  let posts = [];
  try {
    const response = await fetch('https://firestore.googleapis.com/v1/projects/rezaivisioncms/databases/(default)/documents/posts?pageSize=300');
    if (response.ok) {
      const data = await response.json();
      if (data.documents) {
        posts = data.documents.map(doc => {
          const fields = doc.fields;
          return {
            slug: fields.slug?.stringValue || '',
            date: fields.date?.stringValue || ''
          };
        }).filter(p => p.slug !== '');
      }
    }
  } catch (error) {
    console.error('Error fetching posts for dynamic sitemap:', error);
  }

  // 2. Fallback static posts if Firestore is empty
  // (We use a hardcoded list of the original 33 slugs to make sure sitemap is never empty)
  const fallbackSlugs = [
    { slug: 'imagefilm-unternehmen-was-bringt-er-wirklich', date: '2026-05-02' },
    { slug: 'imagefilm-kosten-was-kostet-ein-unternehmensfilm', date: '2026-05-02' },
    { slug: 'recruiting-video-unternehmen-2026', date: '2026-05-02' },
    { slug: 'recruiting-video-kaiserslautern-sichtbarer-arbeitgeber', date: '2026-05-02' },
    { slug: 'social-media-videos-fuer-unternehmen', date: '2026-05-02' },
    { slug: 'werbevideo-unternehmen-was-es-leisten-muss', date: '2026-05-02' },
    { slug: 'vertrauen-aufbauen-mit-videos', date: '2026-05-02' },
    { slug: 'videoproduktion-kaiserslautern-worauf-achten', date: '2026-05-02' },
    { slug: 'unternehmensvideo-erstellen-fehler-vermeiden', date: '2026-05-02' },
    { slug: 'videos-fuer-unternehmen-kaiserslautern', date: '2026-05-02' },
    { slug: 'recruitingvideo-pfalz-fachkraefte-gewinnen', date: '2026-05-02' },
    { slug: 'wedding-content-creator-vs-videograf-kaiserslautern', date: '2026-05-02' },
    { slug: 'artist-support-musikvideo-rlp', date: '2026-05-02' },
    { slug: 'hybrid-video-production-ki-kmu-kaiserslautern', date: '2026-05-02' },
    { slug: 'hochzeitsvideo-locations-kaiserslautern-villa-denis', date: '2026-05-02' },
    { slug: 'recruiting-handwerk-kaiserslautern-video-vs-stellenanzeige', date: '2026-05-02' },
    { slug: 'social-media-video-flatrate-pfalz-unternehmen', date: '2026-05-02' },
    { slug: 'authentische-mitarbeitergewinnung-kaiserslautern-vertrauen', date: '2026-05-02' },
    { slug: 'top-musikvideo-locations-rlp-lost-places', date: '2026-05-02' },
    { slug: 'effiziente-content-erstellung-kmu-videoproduktion-kaiserslautern', date: '2026-05-02' },
    { slug: 'social-media-content-kaiserslautern-agentur', date: '2026-05-02' },
    { slug: 'content-creator-kaiserslautern-video-formate', date: '2026-05-02' },
    { slug: 'was-kostet-ein-professionelles-2-minuten-video', date: '2026-05-02' },
    { slug: 'wie-erstellt-man-ein-unternehmensvorstellungsvideo', date: '2026-05-02' },
    { slug: 'was-bedeutet-3-sekunden-videoaufrufe', date: '2026-05-02' },
    { slug: 'goldene-regel-der-videobearbeitung-80-20', date: '2026-05-02' },
    { slug: 'mitarbeiter-vor-der-kamera-locker-machen', date: '2026-05-02' }
  ];

  const finalPosts = posts.length > 0 
    ? posts.map(p => ({ slug: p.slug, date: parseGermanDate(p.date) }))
    : fallbackSlugs;

  // 3. Build XML String
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Hauptseiten -->
  <url>
    <loc>https://www.rezaivision.de/</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/leistungen</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/referenzen</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/preise</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/ueber-uns</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/technik</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/kontakt</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- B2B Leistungsseiten -->
  <url>
    <loc>https://www.rezaivision.de/leistungen/unternehmensfilm</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/leistungen/recruiting</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/leistungen/werbevideo</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/leistungen/social-media</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- reza-e-motion (B2C) -->
  <url>
    <loc>https://www.rezaivision.de/reza-e-motion</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/reza-e-motion/eventbegleitung</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/reza-e-motion/musikvideos</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/reza-e-motion/hochzeitsfilme</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Wissenswertes -->
  <url>
    <loc>https://www.rezaivision.de/faq</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/glossar</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.rezaivision.de/blog</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Dynamische Magazin / Blog Artikel -->`;

  finalPosts.forEach(post => {
    xml += `
  <url>
    <loc>https://www.rezaivision.de/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `
  
  <!-- Rechtliches -->
  <url>
    <loc>https://www.rezaivision.de/datenschutz</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  res.status(200).send(xml);
}
