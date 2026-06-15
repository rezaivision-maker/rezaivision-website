# Rezaemotion – System- & Projekt-Kontext (PROJECT_CONTEXT)

Dieses Dokument dient als zentrales "Projektgedächtnis" (Project Context) für KIs und LLMs. Es beschreibt die Architektur, den Tech-Stack, die Strategie, die integrierten Apps und die Entwicklungsgeschichte des Projekts **Rezaemotion**.

---

## 1. Strategie & Fundament

Das Projekt folgt zwei zentralen Regelwerken im Workspace-Root:
1. `WEBDESIGN_STRATEGY_PLAYBOOK.md` (Strategiebuch für High-Conversion, Verkaufspsychologie und technisches SEO).
2. `AI_GUIDELINES.md` (System-Prompt-Erweiterungen für fehlerfreie Builds, SEO-Konventionen und Strukturvorgaben).

**Hauptziel:** Eine blitzschnelle, video-zentrierte Website zur automatisierten Lead-Generierung und Gewinnung von Fachkräften (Recruiting) im Raum Kaiserslautern.

---

## 2. Tech-Stack & Architektur

Das Projekt ist eine moderne, performante Webanwendung mit einer entkoppelten API-Struktur:

*   **Frontend-Framework:** React 18 (TypeScript) mit **Vite** als Build-Tool (Port 3000).
*   **Styling & Animationen:** Tailwind CSS für ein konsistentes Designsystem + **Framer Motion** für moderne Micro-Animations.
*   **Routing:** Clientseitiges SPA-Routing über `react-router-dom` mit Lazy Loading (`Suspense`) für maximale Performance und schnelle FCP (First Contentful Paint).
*   **Datenbank & Authentifizierung:** **Firebase** (Firestore für strukturierte Daten, Firebase Auth für Logins).
*   **Media-Asset-Management:** Cloudinary-CDN zur dynamischen Bild- und Videokomprimierung (`q_auto,f_auto` WebP/AVIF).
*   **Hosting:** Vercel (mit Rewrite-Regeln in `vercel.json` für SPA-Routing-Fallbacks und sitemap-Routing).

---

## 3. Die Apps & Module

### 3.1. Website & Frontend-Routen (`src/pages`)
Die Website besteht aus einer Reihe von optimierten Landingpages, Dienstleistungs- und Systemseiten:
*   `Home.tsx` (eifrig geladen für schnellsten Erstaufruf, Video-Hero-Bereich).
*   `leistungen/` (Unternehmensfilm, Recruiting, Werbevideo, Social Media, Webdesign).
*   `reza-e-motion/` (Eventbegleitung, Musikvideos, Hochzeitsfilme).
*   `preisrechner` & `preise` (interaktiver Rechner für Videobudgets).
*   `blog` & `blog/:slug` (SEO-optimierter Content-Hub).
*   `portal/:id` (dediziertes Kundenportal/Client-Portal).
*   `admin` (Zentrales Admin-Dashboard).

### 3.2. Die Viral Reel App & Video Studio (`/admin/studio`)
Ein programmierbarer Video-Produktions-Hub im Admin-Bereich (`src/pages/admin/VideoStudio.tsx`). Er vereint vier Säulen zur Video-Generierung:
1.  **KI Video-Generierung (LTX-Video):** Anbindung an eine lokale Video-Engine auf Apple Silicon (MPS).
2.  **Medien-Upload:** Menschliche Assets hochladen und direkt via Cloudinary optimieren.
3.  **Hyperframes:** Automatisches Konvertieren von HTML-Webseiten/Layouts (wie z. B. animierten Charts) in Video-Elemente.
4.  **Remotion Integration:** Programmatischer Schnitt und Montage von KI-Assets, Video-Stills und Sound via Code (`src/remotion`).
*   **Start-Pipeline:** Die Pipeline wird mit `start_studio.sh` gestartet (startet parallel den lokalen Python-Server für LTX-Video auf Port 8000 und das Vite-Frontend).

### 3.3. Das Admin-Dashboard (`/admin`)
Ein umfangreiches Kontrollzentrum (`AdminDashboard.tsx`) für CMS und Automatisierung:
*   **Split-Scroll Layout:** Sidebar (links) und Hauptinhalt (rechts) scrollen vollkommen unabhängig voneinander (`overflow-y-auto`), während das Gesamtdashboard fixiert bleibt (`h-screen overflow-hidden`).
*   **Kategorisierte Navigation:** 23 Navigationstabs gruppiert in *Creation & Branding*, *Leads & Clients*, *Growth & Ads*, *SEO & Website* und *Admin & Tools*.

---

## 4. Backend & API-Struktur (`/api`)

Um Verwirrung zu vermeiden, wurden alle API-Routen in thematische Unterordner einsortiert:
*   `api/ai/chat.js` – KI-Chat-Integrationen.
*   `api/ai/elevenlabs.js` – Text-to-Speech für Audio/Voiceovers.
*   `api/ai/ltx_server.py` – Lokaler **FastAPI-Server** für LTX-Video-Modell-Inferenz via PyTorch und Apple Silicon Metal Performance Shaders (MPS).
*   `api/leads/scraper.js` – Web-Scraper zur Lead-Generierung.
*   `api/leads/client-auth.js` – Auth-Handler für das Kundenportal.
*   `api/marketing/meta-ads.js` & `higgsfield.js` – Schnittstellen für Ad-Tracking und Video-Marketing.
*   `api/analytics/ga4.js` & `search-console.js` – Integration von Web-Performance und Google KPIs.
*   `api/seo/sitemap.xml.js` – Dynamisch generierte XML-Sitemap.

---

## 5. System-Integrations & Tools

*   **Lokale LLMs (Ollama):** Installiert und konfiguriert auf der lokalen Maschine zur Ausführung von Open-Source Modellen (z. B. Llama3, Mistral) ohne Cloud-Kosten.
*   **Docker:** Container-Strukturen für reproduzierbare Testumgebungen.
*   **Firebase & GitHub CI/CD:** Firebase-Rules-Auditing, automatische GitHub-Repositories für Versionskontrolle und Deployment-Verknüpfung mit Vercel.
*   **Model Context Protocol (MCP):** Aktivierte System-MCPs zur direkten Code-Analyse, Chrome-DevTools-Diagnosen, Lighthouse-Audits und Barrierefreiheits-Auditing (a11y).

---

## 6. Probleme & Gelöste Hürden (Logbook)

1.  **Doppelte/überlappende Scrollbalken im Admin-Dashboard:**
    *   *Problem:* Die Navigation links war zu lang (23 Items) und führte zu unschönen doppelten Scrollbalken und verschobenen Logout-Buttons.
    *   *Lösung:* Umbau auf ein fixes Drei-Komponenten-Layout (`h-screen overflow-hidden` auf dem Parent-Element), feste Höhenzuweisungen für Sidebar und Main-Content mit unabhängigem `overflow-y-auto` und Ausblenden des globalen Page-Footers auf Admin-Routen.
2.  **API-Verschiebungen & Link-Breaks:**
    *   *Problem:* Nach der Strukturierung des flachen `/api/` Ordners in Unterordner (`/api/ai/`, `/api/leads/` etc.) liefen Frontend-Fetches ins Leere.
    *   *Lösung:* Alle Vercel-Rewrites in `vercel.json` angepasst und globale Suchen über den Code durchgeführt, um alle verbleibenden `fetch("/api/...")` Aufrufe an die neuen Pfade anzupassen.
3.  **Fehlende Daten im Preisrechner:**
    *   *Problem:* Der interaktive Preisrechner hatte keine Inhalte in der Firestore-Datenbank.
    *   *Lösung:* Erstellung eines Node/TS-Skripts (`scratch/populateCalculator.ts`), das die exakten Berechnungsstufen (Image, Recruiting, Add-ons, Express-Tarife) in Firestore injiziert.
4.  **Vercel Duplicate-Content-Prävention:**
    *   *Problem:* Die automatischen Branch-Deployments von Vercel erzeugen `*.vercel.app` Subdomains, was Google als Duplicate Content wertet.
    *   *Lösung:* Konsequente Nutzung einer dynamischen `<SEO />` Komponente mit absoluten Canonical-Tags auf der Hauptdomain.
