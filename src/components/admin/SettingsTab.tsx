import React, { useState, useEffect } from 'react';
import { Settings, Save, Key, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function SettingsTab() {
  const [manusKey, setManusKey] = useState('');
  const [metaToken, setMetaToken] = useState('');
  const [metaAppId, setMetaAppId] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from local storage for now
    const storedManus = localStorage.getItem('manusApiKey') || '';
    const storedMetaToken = localStorage.getItem('metaToken') || '';
    const storedMetaAppId = localStorage.getItem('metaAppId') || '';
    
    setManusKey(storedManus);
    setMetaToken(storedMetaToken);
    setMetaAppId(storedMetaAppId);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem('manusApiKey', manusKey);
      localStorage.setItem('metaToken', metaToken);
      localStorage.setItem('metaAppId', metaAppId);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-brand-darker border border-white/5 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent">
          <Settings size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">System & API Einstellungen</h2>
          <p className="text-gray-400">Verwalte hier deine Zugangsdaten für externe Services.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manus AI Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="text-brand-accent" size={20} />
            <h3 className="text-lg font-bold text-white">Manus AI API</h3>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Hinterlege deinen Manus API Key, um Agenten-Aufgaben direkt aus dem Dashboard zu starten. Du erhältst den Key unter api.manus.ai.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">API Key (v2)</label>
              <input 
                type="password"
                value={manusKey}
                onChange={(e) => setManusKey(e.target.value)}
                placeholder="sk-manus-..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Meta Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="text-blue-400" size={20} />
            <h3 className="text-lg font-bold text-white">Meta Ads API</h3>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Für die direkte Anbindung an Facebook und Instagram benötigst du einen User Access Token und eine App ID aus dem Meta for Developers Portal.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Access Token</label>
              <input 
                type="password"
                value={metaToken}
                onChange={(e) => setMetaToken(e.target.value)}
                placeholder="EAA..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">App ID</label>
              <input 
                type="text"
                value={metaAppId}
                onChange={(e) => setMetaAppId(e.target.value)}
                placeholder="1234567890"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-accent text-brand-bg px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : (saved ? <CheckCircle2 size={18} /> : <Save size={18} />)}
          {saving ? 'Speichert...' : (saved ? 'Gespeichert!' : 'Einstellungen speichern')}
        </button>
      </div>

      <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
        <AlertCircle className="text-orange-400 shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-orange-200">
          Hinweis: Aktuell werden diese Keys in deinem lokalen Browser-Speicher hinterlegt. Um die Keys auf mehreren Geräten zu nutzen, müssen wir sie verschlüsselt in Firebase hinterlegen. Für Tests reicht diese Methode.
        </p>
      </div>
    </div>
  );
}
