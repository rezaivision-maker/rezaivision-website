import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Play, ArrowRight, CheckCircle2, Star, ChevronRight, Heart, Video, Camera, Mic, X } from "lucide-react";

export default function WeddingFilms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Hochzeitsvideograf Kaiserslautern, Mannheim & Saarland | Cinematic Wedding Films</title>
        <meta name="description" content="Emotionale Hochzeitsfilme im Umkreis von 100km (Rheinland-Pfalz, Saarland). Wir fangen die echten Momente eures Tages ein – unauffällig und authentisch." />
        <link rel="canonical" href="https://www.rezaivision.de/reza-e-motion/hochzeitsfilme" />
        <meta name="keywords" content="Hochzeitsvideograf Kaiserslautern, Hochzeitsfilm Mannheim, Hochzeitsvideograf Saarland, Cinematic Wedding Video RLP" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-bg/90 z-10" />
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80"
            alt="Hochzeitsvideo Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              REZA-E-MOTION
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Euer Tag. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-brand-accent">
                Euer Film.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Ihr heiratet (meistens) nur einmal. Ein Tag voller Emotionen, der oft viel zu schnell vorbeizieht. Wir fangen die Momente ein, die ihr vor lauter Aufregung vielleicht verpasst – damit ihr sie ein Leben lang wiedererleben könnt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/reza-e-motion#anfrage" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20">
                Termin anfragen
              </Button>
              <Button href="#referenzen" variant="outline" size="lg" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                Filme ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why a Film Section */}
      <section className="py-24 bg-brand-bg overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                Ein Bild sagt mehr als tausend Worte.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-brand-accent">
                  Aber was sagt ein Film?
                </span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
                <p>
                  Die meisten Paare geben ein kleines Vermögen für die Hochzeit aus: das perfekte Kleid, edles Catering, einen erstklassigen Fotografen. Doch oft wird dabei eines vergessen: <span className="text-gray-100 font-semibold">Der Ton und die Bewegung.</span>
                </p>
                <p>
                  Ein Foto fängt den Kuss ein. Ein Film fängt das Zittern in der Stimme beim Ja-Wort ein, das herzliche Lachen der Großeltern und das Rascheln des Kleides. Es ist das einzige Medium, das euch *wirklich* zurück in diesen Moment katapultiert.
                </p>
                <div className="p-6 bg-white/5 border border-purple-500/20 rounded-2xl border-l-4 border-l-purple-500 italic">
                  "Ich habe Hochzeitspaare erlebt, die nach dem ersten Sehen ihres Films in Tränen ausgebrochen sind – nicht nur vor Rührung, sondern weil sie erst in diesem Moment begriffen haben, wie unersetzlich diese lebendige Erinnerung für sie ist."
                </div>
                <p>
                  Eure Hochzeit ist ein Versprechen fürs Leben. Wir sorgen dafür, dass dieses Versprechen, dieser Moment und die gesamte Magie dieses stressigen, aber wunderschönen Tages für immer sicher verwahrt sind.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] gold-border-glow">
                <img 
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
                  alt="Emotional Wedding Moment" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-brand-darker border border-white/10 p-6 rounded-2xl shadow-2xl max-w-xs md:block hidden">
                <p className="text-sm font-medium text-purple-400 mb-1 font-display tracking-widest uppercase">Der Fokus</p>
                <p className="text-white text-lg font-light">Echte Emotionen, unauffällig eingefangen.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS SECTION - Updated with better copy */}
      <section className="py-24 bg-brand-darker">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Die Angst vor dem falschen Videografen
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Aufdringliche Kameras</h3>
                    <p className="text-gray-400">Ein Videograf, der euch und euren Gästen ständig die Kamera ins Gesicht hält und den natürlichen Ablauf stört.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Kitschige, gestellte Videos</h3>
                    <p className="text-gray-400">Filme, die aussehen wie aus den 90ern. Gestellte Posen, peinliche Musik und null Emotionen.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Verpasste Momente</h3>
                    <p className="text-gray-400">Das Ja-Wort oder die Rede des Vaters sind schlecht zu hören, weil das Mikrofon vergessen wurde.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-display font-bold mb-8 text-purple-400">
                Wie wir eure Geschichte erzählen
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-purple-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Unsichtbar & Mittendrin</strong>
                    <span className="text-gray-400">Wir passen uns eurer Feier an. In den wichtigen Momenten agieren wir unsichtbar im Hintergrund. Wo es passt, integrieren wir uns aber voll und ganz in die Feier, sodass Familie und Gäste locker werden und die Kamera vergessen.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-purple-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Cinematic Storytelling</strong>
                    <span className="text-gray-400">Wir schneiden euren Film wie einen Kinofilm. Mit der perfekten Musik, echtem Ton und wunderschönen Farben.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-purple-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Perfekter Sound</strong>
                    <span className="text-gray-400">Wir verkabeln den Bräutigam und den Redner unauffällig, damit das Ja-Wort kristallklar im Video zu hören ist.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Paket Beispiele */}
      <section id="pakete" className="py-24 bg-brand-bg relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Paket Beispiele</h2>
            <p className="text-gray-400 text-lg">Individuell anpassbar. Genau so geschnitten, wie es zu euren Erinnerungen passt. Weitere Optionen auf Wunsch.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Highlight */}
            <div className="bg-brand-darker border border-white/5 p-8 rounded-3xl flex flex-col hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold mb-2">Highlight Reel</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Die emotionalsten Momente komprimiert auf 7 bis 15 Minuten. Perfekt, um den Tag immer wieder kurz aufleben zu lassen.</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> 7 - 15 Minuten Filmlänge</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> Fokus auf Highlights & Emotionen</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> Leicht mit Gästen teilbar</li>
              </ul>
              <Button href="/reza-e-motion#anfrage" variant="outline" className="w-full">Anfragen</Button>
            </div>

            {/* Storyline */}
            <div className="bg-brand-darker border border-purple-500/30 p-8 rounded-3xl flex flex-col relative scale-105 shadow-2xl shadow-purple-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-full font-bold">Beliebteste Wahl</div>
              <h3 className="text-xl font-bold mb-2">Storyline Film</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Ein echtes Kinoerlebnis eures Tages. Ca. 45 bis 60 Minuten emotionales Storytelling inklusive Reden und Momenten.</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> 45 - 60 Minuten Filmlänge</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> Integrierte O-Töne (Reden, Gelübde)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> Cinematic Storytelling</li>
              </ul>
              <Button href="/reza-e-motion#anfrage" className="bg-purple-600 hover:bg-purple-700 text-white border-none w-full">Anfragen</Button>
            </div>

            {/* Dokumentation */}
            <div className="bg-brand-darker border border-white/5 p-8 rounded-3xl flex flex-col hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold mb-2">Volle Dokumentation</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Eine umfangreiche Hochzeitsdokumentation. 60 bis 90 Minuten Laufzeit für alle Details, Zeremonien und volle Reden.</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> 60 - 90 Minuten Filmlänge</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> Komplette Trauung & Zeremonie</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-400" /> Alle Reden & Programmpunkte</li>
              </ul>
              <Button href="/reza-e-motion#anfrage" variant="outline" className="w-full">Anfragen</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Referenzen Placeholder */}
      <section id="referenzen" className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Unsere Hochzeitsfilme
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Echte Emotionen, eingefangen für die Ewigkeit.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center hover:border-purple-500/30 transition-colors">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Video className="text-purple-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Privatsphäre steht an erster Stelle</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Da unsere Hochzeitsfilme sehr intime und private Momente zeigen, veröffentlichen wir diese aus Respekt vor unseren Brautpaaren nicht öffentlich als Showreel. 
                <br /><br />
                Wir zeigen euch aber sehr gerne in einem gemeinsamen Online-Gespräch exklusive Ausschnitte und komplette Referenzfilme!
              </p>
              <Button href="/reza-e-motion#anfrage" className="bg-purple-600 hover:bg-purple-700 text-white">
                Online-Gespräch vereinbaren
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-purple-900/20 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Euer Datum steht fest?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Sichert euch jetzt euren Termin. Die beliebtesten Wochenenden im Sommer sind schnell vergeben.
          </p>
          <Button href="/reza-e-motion#anfrage" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white h-14 px-10 text-lg">
            Verfügbarkeit prüfen
          </Button>
        </div>
      </section>
    </div>
  );
}
