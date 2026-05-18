import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/SEO";
import { Monitor, Zap, TrendingUp, Layers, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: <Monitor size={22} className="text-brand-accent" />,
    title: "Video-First Design",
    desc: "Deine Website wird von Grund auf um deine Videos herum gebaut – für maximale Wiedergabequalität und Konversion."
  },
  {
    icon: <Zap size={22} className="text-brand-accent" />,
    title: "Blitzschnelle Performance",
    desc: "100/100 Google PageSpeed. Optimierter Code, Lazy Loading und modernste Web-Technologien (React + Vite)."
  },
  {
    icon: <TrendingUp size={22} className="text-brand-accent" />,
    title: "Conversion-optimiert",
    desc: "Jede Sektion, jeder Button und jede Formulierung ist auf Anfragen und Abschlüsse ausgerichtet – nicht auf Awards."
  },
  {
    icon: <Layers size={22} className="text-brand-accent" />,
    title: "Alles aus einer Hand",
    desc: "Video + Website als perfektes Duo. Kein Koordinationsaufwand zwischen Agenturen. Ein Ansprechpartner."
  }
];

const packages = [
  {
    name: "Landingpage",
    price: "ab 1.490 €",
    desc: "Die perfekte, konversionstarke Seite für ein konkretes Ziel: Leads, Bewerbungen oder Verkauf.",
    items: [
      "1 Seite, vollständig responsive",
      "Kontaktformular & WhatsApp-Integration",
      "Video-Einbindung optimiert",
      "Google PageSpeed 90+",
      "Hosting-Einrichtung",
      "SEO-Grundoptimierung",
    ]
  },
  {
    name: "Business Website",
    price: "ab 3.490 €",
    desc: "Eine vollständige Unternehmenswebsite, die als strategisches Werkzeug für dein Wachstum arbeitet.",
    highlight: true,
    items: [
      "Bis zu 8 individuelle Unterseiten",
      "Video-optimiertes Design",
      "Blog / News-Bereich",
      "Google PageSpeed 95+",
      "SEO-Grundstruktur & Sitemap",
      "Cookie-Banner & Rechtssicherheit",
      "30 Tage Support nach Launch",
    ]
  },
  {
    name: "Video + Web Bundle",
    price: "Auf Anfrage",
    desc: "Video-Produktion und Website-Erstellung in einem Paket – die mächtigste Kombination für dein Marketing.",
    items: [
      "Imagefilm oder Recruiting-Video",
      "Komplette Business Website",
      "Abgestimmtes visuelles Konzept",
      "Maximaler Synergieeffekt",
      "Ein Ansprechpartner",
      "Prioritäts-Support",
    ]
  }
];

export default function Webdesign() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <SEO
        title="Webdesign & Homepageerstellung Kaiserslautern | Rezai Vision"
        description="Video-optimierte Websites & Landingpages aus Kaiserslautern. Blitzschnell, conversion-stark und perfekt abgestimmt auf deine Videoproduktion. Alles aus einer Hand."
        canonical="/leistungen/webdesign"
      />

      {/* Hero */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-sm font-medium text-brand-accent mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            Leistung — Webdesign & Homepageerstellung
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-6 leading-tight">
            Die perfekte Bühne für{" "}
            <span className="gold-text-gradient">deine Videos.</span>
          </h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed max-w-3xl mb-10">
            Was bringt der beste Film, wenn er auf einer langsamen, veralteten Website verstaubt? 
            Wir entwickeln blitzschnelle, video-optimierte Websites und Landingpages, 
            die deine Videoproduktion perfekt in Szene setzen – und Besucher in Kunden verwandeln.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/kontakt" size="lg">
              Kostenloses Webdesign-Gespräch buchen
            </Button>
            <Button href="#pakete" variant="outline" size="lg">
              Pakete ansehen <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-brand-darker border-y border-white/5 py-24 mb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-white/5 bg-brand-bg/40 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-lg font-display font-bold">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Block */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              Warum Video + Website{" "}
              <span className="gold-text-gradient">zusammengehören.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed font-light mb-8">
              Video-Marketing funktioniert nur dann, wenn die nachgelagerte Website psychologisch richtig aufgebaut ist. 
              Wir denken beides zusammen – von der ersten Kameraeinstellung bis zum letzten Klick auf "Jetzt anfragen".
            </p>
            <div className="space-y-4">
              {[
                "Ein Ansprechpartner für Video & Website",
                "Visuell perfekt aufeinander abgestimmtes Design",
                "Kein Koordinationsaufwand zwischen mehreren Agenturen",
                "Videos sind von Tag 1 an optimal eingebunden",
                "Gemeinsame Strategie: Mehr Leads, mehr Bewerbungen"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] gold-border-glow bg-brand-darker"
          >
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop"
              alt="Webdesign & Videoproduktion Kaiserslautern — Rezai Vision"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section id="pakete" className="bg-brand-darker border-y border-white/5 py-24 mb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Unsere Webdesign-Pakete</h2>
            <p className="text-gray-400 text-base md:text-lg font-light">
              Transparente Preise, kein versteckter Aufwand. Du weißt von Anfang an, was du bekommst.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col p-8 rounded-3xl border ${
                  pkg.highlight
                    ? "border-brand-accent/40 bg-brand-accent/5"
                    : "border-white/10 bg-brand-bg/40"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-accent text-brand-bg text-xs font-bold rounded-full tracking-widest uppercase">
                    Empfohlen
                  </div>
                )}
                <h3 className="text-xl font-display font-bold mb-2">{pkg.name}</h3>
                <p className="text-3xl font-display font-bold gold-text-gradient mb-4">{pkg.price}</p>
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 border-b border-white/10 pb-6">{pkg.desc}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/kontakt" variant={pkg.highlight ? "primary" : "outline"} className="w-full justify-center">
                  Jetzt anfragen
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Bereit für eine Website, die wirklich konvertiert?
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto mb-10">
            In einem kostenlosen 20-Minuten-Gespräch klären wir, welches Paket am besten zu deinen Zielen passt.
          </p>
          <Button href="/kontakt" size="lg">
            Kostenloses Gespräch buchen
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
