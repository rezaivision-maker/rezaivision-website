import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section className="py-24 bg-brand-bg border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <img
              loading="lazy" src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_800/v1775656862/Parsha_Gru%CC%88nder_Rezai_Vision_Kaiserslautern_pubjom.webp"
              alt="Parsha Rezai - Filmemacher & Gründer Rezai Vision Kaiserslautern"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-brand-bg/90 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-display font-bold mb-2">Parsha Rezai</h3>
                <p className="text-brand-accent text-sm">Filmemacher & Creative Director</p>
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
            
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 leading-tight">
              Agenturqualität. Persönliche Betreuung. Regionale Nähe.
            </h2>
            <p className="text-lg text-brand-accent mb-8">
              Verlässliche Videoproduktion aus Kaiserslautern für Unternehmen in Deutschland.
            </p>

            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed font-light">
                Hinter <span className="text-gray-100 font-semibold">Rezai Vision</span> steht die Leidenschaft für Film, die als <span className="text-gray-100 font-semibold">strategisches Werkzeug</span> für Ihr Wachstum arbeitet. Als <span className="text-gray-100 font-semibold">IHK-geprüfte Experten</span> begleiten wir Industrie, Mittelstand und Startups im gesamten <span className="text-gray-100 font-semibold">Südwesten Deutschlands</span>.
              </p>
              
              <p className="text-gray-400 leading-relaxed font-light">
                Bei uns gibt es keine wechselnden Teams oder Agentur-Overhead. Sie haben einen <span className="text-gray-100 font-semibold">direkten Ansprechpartner</span> für Ihr Projekt – von der ersten Idee bis zum fertigen Film.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-10">
              {[
                { title: "10 Jahre Erfahrung", desc: "In Video & Filmproduktion" },
                { title: "Fokus Südwesten", desc: "RPF, Saarland, Hessen & BW" },
                { title: "Persönliche Begleitung", desc: "Keine wechselnden Teams" },
                { title: "IHK-geprüft", desc: "Höchste Qualitätsstandards" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-brand-accent shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-white text-sm uppercase tracking-wider">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button href="/ueber-uns" variant="outline" className="gap-2">
              Mehr über die Arbeitsweise erfahren <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
