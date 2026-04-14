export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'corporate' | 'emotion';
  date: string;
  readTime: string;
  image: string;
  ctaLabel: string;
  ctaLink: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "recruiting-video-kosten-2024",
    title: "Was kostet ein Recruiting-Video? Der Preisführer 2024",
    excerpt: "Transparenz ist uns wichtig. Erfahren Sie, wie sich die Kosten für ein professionelles Recruiting-Video zusammensetzen und worauf Sie achten sollten.",
    category: "corporate",
    date: "14. März 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    ctaLabel: "Jetzt Kosten unverbindlich anfragen",
    ctaLink: "/kontakt",
    content: `
## Warum Transparenz bei Videokosten wichtig ist

Viele Agenturen machen ein großes Geheimnis um ihre Preise. Bei Rezai Vision glauben wir an Klarheit. Ein Recruiting-Video ist kein Kostenfaktor, sondern eine Investition in Ihr Employer Branding.

### Faktoren, die den Preis beeinflussen:
1. **Vorproduktion**: Konzeptentwicklung, Storyboarding und Planung.
2. **Drehtage**: Je nach Umfang und Anzahl der Standorte.
3. **Equipment**: High-End Kameras, Licht und Ton für den Kino-Look.
4. **Postproduktion**: Schnitt, Color Grading, Sounddesign und Korrekturschleifen.

### Wo liegen die Preisspannen?
Ein einfacher Mitarbeiterspot beginnt oft bei etwa 2.500 €. Komplexe Kampagnen mit mehreren Videos für verschiedene Kanäle können zwischen 5.000 € und 15.000 € liegen.

**Tipp:** Achten Sie nicht nur auf den Preis, sondern auf die Conversion-Rate. Ein billiges Video, das keine Bewerber bringt, ist teurer als ein hochwertiges Video, das Ihre Stellen besetzt.
    `
  },
  {
    id: "2",
    slug: "employer-branding-kaiserslautern-pfalz",
    title: "Employer Branding in Kaiserslautern: Warum Video der Schlüssel ist",
    excerpt: "Regionale Fachkräftegewinnung erfordert Authentizität. Entdecken Sie, warum Unternehmen in der Pfalz jetzt auf Video-Content setzen müssen.",
    category: "corporate",
    date: "10. März 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    ctaLabel: "Projekt-Check in Kaiserslautern buchen",
    ctaLink: "/kontakt",
    content: `
## Der Wettbewerb um Talente in der Westpfalz

Kaiserslautern ist ein moderner IT- und Forschungsstandort. Doch wie sticht man als mittelständisches Unternehmen zwischen Tech-Giganten und Start-ups hervor?

### Video zeigt Ihre wahre Kultur
Ein Text auf einer Karriere-Seite kann viel behaupten. Ein Video zeigt das echte Lächeln der Kollegen, die moderne Kaffeeküche und die Atmosphäre im Team.

### Regionales Targeting
Durch Video-Ads auf LinkedIn und Instagram können wir gezielt Fachkräfte in einem Radius von 50km um Kaiserslautern, Landstuhl oder Pirmasens ansprechen.

**Fazit:** Wer heute keine Sichtbarkeit durch Video zeigt, existiert für die nächste Generation von Fachkräften praktisch nicht.
    `
  },
  {
    id: "3",
    slug: "imagefilm-vs-werbevideo-unterschiede",
    title: "Imagefilm vs. Werbevideo: Was braucht Ihr Unternehmen wirklich?",
    excerpt: "Oft verwechselt, aber grundlegend verschieden. Wir klären auf, welche Video-Art Ihre aktuellen Unternehmensziele am besten unterstützt.",
    category: "corporate",
    date: "05. März 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070&auto=format&fit=crop",
    ctaLabel: "Kostenlose Beratung anfordern",
    ctaLink: "/kontakt",
    content: `
## Die Wahl der richtigen Strategie

Bevor wir die Kamera einschalten, stellen wir die wichtigste Frage: Was ist das Ziel?

### Der Imagefilm (Marathon)
- **Ziel**: Vertrauen aufbauen, Markenwerte vermitteln.
- **Dauer**: Meist 2-3 Minuten.
- **Einsatz**: Startseite, Messe, Über Uns.

### Das Werbevideo (Sprint)
- **Ziel**: Ein spezifisches Produkt verkaufen oder eine Aktion bewerben.
- **Dauer**: 15-60 Sekunden.
- **Einsatz**: Social Media Ads, TV, YouTube Pre-Roll.

### Was ist wichtiger?
Ein starker Imagefilm bildet das Fundament. Er ist die Basis Ihres Vertrauens. Werbevideos sind die Treibstoff-Zufuhr, um kurzfristig Aufmerksamkeit zu generieren.
    `
  },
  {
    id: "4",
    slug: "social-media-retainer-vorteile",
    title: "Social Media Retainer: Warum 1 Video pro Jahr nicht mehr reicht",
    excerpt: "Social Media Algorithmen Bestrafen Inaktivität. Erfahren Sie, warum ein kontinuierlicher Content-Stream nachhaltiger ist als Einzelprojekte.",
    category: "corporate",
    date: "01. März 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    ctaLabel: "Unsere Content-Pakete entdecken",
    ctaLink: "/leistungen/social-media",
    content: `
## Das Problem mit dem 'Eintagsfliegen'-Video

Viele Firmen investieren einmal im Jahr viel Geld in ein großes Video und wundern sich, nach 3 Wochen wieder in der Bedeutungslosigkeit zu verschwinden.

### Die Macht der Kontinuität
Ein Social Media Retainer liefert Ihnen Monat für Monat frischen Content (Reels, Shorts, Beiträge). Das hält Sie im Gedächtnis Ihrer Kunden.

### Vorteile des Retainers bei Rezai Vision:
- **Planbare Kosten**: Fixer Monatspreis ohne Überraschungen.
- **Hörere Relevanz**: Wir können auf aktuelle Trends reagieren.
- **Lerneffekt**: Durch monatliche Analysen optimieren wir den Content stetig.

**CTA:** Kontaktieren Sie uns für ein individuelles Content-Konzept.
    `
  },
  {
    id: "5",
    slug: "psychologie-video-testimonials",
    title: "Die Psychologie von Video-Testimonials: Vertrauen auf Knopfdruck",
    excerpt: "Menschen kaufen von Menschen. Warum Video-Rezensionen eine deutlich höhere Conversion-Rate haben als geschriebener Text.",
    category: "corporate",
    date: "25. Februar 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
    ctaLabel: "Kundenstimmen ansehen",
    ctaLink: "/referenzen",
    content: `
## Warum Worte allein oft nicht reichen

Ein Zitat auf einer Website ist schnell geschrieben (und leider auch oft gefälscht). Ein Video-Testimonial ist unbestreitbar echt.

### Nonverbale Signale
Kunden achten unbewusst auf Mimik, Gestik und die Stimmlage. Wenn ein echter Kunde authentisch von seinen Erfolgen mit Ihnen berichtet, sinkt die Kaufbarriere massiv.

### Social Proof in Bestform
Ein professionell gefilmtes Testimonial nimmt potenziellen Neukunden die Angst vor einer Fehlentscheidung. Es ist der ultimative 'Beweis', dass Sie Ihre Versprechen halten.
    `
  },
  {
    id: "6",
    slug: "hochzeitsvideograf-checkliste-tipps",
    title: "Hochzeitsvideograf buchen: Die 5 wichtigsten Fragen vor dem Ja-Wort",
    excerpt: "Worauf sollten Brautpaare achten, um den perfekten Videografen für ihren großen Tag zu finden? Wir geben wertvolle Tipps.",
    category: "emotion",
    date: "20. Februar 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
    ctaLabel: "Termin für 2024/2025 prüfen",
    ctaLink: "/rezaemotion/hochzeitsfilme",
    content: `
## Ihr Tag verdient Kino-Qualität

Nach der Torte und den Blumen bleibt vor allem eines: Die Erinnerung. Ein Hochzeitsfilm fängt Stimmen, Lachen und Freudentränen ein.

### 5 Fragen an Ihren Videografen:
1. **Stil**: Ist der Stil eher dokumentarisch oder inszeniert?
2. **Pakete**: Was ist alles enthalten (Highlight-Film vs. lange Dokumentation)?
3. **Erfahrung**: Wie geht der Videograf mit schwierigen Lichtverhältnissen um?
4. **Vorbereitung**: Gibt es ein Kennenlern-Gespräch?
5. **Ausrüstung**: Wird mit mehreren Kameras gefilmt, um keinen Moment zu verpassen?

**Tipp:** Achten Sie darauf, dass die Chemie zwischen Ihnen und dem Videografen stimmt – er begleitet Sie schließlich den ganzen Tag!
    `
  },
  {
    id: "7",
    slug: "event-aftermovies-marketing-nutzen",
    title: "Event-Aftermovies: So nutzen Sie Ihr Event für 12 Monate Marketing",
    excerpt: "Ein Firmenevent ist teuer. Wir zeigen Ihnen, wie Sie aus einem Tag Material das ganze Jahr über Mehrwert für Ihre Marke ziehen.",
    category: "corporate",
    date: "15. Februar 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
    ctaLabel: "Event-Angebot anfordern",
    ctaLink: "/kontakt",
    content: `
## Vom Live-Moment zum Dauerbrenner

Ein Aftermovie ist viel mehr als nur eine nette Erinnerung für die Gäste. Es ist ein mächtiges Akquise-Tool.

### 1. Recruiting-Wirkung
Interne Events zeigen Ihre Unternehmenskultur. Nutzen Sie Snippets des Events für Ihre HR-Kanäle.

### 2. Vertrauensbeweis (Social Proof)
Große Events mit vielen glücklichen Menschen signalisieren Stärke und Relevanz.

### 3. Content-Recycling
Aus einem langen Aftermovie lassen sich über 10 Reels und LinkedIn-Posts generieren. So bleibt das Event über Monate hinweg im Gespräch.
    `
  },
  {
    id: "8",
    slug: "musikvideo-produktion-konzept-viral",
    title: "Musikvideo Produktion: Vom Konzept zum viralen Hit",
    excerpt: "Künstler brauchen mehr als nur ein Video. Sie brauchen eine visuelle Identität. Wir begleiten wir Sie von der ersten Idee bis zum Release.",
    category: "emotion",
    date: "10. Februar 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2070&auto=format&fit=crop",
    ctaLabel: "Portfolio & Styles ansehen",
    ctaLink: "/rezaemotion/musikvideos",
    content: `
## Die visuelle Seite Ihrer Musik

In der heutigen Zeit wird Musik nicht nur gehört, sie wird gesehen. Ein starkes Musikvideo kann über Erfolg oder Misserfolg eines Tracks entscheiden.

### Die Story zählt
Es muss nicht immer ein teures Set sein. Eine starke, kreative Idee, die perfekt zum Beat und zur Stimmung passt, fesselt die Zuschauer viel mehr.

### Professionalität zahlt sich aus
Gutes Licht, flüssige Kamerabewegungen und ein erstklassiges Color-Grading sorgen dafür, dass Ihr Video professionell wirkt – ein Muss, wenn Sie von Labels oder Veranstaltern ernst genommen werden wollen.
    `
  },
  {
    id: "9",
    slug: "checkliste-vorbereitung-drehtag",
    title: "Checkliste: So bereiten Sie Ihr Unternehmen perfekt auf den Drehtag vor",
    excerpt: "Keine Panik vor der Kamera! Mit unserer Checkliste stellen Sie sicher, dass Ihr Drehtag reibungslos und effizient abläuft.",
    category: "corporate",
    date: "05. Februar 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1492691523567-617234ed959b?q=80&w=2070&auto=format&fit=crop",
    ctaLabel: "Kostenlosen Strategie-Check buchen",
    ctaLink: "/kontakt",
    content: `
## Damit der Drehtag zum Erfolg wird

Ein reibungsloser Ablauf spart Zeit, Geld und Nerven. Hier sind die wichtigsten Punkte:

### 1. Die Location
- Sind alle Räume aufgeräumt? 
- Ist der Zugang zu den Drehorten frei?
- Gibt es störende Nebengeräusche (Bauarbeiten etc.)?

### 2. Die Protagonisten
- Wissen alle Beteiligten Bescheid?
- Gibt es eine Kleiderempfehlung (keine flimmernden Karos!)?
- Sind Interview-Antworten grob vorbereitet (nicht auswendig lernen!)?

### 3. Zeitplan
Pufferzeiten sind wichtig. Ein Dreh dauert oft länger, als man denkt, wenn man die perfekte Einstellung erzielen möchte.
    `
  },
  {
    id: "10",
    slug: "video-marketing-storytelling-strategie",
    title: "Warum Apple & Co. auf Storytelling setzen – und Sie es auch tun sollten",
    excerpt: "Fakten informieren, aber Geschichten verkaufen. Erfahren Sie, wie emotionales Storytelling Ihre Video-Conversion massiv steigert.",
    category: "corporate",
    date: "01. Februar 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    ctaLabel: "Ihre Geschichte erzählen",
    ctaLink: "/kontakt",
    content: `
## Die Kraft der Emotionen

Menschen erinnern sich an Geschichten viel besser als an technische Datenblätter oder Bulletpoints.

### Heldenreise für Unternehmen
In jeder Firma steckt eine Geschichte. Warum haben Sie gegründet? Welches Problem lösen Sie wirklich für Ihre Kunden? Das ist der Kern Ihres Marketings.

### Mitfühlen statt Wegklicken
Ein gut erzähltes Video nimmt den Zuschauer mit auf eine emotionale Reise. Wenn der Zuschauer mitfühlt, baut er eine Bindung zu Ihrer Marke auf. 

**Fazit:** Verkaufen Sie nicht die Bohrmaschine, sondern das perfekte Loch in der Wand und das Gefühl eines gemütlichen Zuhauses.
    `
  }
];
