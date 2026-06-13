import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "motion/react";
import Calculator from "@/components/calculator/Calculator";
import { MousePointerClick, Mail, Calculator as CalculatorIcon, Info, X } from "lucide-react";

export default function CalculatorPage() {
  const [showInstructions, setShowInstructions] = useState(false);
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

        {/* Interactive Instructions Toggle */}
        <div className="flex justify-center mb-12">
          <button 
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 text-brand-accent hover:text-white bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 px-6 py-3 rounded-full font-bold transition-all cursor-pointer"
          >
            <Info size={20} />
            {showInstructions ? "Anleitung ausblenden" : "Wie funktioniert der Rechner?"}
          </button>
        </div>

        <AnimatePresence>
          {showInstructions && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="max-w-4xl mx-auto overflow-hidden mb-16"
            >
              <div className="bg-brand-darker border border-white/10 rounded-3xl p-8 relative">
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">So einfach geht's</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div whileHover={{ y: -5 }} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    <div className="w-16 h-16 mx-auto bg-brand-accent/10 rounded-full flex items-center justify-center mb-4 text-brand-accent">
                      <MousePointerClick size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">1. Konfigurieren</h4>
                    <p className="text-sm text-gray-400">
                      Klick dich durch die Optionen und wähle genau die Leistungen aus, die dein Projekt benötigt.
                    </p>
                  </motion.div>

                  <motion.div whileHover={{ y: -5 }} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    <div className="w-16 h-16 mx-auto bg-brand-accent/10 rounded-full flex items-center justify-center mb-4 text-brand-accent">
                      <Mail size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">2. E-Mail eintragen</h4>
                    <p className="text-sm text-gray-400">
                      Trage am Ende unverbindlich deine E-Mail-Adresse ein, damit wir dir das Angebot zuordnen können.
                    </p>
                  </motion.div>

                  <motion.div whileHover={{ y: -5 }} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    <div className="w-16 h-16 mx-auto bg-brand-accent/10 rounded-full flex items-center justify-center mb-4 text-brand-accent">
                      <CalculatorIcon size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">3. Preis erhalten</h4>
                    <p className="text-sm text-gray-400">
                      Der kalkulierte Preis wird dir sofort auf dem Bildschirm angezeigt. Transparent und ohne versteckte Kosten!
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculator Component */}
        <Calculator />
      </div>
    </div>
  );
}
