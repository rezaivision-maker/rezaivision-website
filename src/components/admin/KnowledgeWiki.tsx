import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { BookOpen, Plus, Trash2, Edit3, Save, Search, Wand2, Loader2, X, Tag, CheckSquare, FileText, Zap, Lightbulb, BrainCircuit } from 'lucide-react';

interface WikiItem {
  id: string;
  title: string;
  content: string;
  category: 'checkliste' | 'prompt' | 'template' | 'workflow' | 'notiz';
  tags: string[];
  isGlobalContext?: boolean; // True if this should be injected into AI prompts
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_ICONS: Record<string, { icon: any; color: string; label: string }> = {
  checkliste: { icon: CheckSquare, color: 'text-emerald-400', label: 'Checkliste' },
  prompt: { icon: Zap, color: 'text-yellow-400', label: 'KI-Prompt' },
  template: { icon: FileText, color: 'text-blue-400', label: 'Template' },
  workflow: { icon: Lightbulb, color: 'text-purple-400', label: 'Workflow' },
  notiz: { icon: BookOpen, color: 'text-gray-400', label: 'Notiz' },
};

const STARTER_ITEMS: Omit<WikiItem, 'id'>[] = [
  {
    title: 'Drehtag-Checkliste',
    category: 'checkliste',
    tags: ['drehtag', 'vorbereitung', 'produktion'],
    content: `# Drehtag-Checkliste ✅

## 📦 Equipment (Tag davor packen)
- [ ] Kamera (Sony FX3 / A7S III) + Ersatzakkus (min. 4x)
- [ ] Speicherkarten (min. 3x 256GB) – formatiert und leer
- [ ] Objektive: Standard-Zoom, 50mm Portrait, Weitwinkel
- [ ] Stativ + Fluid-Kopf
- [ ] Gimbal (DJI RS3 Pro) + Akku geladen
- [ ] Licht-Set: 2x LED Panel + Softboxen
- [ ] Audio: Rode Wireless GO II + Boom-Mikrofon
- [ ] Laptop + Ladekabel
- [ ] Shotlist ausgedruckt

## 🎬 Location (1h vor Dreh)
- [ ] Ankunft Location (1h vor Dreh)
- [ ] Location scouten – Lichtquellen, Steckdosen, Geräuschquellen
- [ ] Set aufbauen und ausleuchten
- [ ] Testaufnahmen – Belichtung, Ton, Farbe prüfen
- [ ] Weißabgleich manuell setzen

## 🤝 Kunden-Briefing (vor erstem Shot)
- [ ] Shotlist gemeinsam durchgehen
- [ ] Ablauf und Timing erklären
- [ ] Interview-Personen auf Ton und Haltung einweisen
- [ ] Einverständniserklärung unterschreiben lassen (falls nötig)

## 📸 Während des Drehs
- [ ] Nach jedem Shot: Fokus, Belichtung, Ton kontrollieren
- [ ] B-Roll nicht vergessen (3:1 Verhältnis zu A-Roll)
- [ ] Nahaufnahmen für Cutaways
- [ ] Verschiedene Winkel für jeden Shot
- [ ] Karten regelmäßig auf Laptop sichern

## ✅ Wrap (nach dem Dreh)
- [ ] Material auf 2 Speichermedien gesichert
- [ ] Equipment vollständig eingepackt
- [ ] Kunden-Feedback abholen
- [ ] Rohschnitt-Timeline im Gespräch besprechen`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Onboarding-Checkliste (neuer Kunde)',
    category: 'checkliste',
    tags: ['onboarding', 'kunde', 'sales'],
    content: `# Neukunden Onboarding ✅

## Phase 1: Erstkontakt → Angebot
- [ ] Lead qualifizieren (Budget, Zeitplan, Entscheider?)
- [ ] Discovery Call (30 Min.) – Bedürfnisse verstehen
- [ ] Angebot erstellen (via Invoice Generator)
- [ ] Angebot per E-Mail senden + follow-up nach 3 Tagen
- [ ] Einwände behandeln

## Phase 2: Auftragserteilung
- [ ] Auftrag schriftlich bestätigen (E-Mail reicht)
- [ ] 50% Anzahlung Rechnung stellen
- [ ] Projektsteckbrief im CRM anlegen (Lead → "In Produktion" verschieben)
- [ ] Drehtag im Kalender festlegen

## Phase 3: Produktion
- [ ] Konzept/Moodboard erstellen (via Production Suite)
- [ ] Konzept dem Kunden via Kundenportal-Link freigeben lassen
- [ ] Drehtag durchführen
- [ ] Rohschnitt innerhalb 7 Werktagen liefern

## Phase 4: Abschluss
- [ ] Feedback einarbeiten (max. 2 Revisionsrunden)
- [ ] Finales Video liefern (Wetransfer oder Google Drive)
- [ ] Restrechnung (50%) stellen
- [ ] Google Review anfragen!
- [ ] Lead → "Abgeschlossen" im CRM`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Higgsfield Cinematic Portrait Prompt',
    category: 'prompt',
    tags: ['higgsfield', 'portrait', 'cinematic'],
    content: `# Higgsfield Portrait Prompt Template

## Basis-Prompt:
A [BESCHREIBUNG PERSON] walks confidently into [LOCATION], [LICHTSITUATION], slow dolly forward, shallow depth of field, cinematic color grade, photorealistic, 4K

## Variablen:
- PERSON: confident entrepreneur / healthcare professional / happy employee / creative director
- LOCATION: a bright modern office / a cozy clinic / an urban studio / a glass building lobby
- LICHT: golden hour light streaming through floor-to-ceiling windows / soft diffused studio light / natural blue hour light

## Beispiele:
1. A confident entrepreneur walks into a modern open-plan office, golden hour light streaming through floor-to-ceiling windows, slow dolly forward, shallow depth of field, warm cinematic color grade, photorealistic, 4K

2. A smiling healthcare professional greets a patient in a bright modern clinic, soft natural window light, gentle camera push, documentary style, warm skin tones, 4K hyperrealistic

3. A creative director stands in front of a large monitor with video content, purple and gold studio lighting, slight rack focus, editorial style photography aesthetic

## Soul Mode (Charakterkonsistenz):
- Füge reference_image_url hinzu mit deinem Kunden-Foto
- Perfekt für Testimonial-Videos und Personal Branding`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'E-Mail Template: Angebot Follow-Up',
    category: 'template',
    tags: ['email', 'sales', 'follow-up'],
    content: `# Follow-Up E-Mail nach Angebot

**Betreff:** Re: Ihr Videoproduktions-Projekt – kurze Rückfrage

---

Guten Tag [NAME],

ich hoffe, Sie hatten Gelegenheit, unser Angebot in Ruhe durchzulesen.

Ich wollte kurz nachfragen, ob Sie noch offene Fragen haben oder ob ich etwas weiter ausführen soll.

Oft entstehen in dieser Phase auch neue Ideen – kein Problem, darüber spreche ich gerne kurz mit Ihnen.

**Was ich Ihnen noch mitgeben möchte:**
Ein ähnliches Projekt für [REFERENZ-BRANCHE] hat dem Kunden [KONKRETES ERGEBNIS] gebracht.

Falls Sie lieber direkt telefonieren möchten: [TELEFONNUMMER]

Mit freundlichen Grüßen,
Parsha Rezai
Rezai Vision – Premium Videoproduktion
Kaiserslautern | www.rezaivision.de

---
**Variablen anpassen:**
- [NAME] → Kundenname
- [REFERENZ-BRANCHE] → ähnliche Branche (z.B. "einem Autohaus in der Region")
- [KONKRETES ERGEBNIS] → z.B. "40% mehr Bewerbungen innerhalb von 6 Wochen"`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Workflow: Social Reel in 2 Stunden',
    category: 'workflow',
    tags: ['social', 'reel', 'workflow', 'schnell'],
    content: `# Social Reel: Von Idee bis Upload in 2 Stunden

## ⏱️ Minute 0-15: Planung
1. Marketing Studio öffnen → Thema eingeben
2. KI generiert Hook + Skript
3. Skript in 3 Bullet Points reduzieren

## ⏱️ Minute 15-45: Dreh
- Smartphone vertikal (9:16)
- Ruhige Hand oder billiges Gorilla-Stativ
- 3 Varianten des Hooks drehen
- 5-8 kurze B-Roll Clips (Hände, Laptop, Straße)
- Kein Perfektionismus – Authentizität schlägt Produktion

## ⏱️ Minute 45-90: Schnitt (CapCut oder Premiere)
1. Besten Hook-Take wählen
2. B-Roll unterlegen (max. 2-3 Sek pro Clip)
3. Captions automatisch generieren lassen
4. Musik aus Suno AI oder CapCut Bibliothek
5. Farbe: +10 Kontrast, +5 Saturation, leichter Warmton

## ⏱️ Minute 90-110: Caption schreiben
- Erste Zeile = Hook (gleich wie im Video)
- 3-5 Bullet Points mit Mehrwert
- CTA: "Folg mir für mehr" oder "Schreib mir [EMOJI]"
- 10-15 Hashtags (Mix aus groß und nischig)

## ⏱️ Minute 110-120: Upload
- Beste Uhrzeit: Di-Do, 18-20 Uhr
- Thumbnail manuell auswählen (Gesicht + Emotion)
- Standort-Tag hinzufügen`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function KnowledgeWiki() {
  const [items, setItems] = useState<WikiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('alle');
  const [selectedItem, setSelectedItem] = useState<WikiItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState<WikiItem['category']>('notiz');
  const [editTags, setEditTags] = useState('');
  const [editIsGlobal, setEditIsGlobal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'knowledgeItems'), orderBy('updatedAt', 'desc')));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as WikiItem));

      if (data.length === 0) {
        // Seed with starter items
        const seeded: WikiItem[] = [];
        for (const item of STARTER_ITEMS) {
          const ref = await addDoc(collection(db, 'knowledgeItems'), item);
          seeded.push({ id: ref.id, ...item });
        }
        setItems(seeded);
      } else {
        setItems(data);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const openNewItem = () => {
    setSelectedItem(null);
    setEditTitle('');
    setEditContent('');
    setEditCategory('notiz');
    setEditTags('');
    setEditIsGlobal(false);
    setIsEditing(true);
  };

  const openEditItem = (item: WikiItem) => {
    setSelectedItem(item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditCategory(item.category);
    setEditTags(item.tags.join(', '));
    setEditIsGlobal(!!item.isGlobalContext);
    setIsEditing(true);
  };

  const saveItem = async () => {
    if (!editTitle.trim() || !editContent.trim()) { alert('Titel und Inhalt sind Pflichtfelder.'); return; }
    setSaving(true);
    const now = new Date().toISOString();
    const tags = editTags.split(',').map(t => t.trim()).filter(Boolean);

    try {
      if (selectedItem) {
        await updateDoc(doc(db, 'knowledgeItems', selectedItem.id), {
          title: editTitle, content: editContent, category: editCategory, tags, isGlobalContext: editIsGlobal, updatedAt: now,
        });
        const updated = { ...selectedItem, title: editTitle, content: editContent, category: editCategory, tags, isGlobalContext: editIsGlobal, updatedAt: now };
        setItems(items.map(i => i.id === selectedItem.id ? updated : i));
        setSelectedItem(updated);
      } else {
        const newItem = { title: editTitle, content: editContent, category: editCategory, tags, isGlobalContext: editIsGlobal, createdAt: now, updatedAt: now };
        const ref = await addDoc(collection(db, 'knowledgeItems'), newItem);
        const created = { id: ref.id, ...newItem };
        setItems([created, ...items]);
        setSelectedItem(created);
      }
      setIsEditing(false);
    } catch (e) { alert('Fehler beim Speichern.'); }
    finally { setSaving(false); }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Wirklich löschen?')) return;
    await deleteDoc(doc(db, 'knowledgeItems', id));
    setItems(items.filter(i => i.id !== id));
    if (selectedItem?.id === id) { setSelectedItem(null); setIsEditing(false); }
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Du bist ein Experte für Videoproduktion und Agentur-Workflows bei Rezai Vision (Kaiserslautern).
Erstelle einen detaillierten, direkt nutzbaren Wiki-Eintrag im Markdown-Format für: ${aiPrompt}

Der Eintrag soll praktisch, konkret und sofort umsetzbar sein.
Verwende Checkboxen (- [ ]) für Checklisten, Überschriften (##) für Abschnitte.
Sprache: Deutsch.`
        }),
      });
      const data = await res.json();
      setEditContent(data.reply);
    } catch (e) { alert('Fehler.'); }
    finally { setAiGenerating(false); setAiPrompt(''); }
  };

  const filtered = items.filter(item => {
    const matchCategory = activeCategory === 'alle' || item.category === activeCategory;
    const matchSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const counts = Object.keys(CATEGORY_ICONS).reduce((acc, cat) => {
    acc[cat] = items.filter(i => i.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex h-[90vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">

      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Suchen..."
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
            />
          </div>
        </div>
        <div className="p-3 border-b border-white/10 space-y-1">
          <button
            onClick={() => setActiveCategory('alle')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === 'alle' ? 'bg-brand-accent/20 text-brand-accent' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            Alle ({items.length})
          </button>
          {Object.entries(CATEGORY_ICONS).map(([cat, { icon: Icon, color, label }]) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${activeCategory === cat ? 'bg-brand-accent/20 text-brand-accent font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="flex items-center gap-2">
                <Icon size={14} className={activeCategory === cat ? 'text-brand-accent' : color} />
                {label}
              </span>
              <span className="text-xs">{counts[cat] || 0}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center pt-8"><Loader2 className="animate-spin text-gray-600" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-600 text-sm pt-8">Nichts gefunden.</p>
          ) : (
            filtered.map(item => {
              const { icon: Icon, color } = CATEGORY_ICONS[item.category];
              return (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setIsEditing(false); }}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-all group ${
                    selectedItem?.id === item.id ? 'bg-brand-accent/10 border border-brand-accent/30 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Icon size={14} className={`mt-0.5 shrink-0 ${color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-tight line-clamp-2">{item.title}</p>
                      {item.isGlobalContext && <span className="text-[10px] text-brand-accent uppercase tracking-widest font-bold">RAG Aktiv</span>}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={openNewItem}
            className="w-full bg-brand-accent text-brand-bg py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 text-sm hover:brightness-110 transition-all"
          >
            <Plus size={16} /> Neuer Eintrag
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isEditing ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Edit Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-white">{selectedItem ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}</h3>
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="bg-white/10 text-gray-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-white/20">
                  <X size={14} /> Abbrechen
                </button>
                <button onClick={saveItem} disabled={saving} className="bg-brand-accent text-brand-bg px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-1 hover:brightness-110 disabled:opacity-50">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Speichern
                </button>
              </div>
            </div>

            {/* Edit Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Titel *</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="Titel des Eintrags"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kategorie</label>
                  <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value as WikiItem['category'])}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none"
                  >
                    {Object.entries(CATEGORY_ICONS).map(([cat, { label }]) => (
                      <option key={cat} value={cat}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tags (kommagetrennt)</label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={e => setEditTags(e.target.value)}
                    placeholder="z.B. drehtag, checkliste, produktion"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer mt-6">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={editIsGlobal}
                        onChange={(e) => setEditIsGlobal(e.target.checked)}
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${editIsGlobal ? 'bg-brand-accent' : 'bg-gray-600'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${editIsGlobal ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Als RAG-Kontext setzen</span>
                      <span className="text-[10px] text-gray-400">KI nutzt diesen Text global.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* AI Content Generator */}
              <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-4">
                <p className="text-xs font-bold text-brand-accent uppercase mb-2 flex items-center gap-1"><Wand2 size={12} /> Mit KI befüllen</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="z.B. Checkliste für Interview-Dreh, Workflow für Podcast-Produktion..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none"
                    onKeyDown={e => e.key === 'Enter' && generateWithAI()}
                  />
                  <button
                    onClick={generateWithAI}
                    disabled={aiGenerating || !aiPrompt.trim()}
                    className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1 hover:brightness-110 disabled:opacity-50"
                  >
                    {aiGenerating ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                    {aiGenerating ? '...' : 'Generieren'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Inhalt * (Markdown unterstützt)</label>
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={20}
                  placeholder="Inhalt im Markdown-Format..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none resize-none font-mono text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>
        ) : selectedItem ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* View Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {(() => {
                  const { icon: Icon, color, label } = CATEGORY_ICONS[selectedItem.category];
                  return (
                    <>
                      <Icon size={20} className={color} />
                      <div>
                        <h3 className="font-bold text-white">{selectedItem.title}</h3>
                        <p className="text-xs text-gray-500">{label} · {new Date(selectedItem.updatedAt).toLocaleDateString('de-DE')}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="flex gap-2">
                <button onClick={() => deleteItem(selectedItem.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-2 rounded-lg text-sm flex items-center gap-1">
                  <Trash2 size={14} />
                </button>
                <button onClick={() => openEditItem(selectedItem)} className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:brightness-110">
                  <Edit3 size={14} /> Bearbeiten
                </button>
              </div>
            </div>

            {selectedItem.isGlobalContext && (
              <div className="bg-brand-accent/10 border-b border-brand-accent/20 px-6 py-2 flex items-center gap-2">
                <BrainCircuit size={14} className="text-brand-accent" />
                <span className="text-xs font-bold text-brand-accent">In RAG-Datenbank aktiv (KI liest diesen Text)</span>
              </div>
            )}

            {/* Tags */}
            {selectedItem.tags.length > 0 && (
              <div className="px-6 py-3 border-b border-white/10 flex flex-wrap gap-2">
                {selectedItem.tags.map(tag => (
                  <span key={tag} className="bg-white/10 text-gray-400 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-200 text-sm leading-relaxed bg-transparent p-0 m-0">
                  {selectedItem.content}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <BrainCircuit size={48} className="text-gray-700 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Knowledge Base & RAG</h3>
            <p className="text-gray-500 max-w-md">
              Dein internes Agentur-Gehirn. Checklisten, Templates, Workflows und KI-Prompts – alles an einem Ort. 
              Aktiviere "RAG-Kontext", damit die KI das Dokument automatisch lernt.
            </p>
            <button onClick={openNewItem} className="mt-6 bg-brand-accent text-brand-bg px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all">
              <Plus size={18} /> Ersten Eintrag erstellen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
