import React, { useState } from 'react';
import { Wand2, Loader2, Copy, Check, ExternalLink, Code2, Layers, Sparkles, Play, Zap, MousePointer, Eye } from 'lucide-react';

// ─────────────────────────────────────────────
// Animation Presets
// ─────────────────────────────────────────────
const ANIMATION_PRESETS = [
  {
    name: 'Fade In Up',
    category: 'Entrance',
    description: 'Element erscheint von unten mit Fade',
    code: `import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  Dein Content hier
</motion.div>`,
  },
  {
    name: 'Staggered Children',
    category: 'Entrance',
    description: 'Kinder-Elemente erscheinen versetzt nacheinander',
    code: `import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i} variants={item}>{i}</motion.li>
  ))}
</motion.ul>`,
  },
  {
    name: 'Scroll Reveal',
    category: 'Scroll',
    description: 'Element animiert sich beim Einblenden in den Viewport',
    code: `import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  Wird sichtbar beim Scrollen
</motion.div>`,
  },
  {
    name: 'Hover Scale + Glow',
    category: 'Interaction',
    description: 'Button/Card mit Premium-Hover-Effekt',
    code: `import { motion } from 'motion/react';

<motion.button
  whileHover={{ 
    scale: 1.04,
    boxShadow: "0 0 30px rgba(255, 200, 0, 0.3)"
  }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl"
>
  Call to Action
</motion.button>`,
  },
  {
    name: 'Magnetic Button',
    category: 'Interaction',
    description: 'Button folgt der Mausbewegung magnetisch',
    code: `import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

function MagneticButton({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.button>
  );
}`,
  },
  {
    name: 'Text Reveal (Per Word)',
    category: 'Text',
    description: 'Headline-Text erscheint Wort für Wort',
    code: `import { motion } from 'motion/react';

function AnimatedHeadline({ text }) {
  const words = text.split(" ");
  return (
    <h1 className="flex flex-wrap gap-x-3">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.33, 1, 0.68, 1]
          }}
          className="inline-block overflow-hidden"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}`,
  },
  {
    name: 'Glassmorphism Card',
    category: 'Layout',
    description: 'Premium Glasmorphism-Karte mit Hover-Tilt',
    code: `import { motion, useMotionValue, useTransform } from 'motion/react';

function GlassCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative p-8 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {children}
    </motion.div>
  );
}`,
  },
  {
    name: 'Counter Animation',
    category: 'Data',
    description: 'Zahlen animieren sich beim Erscheinen im Viewport',
    code: `import { motion, useInView, useMotionValue, useSpring, useEffect } from 'motion/react';
import { useRef } from 'react';

function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 10 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  spring.on("change", v => setDisplay(Math.round(v)));

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('de-DE')}{suffix}
    </span>
  );
}

// Verwendung:
// <AnimatedCounter value={250} suffix="+" />`,
  },
  {
    name: 'Page Transition',
    category: 'Navigation',
    description: 'Sanfter Seitenübergang für React Router',
    code: `import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

// In deiner App.tsx, umhülle deine Routes:
function AnimatedRoutes({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}`,
  },
];

const FRAMER_TOOLS = [
  {
    name: 'Framer',
    url: 'https://framer.com',
    description: 'Die beste No-Code/Low-Code Plattform für interaktive Websites und Motion Design. Publiziere fertige Seiten oder Prototypen direkt als Webseite – perfekt für Landingpages.',
    badge: 'Empfohlen',
    badgeColor: 'bg-purple-500/20 text-purple-400',
    useCases: ['Interaktive Landingpages', 'Animierte Portfolio-Seiten', 'Prototyping für Kunden-Pitches'],
  },
  {
    name: 'Framer Motion (bereits installiert)',
    url: 'https://motion.dev',
    description: 'Die führende React-Animationsbibliothek – bereits in deinem Projekt aktiv! Nutze die Code-Snippets links für sofortige Animationen.',
    badge: '✅ Aktiv',
    badgeColor: 'bg-emerald-500/20 text-emerald-400',
    useCases: ['Scroll-Animationen', 'Hover-Effekte', 'Seitenübergänge', 'Zähler-Animationen'],
  },
  {
    name: 'LottieFiles',
    url: 'https://lottiefiles.com',
    description: 'Kostenlose, hochwertige Micro-Animations als JSON-Dateien. Direkt in React einbindbar mit "lottie-react".',
    badge: 'Kostenlos',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    useCases: ['Loading Spinner', 'Erfolgs-Animationen', 'Illustrations-Animationen'],
  },
  {
    name: 'Rive',
    url: 'https://rive.app',
    description: 'State-Machine Animationen für React. Ideal für interaktive Illustrationen und Gaming-ähnliche UIs.',
    badge: 'Advanced',
    badgeColor: 'bg-orange-500/20 text-orange-400',
    useCases: ['Interaktive Hero-Grafiken', 'Animated Logos', 'Character Animations'],
  },
  {
    name: 'Spline',
    url: 'https://spline.design',
    description: '3D Design Tool für interaktive 3D-Szenen direkt im Browser. Embed-Code direkt in Webseiten einfügbar.',
    badge: '3D',
    badgeColor: 'bg-pink-500/20 text-pink-400',
    useCases: ['3D Hero-Bereiche', 'Produktvisualisierungen', 'Interaktive 3D-Hintergründe'],
  },
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function MotionStudio() {
  const [activeTab, setActiveTab] = useState<'presets' | 'generator' | 'framer' | 'tools'>('presets');
  const [selectedPreset, setSelectedPreset] = useState<typeof ANIMATION_PRESETS[0] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('Alle');

  // KI Generator
  const [genDescription, setGenDescription] = useState('');
  const [genContext, setGenContext] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  // Framer Embed
  const [framerUrl, setFramerUrl] = useState('');
  const [iframeHeight, setIframeHeight] = useState(600);

  const categories = ['Alle', ...new Set(ANIMATION_PRESETS.map(p => p.category))];
  const filteredPresets = filterCategory === 'Alle'
    ? ANIMATION_PRESETS
    : ANIMATION_PRESETS.filter(p => p.category === filterCategory);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateAnimation = async () => {
    if (!genDescription.trim()) { alert('Bitte beschreibe die Animation.'); return; }
    setGenerating(true);
    setGeneratedCode('');

    const prompt = `
Du bist ein React-Animations-Experte für Framer Motion (importiert als "motion/react").
Schreibe produktionsreifen, sofort einsetzbaren React/TypeScript Code.

Animation: ${genDescription}
Kontext: ${genContext || 'Moderne Videoproduktions-Agentur Website, dunkles Design, Akzentfarbe: Gold/Amber'}

Regeln:
- Importiere nur aus "motion/react" (NICHT aus "framer-motion")
- Verwende TypeScript
- Schreibe vollständigen, lauffähigen Code
- Füge hilfreiche Kommentare ein
- Nutze moderne Framer Motion Features (useInView, variants, spring, etc.)
- Code soll direkt in die bestehende React-App kopiert werden können

Antworte NUR mit dem Code, kein erklärender Text davor oder danach, kein Markdown.
    `;

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      let code = data.reply;
      // Strip markdown code fences if present
      code = code.replace(/^```(?:tsx|ts|jsx|js)?\n?/m, '').replace(/\n?```$/m, '').trim();
      setGeneratedCode(code);
    } catch (e) {
      alert('Fehler bei der Code-Generierung.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">

      {/* Tab Bar */}
      <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto shrink-0">
        {[
          { id: 'presets', label: 'Animation Presets', icon: Zap },
          { id: 'generator', label: 'KI Animations-Generator', icon: Wand2 },
          { id: 'framer', label: 'Framer Embed', icon: Layers },
          { id: 'tools', label: 'Motion Tools', icon: Sparkles },
        ].map(tab => (
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
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden flex">

        {/* ── Tab: Animation Presets ── */}
        {activeTab === 'presets' && (
          <>
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 bg-white/5 flex flex-col overflow-hidden shrink-0">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-bold text-white text-sm">Kategorien</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      filterCategory === cat
                        ? 'bg-brand-accent/20 text-brand-accent font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-white/10">
                <p className="text-xs text-gray-500">💡 Alle Presets nutzen die bereits installierte <code className="text-brand-accent">motion/react</code> Library.</p>
              </div>
            </div>

            {/* Preset List / Detail */}
            <div className="flex-1 overflow-y-auto p-6">
              {!selectedPreset ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPresets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPreset(preset)}
                      className="bg-white/5 border border-white/10 rounded-xl p-5 text-left hover:border-brand-accent/40 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white group-hover:text-brand-accent transition-colors">{preset.name}</h4>
                        <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded">{preset.category}</span>
                      </div>
                      <p className="text-sm text-gray-400">{preset.description}</p>
                      <div className="mt-3 flex items-center gap-1 text-brand-accent text-xs font-bold">
                        <Code2 size={12} /> Code anzeigen →
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="max-w-3xl">
                  <button
                    onClick={() => setSelectedPreset(null)}
                    className="text-sm text-gray-400 hover:text-white mb-4 flex items-center gap-1"
                  >
                    ← Zurück zur Übersicht
                  </button>
                  <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-white text-lg">{selectedPreset.name}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">{selectedPreset.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(selectedPreset.code, selectedPreset.name)}
                          className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all"
                        >
                          {copiedId === selectedPreset.name ? <Check size={14} /> : <Copy size={14} />}
                          {copiedId === selectedPreset.name ? 'Kopiert!' : 'Kopieren'}
                        </button>
                      </div>
                    </div>
                    <pre className="p-6 text-sm text-gray-300 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
                      <code>{selectedPreset.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Tab: KI Generator ── */}
        {activeTab === 'generator' && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Wand2 className="text-brand-accent w-7 h-7" />
                <div>
                  <h2 className="text-2xl font-bold text-white">KI Animations-Generator</h2>
                  <p className="text-gray-400 text-sm">Beschreibe deine Animation – Gemini schreibt den fertigen Framer Motion Code.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Was soll animiert werden? *</label>
                  <textarea
                    value={genDescription}
                    onChange={e => setGenDescription(e.target.value)}
                    rows={3}
                    placeholder="z.B. Eine Hero-Section, bei der der Titel Buchstabe für Buchstabe erscheint, gefolgt von einem Button der von unten reinfliegt..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Design-Kontext (optional)</label>
                  <input
                    type="text"
                    value={genContext}
                    onChange={e => setGenContext(e.target.value)}
                    placeholder="z.B. Dunkles Agentur-Design, goldene Akzentfarbe, Premium-Feeling"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>
                <button
                  onClick={generateAnimation}
                  disabled={generating}
                  className="w-full bg-brand-accent text-brand-bg py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {generating ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                  {generating ? 'Generiere Code...' : 'Animations-Code generieren'}
                </button>
              </div>

              {generatedCode && (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Code2 size={18} className="text-brand-accent" /> Generierter Code
                    </h3>
                    <button
                      onClick={() => copyToClipboard(generatedCode, 'generated')}
                      className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"
                    >
                      {copiedId === 'generated' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === 'generated' ? 'Kopiert!' : 'Kopieren'}
                    </button>
                  </div>
                  <pre className="p-6 text-sm text-gray-300 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-[500px]">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Framer Embed ── */}
        {activeTab === 'framer' && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-brand-accent w-7 h-7" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Framer Seite einbetten</h2>
                  <p className="text-gray-400 text-sm">Bette deine in Framer gestaltete Landingpage direkt hier vor oder generiere den Embed-Code.</p>
                </div>
              </div>

              {/* How it works */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                <h4 className="font-bold text-blue-400 mb-3">💡 So funktioniert es</h4>
                <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                  <li>Erstelle deine Seite in <a href="https://framer.com" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Framer.com</a></li>
                  <li>Gehe in Framer zu <strong>Share → Publish</strong> und kopiere die URL</li>
                  <li>Füge die URL unten ein und previewe sie direkt hier</li>
                  <li>Nutze den generierten Embed-Code in deinen eigenen HTML-Landingpages</li>
                </ol>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Framer URL</label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={framerUrl}
                      onChange={e => setFramerUrl(e.target.value)}
                      placeholder="https://dein-projekt.framer.website/"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                    />
                    <a
                      href="https://framer.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 px-4 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap"
                    >
                      <ExternalLink size={16} /> Framer öffnen
                    </a>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Höhe: {iframeHeight}px</label>
                  <input
                    type="range"
                    min={300}
                    max={1200}
                    step={50}
                    value={iframeHeight}
                    onChange={e => setIframeHeight(Number(e.target.value))}
                    className="w-full accent-brand-accent"
                  />
                </div>

                {framerUrl && (
                  <>
                    {/* Embed Code */}
                    <div className="bg-black/40 rounded-lg p-4">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Embed Code</p>
                      <code className="text-xs text-brand-accent font-mono block whitespace-pre-wrap">
                        {`<iframe\n  src="${framerUrl}"\n  width="100%"\n  height="${iframeHeight}"\n  frameborder="0"\n  style="border: none;"\n  allow="autoplay; encrypted-media"\n></iframe>`}
                      </code>
                      <button
                        onClick={() => copyToClipboard(
                          `<iframe\n  src="${framerUrl}"\n  width="100%"\n  height="${iframeHeight}"\n  frameborder="0"\n  style="border: none;"\n  allow="autoplay; encrypted-media"\n></iframe>`,
                          'framer-embed'
                        )}
                        className="mt-3 bg-brand-accent text-brand-bg px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1"
                      >
                        {copiedId === 'framer-embed' ? <Check size={12} /> : <Copy size={12} />}
                        Kopieren
                      </button>
                    </div>

                    {/* Live Preview */}
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <Eye size={12} /> Live Preview
                      </p>
                      <div className="rounded-xl overflow-hidden border border-white/10">
                        <iframe
                          src={framerUrl}
                          width="100%"
                          height={iframeHeight}
                          frameBorder="0"
                          style={{ border: 'none', display: 'block' }}
                          title="Framer Preview"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Motion Tools ── */}
        {activeTab === 'tools' && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-brand-accent w-7 h-7" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Motion & Animation Tools</h2>
                  <p className="text-gray-400 text-sm">Das beste Ökosystem für Animationen und Motion Design.</p>
                </div>
              </div>

              <div className="space-y-4">
                {FRAMER_TOOLS.map(tool => (
                  <div key={tool.name} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-brand-accent/30 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-white text-lg">{tool.name}</h4>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${tool.badgeColor}`}>{tool.badge}</span>
                        </div>
                        <p className="text-sm text-gray-400">{tool.description}</p>
                      </div>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                      >
                        <ExternalLink size={14} /> Öffnen
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tool.useCases.map(uc => (
                        <span key={uc} className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-md">{uc}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
