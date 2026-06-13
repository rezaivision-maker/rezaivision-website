import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Save, FileVideo, Wand2, Loader2, Plus, Trash2, Printer, AlignLeft, ListVideo, PenTool } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Shot {
  id: string;
  shotNumber: number;
  location: string;
  shotType: string; // e.g., "Close Up", "Wide Shot"
  action: string;
  equipment: string;
}

interface ProductionProject {
  id: string;
  title: string;
  clientName: string;
  script: string;
  shotlist: Shot[];
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

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

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
  };

  const createNewProject = async () => {
    const title = prompt('Name des neuen Projekts (z.B. "Imagefilm Autohaus"):');
    if (!title) return;
    
    const newProj = {
      title,
      clientName: '',
      script: '',
      shotlist: [],
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
      await updateDoc(docRef, { script: scriptContent });
      setProjects(projects.map(p => p.id === activeProject.id ? { ...p, script: scriptContent } : p));
      setActiveProject({ ...activeProject, script: scriptContent });
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
    
    const prompt = `
Du bist ein professioneller Regisseur und Kameramann.
Hier ist das Skript/Konzept für ein Video:
"""
${scriptContent}
"""

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
    "equipment": "Mavic 3 Pro"
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
                <p className="text-sm text-gray-400 mt-1">Erstellt am {new Date(activeProject.createdAt).toLocaleDateString('de-DE')}</p>
              </div>
              <div className="flex items-center gap-3">
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
            <div className="flex-1 overflow-y-auto p-6 print:p-0 print:overflow-visible">
              
              {/* SCRIPT TAB */}
              {activeTab === 'script' && (
                <div className="h-full flex flex-col print:block">
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
                    placeholder="Titel: Der neue Imagefilm..."
                    className="flex-1 w-full bg-transparent text-white border-0 resize-none focus:outline-none focus:ring-0 prose prose-invert max-w-none text-lg leading-relaxed print:text-black print:text-base print:h-auto"
                  />
                </div>
              )}

              {/* SHOTLIST TAB */}
              {activeTab === 'shotlist' && (
                <div className="print:block">
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
                              <td className="p-4 text-gray-300 print:text-black print:border print:border-gray-400">{shot.action}</td>
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
