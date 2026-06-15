import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 54321;
const DIST_DIR = path.resolve(__dirname, '../dist');

const routes = [
  '/',
  '/leistungen/unternehmensfilm',
  '/leistungen/recruiting',
  '/leistungen/werbevideo',
  '/leistungen/social-media',
  '/leistungen/webdesign',
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

  console.log('Starting prerendering...');

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`Prerendering ${route}...`);
    
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for the app to hydrate and remove the initial loader
    await page.waitForFunction(() => !document.querySelector('.initial-loader'), { timeout: 10000 }).catch(() => {});
    
    // Give it an extra second for helmet to update tags
    await new Promise(r => setTimeout(r, 1000));

    const html = await page.content();
    
    // Save the file
    const isRoot = route === '/';
    const folderPath = isRoot ? DIST_DIR : path.join(DIST_DIR, route);
    
    if (!isRoot) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    const filePath = path.join(folderPath, 'index.html');
    fs.writeFileSync(filePath, html);
    console.log(`Saved ${filePath}`);
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(console.error);
