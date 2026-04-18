import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

export default function AGB() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-bg">
      <Helmet>
        <title>Allgemeine Geschäftsbedingungen | Rezai Vision & reza-e-motion</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-gray-400 mb-12">Stand: 2026</p>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Geltungsbereich und Vertragspartner</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Videoproduktionen (B2B unter "Rezai Vision" sowie B2C-Events/Hochzeiten unter "reza-e-motion") zwischen der <strong>Parsha Rezai Mah Videoproduktion</strong> (nachfolgend "Auftragnehmer" genannt) und ihren Kunden (nachfolgend "Auftraggeber" genannt).
              </p>
              <p className="mt-4">
                Abweichende AGB des Auftraggebers werden nicht anerkannt, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich zu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Vertragsschluss</h2>
              <p>
                Angebote des Auftragnehmers sind unverbindlich. Ein rechtsverbindlicher Vertrag kommt erst durch eine schriftliche Auftragsbestätigung (z.B. per E-Mail) oder durch die beiderseitige Unterzeichnung eines Vertrages zustande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Leistungen und Mitwirkungspflichten</h2>
              <p>
                Gegenstand des Vertrages ist die im Angebot beschriebene Videoproduktion (Konzeption, Dreh, Postproduktion).
              </p>
              <p className="mt-4">
                Der Auftraggeber ist verpflichtet, erforderliche Informationen, Locations oder Ansprechpartner rechtzeitig zur Verfügung zu stellen. Kommt es aufgrund fehlender Mitwirkung zu Verzögerungen, trägt der Auftraggeber die daraus resultierenden Mehrkosten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Vergütung und Zahlungsbedingungen</h2>
              <p>
                Für <strong>B2B-Kunden</strong> (Unternehmen) verstehen sich alle angegebenen Preise netto zzgl. der gesetzlichen Umsatzsteuer. Für <strong>B2C-Kunden</strong> (Verbraucher, z.B. Hochzeiten) sind Preise Bruttopreise inkl. der gesetzlichen Umsatzsteuer, sofern nicht anders ausgewiesen.
              </p>
              <p className="mt-4">
                Der Auftragnehmer ist berechtigt, eine Anzahlung in Höhe von 50 % der Rechnungssumme nach Auftragserteilung in Rechnung zu stellen. Die Restsumme wird nach Abschluss des Projekts und Abnahme fällig.
              </p>
              <p className="mt-4">
                Rechnungen sind innerhalb von 14 Tagen ohne Abzug zu begleichen, sofern keine abweichenden Zahlungsziele vereinbart wurden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Stornierung und Ausfall (WICHTIG für Event- & Hochzeitsbuchungen)</h2>
              <p>
                Wird ein bereits bestätigter Auftrag oder Drehtag durch den Auftraggeber storniert, fallen folgende Stornogebühren an, da das Datum exklusiv für den Auftraggeber reserviert wurde:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Stornierung bis 30 Tage vor Drehbeginn: 25 % des Auftragswerts (Einbehalt der Anzahlung)</li>
                <li>Stornierung 29 bis 14 Tage vor Drehbeginn: 50 % des Auftragswerts</li>
                <li>Stornierung weniger als 14 Tage vor Drehbeginn: 80 % des Auftragswerts</li>
              </ul>
              <p className="mt-4">Dem Auftraggeber bleibt der Nachweis gestattet, dass ein Schaden überhaupt nicht entstanden oder wesentlich niedriger ist.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Abnahme und Korrekturschleifen</h2>
              <p>
                Nach Fertigstellung des Videos stellt der Auftragnehmer dem Auftraggeber eine Preview (Ansichtsversion) zur Verfügung. Es sind <strong>zwei (2) kostenfreie Korrekturschleifen</strong> für kleinere Anpassungen (Schnitt, Colorgrading, Text) im Standardumfang enthalten. 
              </p>
              <p className="mt-4">
                Grundlegende Änderungen, die vom ursprünglichen Konzept oder Briefing abweichen, werden nach Aufwand gesondert abgerechnet. Äußert sich der Auftraggeber nicht innerhalb von 7 Tagen nach Übermittlung der Preview, gilt das Werk als abgenommen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Nutzungsrechte und Rohmaterial</h2>
              <p>
                Nach vollständiger Bezahlung räumt der Auftragnehmer dem Auftraggeber ein einfaches, zeitlich und räumlich unbeschränktes Nutzungsrecht an dem finalen Video für die vereinbarten Zwecke (Website, Social Media, etc.) ein.
              </p>
              <p className="mt-4">
                Eine Weitergabe der Nutzungsrechte an Dritte (z.B. Sender, Verlage) sowie der Weiterverkauf bedürfen der vorherigen schriftlichen Zustimmung des Auftragnehmers.
              </p>
              <p className="mt-4">
                <strong>Das Rohmaterial (ungeschnittene Bild- und Tonaufnahmen) verbleibt beim Auftragnehmer.</strong> Eine Herausgabe des Rohmaterials muss ausdrücklich vereinbart und in der Regel gesondert vergütet werden.
              </p>
              <p className="mt-4">
                <strong>Eigenwerbung:</strong> Der Auftragnehmer darf das finale Video oder Ausschnitte daraus (sowie Screenshots) honorarfrei für eigene werbliche Zwecke (Portfolio, Website, Social Media) nutzen, sofern vertraglich keine Exklusivität oder Sperrfrist vereinbart wurde.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Widerrufsrecht für Verbraucher (B2C)</h2>
              <p>
                Sofern der Auftraggeber Verbraucher ist (z.B. bei der Buchung für eine private Hochzeit) und der Vertrag unter ausschließlicher Verwendung von Fernkommunikationsmitteln geschlossen wurde, steht ihm ein gesetzliches Widerrufsrecht von 14 Tagen zu.
              </p>
              <p className="mt-4">
                <strong>Erlöschen des Widerrufsrechts:</strong> Das Widerrufsrecht erlischt vorzeitig, wenn der Auftragnehmer mit der Ausführung der Dienstleistung (z.B. Vorgespräche, Konzeption) mit ausdrücklicher Zustimmung des Verbrauchers begonnen hat und die Dienstleistung vor Ablauf der Widerrufsfrist vollständig erbracht wurde.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Haftung</h2>
              <p>
                Der Auftragnehmer haftet nur für Vorsatz und grobe Fahrlässigkeit. Bei der Verletzung wesentlicher Vertragspflichten haftet der Auftragnehmer auch bei leichter Fahrlässigkeit, jedoch begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
              </p>
              <p className="mt-4">
                Der Auftraggeber ist dafür verantwortlich, dass ihm sämtliche Rechte (z.B. Locationfreigaben, Musikreche, Rechte abgebildeter Personen) an von ihm selbst beigestelltem Material vorliegen. Er stellt den Auftragnehmer von Ansprüchen Dritter in diesem Zusammenhang frei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Schlussbestimmungen</h2>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand und Erfüllungsort ist – soweit gesetzlich zulässig – Kaiserslautern.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
