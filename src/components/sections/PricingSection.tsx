import { Link } from 'react-router-dom';

export function PricingSection() {
  return (
    <section className="py-24 bg-brand-bg border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
            Was kostet Ihr Video-Projekt wirklich?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
            Schluss mit versteckten Kosten und undurchsichtigen Angeboten. Klicken Sie sich in 60 Sekunden durch unseren Rechner und erhalten Sie sofort eine realistische, transparente Preiseinschätzung für Ihr Projekt. Keine Verpflichtungen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/preisrechner"
              className="bg-brand-accent text-brand-dark px-8 py-4 rounded-full font-bold hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] text-center w-full sm:w-auto"
            >
              Jetzt Preis berechnen
            </Link>
            <a
              href="https://wa.me/4917631739958"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/5 transition-colors duration-300 text-center w-full sm:w-auto"
            >
              Kurze Frage per WhatsApp
            </a>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Das Ergebnis erhalten Sie direkt im Browser und als praktische Übersicht per E-Mail.
          </p>
        </div>
      </div>
    </section>
  );
}
