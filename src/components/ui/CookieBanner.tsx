import { useState, useEffect } from "react";
import { Button } from "./Button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
      // Trigger enter animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    }
  }, []);

  const dismiss = () => {
    setIsAnimating(false);
    // Wait for exit animation, then unmount
    setTimeout(() => setIsVisible(false), 300);
  };

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    dismiss();
    
    // Consent Mode v2 Update Signal
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted"
      });
    }

    // Meta Pixel Update Signal (if initialized)
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    dismiss();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 transition-all duration-300 ease-out ${
        isAnimating
          ? "translate-y-0 opacity-100"
          : "translate-y-[150px] opacity-0"
      }`}
    >
      <div className="max-w-4xl mx-auto bg-brand-darker/95 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-1 relative z-10 w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-display font-bold">Ihre Privatsphäre ist uns wichtig! 🍪</h3>
            <button aria-label="Cookie Banner schließen" onClick={acceptEssential} className="md:hidden text-gray-400 hover:text-white transition-colors">
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
    </div>
  );
}
