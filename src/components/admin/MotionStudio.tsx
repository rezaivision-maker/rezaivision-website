import React, { useState, useEffect, useRef } from 'react';
import { Wand2, Loader2, Copy, Check, ExternalLink, Code2, Layers, Sparkles, Play, Zap, MousePointer, Eye, Video, Download, Sliders, Settings, RefreshCw } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'presets' | 'exporter' | 'generator' | 'framer' | 'tools'>('presets');
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

  // Video Exporter State
  const [exportPreset, setExportPreset] = useState<'lower-third' | 'social-callout' | 'kinetic' | 'wipe' | 'cta'>('lower-third');
  const [exportFormat, setExportFormat] = useState<'webm-transparent' | 'green-screen' | 'blue-screen' | 'black'>('webm-transparent');
  const [exportResolution, setExportResolution] = useState<'16-9' | '9-16'>('16-9');
  const [exportDuration, setExportDuration] = useState(4.0);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);

  // Customizer Inputs
  const [text1, setText1] = useState('Max Rezai');
  const [text2, setText2] = useState('Director of Photography');
  const [accentColor, setAccentColor] = useState('#C9FF68');
  const [secondaryColor, setSecondaryColor] = useState('#0c0c0e');
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [fontSize, setFontSize] = useState(48);
  const [socialPlatform, setSocialPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Sync inputs with selected preset
  useEffect(() => {
    if (exportPreset === 'lower-third') {
      setText1('Max Rezai');
      setText2('Director & Producer');
      setExportDuration(4.0);
      setFontSize(48);
    } else if (exportPreset === 'social-callout') {
      setText1('@rezaivision');
      setExportDuration(4.0);
      setFontSize(44);
    } else if (exportPreset === 'kinetic') {
      setText1('DIESES GEHEIMNIS ÄNDERT EINFACH ALLES!');
      setExportDuration(4.5);
      setFontSize(72);
    } else if (exportPreset === 'wipe') {
      setExportDuration(1.5);
    } else if (exportPreset === 'cta') {
      setText1('JETZT KANÄLE ABONNIEREN');
      setExportDuration(4.0);
      setFontSize(42);
    }
  }, [exportPreset]);

  // Listen for pending motion graphic exports sent from other views (like ProductionSuite)
  useEffect(() => {
    const checkPendingExport = () => {
      const pending = localStorage.getItem('pending-motion-export');
      if (pending) {
        try {
          const config = JSON.parse(pending);
          if (config.preset) setExportPreset(config.preset);
          if (config.text1) setText1(config.text1);
          if (config.text2) setText2(config.text2 || '');
          if (config.socialPlatform) setSocialPlatform(config.socialPlatform);
          if (config.fontSize) setFontSize(config.fontSize);
          
          setActiveTab('exporter'); // switch MotionStudio internal tab to 'exporter'
          
          localStorage.removeItem('pending-motion-export');
        } catch (e) {
          console.error('Error parsing pending motion export:', e);
        }
      }
    };

    checkPendingExport();

    window.addEventListener('storage', checkPendingExport);
    return () => window.removeEventListener('storage', checkPendingExport);
  }, []);

  // Round Rect rendering helper for canvas
  const drawRoundRectOnly = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const drawFrame = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    duration: number
  ) => {
    ctx.clearRect(0, 0, width, height);

    if (exportFormat === 'green-screen') {
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(0, 0, width, height);
    } else if (exportFormat === 'blue-screen') {
      ctx.fillStyle = '#0000FF';
      ctx.fillRect(0, 0, width, height);
    } else if (exportFormat === 'black') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.save();

    // Easing helper definitions
    const easeOutBack = (x: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };

    const easeOutExpo = (x: number) => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const easeInOutQuad = (x: number) => {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    };

    if (exportPreset === 'lower-third') {
      // 🎬 Lower Third (Name + Title)
      let slideProgress = 0;
      let opacity = 0;

      if (elapsed < 0.8) {
        slideProgress = easeOutExpo(elapsed / 0.8);
      } else if (elapsed < 3.2) {
        slideProgress = 1;
      } else {
        const outTime = elapsed - 3.2;
        slideProgress = 1 - easeOutExpo(Math.min(outTime / 0.8, 1));
      }

      if (elapsed > 0.5 && elapsed < 3.5) {
        const fadeIn = (elapsed - 0.5) / 0.5;
        opacity = Math.min(fadeIn, 1);
        if (elapsed > 3.2) {
          const fadeOut = (3.5 - elapsed) / 0.3;
          opacity = Math.max(fadeOut, 0);
        }
      } else if (elapsed <= 0.5) {
        opacity = 0;
      } else {
        opacity = 0;
      }

      const baseX = exportResolution === '16-9' ? 120 : 80;
      const baseY = exportResolution === '16-9' ? 820 : 1450;
      const cardWidth = 550;
      const cardHeight = 140;

      // Draw base bar
      ctx.fillStyle = accentColor;
      const barX = baseX - (1 - slideProgress) * 200;
      ctx.fillRect(barX, baseY, 12, cardHeight);

      // Draw backdrop
      if (exportFormat === 'webm-transparent') {
        ctx.fillStyle = 'rgba(15, 15, 15, 0.65)';
      } else {
        ctx.fillStyle = 'rgba(25, 25, 25, 0.9)';
      }
      
      const cardX = baseX + 12 - (1 - slideProgress) * 200;
      ctx.fillRect(cardX, baseY, cardWidth * slideProgress, cardHeight);

      if (slideProgress > 0.2 && opacity > 0) {
        ctx.save();
        ctx.globalAlpha = opacity;
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';
        ctx.fillText(text1, cardX + 30, baseY + 25);

        ctx.fillStyle = '#A0A0A0';
        ctx.font = `${fontSize * 0.6}px ${fontFamily}`;
        ctx.fillText(text2, cardX + 30, baseY + 25 + fontSize + 10);
        
        ctx.restore();
      }
    } else if (exportPreset === 'social-callout') {
      // 📸 Social Callout
      let scale = 0;
      if (elapsed < 0.8) {
        scale = easeOutBack(elapsed / 0.8);
      } else if (elapsed < 3.2) {
        scale = 1;
      } else {
        const outTime = elapsed - 3.2;
        scale = 1 - easeOutExpo(Math.min(outTime / 0.8, 1));
      }

      if (scale > 0) {
        const centerX = exportResolution === '16-9' ? 960 : 540;
        const centerY = exportResolution === '16-9' ? 850 : 1500;
        const pillWidth = 480;
        const pillHeight = 80;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);

        ctx.fillStyle = '#18181B';
        ctx.lineWidth = 3;
        ctx.strokeStyle = accentColor;
        
        drawRoundRectOnly(ctx, -pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, 40);
        ctx.fill();
        ctx.stroke();

        // Draw Platform Icon
        ctx.save();
        ctx.translate(-pillWidth / 2 + 45, 0);

        if (socialPlatform === 'instagram') {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3.5;
          ctx.strokeRect(-16, -16, 32, 32);
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(9, -9, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (socialPlatform === 'tiktok') {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.fillRect(-4, -18, 6, 26);
          ctx.arc(-4, 8, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(6, -18, 10, Math.PI, Math.PI * 1.5, false);
          ctx.stroke();
        } else if (socialPlatform === 'youtube') {
          ctx.fillStyle = '#FF0000';
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(-20, -14, 40, 28, 6) : ctx.fillRect(-20, -14, 40, 28);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.moveTo(-6, -8);
          ctx.lineTo(8, 0);
          ctx.lineTo(-6, 8);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(text1, -pillWidth / 2 + 95, 0);

        ctx.restore();
      }
    } else if (exportPreset === 'kinetic') {
      // ✍️ Kinetic Typography
      const words = text1.split(' ');
      if (words.length > 0) {
        const wordIdx = Math.floor(elapsed / 0.35) % words.length;
        const currentWord = words[wordIdx].toUpperCase();
        
        const wordTime = elapsed % 0.35;
        let wordScale = 0.7 + easeOutBack(Math.min(wordTime / 0.12, 1)) * 0.3;

        const centerX = exportResolution === '16-9' ? 960 : 540;
        const centerY = exportResolution === '16-9' ? 540 : 960;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(wordScale, wordScale);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 20;

        ctx.fillStyle = wordIdx % 3 === 0 ? accentColor : '#FFFFFF';
        ctx.font = `black italic ${fontSize * 2.2}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentWord, 0, 0);

        ctx.restore();
      }
    } else if (exportPreset === 'wipe') {
      // 🔀 Transition Wipe
      const progress = Math.min(elapsed / 1.5, 1);
      const startX = -1200;
      const endX = width + 1200;
      const currentX = startX + (endX - startX) * progress;

      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(currentX, 0);
      ctx.lineTo(currentX + 700, 0);
      ctx.lineTo(currentX + 300, height);
      ctx.lineTo(currentX - 400, height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = secondaryColor || '#0c0c0e';
      ctx.beginPath();
      ctx.moveTo(currentX - 250, 0);
      ctx.lineTo(currentX + 250, 0);
      ctx.lineTo(currentX - 150, height);
      ctx.lineTo(currentX - 650, height);
      ctx.closePath();
      ctx.fill();
    } else if (exportPreset === 'cta') {
      // 🎯 CTA Button
      const centerX = exportResolution === '16-9' ? 960 : 540;
      const centerY = exportResolution === '16-9' ? 540 : 1100;
      const btnW = 480;
      const btnH = 90;

      let scale = 1.0;
      if (elapsed < 1.2) {
        scale = 1.0 + Math.sin(elapsed * Math.PI * 2) * 0.02;
      } else if (elapsed >= 1.5 && elapsed < 1.7) {
        const shrinkProgress = (elapsed - 1.5) / 0.2;
        scale = 1.0 - Math.sin(shrinkProgress * Math.PI) * 0.08;
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);

      ctx.fillStyle = accentColor;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 25;
      
      drawRoundRectOnly(ctx, -btnW / 2, -btnH / 2, btnW, btnH, 16);
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#000000';
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text1, 0, 0);

      ctx.restore();

      if (elapsed >= 1.5 && elapsed < 2.0) {
        const rippleProgress = (elapsed - 1.5) / 0.5;
        const rippleRadius = 25 + rippleProgress * 150;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 6 * (1 - rippleProgress);
        ctx.globalAlpha = 1 - rippleProgress;
        ctx.beginPath();
        ctx.arc(0, 0, rippleRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      let cursorX = centerX + 300;
      let cursorY = centerY + 300;
      let drawCursor = false;

      if (elapsed >= 1.0 && elapsed < 2.8) {
        drawCursor = true;
        if (elapsed < 1.5) {
          const t = (elapsed - 1.0) / 0.5;
          const easedT = easeOutExpo(t);
          cursorX = (centerX + 300) + (centerX - (centerX + 300)) * easedT;
          cursorY = (centerY + 300) + (centerY - (centerY + 300)) * easedT;
        } else if (elapsed < 1.7) {
          cursorX = centerX;
          cursorY = centerY;
        } else {
          const t = Math.min((elapsed - 1.7) / 0.8, 1);
          const easedT = easeInOutQuad(t);
          cursorX = centerX + (centerX + 300 - centerX) * easedT;
          cursorY = centerY + (centerY + 300 - centerY) * easedT;
        }
      }

      if (drawCursor) {
        ctx.save();
        ctx.translate(cursorX, cursorY);
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 24);
        ctx.lineTo(6, 18);
        ctx.lineTo(12, 28);
        ctx.lineTo(16, 26);
        ctx.lineTo(10, 16);
        ctx.lineTo(18, 16);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.restore();
  };

  // Preview Loop effect
  useEffect(() => {
    if (activeTab !== 'exporter') return;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        requestRef.current = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const elapsed = ((Date.now() - startTimeRef.current) / 1000) % exportDuration;

      // Draw frame
      drawFrame(ctx, canvas.width, canvas.height, elapsed, exportDuration);

      requestRef.current = requestAnimationFrame(render);
    };

    startTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeTab, exportPreset, exportFormat, exportResolution, exportDuration, text1, text2, accentColor, secondaryColor, fontFamily, fontSize, socialPlatform]);

  const startRecording = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setRendering(true);
    setRenderProgress(0);

    const stream = canvas.captureStream(30);
    
    let mimeType = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm;codecs=vp8';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }
    }

    const recordedChunks: Blob[] = [];
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 6000000
    });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rezai-motion-${exportPreset}-${exportResolution}-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setRendering(false);
      setRenderProgress(0);
    };

    startTimeRef.current = Date.now();
    mediaRecorder.start();

    const intervalTime = 100;
    const totalSteps = (exportDuration * 1000) / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setRenderProgress(Math.min((currentStep / totalSteps) * 100, 99));

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        mediaRecorder.stop();
      }
    }, intervalTime);
  };

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
          { id: 'exporter', label: 'Video Exporter', icon: Video },
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

        {/* ── Tab: Video Exporter ── */}
        {activeTab === 'exporter' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Panel: Settings & Customization */}
            <div className="w-full md:w-[450px] border-r border-white/10 bg-zinc-950/30 overflow-y-auto p-6 space-y-6 shrink-0">
              <div>
                <h3 className="font-black text-white text-lg flex items-center gap-2 mb-1">
                  <Sliders className="text-brand-accent w-5 h-5" /> Video-Exporter-Einstellungen
                </h3>
                <p className="text-gray-400 text-xs">Konfiguriere und render deine Motion Graphics als Video-Asset.</p>
              </div>

              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Animationstyp</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'lower-third', label: '🎬 Bauchbinde (Lower Third)', desc: 'Name & Titel Einblender' },
                    { id: 'social-callout', label: '📸 Social Bar (Follow Callout)', desc: 'Instagram, TikTok, YouTube Pill' },
                    { id: 'kinetic', label: '✍️ Kinetische Typografie', desc: 'Viral Reels Word Pop' },
                    { id: 'wipe', label: '🔀 Transition Wipe (Schnitt)', desc: 'Diagonal-Wischblende' },
                    { id: 'cta', label: '🎯 Call To Action (Klick-Button)', desc: 'Pulsierender Button mit Klick-Effekt' },
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setExportPreset(p.id as any)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        exportPreset === p.id
                          ? 'bg-brand-accent/10 border-brand-accent text-white'
                          : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <p className="font-bold text-sm">{p.label}</p>
                      <p className="text-[11px] opacity-75">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution & Format */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Seitenverhältnis</label>
                  <select
                    value={exportResolution}
                    onChange={e => setExportResolution(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="16-9">16:9 Landscape (1080p)</option>
                    <option value="9-16">9:16 Portrait (Reels)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Hintergrund</label>
                  <select
                    value={exportFormat}
                    onChange={e => setExportFormat(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="webm-transparent">Transparent (WebM Alpha)</option>
                    <option value="green-screen">Green Screen (Chroma Key)</option>
                    <option value="blue-screen">Blue Screen</option>
                    <option value="black">Schwarzer Hintergrund</option>
                  </select>
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Customizer Panel */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="text-gray-400 w-4 h-4" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inhalt anpassen</span>
                </div>

                {/* Text 1 Input */}
                {exportPreset !== 'wipe' && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500">
                      {exportPreset === 'lower-third' && 'Name'}
                      {exportPreset === 'social-callout' && 'Social Handle'}
                      {exportPreset === 'kinetic' && 'Hook-Satz / Text'}
                      {exportPreset === 'cta' && 'Button-Text'}
                    </label>
                    <input
                      type="text"
                      value={text1}
                      onChange={e => setText1(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                )}

                {/* Text 2 Input (Lower third only) */}
                {exportPreset === 'lower-third' && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500">Jobbezeichnung / Untertitel</label>
                    <input
                      type="text"
                      value={text2}
                      onChange={e => setText2(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                )}

                {/* Platform select (Social only) */}
                {exportPreset === 'social-callout' && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500">Plattform</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'instagram', label: 'Instagram' },
                        { id: 'tiktok', label: 'TikTok' },
                        { id: 'youtube', label: 'YouTube' },
                      ].map(p => (
                        <button
                          key={p.id}
                          onClick={() => setSocialPlatform(p.id as any)}
                          className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            socialPlatform === p.id
                              ? 'bg-white text-black border-white'
                              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500">Akzentfarbe</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={e => setAccentColor(e.target.value)}
                        className="bg-transparent border border-white/10 rounded cursor-pointer w-9 h-9"
                      />
                      <input
                        type="text"
                        value={accentColor.toUpperCase()}
                        onChange={e => setAccentColor(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  {exportPreset === 'wipe' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-500">Hintergrund-Wipe</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={e => setSecondaryColor(e.target.value)}
                          className="bg-transparent border border-white/10 rounded cursor-pointer w-9 h-9"
                        />
                        <input
                          type="text"
                          value={secondaryColor.toUpperCase()}
                          onChange={e => setSecondaryColor(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white uppercase focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Font Styling options */}
                {exportPreset !== 'wipe' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-500">Schriftart</label>
                      <select
                        value={fontFamily}
                        onChange={e => setFontFamily(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Outfit">Outfit (Rezai Standard)</option>
                        <option value="Inter">Inter</option>
                        <option value="Playfair Display">Playfair Display</option>
                        <option value="Montserrat">Montserrat</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-500">Schriftgröße ({fontSize}px)</label>
                      <input
                        type="range"
                        min={24}
                        max={120}
                        step={2}
                        value={fontSize}
                        onChange={e => setFontSize(Number(e.target.value))}
                        className="w-full accent-brand-accent"
                      />
                    </div>
                  </div>
                )}

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500">Animations-Dauer: {exportDuration}s</label>
                  <input
                    type="range"
                    min={1.0}
                    max={10.0}
                    step={0.5}
                    value={exportDuration}
                    onChange={e => setExportDuration(Number(e.target.value))}
                    className="w-full accent-brand-accent"
                  />
                </div>
              </div>

              {/* Render Trigger */}
              <div className="pt-4">
                <button
                  onClick={startRecording}
                  disabled={rendering}
                  className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-black text-md flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50"
                >
                  {rendering ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Rendert... {Math.round(renderProgress)}%
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Render & Video downloaden (.webm)
                    </>
                  )}
                </button>
                <p className="text-[10px] text-gray-500 mt-2 text-center">
                  💡 Transparent exportierte WebM-Dateien können direkt in Premiere Pro, DaVinci Resolve und CapCut über dein Videomaterial gelegt werden.
                </p>
              </div>
            </div>

            {/* Right Panel: Live View & Monitor */}
            <div className="flex-1 bg-black/60 p-6 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <div>
                  <h4 className="font-bold text-white text-md flex items-center gap-2">
                    <Eye size={16} className="text-brand-accent" /> Live-Vorschau
                  </h4>
                  <p className="text-xs text-gray-500">Echtzeit-Simulationsmonitor. Skalierung entspricht der Ausgabequalität.</p>
                </div>
                <button
                  onClick={() => { startTimeRef.current = Date.now(); }}
                  className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={12} />
                  Restart Loop
                </button>
              </div>

              {/* Aspect Ratio Viewport Container */}
              <div className="flex-1 flex items-center justify-center p-4 min-h-[300px]">
                <div 
                  className={`relative border-2 border-dashed border-white/20 rounded-xl overflow-hidden shadow-2xl bg-zinc-950 flex items-center justify-center transition-all duration-300 ${
                    exportResolution === '16-9' 
                      ? 'w-full max-w-[640px] aspect-video' 
                      : 'h-full max-h-[500px] aspect-[9/16]'
                  }`}
                >
                  {/* Backdrop texture check for transparency representation */}
                  {exportFormat === 'webm-transparent' && (
                    <div 
                      className="absolute inset-0 opacity-10" 
                      style={{
                        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0), radial-gradient(#ffffff 1px, transparent 0)',
                        backgroundSize: '16px 16px',
                        backgroundPosition: '0 0, 8px 8px'
                      }}
                    />
                  )}

                  <canvas
                    ref={canvasRef}
                    width={exportResolution === '16-9' ? 1920 : 1080}
                    height={exportResolution === '16-9' ? 1080 : 1920}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              </div>

              {/* Tips block */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 text-xs text-gray-400">
                <span className="font-bold text-white block mb-1">💡 Videobearbeitungs-Tipp:</span>
                Wenn dein Videoprogramm transparente WebMs nicht nativ unterstützt: Wähle als Hintergrund <strong>Green Screen</strong>. In Premiere/Resolve kannst du dann den effekt „Ultra Key“ / „Chroma Key“ auf die Spur legen, um den grünen Hintergrund mit einem Klick unsichtbar zu machen.
              </div>
            </div>
          </div>
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
