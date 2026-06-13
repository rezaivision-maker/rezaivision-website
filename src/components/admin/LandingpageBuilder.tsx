import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Save, Plus, Loader2, Trash2, Wand2, Globe, Copy, ExternalLink, RefreshCw, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface LandingPageConfig {
  id: string;
  slug: string;
  targetAudience: string;
  videoUrl?: string; // e.g. YouTube or Vimeo link for the hero section
  content: {
    heroHeadline: string;
    heroSubheadline: string;
    painPoints: string[];
    offerHeadline: string;
    offerText: string;
    ctaText: string;
  };
  createdAt: string;
}

export default function LandingpageBuilder() {
  const [pages, setPages] = useState<LandingPageConfig[]>([]);
  const [activePage, setActivePage] = useState<LandingPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [promptInput, setPromptInput] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'landingpages'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as LandingPageConfig));
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setPages(data);
      if (data.length > 0 && !activePage) {
        setActivePage(data[0]);
      }
    } catch (e) {
      console.error('Error fetching landing pages:', e);
    } finally {
      setLoading(false);
    }
  };

  const createNewPage = async () => {
    const slug = prompt('Kurze URL-Endung für die Landingpage (z.B. "pflegekraefte-kl"):');
    if (!slug) return;
    
    // basic sanitization
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    const newPage: Omit<LandingPageConfig, 'id'> = {
      slug: cleanSlug,
      targetAudience: 'Unbekannt',
      videoUrl: '',
      content: {
        heroHeadline: 'Deine neue Landingpage',
        heroSubheadline: 'Generiere Text mit K.I.',
        painPoints: ['Pain 1', 'Pain 2', 'Pain 3'],
        offerHeadline: 'Unser Angebot',
        offerText: 'Lass uns zusammenarbeiten.',
        ctaText: 'Jetzt anfragen'
      },
      createdAt: new Date().toISOString()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'landingpages'), newPage);
      const created = { id: docRef.id, ...newPage };
      setPages([created, ...pages]);
      setActivePage(created);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Erstellen.');
    }
  };

  const savePage = async () => {
    if (!activePage) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'landingpages', activePage.id);
      await updateDoc(docRef, { ...activePage });
      setPages(pages.map(p => p.id === activePage.id ? activePage : p));
      alert('Erfolgreich gespeichert!');
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern.');
    } finally {
      setSaving(false);
    }
  };

  const generateWithAI = async () => {
    if (!activePage || !promptInput) {
      alert("Bitte gib eine Zielgruppe / Kampagnenziel ein.");
      return;
    }
    
    setGenerating(true);
    
    const prompt = `
Du bist ein Weltklasse Direct-Response Copywriter.
Ich brauche die Texte für eine extrem conversion-starke Landingpage (Videoproduktion).
Zielgruppe/Thema: "${promptInput}"

Generiere ein JSON mit EXAKT diesen Schlüsseln (KEIN Markdown außenrum, nur das JSON):
{
  "heroHeadline": "Sehr emotionale, nutzenorientierte Headline (max 10 Wörter)",
  "heroSubheadline": "Erklärende Subheadline, die das 'Wie' beschreibt",
  "painPoints": ["Pain Point 1", "Pain Point 2", "Pain Point 3"],
  "offerHeadline": "Headline für unsere Videoproduktions-Lösung",
  "offerText": "Kurzer, knackiger Text (3-4 Sätze), warum wir die besten dafür sind.",
  "ctaText": "Handlungsorientierter Button-Text (z.B. Kostenlose Potenzialanalyse sichern)"
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
      
      const parsedContent = JSON.parse(rawJson);
      
      const updatedPage = { 
        ...activePage, 
        targetAudience: promptInput,
        content: parsedContent 
      };
      
      setActivePage(updatedPage);
      
    } catch (err) {
      console.error(err);
      alert('Fehler bei der K.I. Generierung. Bitte versuche es erneut.');
    } finally {
      setGenerating(false);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm('Diese Landingpage wirklich löschen? Der Link funktioniert dann nicht mehr!')) return;
    try {
      await deleteDoc(doc(db, 'landingpages', id));
      setPages(pages.filter(p => p.id !== id));
      if (activePage?.id === id) setActivePage(null);
    } catch(e) {
      console.error(e);
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/l/${slug}`;
    navigator.clipboard.writeText(url);
    alert('Link kopiert: ' + url);
  };

  return (
    <div className="flex h-[85vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <button 
            onClick={createNewPage}
            className="w-full bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <Plus size={16} /> Neue Landingpage
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gray-500" /></div>
          ) : pages.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-10">Keine Landingpages vorhanden.</p>
          ) : (
            pages.map(p => (
              <div 
                key={p.id}
                onClick={() => setActivePage(p)}
                className={`flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all group ${
                  activePage?.id === p.id ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex flex-col truncate pr-2">
                  <span className="font-bold text-sm truncate">/{p.slug}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-70 truncate">{p.targetAudience}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deletePage(p.id); }} className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
        {activePage ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Globe className="text-brand-accent" size={24} />
                  <h2 className="text-2xl font-bold text-white">/{activePage.slug}</h2>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => copyLink(activePage.slug)}
                    className="text-xs flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-gray-300 px-2.5 py-1 rounded transition-colors"
                  >
                    <Copy size={12} /> Link kopieren
                  </button>
                  <a 
                    href={`/l/${activePage.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs flex items-center gap-1.5 bg-brand-accent/20 hover:bg-brand-accent/30 text-brand-accent px-2.5 py-1 rounded transition-colors"
                  >
                    <ExternalLink size={12} /> Live ansehen
                  </a>
                </div>
              </div>
              <button 
                onClick={savePage}
                disabled={saving}
                className="bg-brand-accent text-brand-bg px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Live Speichern
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
              
              {/* K.I. Generator Box */}
              <div className="bg-gradient-to-r from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Wand2 size={120} />
                </div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                  <Sparkles className="text-brand-accent" size={18} /> K.I. Kampagnen Generator
                </h3>
                <p className="text-sm text-gray-400 mb-4 max-w-xl">
                  Gib dein Thema oder deine Zielgruppe ein (z.B. "Handwerker Mitarbeitergewinnung"). Die K.I. schreibt dir in Sekunden eine komplette, psychologisch aufgebaute Landingpage.
                </p>
                <div className="flex gap-3 max-w-2xl relative z-10">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={e => setPromptInput(e.target.value)}
                    placeholder="Wofür ist diese Landingpage?"
                    className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                  />
                  <button 
                    onClick={generateWithAI}
                    disabled={generating}
                    className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
                  >
                    {generating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                    Texte generieren
                  </button>
                </div>
              </div>

              {/* Editor Forms */}
              <div className="grid grid-cols-1 gap-8">
                {/* Hero Section */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">1. Hero Section (Ganz Oben)</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Video Embed URL (Optional, z.B. YouTube/Vimeo Link)</label>
                    <input
                      type="text"
                      value={activePage.videoUrl || ''}
                      onChange={(e) => setActivePage({...activePage, videoUrl: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Haupt-Headline (Hero)</label>
                    <input
                      type="text"
                      value={activePage.content.heroHeadline}
                      onChange={(e) => setActivePage({...activePage, content: {...activePage.content, heroHeadline: e.target.value}})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-xl font-bold focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Sub-Headline</label>
                    <textarea
                      value={activePage.content.heroSubheadline}
                      onChange={(e) => setActivePage({...activePage, content: {...activePage.content, heroSubheadline: e.target.value}})}
                      rows={2}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-brand-accent focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Pain Points */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">2. Die 3 großen Probleme (Pain Points)</h4>
                  {activePage.content.painPoints.map((pain, idx) => (
                    <div key={idx}>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pain Point {idx + 1}</label>
                      <input
                        type="text"
                        value={pain}
                        onChange={(e) => {
                          const newPains = [...activePage.content.painPoints];
                          newPains[idx] = e.target.value;
                          setActivePage({...activePage, content: {...activePage.content, painPoints: newPains}});
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Offer */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">3. Die Lösung (Das Angebot)</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Lösungs-Headline</label>
                    <input
                      type="text"
                      value={activePage.content.offerHeadline}
                      onChange={(e) => setActivePage({...activePage, content: {...activePage.content, offerHeadline: e.target.value}})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white font-bold focus:border-brand-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Lösungs-Text</label>
                    <textarea
                      value={activePage.content.offerText}
                      onChange={(e) => setActivePage({...activePage, content: {...activePage.content, offerText: e.target.value}})}
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-brand-accent focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-4 pb-20">
                  <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">4. Call to Action</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Button Text</label>
                    <input
                      type="text"
                      value={activePage.content.ctaText}
                      onChange={(e) => setActivePage({...activePage, content: {...activePage.content, ctaText: e.target.value}})}
                      className="w-full bg-black/40 border border-brand-accent/50 rounded-lg px-4 py-3 text-brand-accent font-bold focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <Globe size={48} className="text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Landingpage Builder</h3>
            <p className="text-gray-400 max-w-md">
              Erstelle spezifische Funnel-Seiten für deine Werbekampagnen, die extrem schnell laden und hoch konvertieren.
            </p>
            <button 
              onClick={createNewPage}
              className="mt-6 bg-brand-accent text-brand-bg px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <Plus size={18} /> Erste Landingpage anlegen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
