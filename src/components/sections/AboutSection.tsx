import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section className="py-24 bg-brand-bg border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <img
              src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775656862/Parsha_Gru%CC%88nder_Rezai_Vision_Kaiserslautern_pubjom.webp"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-sm font-medium text-brand-accent mb-8">
              Über uns
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Video ist mehr als schöne Bilder. Es ist Kommunikation – und die muss bei Ihrer Zielgruppe ankommen.
            </p>
            <p className="text-gray-400 leading-relaxed font-light mt-4">
              Als Filmemacher und Videograf liefere ich keine Standard-Lösungen am Fließband. Mein Ansatz ist persönlich, strategisch und auf Ihre Ziele zugeschnitten. Ich betreue Ihr Projekt von der ersten Idee bis zum finalen Schnitt – Sie haben immer einen festen, verlässlichen Ansprechpartner.
            </p>
            <p className="text-gray-400 leading-relaxed font-light mt-4">
              Je nach Projektumfang ziehe ich flexibel externe Spezialisten aus meinem Netzwerk hinzu. Das bedeutet für Sie: Maximale Effizienz ohne die Overhead-Kosten einer riesigen Agentur, aber mit exakt der gleichen Qualität.
            </p>
            <div className="pt-4"></div>

            <div className="flex flex-col gap-4 mb-10">
              {[
                "Direkter Ansprechpartner während des gesamten Projekts",
                "Klare Abläufe & transparente Kommunikation",
                "Verlässliche Umsetzung in jeder Phase"
              ].map((trust, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-brand-accent shrink-0" />
                  <span>{trust}</span>
                </div>
              ))}
            </div>

            <Button href="/ueber-uns" variant="outline" className="gap-2">
              Mehr über unsere Arbeitsweise <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
