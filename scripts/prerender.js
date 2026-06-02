import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.resolve(root, 'dist');
const dataDir = path.resolve(root, 'src', 'data');

// Extract blog slugs from blogPosts.ts
const extractBlogSlugs = () => {
  try {
    const content = fs.readFileSync(path.resolve(dataDir, 'blogPosts.ts'), 'utf-8');
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      slugs.push(match[1]);
    }
    return slugs.map(slug => `/blog/${slug}`);
  } catch (err) {
    console.error('Failed to parse blog posts:', err);
    return [];
  }
};

const routes = [
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
  '/preise',
  '/ueber-uns',
  '/technik',
  '/faq',
  '/glossar',
  '/blog',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/agb',
  ...extractBlogSlugs()
];

async function prerender() {
  console.log(`Starting prerender for ${routes.length} routes...`);

  const app = express();
  app.use(express.static(distDir));
  
  // SPA Fallback for all other routes
  app.use((req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
  });

  const port = 3456;
  const server = app.listen(port);
  console.log(`Local server running on http://localhost:${port}`);

  let browser;
  if (process.env.VERCEL) {
    console.log('Running on Vercel: Using @sparticuz/chromium');
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteerCore = (await import('puppeteer-core')).default;
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  
  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    const page = await browser.newPage();
    
    // Intercept useless requests to speed up rendering
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['image', 'media', 'font'].includes(resourceType) || req.url().includes('google-analytics') || req.url().includes('googletagmanager')) {
        req.abort();
      } else {
        req.continue();
      }
    });

    try {
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Give React a tiny bit more time just in case of lazy suspense
      await new Promise(r => setTimeout(r, 500));
      
      // Get the full HTML
      let html = await page.evaluate(() => document.documentElement.outerHTML);
      html = `<!DOCTYPE html>\n<html>\n${html.replace(/<html>/i, '')}`;

      // Save to file
      const routeDir = route === '/' ? distDir : path.resolve(distDir, route.substring(1));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.resolve(routeDir, 'index.html'), html);
      console.log(`✓ Saved ${route}`);
    } catch (err) {
      console.error(`✗ Failed to prerender ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log('Prerendering completed!');
}

prerender();
