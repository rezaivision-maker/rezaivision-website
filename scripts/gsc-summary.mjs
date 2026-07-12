// Einmal-Abruf: GSC Search-Analytics-Zusammenfassung (letzte 28 Tage).
// Read-only. Nutzt Service-Account aus .env. node scripts/gsc-summary.mjs
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'sc-domain:rezaivision.de';

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

async function token(email, key) {
  const now = Math.floor(Date.now() / 1000);
  const enc = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({ iss: email, scope: 'https://www.googleapis.com/auth/webmasters.readonly', aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now })}`;
  const s = crypto.createSign('RSA-SHA256'); s.update(unsigned);
  const jwt = `${unsigned}.${s.sign(key.replace(/\\n/g, '\n'), 'base64url')}`;
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }) });
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).access_token;
}

async function query(tok, body) {
  const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) return { rows: [], error: await r.text() };
  return r.json();
}

function d(offset) { const x = new Date(Date.now() - offset * 86400000); return x.toISOString().slice(0, 10); }

async function main() {
  loadEnv();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !key) { console.log('Kein Service-Account.'); return; }
  const tok = await token(email, key);
  const start = d(30), end = d(2);
  console.log(`Zeitraum: ${start} bis ${end}\n`);

  const tot = await query(tok, { startDate: start, endDate: end, dimensions: ['date'], rowLimit: 1000 });
  if (tot.error) { console.log('GSC-Fehler:', tot.error.slice(0, 200)); return; }
  const rows = tot.rows || [];
  const sum = rows.reduce((a, r) => ({ c: a.c + r.clicks, i: a.i + r.impressions }), { c: 0, i: 0 });
  console.log(`GESAMT: ${sum.c} Klicks · ${sum.i} Impressionen · CTR ${sum.i ? (100 * sum.c / sum.i).toFixed(1) : 0}%`);

  const q = await query(tok, { startDate: start, endDate: end, dimensions: ['query'], rowLimit: 15 });
  console.log('\nTOP-SUCHANFRAGEN (Klicks · Impr · Pos):');
  (q.rows || []).forEach(r => console.log(`  ${r.clicks}·${r.impressions}·${r.position.toFixed(1)}  ${r.keys[0]}`));
  if (!(q.rows || []).length) console.log('  (keine)');

  const p = await query(tok, { startDate: start, endDate: end, dimensions: ['page'], rowLimit: 12 });
  console.log('\nTOP-SEITEN (Klicks · Impr):');
  (p.rows || []).forEach(r => console.log(`  ${r.clicks}·${r.impressions}  ${r.keys[0].replace('https://www.rezaivision.de', '')}`));
  if (!(p.rows || []).length) console.log('  (keine)');
}
main().catch(e => console.log('Fehler:', e.message.slice(0, 200)));
