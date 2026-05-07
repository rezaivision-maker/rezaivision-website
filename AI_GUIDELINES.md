# Universal AI Web Development Blueprint

Diese Datei dient als **zentrales "Gehirn" und Regelwerk (System Prompt)** für KIs (wie Antigravity, Google AI Studio, Cursor, Windsurf), wenn sie neue Websites für Kunden und Unternehmen *jeglicher Art* erstellen, strukturieren oder optimieren.

Das Ziel: **Schnellstmögliche Erstellung einer fehlerfreien, psychologisch optimierten, perfekt indexierbaren und extrem performanten Website.** 

Wenn du als KI dieses Projekt öffnest, **lies diese Datei zuerst** und halte dich kompromisslos an die folgenden Master-Standards.

---

## 1. Fundament & Tech-Stack
Wir bauen moderne, blitzschnelle Web-Erlebnisse, keine veralteten Templates.
*   **Core:** React (TypeScript) + Vite (oder Next.js, falls Server-Side-Rendering explizit gefordert wird).
*   **Styling:** Tailwind CSS + Framer Motion (für moderne, flüssige Micro-Animations).
*   **Routing:** Client-Side Routing über `react-router-dom` (mit `Suspense` und `lazy()` für Code-Splitting und Performance).
*   **SEO:** `react-helmet-async` (für dynamische Meta-Tags bei Vite-Projekten).
*   **Hosting:** Vercel (Standard).

## 2. Struktur, Design & Verkaufspsychologie
Jede Website muss psychologisch so aufgebaut sein, dass sie Vertrauen weckt und Konvertierungen (Anfragen/Käufe) generiert.
*   **Above-the-Fold (Der erste Eindruck):** Klarer USP (Unique Selling Proposition), emotionale Ansprache und ein direkter Call-to-Action (CTA) ohne Scrollen.
*   **Social Proof & Trust:** Testimonials, Logos von Partnern oder Zertifikate müssen strategisch auf der Startseite platziert sein.
*   **UI/UX Best Practices:** Klarer Whitespace, starke Kontraste, intuitive Navigation. Keine überladenen Menüs.
*   **Kontaktformulare:** Müssen immer zu 100 % funktional sein (z. B. via Formspree, Netlify Forms oder eigener API). Validierung der Felder und eine Erfolgs-Seite (`/danke` inkl. Tracking-Option) sind Pflicht.
*   **Glossar (Optional aber empfohlen):** Für komplexe Branchen (B2B, Handwerk, Medizin, Tech) sollte ein Glossar oder FAQ-Bereich aufgebaut werden, um Autorität (E-E-A-T) und SEO-Traffic aufzubauen.

## 3. Vercel Hosting & SPA-Routing (Technik)
Wenn wir eine Client-Side-Rendered (CSR) App mit Vite bauen:
*   **Routing-Fallback:** Es MUSS eine `vercel.json` im Root-Verzeichnis liegen, die alle Routen abfängt:
    ```json
    {
      "rewrites": [ { "source": "/((?!.*\\.).*)", "destination": "/index.html" } ]
    }
    ```
*   **Vermeidung von Vercel-Preview-Indexierung:** Um Duplicate Content durch `*.vercel.app` URLs zu verhindern, muss JEDE Unterseite zwingend einen absoluten Canonical-Tag der Hauptdomain besitzen (z. B. `https://www.kunden-domain.de/pfad`).

## 4. Hardcore SEO & Google Search Console
Die Website muss von Google vom ersten Tag an geliebt werden.

### 4.1 Die `<SEO />` Komponente
Jede Route/Seite MUSS als oberstes Element eine dedizierte `<SEO />` Komponente aufrufen. Diese injiziert:
*   Passenden `title` und `description` (inkl. der jeweiligen regionalen/branchenspezifischen Keywords).
*   `canonical` (zwingend erforderlich, berechnet als `SITE_URL + path`).
*   OpenGraph (`og:image`, `og:title`) für perfektes Social Sharing.
*   Strukturierte Daten (JSON-LD).

### 4.2 Schema.org (Knowledge Graph)
*   **Startseite:** Muss `LocalBusiness`, `Organization` oder `Store` Schema enthalten (inkl. Adresse, Öffnungszeiten, Telefonnummer).
*   **Social Media:** Das `sameAs` Array (Instagram, LinkedIn, etc.) MUSS in der statischen `index.html` und der dynamischen `<SEO />` Komponente 100% synchron und vollständig sein.
*   **Unterseiten:** Nutzung von `Service`, `Product`, `Article` oder `FAQPage` entsprechend dem Inhalt.

### 4.3 Sitemap.xml & Robots.txt
*   Beide Dateien liegen im `public/` Ordner.
*   **Keine Orphan Pages!** Jede URL in der Sitemap MUSS über interne Links (Spinnennetz-Prinzip) erreichbar sein. Keine isolierten Seiten!
*   **Systemseiten blockieren:** Fehlerseiten (`404`), Admin-Bereiche oder Erfolgsseiten (`/danke`) haben in der Sitemap NICHTS verloren. Sie erhalten ein `<meta name="robots" content="noindex, nofollow" />` und werden in der `robots.txt` blockiert (`Disallow: /admin`).
*   **KI-Bots:** Die `robots.txt` sollte KI-Crawlern (OpenAI, Google-Extended) je nach Kundenwunsch explizit den Zugriff erlauben (`Allow: /`) oder verbieten, damit das Unternehmen in LLMs referenziert werden kann (z.B. Ergänzung einer `llms.txt`).

## 5. Content, Copywriting & Keyword-Dichte
Egal ob Handwerker, SaaS-Firma oder lokaler Arzt – der Content muss passen:
*   **Tonalität anpassen:** Die KI muss die Sprache der Zielgruppe adaptieren (seriös für Anwälte, emotional für B2C, "Macher-Mindset" für B2B-Agenturen).
*   **Local SEO (Regionale Keywords):** Wenn das Unternehmen lokal agiert, MÜSSEN die Stadt, umliegende Regionen und das Gewerke natürlich (ca. 1% bis 1,5% Dichte) in die H1/H2-Tags und Fließtexte integriert werden.
*   **Interne Verlinkung:** Blogartikel oder Ratgeber dürfen keine Sackgassen sein. Sie müssen im Fließtext kontextuell auf die Haupt-Dienstleistungen / Produkte verlinken, um Link-Juice weiterzugeben.

## 6. Performance & Asset Management
*   **Bilder:** Niemals riesige lokale PNG/JPGs! Cloudinary (oder ähnliche CDNs) mit Parametern wie `q_auto,f_auto` für sofortiges WebP/AVIF sind Pflicht.
*   **Lazy Loading:** Alle Bilder (`<img>`), die sich außerhalb des initialen sichtbaren Bereichs (Below-the-Fold) befinden, erhalten `loading="lazy"`.

## 7. KI-Checkliste vor jedem Deployment (Git Commit)
Vor jedem `git push` in die Produktion prüft die KI zwingend:
1. Sind neue Routen in der App-Logik UND in der `sitemap.xml` eingetragen?
2. Wurde der `<lastmod>` Zeitstempel der Sitemap aktualisiert?
3. Gibt es funktionierende interne Links zur neuen Seite (Orphan Page Test)?
4. Wurden regionale/branchenspezifische SEO-Keywords im Text berücksichtigt?
5. Bricht die Seite im Build (`npm run build`)? -> **Immer erst lokal testen!**
