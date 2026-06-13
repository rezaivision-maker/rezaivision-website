import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Save, FileVideo, Wand2, Loader2, Plus, Trash2, Printer, AlignLeft, ListVideo, PenTool, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import marketingKnowledge from '../../../api/data/marketingKnowledge.json';

interface Shot {
  id: string;
  shotNumber: number;
  location: string;
  shotType: string; // e.g., "Close Up", "Wide Shot"
  action: string;
  equipment: string;
  motionGraphic?: {
    preset: 'lower-third' | 'social-callout' | 'kinetic' | 'wipe' | 'cta';
    text1: string;
    text2?: string;
    description: string;
  };
}

interface ProductionProject {
  id: string;
  title: string;
  clientName: string;
  script: string;
  shotlist: Shot[];
  status?: string;
  ciProfileId?: string;
  icpProfileId?: string;
  createdAt: string;
}

export default function ProductionSuite() {
  const [projects, setProjects] = useState<ProductionProject[]>([]);
  const [activeProject, setActiveProject] = useState<ProductionProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  // Local state for edits
  const [scriptContent, setScriptContent] = useState('');
  
  // UI Tabs
  const [activeTab, setActiveTab] = useState<'script' | 'shotlist'>('script');

  // CI/ICP & Briefing states
  const [ciProfiles, setCiProfiles] = useState<any[]>([]);
  const [icpProfiles, setIcpProfiles] = useState<any[]>([]);
  const [selectedCiId, setSelectedCiId] = useState('');
  const [selectedIcpId, setSelectedIcpId] = useState('');
  const [briefing, setBriefing] = useState('');
  const [generatingScript, setGeneratingScript] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects();
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const ciSnap = await getDocs(collection(db, 'clientCIs'));
      const ciData = ciSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setCiProfiles(ciData);

      const icpSnap = await getDocs(collection(db, 'clientICPs'));
      const icpData = icpSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setIcpProfiles(icpData);
    } catch (e) {
      console.error("Error loading CI/ICP profiles in ProductionSuite:", e);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'productionProjects'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as ProductionProject));
      // Sort by newest
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setProjects(data);
      if (data.length > 0 && !activeProject) {
        selectProject(data[0]);
      }
    } catch (e) {
      console.error('Error fetching projects:', e);
    } finally {
      setLoading(false);
    }
  };

  const selectProject = (project: ProductionProject) => {
    setActiveProject(project);
    setScriptContent(project.script || '');
    setSelectedCiId(project.ciProfileId || '');
    setSelectedIcpId(project.icpProfileId || '');
  };

  const createNewProject = async () => {
    const title = prompt('Name des neuen Projekts (z.B. "Imagefilm Autohaus"):');
    if (!title) return;
    
    const newProj = {
      title,
      clientName: '',
      script: '',
      shotlist: [],
      ciProfileId: '',
      icpProfileId: '',
      createdAt: new Date().toISOString()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'productionProjects'), newProj);
      const created = { id: docRef.id, ...newProj };
      setProjects([created, ...projects]);
      selectProject(created);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Erstellen.');
    }
  };

  const saveProject = async () => {
    if (!activeProject) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'productionProjects', activeProject.id);
      await updateDoc(docRef, { 
        script: scriptContent,
        ciProfileId: selectedCiId,
        icpProfileId: selectedIcpId
      });
      const updated = { 
        ...activeProject, 
        script: scriptContent,
        ciProfileId: selectedCiId,
        icpProfileId: selectedIcpId
      };
      setProjects(projects.map(p => p.id === activeProject.id ? updated : p));
      setActiveProject(updated);
      alert('Projekt erfolgreich gespeichert!');
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern.');
    } finally {
      setSaving(false);
    }
  };

  const generateShotlist = async () => {
    if (!activeProject || !scriptContent) {
      alert("Bitte schreibe zuerst ein Skript!");
      return;
    }
    
    setGenerating(true);
    
    const selectedCi = ciProfiles.find(p => p.id === selectedCiId);
    const selectedIcp = icpProfiles.find(p => p.id === selectedIcpId);
    
    let brandDesignContext = "";
    if (selectedCi) {
      brandDesignContext = `
Corporate Design Farben für Motion Graphics:
- Primärfarbe: ${selectedCi.primaryColor}
- Sekundärfarbe: ${selectedCi.secondaryColor}
- Akzentfarbe: ${selectedCi.accentColor}
- Schriftart: ${selectedCi.fontFamily}
- Tone of Voice: ${selectedCi.toneOfVoice}
Achte darauf, diese Designfarben in den Text1/Text2 Vorschlägen der Motion Graphics oder in der Regieanweisung zu erwähnen.
      `;
    }

    let targetAudienceContext = "";
    if (selectedIcp) {
      targetAudienceContext = `
Zielgruppe (ICP):
- Name: ${selectedIcp.persona.name}
- Job: ${selectedIcp.persona.job}
- Heidelberg Sinus-Milieu: ${selectedIcp.persona.sinusMilieu || 'Nicht angegeben'}
- Answer the Public Suchanfragen: ${(selectedIcp.persona.answerThePublicQuestions || []).join(', ')}
Der visuelle Stil und die B-Rolls sollten auf diese Zielgruppe abgestimmt sein.
      `;
    }

    const prompt = `
Du bist ein professioneller Regisseur und Kameramann.
Hier ist das Skript/Konzept für ein Video:
"""
${scriptContent}
"""

${brandDesignContext}
${targetAudienceContext}

Deine Aufgabe:
Erstelle eine professionelle, tabellarische Shotlist im JSON-Format.
Unterteile das Video in logische chronologische Shots.
GIB AUSSCHLIESSLICH EIN GÜLTIGES JSON-ARRAY ZURÜCK. Kein Markdown drumherum.

Format für jeden Shot im JSON Array:
[
  {
    "shotNumber": 1,
    "location": "Innenstadt / Straße",
    "shotType": "Wide Shot / Drohne",
    "action": "Kamera fliegt über die Straße, Protagonist läuft ins Bild.",
    "equipment": "Mavic 3 Pro",
    "motionGraphic": {
      "preset": "lower-third",  // optional: "lower-third" | "social-callout" | "kinetic" | "wipe" | "cta" (nur falls passend für diesen Shot, sonst weglassen)
      "text1": "Max Rezai",     // z.B. Name des Sprechers, Social Handle (@rezaivision) oder Button Text
      "text2": "Director",      // optional: Untertitel / Jobtitel (nur bei preset lower-third)
      "description": "Bauchbinde zur Vorstellung von Max"
    }
  }
]
    `;

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      
      let rawJson = data.reply;
      // Clean up markdown formatting if AI added it
      rawJson = rawJson.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
      
      const parsedShots = JSON.parse(rawJson);
      
      // Save to Firebase
      const docRef = doc(db, 'productionProjects', activeProject.id);
      await updateDoc(docRef, { shotlist: parsedShots });
      
      const updatedProject = { ...activeProject, shotlist: parsedShots };
      setActiveProject(updatedProject);
      setProjects(projects.map(p => p.id === activeProject.id ? updatedProject : p));
      setActiveTab('shotlist');
      
    } catch (err) {
      console.error(err);
      alert('Fehler bei der K.I. Generierung. Die K.I. hat vermutlich ein falsches Format geliefert.');
    } finally {
      setGenerating(false);
    }
  };

  const generateScript = async () => {
    if (!activeProject) return;
    if (!selectedCiId || !selectedIcpId || !briefing.trim()) {
      alert("Bitte wähle ein CI-Profil, ein ICP-Profil und gib ein Kurz-Briefing ein.");
      return;
    }

    setGeneratingScript(true);

    const selectedCi = ciProfiles.find(p => p.id === selectedCiId);
    const selectedIcp = icpProfiles.find(p => p.id === selectedIcpId);

    if (!selectedCi || !selectedIcp) {
      alert("Ausgewählte Profile konnten nicht gefunden werden.");
      setGeneratingScript(false);
      return;
    }

    const brandValuesStr = (selectedCi.brandValues || []).join(", ");
    const forbiddenWordsStr = (selectedCi.forbiddenWords || []).join(", ");
    
    const p = selectedIcp.persona;
    const dailyFrustrationsStr = (p.daily_frustrations || []).join("\n- ");
    const objectionsStr = (p.objections || []).map((o: any) => `Einwand: ${o.objection} -> Reframe: ${o.reframing}`).join("\n");
    const buyingTriggersStr = (p.buying_triggers || []).join("\n- ");
    
    const sinusMilieuStr = p.sinusMilieu || 'Nicht explizit angegeben';
    const answerThePublicStr = (p.answerThePublicQuestions || []).join("\n- ");

    // Extract storytelling outlines and samples of formats and hooks from imported marketingKnowledge
    const storytellingOutline = JSON.stringify(marketingKnowledge.storytelling_psychology, null, 2);
    const formatsOutline = JSON.stringify(marketingKnowledge.social_media_formats_top50.slice(0, 15), null, 2);
    const hooksOutline = JSON.stringify(marketingKnowledge.hooks_250_edition_2026.slice(0, 30), null, 2);

    const prompt = `
Du bist ein weltklasse Social-Media-Copywriter und Video-Strategist für Rezai Vision.
Deine Aufgabe ist es, ein hochkonvertierendes Video-Skript (ca. 45-60 Sekunden, ca. 120-150 Wörter gesprochener Text) zu schreiben.

Hier ist das Kunden-Briefing für das Video:
"${briefing}"

Dieses Skript MUSS perfekt auf die folgende Zielgruppe (ICP Persona) und deren psychologisches Profil abgestimmt sein:
### Zielgruppen-Profil (ICP):
- Name: ${p.name}
- Alter: ${p.alter}
- Job: ${p.job}
- Einkommen: ${p.income}
- Primäre Angst/Frust: ${p.biggest_fear}
- Primärer Wunsch/Ziel: ${p.biggest_desire}
- Heidelberg Sinus-Milieu Einordnung: ${sinusMilieuStr}
- Tägliche Hürden:
- ${dailyFrustrationsStr}
- Typische Kauf-Einwände & Reframings:
${objectionsStr}
- Kauf-Auslöser (Triggers):
- ${buyingTriggersStr}
- Answer the Public (Suchfragen & Intent):
- ${answerThePublicStr}

### Corporate Identity (CI) Richtlinien:
- Tonalität / Tone of Voice: ${selectedCi.toneOfVoice}
- Markenwerte: ${brandValuesStr}
- Auszuschließende Begriffe (ABSOLUTES VERBOT): ${forbiddenWordsStr ? forbiddenWordsStr : 'Keine'}

### Marketing-Psychologie (Verwende diese Frameworks):
${storytellingOutline}

### Erlaubte Hook-Vorlagen & Social-Media-Formate:
Wähle das am besten passende Format aus diesen Beispielen aus:
${formatsOutline}

Und wähle oder adaptiere einen Hook aus diesen Beispielen:
${hooksOutline}

### Richtlinien für das Skript:
1. Beginne das Skript DIREKT mit einem extrem starken verbalen Hook in den ersten 3 Sekunden. Verwende ein Negativ-Framing oder Neugier-Hook, das die Sinus-Milieu-Werte und Suchfragen (Answer the Public) anspricht.
2. Baue mindestens einen Open Loop in der Mitte des Skripts ein.
3. Behandle mindestens einen der typischen Einwände (Objections) auf clevere Weise und entkräfte ihn (Reframe).
4. Das Skript muss im genauen Tone of Voice geschrieben sein. Vermeide alle verbotenen Begriffe!
5. Schreibe das Skript im deutschen Sprachgebrauch (Du/Sie passend zur Zielgruppe/Tonalität).
6. Kennzeichne visuelle Regieanweisungen und B-Roll Vorschläge in eckigen Klammern [z.B. Kamera schwenkt auf überarbeiteten Chef].

Schreibe das Skript direkt hin. Gib nur das fertige Skript zurück, ohne Kommentare vorab oder danach.
    `;

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      
      if (data.reply) {
        setScriptContent(data.reply);
        // Save automatically to Firestore
        const docRef = doc(db, 'productionProjects', activeProject.id);
        await updateDoc(docRef, { 
          script: data.reply,
          ciProfileId: selectedCiId,
          icpProfileId: selectedIcpId
        });
        setProjects(projects.map(p => p.id === activeProject.id ? { 
          ...p, 
          script: data.reply,
          ciProfileId: selectedCiId,
          icpProfileId: selectedIcpId
        } : p));
        setActiveProject({ 
          ...activeProject, 
          script: data.reply,
          ciProfileId: selectedCiId,
          icpProfileId: selectedIcpId
        });
        alert("Skript erfolgreich generiert!");
      }
    } catch (err) {
      console.error(err);
      alert("Fehler bei der K.I.-Generierung des Skripts.");
    } finally {
      setGeneratingScript(false);
    }
  };

  const printDocument = () => {
    window.print();
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Dieses Projekt wirklich löschen?')) return;
    try {
      await deleteDoc(doc(db, 'productionProjects', id));
      setProjects(projects.filter(p => p.id !== id));
      if (activeProject?.id === id) setActiveProject(null);
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-[80vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden print-container">
      
      {/* Sidebar - Hidden when printing */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col no-print">
        <div className="p-4 border-b border-white/10">
          <button 
            onClick={createNewProject}
            className="w-full bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <Plus size={16} /> Neues Projekt
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gray-500" /></div>
          ) : projects.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-10">Keine Projekte vorhanden.</p>
          ) : (
            projects.map(p => (
              <div 
                key={p.id}
                onClick={() => selectProject(p)}
                className={`flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all ${
                  activeProject?.id === p.id ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className="font-bold text-sm truncate pr-2">{p.title}</span>
                <button onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }} className="opacity-0 group-hover:opacity-100 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950 print-workspace" ref={printRef}>
        {activeProject ? (
          <>
            {/* Header - Partially hidden when printing */}
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FileVideo className="text-brand-accent" />
                  {activeProject.title}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    activeProject.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-accent/20 text-brand-accent'
                  }`}>
                    {activeProject.status === 'approved' ? 'Freigegeben (Kunde)' : 'In Bearbeitung'}
                  </span>
                  <p className="text-xs text-gray-400">Erstellt am {new Date(activeProject.createdAt).toLocaleDateString('de-DE')}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => {
                    const url = `${window.location.origin}/portal/${activeProject.id}`;
                    navigator.clipboard.writeText(url);
                    alert("Kunden-Portal Link kopiert: " + url);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all text-sm"
                >
                  <ExternalLink size={16} /> Kunden-Portal Link
                </button>
                <button 
                  onClick={printDocument}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all text-sm"
                >
                  <Printer size={16} />
                  Drucken / PDF
                </button>
                <button 
                  onClick={saveProject}
                  disabled={saving}
                  className="bg-brand-accent text-brand-bg px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all text-sm disabled:opacity-50"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Speichern
                </button>
              </div>
            </div>

            {/* Print Header (Only visible in Print) */}
            <div className="hidden print:block mb-8">
              <h1 className="text-4xl font-bold text-black border-b-2 border-black pb-2 mb-2">Rezai Vision – Dispo & Shotlist</h1>
              <h2 className="text-2xl text-gray-700">Projekt: {activeProject.title}</h2>
              <p className="text-gray-500">Datum: {new Date().toLocaleDateString('de-DE')}</p>
            </div>

            {/* Tabs - No print */}
            <div className="flex border-b border-white/10 px-6 no-print">
              <button 
                onClick={() => setActiveTab('script')}
                className={`py-4 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${activeTab === 'script' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <AlignLeft size={16} /> Konzept / Skript
              </button>
              <button 
                onClick={() => setActiveTab('shotlist')}
                className={`py-4 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${activeTab === 'shotlist' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <ListVideo size={16} /> Shotlist & Dispo
              </button>
            </div>

            {/* Workspace Area */}
            <div className="flex-1 overflow-y-auto print:p-0 print:overflow-visible flex flex-col">
              
              {/* SCRIPT TAB */}
              {activeTab === 'script' && (
                <div className="flex-1 flex overflow-hidden print:block h-full">
                  {/* Editor Column */}
                  <div className="flex-1 flex flex-col p-6 print:p-0">
                    <div className="flex justify-between items-center mb-4 no-print">
                      <p className="text-sm text-gray-400">Schreibe hier dein Voiceover, deine Hook und den generellen Ablauf nieder.</p>
                      <button 
                        onClick={generateShotlist}
                        disabled={generating || !scriptContent}
                        className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-500/30 transition-all text-sm disabled:opacity-50"
                      >
                        {generating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                        K.I. Shotlist generieren
                      </button>
                    </div>
                    
                    {/* Editor */}
                    <textarea
                      value={scriptContent}
                      onChange={(e) => setScriptContent(e.target.value)}
                      placeholder="Schreibe dein Skript oder nutze den K.I. Skript Generator rechts..."
                      className="flex-1 w-full bg-transparent text-white border-0 resize-none focus:outline-none focus:ring-0 prose prose-invert max-w-none text-lg leading-relaxed print:text-black print:text-base print:h-[60vh] min-h-[400px]"
                    />
                  </div>

                  {/* K.I. Script Config Panel */}
                  <div className="w-96 border-l border-white/10 bg-white/5 p-6 overflow-y-auto space-y-5 no-print shrink-0">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <Wand2 className="text-brand-accent animate-pulse" size={18} />
                      <h3 className="font-bold text-white text-sm">K.I. Skript Generator</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">1. Corporate Identity (CI)</label>
                        <select
                          value={selectedCiId}
                          onChange={e => setSelectedCiId(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent animate-all"
                        >
                          <option value="">-- CI-Profil wählen --</option>
                          {ciProfiles.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">2. ICP Persona (Zielgruppe)</label>
                        <select
                          value={selectedIcpId}
                          onChange={e => setSelectedIcpId(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent animate-all"
                        >
                          <option value="">-- Persona wählen --</option>
                          {icpProfiles.map(p => (
                            <option key={p.id} value={p.id}>{p.projectName} ({p.niche})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">3. Video Kurz-Briefing / Thema</label>
                        <textarea
                          value={briefing}
                          onChange={e => setBriefing(e.target.value)}
                          rows={5}
                          placeholder="Beschreibe kurz das Ziel des Videos (z.B. 4-Tage-Woche bei uns im Pflegeheim vorstellen, Vorteile betonen, Vorurteile abbauen)..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-brand-accent focus:outline-none resize-none animate-all"
                        />
                      </div>

                      <button
                        onClick={generateScript}
                        disabled={generatingScript || !selectedCiId || !selectedIcpId || !briefing.trim()}
                        className="w-full bg-brand-accent text-brand-bg py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-brand-accent/20"
                      >
                        {generatingScript ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                        {generatingScript ? 'Skript wird geschrieben...' : 'K.I. Skript generieren'}
                      </button>

                      <p className="text-[10px] text-gray-500 leading-normal">
                        K.I. berücksichtigt Tonalität, Markenwerte, verbotene Wörter aus der CI sowie Sinus-Milieus, Suchanfragen (Answer the Public), Ängste und Einwände aus dem ICP-Profil und verfeinert dies mit bewährten Hooks & Formaten aus der Marketingdatenbank.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SHOTLIST TAB */}
              {activeTab === 'shotlist' && (
                <div className="p-6 print:block">
                  {(!activeProject.shotlist || activeProject.shotlist.length === 0) ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-xl no-print">
                      <ListVideo className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Noch keine Shotlist</h3>
                      <p className="text-gray-400 mb-6">Generiere eine vollautomatische Shotlist basierend auf deinem Skript.</p>
                      <button 
                        onClick={generateShotlist}
                        disabled={generating || !scriptContent}
                        className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all mx-auto disabled:opacity-50"
                      >
                        {generating ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
                        Shotlist durch K.I. erstellen
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden print:border-none print:bg-transparent">
                      <table className="w-full text-left border-collapse print:text-black print:border-black">
                        <thead>
                          <tr className="bg-black/40 border-b border-white/10 print:border-b-2 print:border-black print:bg-gray-100">
                            <th className="p-4 font-bold text-brand-accent print:text-black print:border print:border-gray-400">#</th>
                            <th className="p-4 font-bold text-white print:text-black print:border print:border-gray-400">Location</th>
                            <th className="p-4 font-bold text-white print:text-black print:border print:border-gray-400">Shot-Typ</th>
                            <th className="p-4 font-bold text-white print:text-black print:border print:border-gray-400">Aktion / Motiv</th>
                            <th className="p-4 font-bold text-white print:text-black print:border print:border-gray-400">Equipment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 print:divide-black">
                          {activeProject.shotlist.map((shot, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors print:border print:border-gray-400">
                              <td className="p-4 text-gray-400 font-mono print:text-black print:border print:border-gray-400">{shot.shotNumber || idx+1}</td>
                              <td className="p-4 font-bold text-gray-200 print:text-black print:border print:border-gray-400">{shot.location}</td>
                              <td className="p-4 text-emerald-400 text-sm print:text-black print:border print:border-gray-400">{shot.shotType}</td>
                              <td className="p-4 text-gray-300 print:text-black print:border print:border-gray-400">
                                <div>{shot.action}</div>
                                {shot.motionGraphic && (
                                  <div className="mt-2 flex flex-wrap items-center gap-2 bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-2 no-print">
                                    <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1">
                                      <Wand2 size={10} /> Motion Graphic:
                                    </span>
                                    <span className="text-xs text-white">
                                      {shot.motionGraphic.preset === 'lower-third' && 'Bauchbinde'}
                                      {shot.motionGraphic.preset === 'social-callout' && 'Social Bar'}
                                      {shot.motionGraphic.preset === 'kinetic' && 'Word Pop Text'}
                                      {shot.motionGraphic.preset === 'wipe' && 'Transition Wipe'}
                                      {shot.motionGraphic.preset === 'cta' && 'CTA Button'}
                                      {` (${shot.motionGraphic.text1}${shot.motionGraphic.text2 ? ' - ' + shot.motionGraphic.text2 : ''})`}
                                    </span>
                                    <button
                                      onClick={() => {
                                        localStorage.setItem('pending-motion-export', JSON.stringify({
                                          preset: shot.motionGraphic?.preset,
                                          text1: shot.motionGraphic?.text1,
                                          text2: shot.motionGraphic?.text2,
                                        }));
                                        window.dispatchEvent(new CustomEvent('switch-admin-tab', { detail: { tab: 'motion' } }));
                                      }}
                                      className="text-[10px] bg-brand-accent text-brand-bg px-2.5 py-1 rounded font-black hover:brightness-110 transition-all flex items-center gap-0.5 cursor-pointer ml-auto"
                                    >
                                      Exportieren
                                    </button>
                                  </div>
                                )}
                                {shot.motionGraphic && (
                                  <div className="hidden print:block text-xs text-gray-600 mt-1 italic">
                                    [Grafik-Overlay: {shot.motionGraphic.preset} - {shot.motionGraphic.text1}]
                                  </div>
                                )}
                              </td>
                              <td className="p-4 text-amber-400 text-sm print:text-black print:border print:border-gray-400">{shot.equipment}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 no-print">
            <PenTool size={48} className="text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Production Suite</h3>
            <p className="text-gray-400 max-w-md">
              Wähle links ein Projekt aus oder erstelle ein neues, um Skripte zu schreiben und automatische KI-Shotlists zu generieren.
            </p>
          </div>
        )}
      </div>

      {/* Print Specific CSS (Injected globally just for this component) */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-workspace, .print-workspace * { visibility: visible; }
          .print-workspace { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            background: white !important;
            color: black !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}
