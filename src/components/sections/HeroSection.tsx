import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-start pt-32 pb-12 md:pb-24 overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-bg/80 z-10" />
        <img
          src="https://res.cloudinary.com/dzt4f9xdi/image/upload/v1772568178/Hero_BG_bldaur.webp?v=2"
          alt="Hero Background Video Produktion Kaiserslautern — Rezai Vision"
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              Videograf Kaiserslautern & Videoproduktion
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6 leading-tight"
            >
              Starke Arbeit verdient es, <br className="hidden md:block" />
              <span className="gold-text-gradient">
                gesehen zu werden.
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300 mb-10 font-light"
            >
              Strategisch geplante Videos mit hochwertiger Bildsprache, die Vertrauen aufbauen und Wirkung entfalten – für Unternehmen im Südwesten Deutschlands. Ihr Content Creator Kaiserslautern für Hero-Content und Kampagnen.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button href="/kontakt" size="lg" className="w-full sm:w-auto">
                20-Minuten Projekt-Check
              </Button>
              <Button href="#showreel" variant="outline" size="lg" className="w-full sm:w-auto">
                Showreel ansehen
              </Button>
            </motion.div>
            <div className="mt-6 text-sm md:text-base text-gray-400">
              Schnelle Frage? <a href="https://wa.me/4917631739958?text=Hallo%20Parsha!%20Ich%20habe%20eine%20kurze%20Frage%20zur%20Videoproduktion..." target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline font-medium">Schreiben Sie mir gerne direkt auf WhatsApp.</a>
            </div>
            
            <div className="mt-10 flex items-center gap-4 bg-white/5 backdrop-blur-sm p-3 px-5 rounded-2xl border border-white/10 w-fit">
              <div className="flex -space-x-3 items-center mr-2">
                {[
                  { name: "Ramin Foroozan", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1775640180/Ramin_jx1axc.webp" },
                  { name: "David Binimann", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1775639263/David_Biniman_lxgt79.png" },
                  { name: "Adonay Welde", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1775640736/Adonay_W_bo3ddf.webp" },
                  { name: "Parnaz Schumacher", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775641107/Parnaz_v5xc4c.webp" },
                  { name: "Ralph Nist", img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775642376/Ralph_Nist_wmkjpf.webp" }
                ].map((user, i) => (
                  <img
                    key={i}
                    src={user.img}
                    alt={`${user.name} Kundenstimme Videoproduktion Kaiserslautern`}
                    className="w-8 h-8 rounded-full border-2 border-brand-bg relative z-[1] object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-brand-bg bg-white flex items-center justify-center shrink-0">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex text-brand-accent mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-xs sm:text-sm">Über 98+ erfolgreiche Projekte</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-end relative"
          >
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full max-w-[550px] xl:max-w-[650px] -mt-16 xl:-mt-24"
            >
              <img
                src="https://res.cloudinary.com/dzt4f9xdi/image/upload/v1772569736/Parsha_Freisteller_Infusefilm_Kaiserslautern_Videoproduktion_oei9r3.webp?v=2"
                alt="Parsha Rezai Videograf Kaiserslautern — Gründer Rezai Vision"
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ 
                  maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
                }}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
