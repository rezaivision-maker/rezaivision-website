import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, GripVertical } from "lucide-react";
import { getCalculatorConfig, saveCalculatorConfig, CalculatorStep, CalculatorOption } from "../../lib/firebase/calculatorAPI";

const DEFAULT_CALCULATOR_STEPS: CalculatorStep[] = [
  {
    id: "step1_videotyp", order: 1,
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
    id: "step2_paket", order: 2,
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
    id: "step3_crew", order: 3,
    title: "Wie groß soll das Team sein?",
    description: "Mehr Crew bedeutet mehr Perspektiven und ein professionelleres Set.",
    multiSelect: false,
    options: [
      { id: "crew_1vg", title: "1 Videograf", description: "Ideal für Interviews, Social Content oder kompakte Drehs", basePrice: 0 },
      { id: "crew_1vg_assi", title: "1 Videograf + Assistent", description: "Mehr Flexibilität, zweite Kamera oder B-Roll möglich", basePrice: 500 },
      { id: "crew_2vg", title: "2 Videografen", description: "Zwei Kameras gleichzeitig, mehr Schnittmaterial", basePrice: 800 },
      { id: "crew_2vg_assi", title: "2 Videografen + Assistent", description: "Professionelles Setup, Licht & Ton optimal betreut", basePrice: 1200 },
      { id: "crew_2vg_regie", title: "2 Videografen + Regie", description: "Volles Filmteam mit kreativem Gesamtverantwortlichen", basePrice: 2000 },
    ],
  },
  {
    id: "step4_stil", order: 4,
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
    id: "step5_extras", order: 5,
    title: "Brauchst du zusätzliche Leistungen?",
    description: "Optional — alles was über Dreh & Schnitt hinausgeht.",
    multiSelect: true,
    options: [
      { id: "extra_konzept", title: "Konzept & Strategie", description: "Wir entwickeln den roten Faden, Botschaft und Zielgruppenansprache", basePrice: 380 },
      { id: "extra_script", title: "Script / Drehbuch", description: "Professionell geschriebenes Skript oder Interview-Leitfaden", basePrice: 280 },
      { id: "extra_analyse", title: "Zielgruppen-Analyse", description: "ICP-Definition, Plattformstrategie, Content-Empfehlung", basePrice: 320 },
    ],
  },
  {
    id: "step6_lieferzeit", order: 6,
    title: "Wie schnell brauchst du es?",
    description: "Express-Projekte werden priorisiert und durchgeplant.",
    multiSelect: false,
    options: [
      { id: "normal", title: "Normal (3–4 Wochen)", description: "Entspannte Planung, optimales Ergebnis", basePrice: 0 },
      { id: "express", title: "Express (1–2 Wochen)", description: "Priorität im Kalender, beschleunigter Post-Prozess — +25 % Aufschlag", basePrice: 0, multiplierIndex: 1.25 },
    ],
  },
];

export default function CalculatorAdmin() {
  const [steps, setSteps] = useState<CalculatorStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const data = await getCalculatorConfig();
      if (data && data.length > 0) {
        setSteps(data);
      } else {
        setSteps(DEFAULT_CALCULATOR_STEPS);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCalculatorConfig(steps);
      alert("Konfiguration erfolgreich gespeichert!");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  const loadPremiumFunnel = () => {
    if (!confirm("Möchtest du den neuen regionalen Preis-Funnel (Kaiserslautern -15%) laden?")) return;
    
    setSteps([
      {
        id: "ziel",
        order: 1,
        title: "Was ist das primäre Ziel des Videos?",
        description: "Wähle das Format, das am besten zu deinen Zielen passt.",
        multiSelect: false,
        options: [
          { id: "opt_ziel2", title: "Unternehmens- / Imagefilm", description: "Vertrauen & Sichtbarkeit", basePrice: 3990, isPackage: true },
          { id: "opt_ziel1", title: "Recruiting & Employer Branding", description: "Mehr qualifizierte Bewerber", basePrice: 3820, isPackage: true },
          { id: "opt_ziel3", title: "Social Media Video Ads", description: "Performante Kurz-Werbefilme", basePrice: 1700, isPackage: true },
          { id: "opt_ziel4", title: "Social Media Content (Reels/TikToks)", description: "1 Tag Produktion für massenhaft Content", basePrice: 990, isPackage: true }
        ]
      },
      {
        id: "qualitaet",
        order: 2,
        title: "Wie hoch ist dein Qualitätsanspruch?",
        description: "Entscheidet über Kameras, Licht und Color-Grading-Aufwand.",
        multiSelect: false,
        options: [
          { id: "opt_qual1", title: "Solide & Authentisch", description: "Professioneller Look, echte Einblicke.", basePrice: 0, isPackage: false },
          { id: "opt_qual2", title: "High-End Cinematic", description: "Kino-Look, aufwendiges Licht & Color Grading.", basePrice: 850, isPackage: false }
        ]
      },
      {
        id: "umfang",
        order: 3,
        title: "Wie schätzt du den Produktionsumfang ein?",
        description: "Ein grober Richtwert für die Drehtage.",
        multiSelect: false,
        options: [
          { id: "opt_umf1", title: "Knackig & Effizient", description: "1 intensiver Drehtag vor Ort.", basePrice: 0, isPackage: false },
          { id: "opt_umf2", title: "Umfangreich", description: "2 Drehtage, mehrere Locations.", basePrice: 1200, isPackage: false },
          { id: "opt_umf3", title: "Großprojekt", description: "3+ Drehtage, große Crew.", basePrice: 2500, isPackage: false }
        ]
      },
      {
        id: "addons",
        order: 4,
        title: "Gibt es besondere Wünsche? (Optional)",
        description: "Diese Add-Ons heben dein Video auf das nächste Level.",
        multiSelect: true,
        options: [
          { id: "opt_add1", title: "FPV Drohnenflug / Luftaufnahmen", description: "Atemberaubende Perspektiven.", basePrice: 390, isPackage: false },
          { id: "opt_add2", title: "Professioneller Voiceover", description: "Bekannte Stimmen aus TV/Radio.", basePrice: 450, isPackage: false },
          { id: "opt_add3", title: "3x Social Media Cut-Downs", description: "Kurzversionen im 9:16 Format.", basePrice: 490, isPackage: false },
          { id: "opt_add4", title: "Darsteller / Casting", description: "Externe Models für Werbekampagnen.", basePrice: 850, isPackage: false },
          { id: "opt_add5", title: "Visagist / Maske vor Ort", description: "Für den perfekten Look vor der Kamera.", basePrice: 450, isPackage: false }
        ]
      },
      {
        id: "dringlichkeit",
        order: 5,
        title: "Wie ist deine zeitliche Planung?",
        description: "Wann soll das Projekt fertiggestellt sein?",
        multiSelect: false,
        options: [
          { id: "opt_zeit1", title: "Normale Planung", description: "In den nächsten 4-8 Wochen.", basePrice: 0, isPackage: false, multiplierIndex: 1 },
          { id: "opt_zeit2", title: "Zeitnah", description: "Innerhalb der nächsten 2-4 Wochen.", basePrice: 0, isPackage: false, multiplierIndex: 1 },
          { id: "opt_zeit3", title: "Express-Produktion", description: "Innerhalb von 10 Tagen (+25%).", basePrice: 0, isPackage: false, multiplierIndex: 1.25 }
        ]
      }
    ]);
  };

  const addStep = () => {
    const newStep: CalculatorStep = {
      id: `step_${Date.now()}`,
      order: steps.length + 1,
      title: "Neuer Schritt",
      description: "Beschreibung hier einfügen",
      multiSelect: false,
      options: []
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (index: number, field: keyof CalculatorStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const removeStep = (index: number) => {
    if (confirm("Diesen Schritt wirklich löschen?")) {
      const updated = [...steps];
      updated.splice(index, 1);
      setSteps(updated);
    }
  };

  const addOption = (stepIndex: number) => {
    const updated = [...steps];
    updated[stepIndex].options.push({
      id: `opt_${Date.now()}`,
      title: "Neue Option",
      description: "",
      basePrice: 0
    });
    setSteps(updated);
  };

  const updateOption = (stepIndex: number, optIndex: number, field: keyof CalculatorOption, value: any) => {
    const updated = [...steps];
    updated[stepIndex].options[optIndex] = { ...updated[stepIndex].options[optIndex], [field]: value };
    setSteps(updated);
  };

  const removeOption = (stepIndex: number, optIndex: number) => {
    const updated = [...steps];
    updated[stepIndex].options.splice(optIndex, 1);
    setSteps(updated);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-brand-accent w-8 h-8" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Preisrechner Konfiguration</h2>
          <p className="text-gray-400">Passe die Schritte und Preise für den interaktiven Rechner an.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadPremiumFunnel}
            disabled={saving}
            className="bg-brand-dark border border-brand-accent/30 text-brand-accent px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-accent/10 transition-all cursor-pointer disabled:opacity-50 text-sm"
          >
            Premium Funnel laden
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-brand-accent text-brand-bg px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer hover:scale-105 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Speichern
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((step, sIdx) => (
          <div key={step.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
            <button 
              onClick={() => removeStep(sIdx)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
            
            <div className="flex gap-4 mb-6 pr-12">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Schritt Titel</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(sIdx, "title", e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Beschreibung</label>
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => updateStep(sIdx, "description", e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="w-32 flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={step.multiSelect}
                    onChange={(e) => updateStep(sIdx, "multiSelect", e.target.checked)}
                    className="w-4 h-4 rounded bg-black/40 border-white/10 text-brand-accent focus:ring-brand-accent focus:ring-offset-gray-900"
                  />
                  Mehrfachauswahl
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-300">Optionen:</h4>
              {step.options.map((opt, oIdx) => (
                <div key={opt.id} className="flex gap-3 items-center bg-black/20 p-3 rounded-xl border border-white/5">
                  <GripVertical size={16} className="text-gray-600 cursor-grab" />
                  
                  <input
                    type="text"
                    value={opt.title}
                    onChange={(e) => updateOption(sIdx, oIdx, "title", e.target.value)}
                    placeholder="Titel"
                    className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-accent"
                  />
                  
                  <input
                    type="text"
                    value={opt.description}
                    onChange={(e) => updateOption(sIdx, oIdx, "description", e.target.value)}
                    placeholder="Details"
                    className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-accent"
                  />
                  
                  <div className="w-24 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                    <input
                      type="number"
                      value={opt.basePrice}
                      onChange={(e) => updateOption(sIdx, oIdx, "basePrice", Number(e.target.value))}
                      className="w-full bg-black/40 border border-white/10 rounded pl-7 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <label className="flex items-center gap-1 text-xs text-gray-400">
                    <input
                      type="checkbox"
                      checked={opt.isPackage || false}
                      onChange={(e) => updateOption(sIdx, oIdx, "isPackage", e.target.checked)}
                      className="rounded bg-black/40 border-white/10 text-brand-accent"
                    />
                    Als Basis-Paket (Multiplier)
                  </label>

                  {opt.isPackage && (
                    <input
                      type="number"
                      value={opt.multiplierIndex || 1}
                      onChange={(e) => updateOption(sIdx, oIdx, "multiplierIndex", Number(e.target.value))}
                      placeholder="Faktor (z.B. 1,2,3)"
                      className="w-16 bg-black/40 border border-white/10 rounded px-2 py-1.5 text-sm text-white text-center focus:outline-none focus:border-brand-accent"
                      title="Multiplikator (1=S, 2=M, 3=L, 4=XL)"
                    />
                  )}

                  <button 
                    onClick={() => removeOption(sIdx, oIdx)}
                    className="text-gray-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={() => addOption(sIdx)}
                className="text-sm font-medium text-brand-accent hover:text-white flex items-center gap-1 transition-colors mt-2 cursor-pointer"
              >
                <Plus size={16} />
                Option hinzufügen
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={addStep}
          className="w-full py-4 border-2 border-dashed border-white/10 hover:border-brand-accent/50 rounded-2xl text-gray-400 hover:text-brand-accent flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Plus size={20} />
          Neuen Schritt hinzufügen
        </button>
      </div>
    </div>
  );
}
