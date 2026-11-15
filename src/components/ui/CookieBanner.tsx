import { useState, useEffect } from "react";
import { Button } from "./Button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { CONSENT_KEY, loadGoogleAnalytics } from "../Analytics";

/** Öffnet den Banner erneut (Widerruf/Änderung der Einwilligung, z. B. aus dem Footer). */
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const show = () => {
      setIsVisible(true);
      // Trigger enter animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    };
    if (!localStorage.getItem(CONSENT_KEY)) show();
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, show);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, show);
  }, []);

  const dismiss = () => {
    setIsAnimating(false);
    // Wait for exit animation, then unmount
    setTimeout(() => setIsVisible(false), 300);
  };

  const acceptAll = () => {
    localStorage.setItem(CONSENT_KEY, "all");
    dismiss();
    // Google Analytics erst jetzt laden – vorher besteht keine Verbindung zu Google.
    loadGoogleAnalytics();
  };

  const acceptEssential = () => {
    const hadConsent = localStorage.getItem(CONSENT_KEY) === "all";
    localStorage.setItem(CONSENT_KEY, "essential");
    dismiss();
    if (hadConsent) {
      // Widerruf: Google-Signal auf „abgelehnt“ setzen und neu laden, damit das Skript entfernt ist.
      window.gtag?.("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      // Google-Analytics-Cookies (_ga, _ga_*) entfernen.
      document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => n.startsWith("_ga")).forEach((n) => {
        const host = window.location.hostname;
        [host, "." + host, "." + host.replace(/^www\./, "")].forEach((d) => {
          document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
        });
        document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
      setTimeout(() => window.location.reload(), 350);
    }
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
            <h3 className="text-xl font-display font-bold">Ihre Privatsphäre ist uns wichtig</h3>
            <button aria-label="Cookie Banner schließen" onClick={acceptEssential} className="md:hidden text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Mit Ihrer Einwilligung nutzen wir Google Analytics, um zu verstehen, wie unsere Seite genutzt wird. Ohne Zustimmung laden wir nichts davon. Sie können Ihre Wahl jederzeit unten auf der Seite unter „Cookie-Einstellungen“ ändern. Mehr in unserer{" "}
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
