import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ServiceBlogLinks } from "@/components/ServiceBlogLinks";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "@/components/SEO";
import { 
  CheckCircle2, 
  ArrowRight, 
  CalendarDays, 
  Repeat, 
  Video, 
  TrendingUp, 
  ChevronDown,
  Clock,
  Zap
} from "lucide-react";

export default function SocialRetainer() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const formats = [
    {
      title: "Instagram Reels & TikToks",
      desc: "Kurzweilige, trendbewusste Kurzvideos, die organische Reichweite aufbauen und Ihre Community unterhalten.",
      benefit: "Massive organische Reichweite und Markenbekanntheit.",
      useCase: "Instagram, TikTok, Facebook",
      icon: <Video className="text-brand-accent" size={24} />
    },
    {
      title: "LinkedIn Personal Branding",
      desc: "Professionelle Video-Statements und Insights für Geschäftsführer und Experten. Wir positionieren Sie als Thought Leader.",
      benefit: "Vertrauensaufbau im B2B-Umfeld und Social Selling.",
      useCase: "LinkedIn Feed, Unternehmensseite",
      icon: <TrendingUp className="text-brand-accent" size={24} />
    },
    {
      title: "YouTube Shorts",
      desc: "Snackable Content für die zweitgrößte Suchmaschine der Welt. Ideal, um neue Zielgruppen über Suchanfragen zu erreichen.",
      benefit: "Langfristige Auffindbarkeit und Abonnenten-Wachstum.",
      useCase: "YouTube",
      icon: <Zap className="text-brand-accent" size={24} />
    },
    {
      title: "Content Repurposing",
      desc: "Wir machen aus einem langen Video (z.B. Podcast oder Imagefilm) 10-15 kurze Clips für Social Media.",
      benefit: "Maximale Effizienz und Wiederverwertung bestehender Inhalte.",
      useCase: "Alle Social Media Plattformen",
      icon: <Repeat className="text-brand-accent" size={24} />
    }
  ];

  const faqs = [
    {
      question: "Was kostet ein Social Media Retainer?",
      answer: "Unsere Retainer-Pakete beginnen bei 1.490 € pro Monat. Der genaue Preis richtet sich nach der Anzahl der gewünschten Videos (z.B. 4, 8 oder 12 Videos pro Monat) und dem Aufwand für Konzeption und Drehtage."
    },
    {
      question: "Gibt es eine Mindestlaufzeit?",
      answer: "Ja, wir empfehlen eine Mindestlaufzeit von 3 bis 6 Monaten. Organischer Social Media Aufbau braucht Zeit und Konsistenz. Nur durch eine längerfristige Zusammenarbeit können wir den Algorithmus trainieren und messbare Erfolge erzielen."
    },
    {
      question: "Wer übernimmt das Posten der Videos?",
      answer: "Standardmäßig liefern wir Ihnen die fertigen Videos inklusive Vorschlägen für die Caption (Beschreibungstext) und Hashtags. Wenn Sie sich um gar nichts mehr kümmern möchten, bieten wir auch das komplette Channel-Management (Full-Service) an."
    },
    {
      question: "Wie viel Zeit muss ich als Kunde investieren?",
      answer: "Sehr wenig! Das ist der Hauptvorteil des Retainers. Nach einem initialen Strategie-Workshop benötigen wir Sie oder Ihr Team nur noch für den monatlichen Batch-Drehtag (ca. 4-6 Stunden). Den Rest (Ideen, Skripte, Schnitt) übernehmen wir."
    },
    {
      question: "Was passiert, wenn wir mal keine Ideen haben?",
      answer: "Das ist unser Job. Wir analysieren Trends, Ihre Zielgruppe und Ihre Branche und kommen jeden Monat mit einem fertigen Redaktionsplan und konkreten Video-Ideen proaktiv auf Sie zu."
    },
    {
      question: "Ich bin nervös vor der Kamera – funktioniert das trotzdem?",
      answer: "Fast alle unsere Kunden sind keine Schauspieler und verkrampfen anfangs vor der Kamera. Genau hier liegt unsere Stärke: Wir arbeiten auf Augenhöhe, mit Empathie und den richtigen Fragen, bis Sie locker werden und echte, authentische Aussagen entstehen. Für den Einstieg gibt es drei Wege – frei sprechen, Teleprompter mit vollständigem Text oder Teleprompter mit Stichpunkten zur Gesprächsführung."
    },
    {
      question: "Was passiert, wenn ein Video mal nicht funktioniert?",
      answer: "Das gehört zu unserem Ansatz. Unsere Devise ist Overproduction – wir produzieren lieber mehr als zu wenig. Test-Formate gehen live, wir analysieren, was ankommt, und entscheiden datenbasiert, ob wir ein Video nachschneiden (Reedit) oder neu drehen. So wird Ihr Content mit der Zeit besser, nicht beliebiger."
    },
    {
      question: "Bekommen wir das Rohmaterial?",
      answer: "Auf Wunsch heben wir das Rohmaterial für Sie auf, sodass es sich später für weitere Schnitte und Formate wiederverwenden lässt."
    },
    {
      question: "Übernehmt ihr auch größere Produktionen wie Messen oder Produktshootings?",
      answer: "Ja. Neben Talking-Head- und Social-Content begleiten wir auch Messen, produzieren Produkt- und Detailaufnahmen sowie Fotomaterial. Für aufwändigere Produktionen holen wir gezielt erfahrene Partner aus unserem Netzwerk dazu – koordiniert über einen festen Ansprechpartner, ohne Agentur-Overhead."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32">
      <SEO 
        title="Social Media Content Kaiserslautern | Video Retainer"
        description="Social Media Video Kaiserslautern – regelmäßiger TikTok, Instagram und LinkedIn Content für dauerhafte Sichtbarkeit. Content Creation Agentur aus dem Südwesten."
        canonical="/leistungen/social-media"
        keywords="Social Media Content Kaiserslautern, Content Creation Mannheim, TikTok Agentur Saarland, Video Retainer"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["Product", "Service"],
          "name": "Social Media Retainer & Content Produktion",
          "image": "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1200&auto=format&fit=crop",
          "description": "Monatliche Videoproduktion und Content-Betreuung für Instagram, TikTok und LinkedIn im Südwesten Deutschlands.",
          "brand": {
            "@type": "Brand",
            "name": "Rezai Vision"
          },
          "provider": {
            "@type": "LocalBusiness",
            "name": "Rezai Vision",
            "url": "https://www.rezaivision.de"
          },
          "areaServed": [
            "Kaiserslautern", "Mannheim", "Saarbrücken", "Mainz", "Ludwigshafen", 
            "Heidelberg", "Frankfurt am Main", "Wiesbaden", "Karlsruhe", "Darmstadt", 
            "Worms", "Speyer", "Neustadt an der Weinstraße", "Trier", "Homburg", 
            "Pirmasens", "Zweibrücken", "Landstuhl", "Kusel", "Saarlouis", "St. Ingbert"
          ],
          "offers": {
            "@type": "Offer",
            "price": "1490.00",
            "priceCurrency": "EUR",
            "description": "Ab 1.490 € pro Monat zzgl. MwSt.",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "url": "https://www.rezaivision.de/leistungen/social-media"
          }
        }}
      />
      {/* 1. HERO SECTION */}
      <section className="pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent font-medium text-sm mb-6">
              Social Media Retainer / Content Produktion
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-[1.1]">
              Konstante Sichtbarkeit. <span className="text-brand-accent italic">Ohne den Stress.</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-10">
              Wir übernehmen Ihren Social Media Content Kaiserslautern im monatlichen Retainer. Ein Drehtag im Monat = Content für Wochen. Planbar, professionell und reichweitenstark.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/kontakt?service=social-media" size="lg" className="gap-2">
                Retainer anfragen <ArrowRight size={18} />
              </Button>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <CheckCircle2 className="text-brand-accent" size={20} />
                <span>Batch-Produktion für maximale Effizienz und Konsistenz.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LEISTUNGSBEREICHE / VIDEOFORMATE */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Content, der Ihre Zielgruppe fesselt
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Egal auf welcher Plattform sich Ihre Kunden aufhalten – wir produzieren die passenden Kurzvideo-Formate für maximales Engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formats.map((format, i) => (
              <div key={i} className="bg-brand-bg border border-white/5 p-8 rounded-2xl flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                  {format.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{format.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{format.desc}</p>
                
                <div className="space-y-3 pt-6 border-t border-white/5 mt-auto">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-brand-accent shrink-0 mt-1" size={16} />
                    <span className="text-sm text-gray-300"><strong className="text-white">Nutzen:</strong> {format.benefit}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="text-brand-accent shrink-0 mt-1" size={16} />
                    <span className="text-sm text-gray-300"><strong className="text-white">Einsatz:</strong> {format.useCase}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROBLEMVERSTÄNDNIS */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Social Media frisst Ihre Zeit und Nerven?
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Jeder weiß, dass man auf Social Media präsent sein muss. Aber im Arbeitsalltag bleibt die Content-Produktion meist auf der Strecke. Die typischen Probleme:
              </p>
              <ul className="space-y-4">
                {[
                  "Inkonsistenz: Mal posten Sie 3x pro Woche, dann wieder 4 Wochen gar nichts.",
                  "Ideenmangel: Sie sitzen vor dem leeren Bildschirm und wissen nicht, was Sie filmen sollen.",
                  "Zeitfresser: Ein kurzes Reel kostet Sie intern Stunden an Planung, Dreh und Schnitt.",
                  "Schlechte Qualität: Wackelige Handyvideos ohne roten Faden schaden Ihrer Marke mehr, als sie nützen."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  loading="lazy" src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1200&auto=format&fit=crop" 
                  alt="Social Media Content Creation" 
                  className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-bg/20 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LÖSUNG & NUTZEN */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Die Lösung: Batch-Produktion im Retainer
            </h2>
            <p className="text-gray-400 text-lg">
              Wir bündeln die Produktion. Anstatt jeden Tag mühsam ein Video zu drehen, produzieren wir den Content für einen ganzen Monat an nur einem einzigen Drehtag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Planbarkeit",
                desc: "Sie wissen genau, wann welcher Content online geht. Kein Stress mehr mit spontanen Posts.",
                icon: <CalendarDays className="text-brand-accent" size={32} />
              },
              {
                title: "Zeitersparnis",
                desc: "Sie investieren nur 4-6 Stunden im Monat für den Dreh. Den gesamten Rest übernehmen wir.",
                icon: <Clock className="text-brand-accent" size={32} />
              },
              {
                title: "Algorithmus-Liebe",
                desc: "Regelmäßiger, hochwertiger Content wird von den Plattformen mit massiver organischer Reichweite belohnt.",
                icon: <TrendingUp className="text-brand-accent" size={32} />
              }
            ].map((item, i) => (
              <div key={i} className="bg-brand-bg p-8 rounded-2xl border border-white/5 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGISCHER MIX */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Kein Reel-Zufall, sondern ein strategischer Content-Mix
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Guter Social-Media-Content ist keine Aneinanderreihung hübscher Clips. Er ist eine bewusste Mischung, die Menschen über mehrere Stufen begleitet – vom ersten Kontakt bis zur Anfrage. Genau das liefert der Retainer: einen Mix, der je nach Ziel unterschiedlich gewichtet wird.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Vertrauen & Sympathie", desc: "Echte Gesichter und Stimmen, die Nähe schaffen, bevor jemand kauft oder sich bewirbt." },
              { title: "Information & Expertise", desc: "Sie zeigen, dass Sie Ihr Handwerk verstehen – und werden zur naheliegenden Wahl." },
              { title: "Visuelle Darstellung", desc: "Produkte, Ergebnisse, Atmosphäre. Was man sieht, glaubt man eher." },
              { title: "Problemlösung", desc: "Sie beantworten die Fragen, die Ihre Zielgruppe ohnehin hat." },
              { title: "Leads & Conversion", desc: "Formate, die gezielt zur Handlung führen und auf Umsatz einzahlen." },
              { title: "Die richtige Gewichtung", desc: "Welche Mischung passt, hängt davon ab, was Sie gerade brauchen – Sichtbarkeit, Vertrauen oder konkrete Anfragen." }
            ].map((item, i) => (
              <div key={i} className="bg-brand-darker border border-white/5 p-6 rounded-2xl">
                <h3 className="text-lg font-display font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-darker border border-brand-accent/20 p-8 md:p-10 rounded-3xl max-w-4xl">
            <h3 className="text-2xl font-display font-bold mb-4">Reichweite ist nicht gleich Umsatz</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Nicht jedes Reel hat denselben Job. <strong className="text-white">Virale und Entertainment-Reels</strong> bauen Reichweite und Bekanntheit auf – sie bringen Sie ins Gespräch, machen für sich genommen aber meist wenig bis keinen direkten Umsatz. <strong className="text-white">Lead- und Conversion-Reels</strong> sind der eigentliche Umsatzhebel – sie bekommen organisch oft weniger Aufmerksamkeit, führen aber gezielt zur Handlung.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Deshalb unsere Empfehlung: Reichweiten-Content organisch laufen lassen – und die umsatzstarken Lead- und Conversion-Reels zusätzlich <strong className="text-white">gezielt über Ads bewerben</strong>, damit sie genau die Menschen erreichen, die sonst nie darüber gestolpert wären. So arbeitet Ihr Content nicht nur für Likes, sondern für Ihr Geschäft.
            </p>
            <Button href="/leistungen/werbevideo" variant="outline">
              Mehr zu Werbevideos &amp; Social Ads
            </Button>
          </div>
        </div>
      </section>

      {/* REFERENZ: GEWE */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Aus der Praxis: eine laufende Content-Partnerschaft
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Wie wir einen Mittelständler Monat für Monat beim Aufbau seiner Video-Präsenz begleiten.
            </p>
          </div>

          <div className="max-w-4xl bg-brand-bg border border-white/5 rounded-3xl p-8 md:p-12">
            <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">Content-Partnerschaft · 12 Monate</div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">GEWE Reifen &amp; Räder – Felgenmarken ASA &amp; TEC</h3>
            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p>
                GEWE Reifen &amp; Räder – der Großhändler hinter den Felgenmarken <strong className="text-white">ASA</strong> und <strong className="text-white">TEC</strong> – öffnet sich gerade dem Endkundengeschäft: neuer Konfigurator, Direktbestellung für Privatkunden. Ein Schritt, der Sichtbarkeit und Vertrauen braucht – und dafür gibt es kaum ein stärkeres Mittel als Video und Social Media.
              </p>
              <p>
                Seit dem Start der Partnerschaft produzieren wir das komplette Content-Fundament: bis zu <strong className="text-white">20 Talking-Head-Clips aus nur 1–2 Stunden Interviewmaterial</strong> (mit Untertiteln), Produktvideos von Felgen und Reifen – als Einzelteil und komplett am Fahrzeug montiert –, Unboxings, Messebegleitung und Fotomaterial sowie werbetaugliche, auf Leads und Conversions ausgelegte Reels, auf Wunsch mit Motion Graphics.
              </p>
              <p>
                Unsere Devise: <strong className="text-white">Overproduction</strong>. Wir produzieren genug für bis zu ein Reel pro Tag – lieber mehr, damit das Unternehmen durchgängig versorgt ist. Jedes Format beginnt strategisch: Was soll es erreichen, wie bauen wir es auf? Test-Reels gehen live, wir analysieren die Performance und entscheiden datenbasiert – Reedit oder Neuverfilmung. Auf Wunsch archivieren wir das Rohmaterial für spätere Weiterverwertung.
              </p>
              <p>
                Die Bildsprache: starke Visuals, wie es einem Mittelständler gebührt – professionell ausgeleuchtet, mit <strong className="text-white">Charakter statt Hochglanz</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAS UNS UNTERSCHEIDET */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Was uns von einer klassischen Social-Media-Agentur unterscheidet
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Echte Menschen, ohne gestellten Look", desc: "Ihre Mitarbeiter und Sie sind keine Schauspieler – die meisten verkrampfen vor der Kamera, und genau das spürt der Zuschauer. Unsere wichtigste Fähigkeit ist deshalb die Menschenführung: auf Augenhöhe, mit Empathie und den richtigen Fragen, bis echte, fühlbare Aussagen entstehen. Für den Einstieg: frei sprechen, Teleprompter mit Volltext oder mit Stichpunkten." },
              { title: "Licht als Werkzeug, kein Zufall", desc: "Von dezent-aber-sauber bis zum aufwändigen Setup steuern wir die Wirkung gezielt – professionell, aber mit Charakter statt seelenlosem Hochglanz. Der Zuschauer soll fühlen, was gesagt wird." },
              { title: "Ein Drehtag, viele Formate", desc: "Aus 1–2 Stunden Interviewmaterial entstehen bis zu 20 Talking-Head-Clips. Das hält Ihren Zeitaufwand gering und Ihren Content-Kalender voll." },
              { title: "Overproduction & datenbasiertes Nachschärfen", desc: "Wir produzieren lieber mehr als zu wenig. Test-Formate gehen live, wir analysieren, was funktioniert, und entscheiden datenbasiert: Reedit oder neu drehen. So wird der Content mit der Zeit besser, nicht beliebiger." },
              { title: "Ein fester Ansprechpartner aus der Region", desc: "Sie arbeiten direkt mit dem Gründer, aus Kaiserslautern, mit kurzen Wegen in der Pfalz. Kein wechselndes Junior-Team, kein Agentur-Overhead." },
              { title: "Alles aus einer Hand", desc: "Konzept, Dreh, Licht, Schnitt, Motion Graphics und Untertitel – aus einer Hand. Für größere Produktionen holen wir gezielt erfahrene Partner aus unserem Netzwerk dazu." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-brand-accent shrink-0 mt-1" size={24} />
                <div>
                  <strong className="text-white block text-lg mb-2">{item.title}</strong>
                  <span className="text-gray-400 leading-relaxed">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABLAUF / PROZESS */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              So funktioniert der monatliche Rhythmus
            </h2>
            <p className="text-gray-400 text-lg">
              Ein eingespielter Prozess, der Ihnen maximale Arbeit abnimmt und konstante Ergebnisse liefert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/10" />
            {[
              { step: "01", title: "Redaktionsplan", desc: "Wir liefern proaktiv Ideen, Skripte und Hooks für den kommenden Monat." },
              { step: "02", title: "Batch-Dreh", desc: "Ein effizienter Drehtag (ca. 4h) bei Ihnen vor Ort für alle Videos des Monats." },
              { step: "03", title: "Postproduktion", desc: "Dynamischer Schnitt, Untertitel, Effekte und Sounddesign." },
              { step: "04", title: "Freigabe", desc: "Sie sichten alle Videos bequem über unsere Feedback-Plattform." },
              { step: "05", title: "Ready to Post", desc: "Auslieferung der fertigen Clips inkl. Textvorschlägen für die Plattformen." }
            ].map((p, i) => (
              <div key={i} className="relative pt-8 md:pt-0">
                <div className="w-12 h-12 rounded-full bg-brand-bg border border-brand-accent text-brand-accent flex items-center justify-center font-bold text-lg mx-auto mb-6 relative z-10">
                  {p.step}
                </div>
                <h3 className="text-lg font-display font-bold text-center mb-3">{p.title}</h3>
                <p className="text-sm text-gray-400 text-center">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VORTEILE / ERGEBNISSE */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                Warum ein Retainer die beste Wahl ist
              </h2>
              <ul className="space-y-6">
                {[
                  { title: "Günstiger als Einzelvideos", desc: "Durch die gebündelte Produktion sinkt der Preis pro Video erheblich." },
                  { title: "Immer Top of Mind", desc: "Wer regelmäßig postet, bleibt im Gedächtnis der Zielgruppe verankert." },
                  { title: "Kein Inhouse-Team nötig", desc: "Sie sparen sich die Kosten für teure Festanstellungen von Videografen und Cuttern." },
                  { title: "Schnelle Reaktionszeit", desc: "Da wir Ihre Marke kennen, können wir bei aktuellen Trends sofort reagieren." },
                  { title: "Einheitlicher Look", desc: "Ihr Feed sieht professionell aus und zahlt auf eine starke Markenidentität ein." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="text-brand-accent shrink-0 mt-1" size={24} />
                    <div>
                      <strong className="text-white block text-lg mb-1">{item.title}</strong>
                      <span className="text-gray-400">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-brand-darker border border-white/5 p-10 rounded-3xl">
                <h3 className="text-2xl font-display font-bold mb-6">Konsistenz schlägt Viralität</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Viele Unternehmen jagen dem einen viralen Hit hinterher. Doch im B2B und im gehobenen B2C-Segment gewinnt nicht der Lauteste, sondern der Zuverlässigste.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Vertrauen baut sich auf, wenn Ihre Zielgruppe Sie <strong className="text-white">immer wieder</strong> sieht. Mit hochwertigen Inhalten, die echte Probleme lösen. Ein Social Media Retainer ist kein Sprint, sondern ein strategischer Marathon, der Ihre Marke langfristig unangreifbar macht.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PREISORIENTIERUNG */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Was kostet die monatliche Content-Produktion?
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Unsere Social Media Retainer beginnen <strong className="text-white">ab 1.490 € pro Monat</strong>.
            </p>
            <p className="text-gray-400 mb-10">
              Der Preis skaliert mit Ihren Anforderungen: Wie viele Plattformen bespielen wir? Wie viele Videos (z.B. 4, 8 oder 12) benötigen Sie pro Monat? Übernehmen wir auch das Community Management? In einem kurzen Gespräch finden wir das perfekte Setup für Ihr Budget.
            </p>
            <Button href="/kontakt?service=social-media" variant="outline" size="lg">
              Individuelles Angebot anfragen
            </Button>
          </div>
        </div>
      </section>

      <ServiceBlogLinks service="social-media" />

      {/* 10. ABSCHLUSS CALL-TO-ACTION */}
      <section className="py-32 bg-brand-accent text-brand-darker text-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
            Schluss mit dem Content-Stress.
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90 font-medium">
            Geben Sie Ihre Videoproduktion in professionelle Hände und konzentrieren Sie sich wieder auf Ihr Kerngeschäft.
          </p>
          <Button 
            href="/kontakt?service=social-media" 
            size="lg" 
            className="bg-brand-darker text-white hover:bg-brand-darker/90 text-lg px-8 py-6 h-auto gap-2 border-none"
          >
            Retainer anfragen <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      {/* 11. FAQ BEREICH */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-gray-400">
              Alles, was Sie über unsere Social Media Retainer wissen müssen.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-white/10 rounded-2xl overflow-hidden bg-brand-darker"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-lg pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`text-brand-accent transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
