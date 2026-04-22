import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

export default function Imprint() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-bg">
      <Helmet>
        <title>Impressum | reza-e-motion</title>
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-12">Impressum</h1>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
              <p>
                Parsha Rezai Mah Videoproduktion<br />
                Inhaber: Parsha Rezai Mah
              </p>
              <p className="mt-4">
                Erfurterstraße 93<br />
                67663 Kaiserslautern<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Kontakt</h2>
              <p>
                E-Mail: <a href="mailto:rezaivision@gmail.com" className="text-brand-accent hover:underline">rezaivision@gmail.com</a><br />
                Telefon: <a href="tel:+4963162512000" className="text-brand-accent hover:underline">0631 62512000</a> (vorrangig), <a href="tel:+4917631739958" className="text-brand-accent hover:underline">0176 31739958</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                DE3641 12697
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p>
                Parsha Rezai Mah<br />
                Erfurterstraße 93<br />
                67663 Kaiserslautern<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="mt-4">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
