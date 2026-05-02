import { Play, ArrowRight, CheckCircle2, Star, ChevronRight, Video, Users, Target, Zap, Camera, Mic, Clock, X, MessageSquare, HelpCircle, FileText, Layout, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/Button";

export default function EventCoverage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Eventbegleitung & Aftermovies | Videograf Kaiserslautern, Mannheim & Saarbrücken"
        description="Professionelle Eventbegleitung und Aftermovies in Kaiserslautern, Mannheim und der Pfalz. Wir fangen die Energie deines Events ein – unauffällig und hochwertig."
        canonical="/reza-e-motion/eventbegleitung"
        keywords="Eventvideograf Kaiserslautern, Eventvideo Mannheim, Aftermovie Saarbrücken, Eventbegleitung RLP, Firmenfeier, Messevideo"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-bg/90 z-10" />
          <img
            loading="lazy" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
            alt="Eventbegleitung Background"
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
              Die Energie deines Events. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-brand-accent">
                Für immer festgehalten.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Vergiss langweilige Rückblicke. Wir produzieren dynamische Aftermovies und Eventvideos, die das Gefühl des Tages exakt transportieren – mit starker Bildqualität und perfektem Sound.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/reza-e-motion#anfrage" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20">
                Event anfragen
              </Button>
              <Button href="#referenzen" variant="outline" size="lg" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                Beispiele ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points / Solution */}
      <section className="py-24 bg-brand-darker">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Das Problem mit den meisten Eventvideos
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Die Kamera stört</h3>
                    <p className="text-gray-400">Gäste fühlen sich unwohl, wenn ihnen ständig eine riesige Kamera ins Gesicht gehalten wird. Echte Momente gehen verloren.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Schlechter Ton</h3>
                    <p className="text-gray-400">Reden und Keynotes sind unverständlich, weil der Ton nur über das Kameramikrofon aufgenommen wurde.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Monatelanges Warten</h3>
                    <p className="text-gray-400">Das Event ist längst vorbei und vergessen, bis das Video endlich fertig ist. Der Hype ist verflogen.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-display font-bold mb-8 text-purple-400">
                Unser Ansatz
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-purple-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Unauffällig & Professionell</strong>
                    <span className="text-gray-400">Wir arbeiten im Hintergrund wie Ninjas. Echte Emotionen, keine gestellten Posen.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-purple-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Kristallklarer Sound</strong>
                    <span className="text-gray-400">Wir zapfen das Mischpult an oder nutzen eigene Mikrofone für perfekten Redner-Ton.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-purple-400 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg mb-1">Schnelle Lieferung</strong>
                    <span className="text-gray-400">Social Media Snippets liefern wir bereit in den ersten paar Tagen nach dem Event.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Einsatzgebiete */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Wofür Eventvideos?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ein Aftermovie ist mehr als nur eine Erinnerung – es ist ein mächtiges Tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="text-purple-400" />,
                title: "Recruiting & Kultur",
                desc: "Zeige potenziellen Talenten, wie es ist, Teil deines Teams zu sein."
              },
              {
                icon: <Target className="text-purple-400" />,
                title: "Branding & Impact",
                desc: "Stärke deine Marke durch die emotionale Energie deines Events."
              },
              {
                icon: <Zap className="text-purple-400" />,
                title: "Social Media Boost",
                desc: "Verlängere die Lebensdauer deines Events mit viralen Snippets."
              },
              {
                icon: <Layout className="text-purple-400" />,
                title: "Marketing-Asset",
                desc: "Nutze das Video, um das nächste Event noch erfolgreicher zu verkaufen."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/30 transition-colors">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unser Vorgehen */}
      <section className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Unser Vorgehen
            </h2>
            <p className="text-xl text-gray-400">
              Vom ersten Call bis zur finalen Lieferung – wir lassen nichts dem Zufall überlassen.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Briefing & Vision",
                desc: "Wir besprechen deine Ziele: Was soll das Video bewirken? Welche Momente sind unverzichtbar?"
              },
              {
                step: "02",
                title: "Unauffällige Begleitung",
                desc: "Wir agieren im Hintergrund. Wir fangen die echten, ungestellten Momente ein, ohne den Ablauf zu stören."
              },
              {
                step: "03",
                title: "Postproduktion & Sound",
                desc: "Der Film entsteht im Schnitt. Wir wählen die beste Musik und mischen den Original-Ton für maximale Gänsehaut."
              },
              {
                step: "04",
                title: "Schnelle Lieferung",
                desc: "Innerhalb der ersten Tage erhältst du die Social Media Snippets, kurz darauf den fertigen Hauptfilm."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 md:gap-16 items-start">
                <span className="text-4xl md:text-6xl font-display font-bold text-white/10 shrink-0 select-none">
                  {item.step}
                </span>
                <div className="pt-2 md:pt-4">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 max-w-2xl leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Häufig gestellte Fragen
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Wann sollten wir anfragen?",
                a: "Besonders für populäre Termine im Sommer empfehlen wir eine Anfrage 2-3 Monate im Voraus."
              },
              {
                q: "Müssen wir besondere Technik vor Ort bereitstellen?",
                a: "Nein, wir bringen alles mit. Wenn es ein Mischpult gibt, zapfen wir dieses für perfekten Ton gerne an."
              },
              {
                q: "Wie lange ist der fertige Film?",
                a: "Ein Aftermovie ist meist 2-4 Minuten lang – perfekt für die Aufmerksamkeit im Netz. Rohdaten liefern wir auf Anfrage."
              },
              {
                q: "In welcher Qualität wird gefilmt?",
                a: "Wir filmen standardmäßig in 4K mit High-End Kameras für maximale Bildgewalt und Schärfe."
              }
            ].map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold">{faq.q}</span>
                  <ChevronDown className={`shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-400 animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-purple-900/20 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Dein Event steht an?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Lass uns darüber sprechen, wie wir dein Event unvergesslich machen. Sichere dir jetzt deinen Termin.
          </p>
          <Button href="/reza-e-motion#anfrage" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white h-14 px-10 text-lg">
            Unverbindlich anfragen
          </Button>
        </div>
      </section>
    </div>
  );
}
