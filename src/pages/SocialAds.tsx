import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "@/components/SEO";
import { 
  CheckCircle2, 
  ArrowRight, 
  MousePointerClick, 
  TrendingUp, 
  Smartphone, 
  PlaySquare, 
  ChevronDown,
  Star,
  Target,
  Zap
} from "lucide-react";

export default function SocialAds() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const formats = [
    {
      title: "Performance Ads (Social Media)",
      desc: "Kurze, aufmerksamkeitsstarke Clips, die nativ in den Feed passen. Entwickelt, um den Scroll-Vorgang sofort zu stoppen.",
      benefit: "Hohe Klickraten (CTR) und günstigere Conversion-Kosten.",
      useCase: "Meta Ads (Facebook/Instagram), TikTok, LinkedIn",
      icon: <Smartphone className="text-brand-accent" size={24} />
    },
    {
      title: "Produkt-Werbespots",
      desc: "Hochwertige Inszenierung Ihrer Produkte. Wir zeigen nicht nur Eigenschaften, sondern wecken echte Begehrlichkeit.",
      benefit: "Steigert den wahrgenommenen Wert und den Umsatz.",
      useCase: "YouTube Pre-Rolls, Landingpages, E-Commerce",
      icon: <PlaySquare className="text-brand-accent" size={24} />
    },
    {
      title: "Problem-Solution-Ads",
      desc: "Wir adressieren den Schmerzpunkt Ihrer Zielgruppe und präsentieren Ihr Angebot als die logische Lösung.",
      benefit: "Schnelles Verständnis und hohe Relevanz beim Nutzer.",
      useCase: "Retargeting-Kampagnen, B2B Leadgenerierung",
      icon: <Target className="text-brand-accent" size={24} />
    },
    {
      title: "UGC-Style & Native Content",
      desc: "Werbung, die nicht wie Werbung aussieht. Authentische Videos im User-Generated-Content-Stil für maximale Akzeptanz.",
      benefit: "Baut sofortiges Vertrauen auf und wirkt extrem authentisch.",
      useCase: "TikTok Ads, Instagram Reels, Influencer-Kampagnen",
      icon: <Zap className="text-brand-accent" size={24} />
    }
  ];

  const faqs = [
    {
      question: "Was kostet ein Social Ad Video?",
      answer: "Ein einzelner, hochwertiger Werbespot beginnt bei uns ab ca. 1.490 €. Für Performance Marketing empfehlen wir jedoch Ad-Pakete (ab 2.490 €), bei denen wir aus einem Drehtag direkt mehrere Hooks, Längen und Varianten für A/B-Testing produzieren."
    },
    {
      question: "Schalten Sie die Werbeanzeigen auch für uns?",
      answer: "Wir sind Experten für die Kreation und Produktion von hochkonvertierenden Videos (Creative-Fokus). Für das Media Buying (das eigentliche Schalten der Ads) arbeiten wir entweder mit Ihrem internen Performance-Team zusammen oder empfehlen Ihnen spezialisierte Partneragenturen aus unserem Netzwerk."
    },
    {
      question: "Wie viele Varianten erhalten wir?",
      answer: "Das definieren wir gemeinsam in der Strategiephase. Oft produzieren wir ein Basis-Video und erstellen davon 3-5 verschiedene Einstiege (Hooks) sowie unterschiedliche Call-to-Actions, damit Sie testen können, was bei Ihrer Zielgruppe am besten funktioniert."
    },
    {
      question: "In welchen Formaten werden die Ads geliefert?",
      answer: "Sie erhalten alle Videos plattformgerecht optimiert. Standardmäßig liefern wir 9:16 (für Reels/TikTok/Stories), 4:5 (für den Feed) und 16:9 (für YouTube oder Website)."
    },
    {
      question: "Wie schnell können die Ads produziert werden?",
      answer: "Da im Performance Marketing oft Schnelligkeit zählt, haben wir unsere Prozesse für Social Ads optimiert. Von der Hook-Entwicklung bis zur Auslieferung der fertigen Creatives vergehen in der Regel 2 bis 4 Wochen."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32">
      <SEO 
        title="Social Media Ads & Werbespots Agentur | Saarland & RLP"
        description="Performance-starke Werbevideos und Social Ads für messbare Ergebnisse und Sichtbarkeit im digitalen Raum. Conversion-optimierte Videoproduktion im Umkreis von 100km (Mainz, Mannheim)."
        canonical="/leistungen/werbevideo"
        keywords="Social Media Ads Kaiserslautern, Werbevideo Mannheim, Performance Marketing Agentur Saarland, Video Marketing Rheinland-Pfalz"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Social Media Ads & Werbevideos",
          "description": "Performance-starke Werbevideos und Social Ads für messbare Ergebnisse auf Plattformen wie Instagram, TikTok und LinkedIn.",
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
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "125"
          },
          "offers": {
            "@type": "Offer",
            "price": "1490.00",
            "priceCurrency": "EUR",
            "description": "Ab 1.490 € zzgl. MwSt."
          }
        }}
      />
      {/* 1. HERO SECTION */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent font-medium text-sm mb-6">
              Werbevideo & Social Media Ads
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-[1.1]">
              Mehr Aufmerksamkeit. <span className="text-brand-accent italic">Mehr Umsatz.</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-10">
              Wir produzieren Performance-starke Werbevideos und Social Ads, die den Scroll-Vorgang stoppen, Klicks generieren und Ihre Zielgruppe zum Handeln bewegen – professionell umgesetzt für Unternehmen von Kaiserslautern über Mannheim bis Frankfurt.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/kontakt?service=werbevideo" size="lg" className="gap-2">
                Kampagne anfragen <ArrowRight size={18} />
              </Button>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <CheckCircle2 className="text-brand-accent" size={20} />
                <span>Conversion-optimierte Videoproduktion für messbare Ergebnisse.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LEISTUNGSBEREICHE / VIDEOFORMATE */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Welche Werbevideos wir produzieren
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Von der starken Brand-Kampagne bis zum nativen TikTok-Creative: Wir liefern die Formate, die Ihre Performance-Ziele erreichen.
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
                    <MousePointerClick className="text-brand-accent shrink-0 mt-1" size={16} />
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ihre Ads verbrennen Budget, ohne zu konvertieren?
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Die Aufmerksamkeitsspanne auf Social Media liegt bei unter 3 Sekunden. Wenn Ihr Video in dieser Zeit nicht überzeugt, scrollt der Nutzer weiter – und Sie zahlen für wertlose Impressionen. Die häufigsten Probleme:
              </p>
              <ul className="space-y-4">
                {[
                  "Schwache Hooks: Die ersten Sekunden sind langweilig, niemand schaut das Video zu Ende.",
                  "Zu werblich: Die Videos sehen aus wie klassisches TV-Marketing und werden auf Social Media ignoriert.",
                  "Fehlender Fokus: Das Video erklärt zu viel auf einmal, anstatt einen klaren Schmerzpunkt zu lösen.",
                  "Creative Fatigue: Ihre alten Bilder und Videos funktionieren nicht mehr, die Klickpreise (CPC) steigen rasant."
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
                  loading="lazy" src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop" 
                  alt="Social Media Marketing" 
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Creatives, die den Algorithmus und Ihre Kunden lieben
            </h2>
            <p className="text-gray-400 text-lg">
              Erfolgreiche Social Ads sind kein Zufall, sondern das Ergebnis aus Verkaufspsychologie, visuellem Storytelling und datengetriebenen Tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Scroll-Stopper",
                desc: "Wir entwickeln starke visuelle und textliche Hooks für die ersten 3 Sekunden, die maximale Aufmerksamkeit garantieren.",
                icon: <Zap className="text-brand-accent" size={32} />
              },
              {
                title: "Klare Botschaft",
                desc: "Wir bringen Ihren USP auf den Punkt. Keine langen Intros, sondern direkter Fokus auf den Nutzen für den Kunden.",
                icon: <Target className="text-brand-accent" size={32} />
              },
              {
                title: "Höherer ROAS",
                desc: "Durch A/B-Testing verschiedener Varianten senken wir Ihre Klickpreise und steigern messbar Ihren Return on Ad Spend.",
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

      {/* 5. BEISPIELE / REFERENZEN */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Performance, die sich auszahlt
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Wie wir mit strategischen Video-Creatives die Marketingziele unserer Kunden übertroffen haben.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case 1 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  loading="lazy" src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop" 
                  alt="E-Commerce Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">E-Commerce & Retail</div>
                <h3 className="text-2xl font-display font-bold mb-6">Umsatzskalierung durch Video Ads</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Die bisherigen Bild-Anzeigen auf Meta (Facebook/Instagram) wurden zu teuer, der ROAS sank kontinuierlich.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Produktion eines Ad-Pakets mit 4 verschiedenen Hooks (Problem-Fokus, Produkt-Fokus, UGC-Style) für intensives A/B-Testing.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Halbierung der Cost-per-Acquisition (CPA) und eine Steigerung des ROAS um 140 % innerhalb von 6 Wochen.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  loading="lazy" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" 
                  alt="B2B Software Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">B2B Software (SaaS)</div>
                <h3 className="text-2xl font-display font-bold mb-6">Qualifizierte Leadgenerierung</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Whitepaper-Downloads generierten zwar Leads, aber die Qualität war zu niedrig für den Vertrieb.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Eine LinkedIn-Videokampagne, die das komplexe Software-Problem visuell in 45 Sekunden auf den Punkt bringt.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Weniger, aber dafür hochqualifizierte Leads. Die Abschlussrate des Vertriebs stieg um 35 %.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABLAUF / PROZESS */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Unser Prozess für konvertierende Ads
            </h2>
            <p className="text-gray-400 text-lg">
              Wir produzieren nicht einfach drauf los. Jede Szene ist strategisch geplant, um den Nutzer zur gewünschten Handlung zu führen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/10" />
            {[
              { step: "01", title: "Performance Strategie", desc: "Analyse von Zielgruppe, Pain Points und Plattform-Best-Practices." },
              { step: "02", title: "Hook- & Skripting", desc: "Entwicklung starker Einstiege und klarer Call-to-Actions." },
              { step: "03", title: "Effiziente Produktion", desc: "Fokus auf Materialvielfalt für spätere Schnitt-Varianten." },
              { step: "04", title: "Schnitt & Varianten", desc: "Erstellung verschiedener Versionen für Ihr A/B-Testing." },
              { step: "05", title: "Campaign Ready", desc: "Auslieferung in allen benötigten Formaten (9:16, 4:5, 16:9)." }
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                Ihre Vorteile mit professionellen Video Ads
              </h2>
              <ul className="space-y-6">
                {[
                  { title: "Messbare Ergebnisse", desc: "Im Gegensatz zu klassischer Werbung sehen Sie genau, welcher Clip Umsatz bringt." },
                  { title: "Skalierbarkeit", desc: "Ein funktionierendes Video-Creative ist der Hebel, um Ihr Werbebudget profitabel zu skalieren." },
                  { title: "Günstigere Klickpreise", desc: "Plattformen wie Meta oder TikTok belohnen gute Videos mit günstigeren Ausspielungskosten." },
                  { title: "Markenbekanntheit", desc: "Selbst Nutzer, die nicht sofort kaufen, behalten Ihre Marke durch starke Bilder im Gedächtnis." },
                  { title: "A/B-Testing fähig", desc: "Durch unsere modulare Produktion können Sie datenbasiert testen, was funktioniert." }
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
                <h3 className="text-2xl font-display font-bold mb-6">Creative is the new Targeting</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Früher konnten Media Buyer Zielgruppen auf Facebook bis ins kleinste Detail einstellen. Heute übernehmen die Algorithmen das Targeting – basierend darauf, wer sich Ihr Video ansieht.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Das bedeutet: <strong className="text-white">Das Video-Creative ist heute der wichtigste Erfolgsfaktor im Performance Marketing.</strong> Wenn das Video Ihre Zielgruppe nicht anspricht, verbrennen Sie Budget. Wir liefern Ihnen die Creatives, die den Algorithmus für Sie arbeiten lassen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL PROOF */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">
            Was unsere Kunden sagen
          </h2>
          <div className="max-w-4xl mx-auto bg-brand-bg border border-white/5 p-10 md:p-16 rounded-3xl relative">
            <div className="text-brand-accent mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
            </div>
            <p className="text-xl md:text-2xl font-light italic text-gray-300 mb-8 leading-relaxed">
              "Wir hatten das Problem der 'Creative Fatigue' – unsere Ads wurden einfach zu teuer. Das Team hat uns nicht nur ein tolles Video gedreht, sondern direkt ein ganzes Paket an Hooks und Varianten geliefert. Damit konnten wir unseren ROAS innerhalb von wenigen Wochen wieder in den profitablen Bereich skalieren."
            </p>
            <div>
              <strong className="text-white block text-lg">Marketing Manager</strong>
              <span className="text-gray-400">E-Commerce Brand</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PREISORIENTIERUNG */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Was kosten Performance Ads?
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed text-left">
              Ein einzelner, hochwertiger Werbespot beginnt bei uns <strong className="text-white">ab 1.490 €</strong>.
            </p>
            <p className="text-gray-400 mb-10 text-left">
              Für erfolgreiches Performance Marketing empfehlen wir jedoch unsere <strong className="text-white">Ad-Pakete (ab 2.490 €)</strong>. Hierbei nutzen wir einen Drehtag maximal effizient, um direkt mehrere Hooks, Längen und Varianten für Ihr A/B-Testing zu produzieren. Das senkt Ihre Kosten pro Video enorm.
            </p>
            <Button href="/kontakt?service=werbevideo" variant="outline" size="lg">
              Kostenlose Einschätzung anfragen
            </Button>
          </div>
        </div>
      </section>

      {/* 10. ABSCHLUSS CALL-TO-ACTION */}
      <section className="py-32 bg-brand-accent text-brand-darker text-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
            Bereit für mehr Conversions?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90 font-medium">
            Lassen Sie uns unverbindlich darüber sprechen, wie wir mit strategischen Video-Creatives Ihre Marketingziele übertreffen.
          </p>
          <Button 
            href="/kontakt?service=werbevideo" 
            size="lg" 
            className="bg-brand-darker text-white hover:bg-brand-darker/90 text-lg px-8 py-6 h-auto gap-2 border-none"
          >
            Kampagne starten <ArrowRight size={20} />
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
              Alles, was Sie über die Produktion von Werbevideos und Social Ads wissen müssen.
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
