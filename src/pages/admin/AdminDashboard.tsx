import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Settings, BarChart3, Plus, Search, Edit, Trash2, 
  Globe, LogOut, Lock, Database, X, Loader2 
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { fetchBlogPosts, saveBlogPost, deleteBlogPost, importStaticPosts } from "@/lib/dbHelpers";
import { BlogPost } from "@/data/blogPosts";

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\w\s-]/g, "") // remove non-alphanumeric chars (except spaces and hyphens)
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/--+/g, "-") // replace duplicate hyphens
    .trim();
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState("");

  // CMS Blog States
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Form States
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState<'corporate' | 'emotion'>("corporate");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formCtaLabel, setFormCtaLabel] = useState("");
  const [formCtaLink, setFormCtaLink] = useState("");
  const [formReadTime, setFormReadTime] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formLayout, setFormLayout] = useState<'standard' | 'case-study' | 'gallery' | 'video'>("standard");
  const [formKpiTitle1, setFormKpiTitle1] = useState("");
  const [formKpiValue1, setFormKpiValue1] = useState("");
  const [formKpiTitle2, setFormKpiTitle2] = useState("");
  const [formKpiValue2, setFormKpiValue2] = useState("");
  const [formClientName, setFormClientName] = useState("");
  const [formProjectDuration, setFormProjectDuration] = useState("");
  const [formGalleryImage1, setFormGalleryImage1] = useState("");
  const [formGalleryImage2, setFormGalleryImage2] = useState("");
  const [formGalleryImage3, setFormGalleryImage3] = useState("");
  const [formGalleryImage4, setFormGalleryImage4] = useState("");
  const [formVideoUrl, setFormVideoUrl] = useState("");

  const contentRef = React.useRef<HTMLTextAreaElement>(null);

  const insertFormat = (before: string, after: string = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = before + selectedText + after;

    setFormContent(
      text.substring(0, start) + replacement + text.substring(end)
    );

    // Refocus and select
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const refreshPosts = async () => {
    setPostsLoading(true);
    try {
      const fetched = await fetchBlogPosts();
      setPosts(fetched);
    } catch (err) {
      console.error(err);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshPosts();
    }
  }, [user]);

  const handleLogin = async () => {
    setLoginError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setLoginError("Login fehlgeschlagen. Ist der Google Sign-In in der Firebase Console aktiviert?");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Open modal to create a new post
  const openCreateModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("corporate");
    setFormExcerpt("");
    setFormContent("");
    setFormImage("");
    setFormCtaLabel("Kostenloses Erstgespräch buchen");
    setFormCtaLink("/kontakt");
    setFormReadTime("5 min");
    setFormLayout("standard");
    setFormKpiTitle1("");
    setFormKpiValue1("");
    setFormKpiTitle2("");
    setFormKpiValue2("");
    setFormClientName("");
    setFormProjectDuration("");
    setFormGalleryImage1("");
    setFormGalleryImage2("");
    setFormGalleryImage3("");
    setFormGalleryImage4("");
    setFormVideoUrl("");
    
    // Auto-generate today's date in German format (e.g. "03. Juni 2026")
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    setFormDate(new Date().toLocaleDateString('de-DE', options));
    
    setIsModalOpen(true);
  };

  // Open modal to edit a post
  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormImage(post.image);
    setFormCtaLabel(post.ctaLabel || "Kostenloses Erstgespräch buchen");
    setFormCtaLink(post.ctaLink || "/kontakt");
    setFormReadTime(post.readTime || "5 min");
    setFormDate(post.date);
    setFormLayout(post.layout || "standard");
    setFormKpiTitle1(post.kpiTitle1 || "");
    setFormKpiValue1(post.kpiValue1 || "");
    setFormKpiTitle2(post.kpiTitle2 || "");
    setFormKpiValue2(post.kpiValue2 || "");
    setFormClientName(post.clientName || "");
    setFormProjectDuration(post.projectDuration || "");
    setFormGalleryImage1(post.galleryImages?.[0] || "");
    setFormGalleryImage2(post.galleryImages?.[1] || "");
    setFormGalleryImage3(post.galleryImages?.[2] || "");
    setFormGalleryImage4(post.galleryImages?.[3] || "");
    setFormVideoUrl(post.videoUrl || "");
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      setFormSlug(generateSlug(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingPost ? editingPost.id : Math.random().toString(36).substring(2, 9);
    
    const galleryImages = formLayout === 'gallery' ? [
      formGalleryImage1,
      formGalleryImage2,
      formGalleryImage3,
      formGalleryImage4
    ].filter(img => img.trim() !== "") : [];

    const newPost: BlogPost = {
      id,
      title: formTitle,
      slug: formSlug,
      category: formCategory,
      excerpt: formExcerpt,
      content: formContent,
      image: formImage,
      ctaLabel: formCtaLabel,
      ctaLink: formCtaLink,
      readTime: formReadTime,
      date: formDate,
      layout: formLayout,
      kpiTitle1: formLayout === 'case-study' ? formKpiTitle1 : "",
      kpiValue1: formLayout === 'case-study' ? formKpiValue1 : "",
      kpiTitle2: formLayout === 'case-study' ? formKpiTitle2 : "",
      kpiValue2: formLayout === 'case-study' ? formKpiValue2 : "",
      clientName: formLayout === 'case-study' ? formClientName : "",
      projectDuration: formLayout === 'case-study' ? formProjectDuration : "",
      galleryImages,
      videoUrl: formLayout === 'video' ? formVideoUrl : ""
    };

    try {
      await saveBlogPost(newPost);
      setIsModalOpen(false);
      refreshPosts();
    } catch (err) {
      alert("Fehler beim Speichern: " + err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Möchtest du diesen Beitrag wirklich unwiderruflich löschen?")) {
      try {
        await deleteBlogPost(id);
        refreshPosts();
      } catch (err) {
        alert("Fehler beim Löschen: " + err);
      }
    }
  };

  const handleImport = async () => {
    if (confirm("Möchtest du alle 33 Standard-Blogbeiträge in deine Google Cloud Firestore-Datenbank importieren? Bereits existierende Beiträge werden überschrieben.")) {
      setIsImporting(true);
      try {
        await importStaticPosts();
        alert("Import erfolgreich! Alle Beiträge sind jetzt in Firestore geladen.");
        refreshPosts();
      } catch (err) {
        alert("Import fehlgeschlagen: " + err);
      } finally {
        setIsImporting(false);
      }
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6">
        <Helmet>
          <title>Login | CMS</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="w-full max-w-md bg-brand-darker border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-center mb-2">Admin Login</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">Bitte melde dich an, um das CMS zu nutzen.</p>
          
          <div className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {loginError}
              </div>
            )}
            
            <button 
              onClick={handleLogin}
              className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Mit Google anmelden
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-12 flex">
      <Helmet>
        <title>CMS Dashboard | reza-e-motion</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Sidebar */}
      <aside className="w-64 bg-brand-darker border-r border-white/5 hidden md:flex flex-col h-[calc(100vh-6rem)] sticky top-24">
        <div className="p-6">
          <h2 className="text-xl font-display font-bold text-white mb-2">CMS Backend</h2>
          <p className="text-xs text-gray-400">Eingeloggt als {user.email}</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab("blog")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "blog" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText size={18} />
            <span className="font-medium">Blog & Artikel</span>
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "seo" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Globe size={18} />
            <span className="font-medium">SEO & Ranking</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
           >
             <LogOut size={18} />
             <span className="font-medium">Abmelden</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-12 py-8 overflow-y-auto">
        {activeTab === "blog" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold mb-2">Blog Beiträge</h1>
                <p className="text-gray-400">Verwalte deine SEO-optimierten Artikel live in Google Cloud Firestore.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleImport}
                  disabled={isImporting}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Database size={18} />
                  {isImporting ? "Importiere..." : "33 Beiträge importieren"}
                </button>
                <button 
                  onClick={openCreateModal}
                  className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer hover:scale-105"
                >
                  <Plus size={18} />
                  Neuer Beitrag
                </button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-black/20">
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Beiträge suchen (Titel, Vorschau)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-accent text-white"
                  />
                </div>
              </div>

              {postsLoading ? (
                <div className="py-20 flex justify-center items-center">
                  <Loader2 size={32} className="animate-spin text-brand-accent" />
                  <span className="ml-3 text-gray-400">Lade Beiträge...</span>
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-black/35 text-gray-400 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-medium">Titel</th>
                      <th className="px-6 py-4 font-medium">Kategorie</th>
                      <th className="px-6 py-4 font-medium">Datum</th>
                      <th className="px-6 py-4 font-medium">Lesezeit</th>
                      <th className="px-6 py-4 font-medium text-right">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-white/[0.03] transition-colors border-b border-white/5">
                        <td className="px-6 py-4 font-medium text-white max-w-md truncate">
                          <a 
                            href={`/blog/${post.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-brand-accent hover:underline transition-colors block"
                            title="Artikel-Vorschau in neuem Tab öffnen"
                          >
                            {post.title}
                          </a>
                          <span className="block text-xs text-gray-400 font-light truncate mt-1">/{post.slug}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            post.category === 'corporate' 
                              ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/20" 
                              : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          }`}>
                            {post.category === 'corporate' ? 'Business' : 'Emotion'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300 font-light">{post.date}</td>
                        <td className="px-6 py-4 text-gray-300 font-light">{post.readTime}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => openEditModal(post)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                              title="Bearbeiten"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer"
                              title="Löschen"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPosts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                          Keine Beiträge gefunden. Klicke auf "33 Beiträge importieren" um zu starten!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "seo" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <h1 className="text-3xl font-display font-bold mb-2">SEO & Ranking</h1>
             <p className="text-gray-400 mb-8">Übersicht über Suchmaschinenoptimierung und Rankings.</p>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-lg">
               <h3 className="text-lg font-bold text-white mb-2">Robots.txt & Sitemap</h3>
               <p className="text-sm text-gray-400 mb-4">Das CMS sowie AGB und Impressum sind mit "noindex, nofollow" versehen und werden von Suchmaschinen ignoriert.</p>
               <div className="flex gap-2">
                 <a 
                   href="/sitemap.xml" 
                   target="_blank"
                   className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all"
                 >
                   Sitemap ansehen
                 </a>
                 <a 
                   href="/robots.txt" 
                   target="_blank"
                   className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all"
                 >
                   Robots.txt ansehen
                 </a>
               </div>
             </div>
           </motion.div>
        )}
      </main>

      {/* CREATE/EDIT OVERLAY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-brand-darker border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h3 className="text-xl font-display font-bold text-white">
                  {editingPost ? "Beitrag bearbeiten" : "Neuen Beitrag erstellen"}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Titel</label>
                    <input 
                      type="text" 
                      required
                      value={formTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="z.B. Warum Recruiting Videos 2026 funktionieren"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Slug (URL Pfad)</label>
                    <input 
                      type="text" 
                      required
                      value={formSlug}
                      onChange={(e) => setFormSlug(generateSlug(e.target.value))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors font-mono text-sm"
                      placeholder="warum-recruiting-videos"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Kategorie</label>
                    <select 
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as 'corporate' | 'emotion')}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                    >
                      <option value="corporate">Business (Vision)</option>
                      <option value="emotion">Emotion</option>
                    </select>
                  </div>

                  {/* Layout */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Layout Template</label>
                    <select 
                      value={formLayout}
                      onChange={(e) => setFormLayout(e.target.value as 'standard' | 'case-study' | 'gallery' | 'video')}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                    >
                      <option value="standard">Standard (Klassisch)</option>
                      <option value="case-study">Case Study (Fallstudie mit KPIs)</option>
                      <option value="gallery">Bildergalerie (Visual Showcase)</option>
                      <option value="video">Video Showcase (YouTube/Vimeo Embed)</option>
                    </select>
                  </div>

                  {/* Case Study Fields */}
                  {formLayout === 'case-study' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white/[0.02] border border-white/10 rounded-2xl"
                    >
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-bold text-brand-accent">Case Study Kennzahlen</h4>
                        <p className="text-xs text-gray-400">Diese Details werden prominent als Dashboard oben im Artikel gerendert.</p>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Kunde (Client Name)</label>
                        <input 
                          type="text" 
                          value={formClientName}
                          onChange={(e) => setFormClientName(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="z.B. CBL Datenrettung"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Projektdauer (Duration)</label>
                        <input 
                          type="text" 
                          value={formProjectDuration}
                          onChange={(e) => setFormProjectDuration(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="z.B. 4 Wochen"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">KPI 1 Wert</label>
                        <input 
                          type="text" 
                          value={formKpiValue1}
                          onChange={(e) => setFormKpiValue1(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="z.B. +150%"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">KPI 1 Beschreibung</label>
                        <input 
                          type="text" 
                          value={formKpiTitle1}
                          onChange={(e) => setFormKpiTitle1(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="z.B. mehr Bewerbungen"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">KPI 2 Wert</label>
                        <input 
                          type="text" 
                          value={formKpiValue2}
                          onChange={(e) => setFormKpiValue2(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="z.B. 42"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">KPI 2 Beschreibung</label>
                        <input 
                          type="text" 
                          value={formKpiTitle2}
                          onChange={(e) => setFormKpiTitle2(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="z.B. qualifizierte Leads"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Gallery Fields */}
                  {formLayout === 'gallery' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white/[0.02] border border-white/10 rounded-2xl"
                    >
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-bold text-brand-accent">Galerie-Bilder</h4>
                        <p className="text-xs text-gray-400">Füge bis zu 4 Bild-URLs hinzu, die im oberen Bereich als Grid angezeigt werden.</p>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Bild 1 URL</label>
                        <input 
                          type="text" 
                          value={formGalleryImage1}
                          onChange={(e) => setFormGalleryImage1(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="https://res.cloudinary.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Bild 2 URL</label>
                        <input 
                          type="text" 
                          value={formGalleryImage2}
                          onChange={(e) => setFormGalleryImage2(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="https://res.cloudinary.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Bild 3 URL</label>
                        <input 
                          type="text" 
                          value={formGalleryImage3}
                          onChange={(e) => setFormGalleryImage3(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="https://res.cloudinary.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Bild 4 URL</label>
                        <input 
                          type="text" 
                          value={formGalleryImage4}
                          onChange={(e) => setFormGalleryImage4(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="https://res.cloudinary.com/..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Video Fields */}
                  {formLayout === 'video' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="md:col-span-2 grid grid-cols-1 gap-6 p-5 bg-white/[0.02] border border-white/10 rounded-2xl"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-brand-accent">Video Showcase Link</h4>
                        <p className="text-xs text-gray-400">Das Video wird direkt unter dem Header in einem responsive Player eingebunden.</p>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">YouTube- oder Vimeo-URL</label>
                        <input 
                          type="text" 
                          value={formVideoUrl}
                          onChange={(e) => setFormVideoUrl(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          placeholder="z.B. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Excerpt */}
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Vorschautext (SEO-Auszug)</label>
                    <textarea 
                      rows={2}
                      required
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                      placeholder="Ein kurzer, packender Satz für die Blogübersicht und die Google-Meta-Beschreibung..."
                    />
                  </div>

                  {/* Content (Markdown Textarea) with Toolbar */}
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Inhalt (Markdown / Text)</label>
                    
                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap gap-1.5 p-2 bg-black/40 border border-white/10 border-b-0 rounded-t-xl text-xs">
                      <button type="button" onClick={() => insertFormat("**", "**")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer font-bold" title="Fett">B</button>
                      <button type="button" onClick={() => insertFormat("*", "*")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer italic" title="Kursiv">I</button>
                      <div className="w-px h-5 bg-white/10 mx-1 align-middle inline-block self-center" />
                      <button type="button" onClick={() => insertFormat("\n## ", "\n")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer font-bold" title="Überschrift 2">H2</button>
                      <button type="button" onClick={() => insertFormat("\n### ", "\n")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer font-bold" title="Überschrift 3">H3</button>
                      <div className="w-px h-5 bg-white/10 mx-1 align-middle inline-block self-center" />
                      <button type="button" onClick={() => insertFormat("\n- ", "\n")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer" title="Liste (Punkte)">• Liste</button>
                      <button type="button" onClick={() => insertFormat("\n1. ", "\n")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer" title="Liste (Nummern)">1. Liste</button>
                      <div className="w-px h-5 bg-white/10 mx-1 align-middle inline-block self-center" />
                      <button type="button" onClick={() => insertFormat("[Link Text](", ")")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer" title="Link">Link</button>
                      <button type="button" onClick={() => insertFormat("\n**", "**\n")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-brand-accent border border-brand-accent/20 rounded cursor-pointer font-bold" title="Highlight Box">Highlight Box</button>
                      <button type="button" onClick={() => insertFormat("\n[Button Text](", ")\n")} className="px-2 py-1 bg-brand-accent text-brand-bg rounded cursor-pointer font-bold" title="CTA Button">CTA Button</button>
                      <button type="button" onClick={() => insertFormat("\n## FAQ\n### Frage?\nAntwort hier...\n")} className="px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded cursor-pointer font-bold" title="FAQ Accordion">FAQ</button>
                      <button type="button" onClick={() => insertFormat("\n| Spalte 1 | Spalte 2 |\n|---|---|\n| Wert 1 | Wert 2 |\n")} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer" title="Tabelle">Tabelle</button>
                    </div>

                    <textarea 
                      ref={contentRef}
                      rows={12}
                      required
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-b-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors font-mono text-sm leading-relaxed"
                      placeholder="# Hauptüberschrift&#10;&#10;Dein Fließtext hier... Nutze die Toolbar zum Formatieren."
                    />
                  </div>

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Bild-URL (Cloudinary/Unsplash)</label>
                    <input 
                      type="text" 
                      required
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                      placeholder="https://res.cloudinary.com/..."
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Datum</label>
                    <input 
                      type="text" 
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="z.B. 03. Juni 2026"
                    />
                  </div>

                  {/* Read Time */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Lesezeit</label>
                    <input 
                      type="text" 
                      required
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="z.B. 5 min"
                    />
                  </div>

                  {/* CTA Label */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">CTA Button Text</label>
                    <input 
                      type="text" 
                      value={formCtaLabel}
                      onChange={(e) => setFormCtaLabel(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="Kostenloses Erstgespräch buchen"
                    />
                  </div>

                  {/* CTA Link */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">CTA Link</label>
                    <input 
                      type="text" 
                      value={formCtaLink}
                      onChange={(e) => setFormCtaLink(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="/kontakt"
                    />
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all cursor-pointer font-bold"
                  >
                    Abbrechen
                  </button>
                  <button 
                    type="submit"
                    className="bg-brand-accent text-brand-bg hover:brightness-110 px-8 py-3 rounded-xl transition-all cursor-pointer font-bold"
                  >
                    {editingPost ? "Speichern" : "Veröffentlichen"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
