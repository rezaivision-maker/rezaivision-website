import React from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { CalculatorOption } from "../../lib/firebase/calculatorAPI";

interface Props {
  key?: string | number;
  option: CalculatorOption;
  isSelected: boolean;
  onSelect: () => void;
}

export default function OptionCard({ option, isSelected, onSelect }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative w-full text-left p-6 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${
        isSelected
          ? "border-brand-accent bg-brand-accent/10 shadow-[0_0_20px_rgba(255,21,100,0.15)]"
          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
      }`}
    >
      <div className="flex justify-between items-start mb-2 relative z-10">
        <h4 className={`text-xl font-display font-bold ${isSelected ? "text-brand-accent" : "text-white"}`}>
          {option.title}
        </h4>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
          isSelected ? "bg-brand-accent border-brand-accent text-white" : "border-white/20"
        }`}>
          {isSelected && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      
      {option.description && (
        <p className="text-sm text-gray-400 leading-relaxed relative z-10">
          {option.description}
        </p>
      )}

      {/* Decorative background glow for selected state */}
      {isSelected && (
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-accent/20 rounded-full blur-2xl" />
      )}
    </motion.button>
  );
}
