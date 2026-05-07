# AI Web Development Blueprint & Guidelines

Diese Datei dient als zentrales "Gehirn" und Regelwerk (System Prompt) für KIs (wie Antigravity, Cursor, Windsurf, ChatGPT), wenn sie neue Websites für Kunden erstellen oder bestehende Projekte optimieren. 

Wenn du als KI dieses Projekt öffnest, **lies diese Datei zuerst** und halte dich strikt an die folgenden Standards.

---

## 1. Tech-Stack & Infrastruktur
*   **Core:** React (TypeScript) + Vite
*   **Styling:** Tailwind CSS + Framer Motion (für Micro-Animations und Scroll-Effekte)
*   **Routing:** `react-router-dom` (mit `Suspense` und `lazy()` für Code-Splitting)
*   **SEO:** `react-helmet-async` (für dynamische Meta-Tags)
*   **Hosting:** Vercel

## 2. Vercel Hosting & SPA-Routing
Da wir eine Client-Side-Rendered (CSR) App mit Vite bauen, sind folgende Vercel-Regeln zwingend:
*   Es MUSS eine `vercel.json` im Root-Verzeichnis liegen, die alle Routen auf die `index.html` umleitet:
    ```json
    {
      "rewrites": [ { "source": "/((?!.*\\.).*)", "destination": "/index.html" } ]
    }
    ```
*   **Vermeidung von Vercel-Preview-Indexierung:** Um Duplicate Content durch `*.vercel.app` URLs zu verhindern, muss JEDE Unterseite einen absoluten Canonical-Tag der Hauptdomain besitzen (z. B. `https://www.kundendomain.de/pfad`).

## 3. SEO & Metadaten Architektur (Kritisch!)
SEO wird nicht dem Zufall überlassen. Jedes Kundenprojekt erfordert dieses Setup:

### 3.1 Die `<SEO />` Komponente
Jede Route/Seite (in `src/pages/`) muss als oberstes Element die `<SEO />` Komponente aufrufen. Diese injiziert über React Helmet:
*   `title` und `description` (inkl. lokaler Keywords)
*   `canonical` (zwingend erforderlich, berechnet als `SITE_URL + path`)
*   `og:image` und `og:title` für Social Sharing
*   Strukturierte Daten (JSON-LD)

### 3.2 Schema.org (Knowledge Graph)
*   **Startseite:** Muss `LocalBusiness` oder `Organization` Schema enthalten.
*   **Social Media:** Das `sameAs` Array (Instagram, LinkedIn, etc.) MUSS zwischen der statischen `index.html` und der dynamischen `<SEO />` Komponente 100% identisch sein, um Google nicht zu verwirren.
*   **Leistungsseiten:** Müssen das `Service` Schema verwenden.
*   **Blog/Magazin:** Müssen das `Article` / `BlogPosting` und ggf. `FAQPage` Schema verwenden.

### 3.3 Sitemap & Robots.txt
*   Die `sitemap.xml` und `robots.txt` liegen im `public/` Ordner.
*   **Keine Orphan Pages!** Jede URL in der Sitemap MUSS über interne Klickpfade (Header, Footer, Fließtext) auf der Website erreichbar sein.
*   Systemseiten (`/danke`, `/admin`, `/404`) dürfen NICHT in der Sitemap stehen und MÜSSEN in der `robots.txt` blockiert (`Disallow: /admin`) sowie mit einem `<meta name="robots" content="noindex, nofollow" />` versehen sein.

## 4. Content, Copywriting & Interne Verlinkung
Beim Generieren von Texten für Blogbeiträge oder Leistungsseiten gilt für B2B-Kunden (speziell im Raum Südwesten / Pfalz):

*   **Tonalität:** "Macher-Mindset". Direkt, professionell, lösungsorientiert. Kein generisches Agentur-Blabla, sondern harter Fokus auf ROI, Recruiting-Erfolge und Umsatz.
*   **Local SEO & Keyword-Density:** Die Zielregionen (z. B. "Kaiserslautern", "Mannheim", "Südwesten") sowie das Hauptgewerke (z. B. "Videoproduktion") müssen natürlich in den Text eingeflochten werden (Ziel: ~1% bis 1.5% Dichte für Fokus-Keywords).
*   **Interne Verlinkungen (Spinnennetz-Prinzip):** Blogartikel dürfen keine textlichen Sackgassen sein. Sie MÜSSEN im Fließtext kontextuell auf die Haupt-Leistungsseiten (z. B. `[Recruiting Video](/leistungen/recruiting)`) und andere verwandte Blogartikel verlinken. Es reicht nicht, nur einen Call-to-Action zum Kontaktformular ans Ende zu setzen.

## 5. Performance & Asset Management
*   **Bilder:** Werden niemals lokal als riesige PNG/JPG Dateien gespeichert. Nutzung von **Cloudinary** (oder ähnlichen CDNs) mit automatischen Transformationen (`q_auto,f_auto` für WebP/AVIF).
*   **Loading:** Alle Bilder `<img>`, die nicht im initialen sichtbaren Bereich (Above-the-Fold) sind, erhalten `loading="lazy"`.

## 6. KI-Checkliste vor jedem Deployment (Git Commit)
Wenn du als KI Änderungen durchführst, prüfe vor dem Commit:
1. Sind neue Routen in der `App.tsx` (mit Lazy Loading) UND in der `sitemap.xml` eingetragen?
2. Wurde der `sitemap.xml` `<lastmod>` Zeitstempel aktualisiert?
3. Gibt es interne Links, die auf die neue Seite zeigen (Vermeidung von Orphan Pages)?
4. Bricht die Seite im Build (`npm run build`)? (Immer vorher lokal testen!)
