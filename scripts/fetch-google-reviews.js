// Holt die LIVE Google-Bewertungen (Schnitt + Anzahl) und schreibt sie nach
// src/data/googleReviews.json. Läuft beim Build vor `vite build`.
//
// Aktivierung: in den Environment Variables setzen
//   GOOGLE_PLACES_API_KEY = dein Google Places API Key
//   GOOGLE_PLACE_ID       = die Place-ID deines Google-Business-Profils
//
// Place-ID finden: https://developers.google.com/maps/documentation/places/web-service/place-id
//
// Ist kein Key/keine Place-ID gesetzt (oder die API antwortet nicht), bleibt die
// vorhandene Fallback-Datei unverändert — der Build bricht NIE ab.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../src/data/googleReviews.json');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

async function main() {
  if (!API_KEY || !PLACE_ID) {
    console.log('[google-reviews] Kein GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID gesetzt — nutze Fallback.');
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
