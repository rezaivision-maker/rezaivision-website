import { motion } from "motion/react";
import { SEO } from "@/components/SEO";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-bg">
      <SEO title="Datenschutzerklärung | Rezai Vision & reza-e-motion" />
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Datenschutzerklärung</h1>
          <p className="text-gray-400 mb-12">Zuletzt aktualisiert: 2026</p>

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
              
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Vercel / Netlify / Externe Hoster</h3>
              <p>Wir hosten unsere Website typischerweise über moderne Cloud-Strukturen, um schnelle Ladezeiten in Deutschland zu gewährleisten. Beim Besuch werden Ihre IP-Adresse und technische Request-Daten temporär in sogenannten Server-Logfiles gespeichert. Dies geschieht zur Fehleranalyse und Abwehr von Cyber-Angriffen.</p>
              <p className="mt-2">Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Hosting-Provider haben wir einen Vertrag zur Auftragsverarbeitung (AVV) geschlossen.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Cloudinary (Bild & Video Hosting)</h3>
              <p>Um Bilder und Video-Dateien hochperformant und ressourcenschonend auszuliefern, nutzen wir das Content-Delivery-Network (CDN) Cloudinary. Dabei kann Ihre IP-Adresse an Server von Cloudinary übertragen werden. Cloudinary verwendet Mechanismen (wie die EU-Standardvertragsklauseln), um die Sicherheit der Daten gemäß der geltenden Datenschutzstandards sicherzustellen.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Fontshare / Inter (Lokale Fonts)</h3>
              <p>Wir binden Google Fonts oder externe Schriftarten aus Datenschutzgründen prinzipiell lokal in unser System ein oder hosten diese so, dass Ihre IP-Adresse nicht unnötigerweise an Drittanbieter übertragen wird, wenn Sie unsere Webseite aufrufen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Kontaktaufnahme via Web3Forms</h2>
              <p>Wenn Sie uns über unsere Formulare, sei es im Bereich B2B (Unternehmensevents) oder B2C (Hochzeiten/Privat), kontaktieren, verarbeiten wir Ihre Angaben über den Dienst <strong>Web3Forms</strong>.</p>
              <p className="mt-4">Gespeichert werden: Vor- und Nachname, E-Mail-Adresse, Telefonnummer (falls angegeben) sowie Ihre Nachricht (Datum/Ort des Events).</p>
              <p className="mt-4">Web3Forms sendet diese Daten verschlüsselt an unsere E-Mail-Postfächer. Die Daten dienen allein der Angebotserstellung und Kundenbetreuung. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen nach Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO).</p>
              <p className="mt-4">Mit Web3Forms existiert eine Vereinbarung zur Auftragsverarbeitung (AVV).</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Analysetools und Werbung</h2>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Zustimmungsmanagement / Cookie Consent</h3>
              <p>Wir setzen zur Einholung und Dokumentation von Einwilligungen einen Cookie-Banner ein. Erst wenn Sie explizit auf "Alle akzeptieren" klicken, laden wir Marketing-Skripte oder Tracking-Technologien. Dies erfolgt nach Art. 6 Abs. 1 lit. a DSGVO. Sie können diese Einwilligung jederzeit widerrufen, indem Sie den LocalStorage Ihres Browsers löschen oder das Banner erneut aufrufen.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Google Analytics 4 & Google Ads</h3>
              <p>Sofern Sie im Cookie-Banner zustimmen, nutzen wir Google Analytics (Google Ireland Limited). Das Tool misst Klicks, Aufenthaltszeiten, Konversionen und demografische Variablen in pseudonymer Form (Nutzung der IP-Anonymisierung). Die Datenspeicherung und Analyseverfahren stützen sich explizit auf Ihre Einwilligung (§ 25 Abs. 1 TDDDG sowie Art. 6 Abs. 1 lit. a DSGVO).</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Meta Pixel (Facebook & Instagram)</h3>
              <p>Bei expliziter Zustimmung nutzen wir das "Meta Pixel" der Meta Platforms Ireland Ltd. Dies ermöglicht es uns, Besuchern unserer Webseite passgenaue Werbung (Video Ads) auf Instagram und Facebook anzuzeigen und den Erfolg von Kampagnen zu messen. Auch hier gilt die aktive Zustimmung im Rahmen des Banners.</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">TikTok Pixel (ByteDance)</h3>
              <p>Aufgrund unserer Social Advertising Services können wir das TikTok Pixel (TikTok Technology Limited) implementieren, um Konversionen unserer eigenen Recruiting- & Ads-Kampagnen zu messen. Es überträgt Daten an TikTok, um Zielgruppen (Lookalike Audiences) zu erstellen. Eine Datenübertragung in Drittstaaten (wie die USA oder asiatische Server von ByteDance) geschieht im gesetzlich geregelten Rahmen, sofern eine informierte Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) vorliegt.</p>
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
