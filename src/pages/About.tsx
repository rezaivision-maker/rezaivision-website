import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { CheckCircle2, Target, Zap, Shield, Heart, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Über uns | reza-e-motion | Videoproduktion Kaiserslautern</title>
        <meta name="description" content="Lernen Sie das Team hinter reza-e-motion kennen. Ihre Experten für professionelle Videoproduktion aus Kaiserslautern. Klar. Strukturiert. Wirkungsvoll." />
        <link rel="canonical" href="https://rezaivision.de/ueber-uns" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* HERO & INTRO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-8">
              Über uns
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-8 leading-tight">
              Wir machen <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent-hover">Sichtbarkeit</span> greifbar.
            </h1>
            
            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
              <p>
                Wir sind eine Videoproduktion aus Kaiserslautern mit Fokus auf klare Kommunikation, starke Bilder und durchdachte Umsetzung.
              </p>
              <p>
                Ich blicke auf **über 10 Jahre Erfahrung** in der professionellen Videoproduktion zurück und arbeite als persönlicher Ansprechpartner mit einem eingespielten Netzwerk aus Kreativen und Spezialisten zusammen. So entsteht für jedes Projekt genau die Struktur, die es braucht – flexibel, effizient und ohne unnötigen Aufwand.
              </p>
              <p>
                Wir produzieren Videos für Unternehmen, Marken und Dienstleister in der gesamten Region. Zu unseren Referenzen zählen namhafte Partner wie **PFAFF Industriesysteme**, **Social Care Mainz**, **CBL Datenrettung** sowie regionale Größen wie **KSB Rechtsanwälte** oder **Aesthetic Ink**.
              </p>
              <p>
                Was unsere Zusammenarbeit auszeichnet, sind strukturierte Abläufe, transparente Kommunikation und ein Blick für Details, die oft den Unterschied machen. Technik ist dabei nur ein Werkzeug – entscheidend ist, wie Bild, Ton und Story zusammenwirken, um genau das Gefühl zu erzeugen, das beim Zuschauer ankommen soll.
              </p>
              <p className="text-xl text-gray-200 font-medium mt-8">
                Jede Produktion entsteht mit einem klaren Ziel: Ihr Unternehmen so zu zeigen, dass Menschen es verstehen, sich angesprochen fühlen und Vertrauen entwickeln.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden sticky top-32"
          >
            <img
              src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775656862/Parsha_Gru%CC%88nder_Rezai_Vision_Kaiserslautern_pubjom.webp"
              alt="Parsha Rezai - Gründer Rezai Vision"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-brand-bg/90 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-display font-bold mb-2">Parsha Rezai</h3>
                <p className="text-brand-accent text-sm">Gründer & Creative Director</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ARBEITSWEISE & MOTIVATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-darker border border-white/5 p-10 md:p-12 rounded-3xl"
          >
            <h2 className="text-3xl font-display font-bold mb-6">Arbeitsweise</h2>
            <p className="text-xl text-brand-accent mb-6">Gute Ergebnisse entstehen nicht durch Zufall.</p>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>Deshalb beginnt jedes Projekt mit Klarheit:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Was soll erreicht werden?</li>
                <li>Wen möchten Sie erreichen?</li>
                <li>Wo wird das Video eingesetzt?</li>
              </ul>
              <p>
                Auf dieser Basis entwickeln wir Konzept, Bildsprache und Umsetzung – strukturiert, nachvollziehbar und effizient.
              </p>
              <p>
                Während der gesamten Produktion haben Sie einen direkten Ansprechpartner und klare Abstimmungen. Das sorgt für Sicherheit und einen reibungslosen Ablauf.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-brand-darker border border-white/5 p-10 md:p-12 rounded-3xl"
          >
            <h2 className="text-3xl font-display font-bold mb-6">Meine Motivation</h2>
            <p className="text-xl text-brand-accent mb-6">Video ist mehr als schöne Bilder. Es ist Kommunikation.</p>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                Mich fasziniert, wie stark visuelle Inhalte wirken können, wenn Bild, Ton und Story zusammenpassen. Genau darin liegt der Anspruch jeder Produktion: Inhalte zu schaffen, die nicht nur gut aussehen, sondern etwas auslösen.
              </p>
              <p className="text-2xl font-display font-bold text-white mt-8">
                Aufmerksamkeit. Vertrauen. Interesse.
              </p>
            </div>
          </motion.div>
        </div>

        {/* MISSION & WERTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-12 md:p-16 mb-32 text-center"
        >
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Unsere Mission</h2>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
              Videos zu produzieren, die einen Zweck erfüllen – Unternehmen sichtbar machen, Vertrauen stärken und Botschaften verständlich vermitteln.
            </p>
            <p className="text-2xl font-display font-bold text-brand-accent">
              Klar. Strukturiert. Wirkungsvoll.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              {
                icon: <Eye size={24} className="text-brand-accent" />,
                title: "Expertise",
                desc: "10 Jahre Videoproduktion."
              },
              {
                icon: <Target size={24} className="text-brand-accent" />,
                title: "Qualität",
                desc: "Industrie- & B2B-Fokus."
              },
              {
                icon: <Heart size={24} className="text-brand-accent" />,
                title: "Vertrauen",
                desc: "Über 150+ Projekte."
              },
              {
                icon: <Shield size={24} className="text-brand-accent" />,
                title: "Zuverlässigkeit",
                desc: "Feste Termingarantie."
              }
            ].map((wert, i) => (
              <div key={i} className="bg-brand-bg p-6 rounded-2xl border border-white/5">
                <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center">
                  {wert.icon}
                </div>
                <h3 className="text-lg font-display font-bold mb-1">{wert.title}</h3>
                <p className="text-gray-400 text-sm">{wert.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MICRO-TRUST & CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              "Direkter Ansprechpartner während des gesamten Projekts",
              "Klare Abläufe",
              "Transparente Kommunikation",
              "Verlässliche Umsetzung"
            ].map((trust, i) => (
              <div key={i} className="flex items-center gap-2 bg-brand-darker px-4 py-2 rounded-full border border-white/5 text-sm text-gray-300">
                <CheckCircle2 size={16} className="text-brand-accent" />
                {trust}
              </div>
            ))}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Lassen Sie uns zusammenarbeiten</h2>
          <Button href="/kontakt" size="lg" className="px-12 h-16 text-lg">
            20-Minuten Projekt-Check buchen
          </Button>
        </div>

      </div>
    </div>
  );
}
