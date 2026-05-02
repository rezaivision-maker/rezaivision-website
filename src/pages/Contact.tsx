import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, AlertCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SEO } from "@/components/SEO";
import { Link, useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Web3Forms Configuration
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "e24b689a-c3cd-4bd2-a0c2-cb3bb1a74e65");
    formData.append("subject", "Neue Projektanfrage von Rezai Vision Website");
    formData.append("from_name", "Rezai Vision Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        navigate("/danke", { state: { type: 'corporate' } });
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
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <SEO 
        title="Kontakt | Rezai Vision - Ihr Projekt anfragen"
        description="Fragen Sie jetzt Ihr Videoprojekt bei Rezai Vision an. Wir beraten Sie unverbindlich zu Unternehmensfilmen, Recruiting-Videos und Social Media Content."
        canonical="/kontakt"
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-8">
            Lassen Sie uns sprechen
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            Bereit für Ihr nächstes Projekt?
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl">
            Buchen Sie einen unverbindlichen 20-Minuten Projekt-Check oder schreiben Sie uns direkt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-brand-darker border border-white/5 rounded-3xl p-8 md:p-12"
          >
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Projekt anfragen</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="recap" value="true" />
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3 text-sm">
                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-gray-300">Unternehmen</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="Ihr Unternehmen (optional)"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">E-Mail</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="ihre.adresse@email.de"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">Telefonnummer (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="Ihre Telefonnummer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="project" className="text-sm font-medium text-gray-300">Um was geht es?</label>
                  <select
                    required
                    id="project"
                    name="project"
                    className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="imagefilm">Unternehmensfilm / Imagefilm</option>
                    <option value="recruiting">Recruiting Video</option>
                    <option value="werbung">Werbevideo / Social Ads</option>
                    <option value="social">Social Media Content (Retainer)</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Ihre Nachricht</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors resize-none"
                    placeholder="Erzählen Sie uns von Ihrem Projekt, Ihren Zielen oder ersten Ideen..."
                  ></textarea>
                </div>

                {/* Honeypot Spam Protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                {/* Privacy Checkbox */}
                <div className="flex items-start gap-3 mt-6">
                  <input
                    required
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-brand-bg text-brand-accent focus:ring-brand-accent focus:ring-offset-brand-darker"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-400 leading-relaxed">
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Bearbeitung meiner Anfrage gespeichert und verarbeitet werden. Weitere Informationen finden Sie in der <Link to="/datenschutz" className="text-brand-accent hover:underline">Datenschutzerklärung</Link>.
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full gap-2 mt-6 h-14 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Anfrage senden"} <Send size={18} />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Direkter Kontakt</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">E-Mail</h3>
                    <a href="mailto:rezaivision@gmail.com" className="text-gray-400 hover:text-brand-accent transition-colors">
                      rezaivision@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Telefon</h3>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+4963162512000" className="text-gray-400 hover:text-brand-accent transition-colors">
                        0631 62512000 (vorrangig)
                      </a>
                      <a href="tel:+4917631739958" className="text-gray-400 hover:text-brand-accent transition-colors">
                        0176 31739958
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Standort</h3>
                    <p className="text-gray-400">
                      Kaiserslautern<br />
                      Deutschland
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-brand-accent" size={24} />
                <h3 className="text-xl font-display font-bold">Ablauf nach Anfrage</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Wir melden uns normalerweise innerhalb von 24 Stunden bei Ihnen. Über E-Mail, gerne aber auch über Telefon oder Video-Call für eine Bedarfsanalyse.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Integration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Hier finden Sie uns</h2>
            <p className="text-gray-400">Besuchen Sie uns in unserem Studio in Kaiserslautern.</p>
          </div>
          <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-white/5 grayscale invert opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.3!2d7.7474!3d49.4213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47966996b5a5e2a1%3A0x422435029b0c810!2sErfurter%20Str.%2093%2C%2067663%20Kaiserslautern!5e0!3m2!1sde!2sde!4v1714600000000!5m2!1sde!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rezai Vision Standort"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
