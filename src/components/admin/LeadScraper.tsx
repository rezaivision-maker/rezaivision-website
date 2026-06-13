import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import {
  Search, MapPin, Phone, Globe, Star, Loader2, Plus, Trash2, Wand2,
  Download, Upload, Filter, AlertCircle, Check, Copy, ExternalLink,
  TrendingUp, Brain, Target, Zap, Building2, Mail, ChevronDown, ChevronUp
} from 'lucide-react';

interface Lead {
  id?: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  rating: number | null;
  reviewCount: number;
  types: string[];
  source: string;
  leadScore: number;
  potential?: string;
  branche?: string;
  erstkontak_vorlage?: string;
  video_ideen?: string[];
  hauptschmerzen?: string[];
  budget_schaetzung?: string;
  kontakt_kanal?: string;
  notes: string;
  status: 'neu' | 'kontaktiert' | 'in_gespraech' | 'angebot' | 'gewonnen' | 'verloren';
  addedAt: string;
  googleMapsUrl?: string;
}

const LEAD_TOOLS = [
  {
    name: 'Apollo.io',
    url: 'https://apollo.io',
    description: 'Größte B2B-Lead-Datenbank. Findet Kontakte (Name, E-Mail, LinkedIn) nach Branche, Firmengröße und Standort. Kostenloser Einstieg verfügbar.',
    badge: '⭐ Empfohlen',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    freeCredits: 'Kostenlos: 50 E-Mails/Monat',
  },
  {
    name: 'Hunter.io',
    url: 'https://hunter.io',
    description: 'Findet die E-Mail-Adressen von Entscheidungsträgern einer Website mit hoher Treffsicherheit. Domain eingeben → E-Mail bekommen.',
    badge: '📧 E-Mail Finder',
    badgeColor: 'bg-orange-500/20 text-orange-400',
    freeCredits: 'Kostenlos: 25 Suchen/Monat',
  },
  {
    name: 'Clay.com',
    url: 'https://clay.com',
    description: 'KI-gestützter Lead-Anreicherungs-Workflow. Verbindet 50+ Datenquellen automatisch und schreibt personalisierte Kalt-Akquise-E-Mails.',
    badge: '🤖 KI Workflow',
    badgeColor: 'bg-purple-500/20 text-purple-400',
    freeCredits: '14 Tage kostenlos',
  },
  {
    name: 'Phantombuster',
    url: 'https://phantombuster.com',
    description: 'Automatisiert LinkedIn, Instagram und andere Plattformen. Extrahiert öffentliche Daten von Profilen und Gruppen.',
    badge: '👻 Automation',
    badgeColor: 'bg-gray-500/20 text-gray-400',
    freeCredits: 'Kostenlos: 2 Stunden/Monat',
  },
  {
    name: 'Apify',
    url: 'https://apify.com',
    description: 'Cloud Web Scraping Plattform. Fertige Scrapers für Google Maps, Instagram, LinkedIn und mehr. Sehr flexibel.',
    badge: '🕷️ Web Scraping',
    badgeColor: 'bg-green-500/20 text-green-400',
    freeCredits: 'Kostenlos: $5 Credits/Monat',
  },
  {
    name: 'LinkedIn Sales Navigator',
    url: 'https://www.linkedin.com/sales/navigator',
    description: 'Offizielles LinkedIn Premium Tool für B2B-Leads. Filtern nach Jobtitel, Branche, Region. Ideal für Geschäftsführer-Kontakte.',
    badge: '💼 B2B Premium',
    badgeColor: 'bg-sky-500/20 text-sky-400',
    freeCredits: '30 Tage kostenlos',
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  neu: { label: 'Neu', color: 'bg-gray-500/20 text-gray-400' },
  kontaktiert: { label: 'Kontaktiert', color: 'bg-blue-500/20 text-blue-400' },
  in_gespraech: { label: 'Im Gespräch', color: 'bg-yellow-500/20 text-yellow-400' },
  angebot: { label: 'Angebot gesendet', color: 'bg-orange-500/20 text-orange-400' },
  gewonnen: { label: '✅ Gewonnen', color: 'bg-emerald-500/20 text-emerald-400' },
  verloren: { label: '❌ Verloren', color: 'bg-red-500/20 text-red-400' },
};

const POTENTIAL_COLORS: Record<string, string> = {
  Hoch: 'bg-emerald-500/20 text-emerald-400',
  Mittel: 'bg-yellow-500/20 text-yellow-400',
  Niedrig: 'bg-gray-500/20 text-gray-400',
};

export default function LeadScraper() {
  const [activeTab, setActiveTab] = useState<'scraper' | 'leads' | 'tools'>('scraper');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  // Scraper state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState(20);
  const [customInstructions, setCustomInstructions] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState('');
  const [apiNotConfigured, setApiNotConfigured] = useState(false);
  const [enrichingId, setEnrichingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Filter state
  const [filterStatus, setFilterStatus] = useState('alle');

  useEffect(() => {
    if (activeTab === 'leads') fetchLeads();
  }, [activeTab]);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const snap = await getDocs(query(collection(db, 'contactLeads'), orderBy('addedAt', 'desc')));
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
    } catch (e) { console.error(e); }
    finally { setLoadingLeads(false); }
  };

  const searchPlaces = async () => {
    if (!searchQuery.trim() || !searchLocation.trim()) {
      setSearchError('Bitte Branche und Standort eingeben.');
      return;
    }
    setSearching(true);
    setSearchResults([]);
    setSearchError('');
    setApiNotConfigured(false);

    try {
      const res = await fetch('/api/leads/scraper?action=search-places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, location: searchLocation, radius: searchRadius * 1000 }),
      });
      const data = await res.json();

      if (data.fallback) {
        setApiNotConfigured(true);
        return;
      }
      if (!data.success) {
        setSearchError(data.error || 'Fehler bei der Suche');
        return;
      }
      setSearchResults(data.places || []);
    } catch (e) {
      setSearchError('Verbindungsfehler. Bitte erneut versuchen.');
    } finally {
      setSearching(false);
    }
  };

  const enrichLead = async (place: any, index: number) => {
    setEnrichingId(place.id || index.toString());
    try {
      const res = await fetch('/api/leads/scraper?action=enrich-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business: place, customInstructions }),
      });
      const data = await res.json();
      if (data.success) {
        setSearchResults(prev => prev.map((p, i) =>
          (p.id || i.toString()) === (place.id || index.toString())
            ? { ...p, ...data.enrichment }
            : p
        ));
      }
    } catch (e) { console.error(e); }
    finally { setEnrichingId(null); }
  };

  const saveLead = async (place: any) => {
    const lead: Omit<Lead, 'id'> = {
      name: place.name,
      address: place.address,
      phone: place.phone || '',
      website: place.website || '',
      email: place.email || '',
      rating: place.rating,
      reviewCount: place.reviewCount || 0,
      types: place.types || [],
      source: place.source || 'Google Places',
      leadScore: place.leadScore || 50,
      potential: place.potential,
      branche: place.branche,
      erstkontak_vorlage: place.erstkontak_vorlage,
      video_ideen: place.video_ideen,
      hauptschmerzen: place.hauptschmerzen,
      budget_schaetzung: place.budget_schaetzung,
      kontakt_kanal: place.kontakt_kanal,
      notes: '',
      status: 'neu',
      addedAt: new Date().toISOString(),
      googleMapsUrl: place.googleMapsUrl,
    };
    const ref = await addDoc(collection(db, 'contactLeads'), lead);
    setSavedIds(prev => new Set([...prev, place.id]));
    return ref.id;
  };

  const saveAllLeads = async () => {
    for (const place of searchResults) {
      if (!savedIds.has(place.id)) await saveLead(place);
    }
    alert(`${searchResults.length} Leads gespeichert!`);
    setActiveTab('leads');
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Lead löschen?')) return;
    await deleteDoc(doc(db, 'contactLeads', id));
    setLeads(leads.filter(l => l.id !== id));
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    await updateDoc(doc(db, 'contactLeads', leadId), { status });
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: status as Lead['status'] } : l));
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Branche', 'Adresse', 'Telefon', 'Website', 'E-Mail', 'Bewertung', 'Potenzial', 'Status', 'Budget', 'Erstkontak'];
    const rows = leads.map(l => [
      l.name, l.branche || '', l.address, l.phone, l.website, l.email,
      l.rating || '', l.potential || '', l.status, l.budget_schaetzung || '',
      (l.erstkontak_vorlage || '').replace(/\n/g, ' ')
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'rezaivision-leads.csv'; a.click();
  };

  const filteredLeads = filterStatus === 'alle' ? leads : leads.filter(l => l.status === filterStatus);

  return (
    <div className="flex flex-col h-[90vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-white/5 shrink-0">
        {[
          { id: 'scraper', label: 'KI Lead-Scraper', icon: Search },
          { id: 'leads', label: `Lead-CRM (${leads.length})`, icon: Building2 },
          { id: 'tools', label: 'Tool-Directory', icon: Zap },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id ? 'border-brand-accent text-brand-accent bg-brand-accent/5' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">

        {/* ══ SCRAPER TAB ══ */}
        {activeTab === 'scraper' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Search className="text-brand-accent w-7 h-7" />
              <div>
                <h2 className="text-2xl font-bold text-white">KI Lead-Scraper</h2>
                <p className="text-gray-400 text-sm">Finde lokale Unternehmen via Google Places + KI-Anreicherung mit Kontakt, Schmerzen & Video-Ideen.</p>
              </div>
            </div>

            {/* Search Form */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Branche / Suchbegriff *</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="z.B. Pflegeheim, Autohaus, Zahnarzt, Fitnessstudio..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                    onKeyDown={e => e.key === 'Enter' && searchPlaces()}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Standort / Region *</label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={e => setSearchLocation(e.target.value)}
                    placeholder="z.B. Kaiserslautern, Mannheim, Bayern..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none"
                    onKeyDown={e => e.key === 'Enter' && searchPlaces()}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">K.I. Analyse-Fokus & Akquise-Ziel (Optional)</label>
                <textarea
                  value={customInstructions}
                  onChange={e => setCustomInstructions(e.target.value)}
                  placeholder="z.B. Fokus auf Recruiting-Videos, E-Mail im lockeren 'Du'-Stil verfassen, Fokus auf Imagefilme für Social Media..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none h-20 resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Suchradius: {searchRadius} km</label>
                <input type="range" min={2} max={100} value={searchRadius} onChange={e => setSearchRadius(Number(e.target.value))} className="w-full accent-brand-accent" />
                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>2km</span><span>50km</span><span>100km</span></div>
              </div>

              {searchError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex gap-2">
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <p className="text-red-300 text-sm">{searchError}</p>
                </div>
              )}

              <button onClick={searchPlaces} disabled={searching}
                className="w-full bg-brand-accent text-brand-bg py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {searching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                {searching ? 'Suche läuft...' : 'Leads finden'}
              </button>
            </div>

            {/* API Not Configured */}
            {apiNotConfigured && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
                <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2"><AlertCircle size={16} /> Google Places API Key fehlt</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>1. Gehe zu <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">console.cloud.google.com</a></p>
                  <p>2. Neues Projekt erstellen → "Places API (New)" + "Geocoding API" aktivieren</p>
                  <p>3. API Key erstellen unter: APIs & Services → Credentials</p>
                  <p>4. In Vercel eintragen: <code className="bg-black/40 px-2 py-0.5 rounded text-brand-accent text-xs">GOOGLE_PLACES_API_KEY=dein_key</code></p>
                </div>
                <p className="text-xs text-gray-500 mt-3">💡 Alternativ: Nutze Apollo.io oder Apify aus dem Tool-Directory für sofortigen Start ohne API-Key-Setup.</p>
              </div>
            )}

            {/* Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">{searchResults.length} Unternehmen gefunden</h3>
                  <button onClick={saveAllLeads}
                    className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:brightness-110"
                  >
                    <Plus size={14} /> Alle {searchResults.length} speichern
                  </button>
                </div>

                <div className="space-y-3">
                  {searchResults.map((place, i) => {
                    const isSaved = savedIds.has(place.id);
                    const isEnriching = enrichingId === (place.id || i.toString());
                    const isExpanded = expandedLead === (place.id || i.toString());
                    const potColor = place.potential ? POTENTIAL_COLORS[place.potential] : 'bg-gray-500/20 text-gray-400';

                    return (
                      <div key={place.id || i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h4 className="font-bold text-white">{place.name}</h4>
                                {place.potential && <span className={`text-xs font-bold px-2 py-0.5 rounded ${potColor}`}>{place.potential}</span>}
                                {place.rating && (
                                  <span className="flex items-center gap-1 text-xs text-yellow-400">
                                    <Star size={10} /> {place.rating} ({place.reviewCount})
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                                {place.address && <span className="flex items-center gap-1"><MapPin size={10} /> {place.address}</span>}
                                {place.phone && <span className="flex items-center gap-1"><Phone size={10} /> {place.phone}</span>}
                                {place.website && (
                                  <a href={place.website.startsWith('http') ? place.website : `https://${place.website}`} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-brand-accent hover:underline">
                                    <Globe size={10} /> Website
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {!isSaved ? (
                                <>
                                  <button onClick={() => enrichLead(place, i)} disabled={isEnriching}
                                    className="bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all disabled:opacity-50"
                                  >
                                    {isEnriching ? <Loader2 size={12} className="animate-spin" /> : <Brain size={12} />}
                                    {isEnriching ? '...' : 'KI'}
                                  </button>
                                  <button onClick={() => saveLead(place)}
                                    className="bg-brand-accent text-brand-bg px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:brightness-110 transition-all"
                                  >
                                    <Plus size={12} /> Speichern
                                  </button>
                                </>
                              ) : (
                                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                                  <Check size={12} /> Gespeichert
                                </span>
                              )}
                              <button onClick={() => setExpandedLead(isExpanded ? null : (place.id || i.toString()))}>
                                {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                              </button>
                            </div>
                          </div>

                          {/* AI Enrichment */}
                          {isExpanded && place.potential && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/10 pt-4">
                              <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Branche</p>
                                <p className="text-white text-sm">{place.branche}</p>
                              </div>
                              <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Budget-Schätzung</p>
                                <p className="text-brand-accent text-sm font-bold">{place.budget_schaetzung}</p>
                              </div>
                              {place.hauptschmerzen?.length > 0 && (
                                <div className="bg-black/20 rounded-lg p-3">
                                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Hauptschmerzen</p>
                                  <ul className="text-sm text-gray-300 space-y-1">
                                    {place.hauptschmerzen.map((s: string) => <li key={s}>→ {s}</li>)}
                                  </ul>
                                </div>
                              )}
                              {place.video_ideen?.length > 0 && (
                                <div className="bg-black/20 rounded-lg p-3">
                                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Video-Ideen</p>
                                  <ul className="text-sm text-gray-300 space-y-1">
                                    {place.video_ideen.map((v: string) => <li key={v}>🎬 {v}</li>)}
                                  </ul>
                                </div>
                              )}
                              {place.erstkontak_vorlage && (
                                <div className="md:col-span-2 bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-bold text-brand-accent uppercase">Erstkontakt-Vorlage</p>
                                    <button onClick={() => copyText(place.erstkontak_vorlage, place.id)}
                                      className="bg-white/10 hover:bg-white/20 text-gray-400 p-1.5 rounded"
                                    >
                                      {copiedId === place.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                    </button>
                                  </div>
                                  <p className="text-gray-200 text-sm">{place.erstkontak_vorlage}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ LEADS CRM TAB ══ */}
        {activeTab === 'leads' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="text-brand-accent w-7 h-7" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Lead-CRM</h2>
                  <p className="text-gray-400 text-sm">{leads.length} Leads gespeichert</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={exportCSV} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
                  <Download size={14} /> CSV Export
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {['alle', ...Object.keys(STATUS_CONFIG)].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === s ? 'bg-brand-accent text-brand-bg' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                >
                  {s === 'alle' ? 'Alle' : STATUS_CONFIG[s]?.label}
                </button>
              ))}
            </div>

            {loadingLeads ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-accent w-8 h-8" /></div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-xl">
                <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Noch keine Leads</h3>
                <p className="text-gray-400">Nutze den KI Lead-Scraper um deine ersten Leads zu finden.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map(lead => {
                  const sc = STATUS_CONFIG[lead.status];
                  const pc = lead.potential ? POTENTIAL_COLORS[lead.potential] : '';
                  const isExp = expandedLead === lead.id;
                  return (
                    <div key={lead.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h4 className="font-bold text-white">{lead.name}</h4>
                              {lead.branche && <span className="text-xs text-gray-500 bg-white/10 px-2 py-0.5 rounded">{lead.branche}</span>}
                              {lead.potential && <span className={`text-xs font-bold px-2 py-0.5 rounded ${pc}`}>{lead.potential}</span>}
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                              {lead.address && <span className="flex items-center gap-1"><MapPin size={10} /> {lead.address}</span>}
                              {lead.phone && <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>}
                              {lead.email && <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={lead.status}
                              onChange={e => updateLeadStatus(lead.id!, e.target.value)}
                              className={`text-xs font-bold px-2 py-1.5 rounded-lg border-0 focus:outline-none cursor-pointer ${sc?.color || ''} bg-transparent`}
                            >
                              {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                            </select>
                            <button onClick={() => setExpandedLead(isExp ? null : lead.id!)}>
                              {isExp ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                            </button>
                            <button onClick={() => deleteLead(lead.id!)} className="text-red-400 hover:text-red-300 p-1">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {isExp && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/10 pt-4">
                            {lead.budget_schaetzung && (
                              <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Budget-Schätzung</p>
                                <p className="text-brand-accent font-bold">{lead.budget_schaetzung}</p>
                              </div>
                            )}
                            {lead.kontakt_kanal && (
                              <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Kontakt-Kanal</p>
                                <p className="text-white text-sm">{lead.kontakt_kanal}</p>
                              </div>
                            )}
                            {lead.erstkontak_vorlage && (
                              <div className="md:col-span-2 bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-xs font-bold text-brand-accent uppercase">Erstkontakt-Vorlage</p>
                                  <button onClick={() => copyText(lead.erstkontak_vorlage!, lead.id!)}>
                                    {copiedId === lead.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-gray-400" />}
                                  </button>
                                </div>
                                <p className="text-gray-200 text-sm">{lead.erstkontak_vorlage}</p>
                              </div>
                            )}
                            {lead.googleMapsUrl && (
                              <a href={lead.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
                              >
                                <ExternalLink size={12} /> Google Maps öffnen
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ TOOLS TAB ══ */}
        {activeTab === 'tools' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-brand-accent w-7 h-7" />
              <div>
                <h2 className="text-2xl font-bold text-white">Lead-Tool-Directory</h2>
                <p className="text-gray-400 text-sm">Die besten Tools für automatisiertes Lead-Sammeln und Anreicherung.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LEAD_TOOLS.map(tool => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-accent/40 transition-all group block"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-brand-accent transition-colors">{tool.name}</h4>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${tool.badgeColor}`}>{tool.badge}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{tool.description}</p>
                  <span className="text-xs text-emerald-400 font-bold">{tool.freeCredits}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
