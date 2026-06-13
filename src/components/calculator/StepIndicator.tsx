import React from "react";
import { motion } from "motion/react";

interface Props {
  totalSteps: number;
  currentStep: number;
}

export default function StepIndicator({ totalSteps, currentStep }: Props) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full" />
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isPast = stepNum < currentStep;

          return (
            <div 
              key={stepNum}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                isActive 
                  ? "bg-brand-accent text-white shadow-[0_0_15px_rgba(255,21,100,0.5)] scale-110" 
                  : isPast 
                    ? "bg-brand-accent/80 text-white" 
                    : "bg-brand-darker border-2 border-white/20 text-gray-500"
              }`}
            >
              {stepNum}
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-brand-accent font-bold uppercase tracking-widest">
        Schritt {currentStep} von {totalSteps}
      </div>
    </div>
  );
}
