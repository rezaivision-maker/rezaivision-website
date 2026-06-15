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

export function Analytics() {
  const location = useLocation();
  const GA_MEASUREMENT_ID = "G-PKCY73WX1V";
  const FB_PIXEL_ID = ""; // Hier Ihre Meta Pixel ID eintragen

  useEffect(() => {
    const loadAnalytics = () => {
      // 1. Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      
      // 2. Set DEFAULT Consent (v2) - everything denied by default
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        wait_for_update: 500
      });

      // 3. Load Scripts immediately (Advanced Consent Mode)
      if (!document.querySelector('script[src*="gtag/js"]')) {
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);
      }

      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });

      // Load Meta Pixel Script (loads but won't track personal data if not initialized/consented)
      if (FB_PIXEL_ID) {
        (function(f,b,e,v,n,t,s){
          if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js'));
        
        window.fbq('init', FB_PIXEL_ID);
      }

      // 4. Check existing consent and UPDATE if granted
      const consent = localStorage.getItem("cookie-consent");
      if (consent === "all") {
        window.gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
          analytics_storage: "granted"
        });
        if (FB_PIXEL_ID) {
          window.fbq('track', 'PageView');
        }
      }
    };

    let idleId: any;
    let timeoutId: any;

    const deferLoading = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        idleId = (window as any).requestIdleCallback(() => {
          timeoutId = setTimeout(loadAnalytics, 1000);
        });
      } else {
        timeoutId = setTimeout(loadAnalytics, 2000);
      }
    };

    if (document.readyState === "complete") {
      deferLoading();
    } else {
      const handleLoad = () => {
        deferLoading();
      };
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        if (idleId && "cancelIdleCallback" in window) (window as any).cancelIdleCallback(idleId);
        clearTimeout(timeoutId);
      };
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) (window as any).cancelIdleCallback(idleId);
      clearTimeout(timeoutId);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
    if (consent === "all" && FB_PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}
