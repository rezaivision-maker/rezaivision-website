import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Save, Plus, Loader2, Trash2, Sliders, Type, Palette, Volume2, ShieldAlert, Check } from 'lucide-react';

interface CIProfile {
  id: string;
  name: string; // e.g. "Rezai Vision (Selbst)" or "Zahnarzt Dr. Müller"
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  toneOfVoice: string; // e.g. "Professional", "Edgy", "Hype"
  brandValues: string[];
  forbiddenWords: string[];
  createdAt: string;
}

export default function CIManager() {
  const [profiles, setProfiles] = useState<CIProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<CIProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form input states
  const [name, setName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [accentColor, setAccentColor] = useState('#C9FF68');
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [toneOfVoice, setToneOfVoice] = useState('Edgy & Direkt (Modern)');
  
  // Array management fields
  const [newValue, setNewValue] = useState('');
  const [brandValues, setBrandValues] = useState<string[]>([]);
  const [newForbiddenWord, setNewForbiddenWord] = useState('');
  const [forbiddenWords, setForbiddenWords] = useState<string[]>([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'clientCIs'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as CIProfile));
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Auto-create Rezai Vision self profile if no profile exists at all
      if (data.length === 0) {
        const selfProj: Omit<CIProfile, 'id'> = {
          name: 'Rezai Vision (Selbst)',
          primaryColor: '#0c0c0e',
          secondaryColor: '#ffffff',
          accentColor: '#C9FF68',
          fontFamily: 'Outfit',
          toneOfVoice: 'Edgy, direkt & hocheffektiv',
          brandValues: ['Innovation', 'Premium Qualität', 'Datenbasiert'],
          forbiddenWords: ['billig', 'Rabatt', 'schnell schnell'],
          createdAt: new Date().toISOString()
        };
        const docRef = await addDoc(collection(db, 'clientCIs'), selfProj);
        const created = { id: docRef.id, ...selfProj };
        setProfiles([created]);
        selectProfile(created);
      } else {
        setProfiles(data);
        selectProfile(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const selectProfile = (p: CIProfile) => {
    setActiveProfile(p);
    setName(p.name);
    setPrimaryColor(p.primaryColor);
    setSecondaryColor(p.secondaryColor);
    setAccentColor(p.accentColor);
    setFontFamily(p.fontFamily || 'Outfit');
    setToneOfVoice(p.toneOfVoice || 'Professional');
    setBrandValues(p.brandValues || []);
    setForbiddenWords(p.forbiddenWords || []);
  };

  const createNewProfile = async () => {
    const pName = prompt('Name des neuen CI-Profils (z.B. "Praxis Dr. Müller"):');
    if (!pName) return;

    const newCI: Omit<CIProfile, 'id'> = {
      name: pName,
      primaryColor: '#0f0f11',
      secondaryColor: '#ffffff',
      accentColor: '#3b82f6',
      fontFamily: 'Inter',
      toneOfVoice: 'Vertrauenswürdig & Seriös',
      brandValues: ['Kompetenz', 'Zuverlässigkeit'],
      forbiddenWords: [],
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, 'clientCIs'), newCI);
      const created = { id: docRef.id, ...newCI };
      setProfiles([created, ...profiles]);
      selectProfile(created);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Erstellen.');
    }
  };

  const saveProfile = async () => {
    if (!activeProfile) return;
    setSaving(true);
    try {
      const updated: CIProfile = {
        ...activeProfile,
        name,
        primaryColor,
        secondaryColor,
        accentColor,
        fontFamily,
        toneOfVoice,
        brandValues,
        forbiddenWords
      };

      const docRef = doc(db, 'clientCIs', activeProfile.id);
      await updateDoc(docRef, {
        name,
        primaryColor,
        secondaryColor,
        accentColor,
        fontFamily,
        toneOfVoice,
        brandValues,
        forbiddenWords
      });

      setProfiles(profiles.map(p => p.id === activeProfile.id ? updated : p));
      setActiveProfile(updated);
      alert('CI-Profil erfolgreich gespeichert!');
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern.');
    } finally {
      setSaving(false);
    }
  };

  const deleteProfile = async (id: string) => {
    if (profiles.find(p => p.id === id)?.name.includes('(Selbst)')) {
      alert('Das eigene Profil von Rezai Vision kann nicht gelöscht werden!');
      return;
    }
    if (!confirm('Dieses CI-Profil wirklich unwiderruflich löschen?')) return;
    try {
      await deleteDoc(doc(db, 'clientCIs', id));
      const filtered = profiles.filter(p => p.id !== id);
      setProfiles(filtered);
      if (activeProfile?.id === id) {
        selectProfile(filtered[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addBrandValue = () => {
    if (newValue.trim() && !brandValues.includes(newValue.trim())) {
      setBrandValues([...brandValues, newValue.trim()]);
      setNewValue('');
    }
  };

  const removeBrandValue = (val: string) => {
    setBrandValues(brandValues.filter(v => v !== val));
  };

  const addForbiddenWord = () => {
    if (newForbiddenWord.trim() && !forbiddenWords.includes(newForbiddenWord.trim())) {
      setForbiddenWords([...forbiddenWords, newForbiddenWord.trim()]);
      setNewForbiddenWord('');
    }
  };

  const removeForbiddenWord = (word: string) => {
    setForbiddenWords(forbiddenWords.filter(w => w !== word));
  };

  return (
    <div className="flex h-[80vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10">
          <button
            onClick={createNewProfile}
            className="w-full bg-brand-accent text-brand-bg px-4 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all text-sm"
          >
            <Plus size={16} /> Neues CI-Profil
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gray-500" /></div>
          ) : (
            profiles.map(p => (
              <div
                key={p.id}
                onClick={() => selectProfile(p)}
                className={`flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all group border ${
                  activeProfile?.id === p.id 
                    ? 'bg-brand-accent/20 text-brand-accent border-brand-accent/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.accentColor }} />
                  <span className="font-bold text-sm truncate">{p.name}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteProfile(p.id); }}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
        {activeProfile ? (
          <>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Sliders className="text-brand-accent" size={24} /> {name}
                </h2>
                <p className="text-xs text-gray-400">Verwalte Markenfarben, Typografie und Tonalität für das K.I.-Scripting.</p>
              </div>
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-brand-accent text-brand-bg px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all text-sm disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Änderungen speichern
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 pb-20">
              {/* Profile Name Edit */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Name des Profils</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full max-w-md bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold focus:border-brand-accent focus:outline-none"
                />
              </div>

              {/* Design System Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand Colors */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-2">
                    <Palette size={16} className="text-brand-accent" /> Corporate Design Farben
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: 'Primärfarbe (Hintergrund)', color: primaryColor, set: setPrimaryColor },
                      { label: 'Sekundärfarbe (Text)', color: secondaryColor, set: setSecondaryColor },
                      { label: 'Akzentfarbe (Buttons/Effekte)', color: accentColor, set: setAccentColor },
                    ].map((col, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                        <span className="text-xs text-gray-400 font-medium">{col.label}</span>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={col.color}
                            onChange={e => col.set(e.target.value)}
                            className="bg-transparent border border-white/10 cursor-pointer w-8 h-8 rounded"
                          />
                          <span className="text-xs text-white font-mono uppercase">{col.color}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-2">
                    <Type size={16} className="text-brand-accent" /> Typografie & Schriften
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 font-medium mb-2">Haupt-Schriftart</label>
                      <select
                        value={fontFamily}
                        onChange={e => setFontFamily(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent"
                      >
                        <option value="Outfit">Outfit (Standard Rezai)</option>
                        <option value="Inter">Inter (Clean / Tech)</option>
                        <option value="Playfair Display">Playfair Display (Serif / High-End)</option>
                        <option value="Montserrat">Montserrat (Modern / Fett)</option>
                        <option value="Cabinet Grotesk">Cabinet Grotesk (Expressiv)</option>
                      </select>
                    </div>

                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Live-Vorschau Text</p>
                      <p 
                        style={{ fontFamily }} 
                        className="text-white text-xl font-bold transition-all leading-normal"
                      >
                        Wahre e-motionen in High-End Qualität gefilmt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Psychology & Brand Guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tone of Voice */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-2">
                    <Volume2 size={16} className="text-brand-accent" /> Tone of Voice (Tonalität)
                  </h3>
                  <div className="space-y-3">
                    <p className="text-xs text-gray-400">Wie spricht die Marke mit der Zielgruppe? Das prägt den Stil der K.I.-geschriebenen Skripte.</p>
                    <textarea
                      value={toneOfVoice}
                      onChange={e => setToneOfVoice(e.target.value)}
                      rows={4}
                      placeholder="z.B. Edgy, frech, direkt auf den Punkt. Fokus auf harte Fakten, kein Marketing-Blabla."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Brand Values */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-2">
                    <Check size={16} className="text-brand-accent" /> Markenwerte & Core Messages
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newValue}
                        onChange={e => setNewValue(e.target.value)}
                        placeholder="z.B. Transparenz"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-accent focus:outline-none"
                      />
                      <button
                        onClick={addBrandValue}
                        className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
                      >
                        Hinzufügen
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {brandValues.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">Keine Markenwerte definiert.</p>
                      ) : (
                        brandValues.map(val => (
                          <span 
                            key={val} 
                            onClick={() => removeBrandValue(val)}
                            className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/20 transition-all flex items-center gap-1.5"
                          >
                            {val} <span className="text-[10px] opacity-60">×</span>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Forbidden Words */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-2">
                  <ShieldAlert size={16} className="text-red-400" /> Auszuschließende Begriffe (Blacklist)
                </h3>
                <div className="space-y-4">
                  <p className="text-xs text-gray-400">Begriffe, die die K.I. niemals in Skripten, Hooks oder Captions verwenden darf (z.B. Markennamen von Mitbewerbern oder Billig-Assoziationen).</p>
                  
                  <div className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      value={newForbiddenWord}
                      onChange={e => setNewForbiddenWord(e.target.value)}
                      placeholder="z.B. Rabatt"
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-accent focus:outline-none"
                    />
                    <button
                      onClick={addForbiddenWord}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all"
                    >
                      Ausschließen
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {forbiddenWords.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">Keine ausgeschlossenen Begriffe vorhanden.</p>
                    ) : (
                      forbiddenWords.map(word => (
                        <span 
                          key={word} 
                          onClick={() => removeForbiddenWord(word)}
                          className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer hover:bg-red-600 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          {word} <span className="text-[10px] opacity-60">×</span>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <Palette size={48} className="text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Corporate Identity Manager</h3>
            <p className="text-gray-400 max-w-md">Wähle links ein Profil aus oder erstelle ein neues, um das Branding deiner Kampagnen festzulegen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
