export const glossaryCategories = [
  { id: 'kamera-technik', title: 'Kamera & Technik', description: 'Technische Grundlagen der Kamera, Sensoren und Formate.', icon: 'Camera' },
  { id: 'objektive-optik', title: 'Objektive & Optik', description: 'Linsen, Brennweiten und optische Hilfsmittel.', icon: 'Aperture' },
  { id: 'bildgestaltung', title: 'Bildgestaltung & Komposition', description: 'Regeln und Techniken für den perfekten Bildaufbau.', icon: 'Image' },
  { id: 'licht-beleuchtung', title: 'Licht & Beleuchtung', description: 'Lichtsetzung, Lampen und Atmosphäre.', icon: 'Lightbulb' },
  { id: 'aufnahme-einstellungen', title: 'Aufnahme & Einstellungen', description: 'Belichtung, ISO, Shutter und Profile.', icon: 'Settings2' },
  { id: 'kamerabewegung', title: 'Bewegung & Kameraführung', description: 'Gimbals, Kräne und dynamische Fahrten.', icon: 'Video' },
  { id: 'postproduktion', title: 'Postproduktion & Schnitt', description: 'Videoschnitt, Color Grading und Effekte.', icon: 'MonitorPlay' },
  { id: 'produktion-planung', title: 'Produktion & Planung', description: 'Pre-Production, Set-Organisation und Ablauf.', icon: 'Clapperboard' },
  { id: 'audio-ton', title: 'Audio & Ton', description: 'Mikrofone, Sound Design und Abmischung.', icon: 'Mic' },
  { id: 'filmtheorie', title: 'Filmtheorie & Ästhetik', description: 'Dramaturgie, Genres und filmische Erzählweisen.', icon: 'BookOpen' }
];

export const glossaryTerms = [
  // --- Kamera & Technik ---
  {
    id: 'sensor-groesse',
    categoryId: 'kamera-technik',
    title: 'Sensorgröße',
    subheadline: 'Die physische Abmessung des lichtempfindlichen Bildsensors in einer Kamera.',
    definition: 'Der Sensor ist das digitale Äquivalent zum analogen Filmstreifen. Seine physische Größe – gängige Formate sind Vollformat (Full Frame), Super 35 (APS-C) oder Micro Four Thirds – hat massive Auswirkungen auf die Bildästhetik. Ein größerer Sensor bietet eine größere Fläche, um Licht einzufangen. Dies führt zu einem besseren Signal-Rausch-Verhältnis (weniger Bildrauschen bei wenig Licht) und einem höheren Dynamikumfang. Zudem beeinflusst die Sensorgröße den Bildwinkel (Crop-Faktor) und die Schärfentiefe: Bei gleicher Blende und gleichem Bildausschnitt erzeugt ein Vollformatsensor eine deutlich geringere Schärfentiefe als ein kleinerer Sensor, was den Hintergrund stärker verschwimmen lässt.',
    importantInfo: 'Ein häufiger Irrglaube ist, dass nur Vollformatsensoren professionelle Ergebnisse liefern. Tatsächlich ist Super 35 seit Jahrzehnten der absolute Standard in der Kinofilmproduktion. Die Wahl der Sensorgröße sollte immer vom Projekt abhängen: Für Dokumentarfilme, bei denen eine hohe Schärfentiefe von Vorteil ist, eignen sich kleinere Sensoren oft besser als Vollformat.',
    localContext: 'Besonders bei Drehs in lichtkritischen Umgebungen, wie historischen Industriehallen im Saarland oder schummerigen Event-Locations in Mannheim, nutzen wir große Sensoren, um das Bildrauschen minimal zu halten.'
  },
  {
    id: 'framerate',
    categoryId: 'kamera-technik',
    title: 'Framerate (Bildrate)',
    subheadline: 'Die Anzahl der aufgezeichneten oder wiedergegebenen Einzelbilder pro Sekunde.',
    definition: 'Die Framerate, gemessen in Frames per Second (fps), gibt an, aus wie vielen Einzelbildern eine Sekunde Video besteht. Sie hat einen entscheidenden Einfluss auf die visuelle Wahrnehmung und Ästhetik eines Films. Der klassische Kinostandard liegt bei 24 fps, was vom menschlichen Auge als organisch und leicht verträumt wahrgenommen wird. Im europäischen Fernsehen (PAL-Standard) sind 25 fps üblich. Höhere Bildraten wie 50, 60 oder 120 fps werden primär genutzt, um schnelle Bewegungen extrem flüssig darzustellen oder um das Material in der Postproduktion als ruckelfreie Zeitlupe (Slow Motion) abzuspielen.',
    importantInfo: 'Ein typischer Anfängerfehler ist es, ein gesamtes Projekt in 60 fps zu filmen und auch in 60 fps auszuspielen. Dies führt zu einem unnatürlichen, hyperrealistischen "Seifenopern-Effekt" (Soap Opera Effect), der die filmische Illusion zerstört. Die Framerate sollte immer vor Drehbeginn passend zum gewünschten Endformat festgelegt werden.',
  },

  // --- Objektive & Optik ---
  {
    id: 'nd-filter',
    categoryId: 'objektive-optik',
    title: 'ND-Filter (Neutraldichtefilter)',
    subheadline: 'Ein optischer Filter zur Reduzierung der einfallenden Lichtmenge.',
    definition: 'Ein Neutraldichtefilter (ND-Filter) funktioniert wie eine Sonnenbrille für das Kameraobjektiv. Er reduziert die Menge an Licht, die auf den Kamerasensor trifft, ohne dabei die Farben oder den Kontrast des Bildes zu verändern. Dies ist besonders in hellen Umgebungen entscheidend, um die filmischen Belichtungsregeln einzuhalten. Um eine natürliche Bewegungsunschärfe (Motion Blur) zu erzielen, muss die Verschlusszeit (Shutter Speed) idealerweise das Doppelte der Bildrate betragen (z. B. 1/50 Sekunde bei 25 fps). An einem sonnigen Tag würde diese relativ lange Belichtungszeit zu einem stark überbelichteten Bild führen. Der ND-Filter ermöglicht es, trotz hellem Umgebungslicht mit einer offenen Blende und der korrekten Verschlusszeit zu filmen.',
    importantInfo: 'Variable ND-Filter sind in der Dokumentar- und Eventvideografie sehr beliebt, da sie stufenlos anpassbar sind. Ein typischer Fehler bei günstigen variablen ND-Filtern ist das Auftreten eines dunklen Kreuzmusters (X-Pattern) im Bild oder eine ungewollte Farbverschiebung (Color Shift) ins Grünliche oder Magentafarbene.',
    localContext: 'Bei Außenaufnahmen an hellen Sommertagen, beispielsweise bei Architektur- oder Landschaftsdrehs im Pfälzerwald rund um Kaiserslautern, ist ein ND-Filter technischer Standard, um den filmischen Look trotz intensiver Sonneneinstrahlung beizubehalten.'
  },
  {
    id: 'bokeh',
    categoryId: 'objektive-optik',
    title: 'Bokeh',
    subheadline: 'Die ästhetische Qualität der Unschärfe in den nicht fokussierten Bildbereichen.',
    definition: 'Der Begriff Bokeh stammt aus dem Japanischen ("boke" für unscharf oder verschwommen) und beschreibt in der Fotografie und Filmkunst den Charakter der Hintergrund- oder Vordergrundunschärfe. Es geht dabei nicht um die Stärke der Unschärfe selbst (die durch die Schärfentiefe definiert wird), sondern darum, wie das Objektiv die unscharfen Lichtpunkte und Konturen rendert. Ein "cremiges" Bokeh zeichnet sich durch weiche, fließende Übergänge und kreisrunde Lichtkreise ohne harte Kanten aus. Es hilft enorm dabei, das Hauptmotiv visuell vom unruhigen Hintergrund zu isolieren und die Aufmerksamkeit des Betrachters gezielt zu lenken.',
    importantInfo: 'Das Bokeh wird maßgeblich durch die Konstruktion der Objektivblende beeinflusst. Objektive mit vielen abgerundeten Blendenlamellen erzeugen meist ein runderes und weicheres Bokeh als solche mit wenigen, geraden Lamellen. Zudem erzeugen anamorphotische Objektive ein charakteristisches, ovales Bokeh, das oft mit großen Hollywood-Produktionen assoziiert wird.',
    localContext: 'Für hochwertige Portraits im urbanen Raum nutzen wir das Bokeh gezielt, um Personen beispielsweise vor der Frankfurter Skyline oder der Industriearchitektur in Mannheim ästhetisch freizustellen.'
  },

  // --- Licht & Beleuchtung ---
  {
    id: 'three-point-lighting',
    categoryId: 'licht-beleuchtung',
    title: 'Three-Point Lighting',
    subheadline: 'Das klassische Beleuchtungs-Setup aus drei Lichtquellen.',
    definition: 'Das Drei-Punkt-Licht (Three-Point Lighting) ist die absolute Grundlage der professionellen Filmbeleuchtung. Es besteht aus drei Lichtquellen: Dem Key Light (Hauptlicht), das die primäre Ausleuchtung und Stimmung vorgibt; dem Fill Light (Fülllicht), das die harten Schatten des Key Lights aufhellt; und dem Back Light (Gegenlicht oder Haarlicht), das die Person vom Hintergrund abhebt und für räumliche Tiefe sorgt. Durch die gezielte Balance dieser drei Lichtquellen entsteht eine ausgewogene, dreidimensionale Ausleuchtung, die das Motiv plastisch und natürlich wirken lässt.',
    importantInfo: 'Ein häufiger Fehler bei der Lichtsetzung ist es, das Fill Light zu stark einzustellen. Dadurch verliert das Gesicht an Kontrast und wirkt flach (sogenanntes "Flat Lighting"). Das Back Light ist oft das Geheimnis für den "Cinematic Look", da es eine klare visuelle Trennung zwischen Motiv und Hintergrund schafft.',
    localContext: 'Dieses Setup ist unser Standard für professionelle Vorstands-Interviews in den Bürotürmen von Frankfurt oder den modernen Co-Working Spaces in Mannheim und Kaiserslautern.'
  },

  // --- Kamerabewegung ---
  {
    id: 'gimbal',
    categoryId: 'kamerabewegung',
    title: 'Gimbal',
    subheadline: 'Ein elektronisches Stabilisierungssystem für fließende Kamerabewegungen.',
    definition: 'Ein Gimbal ist ein motorisiertes Aufhängungssystem, das unerwünschte Kamerabewegungen und Erschütterungen in Echtzeit ausgleicht. Es nutzt bürstenlose Motoren und gyroskopische Sensoren auf drei Achsen (Pan, Tilt und Roll), um die Kamera in einer waagerechten und stabilen Position zu halten, selbst wenn sich der Kameramann schnell bewegt. Im Gegensatz zur traditionellen Steadicam, die rein mechanisch mit Gegengewichten arbeitet, ist ein Gimbal elektronisch gesteuert, oft kompakter und leichter zu erlernen. Gimbals ermöglichen dynamische Kamerafahrten, das Verfolgen von Protagonisten (Tracking Shots) und komplexe Bewegungen auf engem Raum.',
    importantInfo: 'Die korrekte physische Ausbalancierung der Kamera auf dem Gimbal vor dem Einschalten ist essenziell. Ein schlecht ausbalanciertes Setup zwingt die Motoren zu ständiger Höchstleistung, was zu Mikrorucklern (Jitter) im Bildmaterial und einer extrem schnellen Entladung der Akkus führt.',
    localContext: 'Bei dynamischen Eventbegleitungen oder Firmenrundgängen, etwa in weitläufigen Produktionshallen in Pirmasens oder bei Messeauftritten in Mainz, ermöglicht der Gimbal ruhige und professionelle Kamerafahrten aus der Hand, ohne den laufenden Betrieb durch aufwendige Schienensysteme zu stören.'
  },

  // --- Postproduktion ---
  {
    id: 'color-grading',
    categoryId: 'postproduktion',
    title: 'Color Grading',
    subheadline: 'Die kreative und stilistische Farbbearbeitung von Videomaterial.',
    definition: 'Color Grading ist der finale Schritt der Bildbearbeitung in der Postproduktion, bei dem das Videomaterial seinen spezifischen, atmosphärischen Look erhält. Während die vorangehende Farbkorrektur (Color Correction) lediglich technische Fehler ausgleicht und für einen neutralen Weißabgleich sowie konsistente Kontraste zwischen verschiedenen Einstellungen sorgt, ist das Grading ein rein kreativer Prozess. Hierbei werden Farben gezielt manipuliert, um Emotionen zu wecken, die Tageszeit zu unterstreichen oder die visuelle Identität einer Marke widerzuspiegeln. Bekannte Grading-Stile sind beispielsweise der kontrastreiche "Teal and Orange"-Look aus Hollywood-Blockbustern oder entsättigte, kühle Töne für Thriller.',
    importantInfo: 'Um beim Color Grading maximale Flexibilität ohne Qualitätsverlust zu haben, muss das Rohmaterial idealerweise in einem logarithmischen Farbprofil (Log) oder als RAW-Format aufgenommen werden. Stark komprimiertes 8-Bit-Material neigt beim Grading schnell zu Farbabrissen (Banding) und starkem Bildrauschen in den Schatten.',
    localContext: 'Durch gezieltes Grading verleihen wir beispielsweise Industriefilmen im Saarland einen kühleren, technischeren Look oder Hochzeitsfilmen in der Pfalz eine warme, zeitlose Vintage-Ästhetik.'
  },
  {
    id: 'jump-cut',
    categoryId: 'postproduktion',
    title: 'Jump Cut',
    subheadline: 'Ein absichtlicher, sprunghafter Zeitsprung im Schnitt.',
    definition: 'Der Jump Cut ist eine Schnitttechnik, bei der bewusst ein Teil einer kontinuierlichen Handlung herausgeschnitten wird, ohne die Kameraperspektive signifikant zu verändern. Dadurch entsteht ein abrupter, sichtbarer Sprung im Bild. Früher galt dies in der klassischen Hollywood-Montage als handwerklicher Fehler, da es die Illusion der kontinuierlichen Zeit bricht. Heute ist es ein extrem beliebtes Stilmittel, um Zeit zu raffen, Dynamik zu erzeugen oder den unruhigen Charakter eines Videos zu betonen.',
    importantInfo: 'Jump Cuts werden exzessiv auf Plattformen wie YouTube oder TikTok eingesetzt, um Pausen und Versprecher zu entfernen und das Tempo hoch zu halten. Im klassischen, ruhigen Unternehmensfilm oder bei emotionalen Interviews sollten sie jedoch sparsam oder gar nicht eingesetzt werden, da sie den Zuschauer aus der Ruhe reißen können. Hier greift man besser zu B-Roll, um Schnitte zu kaschieren.',
  },

  // --- Produktion & Planung ---
  {
    id: 'storyboard',
    categoryId: 'produktion-planung',
    title: 'Storyboard',
    subheadline: 'Die visuelle Skizzierung des Drehbuchs vor Produktionsbeginn.',
    definition: 'Ein Storyboard ist eine chronologische Serie von Illustrationen oder Bildern, die den geplanten Ablauf eines Films Szene für Szene visualisieren. Es funktioniert ähnlich wie ein Comic-Heft und dient dazu, die schriftlichen Anweisungen eines Drehbuchs in eine konkrete Bildsprache zu übersetzen. Im Storyboard werden wichtige Parameter wie Bildausschnitt (z. B. Totale oder Close-Up), Kameraperspektive, Bewegungen von Schauspielern und der Kamera sowie Lichtstimmungen festgehalten. Es ist das zentrale Planungsinstrument in der Pre-Production und stellt sicher, dass Regie, Kamera-Department und Kunden eine einheitliche Vision des Endprodukts teilen.',
    importantInfo: 'Ein detailliertes Storyboard spart am Drehtag massiv Zeit, da Diskussionen über Kameraeinstellungen bereits im Vorfeld geklärt wurden. Ein häufiger Fehler ist es jedoch, das Storyboard am Set zu starr zu befolgen und dadurch spontane, kreative Momente oder bessere Perspektiven vor Ort zu ignorieren.',
  },

  // --- Audio & Ton ---
  {
    id: 'lavalier-mikrofon',
    categoryId: 'audio-ton',
    title: 'Lavalier-Mikrofon',
    subheadline: 'Ein kompaktes Ansteckmikrofon zur körpernahen Sprachaufzeichnung.',
    definition: 'Ein Lavalier-Mikrofon (oft kurz "Lav-Mic" genannt) ist ein extrem kleines Kondensatormikrofon, das direkt an der Kleidung einer sprechenden Person befestigt wird. Durch die geringe Distanz zur Schallquelle (dem Mund) liefert es eine sehr präsente und klare Sprachaufnahme, während störende Raumakustik (Hall) und Umgebungsgeräusche minimiert werden. Lavalier-Mikrofone werden meist in Kombination mit drahtlosen Funksendern eingesetzt, was dem Sprecher maximale Bewegungsfreiheit vor der Kamera ermöglicht. Sie sind der absolute Standard für TV-Produktionen, Dokumentarfilme, Interviews und Vlogs.',
    importantInfo: 'Die größte Herausforderung beim Einsatz von Lavalier-Mikrofonen ist das Vermeiden von Raschelgeräuschen, die durch die Reibung an der Kleidung entstehen. In der professionellen Filmproduktion werden Lavaliers oft unsichtbar unter der Kleidung mit speziellem Tape (z. B. Rycote Undercover) verklebt und mit kleinen Abstandshaltern versehen.',
    localContext: 'Bei Interview-Drehs in halligen Umgebungen, wie etwa modernen Bürogebäuden mit viel Glas und Beton in Wiesbaden oder Saarbrücken, ist ein Lavalier-Mikrofon oft die einzige Möglichkeit, um eine professionelle und verständliche Sprachqualität ohne störenden Raumhall zu gewährleisten.'
  },

  // --- Bildgestaltung ---
  {
    id: 'establishing-shot',
    categoryId: 'bildgestaltung',
    title: 'Establishing Shot',
    subheadline: 'Eine weite Kameraeinstellung zur räumlichen und zeitlichen Orientierung.',
    definition: 'Der Establishing Shot (Einführungseinstellung) ist in der Regel die erste Einstellung einer neuen Szene. Er wird meist als extreme Totale (Wide Shot) gefilmt und dient dazu, dem Zuschauer den geografischen Ort, die Tageszeit und die grundlegende Atmosphäre der folgenden Handlung zu vermitteln. Durch diese visuelle Verortung weiß das Publikum sofort, wo sich die Charaktere befinden, bevor die Kamera in nähere Einstellungen (wie Halbtotale oder Close-Ups) wechselt. Neben der reinen Informationsvermittlung kann ein Establishing Shot auch metaphorisch genutzt werden, um die Isolation einer Figur in einer großen Landschaft oder die Hektik einer Metropole zu etablieren.',
    importantInfo: 'Ein häufiger Fehler in der Montage ist das Weglassen von Establishing Shots bei schnellen Ortswechseln, was beim Zuschauer zu räumlicher Desorientierung führen kann. In der modernen Videoproduktion werden für diese Einstellungen sehr häufig Drohnen eingesetzt, da sie spektakuläre Übersichtsbilder aus der Vogelperspektive ermöglichen.',
    localContext: 'Bei der Produktion von Industriefilmen oder Unternehmensportraits, beispielsweise für weitläufige Produktionsstätten in Landstuhl oder Kusel, wird der Establishing Shot oft genutzt, um die Größe und Relevanz des Werksgeländes eindrucksvoll im Kontext der umgebenden Landschaft darzustellen.'
  },
  {
    id: 'vollformat',
    categoryId: 'kamera-technik',
    title: 'Vollformat (Full Frame)',
    subheadline: 'Ein Kamerasensor, dessen Größe dem analogen 35mm-Kleinbildfilm entspricht.',
    definition: 'Der Vollformatsensor misst ca. 36 x 24 mm und gilt in der Fotografie und vielen Bereichen der Videoproduktion als Goldstandard. Durch die große Fläche kann er besonders viel Licht einfangen, was zu einem hervorragenden Rauschverhalten bei schlechten Lichtverhältnissen (Low-Light) führt. Zudem bietet Vollformat im Vergleich zu kleineren Sensoren (wie APS-C oder Micro Four Thirds) bei gleicher Brennweite und Blende eine deutlich geringere Schärfentiefe. Das erleichtert es, Motive durch einen unscharfen Hintergrund (Bokeh) freizustellen.',
    importantInfo: 'Ein häufiger Fehler ist die Annahme, Vollformat sei für jeden Dreh zwingend erforderlich. Für Dokumentarfilme oder Eventbegleitungen, bei denen man schnell fokussieren muss und eine größere Schärfentiefe von Vorteil ist, können kleinere Sensoren praktischer sein. Zudem sind Vollformat-Objektive meist größer, schwerer und teurer.',
    localContext: 'Bei abendlichen Event-Drehs in schwach beleuchteten Locations, etwa in historischen Gewölbekellern in der Pfalz, spielt der Vollformatsensor seine Stärken voll aus und liefert rauscharme, hochwertige Bilder.'
  },
  {
    id: 'rolling-shutter',
    categoryId: 'kamera-technik',
    title: 'Rolling Shutter',
    subheadline: 'Ein Ausleseverfahren digitaler Bildsensoren, das zu Verzerrungen bei schnellen Bewegungen führen kann.',
    definition: 'Beim Rolling Shutter wird der Kamerasensor nicht auf einmal, sondern zeilenweise (meist von oben nach unten) ausgelesen. Wenn sich die Kamera oder das Motiv während dieses Ausleseprozesses sehr schnell bewegt, kommt es zu einem zeitlichen Versatz zwischen den oberen und unteren Bildzeilen. Dies führt zum sogenannten "Jello-Effekt": Gerade Linien wirken plötzlich schräg, sich schnell drehende Objekte (wie Propeller) erscheinen extrem verbogen, und das gesamte Bild kann bei Erschütterungen wackelig oder "wabbelig" wirken.',
    importantInfo: 'Fast alle modernen spiegellosen Kameras und DSLRs nutzen einen Rolling Shutter, da er günstiger zu produzieren ist und weniger Strom verbraucht als ein Global Shutter (der alle Pixel gleichzeitig ausliest). Um den Effekt zu minimieren, sollten extrem schnelle Kameraschwenks (Whip Pans) vermieden werden.'
  },
  {
    id: 'raw-video',
    categoryId: 'kamera-technik',
    title: 'RAW Video',
    subheadline: 'Ein unkomprimiertes oder verlustfrei komprimiertes Videoformat, das die rohen Sensordaten speichert.',
    definition: 'RAW-Video ist das digitale Negativ eines Films. Im Gegensatz zu komprimierten Formaten wie H.264 oder ProRes, bei denen die Kamera bereits Entscheidungen über Weißabgleich, Kontrast und Farbsättigung trifft und diese in die Datei "einbackt", speichert RAW die reinen, unverarbeiteten Lichtinformationen des Sensors. Dies bietet in der Postproduktion maximale Flexibilität: Parameter wie Weißabgleich und ISO können nachträglich verlustfrei geändert werden. RAW liefert die höchste Bildqualität und den größten Dynamikumfang.',
    importantInfo: 'Der Umgang mit RAW-Daten erfordert enorme Speicherkapazitäten und sehr leistungsstarke Computer für den Schnitt. Für schnelle Social-Media-Produktionen ist RAW meist überdimensioniert, für anspruchsvolle Werbespots oder Kinofilme jedoch unerlässlich.',
    localContext: 'Für unsere Agentur-Partner in Frankfurt und Wiesbaden produzieren wir auf Wunsch komplett in RAW, um in der Postproduktion keine Kompromisse bei der Bildqualität eingehen zu müssen.'
  },
  {
    id: 'brennweite',
    categoryId: 'objektive-optik',
    title: 'Brennweite',
    subheadline: 'Das Maß für den Bildwinkel und die Vergrößerung eines Objektivs.',
    definition: 'Die Brennweite wird in Millimetern (mm) angegeben und beschreibt physikalisch den Abstand zwischen der optischen Mitte der Linse und dem Kamerasensor, wenn das Objektiv auf unendlich fokussiert ist. In der Praxis bestimmt sie, wie viel von einer Szene auf das Bild passt (Bildwinkel) und wie groß die Motive abgebildet werden. Eine kurze Brennweite (z. B. 16 mm oder 24 mm) erzeugt einen weiten Bildwinkel (Weitwinkel), ideal für Landschaften oder enge Räume. Eine lange Brennweite (z. B. 85 mm oder 200 mm) wirkt wie ein Fernglas (Teleobjektiv), holt weit entfernte Motive heran und verdichtet die räumliche Perspektive.',
    importantInfo: 'Die Wahl der Brennweite beeinflusst die psychologische Wirkung eines Bildes enorm. Weitwinkelobjektive nah am Gesicht wirken oft unnatürlich oder komisch (Verzerrung der Proportionen), während leichte Teleobjektive (50 mm bis 85 mm) als besonders schmeichelhaft für Portraits und Interviews gelten.'
  },
  {
    id: 'prime-objektiv',
    categoryId: 'objektive-optik',
    title: 'Prime Objektiv (Festbrennweite)',
    subheadline: 'Ein Objektiv mit einer festen, nicht veränderbaren Brennweite.',
    definition: 'Im Gegensatz zu Zoom-Objektiven, die einen variablen Brennweitenbereich abdecken, hat ein Prime Objektiv (Festbrennweite) nur einen einzigen Bildwinkel (z. B. exakt 35 mm oder 50 mm). Da die optische Konstruktion auf diese eine Brennweite optimiert ist, bieten Prime Objektive meist eine deutlich höhere Bildschärfe, weniger optische Fehler (wie chromatische Aberrationen) und eine wesentlich größere maximale Blendenöffnung (z. B. f/1.4 oder f/1.8). Dies ermöglicht das Filmen bei sehr wenig Licht und erzeugt eine extrem geringe Schärfentiefe für ein weiches Bokeh.',
    importantInfo: 'Der Nachteil von Festbrennweiten ist die geringere Flexibilität. Der Kameramann muss sich physisch bewegen ("Zoomen mit den Füßen"), um den Bildausschnitt zu verändern. In der professionellen Filmproduktion sind Prime-Sets (mehrere Festbrennweiten) jedoch der absolute Standard für höchste Bildqualität.',
    localContext: 'Für hochwertige CEO-Interviews oder emotionale Recruiting-Videos in Rheinland-Pfalz setzen wir fast ausschließlich auf Prime Objektive, um die Personen durch einen unscharfen Hintergrund perfekt vom oft unruhigen Arbeitsumfeld zu isolieren.'
  },
  {
    id: 'drittelregel',
    categoryId: 'bildgestaltung',
    title: 'Drittelregel (Rule of Thirds)',
    subheadline: 'Eine grundlegende Kompositionsregel zur harmonischen Bildgestaltung.',
    definition: 'Die Drittelregel ist eine vereinfachte Form des Goldenen Schnitts. Dabei wird das Bild gedanklich durch zwei waagerechte und zwei senkrechte Linien in neun gleich große Rechtecke unterteilt. Die Regel besagt, dass das Hauptmotiv nicht exakt in der Mitte des Bildes platziert werden sollte, sondern entlang dieser Linien oder an einem der vier Schnittpunkte. Dies erzeugt eine asymmetrische, aber dennoch ausbalancierte und dynamische Komposition, die für das menschliche Auge deutlich interessanter und natürlicher wirkt als eine streng zentrierte Platzierung.',
    importantInfo: 'Bei Interviews wird die sprechende Person meist auf einer der vertikalen Drittellinien platziert, wobei sie in die Richtung des größeren freien Raums (Looking Room oder Nose Room) blickt. Ein Fehler ist es, diese Regel dogmatisch anzuwenden – manchmal ist eine bewusste, zentrierte Symmetrie genau das richtige Stilmittel.'
  },
  {
    id: 'leading-lines',
    categoryId: 'bildgestaltung',
    title: 'Leading Lines (Führende Linien)',
    subheadline: 'Visuelle Linien im Bild, die den Blick des Zuschauers lenken.',
    definition: 'Leading Lines sind natürliche oder architektonische Linien innerhalb einer Bildkomposition, die den Blick des Betrachters gezielt auf das Hauptmotiv oder in die Tiefe des Raumes führen. Dies können Straßen, Zäune, Flure, Geländer, Lichtstrahlen oder sogar Schattenkanten sein. Sie verleihen einem zweidimensionalen Bild eine starke räumliche Tiefe (3D-Wirkung) und schaffen eine klare visuelle Hierarchie. Wenn die Linien im Hintergrund in einem Fluchtpunkt zusammenlaufen, entsteht eine besonders starke Sogwirkung.',
    importantInfo: 'Führende Linien müssen nicht immer gerade sein; auch geschwungene Linien (wie ein Flusslauf oder eine Wendeltreppe) können den Blick sehr elegant durch das Bild leiten. Es ist wichtig, bei der Wahl des Kamerastandorts aktiv nach solchen Linien in der Umgebung zu suchen.',
    localContext: 'Bei Architektur- oder Immobilienvideos, etwa in modernen Bürokomplexen in Mainz oder historischen Gebäuden, nutzen wir Flure und architektonische Kanten gezielt als Leading Lines, um die Weitläufigkeit der Räume zu betonen.'
  },
  {
    id: 'soft-light',
    categoryId: 'licht-beleuchtung',
    title: 'Soft Light (Weiches Licht)',
    subheadline: 'Eine Lichtart, die sanfte Schattenübergänge und eine schmeichelhafte Ausleuchtung erzeugt.',
    definition: 'Soft Light zeichnet sich durch fließende, weiche Übergänge zwischen den beleuchteten Bereichen und den Schatten aus. Es entsteht, wenn die Lichtquelle im Verhältnis zum Motiv sehr groß ist. Dies kann durch große Softboxen, Diffusionsfolien (Scrims) oder durch das Reflektieren von Licht über eine große weiße Fläche (Bounce) erreicht werden. Auch ein bewölkter Himmel wirkt wie eine gigantische Softbox und erzeugt extrem weiches Licht. Soft Light minimiert Hautunreinheiten, reduziert harte Kontraste und wird vom Zuschauer als sehr natürlich und angenehm empfunden.',
    importantInfo: 'Ein häufiger Irrtum ist, dass die Intensität (Helligkeit) des Lichts bestimmt, ob es hart oder weich ist. Tatsächlich ist ausschließlich die relative Größe der Lichtquelle entscheidend. Eine kleine, schwache LED-Lampe erzeugt hartes Licht, während ein riesiger, extrem heller Scheinwerfer durch einen großen Diffusor weiches Licht erzeugt.'
  },
  {
    id: 'farbtemperatur',
    categoryId: 'licht-beleuchtung',
    title: 'Farbtemperatur (Kelvin)',
    subheadline: 'Das Maß für den Farbeindruck einer Lichtquelle, von warm bis kalt.',
    definition: 'Die Farbtemperatur beschreibt die Lichtfarbe einer Lichtquelle und wird in der Einheit Kelvin (K) gemessen. Entgegen der intuitiven Wahrnehmung stehen niedrige Kelvin-Werte (z. B. 2.500 K bis 3.200 K) für "warmes", rötlich-gelbes Licht, wie es von Kerzen oder klassischen Glühbirnen (Tungsten) erzeugt wird. Hohe Kelvin-Werte (z. B. 5.600 K bis 7.000 K) stehen für "kaltes", bläuliches Licht, wie es an einem bewölkten Tag oder im Schatten auftritt. Die Kamera muss über den Weißabgleich (White Balance) auf die vorherrschende Farbtemperatur eingestellt werden, damit weiße Flächen im Video auch wirklich weiß und nicht blau oder orange erscheinen.',
    importantInfo: 'Das Mischen von Lichtquellen mit stark unterschiedlichen Farbtemperaturen (z. B. warmes Kunstlicht im Raum und kaltes Tageslicht durch das Fenster) führt zu unschönem "Mischlicht", das in der Postproduktion kaum noch zu korrigieren ist. Professionelle Filmleuchten (Bi-Color) lassen sich stufenlos an die Farbtemperatur der Umgebung anpassen.'
  },
  {
    id: 'belichtungsdreieck',
    categoryId: 'aufnahme-einstellungen',
    title: 'Belichtungsdreieck (Exposure Triangle)',
    subheadline: 'Das Zusammenspiel der drei grundlegenden Parameter zur Bildbelichtung.',
    definition: 'Das Belichtungsdreieck beschreibt die untrennbare Beziehung zwischen den drei Kameraeinstellungen, die die Helligkeit eines Bildes bestimmen: Blende (Aperture), Verschlusszeit (Shutter Speed) und ISO-Wert (Lichtempfindlichkeit). Ändert man einen dieser Werte, um das Bild heller oder dunkler zu machen, hat dies immer auch eine kreative Nebenwirkung: Die Blende beeinflusst die Schärfentiefe, die Verschlusszeit beeinflusst die Bewegungsunschärfe (Motion Blur), und der ISO-Wert beeinflusst das Bildrauschen. Eine korrekte Belichtung erfordert das ständige Ausbalancieren dieser drei Faktoren.',
    importantInfo: 'Beim Filmen ist die Verschlusszeit meist durch die Framerate fest vorgegeben (180-Grad-Shutter-Regel). Daher bleiben in der Videoproduktion primär die Blende, der ISO-Wert und externe Hilfsmittel wie ND-Filter, um die Belichtung zu steuern, ohne den filmischen Look zu zerstören.'
  },
  {
    id: 'log-profil',
    categoryId: 'aufnahme-einstellungen',
    title: 'Log Profil (Logarithmic Profile)',
    subheadline: 'Ein flaches, kontrastarmes Bildprofil für maximalen Dynamikumfang.',
    definition: 'Ein Log-Profil (wie S-Log bei Sony, C-Log bei Canon oder V-Log bei Panasonic) ist eine spezielle Gammakurve in der Kamera, die das Bild extrem flach, entsättigt und kontrastarm aufzeichnet. Der Zweck dieses unansehnlichen Rohbildes ist es, ein Maximum an Bildinformationen – insbesondere in den sehr hellen und sehr dunklen Bereichen – in die Videodatei zu quetschen. Es verhindert, dass Lichter ausbrennen oder Schatten komplett schwarz werden. Das Material muss zwingend in der Postproduktion durch Color Grading bearbeitet werden, um Kontrast und Farbe zurückzuerhalten.',
    importantInfo: 'Das Filmen in Log erfordert eine sehr präzise Belichtung. Ein typischer Fehler ist es, Log-Material unterzubelichten, was beim späteren Aufhellen im Schnittprogramm zu extremem Bildrauschen führt (daher belichten viele Profis Log-Profile bewusst etwas über, "Expose to the right").'
  },
  {
    id: 'handheld-shot',
    categoryId: 'kamerabewegung',
    title: 'Handheld Shot',
    subheadline: 'Eine aus der freien Hand gefilmte Kameraeinstellung.',
    definition: 'Beim Handheld Shot wird die Kamera nicht auf einem Stativ, Gimbal oder Dolly montiert, sondern direkt vom Kameramann in den Händen oder auf der Schulter (mit einem Shoulder Rig) getragen. Dies erzeugt eine natürliche, leicht unruhige Kamerabewegung, die dem Zuschauer das Gefühl gibt, unmittelbar am Geschehen beteiligt zu sein. Handheld-Kameraführung wirkt authentisch, dokumentarisch und dynamisch. Sie wird oft eingesetzt, um Chaos, Hektik oder eine sehr intime, rohe Atmosphäre zu vermitteln.',
    importantInfo: 'Handheld bedeutet nicht unkontrolliertes Wackeln. Professionelle Kameraleute nutzen spezielle Atem- und Gehtechniken (Ninja Walk) sowie das Gewicht der Kamera, um die Mikrobewegungen organisch und fließend zu halten. Zu starkes Wackeln (Shaky Cam) kann beim Zuschauer schnell zu Ermüdung oder gar Übelkeit führen.',
    localContext: 'Für authentische Recruiting-Videos oder Event-Reportagen in Kaiserslautern setzen wir oft bewusst auf eine kontrollierte Handheld-Kamera, um die Dynamik und Energie des Arbeitsalltags oder der Veranstaltung ungefiltert einzufangen.'
  },
  {
    id: 'steadicam',
    categoryId: 'kamerabewegung',
    title: 'Steadicam',
    subheadline: 'Ein mechanisches Stabilisierungssystem für fließende Kamerafahrten.',
    definition: 'Die Steadicam ist ein rein mechanisches Kamera-Stabilisierungssystem, das den Körper des Kameramanns von der Kamera entkoppelt. Es besteht aus einer Weste, einem gefederten Iso-Elastik-Arm und einem Schlitten (Sled) mit Gegengewichten. Durch dieses System werden die Schritte und Körperbewegungen des Operators absorbiert, sodass die Kamera scheinbar schwerelos durch den Raum gleitet. Im Gegensatz zu elektronischen Gimbals benötigt eine Steadicam keine Motoren oder Batterien zur Stabilisierung, erfordert aber extrem viel Übung und physische Kraft vom Operator.',
    importantInfo: 'Obwohl elektronische Gimbals heute weit verbreitet sind, bleibt die Steadicam bei großen Filmproduktionen der Standard. Sie kann deutlich schwerere Kinokameras tragen und bietet dem Operator eine direktere, organischere Kontrolle über Schwenks und Neigungen als die Joystick-Steuerung eines Gimbals.'
  },
  {
    id: 'j-cut-l-cut',
    categoryId: 'postproduktion',
    title: 'J-Cut & L-Cut',
    subheadline: 'Schnitttechniken, bei denen Bild und Ton asynchron wechseln.',
    definition: 'J-Cuts und L-Cuts sind fortgeschrittene Montagetechniken im Videoschnitt, die für fließende und natürliche Übergänge zwischen zwei Szenen sorgen. Beim J-Cut (benannt nach der Form des Buchstabens "J" in der Timeline) hört man den Ton der nächsten Szene bereits, bevor das Bild wechselt. Der Ton eilt dem Bild voraus. Beim L-Cut (Form des "L") bleibt der Ton der vorherigen Szene noch hörbar, während das Bild bereits zur nächsten Szene gewechselt hat. Beide Techniken verbinden Szenen akustisch miteinander und verhindern harte, abgehackte Schnitte.',
    importantInfo: 'Diese Techniken sind essenziell für professionelle Dialogszenen und Interviews. Ein typischer Anfängerfehler ist der "Straight Cut", bei dem Bild und Ton immer exakt gleichzeitig hart geschnitten werden, was unnatürlich wirkt, da wir im echten Leben oft erst etwas hören, bevor wir unseren Blick dorthin wenden.'
  },
  {
    id: 'lut',
    categoryId: 'postproduktion',
    title: 'LUT (Look-Up Table)',
    subheadline: 'Eine mathematische Tabelle zur schnellen Farbtransformation von Videomaterial.',
    definition: 'Eine Look-Up Table (LUT) ist im Grunde ein digitaler Farbfilter für die Postproduktion. Sie enthält mathematische Anweisungen, die bestimmte Farb- und Helligkeitswerte des Originalmaterials in neue, definierte Werte umwandeln. Es gibt zwei Hauptarten: "Technical LUTs" (Conversion LUTs) werden genutzt, um flaches Log-Material in einen normalen Farbraum (wie Rec.709) mit korrekten Kontrasten zu übersetzen. "Creative LUTs" (Look LUTs) werden danach angewendet, um dem Film einen spezifischen künstlerischen Stil zu verleihen, etwa einen Vintage-Look oder einen düsteren Thriller-Look.',
    importantInfo: 'Ein weit verbreiteter Fehler ist es, eine kreative LUT einfach auf unkorrigiertes Material zu klatschen und zu hoffen, dass das Bild sofort perfekt aussieht. Eine LUT funktioniert nur dann richtig, wenn das Material vorher hinsichtlich Belichtung und Weißabgleich sauber korrigiert wurde.'
  },
  {
    id: 'location-scouting',
    categoryId: 'produktion-planung',
    title: 'Location Scouting',
    subheadline: 'Die Suche und Bewertung geeigneter Drehorte vor Produktionsbeginn.',
    definition: 'Location Scouting ist ein essenzieller Teil der Pre-Production. Dabei sucht das Produktionsteam nach realen Orten, die optisch und atmosphärisch perfekt zum Drehbuch passen. Es geht jedoch nicht nur um die Ästhetik: Ein guter Location Scout prüft auch die logistischen und technischen Voraussetzungen. Gibt es genügend Stromanschlüsse für die Scheinwerfer? Ist der Raum hoch genug für Stative? Gibt es störende Hintergrundgeräusche (wie eine laute Straße oder Klimaanlagen), die die Tonaufnahme ruinieren könnten? Zudem müssen oft Drehgenehmigungen eingeholt werden.',
    importantInfo: 'Ein häufiger Fehler bei Low-Budget-Produktionen ist es, Drehorte nur anhand von Fotos auszuwählen. Ein Ort, der auf Bildern toll aussieht, kann in der Realität durch extremen Hall oder wechselndes Tageslicht völlig ungeeignet für einen Filmdreh sein. Eine Besichtigung vor Ort (Tech Recce) ist unerlässlich.',
    localContext: 'Durch unsere langjährige Erfahrung kennen wir unzählige spannende Drehorte im Saarland und in Rheinland-Pfalz. Wir übernehmen das komplette Location Scouting und kümmern uns um alle nötigen Genehmigungen, egal ob für einen Werbedreh in der Mainzer Innenstadt oder in der Natur.'
  },
  {
    id: 'call-sheet',
    categoryId: 'produktion-planung',
    title: 'Call Sheet (Tagesdisposition)',
    subheadline: 'Der detaillierte Ablaufplan für einen einzelnen Drehtag.',
    definition: 'Das Call Sheet ist das wichtigste Dokument am Filmset. Es wird von der Produktionsleitung oder Regieassistenz erstellt und am Vorabend des Drehs an die gesamte Crew und alle Darsteller verschickt. Es enthält alle relevanten Informationen für den Tag: Wann muss wer am Set sein (Call Time)? Wo genau wird gedreht (Adresse und Parkmöglichkeiten)? Welche Szenen stehen auf dem Plan? Wie wird das Wetter? Welche Ausrüstung wird benötigt? Zudem enthält es die Kontaktdaten aller wichtigen Teammitglieder und Informationen zur Verpflegung.',
    importantInfo: 'Ein professionelles Call Sheet verhindert Chaos am Set. Ein typischer Fehler bei Anfängerproduktionen ist es, Zeiten zu optimistisch zu planen und keine Puffer für Auf- und Abbau oder unvorhergesehene Verzögerungen einzuplanen.'
  },
  {
    id: 'richtmikrofon',
    categoryId: 'audio-ton',
    title: 'Richtmikrofon (Shotgun Mic)',
    subheadline: 'Ein Mikrofon mit stark gerichteter Aufnahmecharakteristik.',
    definition: 'Ein Richtmikrofon (Shotgun Microphone) ist so konstruiert, dass es Schall primär von vorne aufnimmt und Geräusche von den Seiten und von hinten stark abdämpft. Optisch erkennt man es an seiner langen, röhrenförmigen Bauweise mit seitlichen Schlitzen (Interferenzrohr). Es wird meist an einer Tonangel (Boom Pole) über den Köpfen der Schauspieler platziert oder direkt auf der Kamera montiert. Richtmikrofone sind ideal, um Dialoge an lauten Orten klar aufzuzeichnen, da sie den Fokus exakt auf die sprechende Person legen.',
    importantInfo: 'Ein Richtmikrofon ist kein "Teleobjektiv für den Ton". Es holt den Ton nicht näher heran, sondern blendet lediglich seitliche Störgeräusche aus. Um eine gute Tonqualität zu erzielen, muss das Mikrofon dennoch so nah wie möglich an der Schallquelle platziert werden (meist knapp außerhalb des Bildausschnitts).'
  },
  {
    id: 'room-tone',
    categoryId: 'audio-ton',
    title: 'Room Tone (Raumton)',
    subheadline: 'Das natürliche Grundrauschen eines Raumes oder Drehorts.',
    definition: 'Room Tone (auch Atmos oder Raumakustik genannt) ist die Aufnahme der scheinbaren "Stille" an einem Drehort, wenn niemand spricht und keine offensichtlichen Aktionen stattfinden. Jeder Raum hat seinen eigenen, einzigartigen akustischen Fingerabdruck, der durch Klimaanlagen, entfernten Verkehr, das Summen von Lampen oder die Reflexion der Wände entsteht. In der Postproduktion ist diese Aufnahme extrem wichtig: Wenn der Cutter Pausen zwischen Dialogen verlängern oder Störgeräusche herausschneiden muss, füllt er die entstehenden Lücken in der Tonspur mit dem Room Tone auf, damit der Schnitt für den Zuschauer unhörbar bleibt.',
    importantInfo: 'Es ist eine eiserne Regel am Set, am Ende jeder Szene für mindestens 30 bis 60 Sekunden absolute Stille zu fordern, um den Room Tone aufzuzeichnen. Vergisst man dies, wird die Audio-Postproduktion später extrem aufwendig und fehleranfällig.'
  },
  // --- NEUE BEGRIFFE: Kamera & Technik ---
  {
    id: 'rec-709',
    categoryId: 'kamera-technik',
    title: 'Rec. 709',
    subheadline: 'Der Standard-Farbraum für HD-Fernsehen und Web-Videos.',
    definition: 'Rec. 709 (Recommendation ITU-R BT.709) ist der weltweite Standard-Farbraum für High-Definition-Video (HDTV). Er definiert, welche Farben ein Bildschirm darstellen kann und wie Kontraste interpretiert werden. Wenn ein Video im Internet, auf YouTube oder im TV gezeigt wird, wird es fast immer in Rec. 709 ausgespielt. Im Gegensatz zu flachen Log-Profilen, die in der Postproduktion erst in Rec. 709 umgewandelt werden müssen, sieht Material, das direkt in Rec. 709 gefilmt wurde, sofort "fertig" und kontrastreich aus.',
    importantInfo: 'Ein häufiger Fehler ist es, Log-Material ohne eine korrekte "Color Space Transform" (CST) oder Technical LUT direkt zu bearbeiten. Das Ziel beim Color Grading ist es meistens, das flache Bildmaterial für den Zuschauer korrekt in den Rec. 709 Farbraum zu übersetzen.'
  },
  {
    id: 'hdmi-sdi',
    categoryId: 'kamera-technik',
    title: 'HDMI & SDI',
    subheadline: 'Die wichtigsten Schnittstellen zur Videoübertragung am Set.',
    definition: 'HDMI (High-Definition Multimedia Interface) und SDI (Serial Digital Interface) sind Kabelverbindungen, um das Videosignal der Kamera an externe Monitore oder Rekorder zu senden. HDMI ist der Consumer-Standard, der auch an Fernsehern zu finden ist. Er ist günstig, aber die Stecker sind empfindlich und können leicht herausrutschen. SDI ist der professionelle Broadcast-Standard. SDI-Kabel nutzen robuste BNC-Stecker, die verriegelt werden, und können Signale über viel längere Distanzen (bis zu 100 Meter) ohne Qualitätsverlust übertragen.',
    importantInfo: 'Für professionelle Produktionen ist SDI immer die bessere Wahl, da ein herausrutschendes HDMI-Kabel während einer Live-Aufzeichnung fatal sein kann. Viele professionelle Kinokameras bieten daher ausschließlich SDI-Ausgänge an.'
  },
  {
    id: 'ssd-sd-karten',
    categoryId: 'kamera-technik',
    title: 'SSD & SD-Karten',
    subheadline: 'Speichermedien für die Videoaufzeichnung.',
    definition: 'SD-Karten (Secure Digital) sind die verbreitetsten Speichermedien in spiegellosen Kameras. Sie sind klein und praktisch, stoßen aber bei extrem hohen Datenraten (wie 4K RAW oder 120 fps) an ihre Grenzen. SSDs (Solid State Drives) sind externe Festplatten, die über USB-C direkt an moderne Kameras angeschlossen werden können. Sie bieten deutlich höhere Schreibgeschwindigkeiten und viel mehr Speicherplatz zu einem günstigeren Preis pro Gigabyte als professionelle SD-Karten (wie CFexpress).',
    importantInfo: 'Beim Kauf von SD-Karten für Videoaufnahmen ist nicht die Lesegeschwindigkeit, sondern die garantierte minimale Schreibgeschwindigkeit (z. B. V60 oder V90) entscheidend. Eine zu langsame Karte führt zum sofortigen Abbruch der Videoaufnahme.'
  },
  {
    id: 'color-science',
    categoryId: 'kamera-technik',
    title: 'Color Science',
    subheadline: 'Die herstellerspezifische Interpretation von Farben durch den Kamerasensor.',
    definition: 'Color Science (Farbwissenschaft) beschreibt, wie die Software einer Kamera die rohen Sensordaten in sichtbare Farben übersetzt. Jeder Kamerahersteller (z. B. Sony, Canon, ARRI, RED) hat hierbei seine eigene "Geheimrezeptur". Canon ist beispielsweise berühmt für seine warmen, schmeichelhaften Hauttöne (Skin Tones) direkt aus der Kamera, während ARRI für einen extrem organischen, filmischen Look bekannt ist. Die Color Science bestimmt den Grundcharakter des Bildes, bevor überhaupt ein Color Grading stattfindet.',
    importantInfo: 'Wenn bei einem Dreh Kameras verschiedener Hersteller gemischt werden (z. B. Sony als A-Kamera und Panasonic als B-Kamera), ist es in der Postproduktion extrem aufwendig, die unterschiedlichen Color Sciences aneinander anzugleichen (Color Matching).'
  },
  {
    id: 'gamut',
    categoryId: 'kamera-technik',
    title: 'Gamut (Farbraum)',
    subheadline: 'Das Spektrum aller Farben, die ein Gerät erfassen oder darstellen kann.',
    definition: 'Der Gamut (oder Farbraum) definiert die absolute Menge an Farben, die eine Kamera aufzeichnen oder ein Monitor anzeigen kann. Ein großer Farbraum (Wide Color Gamut wie Rec. 2020 oder ARRI Wide Gamut) kann extrem gesättigte und feine Farbnuancen erfassen, die in einem kleinen Farbraum (wie Rec. 709) einfach abgeschnitten (geclippt) würden. In der professionellen Videoproduktion wird oft in einem sehr großen Gamut aufgezeichnet, um in der Postproduktion maximale Reserven für das Color Grading zu haben.',
    importantInfo: 'Ein Monitor, der nur den sRGB- oder Rec. 709-Farbraum abdeckt, kann die extremen Farben eines Wide Color Gamuts physisch nicht anzeigen. Für professionelles Color Grading sind daher spezielle, kalibrierte Monitore erforderlich.'
  },

  // --- NEUE BEGRIFFE: Objektive & Optik ---
  {
    id: 'zoom-objektiv',
    categoryId: 'objektive-optik',
    title: 'Zoom-Objektiv',
    subheadline: 'Ein Objektiv mit variabler Brennweite.',
    definition: 'Ein Zoom-Objektiv ermöglicht es, die Brennweite (den Bildausschnitt) stufenlos zu verändern, ohne das Objektiv wechseln oder die Kameraposition verschieben zu müssen (z. B. 24-70mm). Dies bietet am Set enorme Flexibilität und Schnelligkeit. Im Gegensatz zu Prime-Objektiven (Festbrennweiten) sind Zoom-Objektive jedoch meist größer, schwerer und weniger lichtstark (oft maximal f/2.8 oder f/4).',
    importantInfo: 'Ein "parfokales" Zoom-Objektiv behält die Schärfe exakt bei, während man hinein- oder herauszoomt. Günstige Foto-Zooms sind meist nicht parfokal, was bedeutet, dass man nach jeder Brennweitenänderung neu fokussieren muss.',
    localContext: 'Bei Eventbegleitungen oder dynamischen Reportagen im Saarland setzen wir primär auf hochwertige Zoom-Objektive, um in Sekundenbruchteilen zwischen einer weiten Übersicht und einem nahen Detail wechseln zu können, ohne einen wichtigen Moment zu verpassen.'
  },
  {
    id: 'objektivcharakter',
    categoryId: 'objektive-optik',
    title: 'Objektivcharakter',
    subheadline: 'Die einzigartigen optischen Eigenschaften und "Fehler" einer Linse.',
    definition: 'Der Objektivcharakter beschreibt die ästhetische Anmutung eines Objektivs. Während moderne Fotoobjektive oft darauf getrimmt sind, klinisch scharf und fehlerfrei zu sein, suchen Filmemacher oft nach Linsen mit "Charakter". Dazu gehören ein spezielles Bokeh, sanfte Unschärfen an den Rändern, warme Farbverschiebungen oder charakteristische Lens Flares. Oft werden bewusst ältere Objektive (Vintage Lenses) verwendet, um dem digitalen, sterilen Sensorbild einen organischen, analogen Look zu verleihen.',
    importantInfo: 'Der Charakter eines Objektivs lässt sich in der Postproduktion kaum digital nachbauen. Die Wahl der Linse ist daher eine der wichtigsten kreativen Entscheidungen vor dem Dreh.'
  },
  {
    id: 'cpl-filter',
    categoryId: 'objektive-optik',
    title: 'CPL-Filter (Polfilter)',
    subheadline: 'Ein Filter zur Reduzierung von Reflexionen und zur Erhöhung der Farbsättigung.',
    definition: 'Ein Zirkularer Polarisationsfilter (CPL) blockiert Lichtwellen, die in bestimmten Winkeln schwingen. In der Praxis bedeutet das: Er entfernt störende Spiegelungen auf nicht-metallischen Oberflächen wie Glas oder Wasser. Zudem verdunkelt er den blauen Himmel und erhöht den Kontrast zu weißen Wolken, was Landschaftsaufnahmen deutlich satter und dramatischer wirken lässt. Der Effekt lässt sich durch Drehen des Filters stufenlos einstellen.',
    importantInfo: 'Ein Polfilter schluckt etwa 1 bis 2 Blendenstufen Licht. Er sollte daher in dunklen Umgebungen abgenommen werden. Zudem kann er bei extremen Weitwinkelobjektiven zu einem ungleichmäßig abgedunkelten Himmel führen.',
    localContext: 'Bei Architektur- und Immobilienvideos, etwa beim Filmen von modernen Glasfassaden in Wiesbaden oder Mainz, ist ein Polfilter unverzichtbar, um störende Spiegelungen zu entfernen und in die Gebäude hineinblicken zu können.'
  },
  {
    id: 'mist-filter',
    categoryId: 'objektive-optik',
    title: 'Mist-Filter (Pro-Mist)',
    subheadline: 'Ein Diffusionsfilter für weichere Kontraste und leuchtende Lichter.',
    definition: 'Mist-Filter (wie der berühmte Tiffen Black Pro-Mist) streuen das Licht leicht, bevor es auf den Sensor trifft. Sie erzeugen ein charakteristisches, weiches Leuchten (Halation) um Lichtquellen herum und reduzieren den digitalen, überscharfen Look moderner Kameras. Gleichzeitig glätten sie Hautunreinheiten und reduzieren den Gesamtkontrast des Bildes, was zu einem sehr organischen, cineastischen und leicht verträumten Look führt.',
    importantInfo: 'Mist-Filter gibt es in verschiedenen Stärken (z. B. 1/8, 1/4, 1/2). Für einen subtilen, professionellen Look wird meist eine sehr geringe Stärke (1/8) gewählt. Ein zu starker Filter lässt das Bild schnell milchig und unscharf wirken.'
  },
  {
    id: 'matte-box',
    categoryId: 'objektive-optik',
    title: 'Matte Box (Kompendium)',
    subheadline: 'Ein professioneller Streulichtschutz vor dem Objektiv.',
    definition: 'Eine Matte Box ist ein Kasten, der vorne am Objektiv oder an den 15mm-Rohren (Rods) der Kamera befestigt wird. Sie erfüllt zwei Hauptzwecke: Erstens blockiert sie mit verstellbaren Klappen (French Flags) seitlich einfallendes Streulicht, das zu unerwünschten Lens Flares oder Kontrastverlust führen könnte. Zweitens dient sie als Halterung für professionelle, rechteckige Einschubfilter (wie ND-Filter oder Mist-Filter), die sich so schnell wechseln und kombinieren lassen.',
    importantInfo: 'Neben dem praktischen Nutzen lässt eine Matte Box das Kamera-Setup deutlich größer und professioneller wirken, was bei Kunden am Set oft einen positiven psychologischen Effekt hat (der sogenannte "Client-Pleaser").'
  },
  {
    id: 'effekt-filter',
    categoryId: 'objektive-optik',
    title: 'Effektfilter',
    subheadline: 'Spezielle Filter für kreative visuelle Effekte direkt in der Kamera.',
    definition: 'Effektfilter werden vor das Objektiv geschraubt oder in eine Matte Box gesteckt, um das Bild auf kreative Weise zu verändern, ohne auf die Postproduktion angewiesen zu sein. Dazu gehören beispielsweise Star-Filter (die Lichtquellen in sternförmige Strahlen verwandeln), Streak-Filter (die anamorphotische Lens Flares simulieren), Split-Diopter (die zwei unterschiedliche Fokusebenen im selben Bild ermöglichen) oder Farbfilter.',
    importantInfo: 'Während viele Effekte heute digital hinzugefügt werden können, wirken physische Glasfilter vor der Linse oft organischer und reagieren natürlicher auf Kamerabewegungen und Lichtveränderungen.'
  },
  {
    id: 'objektivdeckel',
    categoryId: 'objektive-optik',
    title: 'Objektivdeckel (Lens Cap)',
    subheadline: 'Der wichtigste Schutz für das teuerste Equipment.',
    definition: 'Ein Objektivdeckel ist eine einfache Plastik- oder Metallkappe, die auf die Vorderseite (Frontdeckel) oder Rückseite (Rückdeckel) eines Objektivs gesetzt wird. Er schützt das empfindliche Glas vor Kratzern, Staub, Fingerabdrücken und Feuchtigkeit, wenn die Kamera nicht benutzt wird oder das Objektiv in der Tasche transportiert wird.',
    importantInfo: 'Ein verlorener Rückdeckel ist besonders gefährlich: Wenn Staub auf die hintere Linse gelangt, ist dieser auf dem Sensorbild viel deutlicher zu sehen als Staub auf der vorderen Linse.'
  },

  // --- NEUE BEGRIFFE: Bildgestaltung & Komposition ---
  {
    id: 'extreme-wide-shot',
    categoryId: 'bildgestaltung',
    title: 'Extreme Wide Shot (Super-Totale)',
    subheadline: 'Eine extrem weite Einstellung, die Landschaften oder große Räume dominiert.',
    definition: 'Der Extreme Wide Shot (EWS) zeigt eine Szenerie aus sehr großer Entfernung. Personen sind darin oft nur als winzige Punkte erkennbar oder fehlen komplett. Diese Einstellung wird genutzt, um die schiere Größe einer Landschaft, einer Stadt oder eines Gebäudes zu betonen. Sie vermittelt oft ein Gefühl von Isolation, Einsamkeit oder epischer Weite.',
    importantInfo: 'Wird häufig als allererster Establishing Shot eines Films genutzt, um dem Zuschauer sofort klarzumachen, in welcher Welt oder an welchem Ort die Geschichte spielt.'
  },
  {
    id: 'wide-shot',
    categoryId: 'bildgestaltung',
    title: 'Wide Shot (Totale)',
    subheadline: 'Eine weite Einstellung, die das Motiv vollständig in seiner Umgebung zeigt.',
    definition: 'Der Wide Shot (Totale) fängt eine Person oder ein Objekt komplett von Kopf bis Fuß ein und zeigt gleichzeitig viel von der umgebenden Umgebung. Diese Einstellung wird genutzt, um die Beziehung zwischen dem Charakter und seinem Raum zu verdeutlichen. Sie gibt dem Zuschauer Orientierung und zeigt, wo die Handlung stattfindet.',
    importantInfo: 'Oft wird sie auch als Establishing Shot am Anfang einer Szene verwendet, nachdem ein Extreme Wide Shot die grobe Location etabliert hat.'
  },
  {
    id: 'medium-shot',
    categoryId: 'bildgestaltung',
    title: 'Medium Shot (Halbnah)',
    subheadline: 'Eine Einstellung, die eine Person etwa ab der Hüfte aufwärts zeigt.',
    definition: 'Der Medium Shot ist die absolute Standardeinstellung im Film und Fernsehen. Er zeigt den Schauspieler etwa von der Hüfte oder dem Bauchnabel aufwärts. Diese Einstellung entspricht in etwa der Distanz, die wir in einem normalen Gespräch zu unserem Gegenüber einnehmen. Sie ist nah genug, um Mimik und Gestik gut erkennen zu können, zeigt aber noch genug vom Körper, um Körpersprache (wie Handbewegungen) einzufangen.',
    importantInfo: 'Der Medium Shot ist die sicherste und am häufigsten verwendete Einstellung für Interviews und Dialogszenen, da er natürlich und unaufdringlich wirkt.'
  },
  {
    id: 'close-up',
    categoryId: 'bildgestaltung',
    title: 'Close-Up (Nahaufnahme)',
    subheadline: 'Eine nahe Einstellung, die meist nur das Gesicht einer Person zeigt.',
    definition: 'Das Close-Up schneidet die Person knapp über dem Kopf und unterhalb der Schultern an. Der Fokus liegt zu 100 % auf dem Gesicht, den Augen und der Mimik. Diese Einstellung wird genutzt, um starke Emotionen zu transportieren, Intimität zu schaffen oder die volle Aufmerksamkeit des Zuschauers auf die Reaktion eines Charakters zu lenken. Der Hintergrund verschwimmt dabei meist in der Unschärfe.',
    importantInfo: 'Close-Ups sollten sparsam eingesetzt werden. Wenn ein ganzer Film nur aus Close-Ups besteht, verliert die Einstellung ihre emotionale Wucht und der Zuschauer verliert die räumliche Orientierung.'
  },
  {
    id: 'extreme-close-up',
    categoryId: 'bildgestaltung',
    title: 'Extreme Close-Up (Detailaufnahme)',
    subheadline: 'Eine extreme Nahaufnahme, die nur einen winzigen Ausschnitt zeigt.',
    definition: 'Das Extreme Close-Up (ECU) geht noch näher ran als das normale Close-Up. Es zeigt beispielsweise nur die Augen, den Mund, einen Finger am Abzug einer Waffe oder eine tickende Uhr. Diese Einstellung blendet alles andere aus und zwingt den Zuschauer, sich auf ein einziges, winziges Detail zu konzentrieren.',
    importantInfo: 'Ein ECU erzeugt extreme Spannung oder lenkt den Blick auf ein entscheidendes Story-Element, das der Zuschauer auf keinen Fall übersehen darf.'
  },
  {
    id: 'dutch-angle',
    categoryId: 'bildgestaltung',
    title: 'Dutch Angle (Gekippte Kamera)',
    subheadline: 'Eine absichtlich schräg gestellte Kameraperspektive.',
    definition: 'Beim Dutch Angle (auch Canted Angle) wird die Kamera absichtlich um die Roll-Achse gekippt, sodass der Horizont im Bild schief ist. Diese unnatürliche Perspektive erzeugt beim Zuschauer unterbewusst ein Gefühl von Unbehagen, Desorientierung, psychologischer Anspannung oder Wahnsinn. Sie wird häufig in Thrillern, Horrorfilmen oder bei der Darstellung von Rauschzuständen eingesetzt.',
    importantInfo: 'Der Dutch Angle ist ein extrem starkes visuelles Stilmittel und sollte sehr sparsam eingesetzt werden. Wird er ohne narrativen Grund verwendet, wirkt das Video schnell amateurhaft oder unfreiwillig komisch.',
    localContext: 'In kreativen Musikvideos oder dynamischen Event-Aftermovies, etwa für Clubs in Kaiserslautern, nutzen wir leichte Dutch Angles gezielt, um Energie, Chaos und eine unkonventionelle Atmosphäre zu vermitteln.'
  },
  {
    id: 'over-the-shoulder',
    categoryId: 'bildgestaltung',
    title: 'Over the Shoulder (OTS)',
    subheadline: 'Eine Einstellung, bei der über die Schulter einer Person gefilmt wird.',
    definition: 'Beim Over the Shoulder Shot (OTS) blickt die Kamera über die Schulter einer Person (die unscharf im Vordergrund am Bildrand zu sehen ist) auf das Gesicht der zweiten Person, die gerade spricht oder zuhört. Diese Einstellung ist der absolute Standard für Dialogszenen. Sie verbindet die beiden Charaktere räumlich miteinander und gibt dem Zuschauer das Gefühl, als unsichtbarer Dritter direkt neben den Protagonisten zu stehen.',
    importantInfo: 'Beim Schneiden von OTS-Shots muss zwingend die "180-Grad-Regel" beachtet werden. Die Kamera darf die imaginäre Achse zwischen den beiden sprechenden Personen nicht überschreiten, da die Charaktere sonst im Schnitt plötzlich in die falsche Richtung blicken würden.'
  },
  {
    id: 'pov',
    categoryId: 'bildgestaltung',
    title: 'Point of View (POV)',
    subheadline: 'Eine Einstellung aus der subjektiven Sicht eines Charakters.',
    definition: 'Der Point of View Shot (Subjektive Kamera) zeigt exakt das, was eine Figur im Film in diesem Moment sieht. Die Kamera wird quasi zu den Augen des Charakters. Diese Technik wird genutzt, um den Zuschauer extrem stark in die Handlung hineinzuziehen und ihn die Situation durch die Augen des Protagonisten erleben zu lassen. Oft wird der POV-Shot durch einen vorherigen Shot eingeleitet, der zeigt, wie die Person in eine bestimmte Richtung blickt.',
    importantInfo: 'POV-Shots werden häufig mit Handheld-Kameras oder Action-Cams (wie GoPro) gedreht, um die natürlichen Kopfbewegungen zu simulieren. In Werbefilmen ist POV ein beliebtes Mittel, um den Konsumenten direkt in die Anwendung eines Produkts zu versetzen.'
  }
];
