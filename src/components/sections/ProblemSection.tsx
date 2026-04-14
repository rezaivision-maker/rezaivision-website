import { motion } from "motion/react";
import { Video, Users, Target, Zap } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-24 bg-brand-bg relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Gute Arbeit allein reicht heute nicht mehr aus.
          </h2>
          <p className="text-xl text-gray-400">
            Sie haben ein starkes Angebot, ein erfahrenes Team und echte Kompetenz – doch nach außen wird davon oft zu wenig sichtbar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Recruiting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-darker border border-white/5 p-8 md:p-10 rounded-3xl"
          >
            <div className="text-brand-accent mb-6"><Users size={32} /></div>
            <h3 className="text-2xl font-display font-bold mb-4">Der Recruiting-Frust</h3>
            <p className="text-gray-300 italic mb-6 text-lg">
              „Wir haben tolle Benefits und ein super Team, aber es bewerben sich einfach nicht die richtigen Leute. Wie sollen wir unsere Arbeitskultur nach außen zeigen?“
            </p>
            <p className="text-base text-gray-500">
              Ihre echten Werte bleiben unsichtbar, während die Konkurrenz die besten Talente abwirbt.
            </p>
          </motion.div>

          {/* Card 2: Anbieter-Chaos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-brand-darker border border-white/5 p-8 md:p-10 rounded-3xl"
          >
            <div className="text-brand-accent mb-6"><Video size={32} /></div>
            <h3 className="text-2xl font-display font-bold mb-4">Das Anbieter-Chaos</h3>
            <p className="text-gray-300 italic mb-6 text-lg">
              „Die einen machen nur bunte Clips ohne Strategie, die anderen rufen direkt überzogene Preise auf. Wer versteht eigentlich unser Geschäft?“
            </p>
            <p className="text-base text-gray-500">
              Entscheidungsstress pur. Sie suchen einen Partner auf Augenhöhe, keine abgehobene Werbeagentur.
            </p>
          </motion.div>

          {/* Card 3: Kosten-Angst */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-brand-darker border border-white/5 p-8 md:p-10 rounded-3xl"
          >
            <div className="text-brand-accent mb-6"><Target size={32} /></div>
            <h3 className="text-2xl font-display font-bold mb-4">Die Kosten-Angst</h3>
            <p className="text-gray-300 italic mb-6 text-lg">
              „Ein Video-Projekt klingt nach einem Fass ohne Boden. Was ist, wenn wir viel Geld ausgeben und es bringt am Ende gar nichts?“
            </p>
            <p className="text-base text-gray-500">
              Das Risiko einer Fehlinvestition hemmt Sie, den nächsten wichtigen Schritt in die Sichtbarkeit zu gehen.
            </p>
          </motion.div>

          {/* Card 4: Fehlende Sichtbarkeit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-brand-darker border border-white/5 p-8 md:p-10 rounded-3xl"
          >
            <div className="text-brand-accent mb-6"><Zap size={32} /></div>
            <h3 className="text-2xl font-display font-bold mb-4">Die verpuffte Wirkung</h3>
            <p className="text-gray-300 italic mb-6 text-lg">
              „Wir stecken Zeit und Geld ins Marketing, aber irgendwie nimmt uns online niemand als den Experten wahr, der wir eigentlich sind.“
            </p>
            <p className="text-base text-gray-500">
              Ihre Online-Präsenz spiegelt nicht die hohe Qualität Ihrer tatsächlichen Arbeit wider.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
            Das Problem ist meist nicht Ihre Leistung.<br />
            <span className="text-brand-accent">Das Problem ist, dass sie nach außen nicht die Wirkung entfaltet, die sie verdient.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
