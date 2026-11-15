import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

const GA_MEASUREMENT_ID = "G-PKCY73WX1V";
export const CONSENT_KEY = "cookie-consent";

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "all";
  } catch {
    return false;
  }
}

/**
 * Lädt Google Analytics – aber NUR, wenn der Nutzer im Cookie-Banner
 * „Alle akzeptieren“ gewählt hat. Ohne Einwilligung wird keine Verbindung
 * zu Google aufgebaut (TDDDG § 25). Wird vom Banner direkt nach der
 * Zustimmung aufgerufen und beim Seitenstart, wenn die Zustimmung schon vorliegt.
 */
export function loadGoogleAnalytics(pagePath?: string) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      // Nur Reichweitenmessung – keine Werbe-Signale (darauf bezieht sich die Einwilligung nicht).
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
    window.gtag("js", new Date());
  }

  if (!document.querySelector('script[src*="gtag/js"]')) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: pagePath ?? window.location.pathname + window.location.search,
  });
}

export function Analytics() {
  const location = useLocation();

  // Seitenstart: nur laden, wenn bereits eingewilligt wurde – verzögert, um die Ladezeit nicht zu belasten.
  useEffect(() => {
    if (!hasAnalyticsConsent()) return;
    let idleId: any;
    let timeoutId: any;
    const start = () => loadGoogleAnalytics();
    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(() => {
        timeoutId = setTimeout(start, 1000);
      });
    } else {
      timeoutId = setTimeout(start, 2000);
    }
    return () => {
      if (idleId && "cancelIdleCallback" in window) (window as any).cancelIdleCallback(idleId);
      clearTimeout(timeoutId);
    };
  }, []);

  // Seitenwechsel: Seitenaufruf nur mit Einwilligung senden.
  useEffect(() => {
    if (hasAnalyticsConsent() && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
