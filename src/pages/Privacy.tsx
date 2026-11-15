import { motion } from "motion/react";
import { SEO } from "@/components/SEO";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-bg">
      <SEO title="Datenschutzerklärung | Rezai Vision & reza-e-motion" canonical="/datenschutz" noindex={true} />
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Datenschutzerklärung</h1>
          <p className="text-gray-400 mb-12">Zuletzt aktualisiert: November 2026</p>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (insbesondere der europäischen Datenschutz-Grundverordnung DSGVO sowie dem aktuellen Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz TDDDG) sowie dieser Datenschutzerklärung.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Verantwortliche Stelle</h2>
              <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
              <p className="mt-4">
                Parsha Rezai Mah Videoproduktion<br />
                Erfurter Straße 93<br />
                67663 Kaiserslautern<br />
                Deutschland
              </p>
              <p className="mt-4">
                E-Mail: <a href="mailto:rezaivision@gmail.com" className="text-brand-accent hover:underline">rezaivision@gmail.com</a><br />
                Telefon: 0631 62512000
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Hosting, Content Delivery Networks (CDN) & Infrastruktur</h2>
              
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Hosting bei Vercel</h3>
              <p>Unsere Website wird von der Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet und über ein Rechenzentrum in Frankfurt am Main ausgeliefert. Beim Besuch werden Ihre IP-Adresse und technische Request-Daten temporär in sogenannten Server-Logfiles gespeichert. Dies geschieht zur Fehleranalyse und Abwehr von Cyber-Angriffen. Vercel ist nach dem EU-US Data Privacy Framework zertifiziert; zusätzlich gelten die EU-Standardvertragsklauseln.</p>
              <p className="mt-2">Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Hosting-Provider haben wir einen Vertrag zur Auftragsverarbeitung (AVV) geschlossen.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Cloudinary (Bild & Video Hosting)</h3>
              <p>Um Bilder und Video-Dateien hochperformant und ressourcenschonend auszuliefern, nutzen wir das Content-Delivery-Network (CDN) Cloudinary. Dabei kann Ihre IP-Adresse an Server von Cloudinary übertragen werden. Cloudinary verwendet Mechanismen (wie die EU-Standardvertragsklauseln), um die Sicherheit der Daten gemäß der geltenden Datenschutzstandards sicherzustellen.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Schriftarten (lokal)</h3>
              <p>Die Schriftarten Inter und Montserrat liegen auf unserem eigenen Server und werden von dort geladen. Beim Aufruf unserer Website besteht dafür keine Verbindung zu Google oder anderen Schrift-Anbietern.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Bilder von Unsplash</h3>
              <p>Auf einigen Unterseiten zeigen wir Bilder des Bilddienstes Unsplash (Unsplash Inc., Montreal, Kanada), die direkt von dessen Servern geladen werden. Dabei wird Ihre IP-Adresse an Unsplash übertragen. Rechtsgrundlage ist unser berechtigtes Interesse an einer ansprechenden Darstellung (Art. 6 Abs. 1 lit. f DSGVO). Für Kanada besteht ein Angemessenheitsbeschluss der EU-Kommission. Wir ersetzen diese Bilder schrittweise durch eigene Aufnahmen auf unserem Server.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Firebase (Google Cloud)</h3>
              <p>Für Blog-Inhalte, den Preisrechner und den Kundenbereich nutzen wir die Datenbank Firebase/Firestore der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Beim Laden dieser Inhalte wird Ihre IP-Adresse an Google übertragen; Eingaben im Preisrechner oder Kundenbereich werden dort gespeichert. Rechtsgrundlage ist unser berechtigtes Interesse an einer funktionierenden Website (Art. 6 Abs. 1 lit. f DSGVO) bzw. bei Anfragen die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Eine Übermittlung in die USA ist möglich; Google ist nach dem EU-US Data Privacy Framework zertifiziert.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2a. Eingebettete Inhalte (erst nach Klick)</h2>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Vimeo (Videos)</h3>
              <p>Unsere Videos werden über Vimeo (Vimeo.com, Inc., New York, USA) bereitgestellt. Der Vimeo-Player lädt erst, wenn Sie auf „Abspielen“ klicken. Erst dann werden Daten wie Ihre IP-Adresse an Vimeo übertragen. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Vimeo ist nach dem EU-US Data Privacy Framework zertifiziert.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">YouTube</h3>
              <p>In einzelnen Blogartikeln und Landingpages können Videos von YouTube (Google Ireland Limited) eingebunden sein. Wie bei Vimeo lädt der Player erst nach Ihrem Klick; erst dann werden Daten wie Ihre IP-Adresse an Google übertragen, auch in die USA (EU-US Data Privacy Framework). Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Google Maps</h3>
              <p>Auf der Kontaktseite können Sie eine Karte von Google Maps (Google Ireland Limited) laden. Die Karte wird erst angezeigt, wenn Sie auf „Karte laden“ klicken. Erst dann werden Daten wie Ihre IP-Adresse an Google übertragen, auch in die USA. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Alternativ können Sie den Link „In Google Maps öffnen“ nutzen.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">WhatsApp</h3>
              <p>Wir bieten Links zu WhatsApp (WhatsApp Ireland Limited) an. Beim bloßen Besuch unserer Website werden keine Daten an WhatsApp übertragen. Erst wenn Sie auf einen WhatsApp-Link klicken, öffnet sich WhatsApp und es gelten dessen Datenschutzbestimmungen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Kontaktaufnahme via Web3Forms</h2>
              <p>Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben über den Dienst <strong>Web3Forms</strong>. Anfragen über den Preisrechner speichern wir in unserer Datenbank (Firebase, siehe oben) und erhalten sie per E-Mail-Benachrichtigung.</p>
              <p className="mt-4">Verarbeitet werden die Angaben aus dem Formular: Name, Unternehmen (falls angegeben), E-Mail-Adresse, Telefonnummer (falls angegeben), Art des Projekts und Ihre Nachricht.</p>
              <p className="mt-4">Web3Forms sendet diese Daten verschlüsselt an unsere E-Mail-Postfächer. Die Daten dienen allein der Angebotserstellung und Kundenbetreuung. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen nach Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO).</p>
              <p className="mt-4">Mit Web3Forms existiert eine Vereinbarung zur Auftragsverarbeitung (AVV).</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Analysetools und Werbung</h2>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Zustimmungsmanagement / Cookie Consent</h3>
              <p>Wir setzen einen Cookie-Banner ein, um Ihre Einwilligung einzuholen. Ihre Wahl speichern wir im lokalen Speicher Ihres Browsers (Eintrag „cookie-consent“). Erst wenn Sie auf „Alle akzeptieren“ klicken, laden wir Google Analytics; vorher besteht keine Verbindung zu Google Analytics. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen: über den Link „Cookie-Einstellungen“ unten auf jeder Seite.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Google Analytics 4</h3>
              <p>Sofern Sie im Cookie-Banner zustimmen, nutzen wir Google Analytics der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Das Tool misst in pseudonymer Form, wie unsere Website genutzt wird (z. B. aufgerufene Seiten, Verweildauer, Klicks), und setzt dafür Cookies. Eine Übermittlung in die USA ist möglich; Google ist nach dem EU-US Data Privacy Framework zertifiziert. Rechtsgrundlage ist Ihre Einwilligung (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO).</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Werbe-Pixel (Meta, TikTok)</h3>
              <p>Werbe-Pixel von Meta (Facebook, Instagram) oder TikTok sind auf dieser Website derzeit nicht im Einsatz. Sollten wir sie künftig nutzen, geschieht das nur mit Ihrer Einwilligung im Cookie-Banner; diese Erklärung wird dann vorher ergänzt.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Verträge mit Kunden (Shootings & Bearbeitung)</h2>
              <p>Wenn Sie mit uns als Videoagentur (Rezai Vision oder reza-e-motion) zusammenarbeiten, erfassen und speichern wir Ihre Unternehmensdaten bzw. Rechnungsdaten (Name, Adresse, ggf. USt-IdNr.) sowie den Kommunikationsverlauf zwecks Auftragsdurchführung.</p>
              <p className="mt-4"><strong>Videomaterial:</strong> Sobald wir bei Ihnen vor Ort drehen, fertigen wir Bild- und Videomaterial an. Bei Veranstaltungen, Recruiting-Drehs oder Hochzeiten greift hier das berechtigte Interesse bzw. der mit Ihnen geschlossene Vertrag (Art. 6 Abs. 1 lit. b und f DSGVO). Bei großen Events (Eventbegleitung) ist es Aufgabe des Veranstalters, Teilnehmer über Filmaufnahmen zu informieren. Soweit es sich um Protagonisten handelt, arbeiten wir oft mit separaten Model-Releases oder vertraglichen Zustimmungen.</p>
              <p className="mt-4">Ihre Rechnungsdaten speichern wir zudem zur Erfüllung fiskalischer Vorgaben aus dem Handels- und Steuerrecht (10 Jahre).</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Auskunft (Art. 15 DSGVO):</strong> Was speichern wir?</li>
                <li><strong>Berichtigung (Art. 16 DSGVO):</strong> Wenn Daten falsch sind.</li>
                <li><strong>Löschung (Art. 17 DSGVO "Recht auf Vergessenwerden"):</strong> Wenn wir die Daten nicht mehr zwingend für die Abwicklung brauchen.</li>
                <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO)</strong></li>
                <li><strong>Datenübertragbarkeit (Art. 20 DSGVO)</strong></li>
                <li><strong>Widerruf von Einwilligungen (Art. 7 Abs. 3 DSGVO)</strong></li>
              </ul>
              <p className="mt-4">Beschwerderecht bei der Aufsichtsbehörde: Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei der zuständigen Behörde (Der Landesbeauftragte für den Datenschutz in Rheinland-Pfalz) zu.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
