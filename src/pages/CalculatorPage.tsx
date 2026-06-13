import React from "react";
import { SEO } from "@/components/SEO";
import { motion } from "motion/react";
import Calculator from "@/components/calculator/Calculator";

export default function CalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <SEO 
        title="Interaktiver Preisrechner | Rezai Vision"
        description="Berechne dein Projektbudget in wenigen Schritten live und unverbindlich."
        canonical="/preisrechner"
      />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16 text-center mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-8">
            Volle Transparenz
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            Dein <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent-hover">Projektbudget</span> kalkulieren.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Wähle die gewünschten Leistungen und den Umfang für deine Videoproduktion aus, um sofort eine erste Einschätzung deines Budgets zu erhalten.
          </p>
        </motion.div>

        {/* Calculator Component */}
        <Calculator />
      </div>
    </div>
  );
}
