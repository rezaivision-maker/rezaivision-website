import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function FAQ() {
  const faqs = [
    {
      question: "Was kostet ein Video bei RezaEmotion?",
      answer: "Die Kosten variieren je nach Aufwand, Drehtagen und Postproduktion. Ein Social Media Clip startet bei ca. 400 €, ein professioneller Imagefilm bei 2.500 €. Wir besprechen Ihr Budget im Erstgespräch und finden die passende Lösung."
    },
    {
      question: "Wie lange dauert die Produktion?",
      answer: "Von der ersten Idee bis zum fertigen Video vergehen in der Regel 3 bis 6 Wochen. Bei kleineren Projekten oder Social Media Clips können wir auch deutlich schneller liefern."
    },
    {
      question: "Wie viele Korrekturschleifen sind inklusive?",
      answer: "Standardmäßig sind bei größeren Projekten (Imagefilm, Recruiting) 2-3 Korrekturschleifen im Preis inbegriffen. Bei Social Clips ist es meist eine. Wir kommunizieren dies transparent im Angebot."
    },
    {
      question: "Werden die Nutzungsrechte übertragen?",
      answer: "Ja, Sie erhalten die zeitlich und räumlich uneingeschränkten Nutzungsrechte für die vereinbarten Kanäle (z.B. Website, Social Media). Für TV- oder Kino-Werbung gelten gesonderte Vereinbarungen."
    },
    {
      question: "Müssen wir uns auf den Dreh vorbereiten?",
      answer: "Wir übernehmen die komplette Planung. Sie müssen lediglich die Räumlichkeiten zur Verfügung stellen und ggf. Mitarbeiter informieren. Wir geben Ihnen vorab ein klares Briefing, was zu tun ist."
    },
    {
      question: "Wie sieht es mit Musikrechten aus?",
      answer: "Wir nutzen professionelle Musikbibliotheken und klären alle Lizenzen für Sie. Die Kosten für die Musiklizenz sind in unseren Angeboten bereits enthalten."
    },
    {
      question: "In welchen Formaten wird das Video geliefert?",
      answer: "Wir liefern das Video in allen Formaten, die Sie benötigen. Standardmäßig erhalten Sie eine hochauflösende Version (4K oder 1080p) im 16:9 Format für YouTube/Website und auf Wunsch optimierte Versionen (9:16, 1:1) für Social Media."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <Helmet>
        <title>FAQ | Häufig gestellte Fragen | RezaEmotion</title>
        <meta name="description" content="Antworten auf die häufigsten Fragen rund um unsere Videoproduktion, Ablauf und Preise. Klarheit von Anfang an." />
        <link rel="canonical" href="https://rezaivision.de/faq" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": ${JSON.stringify(faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              })))}
            }
          `}
        </script>
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-8">
              Häufig gestellte Fragen
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
              Klarheit von Anfang an.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light">
              Hier finden Sie Antworten auf die wichtigsten Fragen rund um die Zusammenarbeit mit uns.
            </p>
          </motion.div>

        <div className="space-y-4 mb-24">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-brand-darker"
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-display font-semibold pr-8">{faq.question}</span>
                <ChevronDown
                  className={`text-brand-accent transition-transform duration-300 shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-accent/10 border border-brand-accent/20 rounded-3xl p-8 md:p-12 text-center"
        >
          <MessageCircle className="mx-auto text-brand-accent mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ihre Frage war nicht dabei?</h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Kein Problem. Schreiben Sie uns einfach eine Nachricht oder buchen Sie direkt einen kurzen Termin. Wir klären alle offenen Punkte gerne persönlich.
          </p>
          <Button href="/kontakt" size="lg">
            Kontakt aufnehmen
          </Button>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
