import React, { useState, useEffect } from 'react';
import { Megaphone, Send, BarChart2, Video, Plus, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function CampaignManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'manus' | 'meta'>('manus');

  // Manus State
  const [manusStatus, setManusStatus] = useState<Record<string, string>>({});
  
  // Meta Mock State
  const [metaConnected, setMetaConnected] = useState(false);

  useEffect(() => {
    // Check if Meta Token is set
    const token = localStorage.getItem('metaToken');
    setMetaConnected(!!token);

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'productionProjects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendToManus = async (project: any) => {
    const manusKey = localStorage.getItem('manusApiKey');
    if (!manusKey) {
      alert("Bitte hinterlege zuerst deinen Manus API Key in den Einstellungen!");
      return;
    }

    setManusStatus(prev => ({ ...prev, [project.id]: 'sending' }));

    // Mock API call to Manus
    try {
      // In reality: 
      // await fetch('https://api.manus.ai/v2/tasks', { method: 'POST', headers: { 'Authorization': `Bearer ${manusKey}` }, body: JSON.stringify({...}) });
      await new Promise(resolve => setTimeout(resolve, 2000));
      setManusStatus(prev => ({ ...prev, [project.id]: 'success' }));
    } catch (err) {
      console.error(err);
      setManusStatus(prev => ({ ...prev, [project.id]: 'error' }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-brand-darker rounded-3xl border border-white/5 overflow-hidden">
      {/* Header Tabs */}
      <div className="flex border-b border-white/5 px-6 pt-6">
        <button 
          onClick={() => setActiveTab('manus')}
          className={`px-6 py-4 font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'manus' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <Activity size={18} />
          Manus AI Workflow
        </button>
        <button 
          onClick={() => setActiveTab('meta')}
          className={`px-6 py-4 font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'meta' ? 'border-blue-400 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <BarChart2 size={18} />
          Meta Ads Manager
        </button>
      </div>

      <div className="p-8 flex-1 overflow-y-auto">
        {activeTab === 'manus' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Manus AI Agenten Tasking</h2>
              <p className="text-gray-400">Übergib fertige Skripte und Shotlists aus der Production Suite direkt an Manus, damit der Agent automatisch Ad-Kampagnen-Konzepte oder Targeting-Strategien erstellt.</p>
            </div>

            {loading ? (
              <div className="py-20 flex justify-center">
                <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <Video className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-lg font-bold text-white">Keine Projekte gefunden</h3>
                <p className="text-gray-400">Erstelle zuerst Projekte in der Production Suite.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                  <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/10 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">{p.title || 'Ohne Titel'}</h3>
                    <p className="text-xs text-gray-400 mb-4 flex-1 line-clamp-3">
                      {p.briefing || p.script || 'Keine Beschreibung vorhanden.'}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5">
                      {manusStatus[p.id] === 'success' ? (
                        <div className="w-full bg-emerald-500/10 text-emerald-400 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                          <CheckCircle2 size={16} /> An Manus gesendet
                        </div>
                      ) : manusStatus[p.id] === 'sending' ? (
                        <div className="w-full bg-brand-accent/20 text-brand-accent py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" /> Sende...
                        </div>
                      ) : (
                        <button 
                          onClick={() => sendToManus(p)}
                          className="w-full bg-white/10 hover:bg-brand-accent text-white py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                          <Send size={16} /> Manus Task starten
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'meta' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Meta Ads Integration</h2>
              <p className="text-gray-400">Verwalte deine Facebook & Instagram Ad Kampagnen direkt aus dem Agency OS.</p>
            </div>

            {!metaConnected ? (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Meta nicht verbunden</h3>
                <p className="text-gray-400 mb-6">Du hast noch keinen Meta Access Token in den Einstellungen hinterlegt.</p>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('switch-admin-tab', { detail: { tab: 'settings' } }))}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-colors"
                >
                  Zu den Einstellungen
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Mock Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-sm text-gray-400 font-bold mb-1">Ad Spend (30 Tage)</p>
                    <p className="text-3xl font-black text-white">€ 4.250</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-sm text-gray-400 font-bold mb-1">Generierte Leads</p>
                    <p className="text-3xl font-black text-white">124</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-sm text-gray-400 font-bold mb-1">CPL (Cost per Lead)</p>
                    <p className="text-3xl font-black text-emerald-400">€ 34,27</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Aktive Kampagnen</h3>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
                      <Plus size={16} /> Neue Kampagne
                    </button>
                  </div>
                  
                  <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-xl">
                    API-Verbindung steht. (Mock Data)<br/>
                    In Produktion werden hier die echten Graph API Daten geladen.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
