// Einmal-Check: fragt für jede URL aus der Sitemap den echten Index-Status
// bei Google ab (URL Inspection API). Read-only, ändert nichts.
//
//   node scripts/check-indexing.mjs            # nur Blog-Artikel
//   node scripts/check-indexing.mjs --all      # alle URLs der Sitemap
//
// Braucht GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in .env.

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'sc-domain:rezaivision.de';
const onlyBlog = !process.argv.includes('--all');

function loadEnv() {
  const envPath = path.resolve(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}

async function getToken(email, privateKey) {
  const cleanKey = privateKey.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const enc = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({
    iss: email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsigned);
  const jwt = `${unsigned}.${sign.sign(cleanKey, 'base64url')}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Token-Fehler: ${await res.text()}`);
  return (await res.json()).access_token;
}

async function inspect(token, url) {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
  });
  if (!res.ok) return { error: `${res.status} ${await res.text()}`.slice(0, 200) };
  const r = (await res.json()).inspectionResult?.indexStatusResult || {};
  return { verdict: r.verdict, coverage: r.coverageState, lastCrawl: r.lastCrawlTime };
}

function urlsFromSitemap() {
  const sm = path.resolve(ROOT, 'dist/sitemap.xml');
  const xml = fs.readFileSync(sm, 'utf-8');
  const all = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return onlyBlog ? all.filter((u) => /\/blog\//.test(u)) : all;
}

async function main() {
  loadEnv();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !key) {
    console.error('Kein Service-Account in .env.');
    process.exit(1);
  }
  const token = await getToken(email, key);
  const urls = urlsFromSitemap();
  console.log(`Prüfe ${urls.length} URLs gegen ${SITE_URL} ...\n`);

  const buckets = { indexed: [], notIndexed: [], unknown: [], error: [] };
  for (const url of urls) {
    const r = await inspect(token, url);
    const short = url.replace('https://www.rezaivision.de', '');
    if (r.error) {
      buckets.error.push([short, r.error]);
      console.log(`❓ ERR   ${short}  ${r.error}`);
    } else if (r.verdict === 'PASS') {
      buckets.indexed.push(short);
      console.log(`✅ INDEX ${short}`);
    } else if (/unknown/i.test(r.coverage || '')) {
      buckets.unknown.push([short, r.coverage]);
      console.log(`⬜ UNBEK ${short}  (${r.coverage})`);
    } else {
      buckets.notIndexed.push([short, r.coverage]);
      console.log(`❌ NEIN  ${short}  (${r.coverage})`);
    }
    await new Promise((res) => setTimeout(res, 250)); // sanftes Rate-Limit
  }

  console.log('\n==================== ZUSAMMENFASSUNG ====================');
  console.log(`✅ Indexiert:        ${buckets.indexed.length}`);
  console.log(`❌ Nicht indexiert:  ${buckets.notIndexed.length}`);
  console.log(`⬜ Google unbekannt: ${buckets.unknown.length}`);
  console.log(`❓ Fehler:           ${buckets.error.length}`);
  if (buckets.notIndexed.length) {
    console.log('\nNoch NICHT indexiert (Status):');
    for (const [u, c] of buckets.notIndexed) console.log(`   ${u}  →  ${c}`);
  }
  if (buckets.unknown.length) {
    console.log('\nGoogle noch UNBEKANNT (nie gecrawlt):');
    for (const [u, c] of buckets.unknown) console.log(`   ${u}  →  ${c}`);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
