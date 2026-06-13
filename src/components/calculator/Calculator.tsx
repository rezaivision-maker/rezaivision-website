import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, ArrowRight, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { getCalculatorConfig, saveCalculatorLead, CalculatorStep, CalculatorOption } from "../../lib/firebase/calculatorAPI";
import StepIndicator from "./StepIndicator";
import OptionCard from "./OptionCard";

export default function Calculator() {
  const [steps, setSteps] = useState<CalculatorStep[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  
  const [email, setEmail] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const config = await getCalculatorConfig();
        // sort by order
        const sorted = config.sort((a, b) => a.order - b.order);
        setSteps(sorted);
      } catch (err) {
        console.error("Failed to load calculator config", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSelect = (stepId: string, optionId: string, multiSelect: boolean) => {
    setSelections(prev => {
      const current = prev[stepId] || [];
      if (multiSelect) {
        if (current.includes(optionId)) {
          return { ...prev, [stepId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [stepId]: [...current, optionId] };
        }
      } else {
        return { ...prev, [stepId]: [optionId] };
      }
    });
  };

  const calculateTotal = () => {
    let baseSum = 0;
    let finalMultiplier = 1;

    // 1. Calculate sum of all selected base prices
    steps.forEach(step => {
      const selectedIds = selections[step.id] || [];
      selectedIds.forEach(id => {
        const opt = step.options.find(o => o.id === id);
        if (opt) {
          baseSum += opt.basePrice;
        }
      });
    });

    // 2. Check if any selected option has a multiplier (e.g. Express 1.25x)
    steps.forEach(step => {
      const selectedIds = selections[step.id] || [];
      selectedIds.forEach(id => {
        const opt = step.options.find(o => o.id === id);
        if (opt && opt.multiplierIndex) {
          // If multiple exist, take the highest or multiply them. Here we just take it.
          finalMultiplier = opt.multiplierIndex;
        }
      });
    });

    const finalPrice = baseSum * finalMultiplier;
    return finalPrice;
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmittingLead(true);
    const price = calculateTotal();
    setCalculatedPrice(price);

    try {
      // Build selected modules summary
      let summaryText = "";
      steps.forEach(step => {
        const sel = selections[step.id] || [];
        if (sel.length > 0) {
          const optionNames = sel.map(id => step.options.find(o => o.id === id)?.title).join(', ');
          summaryText += `<li><strong>${step.title}:</strong> ${optionNames}</li>`;
        }
      });

      const formattedPrice = price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const emailHtml = `
        <div style="font-family: sans-serif; color: #333; max-w: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #ff1564; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">Rezai Vision</h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="margin-top: 0;">Dein Projektbudget</h2>
            <p>Hallo,</p>
            <p>vielen Dank für deine Anfrage! Basierend auf deinen Angaben beläuft sich das Projektbudget auf ca.:</p>
            <div style="font-size: 32px; font-weight: bold; color: #ff1564; margin: 24px 0;">
              ${formattedPrice} €
            </div>
            <h3>Deine Konfiguration:</h3>
            <ul>
              ${summaryText}
            </ul>
            <p style="margin-top: 32px;">
              Lass uns gerne kurz über dein Projekt sprechen, um die Details zu klären. 
              Du erreichst uns unter <a href="mailto:rezaivision@gmail.com" style="color: #ff1564;">rezaivision@gmail.com</a> 
              oder telefonisch unter <a href="tel:+4963162512000" style="color: #ff1564;">0631 62512000</a>.
            </p>
            <p>Viele Grüße,<br/>Parsha Rezai</p>
          </div>
        </div>
      `;

      await saveCalculatorLead({
        email,
        selections,
        calculatedPrice: price
      }, emailHtml);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      alert("Ein Fehler ist aufgetreten.");
    } finally {
      setSubmittingLead(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        Rechner noch nicht konfiguriert.
      </div>
    );
  }

  const isLeadStep = currentStepIndex === steps.length;
  const currentStepData = !isLeadStep ? steps[currentStepIndex] : null;
  const canProceed = !isLeadStep && (selections[currentStepData!.id]?.length > 0);

  return (
    <div className="max-w-4xl mx-auto w-full">
      {!showResult && (
        <StepIndicator totalSteps={steps.length + 1} currentStep={currentStepIndex + 1} />
      )}

      <div className="bg-brand-darker border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {!isLeadStep && currentStepData ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-display font-bold text-white mb-3">
                      {currentStepData.title}
                    </h2>
                    {currentStepData.description && (
                      <p className="text-gray-400 text-lg">
                        {currentStepData.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {currentStepData.options.map(opt => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        isSelected={(selections[currentStepData.id] || []).includes(opt.id)}
                        onSelect={() => handleSelect(currentStepData.id, opt.id, currentStepData.multiSelect)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail size={40} className="text-brand-accent" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">Fast geschafft!</h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    Trage deine E-Mail-Adresse ein, um sofort deinen maßgeschneiderten Preis auf dem Bildschirm zu sehen.
                  </p>

                  <form onSubmit={handleSubmitLead} className="max-w-sm mx-auto">
                    <input
                      type="email"
                      required
                      placeholder="Deine E-Mail Adresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all mb-4"
                    />
                    <button
                      type="submit"
                      disabled={submittingLead || !email}
                      className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {submittingLead ? <Loader2 className="animate-spin" /> : "Ergebnis anzeigen"}
                    </button>
                  </form>
                </div>
              )}

              {!isLeadStep && (
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <button
                    onClick={prevStep}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all cursor-pointer ${
                      currentStepIndex === 0 ? "opacity-0 pointer-events-none" : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <ArrowLeft size={20} /> Zurück
                  </button>
                  
                  <button
                    onClick={nextStep}
                    disabled={!canProceed}
                    className="flex items-center gap-2 bg-brand-accent text-brand-bg px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Weiter <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Dein Kalkulationsergebnis</h2>
              <p className="text-gray-400 mb-8">Basierend auf deinen Angaben beläuft sich das Projektbudget auf ca.</p>
              
              <div className="text-6xl font-display font-black text-brand-accent mb-8">
                {calculatedPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left">
                <h4 className="font-bold text-white mb-4">Deine gewählten Module:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  {steps.map(step => {
                    const sel = selections[step.id] || [];
                    if (sel.length === 0) return null;
                    return (
                      <li key={step.id} className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">{step.title}:</span>
                        <span className="font-medium text-white text-right">
                          {sel.map(id => step.options.find(o => o.id === id)?.title).join(', ')}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <a 
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-brand-accent text-brand-bg px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all cursor-pointer hover:scale-105"
              >
                Jetzt Projekt besprechen
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
