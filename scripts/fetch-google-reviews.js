// Holt die LIVE Google-Bewertungen (Schnitt + Anzahl) und schreibt sie nach
// src/data/googleReviews.json. Läuft beim Build vor `vite build`.
//
// Aktivierung: trage in die Datei .env (im Projekt-Hauptordner) ein:
//   GOOGLE_PLACES_API_KEY=dein_google_places_api_key
//   GOOGLE_PLACE_ID=deine_google_place_id
//
// Wichtig: Weil der Build LOKAL läuft (Weg A), müssen die Werte in der lokalen
// .env stehen — NICHT bei Vercel.
//
// Place-ID finden: https://developers.google.com/maps/documentation/places/web-service/place-id
//
// Ohne Key/Place-ID (oder wenn die API nicht antwortet) bleibt die vorhandene
// Fallback-Datei unverändert — der Build bricht NIE ab.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../src/data/googleReviews.json');

// Lädt die .env-Datei (dependency-frei), ohne bereits gesetzte Variablen zu überschreiben.
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '../.env');
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    /* ignore */
  }
}

// Place-ID des Rezai Vision Google-Profils (öffentlich, kein Geheimnis).
// Kann bei Bedarf per GOOGLE_PLACE_ID in der .env überschrieben werden.
const DEFAULT_PLACE_ID = 'ChIJD7JhyphzlkcRd7x7mWqgUFg';

async function main() {
  loadEnv();

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;

  if (!API_KEY) {
    console.log('[google-reviews] Kein GOOGLE_PLACES_API_KEY in .env — nutze Fallback.');
    return;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
    });

    if (!res.ok) {
      console.warn(`[google-reviews] API-Status ${res.status} — Fallback bleibt erhalten.`);
      return;
    }

    const data = await res.json();
    const payload = {
      source: 'live',
      rating: typeof data.rating === 'number' ? data.rating : 5.0,
      userRatingCount: typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
      fetchedAt: new Date().toISOString(),
    };

    fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
    console.log(`[google-reviews] Live: ${payload.rating}★ aus ${payload.userRatingCount} Bewertungen.`);
  } catch (err) {
    console.warn('[google-reviews] Fehler beim Abruf:', err.message, '— Fallback bleibt erhalten.');
  }
}

main();
