import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "Wie lange dauert eine typische Videoproduktion?",
    answer: "Der genaue Zeitraum hängt vom Umfang Ihres Projekts ab. In der Regel benötigen wir von der ersten Konzeption bis zum fertigen Video etwa 2 bis 4 Wochen. Wir passen uns jedoch gerne Ihrer spezifischen Timeline an."
  },
  {
    question: "Was passiert, wenn uns der erste Entwurf nicht gefällt?",
    answer: "Keine Sorge. Eine Feedback-Schleife ist bei uns immer fest eingeplant – je nach Projektumfang auch 2 bis 3. Wir wissen, dass der eigentliche Film erst im Schnitt entsteht. Dabei arbeiten wir für Sie präzise und wie geplant nach unserer vorab erstellten Shotlist bzw. dem Moodboard."
  },
  {
    question: "Brauchen wir für unser Video professionelle Schauspieler?",
    answer: "Nicht zwingend. Oft wirken echte Mitarbeiter aus Ihrem Unternehmen viel authentischer, besonders bei Recruiting-Filmen. Sollten für Kampagnen oder Werbevideos professionelle Darsteller nötig sein, übernehmen wir sehr gerne das gesamte Casting für Sie."
  },
  {
    question: "Wie läuft das mit den Nutzungsrechten der Videos?",
    answer: "Sie erhalten mit Abschluss des Projekts in der Regel die zeitlich und räumlich uneingeschränkten Nutzungsrechte für alle gebuchten Kanäle. Sie können das Videomaterial also frei einsetzen."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-brand-bg border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Häufig gestellte Fragen
          </h2>
          <p className="text-gray-400 text-lg">
            Alles, was Sie vor dem Start wissen müssen.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === i ? 'bg-brand-darker' : 'bg-transparent hover:bg-white/5'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-display font-semibold text-lg pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`shrink-0 text-brand-accent transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed font-light">
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
  );
}
