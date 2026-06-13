import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { Save, Plus, Loader2, Trash2, Wand2, CalendarDays, Instagram, Copy, Check, BrainCircuit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CarouselSlide {
  slideNumber: number;
  headline: string;
  bodyText: string;
  visualConcept: string;
}

interface StoryPart {
  partNumber: number;
  text: string;
  backgroundVibe: string;
  interactiveElement?: string;
}

interface PostIdea {
  day: number;
  format: string; // e.g., "Reel", "Carousel", "Story"
  hook?: string;
  script?: string;
  hashtags?: string;
  slides?: CarouselSlide[];
  storyParts?: StoryPart[];
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
  const [useRAG, setUseRAG] = useState(false);

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
    
    let ragContext = '';
    if (useRAG) {
      try {
        const q = query(collection(db, 'knowledgeItems'), where('isGlobalContext', '==', true));
        const snap = await getDocs(q);
        const docs = snap.docs.map(d => d.data());
        if (docs.length > 0) {
          ragContext = `\nBERÜCKSICHTIGE ZWINGEND FOLGENDES AGENTUR-WISSEN (RAG-Kontext):\n` + docs.map(d => d.content).join('\n\n') + `\n`;
        }
      } catch (e) {
        console.error('Error fetching RAG context', e);
      }
    }
    
    const prompt = `
Du bist ein erstklassiger Social Media Manager für eine High-End Videoproduktion (Rezai Vision).
Erstelle einen 10-Tage Content Plan. Nutze einen Mix aus "Reel", "Carousel" (AIDA oder pädagogisch) und "Story".
Thema: ${activePlan.topic}
Zielgruppe/Nische: ${activePlan.niche}
${ragContext}

Gib NUR EIN GÜLTIGES JSON-ARRAY aus, kein Markdown, kein Text davor oder danach!
Für "Reel" Format:
  { "day": 1, "format": "Reel", "hook": "Hook-Satz", "script": "Skripttext", "hashtags": "#tag" }
Für "Carousel" Format (5-7 Slides):
  { "day": 2, "format": "Carousel", "hook": "Der Hook für das Cover", "hashtags": "#tag", "slides": [ { "slideNumber": 1, "headline": "Cover Headline", "bodyText": "Text auf dem Slide", "visualConcept": "Was man sieht" } ] }
Für "Story" Format (3-4 Parts):
  { "day": 3, "format": "Story", "hook": "Story Einstieg", "storyParts": [ { "partNumber": 1, "text": "Story Text", "backgroundVibe": "Hintergrund Idee", "interactiveElement": "Umfrage: Ja/Nein" } ] }
Generiere exakt 10 Einträge.
    `;

    try {
      const response = await fetch('/api/ai/chat', {
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
                <label className="flex items-center gap-2 cursor-pointer bg-black/40 border border-white/10 rounded-lg px-4 py-2 hover:border-brand-accent/50 transition-all">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={useRAG}
                      onChange={(e) => setUseRAG(e.target.checked)}
                    />
                    <div className={`block w-8 h-4 rounded-full transition-colors ${useRAG ? 'bg-brand-accent' : 'bg-gray-600'}`}></div>
                    <div className={`dot absolute left-1 top-0.5 bg-white w-3 h-3 rounded-full transition-transform ${useRAG ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <BrainCircuit size={14} className={useRAG ? 'text-brand-accent' : 'text-gray-400'} />
                  <span className={`text-sm font-bold ${useRAG ? 'text-white' : 'text-gray-400'}`}>Agentur-Wissen (RAG)</span>
                </label>
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
                    const postContent = JSON.stringify(post, null, 2);
                    return (
                      <div key={idx} className={`bg-white/5 border border-white/10 rounded-xl p-5 relative group hover:border-brand-accent/50 transition-colors flex flex-col h-full ${post.format === 'Carousel' || post.format === 'Story' ? 'col-span-full' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-brand-accent/20 text-brand-accent text-xs font-bold px-2 py-1 rounded">Tag {post.day}</span>
                          <span className={`text-xs font-bold uppercase ${post.format === 'Carousel' ? 'text-blue-400' : post.format === 'Story' ? 'text-pink-400' : 'text-gray-400'}`}>{post.format}</span>
                        </div>
                        
                        <h4 className="font-bold text-white mb-2 leading-tight">"{post.hook || 'Ohne Titel'}"</h4>
                        
                        {post.format === 'Reel' && (
                          <>
                            <p className="text-sm text-gray-400 flex-1 whitespace-pre-wrap mb-4">{post.script}</p>
                            <p className="text-xs text-brand-accent/70 mt-auto">{post.hashtags}</p>
                          </>
                        )}

                        {post.format === 'Carousel' && post.slides && (
                          <div className="flex gap-4 overflow-x-auto pb-4 snap-x mt-4 custom-scrollbar">
                            {post.slides.map(slide => (
                              <div key={slide.slideNumber} className="snap-center shrink-0 w-64 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col">
                                  <span className="text-xs text-gray-500 font-bold mb-2">Slide {slide.slideNumber}</span>
                                  <h5 className="font-bold text-white text-sm mb-2">{slide.headline}</h5>
                                  <p className="text-xs text-gray-300 mb-4 flex-1 whitespace-pre-wrap">{slide.bodyText}</p>
                                  <div className="mt-auto p-2 bg-blue-500/10 rounded-lg text-[10px] text-blue-400 leading-tight">
                                    <span className="font-bold">Visual:</span> {slide.visualConcept}
                                  </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {post.format === 'Story' && post.storyParts && (
                          <div className="flex gap-4 overflow-x-auto pb-4 snap-x mt-4 custom-scrollbar">
                            {post.storyParts.map(part => (
                              <div key={part.partNumber} className="snap-center shrink-0 w-48 h-72 bg-gradient-to-b from-gray-800 to-black border border-white/5 rounded-xl p-4 flex flex-col relative overflow-hidden group/story">
                                  <span className="bg-black/50 border border-white/10 text-white text-[10px] px-2 py-1 rounded-full absolute top-2 left-2 z-20">Part {part.partNumber}</span>
                                  
                                  <div className="flex-1 flex items-center justify-center text-center mt-6 z-10 p-2">
                                    <p className="text-xs font-bold text-white drop-shadow-md bg-black/40 p-2 rounded-lg backdrop-blur-sm">{part.text}</p>
                                  </div>
                                  
                                  {part.interactiveElement && (
                                    <div className="z-10 mt-auto bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg text-[10px] font-bold p-2 rounded-xl text-center mb-2 mx-2">
                                      Sticker: {part.interactiveElement}
                                    </div>
                                  )}
                                  
                                  <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>
                                  <div className="absolute inset-0 p-3 flex flex-col justify-end z-0 pointer-events-none opacity-50 group-hover/story:opacity-100 transition-opacity">
                                    <p className="text-[9px] text-white/70 leading-tight bg-black/60 p-1.5 rounded-lg backdrop-blur-sm">{part.backgroundVibe}</p>
                                  </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {(post.format === 'Carousel' || post.format === 'Story') && post.hashtags && (
                          <p className="text-xs text-brand-accent/70 mt-4">{post.hashtags}</p>
                        )}

                        <button 
                          onClick={() => copyToClipboard(postContent, idx)}
                          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-30"
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
