export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BASE_URL = 'https://www.rezaivision.de';

  // Statische Routen, die immer existieren (gleiche wie in PAGES im SEO Manager, ohne admin etc.)
  const staticRoutes = [
    '', // Home
    '/leistungen',
    '/leistungen/unternehmensfilm',
    '/leistungen/recruiting',
    '/leistungen/werbevideo',
    '/leistungen/social-media',
    '/leistungen/webdesign',
    '/reza-e-motion',
    '/reza-e-motion/eventbegleitung',
    '/reza-e-motion/musikvideos',
    '/reza-e-motion/hochzeitsfilme',
    '/preisrechner',
    '/ueber-uns',
    '/technik',
    '/faq',
    '/glossar',
    '/blog',
    '/kontakt',
    '/impressum',
    '/datenschutz',
    '/agb'
  ];

  let dynamicRoutes = [];

  try {
    // Hole Blog-Posts dynamisch via Firestore REST API (um Node.js Firebase SDK Probleme auf Vercel zu umgehen)
    const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/rezaivisioncms/databases/(default)/documents/blogPosts';
    const response = await fetch(firestoreUrl);
    
    if (response.ok) {
      const data = await response.json();
      if (data.documents && Array.isArray(data.documents)) {
        data.documents.forEach(doc => {
          // Die Document ID ist der letzte Teil des "name" Pfades
          const parts = doc.name.split('/');
          const slug = parts[parts.length - 1];
          // Wir nehmen an, dass der slug in der URL verwendet wird
          if (slug && doc.fields?.slug?.stringValue) {
            dynamicRoutes.push(`/blog/${doc.fields.slug.stringValue}`);
          } else if (slug) {
            dynamicRoutes.push(`/blog/${slug}`);
          }
        });
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error);
    // Wir machen trotzdem weiter und liefern zumindest die statischen Routen aus.
  }

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Generiere XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>${route === '' || route === '/blog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 24h
  res.status(200).send(sitemap);
}
