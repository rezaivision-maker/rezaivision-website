import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Save, Plus, Loader2, Trash2, Wand2, CalendarDays, Instagram, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface PostIdea {
  day: number;
  format: string; // e.g., "Reel", "Carousel", "Story"
  hook: string;
  script: string;
  hashtags: string;
}

interface MarketingPlan {
  id: string;
  topic: string;
  niche: string;
  posts: PostIdea[];
  createdAt: string;
}

export default function MarketingStudio() {
  const [plans, setPlans] = useState<MarketingPlan[]>([]);
  const [activePlan, setActivePlan] = useState<MarketingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const [topicInput, setTopicInput] = useState('');
  const [nicheInput, setNicheInput] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'marketingPlans'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as MarketingPlan));
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setPlans(data);
      if (data.length > 0 && !activePlan) {
        setActivePlan(data[0]);
      }
    } catch (e) {
      console.error('Error fetching marketing plans:', e);
    } finally {
      setLoading(false);
    }
  };

  const createNewPlan = async () => {
    const topic = prompt('Hauptthema des Content-Plans (z.B. "Videomarketing für B2B"):');
    if (!topic) return;
    
    const newPlan: Omit<MarketingPlan, 'id'> = {
      topic,
      niche: 'B2B',
      posts: [],
      createdAt: new Date().toISOString()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'marketingPlans'), newPlan);
      const created = { id: docRef.id, ...newPlan };
      setPlans([created, ...plans]);
      setActivePlan(created);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Erstellen.');
    }
  };

  const generateWithAI = async () => {
    if (!activePlan || !activePlan.niche) {
      alert("Bitte gib eine Zielgruppe/Nische ein.");
      return;
    }
    
    setGenerating(true);
    
    const prompt = `
Du bist ein erstklassiger Social Media Manager für eine High-End Videoproduktion (Rezai Vision).
Erstelle einen 10-Tage Content Plan für Instagram (Reels & Carousels).
Thema: ${activePlan.topic}
Zielgruppe/Nische: ${activePlan.niche}

Gib NUR EIN GÜLTIGES JSON-ARRAY aus, kein Markdown, kein Text davor oder danach!
Format:
[
  {
    "day": 1,
    "format": "Reel",
    "hook": "Sehr aufmerksamkeitsstarker Hook-Satz",
    "script": "Stichpunkte für das Skript oder den Caption-Text",
    "hashtags": "#videoproduktion #marketing"
  }
]
Generiere 10 Einträge.
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
      
      const parsedPosts = JSON.parse(rawJson);
      
      const updatedPlan = { 
        ...activePlan, 
        posts: parsedPosts 
      };
      
      // Speichern
      const docRef = doc(db, 'marketingPlans', activePlan.id);
      await updateDoc(docRef, updatedPlan);

      setActivePlan(updatedPlan);
      setPlans(plans.map(p => p.id === activePlan.id ? updatedPlan : p));
      
    } catch (err) {
      console.error(err);
      alert('Fehler bei der K.I. Generierung. Bitte versuche es erneut.');
    } finally {
      setGenerating(false);
    }
  };

  const deletePlan = async (id: string) => {
    if (!confirm('Diesen Plan wirklich löschen?')) return;
    try {
      await deleteDoc(doc(db, 'marketingPlans', id));
      setPlans(plans.filter(p => p.id !== id));
      if (activePlan?.id === id) setActivePlan(null);
    } catch(e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-[85vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <button 
            onClick={createNewPlan}
            className="w-full bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <Plus size={16} /> Neuer Content Plan
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gray-500" /></div>
          ) : plans.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-10">Keine Pläne vorhanden.</p>
          ) : (
            plans.map(p => (
              <div 
                key={p.id}
                onClick={() => setActivePlan(p)}
                className={`flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all group ${
                  activePlan?.id === p.id ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex flex-col truncate pr-2">
                  <span className="font-bold text-sm truncate">{p.topic}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deletePlan(p.id); }} className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
        {activePlan ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Instagram className="text-brand-accent" size={24} />
                <h2 className="text-2xl font-bold text-white">{activePlan.topic}</h2>
              </div>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  value={activePlan.niche}
                  onChange={(e) => setActivePlan({...activePlan, niche: e.target.value})}
                  placeholder="Zielgruppe / Nische (z.B. Autohäuser)"
                  className="flex-1 max-w-sm bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
                />
                <button 
                  onClick={generateWithAI}
                  disabled={generating}
                  className="bg-brand-accent text-brand-bg px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {generating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                  10-Tage Plan generieren
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!activePlan.posts || activePlan.posts.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-xl">
                  <CalendarDays className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Noch keine Posts</h3>
                  <p className="text-gray-400">Trage deine Zielgruppe ein und klicke auf Generieren.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activePlan.posts.map((post, idx) => {
                    const postContent = `Format: ${post.format}\nHook: ${post.hook}\n\nSkript:\n${post.script}\n\n${post.hashtags}`;
                    return (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 relative group hover:border-brand-accent/50 transition-colors flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-brand-accent/20 text-brand-accent text-xs font-bold px-2 py-1 rounded">Tag {post.day}</span>
                          <span className="text-xs font-bold text-gray-400 uppercase">{post.format}</span>
                        </div>
                        
                        <h4 className="font-bold text-white mb-2 leading-tight">"{post.hook}"</h4>
                        <p className="text-sm text-gray-400 flex-1 whitespace-pre-wrap mb-4">{post.script}</p>
                        <p className="text-xs text-brand-accent/70 mt-auto">{post.hashtags}</p>

                        <button 
                          onClick={() => copyToClipboard(postContent, idx)}
                          className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          title="In Zwischenablage kopieren"
                        >
                          {copiedId === idx ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <Instagram size={48} className="text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Marketing Studio</h3>
            <p className="text-gray-400 max-w-md">
              Generiere Content-Pläne für Instagram und LinkedIn auf Knopfdruck.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
