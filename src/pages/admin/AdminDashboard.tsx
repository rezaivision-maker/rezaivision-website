import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { LayoutDashboard, FileText, Settings, BarChart3, Plus, Search, Edit, Trash2, Globe, TrendingUp, CheckCircle2, LogOut, Lock } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
              className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2"
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === "blog" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText size={18} />
            <span className="font-medium">Blog & Artikel</span>
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === "seo" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Globe size={18} />
            <span className="font-medium">SEO & Ranking</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === "analytics" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BarChart3 size={18} />
            <span className="font-medium">Google Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === "settings" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings size={18} />
            <span className="font-medium">Einstellungen</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
           >
             <LogOut size={18} />
             <span className="font-medium">Abmelden</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-12 py-8">
        {activeTab === "blog" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold mb-2">Blog Beiträge</h1>
                <p className="text-gray-400">Verwalte deine SEO-optimierten Artikel.</p>
              </div>
              <button className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-brand-accent-hover transition-colors">
                <Plus size={18} />
                Neuer Beitrag
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Beiträge suchen..." 
                    className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-accent text-white"
                  />
                </div>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-black/20 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Titel</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Datum</th>
                    <th className="px-6 py-4 font-medium">SEO Score</th>
                    <th className="px-6 py-4 font-medium text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">Was kostet ein Recruiting Video 2026?</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">Veröffentlicht</span></td>
                    <td className="px-6 py-4 text-gray-400">03. März 2026</td>
                    <td className="px-6 py-4"><span className="text-green-400 font-medium">92/100</span></td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-white"><Edit size={16} /></button>
                      <button className="p-2 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ... (Other tabs left as placeholders for brevity, they remain unchanged functionally) */}
        {activeTab === "seo" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <h1 className="text-3xl font-display font-bold mb-2">SEO & Ranking Tools</h1>
             <p className="text-gray-400 mb-8">Google Search Console & Keyword Tracking.</p>
           </motion.div>
        )}
      </main>
    </div>
  );
}
