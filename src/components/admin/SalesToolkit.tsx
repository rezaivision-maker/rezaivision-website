import React, { useState } from 'react';
import { Wand2, Loader2, Copy, Check, Brain, Target, Shield, Mic, ChevronRight, Zap } from 'lucide-react';

// ── Psychology Frameworks ──
const PSYCHOLOGY_FRAMEWORKS = [
  {
    name: 'AIDA',
    icon: '🧲',
    description: 'Attention → Interest → Desire → Action',
    fields: [
      { key: 'product', label: 'Dein Produkt / Dienstleistung', placeholder: 'z.B. Recruiting-Video Produktion' },
      { key: 'audience', label: 'Zielgruppe', placeholder: 'z.B. HR-Manager von Pflegeheimen' },
    ],
    systemPrompt: (fields: Record<string, string>) => `
Du bist ein erstklassiger Verkaufspsychologe und Copywriter für Rezai Vision (Premium Videoproduktion).
Schreibe einen psychologisch optimierten AIDA-Text.

Produkt: ${fields.product}
Zielgruppe: ${fields.audience}

Gliedere den Text klar in 4 Abschnitte:
**ATTENTION** (Aufmerksamkeit – kraftvoller Hook, erschüttert die Überzeugung)
**INTEREST** (Interesse – zeigt Relevanz, spricht den Schmerz an)
**DESIRE** (Verlangen – malt das perfekte Ergebnis, emotionale Bilder)
**ACTION** (Aktion – klarer, dringlicher CTA)

Schreibe auf Deutsch. Tonalität: professionell aber emotional. Verwende keine generischen Phrasen.
    `,
  },
  {
    name: 'PAS Framework',
    icon: '🎯',
    description: 'Problem → Agitation → Solution',
    fields: [
      { key: 'problem', label: 'Das Kernproblem des Kunden', placeholder: 'z.B. Pflegeheim findet keine neuen Mitarbeiter' },
      { key: 'solution', label: 'Deine Lösung', placeholder: 'z.B. Emotionales Recruiting-Video' },
    ],
    systemPrompt: (fields: Record<string, string>) => `
Du bist Verkaufspsychologe und Meister der PAS-Methode.

Problem: ${fields.problem}
Lösung: ${fields.solution}

Schreibe einen kurzen, intensiven PAS-Text (perfekt für Instagram Captions oder Landingpage Intro):

**PROBLEM**: Benenne das Problem knapp und präzise.
**AGITATION**: Verschärfe den Schmerz. Was passiert, wenn das Problem bestehen bleibt? Zeige emotionale und wirtschaftliche Konsequenzen.
**SOLUTION**: Präsentiere die Lösung als den einzigen logischen Ausweg.

Maximal 150 Wörter. Deutsch. Keine Floskeln.
    `,
  },
  {
    name: 'Einwand-Behandler',
    icon: '🛡️',
    description: 'Kundeneinwände mit Psychologie entwaffnen',
    fields: [
      { key: 'objection', label: 'Der Einwand des Kunden', placeholder: 'z.B. "Das ist zu teuer für uns"' },
      { key: 'context', label: 'Kontext', placeholder: 'z.B. 5.000€ Angebot für Recruiting-Video' },
    ],
    systemPrompt: (fields: Record<string, string>) => `
Du bist Verhandlungspsychologe und Verkaufs-Coach. 
Kontext: Rezai Vision, Premium-Videoproduktion, Kaiserslautern.

Einwand: "${fields.objection}"
Kontext: ${fields.context}

Gib mir 5 verschiedene Strategien zur Einwand-Behandlung:

1. **Reframing** – Das Problem aus einer anderen Perspektive zeigen
2. **Zahlen & ROI** – Den wirtschaftlichen Nutzen konkret berechnen
3. **Soziale Bewährtheit** – Vergleiche und Referenzen nutzen
4. **Feel-Felt-Found** – Empathie-Technik
5. **Future Pacing** – Den Kunden in die Zukunft nach dem Kauf führen

Jede Strategie mit einem konkreten Gesprächs-Skript (2-3 Sätze). Direkte Ansprache, keine Theorie.
    `,
  },
  {
    name: 'Storytelling-Skript',
    icon: '📖',
    description: 'Virales Before/After Story-Skript',
    fields: [
      { key: 'clientType', label: 'Kundentyp', placeholder: 'z.B. Autohaus Besitzer' },
      { key: 'result', label: 'Das Ergebnis nach der Zusammenarbeit', placeholder: 'z.B. 40% mehr Bewerber in 3 Monaten' },
    ],
    systemPrompt: (fields: Record<string, string>) => `
Du bist ein viraler Content Creator und Storyteller. 
Schreibe ein Before/After Storytelling-Skript für einen 60-90 Sekunden Reel oder LinkedIn Video.

Protagonist: ${fields.clientType}
Ergebnis: ${fields.result}
Erzähler: Parsha von Rezai Vision

Struktur:
**HOOK** (0-3 Sek): Schockierende Aussage oder Frage – sofort Aufmerksamkeit grabben
**BEFORE** (3-20 Sek): Der Schmerz, die Situation vor der Zusammenarbeit
**TURNING POINT** (20-35 Sek): Die Entscheidung / Was hat sich verändert?
**AFTER** (35-55 Sek): Das Ergebnis, konkrete Zahlen, Emotionen
**CTA** (55-65 Sek): Was soll der Zuschauer jetzt tun?

Schreibe das Skript als direkte Sprache, die man vorlesen kann. Authentisch, nicht werblich.
    `,
  },
  {
    name: 'Pain/Gain Profiler',
    icon: '🔬',
    description: 'Tiefste Kundenmotive aufdecken',
    fields: [
      { key: 'industry', label: 'Branche / Kundentyp', placeholder: 'z.B. Pflegeheime in Deutschland' },
      { key: 'product', label: 'Dein Angebot', placeholder: 'z.B. Recruiting-Video Produktion' },
    ],
    systemPrompt: (fields: Record<string, string>) => `
Du bist Verkaufspsychologe mit Expertise in Behavioral Economics.

Branche: ${fields.industry}
Angebot: ${fields.product}

Erstelle ein detailliertes Pain/Gain Profil:

**🔴 TOP 8 SCHMERZEN** (Ängste, Frustrationen, Verluste, Risiken – sortiert nach Intensität)
Für jeden Schmerz: Was ist die tiefste emotionale Ursache?

**🟢 TOP 8 GEWINNE** (Träume, Wünsche, Statussignale, Erleichterungen – sortiert nach Bedeutung)
Für jeden Gewinn: Welche Emotion wird dadurch befriedigt?

**⚡ TOP 3 TRIGGER-WORTE** für Headline und CTA (die Worte, die diese Zielgruppe magisch ansprechen)

Psychologisch fundiert. Keine Allgemeinplätze.
    `,
  },
  {
    name: 'Cialdini Principles',
    icon: '⚡',
    description: 'Alle 7 Einflussnahme-Prinzipien angewendet',
    fields: [
      { key: 'offer', label: 'Dein Angebot', placeholder: 'z.B. Recruiting-Video Paket' },
      { key: 'price', label: 'Preis/Investment', placeholder: 'z.B. 3.500€' },
    ],
    systemPrompt: (fields: Record<string, string>) => `
Du bist Experte für Cialdinis "Influence" Prinzipien.
Angebot: ${fields.offer} für ${fields.price}.

Erkläre wie jedes der 7 Prinzipien konkret in meiner Verkaufskommunikation eingesetzt werden kann:

1. **Reziprozität** – Konkrete Umsetzung
2. **Commitment & Konsistenz** – Konkrete Umsetzung  
3. **Soziale Bewährtheit** – Konkrete Umsetzung
4. **Sympathie** – Konkrete Umsetzung
5. **Autorität** – Konkrete Umsetzung
6. **Knappheit** – Konkrete Umsetzung
7. **Einheit** – Konkrete Umsetzung (Cialdini's neuestes Prinzip)

Für jedes Prinzip: 1 konkretes Beispiel + 1 Formulierungsvorschlag für meine Landingpage/Angebot.
    `,
  },
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function SalesToolkit() {
  const [selectedFramework, setSelectedFramework] = useState<typeof PSYCHOLOGY_FRAMEWORKS[0] | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!selectedFramework) return;
    const missing = selectedFramework.fields.find(f => !fieldValues[f.key]?.trim());
    if (missing) { alert(`Bitte "${missing.label}" ausfüllen.`); return; }
    setGenerating(true);
    setResult('');

    try {
      const prompt = selectedFramework.systemPrompt(fieldValues);
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.reply);
    } catch (e) {
      alert('Fehler bei der KI-Generierung.');
    } finally {
      setGenerating(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectFramework = (fw: typeof PSYCHOLOGY_FRAMEWORKS[0]) => {
    setSelectedFramework(fw);
    setFieldValues({});
    setResult('');
  };

  return (
    <div className="flex flex-col md:flex-row h-[90vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">

      {/* Left Sidebar – Framework Picker */}
      <div className="w-full md:w-72 bg-white/5 border-r border-white/10 flex flex-col overflow-hidden shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="text-brand-accent w-5 h-5" />
            <h2 className="font-bold text-white">Sales & Psychologie</h2>
          </div>
          <p className="text-xs text-gray-500">Wähle ein Framework und lass die KI dein Verkaufstool bauen.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {PSYCHOLOGY_FRAMEWORKS.map(fw => (
            <button
              key={fw.name}
              onClick={() => selectFramework(fw)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all group ${
                selectedFramework?.name === fw.name
                  ? 'bg-brand-accent/20 border border-brand-accent/40 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{fw.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{fw.name}</p>
                  <p className="text-xs text-gray-500 truncate">{fw.description}</p>
                </div>
                <ChevronRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-lg p-3">
            <p className="text-xs text-brand-accent font-bold mb-1">💡 Profi-Tipp</p>
            <p className="text-xs text-gray-400">Kombiniere mehrere Frameworks: Beginne mit Pain/Gain, nutze dann AIDA für die Landingpage und den Einwand-Behandler im Gespräch.</p>
          </div>
        </div>
      </div>

      {/* Right – Workspace */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {!selectedFramework ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Brain className="w-16 h-16 text-gray-700 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Psychologie-Toolkit</h3>
            <p className="text-gray-400 max-w-md text-lg">
              Wähle links ein Framework aus, um psychologisch optimierte Verkaufstexte, Einwand-Behandlungen und Kunden-Profile zu generieren.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 max-w-lg">
              {PSYCHOLOGY_FRAMEWORKS.map(fw => (
                <button
                  key={fw.name}
                  onClick={() => selectFramework(fw)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all"
                >
                  <span className="text-2xl mb-2 block">{fw.icon}</span>
                  <p className="font-bold text-white text-sm">{fw.name}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">{selectedFramework.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedFramework.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedFramework.description}</p>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="p-6 border-b border-white/10 bg-white/5 shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedFramework.fields.map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{field.label} *</label>
                    <input
                      type="text"
                      value={fieldValues[field.key] || ''}
                      onChange={e => setFieldValues({ ...fieldValues, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                      onKeyDown={e => e.key === 'Enter' && generate()}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={generate}
                disabled={generating}
                className="w-full md:w-auto bg-brand-accent text-brand-bg px-8 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-brand-accent/20"
              >
                {generating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                {generating ? 'KI denkt...' : 'Generieren'}
              </button>
            </div>

            {/* Result */}
            <div className="flex-1 overflow-y-auto p-6">
              {!result && !generating && (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
                  <Wand2 size={40} className="mb-4" />
                  <p>Fülle die Felder aus und klicke "Generieren"</p>
                </div>
              )}
              {generating && (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="animate-spin text-brand-accent w-10 h-10 mb-4" />
                  <p className="text-gray-400">KI analysiert und schreibt...</p>
                </div>
              )}
              {result && !generating && (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/20">
                    <span className="text-sm font-bold text-gray-400">Ergebnis</span>
                    <button
                      onClick={copyResult}
                      className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Kopiert!' : 'Alles kopieren'}
                    </button>
                  </div>
                  <div className="p-6 prose prose-invert max-w-none">
                    <div className="text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">
                      {result.split('**').map((part, i) =>
                        i % 2 === 1
                          ? <strong key={i} className="text-brand-accent font-bold">{part}</strong>
                          : <span key={i}>{part}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
