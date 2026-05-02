import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Camera, 
  Monitor, 
  Mic, 
  Sun, 
  Wind, 
  Layers, 
  Smartphone, 
  PenTool,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Equipment() {
  const techSpecs = [
    {
      icon: <Camera className="text-brand-accent" size={32} />,
      title: "Kamerasysteme",
      desc: "Wir arbeiten primär mit der Sony Cineline für maximale Flexibilität und erstklassigen Dynamikumfang. Der intelligente Real-Time Autofokus garantiert dabei gestochen scharfe Ergebnisse, selbst bei schnellsten Bewegungen.",
      details: ["Sony Cineline", "Real-Time Autofokus", "4K / High Framerates", "RED (Option)"]
    },
    {
      icon: <Monitor className="text-brand-accent" size={32} />,
      title: "Post-Produktion & Farbe",
      desc: "Color Grading im Industriestandard DaVinci Resolve. Wir arbeiten mit Spyder Colorcharts für maximale Farbtreue. Monitor-Kalibrierung erfolgt auf Rec.709 für Web (2.2) und Broadcast (2.4).",
      details: ["DaVinci Resolve Studio", "Kalibrierte EIZO & BenQ Monitore", "Spyder Colorcharts", "Farbakkurate Darstellung"]
    },
    {
      icon: <Mic className="text-brand-accent" size={32} />,
      title: "Audio & Sounddesign",
      desc: "Klarer Ton ist 50% des Erlebnisses. Wir nutzen hochwertige Mikrofonsysteme von RODE und drahtlose Lavaliersysteme für kristallklare Stimmen.",
      details: ["RODE Shotgun Mics", "Drahtlose Funkstrecken", "Studio-Sprecher (Optional)", "Eigene Sound-Library"]
    },
    {
      icon: <Sun className="text-brand-accent" size={32} />,
      title: "Licht & Atmosphäre",
      desc: "Wir bringen das Studio zu Ihnen. Professionelle LED-Panels, Softboxen und Practicals vor Ort erzeugen die perfekte Lichtstimmung in Ihren Räumen.",
      details: ["Hocheffiziente LED-Panels", "Großformat-Softboxen", "Practicals vor Ort", "Mobiler Einsatz"]
    },
    {
      icon: <Wind className="text-brand-accent" size={32} />,
      title: "Drohnen-Perspektiven",
      desc: "Für beeindruckende Luftaufnahmen bieten wir professionelle Drohnen-Einsätze an, um Ihr Unternehmen aus neuen Perspektiven zu zeigen.",
      details: ["Luftbild-Szenen", "Rechtssichere Abwicklung", "4K-Perspektiven", "Nahtlose Integration"]
    },
    {
      icon: <Layers className="text-brand-accent" size={32} />,
      title: "Grip & Statik",
      desc: "Dank Gimbalsystemen und robuster Stative garantieren wir einen effektiven Stand sowie ruhige, smoothe und dynamische Bewegungen.",
      details: ["3-Achsen Gimbals", "Robuste Stative", "Teleprompter-System", "Smoothe Kamerabewegungen"]
    }
  ];

  const looks = [
    {
      title: "Cineastisch",
      desc: "Tiefe, Atmosphäre und Storytelling wie im Spielfilm. Ideal für Marken-Inszenierungen.",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Commercial",
      desc: "Klar, sauber und verkaufsstark. Perfekt für Ads und Produktvideos.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Authentisch",
      desc: "Nahbar, echt und direkt. Der Standard für modernes Recruiting und Social Content.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Technik & Qualität | Rezai Vision | Videoproduktion Kaiserslautern</title>
        <meta name="description" content="Erfahren Sie mehr über unsere Technik und Qualitätsstandards. Von Sony Cineline bis DaVinci Resolve – wir liefern Industriestandard für Ihr Unternehmen." />
        <link rel="canonical" href="https://www.rezaivision.de/technik" />
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-sm font-medium text-brand-accent mb-8">
            Produktions-Standard
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-[1.1]">
            Technik, die <br /><span className="text-brand-accent italic">Ihre Vision</span> greifbar macht.
          </h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Wir glauben nicht an Technik als Selbstzweck. Wir glauben an Werkzeuge, die Barrieren zwischen Ihrer Idee und der Wahrnehmung Ihrer Kunden abbauen.
          </p>
        </motion.div>

        {/* LOGIC & WORKFLOW */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSpecs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-brand-darker border border-white/5 p-8 rounded-3xl hover:border-brand-accent/30 transition-all group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {spec.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{spec.title}</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  {spec.desc}
                </p>
                <div className="space-y-2 pt-6 border-t border-white/5">
                  {spec.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-medium">
                      <div className="w-1 h-1 rounded-full bg-brand-accent" />
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COLOR & CALIBRATION FOCUS */}
        <section className="py-24 bg-brand-accent rounded-[3rem] mb-32 text-brand-darker px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                Ein Versprechen für <br />farbechte Kommunikation.
              </h2>
              <div className="space-y-6">
                <p className="text-lg font-medium opacity-90">
                  Displays variieren – unser Standard bleibt die Konstante. Während Endgeräte Farben individuell interpretieren, arbeiten wir auf genormten Industriestandards für maximale Konsistenz.
                </p>
                <ul className="space-y-4">
                  {[
                    "Korrektes Farbmanagement im Rec.709 Standard",
                    "Optimierte Ausgabe: Gamma 2.2 (Web) & Gamma 2.4 (Broadcast)",
                    "Referenz-Check: Monitoring via DaVinci Resolve auf dem iPhone",
                    "Optimale Performance auf den wichtigsten Ziel-Displays"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1" size={20} />
                      <span className="font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-brand-darker/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl">
              <Cpu className="mb-6" size={48} />
              <h4 className="text-2xl font-display font-bold mb-4">Industriestandard. Ohne Umwege.</h4>
              <p className="opacity-80 leading-relaxed mb-6">
                Unsere Exporte sind für maximale Performance im Web optimiert. Durch unser macOS-basiertes Ökosystem und strikte interne Qualitätskontrollen stellen wir sicher, dass jedes Video unsere hohen technischen Standards erfüllt – für Ergebnisse, die ab der ersten Sekunde technisch perfekt performen.
              </p>
              <div className="flex gap-4">
                <div className="bg-brand-darker text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">DaVinci Resolve</div>
                <div className="bg-brand-darker text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">EIZO Reference</div>
              </div>
            </div>
          </div>
        </section>

        {/* LOOKS & STYLES */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Präzision trifft Ästhetik</h2>
            <p className="text-gray-400">Das Werkzeug richtet sich immer nach dem gewünschten Gefühl.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {looks.map((look, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl aspect-square">
                <img 
                  src={look.image} 
                  alt={look.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent p-8 flex flex-col justify-end">
                  <h4 className="text-2xl font-display font-bold mb-2">{look.title}</h4>
                  <p className="text-gray-300 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {look.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="bg-brand-darker border border-white/5 p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[100px] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 relative z-10">Bereit für den nächsten Level?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Lassen Sie uns gemeinsam besprechen, wie wir Ihre Vision mit modernster Technik in Realität verwandeln.
          </p>
          <Button href="/kontakt" size="lg" className="relative z-10">
            Kostenlosen Projekt-Check anfordern
          </Button>
        </div>
      </div>
    </div>
  );
}
