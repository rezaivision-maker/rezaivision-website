import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Video, Users, Target, Zap, BarChart3, Smartphone, Lightbulb } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Services() {
  const services = [
    {
      id: "unternehmensfilm",
      title: "Unternehmensfilm",
      desc: "Der perfekte erste Eindruck für Ihre Website. Zeigen Sie, wer Sie sind, wofür Sie stehen und warum Kunden Ihnen vertrauen sollten. Wir übersetzen Ihre Unternehmenswerte in eine emotionale Geschichte.",
      icon: <Video size={32} className="text-brand-accent" />,
      benefits: ["Vertrauensaufbau bei Neukunden", "Stärkung der Arbeitgebermarke", "Professioneller erster Eindruck"],
      idealFor: ["B2B-Dienstleister", "Industrieunternehmen", "mittelständische Unternehmen"],
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "recruiting",
      title: "Recruiting Video",
      desc: "Gewinnen Sie die besten Talente durch authentische Einblicke in Ihre Unternehmenskultur. Wir zeigen den echten Arbeitsalltag, lassen Mitarbeiter sprechen und machen Ihr Unternehmen als Arbeitgeber greifbar.",
      icon: <Users size={32} className="text-brand-accent" />,
      benefits: ["Mehr qualifizierte Bewerbungen", "Geringere Cost-per-Hire", "Authentisches Employer Branding"],
      idealFor: ["Handwerksbetriebe", "Pflegeeinrichtungen", "mittelständische Unternehmen mit Personalbedarf"],
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "werbevideo",
      title: "Werbevideo & Social Ads",
      desc: "Kurze, aufmerksamkeitsstarke Clips für Social Media Ads, die konvertieren. Perfekt für Produktlaunches oder spezielle Kampagnen. Optimiert für die ersten 3 Sekunden und mit klarem Call-to-Action.",
      icon: <Target size={32} className="text-brand-accent" />,
      benefits: ["aufmerksamkeitsstarke Kampagnen", "testbare Creative-Varianten", "performance-orientierten Werbeeinsatz"],
      idealFor: ["lokale Dienstleister", "E-Commerce-Brands", "Beauty- und Lifestyle-Unternehmen"],
      img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775639140/Social_Media_Reels_Kaiserslautern_Rezaivision_Videoproduktion_fuer_Social_Media_ek3s0b.webp"
    },
    {
      id: "social-media",
      title: "Social Media Retainer",
      desc: "Regelmäßiger Content für LinkedIn, Instagram und TikTok, Facebook oder Youtube. In Batches produziert, damit Sie konstant sichtbar bleiben.",
      icon: <Zap size={32} className="text-brand-accent" />,
      benefits: ["kontinuierliche Sichtbarkeit", "klare Positionierung", "professionelle Präsenz"],
      idealFor: ["Personal Brands", "Beratungsunternehmen", "innovative Start-ups"],
      img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775838944/Social_Media_Retaeiner_mcphad.webp"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32">
      <Helmet>
        <title>Unsere Leistungen B2B | Videoproduktion Rheinland-Pfalz & Saarland</title>
        <meta name="description" content="Unsere B2B Leistungen: Unternehmensfilme, Recruiting-Videos, Video Ads und Social Media Content aus Kaiserslautern. Für Mannheim, Saarbrücken und Mainz." />
        <link rel="canonical" href="https://rezaivision.de/leistungen" />
        <meta name="keywords" content="Videoproduktion Leistungen Kaiserslautern, B2B Video Agentur Mannheim, Corporate Content Rheinland-Pfalz" />
      </Helmet>
      {/* HERO SECTION */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent font-medium text-sm mb-6">
              Unsere Expertise
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-[1.1]">
              Videos, die <span className="text-brand-accent italic">Ergebnisse</span> liefern.
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              Wir produzieren nicht einfach nur schöne Bilder. Wir entwickeln strategische Videoinhalte, die genau auf Ihre Unternehmensziele und Ihre Zielgruppe zugeschnitten sind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* APPROACH SECTION */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Der Unterschied liegt in der Strategie
            </h2>
            <p className="text-gray-400 text-lg">
              Bevor wir die Kamera in die Hand nehmen, stellen wir die richtigen Fragen. Nur so entsteht Content, der wirklich funktioniert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="text-brand-accent" size={32} />,
                title: "Zielgruppen-Fokus",
                desc: "Wir analysieren genau, wen Sie erreichen wollen. Ein Video für Gen-Z auf TikTok sieht anders aus als ein B2B-Pitch auf LinkedIn."
              },
              {
                icon: <Smartphone className="text-brand-accent" size={32} />,
                title: "Plattform-Optimierung",
                desc: "Wir liefern Ihre Videos direkt in den passenden Formaten (16:9, 9:16, 1:1) und Längen für die jeweiligen Social Media Plattformen."
              },
              {
                icon: <BarChart3 className="text-brand-accent" size={32} />,
                title: "Conversion-Driven",
                desc: "Jedes Video hat ein klares Ziel. Ob Lead-Generierung, Bewerbungen oder Sales – wir integrieren starke Call-to-Actions."
              }
            ].map((item, i) => (
              <div key={i} className="bg-brand-bg border border-white/5 p-8 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-32 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 !== 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="mb-6 bg-brand-darker border border-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{service.title}</h2>
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">{service.desc}</p>
                  
                  <div className="mb-8 p-6 bg-brand-darker border border-white/5 rounded-2xl">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Lightbulb size={16} className="text-brand-accent" /> Besonders geeignet für
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.idealFor.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg text-gray-300">
                        <CheckCircle2 className="text-brand-accent shrink-0" size={24} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    href={service.id === "unternehmensfilm" ? "/leistungen/unternehmensfilm" : service.id === "recruiting" ? "/leistungen/recruiting" : service.id === "werbevideo" ? "/leistungen/werbevideo" : service.id === "social-media" ? "/leistungen/social-media" : `/kontakt?service=${service.id}`} 
                    variant="outline" 
                    size="lg" 
                    className="gap-2"
                  >
                    {service.id === "unternehmensfilm" || service.id === "recruiting" || service.id === "werbevideo" || service.id === "social-media" ? "Mehr erfahren" : "Projekt anfragen"} <ArrowRight size={18} />
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 relative aspect-video rounded-2xl overflow-hidden group shadow-2xl"
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-brand-darker border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Lassen Sie uns unverbindlich darüber sprechen, wie wir Ihr Unternehmen mit strategischem Videomarketing voranbringen können.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/kontakt" size="lg" className="gap-2">
              Kostenloses Erstgespräch <ArrowRight size={18} />
            </Button>
            <Button href="/referenzen" variant="outline" size="lg">
              Unsere Arbeiten ansehen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
