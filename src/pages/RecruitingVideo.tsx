import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Building2, 
  Coffee, 
  MessageSquare, 
  ChevronDown,
  Star,
  UserPlus,
  HeartHandshake,
  TrendingUp
} from "lucide-react";

export default function RecruitingVideo() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const formats = [
    {
      title: "Employer Branding Film",
      desc: "Das große Ganze: Wir zeigen Ihre Unternehmenskultur, Ihre Werte und warum es sich lohnt, Teil Ihres Teams zu sein.",
      benefit: "Langfristiger Aufbau einer starken Arbeitgebermarke.",
      useCase: "Karriereseite, Jobmessen, Social Media",
      icon: <Building2 className="text-brand-accent" size={24} />
    },
    {
      title: "Mitarbeiter-Testimonials",
      desc: "Echte Stimmen aus dem Team. Ihre Mitarbeiter erzählen authentisch von ihrem Arbeitsalltag und den Vorteilen im Unternehmen.",
      benefit: "Höchste Glaubwürdigkeit bei potenziellen Bewerbern.",
      useCase: "Stellenanzeigen, LinkedIn, Instagram",
      icon: <MessageSquare className="text-brand-accent" size={24} />
    },
    {
      title: "Job-spezifische Videos",
      desc: "Kurze, knackige Clips für konkrete Vakanzen. Wir zeigen den genauen Arbeitsplatz, das Team und die Aufgaben.",
      benefit: "Mehr qualifizierte Bewerbungen für schwer besetzbare Stellen.",
      useCase: "Social Recruiting Ads (Meta, TikTok), Stepstone",
      icon: <UserPlus className="text-brand-accent" size={24} />
    },
    {
      title: "Behind the Scenes / Kultur",
      desc: "Ein ungeschönter Blick hinter die Kulissen. Team-Events, das Büro, die Kaffeemaschine – das echte Leben im Unternehmen.",
      benefit: "Baut Hemmschwellen ab und schafft sofortige Sympathie.",
      useCase: "Instagram Reels, TikTok, Karriereseite",
      icon: <Coffee className="text-brand-accent" size={24} />
    }
  ];

  const faqs = [
    {
      question: "Was kostet ein Recruiting Video?",
      answer: "Ein smartes Recruiting Video beginnt bei uns ab 1.890 €. Wir bieten effiziente Lösungen an, die schnell einsatzbereit sind. Der Preis hängt davon ab, ob wir einen umfangreichen Employer Branding Film produzieren oder knackige, authentische Statements für Social Media benötigen."
    },
    {
      question: "Unsere Mitarbeiter sind kamerascheu. Ist das ein Problem?",
      answer: "Überhaupt nicht. Das ist völlig normal. Wir arbeiten nicht mit starren Skripten, sondern führen lockere Interviews. Durch unsere entspannte Art am Set vergessen die meisten schnell, dass eine Kamera läuft. So entstehen die authentischsten Aussagen."
    },
    {
      question: "Wie lange dauert die Umsetzung?",
      answer: "Von der ersten Idee bis zum fertigen Video vergehen meist 3 bis 5 Wochen. Wenn Sie dringend eine offene Stelle besetzen müssen, können wir die Produktion von job-spezifischen Videos auch priorisieren."
    },
    {
      question: "Für welche Plattformen eignen sich die Videos?",
      answer: "Wir produzieren die Videos so, dass sie überall funktionieren. Sie erhalten Formate für Ihre Karriereseite (16:9) sowie optimierte Hochformate (9:16) für Social Media Ads auf Instagram, Facebook, TikTok oder LinkedIn."
    },
    {
      question: "Helfen Sie auch bei der Verbreitung der Videos?",
      answer: "Wir sind Experten für die Videoproduktion. Für die Ausspielung (Social Recruiting Ads) arbeiten wir bei Bedarf mit spezialisierten Partneragenturen zusammen oder liefern Ihrem internen Marketing-Team das perfekte Material für erfolgreiche Kampagnen."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32">
      <Helmet>
        <title>Recruiting Videos & Employer Branding | Kaiserslautern & Mannheim</title>
        <meta name="description" content="Gewinnen Sie Top-Talente mit effizienten Recruiting Videos. Authentisch, schnell und bezahlbar ab 1.890 €. Produktion in Kaiserslautern, Mannheim & Südwesten." />
        <link rel="canonical" href="https://www.rezaivision.de/leistungen/recruiting" />
        <meta name="keywords" content="Recruiting Video Kaiserslautern, Mitarbeitergewinnung Mannheim, Employer Branding RLP, Recruiting Agentur" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Recruiting Video & Employer Branding",
            "description": "Authentische Recruiting Videos und Employer Branding Filme zur Gewinnung qualifizierter Fachkräfte im Südwesten Deutschlands.",
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
              "price": "1890.00",
              "priceCurrency": "EUR",
              "description": "Ab 1.890 € zzgl. MwSt."
            }
          })}
        </script>
      </Helmet>
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
              Recruiting Video / Employer Branding
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-[1.1]">
              Ziehen Sie die <span className="text-brand-accent italic">richtigen Talente</span> an.
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-10">
              Machen Sie Ihre Unternehmenskultur erlebbar. Wir produzieren authentische Recruiting Videos, die Fachkräfte überzeugen und Bewerbungshürden abbauen.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/kontakt?service=recruiting" size="lg" className="gap-2">
                Projekt anfragen <ArrowRight size={18} />
              </Button>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <CheckCircle2 className="text-brand-accent" size={20} />
                <span>Spezialisiert auf authentisches Employer Branding für den Mittelstand.</span>
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
              Welche Recruiting Videos wir produzieren
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Ob Sie Ihre Arbeitgebermarke langfristig stärken oder akut offene Stellen besetzen müssen – wir haben das passende Videoformat.
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
                    <Users className="text-brand-accent shrink-0 mt-1" size={16} />
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
                Gute Leute zu finden, war noch nie so schwer.
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Der Fachkräftemangel ist real. Klassische Stellenanzeigen funktionieren kaum noch, weil sich gute Leute nicht aktiv bewerben – sie müssen überzeugt werden zu wechseln. Die typischen Probleme:
              </p>
              <ul className="space-y-4">
                {[
                  "Unsichtbarkeit: Ihre Stellenanzeigen gehen in der Masse der Jobportale unter.",
                  "Austauschbarkeit: 'Flache Hierarchien' und 'Obstkorb' bieten heute alle an.",
                  "Fehlendes Vertrauen: Bewerber wissen nicht, wie es wirklich ist, bei Ihnen zu arbeiten.",
                  "Hohe Kosten: Headhunter und teure Jobportale fressen das Recruiting-Budget auf, ohne Garantie auf Erfolg."
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
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" 
                  alt="Bewerbungsgespräch" 
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
              Machen Sie Ihr Unternehmen als Arbeitgeber greifbar
            </h2>
            <p className="text-gray-400 text-lg">
              Ein authentisches Recruiting Video zeigt nicht nur den Arbeitsplatz, sondern das Gefühl, Teil Ihres Teams zu sein. Es baut Hemmschwellen ab und weckt den Wunsch, bei Ihnen zu arbeiten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Passende Bewerber anziehen",
                desc: "Wer Ihre Kultur im Video sieht und sich damit identifiziert, passt auch menschlich besser ins Team.",
                icon: <UserPlus className="text-brand-accent" size={32} />
              },
              {
                title: "Vertrauen aufbauen",
                desc: "Echte Mitarbeiter, die ungeskriptet über ihren Job sprechen, sind glaubwürdiger als jeder Werbetext.",
                icon: <HeartHandshake className="text-brand-accent" size={32} />
              },
              {
                title: "Bewerbungshürden senken",
                desc: "Ein Video gibt Sicherheit. Der Bewerber weiß bereits vor dem ersten Gespräch, wer ihn erwartet.",
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
              Recruiting, das funktioniert
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Wie wir Unternehmen helfen, ihre offenen Stellen mit den richtigen Köpfen zu besetzen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case 1 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop" 
                  alt="Handwerk Recruiting Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">Handwerk & Technik</div>
                <h3 className="text-2xl font-display font-bold mb-6">Fachkräfte für den Mittelstand</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Monatelang unbesetzte Stellen für spezialisierte Techniker. Klassische Anzeigen blieben wirkungslos.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Eine Serie kurzer, authentischer Social Media Clips, in denen die Monteure ihren echten Arbeitsalltag und die Vorteile (z.B. eigenes Fahrzeug) zeigen.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Über 15 qualifizierte Bewerbungen innerhalb von 4 Wochen durch gezielte Social Media Kampagnen.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-darker">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
                  alt="IT Unternehmen Recruiting Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">IT & Software</div>
                <h3 className="text-2xl font-display font-bold mb-6">Kultur als Wettbewerbsvorteil</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block mb-1">Problem:</strong>
                    <span className="text-gray-400 text-sm">Starke Konkurrenz durch Großkonzerne im Kampf um Entwickler. Das Startup-Feeling kam online nicht rüber.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Lösung:</strong>
                    <span className="text-gray-400 text-sm">Ein dynamischer Employer Branding Film, der den Team-Spirit, die modernen Büros und die flexiblen Arbeitsweisen in den Fokus rückt.</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Ergebnis:</strong>
                    <span className="text-gray-400 text-sm">Signifikante Steigerung der Initiativbewerbungen und eine deutlich gestärkte Arbeitgebermarke in der Region.</span>
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
              In 5 Schritten zu mehr Bewerbungen
            </h2>
            <p className="text-gray-400 text-lg">
              Wir wissen, dass Ihre Mitarbeiter keine Schauspieler sind. Unser Prozess sorgt für eine entspannte Atmosphäre und authentische Ergebnisse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/10" />
            {[
              { step: "01", title: "Bedarfsanalyse", desc: "Welche Stellen müssen besetzt werden? Wer ist die Zielgruppe?" },
              { step: "02", title: "Konzept & Fragen", desc: "Wir entwickeln einen Leitfaden für authentische Interviews." },
              { step: "03", title: "Entspannter Dreh", desc: "Wir nehmen Ihrem Team die Scheu vor der Kamera." },
              { step: "04", title: "Schnitt & Dynamik", desc: "Wir schneiden die besten Aussagen zu einem mitreißenden Video." },
              { step: "05", title: "Social Media Ready", desc: "Auslieferung in allen Formaten für Ihre Kampagnen." }
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
                Warum sich ein Recruiting Video lohnt
              </h2>
              <ul className="space-y-6">
                {[
                  { title: "Geringere Cost-per-Hire", desc: "Social Recruiting Kampagnen mit Video sind oft günstiger als Headhunter." },
                  { title: "Passendere Kandidaten", desc: "Bewerber wissen vorher, worauf sie sich einlassen – das reduziert Fehlbesetzungen." },
                  { title: "Emotionale Bindung", desc: "Sie wecken Emotionen, die ein Text in einer Stellenanzeige niemals auslösen kann." },
                  { title: "Höhere Reichweite", desc: "Videos werden auf Social Media öfter geteilt und vom Algorithmus bevorzugt." },
                  { title: "Langfristiges Employer Branding", desc: "Sie bauen sich einen Ruf als moderner, attraktiver Arbeitgeber auf." }
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
                <h3 className="text-2xl font-display font-bold mb-6">Authentizität schlägt Perfektion</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Bewerber haben ein feines Gespür für aufgesetzte Werbebotschaften. Deshalb verzichten wir bei Recruiting Videos auf gekaufte Schauspieler und auswendig gelernte Texte.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Wir lassen Ihre echten Mitarbeiter sprechen. Mit all ihren Ecken und Kanten. Das schafft Vertrauen und zeigt potenziellen Bewerbern: Hier arbeiten echte Menschen, mit denen ich gerne meine Zeit verbringen möchte.
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
              "Wir hatten große Bedenken, ob unsere Mitarbeiter vor der Kamera frei sprechen können. Das Team von Rezai Vision hat ihnen aber sofort die Nervosität genommen. Das Ergebnis ist so authentisch geworden, dass wir bereits in der ersten Woche nach Veröffentlichung drei sehr gute Bewerbungen erhalten haben."
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
              Was kostet ein Recruiting Video?
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Ein effizientes <span className="text-gray-100 font-semibold">Smart Recruiting Video</span> inklusive Konzept, Interviews vor Ort und Postproduktion beginnt bei uns bereits <strong className="text-white">ab 1.890 €</strong>.
            </p>
            <p className="text-gray-400 mb-10">
              Oft macht es Sinn, aus einem Drehtag direkt mehrere kurze Clips für verschiedene Stellenprofile oder Social Media Ads zu produzieren. So nutzen Sie Ihr Budget maximal effizient. Lassen Sie uns Ihre Anforderungen besprechen.
            </p>
            <Button href="/kontakt?service=recruiting" variant="outline" size="lg">
              Kostenlose Einschätzung anfragen
            </Button>
          </div>
        </div>
      </section>

      {/* 10. ABSCHLUSS CALL-TO-ACTION */}
      <section className="py-32 bg-brand-accent text-brand-darker text-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
            Bereit, die besten Talente zu gewinnen?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90 font-medium">
            Lassen Sie uns unverbindlich darüber sprechen, wie wir Ihre Arbeitgebermarke sichtbar machen und Ihre offenen Stellen besetzen.
          </p>
          <Button 
            href="/kontakt?service=recruiting" 
            size="lg" 
            className="bg-brand-darker text-white hover:bg-brand-darker/90 text-lg px-8 py-6 h-auto gap-2 border-none"
          >
            Projekt starten <ArrowRight size={20} />
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
              Alles, was Sie über die Produktion von Recruiting Videos wissen müssen.
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
