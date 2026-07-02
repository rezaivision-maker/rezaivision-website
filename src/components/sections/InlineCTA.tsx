import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

interface InlineCTAProps {
  text: string;
  buttonLabel?: string;
  href?: string;
}

/**
 * Schlanker Zwischen-CTA für lange Scroll-Strecken.
 * Schließt CTA-Lücken zwischen inhaltlichen Sektionen, ohne wie eine eigene Sektion zu wirken.
 */
export function InlineCTA({ text, buttonLabel = "Kostenloses Erstgespräch", href = "/kontakt" }: InlineCTAProps) {
  return (
    <div className="py-10 md:py-14 bg-brand-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left"
      >
        <p className="text-lg md:text-xl text-gray-300 font-light">{text}</p>
        <Button href={href} variant="outline" size="sm" className="shrink-0 whitespace-nowrap">
          {buttonLabel}
        </Button>
      </motion.div>
    </div>
  );
}
