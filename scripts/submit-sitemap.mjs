// Reicht die Sitemap bei der Google Search Console neu ein (API, Service-Account).
// Schreibrechte-Scope 'webmasters'. node scripts/submit-sitemap.mjs
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'sc-domain:rezaivision.de';
const SITEMAP = 'https://www.rezaivision.de/sitemap.xml';

function loadEnv() {
  const p = path.resolve(ROOT, '.env');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!(m[1] in process.env)) process.env[m[1]] = v;
  }
}

async function token(email, key, scope) {
  const now = Math.floor(Date.now() / 1000);
  const enc = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({ iss: email, scope, aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now })}`;
  const s = crypto.createSign('RSA-SHA256'); s.update(unsigned);
  const jwt = `${unsigned}.${s.sign(key.replace(/\\n/g, '\n'), 'base64url')}`;
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }) });
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).access_token;
}

async function main() {
  loadEnv();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !key) { console.log('Kein Service-Account in .env.'); return; }
  const tok = await token(email, key, 'https://www.googleapis.com/auth/webmasters');

  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps/${encodeURIComponent(SITEMAP)}`;

  // 1) Neu einreichen (PUT)
  const put = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${tok}` } });
  console.log(put.ok ? `✓ Sitemap eingereicht: ${SITEMAP}` : `✗ Submit-Fehler ${put.status}: ${(await put.text()).slice(0, 200)}`);

  // 2) Status abfragen (GET)
  const get = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
  if (get.ok) {
    const d = await get.json();
    console.log('\nStatus laut GSC:');
    console.log('  lastSubmitted:', d.lastSubmitted || '—');
    console.log('  lastDownloaded:', d.lastDownloaded || '(noch nicht erneut abgerufen)');
    console.log('  isPending:', d.isPending, '· errors:', d.errors || 0, '· warnings:', d.warnings || 0);
    const c = (d.contents || [])[0];
    if (c) console.log('  URLs eingereicht:', c.submitted, '· indexiert (GSC-Zählung):', c.indexed);
  } else {
    console.log('Status-Abfrage-Fehler:', get.status);
  }
}
main().catch(e => console.log('Fehler:', e.message.slice(0, 200)));
