import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 md:pt-28 pb-12 md:pb-20 overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-bg/80 z-10" />
        <img
          fetchPriority="high"
          src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto:eco,f_auto,w_1920/v1772568178/Hero_BG_bldaur.webp"
          srcSet="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto:eco,f_auto,w_800/v1772568178/Hero_BG_bldaur.webp 800w, https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto:eco,f_auto,w_1200/v1772568178/Hero_BG_bldaur.webp 1200w, https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto:eco,f_auto,w_1920/v1772568178/Hero_BG_bldaur.webp 1920w"
          sizes="100vw"
          alt="Hero Background Video Produktion Kaiserslautern — Rezai Vision"
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
          width="1920"
          height="1080"
        />
      </div>

      <div className="max-w-[1600px] 3xl:max-w-[2000px] mx-auto px-6 md:px-12 xl:px-16 3xl:px-20 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-10 xl:gap-0">
          <div className="w-full lg:w-[55%] xl:w-[50%] 3xl:w-[45%] max-w-3xl text-left py-12 lg:py-0 shrink-0 animate-fade-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-brand-accent mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              Videoproduktion & Content Creation aus Rheinland-Pfalz
            </div>
            <h1 className="text-[2.25rem] leading-[1.15] sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-display font-bold tracking-tighter mb-5 md:mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              Videoproduktion Kaiserslautern: <br className="hidden md:block" />
              <span className="gold-text-gradient">
                Videos, die als Werkzeug für Ihre Ziele arbeiten.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl 3xl:text-2xl text-gray-300 mb-8 md:mb-10 3xl:mb-12 font-light leading-relaxed max-w-2xl 3xl:max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
              Kein Selbstzweck, sondern Strategie. Wir entwickeln Video-Content für Websites, Ads und Social Media, der Vertrauen aufbaut für messbare Ergebnisse der Unternehmenskommunikation.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
              <Button href="/kontakt" size="lg" className="w-full sm:w-auto">
                Kostenlosen Projekt-Check anfordern
              </Button>
              <Button href="#showreel" variant="outline" size="lg" className="w-full sm:w-auto">
                Showreel ansehen
              </Button>
            </div>
            <div className="mt-5 md:mt-6 text-sm md:text-base text-gray-400">
              Schnelle Frage? <a href="https://wa.me/4917631739958?text=Hallo%20Parsha!%20Ich%20habe%20eine%20kurze%20Frage%20zur%20Videoproduktion..." target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline font-medium">Schreiben Sie mir gerne direkt auf WhatsApp.</a>
            </div>

            <div className="mt-8 md:mt-10 flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm p-3 px-4 sm:px-5 rounded-2xl border border-white/10 w-fit">
              <div className="flex -space-x-3 items-center mr-1 sm:mr-2">
                {[
                  { name: "Ramin Foroozan", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_64/v1775640180/Ramin_jx1axc.webp" },
                  { name: "David Binimann", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_64/v1775639263/David_Biniman_lxgt79.png" },
                  { name: "Adonay Welde", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_64/v1775640736/Adonay_W_bo3ddf.webp" },
                  { name: "Parnaz Schumacher", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_64/v1775641107/Parnaz_v5xc4c.webp" },
                  { name: "Ralph Nist", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_64/v1775642376/Ralph_Nist_wmkjpf.webp" }
                ].map((user, i) => (
                  <img
                    loading="lazy" key={i}
                    src={user.img}
                    alt={`${user.name} Kundenstimme Videoproduktion Kaiserslautern`}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-brand-bg relative z-[1] object-cover"
                    referrerPolicy="no-referrer"
                    width="32"
                    height="32"
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-brand-bg bg-white flex items-center justify-center shrink-0">
                  <img loading="lazy" src="https://www.google.com/favicon.ico" className="w-3.5 h-3.5 sm:w-4 sm:h-4" alt="Google" width="16" height="16" />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex text-brand-accent mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-[11px] sm:text-sm">Über 98+ erfolgreiche Projekte</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex w-full lg:w-[45%] xl:w-[50%] 3xl:w-[55%] justify-end shrink-0 relative translate-y-12 3xl:translate-y-24 animate-fade-in-right" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <div className="w-full flex justify-end animate-float">
              <img
                fetchPriority="high"
                src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_1000/v1772569736/Parsha_Freisteller_Infusefilm_Kaiserslautern_Videoproduktion_oei9r3.webp"
                alt="Parsha Rezai Videograf Kaiserslautern — Gründer Rezai Vision"
                className="w-full max-w-[700px] xl:max-w-[850px] 3xl:max-w-[1300px] h-auto object-contain drop-shadow-2xl scale-110 3xl:scale-125 origin-bottom-right"
                style={{
                  maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
                }}
                referrerPolicy="no-referrer"
                width="1000"
                height="1000"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
