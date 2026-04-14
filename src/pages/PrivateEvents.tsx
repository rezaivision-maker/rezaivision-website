import { motion, AnimatePresence } from "motion/react";
import { Play, Calendar, Music, Heart, ArrowRight, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Helmet } from "react-helmet-async";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function PrivateEvents() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Web3Forms Configuration
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "e24b689a-c3cd-4bd2-a0c2-cb3bb1a74e65");
    formData.append("subject", "Neue Anfrage: REZAEMOTION (Hochzeit/Event/Musikvideo)");
    formData.append("from_name", "REZAEMOTION Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es später erneut.");
      }
    } catch (err) {
      setError("Ein Netzwerkfehler ist aufgetreten. Bitte überprüfen Sie Ihre Verbindung.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Helmet>
        <title>Rezai|Emotion | Hochzeitsvideograf, Eventbegleitung & Musikvideos RLP</title>
        <meta name="description" content="Emotionale Hochzeitsvideos, Eventbegleitung und Musikvideos aus Kaiserslautern für die Region Rheinland-Pfalz & Saarland." />
        <meta name="keywords" content="Rezai Emotion, Videograf Kaiserslautern, Eventvideografie Mannheim, Hochzeitsvideograf RLP, Saarland, Musikvideo" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg/90 to-brand-bg" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Rezai|Emotion
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Emotionen, die <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">bleiben.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
              Wir begleiten ausgewählte private und kulturelle Projekte. Ob unvergessliche Events, kreative Musikvideos oder der wichtigste Tag im Leben.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="#anfrage" variant="primary" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-none text-white">
                Projekt anfragen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-brand-darker">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-brand-bg rounded-2xl border border-white/5 overflow-hidden group hover:border-purple-500/30 transition-all duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop" 
                  alt="Event-Begleitung"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 w-12 h-12 bg-brand-bg/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <Calendar size={24} />
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-purple-400 transition-colors">Event-Begleitung</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Von Konzerten und Festivals bis hin zu exklusiven Privatfeiern. Wir fangen die Atmosphäre, die Energie und die besonderen Momente Ihres Events in dynamischen Aftermovies ein.
                </p>
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-purple-500" /> Dynamische Aftermovies</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-purple-500" /> Social Media Snippets</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-purple-500" /> Mehrkamera-Produktion</li>
                </ul>
                <Button href="/rezaemotion/eventbegleitung" variant="outline" className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 mt-auto">
                  Mehr erfahren
                </Button>
              </div>
            </motion.div>

            {/* Musikvideos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-brand-bg rounded-2xl border border-white/5 overflow-hidden group hover:border-pink-500/30 transition-all duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=1200&auto=format&fit=crop" 
                  alt="Musikvideos"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 w-12 h-12 bg-brand-bg/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-pink-400 group-hover:text-pink-300 transition-colors">
                  <Music size={24} />
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-pink-400 transition-colors">Musikvideos</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Visuelle Kunst für Ihre Musik. Wir entwickeln kreative Konzepte, die Ihren Sound visuell übersetzen – von Performance-Videos bis hin zu narrativen Kurzfilmen.
                </p>
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-pink-500" /> Konzeptentwicklung</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-pink-500" /> Performance & Story</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-pink-500" /> High-End Postproduktion</li>
                </ul>
                <Button href="/rezaemotion/musikvideos" variant="outline" className="w-full border-pink-500/30 text-pink-400 hover:bg-pink-500/10 mt-auto">
                  Mehr erfahren
                </Button>
              </div>
            </motion.div>

            {/* Hochzeiten */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-brand-bg rounded-2xl border border-white/5 overflow-hidden group hover:border-rose-500/30 transition-all duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop" 
                  alt="Hochzeitsfilme"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 w-12 h-12 bg-brand-bg/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-rose-400 group-hover:text-rose-300 transition-colors">
                  <Heart size={24} />
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-rose-400 transition-colors">Hochzeitsfilme</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Emotionale, authentische und filmische Begleitung Ihres großen Tages. Wir kreieren zeitlose Erinnerungen, die Sie auch Jahre später noch zu Tränen rühren werden.
                </p>
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-rose-500" /> Highlightvideo (7-15 Min)</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-rose-500" /> Hochzeitsfilm mit Storyline (45-60 Min)</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-rose-500" /> Volle Hochzeitsdokumentation (60-90 Min)</li>
                </ul>
                <p className="text-xs text-gray-500 italic mb-6">Weitere Optionen & individuelle Pakete im persönlichen Gespräch verfügbar.</p>
                <Button href="/rezaemotion/hochzeitsfilme" variant="outline" className="w-full border-rose-500/30 text-rose-400 hover:bg-rose-500/10 mt-auto">
                  Mehr erfahren
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Starke Qualität für<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Ihre Momente.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Wir sorgen dafür, dass das Bild gut aussieht. Unsere Kameras sind sehr stark und hochwertig. Wir liefern starke Qualität für unsere Kunden.
              </p>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-gray-300 italic">
                  "Wir nehmen nur eine stark begrenzte Anzahl an privaten Projekten und Hochzeiten pro Jahr an, um jedem Film die Aufmerksamkeit und Hingabe zu widmen, die er verdient."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1546707012-c46675f12716?q=80&w=2069&auto=format&fit=crop" 
                alt="Konzert Videoproduktion" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA & Contact Form */}
      <section className="py-24 bg-brand-darker border-t border-white/5" id="anfrage">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Lassen Sie uns etwas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Besonderes</span> erschaffen.
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Erzählen Sie uns von Ihrem Event, Ihrer Musik oder Ihrer Hochzeit. Wir freuen uns darauf, Ihre Vision filmisch zum Leben zu erwecken.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">Termin sichern</h3>
                    <p className="text-sm text-gray-400">Besonders für Hochzeiten empfehlen wir eine frühzeitige Anfrage.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Heart className="text-pink-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">Persönliches Kennenlernen</h3>
                    <p className="text-sm text-gray-400">Wir besprechen Ihre Wünsche ganz unverbindlich in einem ersten Gespräch.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-brand-bg border border-white/5 rounded-3xl p-8 md:p-10"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-2xl font-display font-bold mb-6">Event anfragen</h3>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3 text-sm">
                          <AlertCircle className="shrink-0 mt-0.5" size={18} />
                          <p>{error}</p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                        <input
                          required
                          type="text"
                          id="name"
                          name="name"
                          className="w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                          placeholder="Ihr vollständiger Name"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-300">E-Mail</label>
                          <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="ihre.adresse@email.de"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-300">Telefonnummer (optional)</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Ihre Telefonnummer"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium text-gray-300">Datum (optional)</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium text-gray-300">Art des Events</label>
                        <select
                          required
                          id="type"
                          name="type"
                          className="w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                        >
                          <option value="">Bitte wählen...</option>
                          <option value="hochzeit">Hochzeit</option>
                          <option value="musikvideo">Musikvideo</option>
                          <option value="event">Eventbegleitung (Konzert, Party, etc.)</option>
                          <option value="sonstiges">Sonstiges</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-300">Ihre Nachricht</label>
                        <textarea
                          required
                          id="message"
                          name="message"
                          rows={4}
                          className="w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                          placeholder="Erzählen Sie uns von Ihren Plänen, der Location oder ersten Ideen..."
                        ></textarea>
                      </div>

                      {/* Honeypot Spam Protection */}
                      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                      {/* Privacy Checkbox */}
                      <div className="flex items-start gap-3 mt-6">
                        <input
                          required
                          type="checkbox"
                          id="privacy_event"
                          name="privacy"
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-brand-darker text-purple-500 focus:ring-purple-500 focus:ring-offset-brand-bg cursor-pointer"
                        />
                        <label htmlFor="privacy_event" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                          Ich bin damit einverstanden, dass meine Daten zur Bearbeitung der Anfrage verarbeitet werden. Details dazu in der <Link to="/datenschutz" className="text-purple-400 hover:underline">Datenschutzerklärung</Link>.
                        </label>
                      </div>

                      <Button type="submit" size="lg" className="w-full gap-2 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-none text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Wird gesendet..." : "Anfrage senden"} <Send size={18} />
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="text-purple-400" size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">Vielen Dank!</h3>
                    <p className="text-gray-400 mb-8">
                      Ihre Anfrage ist bei uns eingegangen. Wir werden uns schnellstmöglich bei Ihnen melden.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="border-white/10 hover:bg-white/5">
                      Weitere Nachricht senden
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
