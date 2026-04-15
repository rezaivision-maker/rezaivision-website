import { useState, useEffect } from "react";
import { Button } from "./Button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay to not block initial render impact
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
    window.location.reload();
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-brand-darker/95 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex-1 relative z-10 w-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-display font-bold">Ihre Privatsphäre ist uns wichtig! 🍪</h3>
                <button onClick={acceptEssential} className="md:hidden text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Wir verwenden Cookies auf dieser Website, um das Erlebnis zu verbessern (Google, Meta, TikTok) und Analysedaten lokal auszuwerten. Weitere Informationen finden Sie in unserer{" "}
                <Link to="/datenschutz" className="text-brand-accent hover:underline">Datenschutzerklärung</Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10 shrink-0">
              <Button onClick={acceptEssential} variant="outline" className="text-sm px-6">
                Nur Essenzielle
              </Button>
              <Button onClick={acceptAll} variant="primary" className="text-sm px-6">
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
