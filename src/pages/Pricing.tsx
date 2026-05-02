import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Pricing() {
  const packages = [
    {
      title: "Content-Partnerschaft",
      price: "Monatlicher Retainer",
      desc: "Dauerhafte Sichtbarkeit ohne internen Aufwand. Rezai Vision begleitet Unternehmen kontinuierlich beim Aufbau einer digitalen Präsenz auf LinkedIn und Instagram durch regelmäßigen, strategischen Content.",
      features: [
        "Monatliche Strategie-Calls",
        "Effiziente Batch-Produktion",
        "Multi-Plattform Verwertung",
        "Konstante Qualitätskontrolle",
        "Exklusive Partner-Betreuung"
      ],
      popular: true,
      href: "/kontakt?service=social-media"
    },
    {
      title: "Recruiting-System",
      price: "Auf Anfrage",
      desc: "Automatisierte Mitarbeitergewinnung statt passiver Stellenausschreibung. Wir entwickeln Content-Strategien, die Fachkräfte dort erreichen, wo sie scrollen, und Hürden im Bewerberprozess abbauen.",
      features: [
        "Mitarbeiter-Profiling",
        "Fokus auf Arbeitgeber-Vorteile",
        "Optimiert für Social Ads (9:16)",
        "Mobile-First-Optimierung",
        "Schnelle Bereitstellung"
      ],
      popular: false,
      href: "/kontakt?service=recruiting"
    },
    {
      title: "Marken-Storytelling",
      price: "Auf Anfrage",
      desc: "Die visuelle Visitenkarte Ihres Unternehmens. Rezai Vision übersetzt Identität in eine Bildsprache, die auf Ihrer Website gezielt Vertrauen bei Neukunden aufbaut und die Markenautorität stärkt.",
      features: [
        "Zielgruppen- & Bedarfsanalyse",
        "Einsatzplanung für die Website",
        "Cinematic Color Grading",
        "Conversion-orientierter Schnitt",
        "Korrekturschleifen inklusive"
      ],
      popular: false,
      href: "/kontakt?service=unternehmensfilm"
    },
    {
      title: "Performance-Ads",
      price: "Auf Anfrage",
      desc: "Visueller Treibstoff für Ihr Marketing. Verkaufspsychologisch optimierte Kurzvideos für Meta, LinkedIn oder TikTok, die gezielt darauf ausgelegt sind, messbare Leads und Interaktionen zu generieren.",
      features: [
        "Plattform-Analyse",
        "Hook-Optimierung (Stop-the-Scroll)",
        "Call-to-Action Fokus",
        "A/B Test-Varianten",
        "High-Engagement Sounddesign"
      ],
      popular: false,
      href: "/kontakt?service=werbevideo"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <SEO 
        title="Preise & Pakete | Rezai Vision | Videoproduktion"
        description="Transparente Preise für Ihre Videoproduktion. Entdecken Sie unsere Pakete für Unternehmensfilme, Recruiting und Social Media. Top-Niveau ohne Agentur-Overhead."
        canonical="/preise"
        keywords="Preise Videoproduktion, Kosten Imagefilm, Recruiting Video Preis, Social Media Content Flatrate, Rezai Vision Preise"
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16 text-center mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-8">
            Ehrliche Preise. Echte Ergebnisse.
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            Investitionen, die <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent-hover">Wachstum schaffen.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Keine starren Standard-Preise, sondern maßgeschneiderte Lösungen. Wir entwickeln für jedes Budget die maximale Wirkung – transparent, effizient und ergebnisorientiert.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${pkg.popular ? 'border-brand-accent bg-brand-darker' : 'border-white/5 bg-brand-bg'} flex flex-col h-full`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-bg px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Am beliebtesten
                </div>
              )}
              <h3 className="text-2xl font-display font-bold mb-4 min-h-[4rem] flex items-center leading-tight">{pkg.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {pkg.desc}
              </p>
              <div className="text-2xl font-display font-bold mb-8 text-white shrink-0">
                {pkg.price}
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="text-brand-accent shrink-0 mt-0.5" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button href={pkg.href} variant={pkg.popular ? "primary" : "outline"} className="w-full">
                Jetzt anfragen →
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
              <img
                loading="lazy" src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775656862/Parsha_Gru%CC%88nder_Rezai_Vision_Kaiserslautern_pubjom.webp"
                alt="Parsha Rezai - Gründer Rezai Vision"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-brand-bg/90 backdrop-blur-md p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-display font-bold mb-2">Parsha Rezai</h3>
                  <p className="text-brand-accent text-sm">Gründer & Creative Director</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Persönliche Beratung für Ihr Projekt
              </h2>
              <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">
                Jedes Unternehmen ist einzigartig – und so sollte auch Ihr Video sein. Lassen Sie uns in einem kurzen Gespräch herausfinden, welches Format am besten zu Ihren Zielen passt.
              </p>
              <Button href="/kontakt" size="lg">
                Kostenloses Erstgespräch vereinbaren
              </Button>
            </div>
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <div className="text-center max-w-3xl mx-auto">
          <HelpCircle className="mx-auto text-brand-accent mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Noch Fragen zum Ablauf oder den Kosten?</h2>
          <p className="text-gray-400 text-base md:text-lg mb-8">
            In unseren FAQs beantworten wir die häufigsten Fragen rund um die Videoproduktion.
          </p>
          <Button href="/faq" variant="outline">
            Zu den FAQs
          </Button>
        </div>
      </div>
    </div>
  );
}
