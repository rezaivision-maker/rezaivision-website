# Regeln & Anleitung für KI (Rezai Vision Website)

Diese Datei beschreibt, wie diese Website funktioniert und welche Befehle nach
Änderungen **zwingend** ausgeführt werden müssen, damit Google die Seiten korrekt
liest. KI-Assistenten lesen diese Datei zuerst.

---

## ⚠️ WICHTIGSTE REGEL — nach JEDER inhaltlichen Änderung

Diese Website wird vorgerendert (`dist/` = fertiges HTML für Google). Vercel baut
**nicht** selbst, sondern liefert nur den fertig gebauten `dist/`-Ordner aus.

**Seit 2026-07-14 baut ein GitHub-Actions-Workflow
(`.github/workflows/build-and-deploy.yml`) `dist/` bei jedem Push auf `main`
automatisch neu und committet es zurück.** Deshalb ist der bevorzugte Ablauf jetzt:

```bash
git pull                                    # WICHTIG: holt das von CI gebaute dist/
# ... Änderung in src/ machen ...
git add -A
git commit -m "kurze Beschreibung der Änderung"
git push                                    # CI baut dist/ + Vercel deployt (~3-4 Min)
```

**Kein lokales `npm run build` mehr nötig** — die CI übernimmt das. Wichtig ist nur:

1. **Immer `git pull` VOR** einer neuen Änderung (holt den letzten CI-`dist/`-Commit).
2. **`dist/` NIE selbst bauen/committen.** Nur `src/` (und Config, Docs) anfassen.
   Wenn du lokal baust UND committest, rennst du mit dem CI-Build um die Wette →
   `dist/`-Merge-Konflikte bei jedem Push (war der alte, mühsame Weg).

**Ausnahme — wenn du das Ergebnis lokal sofort prüfen willst:** `npm run build`
lokal ist weiterhin möglich (z.B. zum Testen mit `npm run preview`), aber dann
`dist/` NICHT committen — nur die `src/`-Änderung pushen und CI bauen lassen.

Die für den CI-Build nötigen Secrets (`GOOGLE_PLACES_API_KEY`,
`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`) liegen in
den GitHub-Actions-Secrets des Repos, nicht im Code.

---

## Warum das so ist (Hintergrund)

- Vercels Build-Server kann kein Headless-Chrome starten (fehlende System-Libraries
  wie `libnss3.so`). Darum scheitert Puppeteer-Prerendering auf Vercel.
- Lösung „Weg A": Wir rendern **lokal** (der Mac kann Chrome), committen den
  fertigen `dist/`-Ordner mit, und Vercel liefert ihn nur noch aus.
- Konfiguriert in `vercel.json` (`buildCommand` = nichts, `outputDirectory` = `dist`).
- `dist/` ist deshalb bewusst **nicht** in `.gitignore` — es wird mitgecommittet.

---

## ❌ Was NICHT gemacht werden soll

Diese Dinge haben in der Vergangenheit Probleme verursacht oder würden das
Deployment zerstören. Niemals tun, außer der Nutzer fordert es ausdrücklich:

1. **Nicht** versuchen, Puppeteer/Chrome auf Vercel laufen zu lassen.
   Das funktioniert nicht (fehlende System-Libraries, `libnss3.so`). Also **kein**
   `@sparticuz/chromium`, **kein** `puppeteer-core`, **kein** Prerendering im
   Vercel-Build. Wir rendern lokal (Weg A) — dabei bleibt es.
2. **Nicht** `dist/` wieder in `.gitignore` oder `.vercelignore` aufnehmen.
   `dist/` muss committet werden, sonst hat Vercel nichts zum Ausliefern.
3. **Nicht** den `buildCommand` / `outputDirectory` in `vercel.json` ändern.
   Vercel darf **nicht** selbst bauen.
4. **Nicht** `dist/` lokal bauen UND committen — das rennt mit dem automatischen
   CI-Build um die Wette und erzeugt bei jedem Push `dist/`-Merge-Konflikte. Nur
   `src/` committen, CI baut `dist/` (siehe „WICHTIGSTE REGEL" oben). Und **immer
   `git pull` vor** einer neuen Änderung.
5. **Nicht** `dist/` von Hand bearbeiten. Der Ordner wird komplett vom Build
   (lokal oder CI) erzeugt. Änderungen immer in `src/` machen.
6. **Nicht** an `vite.config.ts` (Chunking / Build-Optionen) herumschrauben, nur weil
   beim Build eine **Warnung** „chunk larger than 500 kB" erscheint. Das ist eine
   harmlose Warnung, **kein Fehler**. Die Seite funktioniert damit normal.
7. **Nicht** mehrere unzusammenhängende Probleme gleichzeitig anfassen. Ein Problem,
   eine Änderung, testen, dann das nächste. Lieber kleine, nachvollziehbare Schritte.
8. **Nicht** `venv/` (Python-Umgebung, ~860 MB) committen. Bleibt in `.gitignore`.
9. **Nicht** die `<SEO>`-Komponente aus einer Seite entfernen.
10. **Nicht** `/admin` oder `/portal` indexierbar machen (kein Prerender, kein Sitemap-Eintrag).
11. **Nicht** Meta-Descriptions mit Fragen oder Floskeln beginnen — immer mit dem Keyword.
12. **Nicht** echte API-Keys / Secrets in den Code schreiben. Die gehören in Vercel
    Environment Variables. (Die Firebase-Config in `src/lib/firebase.ts` ist öffentlich
    und in Ordnung — die ist absichtlich client-seitig.)
13. **Nicht** Zahlen, Bewertungen oder Knappheit erfinden. Bewertungen kommen aus
    ECHTEN Testimonials (`src/data/homeData.ts`) + Live-Google (`src/data/reviews.ts`).
    `aggregateRating` NUR auf der Startseite und nur passend zu den sichtbaren Reviews.
    Keine Fake-Urgency/Scarcity, keine erfundenen Kundenzahlen (z.B. „187 Kunden",
    „nur noch 2 Plätze", „12 sehen gerade zu"). Das untergräbt Vertrauen + Google.
14. **Nicht** seitenspezifische Meta-Tags (title/description/canonical/OG) in
    `index.html` schreiben. Die kommen AUSSCHLIESSLICH aus `SEO.tsx` (react-helmet),
    sonst entstehen doppelte/widersprüchliche Tags und ein falscher canonical auf
    Unterseiten (war ein realer Bug). `index.html` enthält nur globale Tags.

---

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run build` | **Voller Build.** Kette: `fetch-google-reviews.js` (Live-Sterne) → `vite build` → `prerender.js` (HTML + `sitemap.xml`). **Läuft normal in der CI** (GitHub Actions) — lokal nur optional zum Testen mit `npm run preview`; das lokal gebaute `dist/` dann NICHT committen. |
| `node scripts/prerender-blog.js <slug>` | Rendert nur `/blog/<slug>` + `/blog`-Übersicht + Sitemap. Meist unnötig, da CI ohnehin voll baut. |
| `npm run dev` | Lokaler Entwicklungsserver (Port 3000). |
| `npm run lint` | TypeScript-Check (`tsc --noEmit`). Bei Code-Änderungen vorher prüfen. |
| `npm run preview` | Vorschau des lokal gebauten `dist/` (nach `npm run build`). |

---

## SEO-Regeln (immer einhalten)

1. **Jede Seite** nutzt die `<SEO>`-Komponente aus `src/components/SEO.tsx` mit
   `title`, `description` und `canonical`.
2. **Meta-Description muss mit dem Haupt-Keyword beginnen** — nicht mit einer Frage,
   nicht mit Marketing-Floskeln.
   - ✅ `"Videoproduktion Kaiserslautern – Rezai Vision produziert Imagefilme..."`
   - ❌ `"Strategisch geplante Videos mit hochwertiger Bildsprache..."`
3. Haupt-Keywords: **Videoproduktion Kaiserslautern, Videograf Kaiserslautern**.
   Sekundär: Imagefilm, Recruiting Video, Social Media Video, Video Ads, Reels,
   Videoproduktionsagentur Rheinland-Pfalz, Südwesten.
4. **Neue Seite/Route hinzugefügt?** Den Pfad **auch** in das Array `staticRoutes`
   in `scripts/prerender.js` eintragen, sonst wird sie nicht vorgerendert und landet
   nicht in der Sitemap.
5. Bilder: immer `width`, `height`, `alt` setzen und `loading="lazy"` (außer dem
   Hero-Bild, das `fetchPriority="high"` braucht).
6. **Neue Blog-Posts: NUR über Firestore, NICHT in `blogPosts.ts`!**
   Neue Artikel werden ausschließlich über das Admin-Dashboard (`/admin` → Blog & Artikel)
   in Firestore (`posts`-Collection) angelegt. `src/data/blogPosts.ts` dient nur als
   statischer Fallback für bestehende Posts und wird für neue Artikel NICHT angefasst.
   Neue Firestore-Artikel erscheinen automatisch beim nächsten CI-Build (Prerender liest
   Firestore) — ein Commit/Push, der die CI auslöst, reicht.
7. `noindex`-Seiten (`/impressum`, `/datenschutz`, `/agb`) gehören NICHT in die
   Sitemap. `scripts/prerender.js` filtert sie über das Array `NOINDEX_ROUTES` raus
   (sonst Search-Console-Warnung „in Sitemap, aber noindex"). Sie werden trotzdem gerendert.
8. Blog-Schema `datePublished` muss **ISO 8601** sein (`2026-04-07`). Der Helfer
   `toISODate()` in `src/pages/BlogPost.tsx` wandelt das deutsche Anzeige-Datum
   („07. April 2026") um. Die sichtbare Anzeige bleibt deutsch.

---

## Was NICHT angefasst / nicht indexiert werden soll

- `/admin` und `/portal/...` — interner Bereich, bewusst `noindex` (siehe
  `vercel.json` X-Robots-Tag und `robots.txt`). Nicht prerendern, nicht in die
  Sitemap aufnehmen.
- `/danke`, `/403`, `/500`, `/503` — Hilfsseiten, in `robots.txt` ausgeschlossen.

---

## Projekt-Struktur (Kurzüberblick)

```
src/
  pages/              Alle Seiten (Home.tsx, Services.tsx, BlogPost.tsx, ...)
  components/
    SEO.tsx           Zentrale SEO-/Meta-Tag-Komponente
    Analytics.tsx     GA4 mit Consent Mode v2
    sections/         Bausteine der Startseite (HeroSection, ...)
    admin/            Internes Dashboard (CRM, ProductionSuite, ...) — noindex
  data/
    blogPosts.ts      Lokaler Fallback für Blog-Posts
scripts/
  prerender.js        Puppeteer-Prerendering (LOKAL), erzeugt dist/ + sitemap.xml
api/                  Vercel Serverless Functions (GA4, Meta Ads, Lead Scraper, ...)
dist/                 FERTIG GEBAUTES HTML — wird committet & von Vercel ausgeliefert
vercel.json           Header, Rewrites, buildCommand (skip), outputDirectory
```

---

## Tech-Stack

- React 19 + Vite 6 + TypeScript + Tailwind CSS v4
- react-router-dom v7 (SPA, clientseitiges Routing)
- react-helmet-async (Meta-Tags)
- Firebase Firestore (Blog `posts`, Leads `calculatorLeads`/`contactLeads`, `seoMetadata`)
- Vercel (Hosting + Serverless `/api`)
- Kontaktformular: Web3Forms

---

## Bewertungen (Architektur)

- `src/data/reviews.ts` — exportiert `reviewStats` (Rating + Anzahl) und `schemaReviews`,
  beide abgeleitet aus den **echten** Testimonials in `src/data/homeData.ts`. Hero,
  TestimonialSection und das Home-Schema lesen daraus.
- `src/data/googleReviews.json` — ehrlicher Fallback (`5.0` / Anzahl = sichtbare
  Testimonials). Wird beim Build überschrieben, wenn Live-Daten kommen.
- `scripts/fetch-google-reviews.js` — holt Live-Schnitt + Anzahl von Google Places.
  Aktivierung: `GOOGLE_PLACES_API_KEY` in `.env` (lokal, weil Build lokal läuft!).
  Die Place-ID ist im Script fest hinterlegt (`ChIJD7JhyphzlkcRd7x7mWqgUFg`).

---

## Search Console & Vercel (Zugriff für SEO-Analysen)

- Echte GSC-Daten via Service-Account in `.env` (`GOOGLE_SERVICE_ACCOUNT_EMAIL` +
  `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`). Scope `webmasters.readonly` (lesen) bzw.
  `webmasters` (Sitemap einreichen).
- Property ist **`sc-domain:rezaivision.de`** — NICHT die URL-Variante
  `https://www.rezaivision.de/` (darauf hat der Service-Account keine Rechte).
- `searchAnalytics`-Abfragen brauchen echte Datumsformate `YYYY-MM-DD` (NICHT
  „30daysAgo" — das wirft 400). URL-Inspektion + Sitemap-Einreichung gehen per API.
- „Indexierung beantragen" geht **nicht** per API — nur manuell in der GSC-UI.
- Vercel-MCP ist angebunden (Projekt `rezaivision-website`). Nur `www` ist Projekt-Domain;
  der non-www→www-Redirect ist 307 auf DNS-Ebene (Backlog, niedrige Prio).

---

## Checkliste für KI bei „ändere Seite X"

1. `git pull` (holt den letzten CI-`dist/`-Commit — verhindert Konflikte).
2. Änderung in der jeweiligen Datei unter `src/` machen.
3. Bei neuer Route: Pfad in `scripts/prerender.js` → `staticRoutes` ergänzen.
4. `npm run lint` (bei Code-Änderungen).
5. `git add -A && git commit -m "..."` — **nur `src/`, NICHT lokal bauen/`dist/` committen.**
6. `git push` — die CI baut `dist/` automatisch und Vercel deployt (~3-4 Min).
