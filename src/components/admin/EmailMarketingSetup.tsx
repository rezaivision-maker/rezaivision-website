import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Save, ExternalLink, ArrowRight } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function EmailMarketingSetup() {
  const [apiKey, setApiKey] = useState('');
  const [listId, setListId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'emailMarketing'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setApiKey(data.brevoApiKey || '');
          setListId(data.brevoListId || '');
        }
      } catch (error) {
        console.error('Error fetching email config:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus('idle');
    try {
      await setDoc(doc(db, 'settings', 'emailMarketing'), {
        brevoApiKey: apiKey,
        brevoListId: listId,
        provider: 'brevo',
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-brand-accent w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        {/* BG Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="flex items-center gap-3 mb-2 relative z-10">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Mail size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">E-Mail Marketing Integration</h2>
        </div>
        <p className="text-gray-400 mb-8 relative z-10 max-w-2xl">
          Verbinde deine Website mit <strong>Brevo</strong> (ehemals Sendinblue), um automatisch Leads in deinen Newsletter-Verteiler aufzunehmen. Brevo ist 100% DSGVO-konform und bis 300 E-Mails/Tag kostenlos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Setup Form */}
          <div className="space-y-6">
            <div className="bg-black/30 border border-white/10 rounded-xl p-5 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                1. API-Schlüssel hinterlegen
              </h3>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Brevo API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="xkeysib-..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Listen-ID (Optional)</label>
                <input
                  type="number"
                  value={listId}
                  onChange={(e) => setListId(e.target.value)}
                  placeholder="Z.B. 2"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Die ID der Liste in Brevo, in die neue Kontakte gespeichert werden sollen.
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-brand-accent text-brand-bg px-5 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 mt-4"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Verbindung speichern
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mt-3 justify-center">
                  <CheckCircle2 size={16} /> API Key erfolgreich gespeichert!
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm font-medium mt-3 justify-center">
                  <AlertCircle size={16} /> Fehler beim Speichern.
                </div>
              )}
            </div>
          </div>

          {/* Guide */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 h-full">
              <h3 className="font-bold text-white mb-4">Wie richte ich das ein?</h3>
              <ol className="space-y-4 text-sm text-gray-300">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    Erstelle einen kostenlosen Account bei <a href="https://www.brevo.com/de/" target="_blank" rel="noreferrer" className="text-brand-accent hover:underline flex items-center gap-1 inline-flex">Brevo <ExternalLink size={12}/></a>.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    Klicke oben rechts auf deinen Namen und wähle <strong>SMTP & API</strong>.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    Generiere einen neuen <strong>API Key</strong> und kopiere ihn in das Feld hier links.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold text-xs">4</span>
                  <div>
                    Gehe in Brevo zu deinen <strong>Kontakten</strong>, erstelle eine Liste (z.B. "Website Leads") und trage die Listen-ID links ein.
                  </div>
                </li>
              </ol>

              <div className="mt-8 p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-lg">
                <p className="text-xs text-brand-accent font-medium leading-relaxed">
                  Sobald dein API-Key hier gespeichert ist, werden Kontakte in Zukunft automatisch synchronisiert. Den Versand deiner Newsletter steuerst du dann bequem im Brevo-Dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
