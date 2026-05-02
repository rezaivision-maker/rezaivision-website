import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "@/components/SEO";
import { 
  CheckCircle2, 
  ArrowRight, 
  Video, 
  Users, 
  Target, 
  PlayCircle, 
  Film, 
  Briefcase, 
  ChevronDown,
  Star,
  Clock,
  TrendingUp
} from "lucide-react";

export default function CorporateVideo() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const formats = [
    {
      title: "Unternehmensportrait / Markenstory",
      desc: "Zeigen Sie die Menschen, die Werte und die Vision hinter Ihrer Marke. Wir machen Ihre Unternehmenskultur greifbar.",
      benefit: "Schafft tiefe emotionale Bindung und Authentizität.",
      useCase: "Über-uns-Seite, Social Media, Onboarding",
      icon: <Users className="text-brand-accent" size={24} />
    },
    {
      title: "Starke Imagefilme",
      desc: "Starke Produktionen für den perfekten ersten Eindruck. Ein Imagefilm Mittelstand, der Ihre Qualität visuell unterstreicht.",
      benefit: "Authentische Positionierung und maximaler Vertrauensaufbau.",
      useCase: "Website-Startseite, Messen, Präsentationen",
      icon: <Film className="text-brand-accent" size={24} />
    },
    {
      title: "Produkt- & Leistungsdarstellung",
      desc: "Komplexe Angebote und Dienstleistungen einfach und visuell ansprechend erklärt. Zeigen Sie den echten Mehrwert.",
      benefit: "Schnellere Kaufentscheidungen durch klares Verständnis.",
      useCase: "Landingpages, Vertriebsgespräche, B2B-Plattformen",
      icon: <Target className="text-brand-accent" size={24} />
    },
    {
      title: "Case Studies & Testimonials",
      desc: "Echte Kundenstimmen und Erfolgsgeschichten, die überzeugen. Nichts verkauft besser als ein zufriedener Kunde.",
      benefit: "Höchste Glaubwürdigkeit durch Social Proof.",
      useCase: "Sales-Funnel, Social Media Ads, Website",
      icon: <Star className="text-brand-accent" size={24} />
    },
    {
      title: "B-Roll & Aufnahmen vor Ort",
      desc: "Hochwertiges Rohmaterial Ihrer Produktion, Räumlichkeiten oder Dienstleistung für Ihre eigene Content-Erstellung.",
      benefit: "Maximale Flexibilität für zukünftige Marketingmaßnahmen.",
      useCase: "Social Media Content, PR-Material, Hintergrundvideos",
      icon: <Video className="text-brand-accent" size={24} />
    }
  ];

  const faqs = [
    {
      question: "Was kostet ein hochwertiger Unternehmensfilm?",
      answer: "Die Kosten hängen vom Umfang ab (Drehtage, Locations, Darsteller). Ein hochwertiger Unternehmensfilm beginnt bei uns in der Regel ab 2.490 €. In einem kurzen Erstgespräch können wir Ihnen schnell eine verlässliche Einschätzung für Ihr Projekt geben."
    },
    {
      question: "Wie lange dauert die Produktion?",
      answer: "Vom ersten Kick-off bis zum finalen Video vergehen meist 3 bis 6 Wochen. Wenn Sie eine Deadline für eine Messe oder einen Launch haben, können wir nach Absprache auch schnellere Timelines realisieren."
    },
    {
      question: "Wie ist der genaue Ablauf?",
      answer: "Wir starten mit einer strategischen Beratung, entwickeln dann das Konzept und planen den Dreh. Nach der Produktion vor Ort gehen wir in die Postproduktion (Schnitt, Color Grading, Sound). Sie sind in alle wichtigen Freigabeschritte eingebunden."
    },
    {
      question: "In welchen Regionen sind Sie tätig?",
      answer: "Als Videoproduktion aus Kaiserslautern sind wir primär in Rheinland-Pfalz, dem Saarland und der Rhein-Neckar-Region (Mannheim/Heidelberg) aktiv. Wir betreuen aber auch regelmäßig Projekte in Frankfurt und im gesamten Südwesten Deutschlands."
    },
    {
      question: "Wo können wir das Video überall einsetzen?",
      answer: "Wir liefern Ihnen das Video in den passenden Formaten für alle Ihre Kanäle: 16:9 für Ihre Website, YouTube oder Messen, sowie auf Wunsch optimierte Hochformate (9:16) für Social Media wie LinkedIn, Instagram oder TikTok."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32">
      <SEO 
        title="Imagefilm & Unternehmensfilm produzieren lassen | Kaiserslautern, Mannheim, RLP"
        description="Professionelle Videoproduktion für Imagefilme in Rheinland-Pfalz, Saarland und Mannheim. Stärken Sie Ihre Marke visuell ab 2.490 €."
        canonical="/leistungen/unternehmensfilm"
        keywords="Imagefilm Kaiserslautern, Unternehmensfilm Mannheim, Videoproduktion Rheinland-Pfalz, Firmenvideo, Brand Movie, B2B Video"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Imagefilm & Unternehmensfilm",
          "description": "Professionelle Videoproduktion von Imagefilmen und Markenstories für den Mittelstand im Südwesten Deutschlands.",
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
            "price": "2490.00",
            "priceCurrency": "EUR",
            "description": "Ab 2.490 € zzgl. MwSt."
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
              Imagefilm / Unternehmensfilm
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-[1.1]">
              Ihr Unternehmen im besten Licht: <span className="text-brand-accent italic">Professionelle Unternehmensfilme</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-10">
              Als Ihr Partner für Corporate Video Pfalz inszenieren wir Ihre Marke mit starker Bildqualität und strategischem Storytelling. Zeigen Sie, wofür Sie stehen und gewinnen Sie das Vertrauen Ihrer Wunschkunden.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/kontakt?service=unternehmensfilm" size="lg" className="gap-2">
                Projekt anfragen <ArrowRight size={18} />
              </Button>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <CheckCircle2 className="text-brand-accent" size={20} />
                <span>Über 10 Jahre Erfahrung in der Produktion von Filmen und Videos.</span>
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
              Welche Videos wir für Unternehmen produzieren
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Ein Unternehmensfilm ist nicht gleich ein Unternehmensfilm. Wir entwickeln genau das Format, das Ihre Ziele unterstützt und Ihre Zielgruppe erreicht.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <PlayCircle className="text-brand-accent shrink-0 mt-1" size={16} />
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
                Großartige Leistung, aber niemand sieht es?
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Viele mittelständische Unternehmen haben ein exzellentes Angebot und hochqualifizierte Mitarbeiter. Doch der Online-Auftritt spiegelt diese Qualität oft nicht wider. Die Folge:
              </p>
              <ul className="space-y-4">
                {[
                  "Austauschbarkeit: Ihre Website sieht aus wie die der Konkurrenz.",
                  "Erklärungsnot: Komplexe Leistungen lassen sich in Texten schwer vermitteln.",
                  "Verlorenes Vertrauen: Es fällt schwer, den hohen Qualitätsanspruch digital zu beweisen.",
                  "Fehlende Sichtbarkeit: Sie gehen in der digitalen Informationsflut unter."
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
                  loading="lazy" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
                  alt="Team in einem Meeting" 
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
              Machen Sie Ihre Qualität auf den ersten Blick sichtbar
            </h2>
            <p className="text-gray-400 text-lg">
              Eine Videoproduktion ist ihr stärkster digitaler Vertriebsmitarbeiter. Ein Unternehmensfilm arbeitet 24/7 für Sie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Vertrauen aufbauen",
                desc: "Bewegtbild transportiert Emotionen und Authentizität in Sekunden. Kunden sehen, mit wem sie es zu tun haben.",
                icon: <Star className="text-brand-accent" size={32} />
              },
              {
                title: "Marke stärken",
                desc: "Wir machen Ihre Professionalität greifbar und positionieren Sie klar als Experten in Ihrer Branche.",
                icon: <Briefcase className="text-brand-accent" size={32} />
              },
              {
                title: "Umsatz steigern",
                desc: "Ein überzeugender Film erhöht die Verweildauer auf Ihrer Website und verwandelt Besucher in qualifizierte Anfragen.",
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
              Projekte, die wirken
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Wir produzieren nicht nur schöne Bilder, sondern lösen konkrete unternehmerische Herausforderungen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case 1 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  loading="lazy" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                  alt="Industrieunternehmen Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">Industrie & Fertigung</div>
                <h3 className="text-2xl font-display font-bold mb-6">Innovation sichtbar machen</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Hochkomplexe Fertigungsprozesse waren für internationale B2B-Kunden online nicht greifbar.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Ein dynamischer Markenfilm mit Fokus auf High-Tech-Prozesse und Mitarbeiter-Expertise.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Deutliche Aufwertung des Markenimages und spürbar mehr qualifizierte B2B-Anfragen.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  loading="lazy" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop" 
                  alt="B2B Dienstleister Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">B2B Dienstleister</div>
                <h3 className="text-2xl font-display font-bold mb-6">Vertrauen bei Neukunden</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Lange Sales-Zyklen, da die Beratungsleistung stark erklärungsbedürftig war.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Kombination aus Unternehmensportrait und echten Kundenstimmen (Testimonials).</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Das Video dient als Türöffner. Die Abschlussrate nach Erstgesprächen stieg signifikant an.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  loading="lazy" src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" 
                  alt="Recruiting Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">Recruiting</div>
                <h3 className="text-2xl font-display font-bold mb-6">Talente gewinnen</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Fachkräftemangel und Schwierigkeiten, junge Talente anzusprechen.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Authentisches Recruiting-Video mit Fokus auf Unternehmenskultur und Teamgeist.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Mehr qualifizierte Bewerbungen und eine stärkere Arbeitgebermarke.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 4 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  loading="lazy" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop" 
                  alt="Event Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">Event</div>
                <h3 className="text-2xl font-display font-bold mb-6">Events nacherleben</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Events sind flüchtig, der Hype verfliegt schnell.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Dynamischer Aftermovie, der die Energie und Atmosphäre des Events einfängt.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Langfristige Sichtbarkeit und Begeisterung bei Teilnehmern und Interessenten.</span>
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
              In 5 Schritten zum fertigen Film
            </h2>
            <p className="text-gray-400 text-lg">
              Unser Prozess ist darauf ausgelegt, Ihre Zeit zu schonen und maximale Ergebnisse zu liefern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/10" />
            {[
              { step: "01", title: "Beratung & Strategie", desc: "Wir definieren Ziele, Zielgruppe und Kernbotschaften." },
              { step: "02", title: "Konzept & Planung", desc: "Entwicklung der Storyline und detaillierte Drehplanung." },
              { step: "03", title: "Produktion", desc: "Professioneller Dreh vor Ort mit modernster Technik." },
              { step: "04", title: "Postproduktion", desc: "Schnitt, Color Grading, Sound Design und Musik." },
              { step: "05", title: "Veröffentlichung", desc: "Auslieferung in allen Formaten und Support beim Rollout." }
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
                Ihr Nutzen auf einen Blick
              </h2>
              <ul className="space-y-6">
                {[
                  { title: "Professioneller Eindruck", desc: "Sie positionieren sich sofort als verlässlicher Experte in Ihrem Markt." },
                  { title: "Zeitersparnis", desc: "Kunden sind bereits vorqualifiziert und informiert, bevor sie anrufen." },
                  { title: "Mehr Sichtbarkeit", desc: "Videos werden von Algorithmen bevorzugt und generieren mehr Reichweite." },
                  { title: "Höhere Conversion", desc: "Videos auf Landingpages steigern die Anfragen signifikant." },
                  { title: "Stärkere Marke", desc: "Sie heben sich emotional und visuell klar von Ihren Mitbewerbern ab." }
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
                <h3 className="text-2xl font-display font-bold mb-6">Unternehmensfilm Kaiserslautern & bundesweit</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Als Experten für professionelle Videoproduktion wissen wir genau, worauf es im Mittelstand ankommt. Wir produzieren nicht einfach nur Videos, wir schaffen strategische Werkzeuge für Ihr Marketing und Ihren Vertrieb.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Egal ob Sie einen klassischen Imagefilm, ein Recruiting-Video oder Content für Social Media benötigen – wir sind Ihr zuverlässiger Partner von der ersten Idee bis zum fertigen Film.
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
              "Hervorragender Video-Produzent! Die Zusammenarbeit war von Anfang bis Ende absolut professionell. Die Kommunikation war klar, schnell und zuverlässig. Die kreativen Ideen, die technische Umsetzung und die Qualität der finalen Videos haben meine Erwartungen sogar übertroffen."
            </p>
            <div>
              <strong className="text-white block text-lg">Adonay Welde</strong>
              <span className="text-gray-400">Inhaber, Social Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PREISORIENTIERUNG */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Investition in Qualität
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Ein hochwertiger Unternehmensfilm ist eine Investition in Ihre Marke. Wir entwickeln gemeinsam mit Ihnen ein Konzept, das Ihre Ziele präzise verfolgt – vom ersten Brainstorming über den professionellen Drehtag bis hin zur finalen Postproduktion.
            </p>
            <p className="text-gray-400 mb-10">
              Jedes Projekt ist individuell. Lassen Sie uns in einem kurzen Gespräch klären, was für Ihr Unternehmen die beste Lösung ist.
            </p>
            <Button href="/kontakt?service=unternehmensfilm" variant="outline" size="lg">
              Individuelles Angebot anfragen
            </Button>
          </div>
        </div>
      </section>

      {/* 10. ABSCHLUSS CALL-TO-ACTION */}
      <section className="py-32 bg-brand-darker text-center border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
            Lassen Sie uns gemeinsam Ihr Unternehmen inszenieren.
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-400 font-light">
            Wir freuen uns darauf, Ihre Vision in bewegte Bilder zu übersetzen.
          </p>
          <Button 
            href="/kontakt?service=unternehmensfilm" 
            size="lg" 
            className="bg-brand-accent text-brand-darker hover:bg-brand-accent/90 text-lg px-8 py-6 h-auto gap-2 border-none"
          >
            Jetzt unverbindlich anfragen <ArrowRight size={20} />
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
              Alles, was Sie über die Produktion eines Imagefilms wissen müssen.
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
