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
              loading="lazy" src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775656862/Parsha_Gru%CC%88nder_Rezai_Vision_Kaiserslautern_pubjom.webp"
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
            
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Starke Kommunikation beginnt auf Augenhöhe.
            </p>

            <p className="text-gray-400 leading-relaxed font-light mt-4">
              Hinter <span className="text-gray-100 font-semibold">Rezai Vision</span> steht die pure Leidenschaft für das Medium Film – doch wir machen keine Kunst aus Selbstzweck, sondern <span className="text-gray-100 font-semibold">Strategie mit Wirkung</span>. Ein Video ist für uns weit mehr als nur ein schönes Bild; es ist das stärkste Werkzeug, um Ihre Botschaft <span className="text-gray-100 font-semibold">im gesamten Südwesten (RPF, Saarland, Hessen)</span> greifbar zu machen.
            </p>

            <p className="text-gray-400 leading-relaxed font-light mt-4">
              Ob ambitionierter <span className="text-gray-100 font-semibold">Underdog</span> oder etablierter <span className="text-gray-100 font-semibold">Mittelstand</span>: Wir setzen konsequent auf <span className="text-gray-100 font-semibold">Kamerasysteme mit hohem Dynamikumfang</span> und eine Zusammenarbeit, die Ihre Vision versteht. Bei uns gibt es kein Agentur-Overhead, sondern <span className="text-gray-100 font-semibold">direkte Kommunikation</span> und Ergebnisse, die Vertrauen aufbauen. Ich bin Ihr <span className="text-gray-100 font-semibold">persönlicher Partner</span> – von der ersten Konzeption bis hin zum fertigen Film. Je nach Projektumfang greife ich dabei auf ein bewährtes <span className="text-gray-100 font-semibold">Netzwerk bei Bedarf</span> zurück.
            </p>

            <div className="pt-6"></div>

            <div className="flex flex-col gap-4 mb-10">
              {[
                "Persönlicher Partner von der Konzeption bis zum fertigen Film",
                "High-End Kamerasysteme für erstklassige Bildqualität",
                "Effiziente Umsetzung ohne unnötigen Agentur-Overhead"
              ].map((trust, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-brand-accent shrink-0" />
                  <span>{trust}</span>
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
