import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function ServicesSection() {
  return (
    <section className="py-24 bg-brand-darker">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
              Unsere Leistungen
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Ihre Agentur für <strong className="text-white font-medium">Videoproduktion aus Kaiserslautern</strong>. Spezialisiert auf Videoformate und Ads, die regionale Unternehmen sichtbar machen, Vertrauen stärken und Wachstum ankurbeln.
            </p>
          </div>
          <Button href="/leistungen" variant="outline" className="shrink-0 gap-2">
            Alle Leistungen <ArrowRight size={16} />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Unternehmensfilme",
              desc: "Hochwertige Imagefilme, die zeigen, wer Sie sind, wofür Sie stehen und was Ihr Unternehmen besonders macht.",
              img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
              link: "/leistungen/unternehmensfilm"
            },
            {
              title: "Recruiting Videos",
              desc: "Gewinnen Sie die besten Talente durch authentische Employer-Branding-Filme und smarte Recruiting-Funnels.",
              img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
              link: "/leistungen/recruiting"
            },
            {
              title: "Werbevideos",
              desc: "High-Converting Video-Ads und Kurzvideos für Performance-Kampagnen und Social Media Werbung.",
              img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_600/v1775639140/Social_Media_Reels_Kaiserslautern_Rezaivision_Videoproduktion_fuer_Social_Media_ek3s0b.webp",
              link: "/leistungen/werbevideo"
            },
            {
              title: "Social Media Content",
              desc: "Regelmäßiger Social Media Content Kaiserslautern (TikToks, Instagram Reels & LinkedIn Videos) für kontinuierliche Reichweite.",
              img: "https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto,f_auto,w_600/v1775649531/Social_Media_Content_Videos_Reels_Rezaivision_Kaiserslautern_wvd12d.webp",
              link: "/leistungen/social-media"
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Link to={service.link} className="group relative block overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9]">
                <img
                  loading="lazy" src={service.img}
                  alt={`${service.title} Leistung Videoproduktion Kaiserslautern — Rezai Vision`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent opacity-90" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:gold-text-gradient transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-4 max-w-md">{service.desc}</p>
                  <div className="flex items-center gold-text-gradient font-medium text-sm gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Mehr erfahren <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Webdesign — Full-width 5th card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-2"
          >
            <Link to="/leistungen/webdesign" className="group relative block overflow-hidden rounded-2xl aspect-[16/5]">
              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop"
                alt="Webdesign & Homepageerstellung Kaiserslautern — Rezai Vision"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/60 to-transparent opacity-95" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-xs font-medium text-brand-accent mb-4 w-fit">
                  Neu
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  Video-Websites & Homepageerstellung
                </h3>
                <p className="text-gray-300 mb-6 max-w-xl text-sm md:text-base leading-relaxed">
                  Die perfekte Bühne für deine Videos. Blitzschnelle, conversion-optimierte Websites und Landingpages – abgestimmt auf deine Videoproduktion. Alles aus einer Hand.
                </p>
                <div className="flex items-center gold-text-gradient font-medium text-sm gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Mehr erfahren <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
