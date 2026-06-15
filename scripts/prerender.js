import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 54321;
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://www.rezaivision.de';

const staticRoutes = [
  '/',
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
  '/preise',
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

async function fetchDynamicBlogRoutes() {
  const dynamicRoutes = [];
  try {
    const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/rezaivisioncms/databases/(default)/documents/blogPosts';
    const response = await fetch(firestoreUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.documents && Array.isArray(data.documents)) {
        data.documents.forEach(doc => {
          const parts = doc.name.split('/');
          const slug = parts[parts.length - 1];
          if (slug && doc.fields?.slug?.stringValue) {
            dynamicRoutes.push(`/blog/${doc.fields.slug.stringValue}`);
          } else if (slug) {
            dynamicRoutes.push(`/blog/${slug}`);
          }
        });
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic routes:', error);
  }
  return dynamicRoutes;
}

function generateSitemap(routes) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(route => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>${route === '' || route === '/' || route === '/blog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' || route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated!');
}

async function startServer() {
  const app = express();
  app.use(express.static(DIST_DIR));
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`Static server listening on port ${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  console.log('Fetching dynamic routes...');
  const dynamicRoutes = await fetchDynamicBlogRoutes();
  const sitemapRoutes = [...staticRoutes, ...dynamicRoutes];
  generateSitemap(sitemapRoutes);

  // We want to prerender staticRoutes plus a fake 404 route to generate 404.html
  const renderRoutes = [...staticRoutes, '/404-not-found-page'];

  console.log('Starting prerendering HTML...');

  for (const route of renderRoutes) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`Prerendering ${route}...`);
    
    try {
      // Use networkidle2 because analytics or external scripts might keep connections open
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Give the app time to mount
      await new Promise(r => setTimeout(r, 2500));
  
      const html = await page.content();
      
      if (route === '/404-not-found-page') {
        const filePath = path.join(DIST_DIR, '404.html');
        fs.writeFileSync(filePath, html);
        console.log(`Saved ${filePath}`);
      } else {
        const isRoot = route === '/';
        const folderPath = isRoot ? DIST_DIR : path.join(DIST_DIR, route);
        
        if (!isRoot) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        
        const filePath = path.join(folderPath, 'index.html');
        fs.writeFileSync(filePath, html);
        console.log(`Saved ${filePath}`);
      }
    } catch (err) {
      console.error(`Failed to prerender ${route}:`, err.message);
    }
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(console.error);
