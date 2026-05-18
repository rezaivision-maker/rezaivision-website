# Webdesign Strategie & Umsetzung Playbook

Dieses Dokument ist das interne Handbuch für den Bau von hochkonvertierenden, video-zentrierten Websites. Es vereint Webdesign, Verkaufspsychologie, technisches SEO und KI-Auffindbarkeit.

## Teil 1: Strategie & Fundament

### 1. Strategischer Rahmen
- **Websites sind Verkaufsgespräche:** Eine Website ist keine digitale Visitenkarte, sondern ein 24/7 Vertriebsmitarbeiter.
- **Fokus:** Wir bauen die Bühne für das Video. Das Ziel ist Lead-Generierung und Vertrauensaufbau.

### 2. Tech-Stack & Qualitätsstandards
- **Stack:** React/Vite (blitzschnell), Tailwind CSS (konsistentes Design), TypeScript.
- **Standards:** Mobile-First, Google PageSpeed 90+ (Core Web Vitals optimiert), schnelle Ladezeiten trotz vieler Medien.

### 3. Informationserhebung & Briefing
- **Kundenverständnis:** Wer ist die Zielgruppe? Was ist der größte Schmerz (Pain Point)?
- **Zieldefinition:** Was soll der Besucher tun? (Anrufen, Formular ausfüllen, Video ansehen).

### 4. Wireframe-Methodik
- **Prozess:** Skizze → Struktur → Copywriting → Design.
- Niemals Design vor Copy! Der Text bestimmt das Layout.

## Teil 2: Conversion & Psychologie

### 5. Psychologische Seitenarchitektur (Die perfekte Landingpage)
1. **Hero:** Klares Wertversprechen (Value Proposition) + starkes visuelles Element (Video-Loop).
2. **Trust (Social Proof):** Logos, Google-Sterne, kurze Testimonials.
3. **Problem (Agitate):** Welches Problem lösen wir?
4. **Approach/Lösung:** Wie lösen wir es?
5. **Services:** Was genau bieten wir an?
6. **Showreel/Beweis:** Der visuelle Ritterschlag.
7. **Cases/Referenzen:** Tiefergehende Beweise.
8. **CTA:** Klare Handlungsaufforderung am Ende.

### 6. Mediastrategie (Bilder/Videos)
- **Show, don't tell:** Bilder und Videos früh platzieren (Above the Fold).
- **Video-Backgrounds:** Im Hero oder CTA-Bereich für maximale Emotion (mit Poster-Fallback für Speed).
- **Stills:** Hochwertige Video-Stills in Service-Boxen nutzen.

### 7. Copywriting-Kunst
- **Klarheit vor Kreativität:** Keine Rätsel. Der Besucher muss in 3 Sekunden verstehen, was es gibt.
- **Nutzen-Kommunikation:** Nicht "Wir machen Videos", sondern "Wir gewinnen Ihre Fachkräfte".

### 8. Verkaufspsychologie & Überzeugung
- **Cialdini-Prinzipien:** Authority (Zertifikate, IHK), Social Proof (Kundenlogos, Testimonials), Scarcity (Begrenzte Kapazitäten).
- **Risk Reversal:** Garantien oder kostenlose Erstgespräche mindern das Risiko.

### 9. Psychologische Design-Trigger
- **Whitespace:** Gibt Premium-Gefühl und lenkt den Fokus auf das Wichtige.
- **Kontrast:** Der wichtigste Button (CTA) muss die auffälligste Farbe haben.
- **Z/F-Pattern:** Layouts so gestalten, wie das Auge natürlich liest.

## Teil 3: Technik & SEO

### 10. SEO-Fundament
- **On-Page:** H1-H6 Hierarchie strikt einhalten. Eine H1 pro Seite.
- **Keine Orphan Pages:** Jede Seite muss von intern verlinkt sein.
- **Meta-Tags:** Title und Description für jede Seite optimieren.

### 11. KI & LLM-Auffindbarkeit (Basics)
- **llms.txt:** Bereitstellen einer maschinenlesbaren Zusammenfassung der Website für KI-Agenten.
- **Klartext:** Wichtige Infos (Preise, Leistungen, Ort) in klarem Text, nicht nur in Videos/Bildern.

### 12. Rechtliche Compliance (DSGVO)
- Impressum & Datenschutzerklärung leicht erreichbar.
- Cookie-Banner für externe Scripts (Vimeo, Analytics).
- Lokale Schriften (Google Fonts lokal oder per Preconnect absichern).

### 13. Mobile-First-Strategie
- 70% des Traffics ist mobil. Touch-Ziele groß genug machen.
- Videos mobil stark komprimieren oder durch Stills ersetzen, wenn Bandbreite kritisch.

### 14. Brand Identity Integration
- Konsistente Farbpalette (Primary, Secondary, Accent).
- Schriftarten konsequent einsetzen (Display-Font für Headings, Sans-Serif für Body).

## Teil 4: Wachstum & Ökosystem

### 15. Analytics & Tracking
- **Google Analytics 4 / Tag Manager:** Basis-Tracking einrichten.
- **Heatmaps:** MS Clarity oder Hotjar zur UX-Optimierung.

### 16. Domain, Hosting & SSL
- Hosting auf performanten Servern/CDNs (z.B. Vercel). SSL ist Pflicht.

### 17. Canonical-URLs & Duplicate Content
- **Wichtig für Vercel:** Automatische Weiterleitung von `*.vercel.app` auf die Hauptdomain (`.de`).
- `<link rel="canonical">` auf jeder Seite setzen, um Duplicate Content zu vermeiden.

### 18. Google-Ökosystem-Integration
- **Search Console:** Sitemap einreichen, Fehler überwachen.
- **Google Business Profile:** Für Local SEO (Kaiserslautern).

### 19. Social Media & Open Graph
- Open Graph Tags (`og:title`, `og:image`) für perfekte Vorschauen auf LinkedIn, WhatsApp, etc.
- `sameAs` Schema.org Markup für Verknüpfung der Social Profile.

### 20. Automatisierte Blog-Erstellung
- **Cluster-Strategie:** Ein Hauptthema (z.B. Recruiting-Videos) + mehrere detaillierte Sub-Artikel.
- Struktur: H1 → Intro → Problem → Lösung → CTA.

### 21. LLM & KI-Sichtbarkeit (Advanced)
- **Strukturierte Daten (Schema.org):** FAQ, LocalBusiness, Article Schema helfen KIs, die Daten zu extrahieren.
- **E-E-A-T (Expertise, Experience, Authority, Trust):** Autorenprofile für Blog-Artikel anlegen.

## Teil 5: Prozess & Maintenance

### 22. Kundenbriefing & Onboarding
- Fester Prozess: Kick-off, Assets sammeln, Meilensteine definieren.

### 23. Preisgestaltung & Paketierung
- Value-Based Pricing. Pakete schnüren (z.B. Landingpage, Business Website, Video+Web Bundle).

### 24. Launch-Checkliste
- Alle Links prüfen? Mobile Ansicht okay? Formulare testen! 404-Weiterleitungen eingerichtet?

### 25. Post-Launch & Iteration
- Eine Website ist nie fertig. Nach 4 Wochen Heatmaps analysieren und optimieren.

### 26. Social Proof System
- Prozess zur automatisierten Einholung von Kundenbewertungen nach Projektabschluss.

### 27. Lead-Magnets & E-Mail
- Newsletter oder Whitepaper (z.B. "Video Marketing Guide") zur Lead-Gewinnung einbauen.

### 28. Navigation & Informationsarchitektur
- Flache Hierarchien. Der Nutzer muss in max. 3 Klicks am Ziel sein.

### 29. Ranking-Monitoring & Analytics-Stack
- Monatliches Reporting der wichtigsten KPIs (Traffic, Conversions, Rankings).

### 30. Sicherheit & Uptime
- Uptime-Monitoring einrichten (z.B. UptimeRobot), um bei Ausfällen sofort reagiert zu können.

### 31. Maintenance & Iterationszyklen
- Regelmäßige Updates von Abhängigkeiten, Performance-Checks und Content-Erweiterungen.
