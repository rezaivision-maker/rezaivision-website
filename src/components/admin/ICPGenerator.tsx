import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Sparkles, Save, Trash2, Plus, Loader2, Target, Users, AlertTriangle, Lightbulb, UserCheck, Heart } from 'lucide-react';

interface ICPProfile {
  id: string;
  projectName: string; // e.g. "Recruiting Pflegeheim"
  niche: string; // e.g. "Altenpflege"
  serviceDesc: string; // e.g. "Mitarbeitergewinnung durch Social Media Recruiting Videos"
  pricePoint: string;
  persona: {
    name: string;
    alter: string;
    job: string;
    income: string;
    biggest_fear: string;
    biggest_desire: string;
    daily_frustrations: string[];
    objections: Array<{ objection: string; reframing: string }>;
    buying_triggers: string[];
    day_in_life: string;
    recommended_hooks: string[];
    recommended_formats: string[];
    sinusMilieu?: string;
    answerThePublicQuestions?: string[];
  };
  createdAt: string;
}

export default function ICPGenerator() {
  const [profiles, setProfiles] = useState<ICPProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<ICPProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form Inputs
  const [projectName, setProjectName] = useState('');
  const [niche, setNiche] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [pricePoint, setPricePoint] = useState('High-Ticket (ab 5.000€)');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'clientICPs'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as ICPProfile));
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setProfiles(data);
      if (data.length > 0 && !activeProfile) {
        setActiveProfile(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const selectProfile = (p: ICPProfile) => {
    setActiveProfile(p);
    setProjectName(p.projectName);
    setNiche(p.niche);
    setServiceDesc(p.serviceDesc);
    setPricePoint(p.pricePoint);
  };

  const generateICP = async () => {
    if (!projectName.trim() || !niche.trim() || !serviceDesc.trim()) {
      alert('Bitte alle Pflichtfelder ausfüllen (Projektname, Nische, Beschreibung).');
      return;
    }
    setGenerating(true);

    const prompt = `
Du bist ein Weltklasse Buyer Persona & ICP (Ideal Customer Profile) Strategist für Performance Marketing.
Deine Aufgabe ist es, ein extrem detailliertes Kundenprofil (Persona) zu erstellen, basierend auf folgenden Angaben:

Nische / Zielgruppe: "${niche}"
Unser Service / Angebot: "${serviceDesc}"
Preiskategorie: "${pricePoint}"

Deine Analyse MUSS die Werte, Lebensstile und Verhaltensmuster des Heidelberger Sinus-Milieus (wie z.B. Konservativ-Etablierte, Liberal-Intellektuelle, Performer, Expeditiv, Neo-Ökologisch, Adaptiv-Pragmatisch, etc.) berücksichtigen. Zudem musst du Suchfragen und Nutzerintentionen analysieren, wie sie von "Answer the Public" erhoben werden (wer, was, warum, wie, kann man, etc.), um relevante Fragen der Zielgruppe zu identifizieren.

Erstelle ein hochqualitatives, psychologisches Profil in folgendem JSON-Format (GIB AUSSCHLIESSLICH DAS JSON ZURÜCK, kein Markdown):

{
  "name": "Ein passender, fiktiver Name (z.B. Markus, der überlastete Pflegeheim-Inhaber)",
  "alter": "z.B. 42-55 Jahre",
  "job": "Genaue Berufsbezeichnung",
  "income": "Geschätztes Jahresgehalt oder Umsatzniveau (z.B. 80.000€ - 120.000€)",
  "biggest_fear": "Die tiefste, emotionale Angst (z.B. Existenzangst wegen Fachkräftemangel)",
  "biggest_desire": "Das größte, emotionale Ziel (z.B. Entlastung der Belegschaft und automatischer Bewerberstrom)",
  "sinusMilieu": "Die Zuordnung und Begründung dieser Persona zu einem Heidelberger Sinus-Milieu (z.B. 'Performer-Milieu: Fokus auf Effizienz, Leistung und Statussymbole, gekoppelt mit starker Überarbeitung')",
  "daily_frustrations": [
    "Tägliches Frustrations-Beispiel 1",
    "Tägliches Frustrations-Beispiel 2",
    "Tägliches Frustrations-Beispiel 3"
  ],
  "objections": [
    {
      "objection": "Typischer Kauf-Einwand (z.B. 'Keine Zeit für einen Filmdreh')",
      "reframing": "Wie wir diesen Einwand im Video intelligent entkräften (z.B. 'Dreh dauert nur 2 Stunden...')"
    },
    {
      "objection": "Einwand 2",
      "reframing": "Reframing 2"
    },
    {
      "objection": "Einwand 3",
      "reframing": "Reframing 3"
    }
  ],
  "buying_triggers": [
    "Welches spezifische Ereignis bringt ihn JETZT zum Kaufen (z.B. Wiederholte Kündigung von Leistungsträgern)?",
    "Trigger 2",
    "Trigger 3"
  ],
  "answerThePublicQuestions": [
    "Answer the Public Frage 1: z.B. 'Wie gewinne ich Pflegekräfte ohne teure Agentur?'",
    "Answer the Public Frage 2: z.B. 'Warum kündigen Pflegekräfte nach der Einarbeitung?'",
    "Answer the Public Frage 3",
    "Answer the Public Frage 4"
  ],
  "day_in_life": "Ein kurzer, emotionaler Text (4-5 Sätze) über einen typischen, frustrierenden Arbeitstag dieser Persona.",
  "recommended_hooks": [
    "Hook-Vorschlag 1 (negativer Hook)",
    "Hook-Vorschlag 2 (Erfolgs-Hook)",
    "Hook-Vorschlag 3 (Neugier-Hook)"
  ],
  "recommended_formats": [
    "Social Media Format-Typ 1 (z.B. Mythbuster oder Case Study)",
    "Format-Typ 2"
  ]
}
    `;

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      
      let rawJson = data.reply;
      rawJson = rawJson.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
      
      const parsedPersona = JSON.parse(rawJson);

      const newProfile: Omit<ICPProfile, 'id'> = {
        projectName,
        niche,
        serviceDesc,
        pricePoint,
        persona: parsedPersona,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'clientICPs'), newProfile);
      const created = { id: docRef.id, ...newProfile };
      setProfiles([created, ...profiles]);
      setActiveProfile(created);
      alert('ICP Persona erfolgreich generiert und gespeichert!');
    } catch (e) {
      console.error(e);
      alert('Fehler bei der K.I. Generierung. Bitte versuche es erneut.');
    } finally {
      setGenerating(false);
    }
  };

  const deleteProfile = async (id: string) => {
    if (!confirm('Dieses ICP-Profil wirklich löschen?')) return;
    try {
      await deleteDoc(doc(db, 'clientICPs', id));
      const filtered = profiles.filter(p => p.id !== id);
      setProfiles(filtered);
      if (activeProfile?.id === id) {
        setActiveProfile(filtered[0] || null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-[80vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Erstellte Profile</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gray-500" /></div>
          ) : profiles.length === 0 ? (
            <p className="text-gray-500 text-xs text-center py-10">Keine Profile vorhanden.</p>
          ) : (
            profiles.map(p => (
              <div
                key={p.id}
                onClick={() => selectProfile(p)}
                className={`flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all group border ${
                  activeProfile?.id === p.id 
                    ? 'bg-brand-accent/20 text-brand-accent border-brand-accent/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
                }`}
              >
                <div className="flex flex-col truncate pr-2">
                  <span className="font-bold text-sm truncate">{p.projectName}</span>
                  <span className="text-[10px] opacity-70 truncate">{p.niche}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteProfile(p.id); }}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Input Form */}
        <div className="w-1/3 border-r border-white/10 bg-zinc-950/20 p-6 overflow-y-auto space-y-5">
          <h3 className="font-bold text-white text-md flex items-center gap-2">
            <Target className="text-brand-accent" size={18} /> Zielgruppen-Eckdaten
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Projektname *</label>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                placeholder="z.B. Recruiting Pflege"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nische / Branche *</label>
              <input
                type="text"
                value={niche}
                onChange={e => setNiche(e.target.value)}
                placeholder="z.B. Altenpflegeheime"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Unser Angebot / Service *</label>
              <textarea
                value={serviceDesc}
                onChange={e => setServiceDesc(e.target.value)}
                rows={4}
                placeholder="z.B. Premium Social Media Werbevideos zur Gewinnung von Pflegefachkräften."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Preiskategorie</label>
              <select
                value={pricePoint}
                onChange={e => setPricePoint(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
              >
                <option>Low-Ticket (bis 1.000€)</option>
                <option>Mid-Ticket (1.000€ - 5.000€)</option>
                <option>High-Ticket (ab 5.000€)</option>
              </select>
            </div>

            <button
              onClick={generateICP}
              disabled={generating}
              className="w-full bg-brand-accent text-brand-bg py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50"
            >
              {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {generating ? 'K.I. analysiert...' : 'ICP Persona generieren'}
            </button>
          </div>
        </div>

        {/* Right Column: Display Area */}
        <div className="flex-1 bg-zinc-950 p-6 overflow-y-auto space-y-6">
          {activeProfile ? (
            <div className="space-y-6 max-w-3xl">
              {/* Persona Header Card */}
              <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
                  <Users size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">{activeProfile.persona.name}</h4>
                  <p className="text-xs text-brand-accent font-bold mt-1 uppercase tracking-wider">
                    {activeProfile.persona.job} · {activeProfile.persona.alter} · {activeProfile.persona.income}
                  </p>
                </div>
              </div>

              {/* Heidelberger Sinus-Milieu */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-brand-accent font-bold text-xs uppercase tracking-wider">
                  <Target size={14} className="text-brand-accent" /> Heidelberger Sinus-Milieu Einordnung
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                  {activeProfile.persona.sinusMilieu || 'Nicht klassifiziert'}
                </p>
              </div>

              {/* Core Desires & Fears */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <AlertTriangle size={16} /> Core Frust / Angst
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{activeProfile.persona.biggest_fear}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Heart size={16} /> Core Wunsch / Traum
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{activeProfile.persona.biggest_desire}</p>
                </div>
              </div>

              {/* Daily Frustrations */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <h5 className="font-bold text-white text-sm">🔴 Tägliche Hürden & Frustrationen</h5>
                <ul className="space-y-2">
                  {activeProfile.persona.daily_frustrations.map((frust, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{frust}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day in the Life Narrative */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2">
                <h5 className="font-bold text-white text-sm">📆 Ein typischer Arbeitstag (Story)</h5>
                <p className="text-xs text-gray-300 leading-relaxed italic">"{activeProfile.persona.day_in_life}"</p>
              </div>

              {/* Objections & Reframing */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <h5 className="font-bold text-white text-sm">🛡️ Einwandbehandlung (Für Video-Skripte)</h5>
                <div className="space-y-3">
                  {activeProfile.persona.objections.map((obj, idx) => (
                    <div key={idx} className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-1">
                      <p className="text-xs font-bold text-red-400 flex items-center gap-1">❌ Einwand: "{obj.objection}"</p>
                      <p className="text-xs text-emerald-400 font-medium">💡 Reframe: {obj.reframing}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buying Triggers */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <h5 className="font-bold text-white text-sm">⚡ Kauf-Auslöser (Triggers)</h5>
                <ul className="space-y-2">
                  {activeProfile.persona.buying_triggers.map((trig, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-brand-accent font-bold">✓</span>
                      <span>{trig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Answer the Public Fragen */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <h5 className="font-bold text-white text-sm">🔍 Answer the Public (Suchfragen & Intent)</h5>
                <div className="grid grid-cols-1 gap-2">
                  {(activeProfile.persona.answerThePublicQuestions || []).length === 0 ? (
                    <p className="text-xs text-gray-500 italic">Keine Suchfragen definiert.</p>
                  ) : (
                    (activeProfile.persona.answerThePublicQuestions || []).map((q, idx) => (
                      <div key={idx} className="bg-black/30 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                        <span className="text-xs text-brand-accent font-bold mt-0.5">?</span>
                        <span className="text-xs text-gray-300 leading-normal">{q}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Video Specific Recommendations */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <h5 className="font-bold text-white text-sm flex items-center gap-1.5"><Lightbulb size={14} className="text-yellow-400" /> Empfohlene Hook-Winkel</h5>
                  <div className="space-y-2">
                    {activeProfile.persona.recommended_hooks.map((hook, idx) => (
                      <p key={idx} className="text-[11px] text-gray-300 bg-black/30 p-2 rounded border border-white/5">"{hook}"</p>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <h5 className="font-bold text-white text-sm flex items-center gap-1.5"><UserCheck size={14} className="text-brand-accent" /> Empfohlene Formate</h5>
                  <div className="space-y-2">
                    {activeProfile.persona.recommended_formats.map((fmt, idx) => (
                      <p key={idx} className="text-xs text-gray-300 font-semibold bg-brand-accent/5 border border-brand-accent/10 p-2.5 rounded-xl">{fmt}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <Users size={48} className="text-gray-600 mb-4" />
              <h4 className="text-xl font-bold text-white mb-1">Keine K.I. Persona geladen</h4>
              <p className="text-gray-400 text-sm max-w-sm">Fülle links die Eckdaten aus und klicke auf Generieren, um ein psychologisches Zielgruppen-Profil aufzubauen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
