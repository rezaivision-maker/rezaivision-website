#!/usr/bin/env node
/**
 * prerender-blog.js – Rendert nur eine einzelne Blog-Route + die Blog-Übersicht
 * und aktualisiert die Sitemap. Kein vite build nötig!
 *
 * Verwendung:
 *   node scripts/prerender-blog.js mein-neuer-blog-slug
 *
 * Was passiert:
 *   1. Startet einen lokalen Server auf dem bestehenden dist/
 *   2. Prerendert /blog/<slug> (neuer Post) und /blog (Übersicht)
 *   3. Regeneriert die sitemap.xml mit der neuen Route
 */

const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 54322; // anderer Port als der volle Build
const BASE_URL = 'https://www.rezaivision.de';

// Statische Routen (gleich wie in prerender.js)
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

const NOINDEX_ROUTES = ['/impressum', '/datenschutz', '/agb'];

async function fetchDynamicBlogRoutes() {
  const dynamicRoutes = [];

  try {
    const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/rezaivisioncms/databases/(default)/documents/posts';
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
    console.error('Firestore fetch error:', error.message);
  }

  // Lokale Slugs als Fallback
  try {
    const filePath = path.resolve(__dirname, '../src/data/blogPosts.ts');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const slugRegex = /slug:\s*["']([^"']+)["']/g;
      let match;
      while ((match = slugRegex.exec(content)) !== null) {
        const route = `/blog/${match[1]}`;
        if (!dynamicRoutes.includes(route)) {
          dynamicRoutes.push(route);
        }
      }
    }
  } catch (error) {
    console.error('Local slug parse error:', error.message);
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
  console.log('✓ Sitemap aktualisiert');
}

async function prerenderRoute(page, route) {
  const url = `http://localhost:${PORT}${route}`;
  console.log(`Prerendering ${route}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2500));

    let html = await page.content();

    // Font media fix (wie in prerender.js)
    html = html.replace(
      /media="all" onload="this\.media='all'"/g,
      `media="print" onload="this.media='all'"`
    );

    // Hero-Preload nur auf Startseite
    if (route !== '/') {
      html = html.replace(/\s*<link\b[^>]*\brel="preload"[^>]*\bas="image"[^>]*>/g, '');
    }

    const folderPath = path.join(DIST_DIR, route);
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, 'index.html');
    fs.writeFileSync(filePath, html);
    console.log(`✓ Saved ${filePath}`);
  } catch (err) {
    console.error(`✗ Failed ${route}:`, err.message);
  }
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error('Usage: node scripts/prerender-blog.js <blog-slug>');
    console.error('Example: node scripts/prerender-blog.js mein-neuer-artikel');
    process.exit(1);
  }

  // Prüfe ob dist/ existiert
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.error('dist/ existiert nicht oder ist leer. Einmalig npm run build ausführen.');
    process.exit(1);
  }

  const blogRoute = `/blog/${slug}`;
  console.log(`\n🎬 Prerender: ${blogRoute} + /blog (Übersicht)\n`);

  // Server starten
  const app = express();
  app.use(express.static(DIST_DIR));
  app.use((req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));

  const server = await new Promise(resolve => {
    const s = app.listen(PORT, () => resolve(s));
  });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Nur die 2 relevanten Routen prerendern
  await prerenderRoute(page, blogRoute);
  await prerenderRoute(page, '/blog');

  // Sitemap mit allen Routen (inkl. neuer) regenerieren
  const dynamicRoutes = await fetchDynamicBlogRoutes();
  if (!dynamicRoutes.includes(blogRoute)) {
    dynamicRoutes.push(blogRoute);
  }
  const sitemapRoutes = [...staticRoutes, ...dynamicRoutes].filter(r => !NOINDEX_ROUTES.includes(r));
  generateSitemap(sitemapRoutes);

  await browser.close();
  server.close();
  console.log('\n✅ Fertig! Nur git add + commit + push nötig.\n');
}

main().catch(console.error);
