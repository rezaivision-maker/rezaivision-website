import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { LayoutDashboard, FileText, Settings, BarChart3, Plus, Search, Edit, Trash2, Globe, TrendingUp, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog");

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
          <p className="text-xs text-gray-400">reza-e-motion Content Manager</p>
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
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">Warum B-Roll dein Video rettet</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs">Entwurf</span></td>
                    <td className="px-6 py-4 text-gray-400">-</td>
                    <td className="px-6 py-4"><span className="text-yellow-400 font-medium">65/100</span></td>
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

        {activeTab === "seo" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-display font-bold mb-2">SEO & Ranking Tools</h1>
            <p className="text-gray-400 mb-8">Google Search Console & Keyword Tracking.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Google Search Console</h3>
                    <p className="text-sm text-gray-400">Status der Indexierung</p>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                    <Globe size={24} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-400 mb-4">
                  <CheckCircle2 size={16} /> Verbunden & Aktiv
                </div>
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                  Sitemap neu einreichen
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Keyword Rankings</h3>
                    <p className="text-sm text-gray-400">Top Keywords in Kaiserslautern</p>
                  </div>
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Videoproduktion Kaiserslautern</span>
                    <span className="text-green-400 flex items-center gap-1">Platz 3 <TrendingUp size={14} /></span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Eventvideograf Kaiserslautern</span>
                    <span className="text-green-400 flex items-center gap-1">Platz 5 <TrendingUp size={14} /></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <h1 className="text-3xl font-display font-bold mb-2">Google Analytics</h1>
             <p className="text-gray-400 mb-8">Traffic und Nutzerverhalten.</p>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <BarChart3 size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Analytics Integration</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">Um echte Live-Daten zu sehen, muss das CMS mit der Google Analytics API über ein Backend (z.B. Node.js) verbunden werden.</p>
                <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-medium transition-colors">
                  Mit Google verbinden
                </button>
             </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
