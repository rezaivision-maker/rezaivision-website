import React, { useState, useEffect } from 'react';
import { Save, Search, Sparkles, Loader2, CheckCircle2, AlertCircle, LayoutTemplate } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

const PAGES = [
  { id: 'home', name: 'Startseite', path: '/' },
  { id: 'preisrechner', name: 'Preisrechner', path: '/preisrechner' },
  { id: 'kontakt', name: 'Kontakt', path: '/kontakt' },
  { id: 'portfolio', name: 'Portfolio', path: '/portfolio' },
  { id: 'blog', name: 'Magazin (Blog)', path: '/blog' },
  { id: 'ueber-uns', name: 'Über uns', path: '/ueber-uns' }
];

export default function PagesSEOManager() {
  const [activePage, setActivePage] = useState(PAGES[0]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  
  const [isIndexed, setIsIndexed] = useState<boolean | null>(null);
  const [checkingIndex, setCheckingIndex] = useState(false);
  
  const [aiReview, setAiReview] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch from firestore
  useEffect(() => {
    let isMounted = true;
    const fetchSEO = async () => {
      try {
        const docRef = doc(db, "seoMetadata", activePage.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          setMetaTitle(data.title || `${activePage.name} | Rezai Vision Videoproduktion`);
          setMetaDescription(data.description || 'Wir produzieren hochkonvertierende Videos in Kaiserslautern.');
          setMetaKeywords(data.keywords || 'Videoproduktion, Kaiserslautern, ' + activePage.name);
        } else if (isMounted) {
          setMetaTitle(`${activePage.name} | Rezai Vision Videoproduktion`);
          setMetaDescription('Wir produzieren hochkonvertierende Videos in Kaiserslautern.');
          setMetaKeywords('Videoproduktion, Kaiserslautern, ' + activePage.name);
        }
      } catch (e) {
        console.error("Error fetching SEO data", e);
      }
    };
    
    fetchSEO();
    setAiReview('');
    setIsIndexed(null);

    return () => { isMounted = false; };
  }, [activePage]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "seoMetadata", activePage.id), { 
        title: metaTitle, 
        description: metaDescription, 
        keywords: metaKeywords 
      }, { merge: true });
      alert('SEO Daten erfolgreich gespeichert!');
    } catch (e) {
      console.error("Error saving SEO data", e);
      alert('Fehler beim Speichern der SEO Daten.');
    } finally {
      setSaving(false);
    }
  };

  const checkIndexing = () => {
    setCheckingIndex(true);
    setTimeout(() => {
      setIsIndexed(Math.random() > 0.3); // Mock logic for visual
      setCheckingIndex(false);
    }, 1500);
  };

  const runAiReview = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analysiere folgende Meta-Daten für die Seite "${activePage.name}":\nTitle: ${metaTitle}\nDescription: ${metaDescription}\n\nIst das conversion-stark und SEO-optimiert? Gib mir max. 3 Bulletpoints zur Verbesserung auf Deutsch.`,
          systemInstruction: 'Du bist ein Senior SEO und Copywriting Experte.'
        })
      });
      const data = await response.json();
      setAiReview(data.reply);
    } catch (err) {
      setAiReview('Fehler bei der K.I. Analyse.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar: Pages List */}
      <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-black/20 border-b border-white/10">
          <h3 className="font-bold text-white flex items-center gap-2">
            <LayoutTemplate size={18} className="text-brand-accent" />
            Seiten
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {PAGES.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activePage.id === page.id 
                  ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {page.name}
              <span className="block text-xs font-light opacity-60 truncate">{page.path}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* Indexing Status Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Indexierungs-Status</h3>
            <p className="text-sm text-gray-400">Ist diese Seite bei Google im Index?</p>
            {isIndexed !== null && (
              <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isIndexed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {isIndexed ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {isIndexed ? 'Seite ist indexiert' : 'Nicht im Index (oder Fehler)'}
              </div>
            )}
          </div>
          <button 
            onClick={checkIndexing}
            disabled={checkingIndex}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {checkingIndex ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Live-Check ausführen
          </button>
        </div>

        {/* SEO Meta Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Meta-Daten: {activePage.name}</h3>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-accent text-brand-bg px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all text-sm disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Speichern
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
              />
              <span className={`text-xs mt-1 block ${metaTitle.length > 60 ? 'text-red-400' : 'text-gray-500'}`}>
                {metaTitle.length} / 60 Zeichen (Empfohlen)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent resize-none"
              />
              <span className={`text-xs mt-1 block ${metaDescription.length > 160 ? 'text-red-400' : 'text-gray-500'}`}>
                {metaDescription.length} / 160 Zeichen (Empfohlen)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Keywords / Tags</label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                placeholder="Komma-separiert..."
              />
            </div>
          </div>
        </div>

        {/* AI Review */}
        <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-brand-accent" />
                K.I. SEO-Review
              </h3>
              <p className="text-sm text-gray-400">Lass die K.I. deine Meta-Daten auf Conversion und Keywords prüfen.</p>
            </div>
            <button
              onClick={runAiReview}
              disabled={loadingAi || !metaTitle || !metaDescription}
              className="bg-brand-dark border border-brand-accent/30 text-brand-accent px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-accent/10 transition-all text-sm disabled:opacity-50"
            >
              {loadingAi ? <Loader2 size={16} className="animate-spin" /> : 'Jetzt analysieren'}
            </button>
          </div>
          
          {aiReview && (
            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-white/5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {aiReview}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
