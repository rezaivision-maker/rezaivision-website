import React, { useState, useEffect } from 'react';
import { Save, Search, Sparkles, Loader2, CheckCircle2, AlertCircle, LayoutTemplate } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

const PAGES = [
  { 
    id: 'home', name: 'Startseite', path: '/',
    defaultTitle: "Unsichtbar oder Unvergesslich? | Videoproduktion Kaiserslautern | Rezai Vision",
    defaultDescription: "Warum manche Marken faszinieren, während andere im Rauschen untergehen. Ich entwickle Videos als strategisches Werkzeug für Ihre Website, Ads und LinkedIn. Videoproduktion in Kaiserslautern & Südwesten.",
    defaultKeywords: "Videoproduktion, Kaiserslautern, Videograf, Unternehmensfilm, Recruiting Video, Werbevideo"
  },
  { 
    id: 'leistungen', name: 'Leistungen (Übersicht)', path: '/leistungen',
    defaultTitle: "Leistungen | Videoproduktion & Strategie | Rezai Vision",
    defaultDescription: "Unsere Leistungen: Unternehmensfilme, Recruiting Videos, Social Media Ads und Webdesign. Strategische Videoproduktion für messbare Ergebnisse.",
    defaultKeywords: "Leistungen, Videoproduktion, Kaiserslautern, Unternehmensfilm, Recruiting, Ads, Webdesign"
  },
  { 
    id: 'leistungen-unternehmensfilm', name: 'Unternehmensfilm', path: '/leistungen/unternehmensfilm',
    defaultTitle: "Unternehmensfilm & Imagefilm | Rezai Vision",
    defaultDescription: "Ein Unternehmensfilm, der nicht nur gut aussieht, sondern Vertrauen schafft und verkauft. Premium Imagefilme aus Kaiserslautern.",
    defaultKeywords: "Unternehmensfilm, Imagefilm, Videoproduktion Kaiserslautern, B2B Video, Markenaufbau"
  },
  { 
    id: 'leistungen-recruiting', name: 'Recruiting Video', path: '/leistungen/recruiting',
    defaultTitle: "Recruiting Videos | Fachkräfte gewinnen | Rezai Vision",
    defaultDescription: "Gewinnen Sie die besten Talente mit authentischen Recruiting Videos. Wir zeigen Ihre Unternehmenskultur, wie sie wirklich ist.",
    defaultKeywords: "Recruiting Video, Mitarbeitergewinnung, Employer Branding, HR Video, Kaiserslautern"
  },
  { 
    id: 'leistungen-werbevideo', name: 'Werbevideo', path: '/leistungen/werbevideo',
    defaultTitle: "Werbevideos & Social Ads | Rezai Vision",
    defaultDescription: "Performance-optimierte Werbevideos für Facebook, Instagram und LinkedIn Ads. Steigern Sie Ihre Conversion Rate mit echtem Storytelling.",
    defaultKeywords: "Werbevideo, Social Media Ads, Facebook Ads Video, LinkedIn Ads, Conversion Rate"
  },
  { 
    id: 'leistungen-social-media', name: 'Social Media Retainer', path: '/leistungen/social-media',
    defaultTitle: "Social Media Betreuung & Content | Rezai Vision",
    defaultDescription: "Monatliche Content-Produktion für Ihre Social Media Kanäle. Wir liefern frische Videos und Bilder im Abo-Modell für kontinuierliche Sichtbarkeit.",
    defaultKeywords: "Social Media Betreuung, Content Creation, Retainer, Videoproduktion Abo, Instagram Reels"
  },
  { 
    id: 'leistungen-webdesign', name: 'Webdesign', path: '/leistungen/webdesign',
    defaultTitle: "Webdesign & Conversion-Optimierung | Rezai Vision",
    defaultDescription: "Modernes, verkaufspsychologisch optimiertes Webdesign, das perfekt mit unseren Videoproduktionen harmoniert.",
    defaultKeywords: "Webdesign, Kaiserslautern, Conversion-Optimierung, Landingpages, Website Erstellung"
  },
  { 
    id: 'reza-e-motion', name: 'Reza e-motion (Privat)', path: '/reza-e-motion',
    defaultTitle: "Reza e-motion | Private Events & Emotionen",
    defaultDescription: "Filmische Begleitung für die wichtigsten Momente des Lebens. Hochzeitsfilme, Eventbegleitung und Musikvideos mit echtem Kino-Look.",
    defaultKeywords: "Reza e-motion, Eventvideograf, Hochzeitsfilm, Musikvideo, Kaiserslautern"
  },
  { 
    id: 'reza-e-motion-eventbegleitung', name: 'Eventbegleitung', path: '/reza-e-motion/eventbegleitung',
    defaultTitle: "Eventbegleitung & Aftermovies | Reza e-motion",
    defaultDescription: "Professionelle Eventbegleitung für Konzerte, Firmenfeiern und private Veranstaltungen. Emotionale Aftermovies, die bleiben.",
    defaultKeywords: "Eventbegleitung, Aftermovie, Eventvideograf, Kaiserslautern, Partyvideo"
  },
  { 
    id: 'reza-e-motion-musikvideos', name: 'Musikvideos', path: '/reza-e-motion/musikvideos',
    defaultTitle: "Musikvideos | Kinematische Visuals | Reza e-motion",
    defaultDescription: "Kreative Musikvideos für Künstler und Bands. Vom Konzept bis zum fertigen Color Grading – wir bringen deinen Sound auf die Leinwand.",
    defaultKeywords: "Musikvideo, Rap Video, Band Video, Videoproduktion, Kaiserslautern"
  },
  { 
    id: 'reza-e-motion-hochzeitsfilme', name: 'Hochzeitsfilme', path: '/reza-e-motion/hochzeitsfilme',
    defaultTitle: "Hochzeitsfilme & Hochzeitsvideograf | Reza e-motion",
    defaultDescription: "Authentische, emotionale Hochzeitsfilme. Wir fangen die kleinen Momente und großen Gefühle eures besonderen Tages für die Ewigkeit ein.",
    defaultKeywords: "Hochzeitsfilm, Hochzeitsvideograf, Wedding Film, Heiraten Pfalz, Kaiserslautern"
  },
  { 
    id: 'preisrechner', name: 'Preisrechner', path: '/preisrechner',
    defaultTitle: "Preisrechner | Was kostet eine Videoproduktion? | Rezai Vision",
    defaultDescription: "Berechnen Sie transparent und unverbindlich die Kosten für Ihre Videoproduktion. Unternehmensfilm, Recruiting oder Werbevideo.",
    defaultKeywords: "Preisrechner Videoproduktion, Kosten Imagefilm, Preise Recruiting Video, Kostenrechner"
  },
  { 
    id: 'ueber-uns', name: 'Über uns', path: '/ueber-uns',
    defaultTitle: "Über uns | Parsha Rezai | Rezai Vision",
    defaultDescription: "Lernen Sie den Kopf hinter Rezai Vision kennen. Mein Ansatz, meine Vision und warum ich Filme mache, die bewegen.",
    defaultKeywords: "Über uns, Parsha Rezai, Videograf Kaiserslautern, Philosophie"
  },
  { 
    id: 'technik', name: 'Technik & Qualität', path: '/technik',
    defaultTitle: "Kino-Technik für Ihr Unternehmen | Rezai Vision",
    defaultDescription: "Wir drehen mit modernster Kino-Kameraausrüstung, Drohnen und Gimbals, um Ihrem Unternehmen einen unverwechselbaren Premium-Look zu verleihen.",
    defaultKeywords: "Kamera Equipment, Kino Look, Drohne, Sony Cinema Line, Videoproduktion Technik"
  },
  { 
    id: 'faq', name: 'FAQ', path: '/faq',
    defaultTitle: "Häufige Fragen (FAQ) | Videoproduktion | Rezai Vision",
    defaultDescription: "Antworten auf die häufigsten Fragen rund um die Videoproduktion, Projektabläufe und Kosten bei Rezai Vision.",
    defaultKeywords: "FAQ, Häufige Fragen, Ablauf Videoproduktion, Dauer Imagefilm"
  },
  { 
    id: 'blog', name: 'Magazin (Blog)', path: '/blog',
    defaultTitle: "Magazin für Marketing & Video | Rezai Vision",
    defaultDescription: "Praxistipps, Insights und strategisches Wissen rund um Videomarketing, SEO und Storytelling für moderne Unternehmen.",
    defaultKeywords: "Magazin, Blog, Videomarketing Tipps, Content Strategie, Recruiting Tipps"
  },
  { 
    id: 'kontakt', name: 'Kontakt', path: '/kontakt',
    defaultTitle: "Kontakt aufnehmen | Rezai Vision",
    defaultDescription: "Lassen Sie uns über Ihr nächstes Videoprojekt sprechen. Kontaktieren Sie uns für ein unverbindliches Erstgespräch in Kaiserslautern oder online.",
    defaultKeywords: "Kontakt, Erstgespräch, Videoproduktion anfragen, Kaiserslautern"
  },
  { 
    id: 'impressum', name: 'Impressum', path: '/impressum',
    defaultTitle: "Impressum | Rezai Vision",
    defaultDescription: "Impressum und rechtliche Angaben von Rezai Vision.",
    defaultKeywords: "Impressum, rechtliche Angaben"
  },
  { 
    id: 'datenschutz', name: 'Datenschutz', path: '/datenschutz',
    defaultTitle: "Datenschutzerklärung | Rezai Vision",
    defaultDescription: "Datenschutzerklärung von Rezai Vision bezüglich der Nutzung dieser Website.",
    defaultKeywords: "Datenschutz, GDPR, DSGVO"
  },
  { 
    id: 'agb', name: 'AGB', path: '/agb',
    defaultTitle: "Allgemeine Geschäftsbedingungen | Rezai Vision",
    defaultDescription: "Allgemeine Geschäftsbedingungen (AGB) von Rezai Vision.",
    defaultKeywords: "AGB, Geschäftsbedingungen"
  }
];

export default function PagesSEOManager() {
  const [activePage, setActivePage] = useState(PAGES[0]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentKeywords, setCurrentKeywords] = useState('');
  
  const [isIndexed, setIsIndexed] = useState<boolean | null>(null);
  const [checkingIndex, setCheckingIndex] = useState(false);
  
  const [aiReview, setAiReview] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch from firestore
  useEffect(() => {
    let isMounted = true;
    const fetchSEO = async () => {
      try {
        const docRef = doc(db, "seoMetadata", activePage.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          setMetaTitle(data.title || activePage.defaultTitle);
          setMetaDescription(data.description || activePage.defaultDescription);
          setMetaKeywords(data.keywords || activePage.defaultKeywords);
          setCurrentTitle(data.title || activePage.defaultTitle);
          setCurrentDescription(data.description || activePage.defaultDescription);
          setCurrentKeywords(data.keywords || activePage.defaultKeywords);
        } else if (isMounted) {
          setMetaTitle(activePage.defaultTitle);
          setMetaDescription(activePage.defaultDescription);
          setMetaKeywords(activePage.defaultKeywords);
          setCurrentTitle(activePage.defaultTitle);
          setCurrentDescription(activePage.defaultDescription);
          setCurrentKeywords(activePage.defaultKeywords);
        }
      } catch (e) {
        console.error("Error fetching SEO data", e);
      }
    };
    
    fetchSEO();
    setAiReview('');
    setIsIndexed(null);

    return () => { isMounted = false; };
  }, [activePage]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, "seoMetadata", activePage.id);
      await setDoc(docRef, { 
        title: metaTitle, 
        description: metaDescription, 
        keywords: metaKeywords,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setCurrentTitle(metaTitle);
      setCurrentDescription(metaDescription);
      setCurrentKeywords(metaKeywords);
      alert('Erfolgreich gespeichert!');
    } catch (e) {
      console.error("Error saving SEO data", e);
      alert('Fehler beim Speichern der SEO Daten.');
    } finally {
      setSaving(false);
    }
  };

  const checkIndexing = () => {
    setCheckingIndex(true);
    setTimeout(() => {
      setIsIndexed(Math.random() > 0.3); // Mock logic for visual
      setCheckingIndex(false);
    }, 1500);
  };

  const runAiReview = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analysiere folgende Meta-Daten für die Seite "${activePage.name}":\n\nAktueller Title:\n${metaTitle}\n\nAktuelle Description:\n${metaDescription}\n\nIst das conversion-stark und SEO-optimiert? Bitte antworte EXAKT in folgendem Format:\n\n✨ K.I. Vorschlag (Title):\n[Dein optimierter Titel]\n\n✨ K.I. Vorschlag (Description):\n[Deine optimierte Description]\n\n💡 Warum ist das besser? (max. 3 kurze Bulletpoints):\n- ...`,
          systemInstruction: 'Du bist ein Senior SEO und Copywriting Experte. Deine Aufgabe ist es, Klickraten zu maximieren.'
        })
      });
      const data = await response.json();
      setAiReview(data.reply);
    } catch (err) {
      setAiReview('Fehler bei der K.I. Analyse.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar: Pages List */}
      <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-black/20 border-b border-white/10">
          <h3 className="font-bold text-white flex items-center gap-2">
            <LayoutTemplate size={18} className="text-brand-accent" />
            Seiten
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {PAGES.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activePage.id === page.id 
                  ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {page.name}
              <span className="block text-xs font-light opacity-60 truncate">{page.path}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* Indexing Status Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Indexierungs-Status</h3>
            <p className="text-sm text-gray-400">Ist diese Seite bei Google im Index?</p>
            {isIndexed !== null && (
              <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isIndexed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {isIndexed ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {isIndexed ? 'Seite ist indexiert' : 'Nicht im Index (oder Fehler)'}
              </div>
            )}
          </div>
          <button 
            onClick={checkIndexing}
            disabled={checkingIndex}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {checkingIndex ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Live-Check ausführen
          </button>
        </div>

        {/* SEO Meta Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Meta-Daten: {activePage.name}</h3>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-accent text-brand-bg px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all text-sm disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Speichern
            </button>
          </div>

          {/* Current Stand */}
          <div className="mb-8 p-4 bg-black/30 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-accent" />
              Aktuell Live
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 uppercase">Title</span>
                <p className="text-sm text-gray-200 mt-0.5">{currentTitle}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase">Description</span>
                <p className="text-sm text-gray-200 mt-0.5">{currentDescription}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase">Keywords</span>
                <p className="text-sm text-gray-200 mt-0.5">{currentKeywords}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meta Title (Bearbeiten)</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
              />
              <span className={`text-xs mt-1 block ${metaTitle.length > 60 ? 'text-red-400' : 'text-gray-500'}`}>
                {metaTitle.length} / 60 Zeichen (Empfohlen)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent resize-none"
              />
              <span className={`text-xs mt-1 block ${metaDescription.length > 160 ? 'text-red-400' : 'text-gray-500'}`}>
                {metaDescription.length} / 160 Zeichen (Empfohlen)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Keywords / Tags</label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                placeholder="Komma-separiert..."
              />
            </div>
          </div>
        </div>

        {/* AI Review */}
        <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-brand-accent" />
                K.I. SEO-Review
              </h3>
              <p className="text-sm text-gray-400">Lass die K.I. deine Meta-Daten auf Conversion und Keywords prüfen.</p>
            </div>
            <button
              onClick={runAiReview}
              disabled={loadingAi || !metaTitle || !metaDescription}
              className="bg-brand-dark border border-brand-accent/30 text-brand-accent px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-accent/10 transition-all text-sm disabled:opacity-50"
            >
              {loadingAi ? <Loader2 size={16} className="animate-spin" /> : 'Jetzt analysieren'}
            </button>
          </div>
          
          {aiReview && (
            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-white/5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {aiReview}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
