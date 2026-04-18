import { motion } from "motion/react";
import { PlusSquare, Flag, Handshake, Eye, MapPin } from "lucide-react";

export function TrustSection() {
  return (
    <>
      {/* 2. TRUST SECTION */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Agenturqualität. Persönliche Betreuung. Regionale Nähe.
            </h2>
            <p className="text-xl text-brand-accent mb-4">
              Verlässliche Videoproduktion aus Kaiserslautern für Unternehmen in&nbsp;Deutschland.
            </p>
            <p className="text-gray-400 text-base md:text-lg mb-8">
              Als IHK-geprüfte Experten begleiten wir Industrie- und Dienstleistungsunternehmen sowie mittelständische Unternehmen und Startups im gesamten Südwesten Deutschlands. Keine wechselnden Teams, sondern ein direkter Ansprechpartner für Ihr Projekt – von der ersten Idee bis zum fertigen Film.
            </p>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              <MapPin size={16} className="text-brand-accent" />
              Mit Fokus auf Rheinland-Pfalz, Saarland, Hessen und Baden-Württemberg.
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              {
                icon: <PlusSquare size={24} className="text-brand-accent" />,
                text: "8 Jahre Erfahrung in Video & Filmproduktion"
              },
              {
                icon: <Flag size={24} className="text-brand-accent" />,
                text: "Kommunikationsdesigner & Videoproduzent IHK Mediengestalter"
              },
              {
                icon: <Handshake size={24} className="text-brand-accent" />,
                text: "Fokus auf Industrie, Mittelstand & Startups"
              },
              {
                icon: <Eye size={24} className="text-brand-accent" />,
                text: "Transparente Preise ohne versteckte Kosten"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full border border-brand-accent/30 flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[180px]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 CLIENT LOGOS MARQUEE */}
      <section className="py-20 bg-brand-bg overflow-hidden border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 text-center">
          <p className="text-sm md:text-base text-gray-400 font-medium tracking-widest uppercase">
            Zusammenarbeit mit Unternehmen und Marken aus verschiedenen Bereichen
          </p>
        </div>
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Row 1: Left to Right */}
          <div className="relative flex overflow-hidden">
            <div className="flex animate-marquee-left whitespace-nowrap gap-16 md:gap-24 items-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-16 md:gap-24 items-center">
                  {[
                    { name: "KSL - Klinikum Südwestpfalz Logistik", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650602/ksl_logo_header_25_xkxnfe.webp" },
                    { name: "Paff - Tradition & Qualität", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650428/Paff_LOGO_afp43m.webp" },
                    { name: "KSB Rechtsanwälte Kaiserslautern", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650320/KSB-Rechtsanwaelte_Logo_xr32rm.webp" },
                    { name: "Vertriebspartner24", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650099/Vertriebspartner24_sclkyd.webp" },
                    { name: "Social Care - Pflegedienst Management", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650095/socialcare-logo_d5acj2.webp" },
                    { name: "Shogun Gym Kaiserslautern Kampfsport", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650090/shogun_gym_tcwvyk.webp" },
                    { name: "Schlossgut Lüll - Eventlocation & Weingut", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650086/Schlossgut-Lull-01_-_weiss_lvq8cd.webp" }
                  ].map((client, idx) => (
                    <div key={`${client.name}-${idx}`} className="w-32 md:w-48 h-12 md:h-16 flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                      <img 
                        src={client.url} 
                        alt={`Kunde ${client.name} — Referenz Videoproduktion Kaiserslautern`} 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="relative flex overflow-hidden">
            <div className="flex animate-marquee-right whitespace-nowrap gap-16 md:gap-24 items-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-16 md:gap-24 items-center">
                  {[
                    { name: "Fit for Drive - MPU Beratung Kaiserslautern", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650059/fitfordrive_m8sbug.webp" },
                    { name: "Folienritter - Fahrzeugfolierung Pfalz", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650065/Folienritter_Logo_mzz194.webp" },
                    { name: "Aesthetic Ink - Tattoo Studio Kaiserslautern", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650037/Aestethic_Ink_Weiss_250_px_gc2mh0.webp" },
                    { name: "Pflege mit Erfolg - Pflegedienst Region Kaiserslautern", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650081/Pflege_mit_Erfolg_yrjkmx.webp" },
                    { name: "Tanzschule Marquardt Kaiserslautern", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650076/logo_tanzschule_marquardt_znwhzr.webp" },
                    { name: "Cinelex Media Videoproduktion", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650053/cinelex-media-logo-transparent-kaiserslautern_ueqzjq.webp" },
                    { name: "CBL Logistik Gruppe", url: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775650047/CBL_Logo_transparent_kkhdqm.png" }
                  ].map((client, idx) => (
                    <div key={`${client.name}-${idx}`} className="w-32 md:w-48 h-12 md:h-16 flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                      <img 
                        src={client.url} 
                        alt={`Kunde ${client.name} — Referenz Videoproduktion Kaiserslautern`} 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
