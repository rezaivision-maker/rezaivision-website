import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video, Search, Wand2, Loader2, Copy, Check, ChevronDown, ChevronUp,
  Youtube, Instagram, Facebook, Globe, Zap, Brain, Target, Music,
  Camera, Play, RefreshCw, AlertCircle, Sparkles, FileText,
  ArrowRight, Clock, TrendingUp, Eye, BarChart2, Mic
} from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface AnalysisResult {
  zusammenfassung: string;
  hook: { sekunden: string; text: string; mechanismus: string; warum_es_funktioniert: string; emotion: string };
  struktur: Array<{ zeitstempel: string; was_passiert: string; psychologie: string }>;
  copy_analyse: { schluessel_woerter: string[]; trigger_phrasen: string[]; storytelling_typ: string; tonalitaet: string; frameworks: string[] };
  sound_strategie: { musik_tempo: string; musik_stimmung: string; soundeffekte: string; voice_tonalitaet: string; warum_dieser_sound: string };
  visuelle_sprache: { schnitt_rhythmus: string; farbwelt: string; kamera_stil: string; besondere_elemente: string[] };
  psychologie_framework: { hauptprinzip: string; zielgruppen_schmerz: string; warum_kein_wegscrollen: string; vertrauen_aufbau: string };
  cta_analyse: { cta_text: string; cta_timing: string; cta_psychologie: string; dringlichkeit: string };
  erfolgs_faktoren: string[];
  schwaechen: string[];
  plattform_optimierung: { warum_viral_auf_dieser_plattform: string; algorithmus_faktoren: string[] };
}

interface RebuildResult {
  titel: string;
  angepasster_hook: { text: string; warum: string; varianten: string[] };
  video_skript: Array<{ sekunden: string; sprecher_text: string; visual: string; ton: string }>;
  caption: { instagram: string; tiktok: string; facebook: string };
  sound_empfehlung: { musik_stil: string; tempo_bpm: string; suno_prompt: string; sound_effekte: string[] };
  dreh_anweisungen: { equipment: string[]; location: string; shots: Array<{ shot: string; beschreibung: string; kamera: string }> };
  higgsfield_prompts: string[];
  cta: { text: string; timing: string; link_empfehlung: string };
}

interface FormatData {
  nische: string;
  markt_analyse: string;
  formate: Array<{
    rang: number; name: string; beschreibung: string; warum_viral: string;
    struktur: string[]; hook_beispiele: string[]; sound_typ: string;
    beste_plattform: string; schwierigkeitsgrad: string; produktionszeit: string;
    conversion_potential: string; beispiel_nischen: string[];
  }>;
  top_hooks_fuer_nische: string[];
  psychologie_der_nische: { hauptschmerzen: string[]; groesste_wuensche: string[]; vertrauen_aufbau: string; trigger_woerter: string[] };
  content_kalender: { woche_1: string[]; woche_2: string[]; woche_3: string[]; woche_4: string[] };
}

// ─────────────────────────────────────────────
// Platform detector
// ─────────────────────────────────────────────
const detectPlatform = (url: string): string => {
  if (!url) return '';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('instagram.com') || url.includes('instagr.am')) return 'instagram';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('facebook.com') || url.includes('fb.com') || url.includes('fb.watch')) return 'facebook';
  return 'other';
};

const PLATFORM_ICONS: Record<string, { icon: React.ElementType; color: string; label: string; canAnalyze: boolean }> = {
  youtube: { icon: Youtube, color: 'text-red-500', label: 'YouTube', canAnalyze: true },
  instagram: { icon: Instagram, color: 'text-pink-500', label: 'Instagram', canAnalyze: false },
  tiktok: { icon: Video, color: 'text-teal-400', label: 'TikTok', canAnalyze: false },
  facebook: { icon: Facebook, color: 'text-blue-500', label: 'Facebook', canAnalyze: false },
  other: { icon: Globe, color: 'text-gray-400', label: 'Webseite', canAnalyze: false },
};

// ─────────────────────────────────────────────
// Section Card Component
// ─────────────────────────────────────────────
function Section({ title, icon: Icon, color = 'text-brand-accent', children, defaultOpen = true }: {
  title: string; icon: React.ElementType; color?: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-2">
          <Icon size={16} className={color} />
          <span className="font-bold text-white text-sm">{title}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function Tag({ text, color = 'bg-white/10 text-gray-300' }: { text: string; color?: string }) {
  return <span className={`text-xs px-2 py-1 rounded-md font-medium ${color}`}>{text}</span>;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="shrink-0 bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white p-1.5 rounded-lg transition-all"
    >
      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
    </button>
  );
}

// ─────────────────────────────────────────────
// ANALYSIS DISPLAY
// ─────────────────────────────────────────────
function AnalysisDisplay({ data, onRebuild }: { data: AnalysisResult; onRebuild: () => void }) {
  const emotionColor = 'bg-yellow-500/10 text-yellow-400';
  const successColor = 'bg-emerald-500/10 text-emerald-400';

  return (
    <div className="space-y-4">
      {/* Summary Banner */}
      <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-5">
        <p className="text-brand-accent font-bold text-lg leading-relaxed">{data.zusammenfassung}</p>
      </div>

      {/* Hook */}
      <Section title="⚡ Hook-Analyse (die ersten 3 Sekunden)" icon={Zap} color="text-yellow-400">
        <div className="space-y-3">
          <div className="bg-black/30 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Hook Text</p>
            <div className="flex items-start gap-2">
              <p className="text-white font-medium flex-1">"{data.hook.text}"</p>
              <CopyButton text={data.hook.text} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Mechanismus</p>
              <span className={`text-sm font-bold px-2 py-1 rounded ${emotionColor}`}>{data.hook.mechanismus}</span>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Ausgelöste Emotion</p>
              <p className="text-white text-sm font-medium">{data.hook.emotion}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Zeitfenster</p>
              <p className="text-white text-sm font-medium">{data.hook.sekunden}s</p>
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Warum es funktioniert</p>
            <p className="text-gray-200 text-sm">{data.hook.warum_es_funktioniert}</p>
          </div>
        </div>
      </Section>

      {/* Structure */}
      <Section title="🎬 Video-Struktur (Sekunde für Sekunde)" icon={Clock} color="text-blue-400">
        <div className="space-y-2">
          {data.struktur.map((s, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xs font-mono text-brand-accent bg-brand-accent/10 px-2 py-1 rounded shrink-0 mt-0.5">{s.zeitstempel}</span>
              <div className="flex-1 bg-black/20 rounded-lg p-3">
                <p className="text-white text-sm font-medium mb-1">{s.was_passiert}</p>
                <p className="text-gray-400 text-xs">💡 {s.psychologie}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Psychologie */}
      <Section title="🧠 Psychologie-Framework" icon={Brain} color="text-purple-400">
        <div className="space-y-3">
          <div className="bg-black/20 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Hauptprinzip</p>
            <p className="text-purple-400 font-bold text-lg">{data.psychologie_framework.hauptprinzip}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Zielgruppen-Schmerz</p>
              <p className="text-white text-sm">{data.psychologie_framework.zielgruppen_schmerz}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Vertrauen-Aufbau</p>
              <p className="text-white text-sm">{data.psychologie_framework.vertrauen_aufbau}</p>
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Warum kein Wegscrollenn?</p>
            <p className="text-white text-sm">{data.psychologie_framework.warum_kein_wegscrollen}</p>
          </div>
        </div>
      </Section>

      {/* Sound */}
      <Section title="🎵 Sound-Strategie" icon={Music} color="text-pink-400">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Musik Tempo', val: data.sound_strategie.musik_tempo },
            { label: 'Musik Stimmung', val: data.sound_strategie.musik_stimmung },
            { label: 'Voice Tonalität', val: data.sound_strategie.voice_tonalitaet },
            { label: 'Sound-Effekte', val: data.sound_strategie.soundeffekte },
          ].map(({ label, val }) => (
            <div key={label} className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">{label}</p>
              <p className="text-white text-sm">{val}</p>
            </div>
          ))}
          <div className="md:col-span-2 bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Warum dieser Sound</p>
            <p className="text-gray-200 text-sm">{data.sound_strategie.warum_dieser_sound}</p>
          </div>
        </div>
      </Section>

      {/* Copy */}
      <Section title="✍️ Copy & Text-Analyse" icon={FileText} color="text-emerald-400">
        <div className="space-y-3">
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Storytelling-Typ</p>
            <Tag text={data.copy_analyse.storytelling_typ} color="bg-emerald-500/20 text-emerald-400" />
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Trigger-Phrasen</p>
            <div className="flex flex-wrap gap-2">
              {data.copy_analyse.trigger_phrasen.map(p => (
                <div key={p} className="flex items-center gap-1 bg-brand-accent/10 text-brand-accent px-2 py-1 rounded text-xs font-medium">
                  "{p}" <CopyButton text={p} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Schlüsselwörter</p>
            <div className="flex flex-wrap gap-2">
              {data.copy_analyse.schluessel_woerter.map(w => <Tag key={w} text={w} />)}
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Genutzte Frameworks</p>
            <div className="flex flex-wrap gap-2">
              {data.copy_analyse.frameworks.map(f => <Tag key={f} text={f} color="bg-blue-500/20 text-blue-400" />)}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section title="🎯 CTA-Analyse" icon={Target} color="text-orange-400">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">CTA Text</p>
            <div className="flex items-center gap-2">
              <p className="text-orange-400 font-bold text-sm">"{data.cta_analyse.cta_text}"</p>
              <CopyButton text={data.cta_analyse.cta_text} />
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Timing</p>
            <p className="text-white text-sm">{data.cta_analyse.cta_timing}</p>
          </div>
          <div className="md:col-span-2 bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Warum funktioniert dieser CTA?</p>
            <p className="text-gray-200 text-sm">{data.cta_analyse.cta_psychologie}</p>
          </div>
        </div>
      </Section>

      {/* Success Factors */}
      <Section title="⭐ Erfolgsfaktoren" icon={TrendingUp} color="text-emerald-400">
        <div className="space-y-2">
          {data.erfolgs_faktoren.map((f, i) => (
            <div key={i} className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
              <span className="text-emerald-400 font-black text-sm shrink-0">#{i + 1}</span>
              <p className="text-gray-200 text-sm">{f}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Rebuild CTA */}
      <button
        onClick={onRebuild}
        className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-brand-accent/20"
      >
        <Wand2 size={22} /> Für meinen Kunden umbauen →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// REBUILD DISPLAY
// ─────────────────────────────────────────────
function RebuildDisplay({ data }: { data: RebuildResult }) {
  return (
    <div className="space-y-4">
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
        <h3 className="font-black text-white text-xl">{data.titel}</h3>
        <p className="text-emerald-400 text-sm mt-1">✅ Vollständiges Video-Paket generiert</p>
      </div>

      {/* Hook */}
      <Section title="⚡ Angepasster Hook" icon={Zap} color="text-yellow-400">
        <div className="space-y-3">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <p className="text-white font-bold text-lg flex-1">"{data.angepasster_hook.text}"</p>
              <CopyButton text={data.angepasster_hook.text} />
            </div>
            <p className="text-yellow-400/70 text-xs mt-2">{data.angepasster_hook.warum}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase">3 Hook-Varianten</p>
            {data.angepasster_hook.varianten.map((v, i) => (
              <div key={i} className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
                <span className="text-brand-accent text-xs font-bold">V{i + 1}</span>
                <p className="text-white text-sm flex-1">"{v}"</p>
                <CopyButton text={v} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Script */}
      <Section title="🎬 Video-Skript (sprechfertig)" icon={Mic} color="text-blue-400">
        <div className="space-y-3">
          {data.video_skript.map((s, i) => (
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-white/5 px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-mono text-brand-accent font-bold">{s.sekunden}</span>
                <CopyButton text={`[${s.sekunden}]\nText: ${s.sprecher_text}\nVisual: ${s.visual}\nTon: ${s.ton}`} />
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1"><Mic size={10} /> Sprecher</p>
                  <p className="text-white">{s.sprecher_text}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1"><Camera size={10} /> Visual</p>
                  <p className="text-gray-300">{s.visual}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1"><Music size={10} /> Ton</p>
                  <p className="text-gray-300">{s.ton}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Captions */}
      <Section title="📱 Fertige Captions" icon={FileText} color="text-pink-400">
        <div className="space-y-3">
          {[
            { platform: '📸 Instagram', text: data.caption.instagram, color: 'text-pink-400' },
            { platform: '🎵 TikTok', text: data.caption.tiktok, color: 'text-teal-400' },
            { platform: '👥 Facebook', text: data.caption.facebook, color: 'text-blue-400' },
          ].map(({ platform, text, color }) => (
            <div key={platform} className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-bold uppercase ${color}`}>{platform}</p>
                <CopyButton text={text} />
              </div>
              <p className="text-gray-200 text-sm whitespace-pre-wrap">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sound */}
      <Section title="🎵 Sound-Empfehlung" icon={Music} color="text-pink-400">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Musik-Stil</p>
              <p className="text-white text-sm">{data.sound_empfehlung.musik_stil}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Tempo</p>
              <p className="text-white text-sm">{data.sound_empfehlung.tempo_bpm}</p>
            </div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-yellow-400 uppercase">🎸 Suno AI Prompt</p>
              <CopyButton text={data.sound_empfehlung.suno_prompt} />
            </div>
            <p className="text-gray-200 text-sm font-mono">{data.sound_empfehlung.suno_prompt}</p>
          </div>
        </div>
      </Section>

      {/* Shooting */}
      <Section title="🎥 Dreh-Anweisungen" icon={Camera} color="text-orange-400">
        <div className="space-y-3">
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Location</p>
            <p className="text-white text-sm">{data.dreh_anweisungen.location}</p>
          </div>
          <div className="space-y-2">
            {data.dreh_anweisungen.shots.map((shot, i) => (
              <div key={i} className="bg-black/20 rounded-lg p-3 flex gap-3">
                <span className="text-brand-accent font-black text-sm shrink-0">{shot.shot}</span>
                <div>
                  <p className="text-white text-sm">{shot.beschreibung}</p>
                  <p className="text-gray-400 text-xs mt-1">📷 {shot.kamera}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Higgsfield */}
      {data.higgsfield_prompts?.length > 0 && (
        <Section title="🤖 Higgsfield KI-Video Prompts" icon={Video} color="text-teal-400">
          <div className="space-y-2">
            {data.higgsfield_prompts.map((p, i) => (
              <div key={i} className="bg-black/30 rounded-lg p-4 flex gap-2">
                <span className="text-teal-400 font-bold text-xs shrink-0">#{i + 1}</span>
                <p className="text-gray-200 text-sm font-mono flex-1">{p}</p>
                <CopyButton text={p} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// FORMAT FINDER DISPLAY
// ─────────────────────────────────────────────
function FormatFinderDisplay({ data, onSelectFormat }: { data: FormatData; onSelectFormat: (fmt: any) => void }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  const convColor: Record<string, string> = {
    'Sehr hoch': 'bg-emerald-500/20 text-emerald-400',
    'Hoch': 'bg-blue-500/20 text-blue-400',
    'Mittel': 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <div className="space-y-6">
      {/* Niche Summary */}
      <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-5">
        <h3 className="text-brand-accent font-bold text-lg mb-2">Markt-Analyse: {data.nische}</h3>
        <p className="text-gray-200 text-sm">{data.markt_analyse}</p>
      </div>

      {/* Psychology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2"><Brain size={16} className="text-purple-400" /> Psychologie der Zielgruppe</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold text-red-400 uppercase mb-2">🔴 Größte Schmerzen</p>
              <ul className="space-y-1">{data.psychologie_der_nische.hauptschmerzen.map(s => <li key={s} className="text-sm text-gray-300">→ {s}</li>)}</ul>
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 uppercase mb-2">🟢 Größte Wünsche</p>
              <ul className="space-y-1">{data.psychologie_der_nische.groesste_wuensche.map(w => <li key={w} className="text-sm text-gray-300">→ {w}</li>)}</ul>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2"><Zap size={16} className="text-yellow-400" /> Trigger-Wörter</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.psychologie_der_nische.trigger_woerter.map(w => (
              <div key={w} className="flex items-center gap-1 bg-brand-accent/10 text-brand-accent px-2 py-1 rounded text-xs font-bold">
                {w} <CopyButton text={w} />
              </div>
            ))}
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase mb-1">Vertrauen aufbauen</p>
          <p className="text-gray-300 text-sm">{data.psychologie_der_nische.vertrauen_aufbau}</p>
        </div>
      </div>

      {/* Top Hooks */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h4 className="font-bold text-white mb-3 flex items-center gap-2"><Sparkles size={16} className="text-brand-accent" /> Top-Hooks für diese Nische</h4>
        <div className="space-y-2">
          {data.top_hooks_fuer_nische.map((hook, i) => (
            <div key={i} className="flex items-center gap-3 bg-black/20 rounded-lg px-4 py-3">
              <span className="text-brand-accent font-black text-sm shrink-0">#{i + 1}</span>
              <p className="text-white text-sm flex-1">"{hook}"</p>
              <CopyButton text={hook} />
            </div>
          ))}
        </div>
      </div>

      {/* Video Formats */}
      <div>
        <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2"><BarChart2 size={18} className="text-brand-accent" /> Die 7 besten Video-Formate</h4>
        <div className="space-y-3">
          {data.formate.map((fmt, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-brand-accent font-black text-lg">#{fmt.rang}</span>
                  <div className="text-left">
                    <p className="font-bold text-white">{fmt.name}</p>
                    <p className="text-gray-400 text-xs">{fmt.beste_plattform} · {fmt.produktionszeit} · {fmt.schwierigkeitsgrad}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${convColor[fmt.conversion_potential] || 'bg-gray-500/20 text-gray-400'}`}>
                    {fmt.conversion_potential}
                  </span>
                  {expanded === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </button>

              {expanded === i && (
                <div className="px-4 pb-4 space-y-4">
                  <p className="text-gray-300 text-sm">{fmt.beschreibung}</p>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <p className="text-xs font-bold text-purple-400 uppercase mb-1">🧠 Warum viral?</p>
                    <p className="text-gray-200 text-sm">{fmt.warum_viral}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Struktur</p>
                    <div className="space-y-1">
                      {fmt.struktur.map((s, j) => (
                        <div key={j} className="flex gap-2 text-sm">
                          <span className="text-brand-accent font-mono text-xs shrink-0 mt-0.5">{j + 1}.</span>
                          <span className="text-gray-300">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Hook-Beispiele</p>
                    <div className="space-y-1">
                      {fmt.hook_beispiele.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 bg-black/20 rounded px-3 py-2">
                          <p className="text-white text-sm flex-1">"{h}"</p>
                          <CopyButton text={h} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectFormat(fmt)}
                    className="w-full bg-brand-accent/20 hover:bg-brand-accent/40 text-brand-accent border border-brand-accent/30 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Wand2 size={14} /> Dieses Format für meinen Kunden umbauen
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function VideoIntelligence() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'formats' | 'rebuild'>('analyze');

  // Analyze state
  const [videoUrl, setVideoUrl] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState('');
  const [niche, setNiche] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState('');

  // Format Finder state
  const [formatNiche, setFormatNiche] = useState('');
  const [formatPlatform, setFormatPlatform] = useState('instagram');
  const [findingFormats, setFindingFormats] = useState(false);
  const [formatData, setFormatData] = useState<FormatData | null>(null);

  // Rebuild state
  const [rebuildContext, setRebuildContext] = useState('');
  const [rebuildNiche, setRebuildNiche] = useState('');
  const [rebuilding, setRebuilding] = useState(false);
  const [rebuildResult, setRebuildResult] = useState<RebuildResult | null>(null);
  const [selectedFormatForRebuild, setSelectedFormatForRebuild] = useState<any>(null);

  const handleUrlChange = (url: string) => {
    setVideoUrl(url);
    setDetectedPlatform(detectPlatform(url));
    setAnalysisResult(null);
    setAnalysisError('');
  };

  const analyze = async () => {
    if (!videoUrl.trim() && !captionText.trim()) {
      setAnalysisError('Bitte eine URL oder einen Text/Caption eingeben.');
      return;
    }
    setAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError('');

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'analyze',
          videoUrl: videoUrl.trim() || undefined,
          text: captionText.trim() || undefined,
          platform: detectedPlatform || undefined,
          niche: niche.trim() || undefined,
        }),
      });
      const data = await res.json();

      if (data.analysis) {
        setAnalysisResult(data.analysis);
      } else if (data.rawText) {
        setAnalysisError('KI-Antwort konnte nicht geparst werden. Rohantwort: ' + data.rawText.substring(0, 200));
      } else {
        setAnalysisError(data.error || 'Unbekannter Fehler');
      }
    } catch (e) {
      setAnalysisError('Verbindungsfehler. Bitte erneut versuchen.');
    } finally {
      setAnalyzing(false);
    }
  };

  const findFormats = async () => {
    if (!formatNiche.trim()) return;
    setFindingFormats(true);
    setFormatData(null);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'format-finder', niche: formatNiche, platform: formatPlatform }),
      });
      const data = await res.json();
      if (data.formatData) setFormatData(data.formatData);
    } catch (e) {
      alert('Fehler beim Format-Finder.');
    } finally {
      setFindingFormats(false);
    }
  };

  const rebuild = async () => {
    if (!rebuildContext.trim()) { alert('Bitte den Kundenkontext ausfüllen.'); return; }
    setRebuilding(true);
    setRebuildResult(null);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'rebuild',
          clientContext: rebuildContext,
          niche: rebuildNiche,
          analysisResult: analysisResult || selectedFormatForRebuild,
          text: !analysisResult && !selectedFormatForRebuild ? captionText : undefined,
        }),
      });
      const data = await res.json();
      if (data.rebuild) setRebuildResult(data.rebuild);
    } catch (e) {
      alert('Fehler beim Rebuild.');
    } finally {
      setRebuilding(false);
    }
  };

  const goToRebuild = () => {
    setActiveTab('rebuild');
    window.scrollTo(0, 0);
  };

  const handleFormatSelect = (fmt: any) => {
    setSelectedFormatForRebuild(fmt);
    setActiveTab('rebuild');
  };

  const platformInfo = detectedPlatform ? PLATFORM_ICONS[detectedPlatform] : null;
  const isYouTube = detectedPlatform === 'youtube';

  return (
    <div className="flex flex-col min-h-[90vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-accent/10 via-purple-500/5 to-transparent border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center">
            <Eye className="text-brand-accent w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Video Intelligence</h1>
            <p className="text-gray-400 text-sm">Competitor Ads & Viral Reels sezieren → Psychologie verstehen → Für Kunden umbauen</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto shrink-0">
        {[
          { id: 'analyze', label: 'Video / Ad analysieren', icon: Search },
          { id: 'formats', label: 'Nischen-Format-Finder', icon: TrendingUp },
          { id: 'rebuild', label: 'Für Kunden umbauen', icon: Wand2 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
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

      <div className="flex-1 overflow-y-auto p-6 md:p-8">

        {/* ══ TAB: ANALYZE ══ */}
        {activeTab === 'analyze' && (
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Input Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Search size={20} className="text-brand-accent" /> Video / Ad analysieren
              </h2>

              {/* URL Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Video-Link (YouTube, Instagram, TikTok, Facebook)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={e => handleUrlChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... oder https://www.instagram.com/reel/..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none pr-36"
                  />
                  {platformInfo && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <platformInfo.icon size={16} className={platformInfo.color} />
                      <span className={`text-xs font-bold ${platformInfo.color}`}>{platformInfo.label}</span>
                    </div>
                  )}
                </div>

                {/* Platform-specific hints */}
                {detectedPlatform && detectedPlatform !== 'youtube' && (
                  <div className="mt-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-2">
                    <AlertCircle size={14} className="text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-blue-300 text-xs">
                      <strong>{platformInfo?.label}:</strong> Die KI analysiert anhand des Links und deines eingegebenen Texts. Füge den Caption-Text / Hook unten ein für die tiefste Analyse.
                      {isYouTube && ' YouTube-Videos werden direkt von Gemini angeschaut.'}
                    </p>
                  </div>
                )}
                {isYouTube && (
                  <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex gap-2">
                    <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-emerald-300 text-xs">
                      <strong>YouTube erkannt:</strong> Gemini 1.5 Pro schaut sich dieses Video direkt an — vollständige Video-Analyse möglich.
                    </p>
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Hook / Caption / Script Text <span className="text-gray-600 normal-case">(je mehr du einfügst, desto tiefer die Analyse)</span>
                </label>
                <textarea
                  value={captionText}
                  onChange={e => setCaptionText(e.target.value)}
                  rows={5}
                  placeholder={`Füge den Hook, die Caption oder das Skript des Videos hier ein.\n\nBeispiel:\n"Das sagt dir niemand: Warum 80% der Pflegeheime keine Bewerber mehr bekommen..." \n[Caption: Wenn du noch immer auf Stellenanzeigen setzt, verlierst du jeden Tag qualifizierte Pflegekräfte an die Konkurrenz...]`}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none resize-none text-sm font-mono"
                />
              </div>

              {/* Niche */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Nische / Branche (optional, verbessert die Analyse)
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  placeholder="z.B. Recruiting für Pflegeheime, Autohaus-Werbung, Personal Branding Coaches..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                />
              </div>

              {analysisError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex gap-2">
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <p className="text-red-300 text-sm">{analysisError}</p>
                </div>
              )}

              <button
                onClick={analyze}
                disabled={analyzing || (!videoUrl.trim() && !captionText.trim())}
                className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-brand-accent/20"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={22} />
                    {isYouTube ? 'Gemini analysiert das Video...' : 'KI analysiert...'}
                  </>
                ) : (
                  <>
                    <Brain size={22} /> Psychologie & Struktur sezieren
                  </>
                )}
              </button>
            </div>

            {/* Result */}
            <AnimatePresence>
              {analysisResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <AnalysisDisplay data={analysisResult} onRebuild={goToRebuild} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ══ TAB: FORMAT FINDER ══ */}
        {activeTab === 'formats' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-brand-accent" /> Nischen-Format-Finder
              </h2>
              <p className="text-gray-400 text-sm">Gib eine Nische ein — die KI analysiert die 7 erfolgreichsten Video-Formate, die in dieser Branche viral gehen, mit kompletter Psychologie-Analyse.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nische / Branche *</label>
                  <input
                    type="text"
                    value={formatNiche}
                    onChange={e => setFormatNiche(e.target.value)}
                    placeholder="z.B. Pflegeheime Recruiting, Autohaus, Zahnarztpraxis, Fitness-Coach..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                    onKeyDown={e => e.key === 'Enter' && findFormats()}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Haupt-Plattform</label>
                  <select
                    value={formatPlatform}
                    onChange={e => setFormatPlatform(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                  >
                    <option value="instagram">Instagram / Reels</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube Shorts</option>
                  </select>
                </div>
              </div>

              <button
                onClick={findFormats}
                disabled={findingFormats || !formatNiche.trim()}
                className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {findingFormats ? <Loader2 className="animate-spin" size={20} /> : <TrendingUp size={20} />}
                {findingFormats ? 'Analysiere Nische...' : 'Beste Formate finden'}
              </button>
            </div>

            <AnimatePresence>
              {formatData && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <FormatFinderDisplay data={formatData} onSelectFormat={handleFormatSelect} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ══ TAB: REBUILD ══ */}
        {activeTab === 'rebuild' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Wand2 size={20} className="text-brand-accent" /> Für Kunden umbauen
              </h2>

              {/* Source indicator */}
              {(analysisResult || selectedFormatForRebuild) && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-emerald-300 text-sm">
                    {analysisResult ? '✅ Analysiertes Video wird als Vorlage verwendet.' : `✅ Format "${selectedFormatForRebuild?.name}" wird als Vorlage verwendet.`}
                  </p>
                </div>
              )}
              {!analysisResult && !selectedFormatForRebuild && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex gap-2">
                  <AlertCircle size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-yellow-300 text-sm">
                    Tipp: Analysiere zuerst ein Video im "Video analysieren" Tab, dann kommt der Rebuild-Kontext automatisch mit. Du kannst aber auch direkt hier arbeiten.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kundenkontext *</label>
                <textarea
                  value={rebuildContext}
                  onChange={e => setRebuildContext(e.target.value)}
                  rows={4}
                  placeholder="Beschreibe deinen Kunden:\nz.B. Senioren-Residenz Müller in Mannheim, sucht dringend 5 Pflegefachkräfte, Zielgruppe: Pflegefachkräfte 25-45 Jahre, USP: familiäre Atmosphäre, gutes Gehalt, flexible Schichten..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ziel-Nische (optional)</label>
                <input
                  type="text"
                  value={rebuildNiche}
                  onChange={e => setRebuildNiche(e.target.value)}
                  placeholder="z.B. Recruiting für Pflegeheime in Deutschland"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                />
              </div>

              <button
                onClick={rebuild}
                disabled={rebuilding || !rebuildContext.trim()}
                className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-brand-accent/20"
              >
                {rebuilding ? <Loader2 className="animate-spin" size={22} /> : <Sparkles size={22} />}
                {rebuilding ? 'Generiere vollständiges Kunden-Video-Paket...' : 'Vollständiges Video-Paket generieren'}
              </button>
            </div>

            <AnimatePresence>
              {rebuildResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <RebuildDisplay data={rebuildResult} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
