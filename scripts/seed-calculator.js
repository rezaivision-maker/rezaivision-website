// Schreibt die Kalkulator-Konfiguration in Firestore.
// Einmalig ausführen: node scripts/seed-calculator.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "rezaivisioncms",
  appId: "1:119103386800:web:ce2890ce9fe57b6e1d7775",
  storageBucket: "rezaivisioncms.firebasestorage.app",
  apiKey: "AIzaSyAYgrWpiiGrsBeZ5v2GLBD-0P_oaI7yR3I",
  authDomain: "rezaivisioncms.firebaseapp.com",
  messagingSenderId: "119103386800",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const steps = [
  {
    id: "step1_videotyp",
    order: 1,
    title: "Was für ein Video möchtest du?",
    description: "Wähle den Videotyp, der am besten zu deinem Ziel passt.",
    multiSelect: false,
    options: [
      { id: "imagefilm", title: "Imagefilm / Markenstory", description: "Unternehmensfilm, Markenvideo, emotionale Markengeschichte", basePrice: 1800 },
      { id: "recruiting", title: "Recruiting Film", description: "Employer Branding, Mitarbeitergewinnung, Unternehmenskultur zeigen", basePrice: 1500 },
      { id: "socialmedia", title: "Social Media Content", description: "Reels, TikToks, YouTube Shorts — für organische Reichweite", basePrice: 800 },
      { id: "ads", title: "Performance Ads / Werbeclip", description: "Video-Anzeigen für Meta, YouTube oder LinkedIn", basePrice: 1000 },
      { id: "event", title: "Event / Dokumentation", description: "Veranstaltungen, Konferenzen, Behind the Scenes", basePrice: 1200 },
    ],
  },
  {
    id: "step2_paket",
    order: 2,
    title: "Welches Paket passt zu dir?",
    description: "Die Paketgröße bestimmt Umfang und Anzahl der Videos.",
    multiSelect: false,
    options: [
      { id: "paket_s", title: "S – Starter", description: "1 fertiges Video, 1 Drehtag, Basis-Schnitt", basePrice: 0 },
      { id: "paket_m", title: "M – Standard", description: "2–3 Videos, 1–2 Drehtage, inkl. Farbkorrektur", basePrice: 700 },
      { id: "paket_l", title: "L – Pro", description: "3–5 Videos, 2 Drehtage, Full Edit + Sounddesign", basePrice: 1500 },
      { id: "paket_xl", title: "XL – Premium Campaign", description: "5+ Videos / komplette Kampagne, mehrere Drehtage", basePrice: 3000 },
    ],
  },
  {
    id: "step3_crew",
    order: 3,
    title: "Wie groß soll das Team sein?",
    description: "Mehr Crew = mehr Perspektiven, professionelleres Set.",
    multiSelect: false,
    options: [
      { id: "crew_1vg", title: "1 Videograf", description: "Ideal für einfache Aufnahmen, Interviews oder Social Content", basePrice: 0 },
      { id: "crew_1vg_assi", title: "1 Videograf + Assistent", description: "Mehr Flexibilität, zweite Kamera oder B-Roll möglich", basePrice: 500 },
      { id: "crew_2vg", title: "2 Videografen", description: "Zwei Kameras gleichzeitig, mehr Schnittmaterial", basePrice: 800 },
      { id: "crew_2vg_assi", title: "2 Videografen + Assistent", description: "Professionelles Setup, Licht & Ton optimal betreut", basePrice: 1200 },
      { id: "crew_2vg_regie", title: "2 Videografen + Regie", description: "Volles Filmteam mit kreativem Gesamtverantwortlichen", basePrice: 2000 },
    ],
  },
  {
    id: "step4_stil",
    order: 4,
    title: "Welchen Look möchtest du?",
    description: "Der Stil bestimmt Ästhetik und Produktionsaufwand.",
    multiSelect: false,
    options: [
      { id: "stil_ugc", title: "Authentic / UGC-Style", description: "Natürlich, roh, glaubwürdig — ideal für Social Media & Ads", basePrice: 0 },
      { id: "stil_standard", title: "Standard Cinematic", description: "Professionell, sauber, markengerecht — der Klassiker", basePrice: 200 },
      { id: "stil_premium", title: "Premium Cinematic", description: "Kinoreife Bildsprache, aufwändige Lichtgestaltung, höchste Qualität", basePrice: 700 },
    ],
  },
  {
    id: "step5_extras",
    order: 5,
    title: "Brauchst du zusätzliche Leistungen?",
    description: "Optional — alles was über Dreh & Schnitt hinausgeht.",
    multiSelect: true,
    options: [
      { id: "extra_konzept", title: "Konzept & Strategie", description: "Wir entwickeln den roten Faden, Botschaft und Zielgruppenansprache", basePrice: 380 },
      { id: "extra_script", title: "Script / Drehbuch", description: "Professionell geschriebenes Skript für Sprecher oder Interview-Leitfaden", basePrice: 280 },
      { id: "extra_analyse", title: "Zielgruppen-Analyse", description: "ICP-Definition, Plattformstrategie, Content-Empfehlung", basePrice: 320 },
    ],
  },
  {
    id: "step6_lieferzeit",
    order: 6,
    title: "Wie schnell brauchst du es?",
    description: "Express-Projekte werden priorisiert und durchgeplant.",
    multiSelect: false,
    options: [
      { id: "normal", title: "Normal (3–4 Wochen)", description: "Entspannte Planung, optimales Ergebnis", basePrice: 0 },
      { id: "express", title: "Express (1–2 Wochen)", description: "Priorität im Kalender, beschleunigter Post-Prozess — +25 % Aufschlag", basePrice: 0, multiplierIndex: 1.25 },
    ],
  },
];

const configDoc = doc(db, "calculatorConfig", "mainConfig");
await setDoc(configDoc, { steps });
console.log("✅ Kalkulator-Konfiguration erfolgreich in Firestore gespeichert.");
process.exit(0);
