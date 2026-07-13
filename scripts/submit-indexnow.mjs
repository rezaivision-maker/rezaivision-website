// Meldet die Sitemap-URLs per IndexNow an Bing/Yandex/Seznam (NICHT Google).
// Läuft am Ende des Builds. Bricht NIE ab (bei Fehler nur Hinweis).
//
// Verifizierung: die Datei public/<KEY>.txt (mit dem KEY als Inhalt) muss unter
// https://www.rezaivision.de/<KEY>.txt erreichbar sein (Vite kopiert public/ -> dist/).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'www.rezaivision.de';
const KEY = 'c2036e4e172de6b1407877f20e2c1dca';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const sm = path.resolve(ROOT, 'dist/sitemap.xml');
  if (!fs.existsSync(sm)) {
    console.log('[indexnow] Keine dist/sitemap.xml gefunden — übersprungen.');
    return;
  }
  const xml = fs.readFileSync(sm, 'utf-8');
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urlList.length) {
    console.log('[indexnow] Keine URLs in der Sitemap — übersprungen.');
    return;
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    });
    // IndexNow: 200 = angenommen, 202 = angenommen (Key-Prüfung ausstehend).
    if (res.ok || res.status === 202) {
      console.log(`[indexnow] ${urlList.length} URLs an Bing/Yandex gemeldet (HTTP ${res.status}).`);
    } else {
      console.warn(`[indexnow] HTTP ${res.status}: ${(await res.text()).slice(0, 200)} — Build läuft weiter.`);
    }
  } catch (err) {
    console.warn('[indexnow] Fehler beim Melden:', err.message, '— Build läuft weiter.');
  }
}

main();
