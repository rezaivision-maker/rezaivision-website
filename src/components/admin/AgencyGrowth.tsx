import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { 
  Rocket, Users, MessageSquare, Mail, Briefcase, 
  Target, Loader2, Check, Copy, Wand2, ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Lead {
  id?: string;
  name: string;
  branche?: string;
  potential?: string;
  erstkontak_vorlage?: string;
  status: string;
  notes?: string;
}

interface CIProfile {
  id: string;
  name: string;
  toneOfVoice: string;
  brandValues: string[];
  forbiddenWords: string[];
}

export default function AgencyGrowth() {
  const [activeTab, setActiveTab] = useState<'outreach' | 'hiring'>('outreach');
  
  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ciProfiles, setCiProfiles] = useState<CIProfile[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [selectedCiId, setSelectedCiId] = useState<string>('');
  const [loadingData, setLoadingData] = useState(true);
  
  // Outreach State
  const [outreachChannel, setOutreachChannel] = useState<'email' | 'linkedin'>('linkedin');
  const [outreachContext, setOutreachContext] = useState('');
  const [generatingOutreach, setGeneratingOutreach] = useState(false);
  const [outreachResult, setOutreachResult] = useState('');
  const [copiedOutreach, setCopiedOutreach] = useState(false);
  const [savingOutreach, setSavingOutreach] = useState(false);

  // Hiring State
  const [bottleneck, setBottleneck] = useState('');
  const [currentRevenue, setCurrentRevenue] = useState('0 - 5.000€');
  const [generatingHiring, setGeneratingHiring] = useState(false);
  const [hiringResult, setHiringResult] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoadingData(true);
    try {
      // Fetch Leads
      const leadsSnap = await getDocs(query(collection(db, 'contactLeads'), orderBy('addedAt', 'desc')));
      const leadsData = leadsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Lead));
      // Only show leads that are NOT 'gewonnen' or 'verloren' (we want fresh outreach)
      const openLeads = leadsData.filter(l => l.status !== 'gewonnen' && l.status !== 'verloren');
      setLeads(openLeads);
      if (openLeads.length > 0) setSelectedLeadId(openLeads[0].id || '');

      // Fetch CIs
      const ciSnap = await getDocs(collection(db, 'clientCIs'));
      const ciData = ciSnap.docs.map(d => ({ id: d.id, ...d.data() } as CIProfile));
      setCiProfiles(ciData);
      
      const ownCi = ciData.find(c => c.name.includes('(Selbst)'));
      if (ownCi) {
        setSelectedCiId(ownCi.id);
      } else if (ciData.length > 0) {
        setSelectedCiId(ciData[0].id);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const generateOutreach = async () => {
    if (!selectedLeadId || !selectedCiId) {
      alert("Bitte Lead und CI-Profil auswählen.");
      return;
    }

    setGeneratingOutreach(true);
    setOutreachResult('');

    const lead = leads.find(l => l.id === selectedLeadId);
    const ci = ciProfiles.find(c => c.id === selectedCiId);

    try {
      // Optional: Fetch marketingKnowledge.json if we want to include specific templates.
      // We can just rely on the AI's existing knowledge of Sabri Suby / Marketing, but passing the CI is key.
      
      const prompt = `
Du bist ein Weltklasse Copywriter und Cold-Outreach-Experte (im Stil von Sabri Suby).
Deine Aufgabe ist es, eine ${outreachChannel === 'linkedin' ? 'LinkedIn Direktnachricht' : 'Kalt-Akquise E-Mail'} für eine Premium-Videoproduktionsagentur zu verfassen.

**Über das Unternehmen (Unser Profil):**
- Name: ${ci?.name}
- Tonalität: ${ci?.toneOfVoice}
- Kernwerte: ${ci?.brandValues.join(', ')}
- VERBOTENE WÖRTER: ${ci?.forbiddenWords.join(', ')} (BENUTZE DIESE UNTER KEINEN UMSTÄNDEN!)

**Über den Lead (Empfänger):**
- Name des Unternehmens: ${lead?.name}
- Branche: ${lead?.branche || 'Nicht angegeben'}
- Bekanntes Potenzial: ${lead?.potential || 'Nicht klassifiziert'}
- Notizen/Kontext: ${outreachContext || lead?.notes || 'Keine weiteren Infos'}

Schreibe eine unwiderstehliche, psychologisch optimierte Kalt-Akquise Nachricht.
- KEINE langweiligen "Hallo mein Name ist"-Intros. Starte direkt mit einem starken Hook.
- Addressiere den wahrscheinlichen Schmerzpunkt der Branche (${lead?.branche}).
- Baue einen Call to Action am Ende ein (z.B. ein 5-Minuten Chat, kein harter Pitch).
- Max. 120-150 Wörter.
- Tonalität muss exakt zum CI-Profil passen.
      `;

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      setOutreachResult(data.reply);
      
    } catch (err) {
      console.error(err);
      alert('Fehler bei der Generierung.');
    } finally {
      setGeneratingOutreach(false);
    }
  };

  const saveOutreachToLead = async () => {
    if (!selectedLeadId || !outreachResult) return;
    setSavingOutreach(true);
    try {
      const docRef = doc(db, 'contactLeads', selectedLeadId);
      await updateDoc(docRef, {
        erstkontak_vorlage: outreachResult
      });
      // Update local state
      setLeads(leads.map(l => l.id === selectedLeadId ? { ...l, erstkontak_vorlage: outreachResult } : l));
      alert('Nachricht erfolgreich im Lead-Profil gespeichert!');
    } catch (err) {
      console.error(err);
      alert('Fehler beim Speichern.');
    } finally {
      setSavingOutreach(false);
    }
  };

  const copyOutreach = () => {
    navigator.clipboard.writeText(outreachResult);
    setCopiedOutreach(true);
    setTimeout(() => setCopiedOutreach(false), 2000);
  };

  const generateHiringPlan = async () => {
    if (!bottleneck) {
      alert("Bitte beschreibe dein aktuelles Problem / Nadelöhr.");
      return;
    }

    setGeneratingHiring(true);
    setHiringResult('');

    try {
      const prompt = `
Du bist ein erfahrener Agency Scaling Consultant und Mentor für den Inhaber einer High-End Videoproduktion (Rezai Vision).
Sein Ziel: Aus dem "Hustle" rauskommen, Systeme bauen und Freelancer einstellen.

**Aktuelle Situation:**
- Umsatz-Level: ${currentRevenue}
- Aktuelles Problem / Nadelöhr: ${bottleneck}

Schreibe einen strategischen Action-Plan, wen er ALS NÄCHSTES einstellen sollte (z.B. Video Editor, Setter, Closer, PA) und erstelle dazu eine Mini-Stellenausschreibung sowie eine Übersicht der SOP (Standard Operating Procedure), die er dafür aufbauen muss.

Struktur der Antwort:
1. **Der strategische Rat** (Kurze Analyse der Situation).
2. **Die nächste Einstellung** (Wer & Warum).
3. **Draft Job Description** (Titel, Aufgaben, Anforderungen - psychologisch attraktiv für Top-Talente).
4. **Benötigte SOPs** (3-4 Punkte, was er dokumentieren muss, bevor der Freelancer startet).
      `;

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      setHiringResult(data.reply);
      
    } catch (err) {
      console.error(err);
      alert('Fehler bei der Generierung.');
    } finally {
      setGeneratingHiring(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-black/40 border border-white/10 rounded-2xl">
        <Loader2 className="animate-spin text-brand-accent w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[85vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-white/5 shrink-0">
        <button 
          onClick={() => setActiveTab('outreach')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'outreach' ? 'border-brand-accent text-brand-accent bg-brand-accent/5' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Rocket size={16} /> Outbound K.I. (Akquise)
        </button>
        <button 
          onClick={() => setActiveTab('hiring')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'hiring' ? 'border-brand-accent text-brand-accent bg-brand-accent/5' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Users size={16} /> Scaling & Hiring Advisor
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {/* OUTREACH TAB */}
        {activeTab === 'outreach' && (
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Left Col: Config */}
            <div className="w-full lg:w-1/3 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Target className="text-brand-accent" size={20} /> Kampagnen Setup
                </h3>
                <p className="text-sm text-gray-400">Passe die Parameter für deine nächste Outreach-Nachricht an.</p>
              </div>

              <div className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-xl">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ziel-Lead auswählen</label>
                  <select 
                    value={selectedLeadId} 
                    onChange={e => setSelectedLeadId(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-accent"
                  >
                    {leads.length === 0 && <option value="">Keine offenen Leads gefunden</option>}
                    {leads.map(l => (
                      <option key={l.id} value={l.id}>{l.name} {l.branche ? `(${l.branche})` : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Dein CI-Profil (Absender)</label>
                  <select 
                    value={selectedCiId} 
                    onChange={e => setSelectedCiId(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-accent"
                  >
                    {ciProfiles.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kanal</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setOutreachChannel('linkedin')}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${outreachChannel === 'linkedin' ? 'bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/50' : 'bg-black/40 text-gray-400 border border-transparent'}`}
                    >
                      <MessageSquare size={16} /> LinkedIn
                    </button>
                    <button 
                      onClick={() => setOutreachChannel('email')}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${outreachChannel === 'email' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'bg-black/40 text-gray-400 border border-transparent'}`}
                    >
                      <Mail size={16} /> E-Mail
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Zusätzlicher Kontext (Optional)</label>
                  <textarea 
                    value={outreachContext}
                    onChange={e => setOutreachContext(e.target.value)}
                    placeholder="z.B. Habe seinen letzten Post über Recruiting-Probleme gesehen..."
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent resize-none"
                  />
                </div>

                <button 
                  onClick={generateOutreach}
                  disabled={generatingOutreach || leads.length === 0}
                  className="w-full bg-brand-accent text-brand-bg py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {generatingOutreach ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
                  {generatingOutreach ? 'K.I. schreibt...' : 'Nachricht generieren'}
                </button>
              </div>
            </div>

            {/* Right Col: Result */}
            <div className="w-full lg:w-2/3 flex flex-col">
              {!outreachResult && !generatingOutreach ? (
                <div className="flex-1 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 p-8 text-center min-h-[400px]">
                  <MessageSquare size={48} className="mb-4 opacity-50" />
                  <p className="font-bold text-lg text-white mb-2">Keine Nachricht generiert</p>
                  <p className="max-w-md">Wähle links einen Lead und klicke auf "Generieren", um eine K.I.-gestützte Akquise-Nachricht zu erstellen.</p>
                </div>
              ) : (
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden min-h-[400px]">
                  <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                      <Sparkles size={16} className="text-brand-accent" />
                      Dein Outreach-Entwurf
                    </div>
                    <div className="flex gap-2">
                      {outreachResult && (
                        <>
                          <button onClick={saveOutreachToLead} disabled={savingOutreach} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2">
                            {savingOutreach ? <Loader2 size={12} className="animate-spin" /> : <ArrowRight size={12} />}
                            Im Lead speichern
                          </button>
                          <button onClick={copyOutreach} className="bg-brand-accent text-brand-bg px-3 py-1.5 rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2">
                            {copiedOutreach ? <Check size={12} /> : <Copy size={12} />}
                            {copiedOutreach ? 'Kopiert' : 'Kopieren'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    {generatingOutreach ? (
                      <div className="flex flex-col items-center justify-center h-full text-brand-accent">
                        <Loader2 size={32} className="animate-spin mb-4" />
                        <p className="font-bold animate-pulse">Optimiere Psychologie & Tonalität...</p>
                      </div>
                    ) : (
                      <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-[15px]">
                        {outreachResult}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* HIRING TAB */}
        {activeTab === 'hiring' && (
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/3 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Briefcase className="text-brand-accent" size={20} /> Wachstums-Berater
                </h3>
                <p className="text-sm text-gray-400">Nutze K.I. um systematisch Engpässe zu lösen und Freelancer einzustellen.</p>
              </div>

              <div className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-xl">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Aktueller Monatsumsatz</label>
                  <select 
                    value={currentRevenue} 
                    onChange={e => setCurrentRevenue(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option>0 - 5.000€</option>
                    <option>5.000€ - 10.000€</option>
                    <option>10.000€ - 30.000€</option>
                    <option>30.000€+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Dein größtes Nadelöhr (Bottleneck)</label>
                  <textarea 
                    value={bottleneck}
                    onChange={e => setBottleneck(e.target.value)}
                    placeholder="z.B. Ich sitze 40 Stunden pro Woche nur im Schnitt und habe keine Zeit für Neukundenakquise."
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent resize-none"
                  />
                </div>

                <button 
                  onClick={generateHiringPlan}
                  disabled={generatingHiring || !bottleneck}
                  className="w-full bg-brand-accent text-brand-bg py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {generatingHiring ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
                  {generatingHiring ? 'Analysiere...' : 'Action-Plan generieren'}
                </button>
              </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col">
              {!hiringResult && !generatingHiring ? (
                <div className="flex-1 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 p-8 text-center min-h-[400px]">
                  <Users size={48} className="mb-4 opacity-50" />
                  <p className="font-bold text-lg text-white mb-2">Warte auf Input</p>
                  <p className="max-w-md">Beschreibe dein Nadelöhr und die K.I. erstellt einen klaren Einstellungs-Plan mit Job Descriptions.</p>
                </div>
              ) : (
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden min-h-[400px]">
                  <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                      <Sparkles size={16} className="text-brand-accent" />
                      Dein Action-Plan
                    </div>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto prose prose-invert max-w-none">
                    {generatingHiring ? (
                      <div className="flex flex-col items-center justify-center h-full text-brand-accent mt-20">
                        <Loader2 size={32} className="animate-spin mb-4" />
                        <p className="font-bold animate-pulse">Schreibe Strategie und Stellenausschreibung...</p>
                      </div>
                    ) : (
                      <ReactMarkdown>{hiringResult}</ReactMarkdown>
                    )}
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

// Quick component for the little icons
function Sparkles({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
