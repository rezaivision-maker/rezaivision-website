import { Link } from 'react-router-dom';

export function PricingSection() {
  return (
    <section className="py-24 bg-brand-bg border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
            Was kostet eine Videoproduktion?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
            Jede Videoproduktion ist ein individuelles Projekt, das genau auf Ihre Ziele, Ihre Marke und Ihre Zielgruppe zugeschnitten wird. Ob Recruiting-Video, Unternehmensfilm oder kontinuierlicher Social-Media-Content – wir erarbeiten mit Ihnen die Strategie und den optimalen Umfang für Ihr Vorhaben.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/preise"
              className="bg-brand-accent text-brand-dark px-8 py-4 rounded-full font-bold hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] text-center w-full sm:w-auto"
            >
              Details zur Preisstruktur
            </Link>
            <a
              href="https://wa.me/4915152882260"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/5 transition-colors duration-300 text-center w-full sm:w-auto"
            >
              Preisanfrage via WhatsApp
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            Nach einem kurzen Gespräch erhalten Sie eine transparente, verbindliche Einschätzung.
          </p>
        </div>
      </div>
    </section>
  );
}
