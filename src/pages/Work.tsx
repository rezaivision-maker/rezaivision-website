import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Work() {
  const projects = [
    {
      title: "TechCorp GmbH",
      type: "Recruiting Kampagne",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
      result: "+45% mehr qualifizierte Bewerbungen in 3 Monaten",
      colSpan: "lg:col-span-2"
    },
    {
      title: "Klinikum Südwest",
      type: "Imagefilm",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      result: "Positionierung als Top-Arbeitgeber der Region",
      colSpan: "col-span-1"
    },
    {
      title: "Handwerk Müller",
      type: "Social Media Ads",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356f90?q=80&w=800&auto=format&fit=crop",
      result: "200% ROI in den ersten 4 Wochen",
      colSpan: "col-span-1"
    },
    {
      title: "Logistik Express",
      type: "Unternehmensfilm",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      result: "Steigerung der B2B Anfragen um 30%",
      colSpan: "col-span-1"
    },
    {
      title: "Agentur Kreativ",
      type: "Eventvideo",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
      result: "Über 100k Views auf LinkedIn",
      colSpan: "col-span-1"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Referenzen & Portfolio | RezaEmotion</title>
        <meta name="description" content="Entdecken Sie unsere bisherigen Videoproduktionen. Erfolgreiche Projekte für Unternehmen aus Kaiserslautern und Umgebung." />
        <link rel="canonical" href="https://rezaivision.de/referenzen" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            Referenzen
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl">
            Wir lassen Taten sprechen. Hier finden Sie eine Auswahl unserer erfolgreichsten Projekte aus verschiedenen Branchen.
          </p>
        </motion.div>

        {/* Showreel Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer mb-24"
        >
          <img
            src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
            alt="Showreel 2024"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center text-brand-bg transform scale-90 group-hover:scale-100 transition-transform">
              <Play size={40} className="ml-2" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-bg to-transparent">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">Showreel 2024</h3>
            <p className="text-gray-300 text-base md:text-lg">Ein Best-of unserer Arbeit</p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden aspect-video group cursor-pointer ${project.colSpan}`}
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-black/40 to-transparent opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                  <Play size={24} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent border border-brand-accent/30 rounded-full text-xs font-medium mb-3">
                  {project.type}
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.result}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Lassen Sie uns Ihr Projekt besprechen</h2>
          <Button href="/kontakt" size="lg">
            20-Minuten Projekt-Check buchen
          </Button>
        </div>
      </div>
    </div>
  );
}
