import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import {
  Video, Wand2, Loader2, Plus, Trash2, Copy, Check, Play,
  BookOpen, Layers, ExternalLink, AlertCircle, Sparkles,
  Image, FileVideo, Clock, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: 'cinematic' | 'portrait' | 'product' | 'social' | 'testimonial';
  tool: string;
  createdAt: string;
}

interface VideoJob {
  id: string;
  title: string;
  prompt: string;
  mode: 'text-to-video' | 'image-to-video';
  status: 'pending' | 'processing' | 'done' | 'error';
  jobId?: string;
  videoUrl?: string;
  createdAt: string;
}

interface VideoBrief {
  title: string;
  objective: string;
  targetAudience: string;
  style: string;
  colorPalette: string;
  music: string;
  shots: string[];
  higgsfieldPrompts: string[];
  duration: string;
}

// ─────────────────────────────────────────────
// Tool Directory Data
// ─────────────────────────────────────────────
const AI_TOOLS = [
  {
    name: 'Higgsfield AI',
    url: 'https://cloud.higgsfield.ai',
    category: 'Video Generator',
    description: 'Cinematic, charakterkonsistente KI-Videos. Bestes Tool für Werbevideos und Story-Content.',
    integrated: true,
    badge: 'Integriert',
    badgeColor: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    name: 'Google Veo 3',
    url: 'https://deepmind.google/technologies/veo/',
    category: 'Video Generator',
    description: 'Googles neuestes Video-Modell. Höchste Qualität für Natur- und Lifestyle-Content.',
    integrated: false,
    badge: 'Google AI Pro',
    badgeColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    name: 'HeyGen',
    url: 'https://heygen.com',
    category: 'Avatar Video',
    description: 'KI-Avatar-Videos: perfekt für Erklärer-Videos und personalisierten Sales-Content ohne Kamera.',
    integrated: false,
    badge: 'Empfohlen',
    badgeColor: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    name: 'Kling AI',
    url: 'https://klingai.com',
    category: 'Video Generator',
    description: 'Starke Bewegungsdynamik, gut für Action-Shots und Social Media Reels.',
    integrated: false,
    badge: 'Top Alternative',
    badgeColor: 'bg-purple-500/20 text-purple-400',
  },
  {
    name: 'Runway ML',
    url: 'https://runwayml.com',
    category: 'Video Generator',
    description: 'Industriestandard für professionelle KI-Videoproduktion. Gen-3 Alpha Turbo für schnelle Iterationen.',
    integrated: false,
    badge: 'Bewährt',
    badgeColor: 'bg-gray-500/20 text-gray-400',
  },
  {
    name: 'ElevenLabs',
    url: 'https://elevenlabs.io',
    category: 'Audio / Voice',
    description: 'Beste KI-Sprachsynthese. Für Voiceovers, Testimonial-Simulationen und Narration.',
    integrated: false,
    badge: 'Für Audio',
    badgeColor: 'bg-orange-500/20 text-orange-400',
  },
  {
    name: 'Suno AI',
    url: 'https://suno.ai',
    category: 'Musik Generator',
    description: 'KI-generierte Hintergrundmusik für deine Videos – kostenlos für kommerzielle Nutzung (mit Pro Plan).',
    integrated: false,
    badge: 'Für Musik',
    badgeColor: 'bg-pink-500/20 text-pink-400',
  },
];

const PROMPT_CATEGORIES = ['cinematic', 'portrait', 'product', 'social', 'testimonial'];
const STARTER_PROMPTS: Omit<Prompt, 'id' | 'createdAt'>[] = [
  {
    title: 'Cinematic Corporate Intro',
    prompt: 'A confident entrepreneur walks into a modern open-plan office, golden hour light streaming through floor-to-ceiling windows, slow dolly forward, shallow depth of field, warm color grade, cinematic 2.39:1 aspect ratio, photorealistic',
    category: 'cinematic',
    tool: 'Higgsfield AI',
  },
  {
    title: 'Portrait – Authentisches Kundentestimonial',
    prompt: 'Close-up portrait of a satisfied customer smiling naturally, bokeh background of a cozy cafe, warm natural lighting, slight camera drift, documentary style, 4K, real human skin texture',
    category: 'portrait',
    tool: 'Higgsfield AI',
  },
  {
    title: 'Produkt-Reveal (Smartphone/Tech)',
    prompt: 'Premium smartphone slowly rotating on a dark reflective surface, soft studio light creating specular highlights, subtle particle dust in the air, cinematic product reveal, dark background, 4K hyperrealistic',
    category: 'product',
    tool: 'Higgsfield AI',
  },
  {
    title: 'Social Reel – Schneller Schnitt Hook',
    prompt: 'Fast-paced montage of a busy creative agency, diverse team collaborating, laptops, whiteboards, post-its, energetic but clean aesthetic, bright colors, urban setting, handheld camera style',
    category: 'social',
    tool: 'Higgsfield AI',
  },
  {
    title: 'Recruiting – Traumjob Atmosphäre',
    prompt: 'Happy professional arrives at a modern clinic, greeted by smiling colleagues, bright natural light, wide establishing shot transitioning to close-ups of meaningful work moments, uplifting documentary style',
    category: 'testimonial',
    tool: 'Higgsfield AI',
  },
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function AIVideoHub() {
  const [activeTab, setActiveTab] = useState<'generator' | 'prompts' | 'brief' | 'tools' | 'jobs'>('generator');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [jobs, setJobs] = useState<VideoJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generator State
  const [genPrompt, setGenPrompt] = useState('');
  const [genMode, setGenMode] = useState<'text-to-video' | 'image-to-video'>('text-to-video');
  const [genImageUrl, setGenImageUrl] = useState('');
  const [genTitle, setGenTitle] = useState('');
  const [genDuration, setGenDuration] = useState(4);
  const [generating, setGenerating] = useState(false);
  const [apiNotConfigured, setApiNotConfigured] = useState(false);

  // Brief Generator State
  const [briefTopic, setBriefTopic] = useState('');
  const [briefAudience, setBriefAudience] = useState('');
  const [briefGoal, setBriefGoal] = useState('');
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<VideoBrief | null>(null);

  // New Prompt State
  const [showNewPrompt, setShowNewPrompt] = useState(false);
  const [newPromptTitle, setNewPromptTitle] = useState('');
  const [newPromptText, setNewPromptText] = useState('');
  const [newPromptCategory, setNewPromptCategory] = useState<Prompt['category']>('cinematic');
  const [newPromptTool, setNewPromptTool] = useState('Higgsfield AI');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch prompts
      const promptSnap = await getDocs(query(collection(db, 'promptLibrary'), orderBy('createdAt', 'desc')));
      const promptData = promptSnap.docs.map(d => ({ id: d.id, ...d.data() } as Prompt));

      // If no prompts exist yet, seed with starter prompts
      if (promptData.length === 0) {
        const seeded: Prompt[] = [];
        for (const p of STARTER_PROMPTS) {
          const docRef = await addDoc(collection(db, 'promptLibrary'), {
            ...p,
            createdAt: new Date().toISOString(),
          });
          seeded.push({ id: docRef.id, ...p, createdAt: new Date().toISOString() });
        }
        setPrompts(seeded);
      } else {
        setPrompts(promptData);
      }

      // Fetch video jobs
      const jobSnap = await getDocs(query(collection(db, 'aiVideoProjects'), orderBy('createdAt', 'desc')));
      setJobs(jobSnap.docs.map(d => ({ id: d.id, ...d.data() } as VideoJob)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── Generate Video via Higgsfield ──
  const generateVideo = async () => {
    if (!genPrompt.trim()) { alert('Bitte einen Prompt eingeben.'); return; }
    if (!genTitle.trim()) { alert('Bitte einen Titel für das Projekt eingeben.'); return; }
    setGenerating(true);
    setApiNotConfigured(false);

    try {
      const body: any = { prompt: genPrompt, mode: genMode, duration: genDuration };
      if (genMode === 'image-to-video' && genImageUrl) body.imageUrl = genImageUrl;

      const res = await fetch('/api/marketing/higgsfield?action=generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.setup) {
        // API key not configured
        setApiNotConfigured(true);
        setGenerating(false);
        return;
      }

      if (!res.ok) {
        alert(`Fehler: ${data.error || 'Unbekannter Fehler'}`);
        setGenerating(false);
        return;
      }

      // Save job to Firestore
      const jobRef = await addDoc(collection(db, 'aiVideoProjects'), {
        title: genTitle,
        prompt: genPrompt,
        mode: genMode,
        status: 'processing',
        jobId: data.id || data.request_id || data.jobId,
        createdAt: new Date().toISOString(),
      });

      setJobs(prev => [{
        id: jobRef.id,
        title: genTitle,
        prompt: genPrompt,
        mode: genMode,
        status: 'processing',
        jobId: data.id || data.request_id,
        createdAt: new Date().toISOString(),
      }, ...prev]);

      setGenPrompt('');
      setGenTitle('');
      setGenImageUrl('');
      setActiveTab('jobs');
      alert('Video-Job gestartet! Wechsle zum "Meine Videos" Tab um den Status zu verfolgen.');

    } catch (e) {
      console.error(e);
      alert('Verbindungsfehler zur Higgsfield API.');
    } finally {
      setGenerating(false);
    }
  };

  // ── Check job status ──
  const checkJobStatus = async (job: VideoJob) => {
    if (!job.jobId) return;
    try {
      const res = await fetch(`/api/higgsfield?action=status&jobId=${job.jobId}`);
      const data = await res.json();

      let newStatus: VideoJob['status'] = job.status;
      let videoUrl = job.videoUrl;

      if (data.status === 'completed' || data.state === 'done') {
        newStatus = 'done';
        videoUrl = data.video_url || data.url || data.output;
      } else if (data.status === 'failed' || data.state === 'error') {
        newStatus = 'error';
      } else {
        newStatus = 'processing';
      }

      // Update Firestore
      await updateDoc(doc(db, 'aiVideoProjects', job.id), { status: newStatus, videoUrl });
      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: newStatus, videoUrl } : j));
    } catch (e) {
      console.error(e);
    }
  };

  // ── Generate Video Brief via Gemini ──
  const generateBrief = async () => {
    if (!briefTopic.trim()) { alert('Bitte ein Thema eingeben.'); return; }
    setGeneratingBrief(true);
    setGeneratedBrief(null);

    const systemPrompt = `
Du bist ein erstklassiger KI-Video-Direktor für die Agentur Rezai Vision.
Erstelle ein detailliertes Video-Briefing für Higgsfield AI (KI-Videogenerator).

Thema: ${briefTopic}
Zielgruppe: ${briefAudience || 'Allgemein / B2B Entscheider'}
Ziel: ${briefGoal || 'Brand Awareness und Lead-Generierung'}

Antworte NUR mit gültigem JSON, kein Markdown:
{
  "title": "Projekttitel",
  "objective": "Klares Ziel des Videos",
  "targetAudience": "Wer sieht das Video",
  "style": "Visueller Stil (z.B. Cinematic Dark, Bright Corporate, Documentary)",
  "colorPalette": "3-4 Farben in HEX oder Beschreibung",
  "music": "Empfohlene Musik-Atmosphäre",
  "shots": ["Shot 1 Beschreibung", "Shot 2 Beschreibung", "Shot 3 Beschreibung", "Shot 4 Beschreibung", "Shot 5 Beschreibung"],
  "higgsfieldPrompts": ["Konkreter Higgsfield-Prompt 1", "Konkreter Higgsfield-Prompt 2", "Konkreter Higgsfield-Prompt 3"],
  "duration": "Empfohlene Länge"
}
    `;

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: systemPrompt }),
      });
      const data = await res.json();
      let raw = data.reply.replace(/```json/g, '').replace(/```/g, '').trim();
      setGeneratedBrief(JSON.parse(raw));
    } catch (e) {
      console.error(e);
      alert('Fehler bei der Brief-Generierung. Bitte erneut versuchen.');
    } finally {
      setGeneratingBrief(false);
    }
  };

  // ── Save new prompt ──
  const saveNewPrompt = async () => {
    if (!newPromptTitle || !newPromptText) return;
    const newP = {
      title: newPromptTitle,
      prompt: newPromptText,
      category: newPromptCategory,
      tool: newPromptTool,
      createdAt: new Date().toISOString(),
    };
    const ref = await addDoc(collection(db, 'promptLibrary'), newP);
    setPrompts([{ id: ref.id, ...newP }, ...prompts]);
    setNewPromptTitle('');
    setNewPromptText('');
    setShowNewPrompt(false);
  };

  const deletePrompt = async (id: string) => {
    if (!confirm('Prompt löschen?')) return;
    await deleteDoc(doc(db, 'promptLibrary', id));
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const TAB_ITEMS = [
    { id: 'generator', label: 'Video erstellen', icon: Video },
    { id: 'brief', label: 'Video Brief', icon: FileVideo },
    { id: 'prompts', label: 'Prompt-Bibliothek', icon: BookOpen },
    { id: 'jobs', label: 'Meine Videos', icon: Play, badge: jobs.filter(j => j.status === 'processing').length },
    { id: 'tools', label: 'Tool-Directory', icon: Layers },
  ];

  const categoryColors: Record<string, string> = {
    cinematic: 'bg-blue-500/20 text-blue-400',
    portrait: 'bg-pink-500/20 text-pink-400',
    product: 'bg-purple-500/20 text-purple-400',
    social: 'bg-yellow-500/20 text-yellow-400',
    testimonial: 'bg-emerald-500/20 text-emerald-400',
  };

  return (
    <div className="flex flex-col h-[90vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">

      {/* Tab Bar */}
      <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto shrink-0">
        {TAB_ITEMS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-brand-accent text-brand-accent bg-brand-accent/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {tab.badge ? (
              <span className="bg-brand-accent text-brand-bg text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                {tab.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">

        {/* ── Tab: Video Generator ── */}
        {activeTab === 'generator' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Video className="text-brand-accent w-7 h-7" />
              <div>
                <h2 className="text-2xl font-bold text-white">Higgsfield Video Generator</h2>
                <p className="text-gray-400 text-sm">Erstelle KI-Videos mit Higgsfield AI direkt aus deinem Backend.</p>
              </div>
            </div>

            {apiNotConfigured && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 flex gap-4">
                <AlertCircle className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-yellow-400 mb-1">Higgsfield API Key fehlt</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Füge deinen API Key als Umgebungsvariable hinzu:
                  </p>
                  <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Gehe zu <a href="https://cloud.higgsfield.ai" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">cloud.higgsfield.ai</a></li>
                    <li>Navigiere zu Settings → API Keys</li>
                    <li>Generiere einen neuen API Key</li>
                    <li>Füge ihn in Vercel unter Project → Settings → Environment Variables ein:</li>
                  </ol>
                  <code className="mt-2 block bg-black/40 px-3 py-2 rounded text-brand-accent text-xs font-mono">
                    HIGGSFIELD_API_KEY=dein_key_hier
                  </code>
                </div>
              </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Projekttitel</label>
                <input
                  type="text"
                  value={genTitle}
                  onChange={e => setGenTitle(e.target.value)}
                  placeholder="z.B. Recruiting-Video Autohaus Müller"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Modus</label>
                <div className="flex gap-3">
                  {(['text-to-video', 'image-to-video'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setGenMode(m)}
                      className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                        genMode === m ? 'bg-brand-accent text-brand-bg' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                      }`}
                    >
                      {m === 'text-to-video' ? '📝 Text → Video' : '🖼️ Bild → Video'}
                    </button>
                  ))}
                </div>
              </div>

              {genMode === 'image-to-video' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Bild-URL (öffentlich zugänglich)</label>
                  <input
                    type="url"
                    value={genImageUrl}
                    onChange={e => setGenImageUrl(e.target.value)}
                    placeholder="https://example.com/bild.jpg"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Video-Prompt</label>
                  <button
                    onClick={() => setActiveTab('prompts')}
                    className="text-xs text-brand-accent hover:underline"
                  >
                    Aus Bibliothek wählen →
                  </button>
                </div>
                <textarea
                  value={genPrompt}
                  onChange={e => setGenPrompt(e.target.value)}
                  rows={5}
                  placeholder="Beschreibe dein Video präzise auf Englisch. Z.B.: A confident professional walks through a bright modern office, golden hour light, slow cinematic dolly forward, shallow depth of field..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none resize-none text-sm font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">💡 Tipp: Higgsfield-Prompts auf Englisch schreiben für beste Ergebnisse.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Dauer: {genDuration} Sekunden</label>
                <input
                  type="range"
                  min={2}
                  max={16}
                  step={2}
                  value={genDuration}
                  onChange={e => setGenDuration(Number(e.target.value))}
                  className="w-full accent-brand-accent"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2s</span><span>4s</span><span>8s</span><span>12s</span><span>16s</span>
                </div>
              </div>

              <button
                onClick={generateVideo}
                disabled={generating}
                className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-brand-accent/20"
              >
                {generating ? <Loader2 className="animate-spin" size={20} /> : <Video size={20} />}
                {generating ? 'Video wird generiert...' : 'Video mit Higgsfield generieren'}
              </button>
            </div>
          </div>
        )}

        {/* ── Tab: Video Brief ── */}
        {activeTab === 'brief' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileVideo className="text-brand-accent w-7 h-7" />
              <div>
                <h2 className="text-2xl font-bold text-white">KI-Video Brief Generator</h2>
                <p className="text-gray-400 text-sm">Gemini erstellt dir ein komplettes Briefing inkl. fertiger Higgsfield-Prompts.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Video-Thema *</label>
                  <input
                    type="text"
                    value={briefTopic}
                    onChange={e => setBriefTopic(e.target.value)}
                    placeholder="z.B. Recruiting-Video für Pflegeheim"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Zielgruppe</label>
                  <input
                    type="text"
                    value={briefAudience}
                    onChange={e => setBriefAudience(e.target.value)}
                    placeholder="z.B. Pflegefachkräfte 25-45 Jahre"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ziel des Videos</label>
                <input
                  type="text"
                  value={briefGoal}
                  onChange={e => setBriefGoal(e.target.value)}
                  placeholder="z.B. Bewerbungen generieren, Brand Awareness, Produkt-Launch"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                />
              </div>
              <button
                onClick={generateBrief}
                disabled={generatingBrief}
                className="w-full bg-brand-accent text-brand-bg py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {generatingBrief ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                {generatingBrief ? 'Generiere Briefing...' : 'Video Brief mit KI generieren'}
              </button>
            </div>

            {generatedBrief && (
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-brand-accent/10 border-b border-white/10 px-6 py-4 flex justify-between items-center">
                  <h3 className="font-bold text-brand-accent text-lg">{generatedBrief.title}</h3>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(generatedBrief, null, 2), 'brief')}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    {copiedId === 'brief' ? <Check size={12} /> : <Copy size={12} />} Kopieren
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Ziel</p>
                      <p className="text-white">{generatedBrief.objective}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Zielgruppe</p>
                      <p className="text-white">{generatedBrief.targetAudience}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Visueller Stil</p>
                      <p className="text-white">{generatedBrief.style}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Farbpalette</p>
                      <p className="text-white">{generatedBrief.colorPalette}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Musik-Atmosphäre</p>
                      <p className="text-white">{generatedBrief.music}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Dauer</p>
                      <p className="text-white">{generatedBrief.duration}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-3">Geplante Shots</p>
                    <ol className="space-y-2">
                      {generatedBrief.shots.map((shot, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-300">
                          <span className="text-brand-accent font-bold shrink-0">Shot {i + 1}</span>
                          <span>{shot}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-3">🎬 Higgsfield Prompts (direkt nutzbar)</p>
                    <div className="space-y-3">
                      {generatedBrief.higgsfieldPrompts.map((prompt, i) => (
                        <div key={i} className="bg-black/40 rounded-lg p-4 relative group">
                          <p className="text-sm text-gray-200 font-mono pr-10">{prompt}</p>
                          <button
                            onClick={() => {
                              setGenPrompt(prompt);
                              setActiveTab('generator');
                            }}
                            className="absolute top-3 right-3 bg-brand-accent/20 hover:bg-brand-accent/40 text-brand-accent px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-all"
                          >
                            Verwenden
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Prompt Library ── */}
        {activeTab === 'prompts' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <BookOpen className="text-brand-accent w-7 h-7" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Prompt-Bibliothek</h2>
                  <p className="text-gray-400 text-sm">Deine besten KI-Video Prompts, kuratiiert und jederzeit abrufbar.</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewPrompt(!showNewPrompt)}
                className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:brightness-110 transition-all"
              >
                <Plus size={16} /> Neuer Prompt
              </button>
            </div>

            {showNewPrompt && (
              <div className="bg-white/5 border border-brand-accent/30 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-white">Neuen Prompt speichern</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newPromptTitle}
                    onChange={e => setNewPromptTitle(e.target.value)}
                    placeholder="Titel des Prompts"
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none"
                  />
                  <select
                    value={newPromptCategory}
                    onChange={e => setNewPromptCategory(e.target.value as any)}
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none"
                  >
                    {PROMPT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <textarea
                  value={newPromptText}
                  onChange={e => setNewPromptText(e.target.value)}
                  rows={4}
                  placeholder="Dein Higgsfield Prompt auf Englisch..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none resize-none font-mono text-sm"
                />
                <div className="flex gap-3">
                  <button onClick={saveNewPrompt} className="bg-brand-accent text-brand-bg px-6 py-2 rounded-lg font-bold text-sm hover:brightness-110">
                    Speichern
                  </button>
                  <button onClick={() => setShowNewPrompt(false)} className="bg-white/10 text-gray-400 px-6 py-2 rounded-lg font-bold text-sm hover:bg-white/20">
                    Abbrechen
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-accent w-8 h-8" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prompts.map(p => (
                  <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-5 relative group hover:border-brand-accent/40 transition-colors flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-white">{p.title}</h4>
                      <div className="flex gap-2 shrink-0">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${categoryColors[p.category] || 'bg-gray-500/20 text-gray-400'}`}>
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 font-mono flex-1 mb-4 line-clamp-4">{p.prompt}</p>
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => copyToClipboard(p.prompt, p.id)}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition-all"
                      >
                        {copiedId === p.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        {copiedId === p.id ? 'Kopiert!' : 'Kopieren'}
                      </button>
                      <button
                        onClick={() => { setGenPrompt(p.prompt); setActiveTab('generator'); }}
                        className="flex-1 bg-brand-accent/20 hover:bg-brand-accent/40 text-brand-accent py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition-all"
                      >
                        <Video size={14} /> Verwenden
                      </button>
                      <button
                        onClick={() => deletePrompt(p.id)}
                        className="bg-red-500/10 hover:bg-red-500/30 text-red-400 py-2 px-3 rounded-lg text-sm transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Video Jobs ── */}
        {activeTab === 'jobs' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Play className="text-brand-accent w-7 h-7" />
              <div>
                <h2 className="text-2xl font-bold text-white">Meine Video-Projekte</h2>
                <p className="text-gray-400 text-sm">Status und Ergebnisse deiner Higgsfield-Jobs.</p>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-xl">
                <Video className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Noch keine Videos</h3>
                <p className="text-gray-400">Erstelle dein erstes KI-Video im Generator-Tab.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{job.title}</h4>
                        <p className="text-sm text-gray-400 font-mono line-clamp-2">{job.prompt}</p>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          job.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' :
                          job.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                          job.status === 'error' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {job.status === 'done' ? '✅ Fertig' :
                           job.status === 'processing' ? '⏳ In Bearbeitung' :
                           job.status === 'error' ? '❌ Fehler' : '⏸️ Wartend'}
                        </span>
                        {job.status === 'processing' && (
                          <button
                            onClick={() => checkJobStatus(job)}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg"
                            title="Status aktualisieren"
                          >
                            <RefreshCw size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    {job.videoUrl && (
                      <div className="mt-4">
                        <video
                          src={job.videoUrl}
                          controls
                          className="w-full rounded-lg max-h-64"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Tool Directory ── */}
        {activeTab === 'tools' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="text-brand-accent w-7 h-7" />
              <div>
                <h2 className="text-2xl font-bold text-white">KI Tool-Directory</h2>
                <p className="text-gray-400 text-sm">Kuratierte Liste der besten KI-Tools für deine Videoproduktion.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AI_TOOLS.map(tool => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-accent/40 transition-all group block"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-white group-hover:text-brand-accent transition-colors">{tool.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                      <ExternalLink size={14} className="text-gray-500 group-hover:text-brand-accent transition-colors" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">{tool.category}</span>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
