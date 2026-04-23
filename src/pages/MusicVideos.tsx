import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Play, ArrowRight, CheckCircle2, Star, ChevronRight, Music, Film, Clapperboard, X } from "lucide-react";

export default function MusicVideos() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Musikvideo Kaiserslautern | Regisseur Rheinland-Pfalz & Saarland</title>
        <meta name="description" content="Professionelle Musikvideos in RLP, Kaiserslautern & Mannheim. Von Konzept- bis Performance-Videos. Wir erschaffen deine visuelle Identität." />
        <link rel="canonical" href="https://rezaivision.de/reza-e-motion/musikvideos" />
        <meta name="keywords" content="Musikvideo Produzent Kaiserslautern, Musikvideo Rheinland-Pfalz, Rap Video Frankfurt, Band Video Saarland, Cinematic Music Video" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-bg/90 z-10" />
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80"
            alt="Musikvideo Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-sm font-medium text-pink-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              REZA-E-MOTION | MUSIKVIDEO KAISERSLAUTERN
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Dein Sound. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Deine Marke.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
              Ein Musikvideo ist mehr als Unterhaltung – es ist dein zentrales Marketinginstrument. Wir verwandeln deine künstlerische Vision in ein visuelles Gesamtkunstwerk, das Fans fesselt und dein Image schärft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/reza-e-motion#anfrage" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-none shadow-pink-500/20">
                Projekt anfragen
              </Button>
              <Button href="#showreel" variant="outline" size="lg" className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10">
                Showreel ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Value Section */}
      <section className="py-24 bg-brand-bg border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">Visuelle Identität</h3>
              <p className="text-gray-400 leading-relaxed">Wir erschaffen Bilder, die zu deinem Sound passen und ein klares, wiedererkennbares Image formen.</p>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">Emotionale Bindung</h3>
              <p className="text-gray-400 leading-relaxed">Durch starkes Storytelling verbinden wir deine Musik auf einer tieferen Ebene mit deinem Publikum.</p>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">Höhere Reichweite</h3>
              <p className="text-gray-400 leading-relaxed">Ein professionelles Video ist die Visitenkarte, die Türen zu Playlisten, Labels und neuen Fans öffnet.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Pricing & Packages */}
      <section id="pakete" className="py-24 bg-brand-bg relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Paket Beispiele</h2>
            <p className="text-gray-400 text-lg">Individuelle Formate für jedes Level. Transparente Kalkulation ohne versteckte Kosten.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-brand-darker border border-white/5 p-8 rounded-3xl flex flex-col hover:border-pink-500/30 transition-colors">
              <h3 className="text-xl font-bold mb-2">Basic / Performance</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow ">Perfekt für Newcomer & Street-Videos. Fokus auf starke Performance und schnellen Release.</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> 1 Drehtag (kompakte Crew)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Location in RLP/Umgebung</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Profi-Schnitt & Grading</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Lieferung in 7-10 Tagen</li>
              </ul>
              <Button href="/reza-e-motion#anfrage" variant="outline" className="w-full border-pink-500/30 text-pink-400 hover:bg-pink-500/10">Anfragen</Button>
            </div>

            {/* Standard */}
            <div className="bg-brand-darker border border-pink-500/30 p-8 rounded-3xl flex flex-col relative scale-105 shadow-2xl shadow-pink-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-full font-bold">Empfehlung</div>
              <h3 className="text-xl font-bold mb-2">Standard / Cinematic</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Professionelles Musikvideo mit Story-Elementen und hochwertigem Licht-Setup.</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Konzeptentwicklung & Script</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> 1-2 Drehtage (Crew-Support)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Locationscouting</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Erweitertes Color-Grading</li>
              </ul>
              <Button href="/reza-e-motion#anfrage" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-none w-full">Anfragen</Button>
            </div>

            {/* Cinematic */}
            <div className="bg-brand-darker border border-white/5 p-8 rounded-3xl flex flex-col hover:border-pink-500/30 transition-colors">
              <h3 className="text-xl font-bold mb-2">Cinematic / Narrative</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Kino-Produktion für maximale Aufmerksamkeit. Storytelling, Drohnen und Set-Design.</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Umfangreiche Vorproduktion</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Mehrere Drehtage & Team</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Drohnenaufnahmen & Extras</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-400" /> Social Media Promo Clips</li>
              </ul>
              <Button href="/reza-e-motion#anfrage" variant="outline" className="w-full border-pink-500/30 text-pink-400 hover:bg-pink-500/10">Anfragen</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-24 bg-brand-darker">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight text-pink-400">Full-Service Produktion</h2>
              <ul className="space-y-6">
                {[
                  { t: "Konzept & Storyboard", d: "Wir entwickeln die Idee, die deinen Song visuell übersetzt und Fans fesselt." },
                  { t: "High-End Technik", d: "Dreh mit modernen Kamerasystemen und professionellem Licht-Setup." },
                  { t: "Postproduktion & Grading", d: "Schnitt, Sounddesign und ein Color Grading im internationalen Musikvideo-Standard." },
                  { t: "Marketing-Support", d: "YouTube-Optimierung und Social Media Strategie für deinen Release-Day." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 size={24} className="text-pink-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.t}</h4>
                      <p className="text-gray-400">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-video gold-border-glow">
              <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop" alt="Film Set / Music Video Production" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points / Solution */}
      <section className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Warum viele Musikvideos floppen
              </h2>
              <div className="space-y-6 text-gray-400">
                <p>Künstler haben oft Angst vor unkontrollierten Kosten oder einem "Billig-Look", der ihrem Image schadet. Wir lösen diese Pain-Points durch:</p>
              </div>
              <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Kein Konzept, nur Performance</h3>
                    <p className="text-gray-400">Ein Video, in dem der Künstler nur vor einer Wand steht und rappt/singt, fesselt heute niemanden mehr. Es fehlt die Story.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Unprofessioneller Look</h3>
                    <p className="text-gray-400">Schlechtes Licht, wackelige Kamera und ein billiges Color Grading lassen den Song minderwertig wirken.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Unzuverlässige Videografen</h3>
                    <p className="text-gray-400">Der Release-Tag rückt näher, aber das Video ist immer noch nicht fertig geschnitten. Stress pur.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-display font-bold mb-8 text-pink-400">
                Wie wir es besser machen
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-pink-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Kreative Konzepte</strong>
                    <span className="text-gray-400">Wir entwickeln Ideen, die zum Vibe deines Songs passen. Storyline, Locations, Lichtstimmung.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-pink-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Cinematic Look</strong>
                    <span className="text-gray-400">Kino-Kameras, professionelles Licht-Setup und ein Color Grading, das den Look internationaler Artists hat.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-pink-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">100% Zuverlässigkeit</strong>
                    <span className="text-gray-400">Dein Release-Plan ist heilig. Wir liefern pünktlich und in höchster Qualität.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Showreel Section */}
      <section id="showreel" className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 blur-[120px] rounded-full" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              Showreel
            </h2>
            <p className="text-gray-400 text-lg">
              Ein Einblick in unsere visuellen Welten und kreativen Produktionen.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] gold-border-glow">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://player.vimeo.com/video/1182991639?badge=0&autopause=0&player_id=0&app_id=58479" 
                title="Music Video Showreel" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-pink-900/10 border-t border-pink-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Bereit für dein nächstes Video?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Schick uns deinen Track und lass uns über erste Ideen sprechen.
          </p>
          <Button href="/reza-e-motion#anfrage" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white h-14 px-10 text-lg border-none shadow-pink-500/20">
            Jetzt anfragen
          </Button>
        </div>
      </section>
    </div>
  );
}
