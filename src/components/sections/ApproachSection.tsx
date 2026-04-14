import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ApproachSection() {
  return (
    <>
      {/* 3.5 WARUM BEWEGTBILD */}
      <section className="py-24 bg-brand-darker border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="bg-brand-darker/50 p-8 md:p-12 rounded-3xl border border-white/5 h-full">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
              Warum Bewegtbild heute entscheidend ist
            </h2>
            <div className="space-y-6 text-gray-400">
              <p className="text-lg font-light leading-relaxed">
                <strong className="text-white font-medium">TV-Werbung war gestern.</strong> Früher war professionelles Bewegtbild oft nur den ganz großen Konzernen und Marken vorbehalten, die riesige Budgets für das Fernsehen aufbringen konnten. Heute haben sich die Spielregeln massiv geändert.
              </p>
              <p className="text-lg font-light leading-relaxed">
                Werbung und Reichweite sind längst nicht mehr an starre Fernsehplätze und Millionenbudgets gebunden. Heute ist hochwertige Videoproduktion kein Luxus mehr für wenige, sondern eine strategische, messbare Marketing-Investition. Das eröffnet auch dem modernen Mittelstand, Agenturen und regionalen Dienstleistern völlig neue Pforten.
              </p>
              <p className="text-lg font-light leading-relaxed">
                Kreatives Video-Recruiting, authentischer Social-Media-Content oder zielgerichtete Imagefilme ermöglichen es Ihnen heute, hochgradig effizient Sichtbarkeit zu skalieren und sofortiges Vertrauen bei Ihren Wunschkunden aufzubauen – ohne die Streuverluste der Vergangenheit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LÖSUNG / ANSATZ (Die Brücke) */}
      <section className="py-24 bg-brand-bg border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-sm font-medium text-brand-accent mb-8">
                Unser Ansatz
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Ein gutes Video überzeugt nicht nur visuell,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent-hover">sondern vor allem durch seine Wirkung.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-6 font-light leading-relaxed">
                Deshalb beginnen wir nicht mit der Kamera, sondern mit einer klaren Frage: Was soll Ihr Video konkret erreichen? Erst das Ziel gibt die Richtung vor.
              </p>
              <p className="text-base md:text-lg text-gray-500 mb-8">
                Wir verbinden hochwertige Bildsprache mit strategischem Marketingverständnis. So entstehen Videos, die Ihre Stärken sichtbar machen und gezielt für Ihr Unternehmen arbeiten.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  title: "Strategie vor Technik",
                  desc: "Wir analysieren Ihre Zielgruppe und Ihre Kernbotschaft, bevor wir überhaupt an den Dreh denken. Jedes Bild hat einen Zweck."
                },
                {
                  title: "Marketing statt Kunst",
                  desc: "Wir machen keine Kunstfilme aus Selbstzweck, sondern Videos, die als Kommunikationsmittel für Ihr Unternehmenswachstum arbeiten."
                },
                {
                  title: "Entlastung statt Aufwand",
                  desc: "Ob erste Idee oder fertige Richtung: Wir steigen dort ein, wo Sie uns brauchen, und begleiten den Weg bis zum fertigen Video."
                }
              ].map((item, i) => (
                <div key={i} className="bg-brand-darker border border-white/5 p-8 rounded-2xl flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center max-w-3xl mx-auto flex flex-col items-center"
          >
            <p className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-8">
              Denn am Ende zählt nicht nur, wie ein Video&nbsp;aussieht,<br />
              <span className="gold-text-gradient">sondern was es <br className="hidden md:block" />für Ihr Unternehmen&nbsp;bewirkt.</span>
            </p>
            <Button href="/kontakt" variant="outline" className="gap-2">
              Kontakt aufnehmen <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
