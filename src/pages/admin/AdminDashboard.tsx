import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Settings, BarChart3, Plus, Search, Edit, Trash2, 
  Globe, LogOut, Lock, Database, X, Loader2, Eye, Columns,
  TrendingUp, Zap, RefreshCw, Smartphone, Monitor, AlertCircle, CheckCircle2,
  LayoutTemplate, Sparkles, Users, Mail, Video, Brain, BookOpen, Instagram,
  Palette, Target, Cpu, Megaphone, Mic, Network
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { fetchBlogPosts, saveBlogPost, deleteBlogPost, importStaticPosts } from "@/lib/dbHelpers";
import { BlogPost } from "@/data/blogPosts";
import CalculatorAdmin from "@/components/admin/CalculatorAdmin";
import PagesSEOManager from "@/components/admin/PagesSEOManager";
import CreatorChannel from "@/components/admin/CreatorChannel";
import CRMManager from "@/components/admin/CRMManager";
import EmailMarketingSetup from "@/components/admin/EmailMarketingSetup";
import ProductionSuite from "@/components/admin/ProductionSuite";
import LandingpageBuilder from "@/components/admin/LandingpageBuilder";
import MarketingStudio from "@/components/admin/MarketingStudio";
import InvoiceGenerator from "@/components/admin/InvoiceGenerator";
import AIVideoHub from "@/components/admin/AIVideoHub";
import MotionStudio from "@/components/admin/MotionStudio";
import SalesToolkit from "@/components/admin/SalesToolkit";
import KnowledgeWiki from "@/components/admin/KnowledgeWiki";
import CIManager from "@/components/admin/CIManager";
import ICPGenerator from "@/components/admin/ICPGenerator";
import AIModelManager from "@/components/admin/AIModelManager";
import AgencyGrowth from "@/components/admin/AgencyGrowth";
import CampaignManager from "@/components/admin/CampaignManager";
import SettingsTab from "@/components/admin/SettingsTab";
import JarvisCopilot from "@/components/admin/JarvisCopilot";
import AgentSwarms from "@/components/admin/AgentSwarms";

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

// Helper to calculate SVG path coordinates for line charts
const getSvgCoordinates = (data: any[], key: string, width: number, height: number) => {
  if (!data || data.length === 0) return { linePath: "", areaPath: "", points: [] };
  const maxVal = Math.max(...data.map(d => d[key])) * 1.15 || 100;
  const xStep = width / (data.length - 1);
  const points = data.map((d, idx) => {
    const x = idx * xStep;
    const y = height - (d[key] / maxVal) * height;
    return { x, y, value: d[key], date: d.date };
  });
  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  return { linePath, areaPath, points };
};

// Radial Gauge component for Lighthouse scores
const PageSpeedGauge = ({ score, label }: { score: number; label: string }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let strokeColor = "stroke-red-500";
  let textColor = "text-red-400";
  if (score >= 90) {
    strokeColor = "stroke-emerald-500";
    textColor = "text-emerald-400";
  } else if (score >= 50) {
    strokeColor = "stroke-amber-500";
    textColor = "text-amber-400";
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white/[0.02] border border-white/10 rounded-2xl relative overflow-hidden">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-white/5"
            strokeWidth="6"
            fill="transparent"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            className={strokeColor}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute text-lg font-display font-bold ${textColor}`}>
          {score}
        </span>
      </div>
      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-3 text-center">
        {label}
      </span>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState("");

  // Analytics & SEO State
  const [seoSubTab, setSeoSubTab] = useState<'analytics' | 'search-console' | 'pagespeed' | 'config'>('analytics');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [gscData, setGscData] = useState<any>(null);
  const [gscLoading, setGscLoading] = useState(true);
  const [pagespeedStrategy, setPagespeedStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [pagespeedData, setPagespeedData] = useState<any>(null);
  const [pagespeedLoading, setPagespeedLoading] = useState(true);
  const [pagespeedRunning, setPagespeedRunning] = useState(false);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchGsc = async () => {
    setGscLoading(true);
    try {
      const res = await fetch('/api/search-console');
      if (res.ok) {
        const data = await res.json();
        setGscData(data);
      }
    } catch (err) {
      console.error('Error fetching Search Console:', err);
    } finally {
      setGscLoading(false);
    }
  };

  const fetchPagespeed = async (strat: 'mobile' | 'desktop', runTest: boolean = false) => {
    if (runTest) {
      setPagespeedRunning(true);
    } else {
      setPagespeedLoading(true);
    }

    const fallbackData = {
      mobile: {
        scores: { performance: 88, accessibility: 95, bestPractices: 96, seo: 100 },
        metrics: {
          fcp: '1.8 s',
          lcp: '2.4 s',
          cls: '0.02',
          tbt: '120 ms',
          speedIndex: '2.1 s'
        },
        opportunities: [
          { title: 'Bilder in modernen Formaten bereitstellen', description: 'WebP oder AVIF verwenden, um Daten zu sparen.', savings: '0.45 s' },
          { title: 'Nicht verwendetes CSS reduzieren', description: 'CSS-Regeln entfernen, die nicht auf der aktuellen Seite geladen werden.', savings: '0.25 s' },
          { title: 'Render-blockierende Ressourcen beseitigen', description: 'Wichtige Stylesheets inline einfügen und Skripte verzögern.', savings: '0.15 s' }
        ]
      },
      desktop: {
        scores: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
        metrics: {
          fcp: '0.5 s',
          lcp: '0.7 s',
          cls: '0.005',
          tbt: '0 ms',
          speedIndex: '0.6 s'
        },
        opportunities: [
          { title: 'JavaScript minimieren', description: 'Entfernen unnötiger Leerzeichen und Optimieren des Codes.', savings: '0.05 s' },
          { title: 'Statische Assets mit einer effizienten Cache-Richtlinie bereitstellen', description: 'Lange Cache-Dauer für Assets konfigurieren.', savings: '0.02 s' }
        ]
      }
    };

    const currentFallback = fallbackData[strat] || fallbackData.mobile;

    try {
      const targetUrl = 'https://www.rezaivision.de/';
      const apiUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=${strat}`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Google PageSpeed API error');
      }

      const data = await response.json();
      const lighthouseResult = data.lighthouseResult;

      if (!lighthouseResult || !lighthouseResult.categories) {
        throw new Error('Invalid format from PageSpeed');
      }

      const categories = lighthouseResult.categories;
      const audits = lighthouseResult.audits;

      const scores = {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100)
      };

      const metrics = {
        fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
        lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
        cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        tbt: audits['total-blocking-time']?.displayValue || 'N/A',
        speedIndex: audits['speed-index']?.displayValue || 'N/A'
      };

      const opportunities: any[] = [];
      const perfAudits = ['modern-images', 'unused-css-rules', 'render-blocking-resources', 'unminified-javascript', 'uses-text-compression'];
      
      for (const auditKey of perfAudits) {
        const audit = audits[auditKey];
        if (audit && audit.score !== null && audit.score < 0.9 && audit.details?.overallSavingsMs > 0) {
          opportunities.push({
            title: audit.title,
            description: audit.description.replace(/\[Learn more\]\([^)]+\)\.?/i, '').trim(),
            savings: `${(audit.details.overallSavingsMs / 1000).toFixed(2)} s`
          });
        }
      }

      if (opportunities.length === 0) {
        opportunities.push(...currentFallback.opportunities);
      }

      setPagespeedData({
        isLive: true,
        strategy: strat,
        scores,
        metrics,
        opportunities,
        testedAt: new Date().toISOString()
      });

    } catch (err) {
      console.warn('PageSpeed live request failed, using fallback:', err);
      setPagespeedData({
        isLive: false,
        strategy: strat,
        scores: currentFallback.scores,
        metrics: currentFallback.metrics,
        opportunities: currentFallback.opportunities,
        testedAt: new Date().toISOString()
      });
    } finally {
      setPagespeedLoading(false);
      setPagespeedRunning(false);
    }
  };

  useEffect(() => {
    if (user && activeTab === "seo") {
      fetchAnalytics();
      fetchGsc();
      fetchPagespeed(pagespeedStrategy, false);
    }
  }, [user, activeTab]);

  const handlePagespeedStrategyChange = (strat: 'mobile' | 'desktop') => {
    setPagespeedStrategy(strat);
    fetchPagespeed(strat, false);
  };

  // CMS Blog States
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Live Preview States
  const [previewMode, setPreviewMode] = useState<'split' | 'edit' | 'preview'>("split");
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>("edit");

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

  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    return url;
  };

  const renderPreviewInline = (text: string, keyPrefix: string = '') => {
    if (text.match(/^\[(.*?)\]\((.*?)\)$/)) return <span key={keyPrefix}>{text}</span>;

    const linkParts = text.split(/\[(.*?)\]\((.*?)\)/g);
    
    return linkParts.map((part, idx) => {
      if (idx % 3 === 1) {
        const url = linkParts[idx + 1];
        return <a key={`${keyPrefix}-${idx}`} href={url} className="text-brand-accent hover:underline font-medium" target="_blank" rel="noopener noreferrer">{part}</a>;
      }
      if (idx % 3 === 2) return null;

      const boldParts = part.split(/\*\*(.*?)\*\*/g);
      return boldParts.map((bPart, bIdx) =>
        bIdx % 2 === 1
          ? <strong key={`${keyPrefix}-${idx}-${bIdx}`} className="text-white font-semibold">{bPart}</strong>
          : <span key={`${keyPrefix}-${idx}-${bIdx}`}>{bPart}</span>
      );
    });
  };

  const renderPreviewContent = (content: string) => {
    if (!content) return <p className="text-gray-500 italic">Schreibe Inhalt, um eine Vorschau zu sehen...</p>;
    
    const lines = content.split('\n');
    const elements: any[] = [];
    let i = 0;
    let inFaqSection = false;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (line === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-6 border-white/10" />);
        i++;
        continue;
      }

      if (line.startsWith('# ') && !line.startsWith('## ')) {
        i++;
        continue;
      }

      if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        inFaqSection = title.toLowerCase().includes('faq') || title.toLowerCase().includes('häufige fragen');
        elements.push(
          <h2 key={`h2-${i}`} className="text-xl md:text-2xl font-display font-bold mt-8 mb-4 text-white">
            {renderPreviewInline(title, `h2-${i}`)}
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        const title = line.replace('### ', '');
        
        if (inFaqSection) {
          i++;
          const answerLines = [];
          while (i < lines.length && !lines[i].trim().startsWith('#') && lines[i].trim() !== '---') {
            if (lines[i].trim() !== '') answerLines.push(lines[i].trim());
            i++;
          }
          elements.push(
            <details key={`faq-${i}`} className="group bg-white/5 border border-white/10 rounded-xl mb-3 overflow-hidden" open>
               <summary className="cursor-pointer font-bold text-sm md:text-base p-4 list-none flex justify-between items-center text-white hover:bg-white/5 transition-colors">
                 {renderPreviewInline(title, `faq-title-${i}`)}
                 <svg className="w-4 h-4 text-brand-accent group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </summary>
               <div className="px-4 pb-4 text-gray-300 text-xs leading-relaxed font-light">
                 {answerLines.map((al, idx) => (
                   <p key={idx} className="mb-2 last:mb-0">{renderPreviewInline(al, `faq-ans-${idx}`)}</p>
                 ))}
               </div>
            </details>
          );
          continue;
        } else {
          elements.push(
            <h3 key={`h3-${i}`} className="text-lg font-display font-bold mt-6 mb-3 text-white">
              {renderPreviewInline(title, `h3-${i}`)}
            </h3>
          );
          i++;
          continue;
        }
      }

      const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        elements.push(
          <figure key={`img-${i}`} className="my-6">
            <img 
              loading="lazy" 
              src={imageMatch[2]} 
              alt={imageMatch[1]} 
              className="rounded-xl border border-white/10 w-full object-cover max-h-[300px] shadow-lg" 
            />
            {imageMatch[1] && (
              <figcaption className="text-center text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">
                {imageMatch[1]}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }

      const buttonMatch = line.match(/^\[(.*?)\]\((.*?)\)$/);
      if (buttonMatch) {
         elements.push(
           <div className="my-4" key={`btn-${i}`}>
             <span className="inline-block bg-brand-accent text-brand-bg text-xs font-bold px-4 py-2 rounded-full cursor-default">
               {buttonMatch[1]}
             </span>
           </div>
         );
         i++;
         continue;
      }

      if (line.startsWith('|')) {
        const tableRows: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableRows.push(lines[i].trim());
          i++;
        }
        const rows = tableRows.filter(r => !r.match(/^\|[\s:]*-+/));
        if (rows.length === 0) continue;
        elements.push(
          <div key={`tbl-${i}`} className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.06]">
                  {rows[0].split('|').filter(c => c.trim() !== '').map((cell, idx) => (
                    <th key={idx} className="p-3 text-brand-accent font-bold uppercase text-[10px] tracking-widest border-b border-white/10">
                      {renderPreviewInline(cell.trim(), `th-${i}-${idx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    {row.split('|').filter(c => c.trim() !== '').map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-3 text-gray-300 text-xs">
                        {renderPreviewInline(cell.trim(), `td-${i}-${rowIdx}-${cellIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().substring(2));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="space-y-2 my-4 list-none">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-gray-300 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 min-w-[6px] rounded-full bg-brand-accent flex-shrink-0" />
                <span>{renderPreviewInline(item, `li-${i}-${idx}`)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="space-y-2 my-4 list-none">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{renderPreviewInline(item, `oli-${i}-${idx}`)}</span>
              </li>
            ))}
          </ol>
        );
        continue;
      }

      if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <div key={`ab-${i}`} className="my-6 p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />
            <p className="text-sm md:text-base font-bold text-white leading-relaxed pl-2">
              {line.replace(/^\*\*|\*\*$/g, '')}
            </p>
          </div>
        );
        i++;
        continue;
      }

      if (line !== '') {
        elements.push(
          <p key={`p-${i}`} className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
            {renderPreviewInline(line, `p-${i}`)}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };
    window.addEventListener('switch-admin-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-admin-tab', handleSwitchTab);
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
    
    setPreviewMode("split");
    setMobileTab("edit");
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
    setPreviewMode("split");
    setMobileTab("edit");
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
            <span className="font-medium">Performance & SEO</span>
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "calculator" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Monitor size={18} />
            <span className="font-medium">Preisrechner</span>
          </button>
          <button
            onClick={() => setActiveTab("pages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "pages" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutTemplate size={18} />
            <span className="font-medium">Seiten & SEO</span>
          </button>
          <button
            onClick={() => setActiveTab("crm")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "crm" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={18} />
            <span className="font-medium">Kontakte & Leads</span>
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "email" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Mail size={18} />
            <span className="font-medium">E-Mail Marketing</span>
          </button>
          <button
            onClick={() => setActiveTab("production")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "production" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText size={18} />
            <span className="font-medium">Production Suite</span>
          </button>
          <button
            onClick={() => setActiveTab("marketing")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "marketing" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Instagram size={18} />
            <span className="font-medium">Marketing Studio</span>
          </button>
          <button
            onClick={() => setActiveTab("agency-growth")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "agency-growth" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <TrendingUp size={18} />
            <span className="font-medium">Agency Growth</span>
          </button>
          <button
            onClick={() => setActiveTab("invoice")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "invoice" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText size={18} />
            <span className="font-medium">Business (PDFs)</span>
          </button>
          <button
            onClick={() => setActiveTab("landingpages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "landingpages" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Globe size={18} />
            <span className="font-medium">Landingpages</span>
          </button>
          <button
            onClick={() => setActiveTab("aivideo")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "aivideo" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Video size={18} />
            <span className="font-medium">KI Video Hub</span>
          </button>
          <button
            onClick={() => setActiveTab("motion")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "motion" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Zap size={18} />
            <span className="font-medium">Motion Studio (Framer)</span>
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "sales" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Brain size={18} />
            <span className="font-medium">Sales & Psychologie</span>
          </button>
          <button
            onClick={() => setActiveTab("wiki")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "wiki" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen size={18} />
            <span className="font-medium">Wissens-Wiki</span>
          </button>
          <button
            onClick={() => setActiveTab("icp-generator")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "icp-generator" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Target size={18} />
            <span className="font-medium">K.I. ICP Persona</span>
          </button>
          <button
            onClick={() => setActiveTab("ci-manager")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "ci-manager" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Palette size={18} />
            <span className="font-medium">CI Manager</span>
          </button>
          <button
            onClick={() => setActiveTab("ai-models")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "ai-models" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Cpu size={18} />
            <span className="font-medium">KI Modelle & APIs</span>
          </button>
          <button
            onClick={() => setActiveTab("swarms")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "swarms" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Network size={18} />
            <span className="font-medium">Agent Swarms</span>
          </button>
          <button
            onClick={() => setActiveTab("creator")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "creator" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles size={18} />
            <span className="font-medium">Creator Channel</span>
          </button>
          <button
            onClick={() => setActiveTab("jarvis")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "jarvis" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Mic size={18} />
            <span className="font-medium uppercase tracking-wider text-sm">J.A.R.V.I.S. Voice</span>
          </button>
          <button
            onClick={() => setActiveTab("campaign-manager")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "campaign-manager" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Megaphone size={18} />
            <span className="font-medium">Ads & Manus AI</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
              activeTab === "settings" ? "bg-brand-accent/10 text-brand-accent" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings size={18} />
            <span className="font-medium">Einstellungen & API</span>
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
        {activeTab === 'production' && (
          <motion.div
            key="production"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <ProductionSuite />
          </motion.div>
        )}

        {activeTab === 'landingpages' && (
          <motion.div
            key="landingpages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <LandingpageBuilder />
          </motion.div>
        )}

        {activeTab === 'marketing' && (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <MarketingStudio />
          </motion.div>
        )}

        {activeTab === 'agency-growth' && (
          <motion.div
            key="agency-growth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <AgencyGrowth />
          </motion.div>
        )}

        {activeTab === 'campaign-manager' && (
          <motion.div
            key="campaign-manager"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <CampaignManager />
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <SettingsTab />
          </motion.div>
        )}

        {activeTab === 'invoice' && (
          <motion.div
            key="invoice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <InvoiceGenerator />
          </motion.div>
        )}

        {activeTab === 'aivideo' && (
          <motion.div key="aivideo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <AIVideoHub />
          </motion.div>
        )}

        {activeTab === 'motion' && (
          <motion.div key="motion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <MotionStudio />
          </motion.div>
        )}

        {activeTab === 'sales' && (
          <motion.div key="sales" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SalesToolkit />
          </motion.div>
        )}

        {activeTab === 'wiki' && (
          <motion.div key="wiki" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <KnowledgeWiki />
          </motion.div>
        )}

        {activeTab === 'ci-manager' && (
          <motion.div key="ci-manager" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <CIManager />
          </motion.div>
        )}

        {activeTab === 'icp-generator' && (
          <motion.div key="icp-generator" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <ICPGenerator />
          </motion.div>
        )}

        {activeTab === 'ai-models' && (
          <motion.div key="ai-models" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <AIModelManager />
          </motion.div>
        )}

        {activeTab === 'swarms' && (
          <motion.div key="swarms" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <AgentSwarms />
          </motion.div>
        )}

        {activeTab === 'jarvis' && (
          <motion.div key="jarvis" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
            <JarvisCopilot />
          </motion.div>
        )}

        {activeTab === "crm" && <CRMManager />}
        {activeTab === "email" && <EmailMarketingSetup />}
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

        {activeTab === "calculator" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <CalculatorAdmin />
          </motion.div>
        )}

        {activeTab === "pages" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Seiten & SEO Manager</h1>
              <p className="text-gray-400">Verwalte Meta-Tags, prüfe die Indexierung und nutze KI für bessere Rankings.</p>
            </div>
            <PagesSEOManager />
          </motion.div>
        )}

        {activeTab === "creator" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Creator Channel</h1>
              <p className="text-gray-400">Dein KI-Berater für Kundenanalysen, Sales-Strategien und Content-Ideen.</p>
            </div>
            <CreatorChannel />
          </motion.div>
        )}

        {activeTab === "seo" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-display font-bold mb-2">Performance & SEO</h1>
                <p className="text-gray-400">Analysiere Besucherstatistiken, Suchmaschinen-Rankings und optimiere den Seitenspeed live.</p>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://analytics.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <BarChart3 size={18} />
                  Analytics öffnen
                </a>
                <a 
                  href="https://search.google.com/search-console" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer hover:scale-105"
                >
                  <TrendingUp size={18} />
                  Search Console
                </a>
              </div>
            </div>

            {/* Sub Tabs Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
              <button
                type="button"
                onClick={() => setSeoSubTab('analytics')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  seoSubTab === 'analytics' ? 'bg-brand-accent text-brand-bg shadow-lg hover:brightness-110' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <BarChart3 size={16} />
                Google Analytics
              </button>
              <button
                type="button"
                onClick={() => setSeoSubTab('search-console')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  seoSubTab === 'search-console' ? 'bg-brand-accent text-brand-bg shadow-lg hover:brightness-110' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <TrendingUp size={16} />
                Search Console
              </button>
              <button
                type="button"
                onClick={() => setSeoSubTab('pagespeed')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  seoSubTab === 'pagespeed' ? 'bg-brand-accent text-brand-bg shadow-lg hover:brightness-110' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Zap size={16} />
                PageSpeed Insights
              </button>
              <button
                type="button"
                onClick={() => setSeoSubTab('config')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  seoSubTab === 'config' ? 'bg-brand-accent text-brand-bg shadow-lg hover:brightness-110' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings size={16} />
                API Verbindung
              </button>
            </div>

            {/* TAB CONTENTS */}

            {/* 1. GOOGLE ANALYTICS */}
            {seoSubTab === 'analytics' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {analyticsLoading ? (
                  <div className="py-20 flex flex-col justify-center items-center bg-white/5 border border-white/10 rounded-2xl">
                    <Loader2 size={32} className="animate-spin text-brand-accent mb-3" />
                    <span className="text-gray-400 text-sm">Lade Analytics Daten...</span>
                  </div>
                ) : analyticsData ? (
                  <>
                    {/* Status Banner for Mock Mode */}
                    {!analyticsData.isConnected && (
                      <div className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle size={20} className="text-brand-accent shrink-0" />
                          <div className="text-sm">
                            <span className="font-bold text-white block sm:inline">Mock-Datenmodus aktiv:</span>
                            <span className="text-gray-400 ml-1">Es wurden keine Google API Anmeldedaten im Backend gefunden. Das Dashboard zeigt Simulationsdaten.</span>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setSeoSubTab('config')} 
                          className="text-xs font-bold text-brand-accent hover:underline shrink-0"
                        >
                          Verbindung einrichten
                        </button>
                      </div>
                    )}

                    {/* GA Metrics Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Nutzer (30 Tage)</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {analyticsData.activeUsers.toLocaleString('de-DE')}
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Seitenaufrufe</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {analyticsData.totalPageViews.toLocaleString('de-DE')}
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Absprungrate</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {analyticsData.bounceRate}%
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Sitzungsdauer (Ø)</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {Math.floor(analyticsData.avgSessionDuration / 60)}m {analyticsData.avgSessionDuration % 60}s
                        </span>
                      </div>
                    </div>

                    {/* Chart & Distribution Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      {/* Line Chart */}
                      <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-lg font-bold text-white">Besuchertrend</h3>
                            <p className="text-xs text-gray-400">Vergleich von Nutzern und Seitenaufrufen</p>
                          </div>
                          <div className="flex gap-4 text-xs font-bold">
                            <span className="flex items-center gap-1.5 text-brand-accent">
                              <span className="w-3 h-3 rounded-full bg-brand-accent" />
                              Nutzer
                            </span>
                            <span className="flex items-center gap-1.5 text-sky-400">
                              <span className="w-3 h-3 rounded-full bg-sky-400" />
                              Seitenaufrufe
                            </span>
                          </div>
                        </div>

                        {/* Svg Chart */}
                        <div className="w-full">
                          {(() => {
                            const { linePath: visLine, areaPath: visArea, points: visPoints } = getSvgCoordinates(analyticsData.history, 'visitors', 600, 180);
                            const { linePath: pvLine, areaPath: pvArea } = getSvgCoordinates(analyticsData.history, 'pageviews', 600, 180);

                            return (
                              <svg viewBox="0 0 600 180" className="w-full h-48 overflow-visible">
                                <defs>
                                  <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#C8A46B" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#C8A46B" stopOpacity="0.0" />
                                  </linearGradient>
                                  <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                <line x1="0" y1="0" x2="600" y2="0" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                                <line x1="0" y1="45" x2="600" y2="45" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                                <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                                <line x1="0" y1="135" x2="600" y2="135" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                                <line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.08)" />

                                {pvArea && <path d={pvArea} fill="url(#pvGrad)" />}
                                {visArea && <path d={visArea} fill="url(#visGrad)" />}

                                {pvLine && <path d={pvLine} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />}
                                {visLine && <path d={visLine} fill="none" stroke="#C8A46B" strokeWidth="2.5" strokeLinecap="round" />}
                                
                                {visPoints.length > 0 && (
                                  <circle 
                                    cx={visPoints[visPoints.length - 1].x} 
                                    cy={visPoints[visPoints.length - 1].y} 
                                    r="4" 
                                    fill="#C8A46B" 
                                    stroke="#0E0E0E" 
                                    strokeWidth="1.5" 
                                  />
                                )}
                              </svg>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Device & Traffic Sources Distribution */}
                      <div className="space-y-6">
                        {/* Traffic Sources */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Traffic-Kanäle</h3>
                          <div className="space-y-3">
                            {analyticsData.trafficSources.map((source: any, idx: number) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-xs font-bold text-gray-400">
                                  <span>{source.name}</span>
                                  <span className="text-white">{source.value}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      idx === 0 ? 'bg-brand-accent' : 
                                      idx === 1 ? 'bg-sky-400' : 
                                      idx === 2 ? 'bg-purple-400' : 'bg-gray-400'
                                    }`} 
                                    style={{ width: `${source.value}%` }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Devices */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Endgeräte</h3>
                          <div className="flex gap-4 items-center">
                            {analyticsData.devices.map((device: any, idx: number) => (
                              <div key={idx} className="flex-1 text-center bg-black/20 border border-white/5 rounded-xl p-3">
                                {device.name === 'Mobile' ? (
                                  <Smartphone size={16} className="mx-auto text-brand-accent mb-1" />
                                ) : device.name === 'Desktop' ? (
                                  <Monitor size={16} className="mx-auto text-sky-400 mb-1" />
                                ) : (
                                  <Globe size={16} className="mx-auto text-purple-400 mb-1" />
                                )}
                                <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">{device.name}</span>
                                <span className="text-sm text-white font-bold">{device.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Pages List */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                      <h3 className="text-base font-bold text-white mb-4">Meistbesuchte Seiten</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 text-gray-400 uppercase tracking-widest text-[10px]">
                              <th className="pb-3 font-bold">Pfad (URL Path)</th>
                              <th className="pb-3 text-right font-bold w-32">Aufrufe (Views)</th>
                              <th className="pb-3 text-right font-bold w-48">Anteil</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {analyticsData.topPages.map((page: any, idx: number) => {
                              const pct = ((page.views / analyticsData.totalPageViews) * 100).toFixed(1);
                              return (
                                <tr key={idx} className="hover:bg-white/[0.02]">
                                  <td className="py-3.5 font-mono text-gray-300 font-light truncate max-w-md">{page.path}</td>
                                  <td className="py-3.5 text-right text-white font-bold">{page.views.toLocaleString('de-DE')}</td>
                                  <td className="py-3.5 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                      <span className="text-gray-400 font-bold text-[10px]">{pct}%</span>
                                      <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="bg-brand-accent h-full rounded-full" style={{ width: `${pct}%` }} />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-gray-400 italic">Fehler beim Laden der Analytics Daten.</div>
                )}
              </motion.div>
            )}

            {/* 2. SEARCH CONSOLE */}
            {seoSubTab === 'search-console' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {gscLoading ? (
                  <div className="py-20 flex flex-col justify-center items-center bg-white/5 border border-white/10 rounded-2xl">
                    <Loader2 size={32} className="animate-spin text-brand-accent mb-3" />
                    <span className="text-gray-400 text-sm">Lade Search Console Rankings...</span>
                  </div>
                ) : gscData ? (
                  <>
                    {/* Status Banner for Mock Mode */}
                    {!gscData.isConnected && (
                      <div className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle size={20} className="text-brand-accent shrink-0" />
                          <div className="text-sm">
                            <span className="font-bold text-white block sm:inline">Mock-Datenmodus aktiv:</span>
                            <span className="text-gray-400 ml-1">Keine Google Search Console Verbindung eingerichtet. Die Daten zeigen Simulationsdaten.</span>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setSeoSubTab('config')} 
                          className="text-xs font-bold text-brand-accent hover:underline shrink-0"
                        >
                          Verbindung einrichten
                        </button>
                      </div>
                    )}

                    {/* GSC Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Klicks (30 Tage)</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {gscData.totalClicks.toLocaleString('de-DE')}
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Impressionen</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {gscData.totalImpressions.toLocaleString('de-DE')}
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Ø Klickrate (CTR)</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {gscData.avgCtr}%
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-all group">
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Ø Position</span>
                        <span className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                          {gscData.avgPosition}
                        </span>
                      </div>
                    </div>

                    {/* Click & Impression Chart */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-white">Google Sichtbarkeit</h3>
                          <p className="text-xs text-gray-400">Verlauf der organischen Suchklicks und Impressionen</p>
                        </div>
                        <div className="flex gap-4 text-xs font-bold">
                          <span className="flex items-center gap-1.5 text-brand-accent">
                            <span className="w-3 h-3 rounded-full bg-brand-accent" />
                            Suchklicks
                          </span>
                          <span className="flex items-center gap-1.5 text-purple-400">
                            <span className="w-3 h-3 rounded-full bg-purple-400" />
                            Impressionen
                          </span>
                        </div>
                      </div>

                      {/* Svg Chart */}
                      <div className="w-full">
                        {(() => {
                          const { linePath: clickLine, areaPath: clickArea, points: clickPoints } = getSvgCoordinates(gscData.history, 'clicks', 600, 180);
                          const { linePath: impLine, areaPath: impArea } = getSvgCoordinates(gscData.history, 'impressions', 600, 180);

                          return (
                            <svg viewBox="0 0 600 180" className="w-full h-48 overflow-visible">
                              <defs>
                                <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#C8A46B" stopOpacity="0.25" />
                                  <stop offset="100%" stopColor="#C8A46B" stopOpacity="0.0" />
                                </linearGradient>
                                <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.1" />
                                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              <line x1="0" y1="0" x2="600" y2="0" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                              <line x1="0" y1="45" x2="600" y2="45" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                              <line x1="0" y1="135" x2="600" y2="135" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                              <line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.08)" />

                              {impArea && <path d={impArea} fill="url(#impGrad)" />}
                              {clickArea && <path d={clickArea} fill="url(#clickGrad)" />}

                              {impLine && <path d={impLine} fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />}
                              {clickLine && <path d={clickLine} fill="none" stroke="#C8A46B" strokeWidth="2.5" strokeLinecap="round" />}
                              
                              {clickPoints.length > 0 && (
                                <circle 
                                  cx={clickPoints[clickPoints.length - 1].x} 
                                  cy={clickPoints[clickPoints.length - 1].y} 
                                  r="4" 
                                  fill="#C8A46B" 
                                  stroke="#0E0E0E" 
                                  strokeWidth="1.5" 
                                />
                              )}
                            </svg>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Keywords/Queries Table */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                      <h3 className="text-base font-bold text-white mb-4">Top Suchanfragen & Rankings</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 text-gray-400 uppercase tracking-widest text-[10px] pb-3">
                              <th className="pb-3 font-bold">Suchbegriff</th>
                              <th className="pb-3 text-right font-bold w-24">Klicks</th>
                              <th className="pb-3 text-right font-bold w-28">Impressionen</th>
                              <th className="pb-3 text-right font-bold w-24">CTR</th>
                              <th className="pb-3 text-right font-bold w-24">Position</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {gscData.keywords.map((kw: any, idx: number) => (
                              <tr key={idx} className="hover:bg-white/[0.02]">
                                <td className="py-3.5 text-white font-bold">{kw.query}</td>
                                <td className="py-3.5 text-right font-mono text-gray-300">{kw.clicks}</td>
                                <td className="py-3.5 text-right font-mono text-gray-300">{kw.impressions.toLocaleString('de-DE')}</td>
                                <td className="py-3.5 text-right font-mono text-gray-300">{kw.ctr}%</td>
                                <td className="py-3.5 text-right">
                                  <span className={`inline-block px-2 py-0.5 rounded font-mono text-xs font-bold ${
                                    kw.position <= 1.5 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    kw.position <= 3 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  }`}>
                                    #{kw.position}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Sitemap & Robots.txt Links (Original function preserved) */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                      <h3 className="text-base font-bold text-white mb-2">Robots.txt & Sitemap</h3>
                      <p className="text-xs text-gray-400 mb-4">Das CMS sowie AGB und Impressum sind mit "noindex, nofollow" versehen und werden von Suchmaschinen ignoriert. Alle anderen Artikel werden automatisch in der Sitemap gelistet.</p>
                      <div className="flex gap-2">
                        <a 
                          href="/sitemap.xml" 
                          target="_blank"
                          className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-xs transition-all border border-white/10"
                        >
                          Sitemap.xml ansehen
                        </a>
                        <a 
                          href="/robots.txt" 
                          target="_blank"
                          className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-xs transition-all border border-white/10"
                        >
                          Robots.txt ansehen
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-gray-400 italic">Fehler beim Laden der Search Console Rankings.</div>
                )}
              </motion.div>
            )}

            {/* 3. PAGESPEED INSIGHTS */}
            {seoSubTab === 'pagespeed' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Pagespeed Controller Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-3xl">
                  <div>
                    <h3 className="text-lg font-bold text-white">Lighthouse Performance Audit</h3>
                    <p className="text-xs text-gray-400">Analysiert das Frontend auf Ladezeit und Barrierefreiheit.</p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Strategy Switch */}
                    <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 text-xs">
                      <button
                        type="button"
                        onClick={() => handlePagespeedStrategyChange('mobile')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          pagespeedStrategy === 'mobile' ? 'bg-brand-accent text-brand-bg shadow' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Smartphone size={14} />
                        Mobil
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePagespeedStrategyChange('desktop')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          pagespeedStrategy === 'desktop' ? 'bg-brand-accent text-brand-bg shadow' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Monitor size={14} />
                        Desktop
                      </button>
                    </div>

                    {/* Run Test Button */}
                    <button
                      type="button"
                      onClick={() => fetchPagespeed(pagespeedStrategy, true)}
                      disabled={pagespeedRunning}
                      className="flex items-center justify-center gap-2 bg-brand-accent text-brand-bg hover:brightness-110 disabled:opacity-50 px-4 py-2.5 rounded-xl text-xs font-bold font-display cursor-pointer transition-all hover:scale-102"
                    >
                      <RefreshCw size={14} className={pagespeedRunning ? 'animate-spin' : ''} />
                      {pagespeedRunning ? 'Analysiere...' : 'Test starten'}
                    </button>
                  </div>
                </div>

                {pagespeedLoading || pagespeedRunning ? (
                  /* Loading Skeletons */
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map(idx => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center h-36 animate-pulse">
                          <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-white/10 animate-spin" />
                          <div className="h-3 w-16 bg-white/10 rounded mt-4" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-52 animate-pulse" />
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-52 animate-pulse" />
                    </div>
                  </div>
                ) : pagespeedData ? (
                  <>
                    {/* Status live/cache */}
                    {!pagespeedData.isLive && (
                      <div className="p-3 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl flex items-center gap-3 text-xs text-gray-400">
                        <AlertCircle size={16} className="text-brand-accent" />
                        <span>Ergebnisse aus dem Cache geladen (Getestet am {new Date(pagespeedData.testedAt).toLocaleDateString('de-DE')} um {new Date(pagespeedData.testedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}). Starten Sie einen neuen Test für Live-Ergebnisse.</span>
                      </div>
                    )}

                    {/* Gauges Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <PageSpeedGauge score={pagespeedData.scores.performance} label="Performance" />
                      <PageSpeedGauge score={pagespeedData.scores.accessibility} label="A11y (Barrierefreiheit)" />
                      <PageSpeedGauge score={pagespeedData.scores.bestPractices} label="Best Practices" />
                      <PageSpeedGauge score={pagespeedData.scores.seo} label="SEO" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Core Web Vitals */}
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Nutzererfahrung (Core Web Vitals)</h3>
                          <p className="text-[10px] text-gray-500">Geschwindigkeitsmetriken gemessen über die Lighthouse Engine.</p>
                        </div>
                        
                        <div className="divide-y divide-white/5 text-xs">
                          {/* FCP */}
                          <div className="flex justify-between items-center py-2.5">
                            <div className="space-y-0.5">
                              <span className="text-white font-bold block">First Contentful Paint (FCP)</span>
                              <span className="text-[10px] text-gray-500 block">Zeitpunkt des ersten Bild/Text-Renders</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-white font-semibold">{pagespeedData.metrics.fcp}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Gut</span>
                            </div>
                          </div>
                          
                          {/* LCP */}
                          <div className="flex justify-between items-center py-2.5">
                            <div className="space-y-0.5">
                              <span className="text-white font-bold block">Largest Contentful Paint (LCP)</span>
                              <span className="text-[10px] text-gray-500 block">Ladezeit des Hauptinhalts (Hero-Bild/H1)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-white font-semibold">{pagespeedData.metrics.lcp}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                parseFloat(pagespeedData.metrics.lcp) <= 2.5 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>{parseFloat(pagespeedData.metrics.lcp) <= 2.5 ? 'Gut' : 'Optimierbar'}</span>
                            </div>
                          </div>
                          
                          {/* TBT */}
                          <div className="flex justify-between items-center py-2.5">
                            <div className="space-y-0.5">
                              <span className="text-white font-bold block">Total Blocking Time (TBT)</span>
                              <span className="text-[10px] text-gray-500 block">Gesamtzeit der JS-Verzögerung vor Interaktion</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-white font-semibold">{pagespeedData.metrics.tbt}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Gut</span>
                            </div>
                          </div>
                          
                          {/* CLS */}
                          <div className="flex justify-between items-center py-2.5">
                            <div className="space-y-0.5">
                              <span className="text-white font-bold block">Cumulative Layout Shift (CLS)</span>
                              <span className="text-[10px] text-gray-500 block">Visuelle Stabilität während des Ladevorgangs</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-white font-semibold">{pagespeedData.metrics.cls}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Gut</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic opportunities */}
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Optimierungspotenziale</h3>
                          <p className="text-[10px] text-gray-500">Diese Maßnahmen verkürzen die Ladezeit des Frontends.</p>
                        </div>
                        
                        <div className="space-y-3.5 overflow-y-auto max-h-[220px] pr-2">
                          {pagespeedData.opportunities.map((opp: any, idx: number) => (
                            <div key={idx} className="bg-black/20 border border-white/5 p-3 rounded-xl flex justify-between items-start gap-4">
                              <div className="space-y-1">
                                <span className="text-xs font-bold text-white block leading-snug">{opp.title}</span>
                                <span className="text-[10px] text-gray-400 block leading-relaxed">{opp.description}</span>
                              </div>
                              <span className="text-xs font-mono font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded shrink-0">
                                -{opp.savings}
                              </span>
                            </div>
                          ))}
                          {pagespeedData.opportunities.length === 0 && (
                            <div className="text-center text-xs text-gray-500 py-10 flex flex-col justify-center items-center gap-2">
                              <CheckCircle2 size={24} className="text-emerald-400" />
                              <span>Hervorragend! Keine nennenswerten Einsparungspotenziale gefunden.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-gray-400 italic">Fehler beim Laden des PageSpeed Berichts.</div>
                )}
              </motion.div>
            )}

            {/* 4. CONFIGURATION */}
            {seoSubTab === 'config' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Google API-Verbindung einrichten</h3>
                  <p className="text-sm text-gray-400 mt-1">Um Echtzeitdaten aus der Google Search Console und Google Analytics im Dashboard anzuzeigen, müssen entsprechende Umgebungsvariablen konfiguriert werden.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                    <h4 className="text-xs uppercase font-bold text-brand-accent tracking-wider">Schritt-für-Schritt Anleitung</h4>
                    <ol className="list-decimal pl-4 text-xs text-gray-300 space-y-2">
                      <li>Erstellen Sie ein Google Cloud-Projekt und aktivieren Sie die <strong>Google Analytics Data API</strong> sowie die <strong>Google Search Console API</strong>.</li>
                      <li>Erstellen Sie ein Dienstkonto (Service Account) und generieren Sie einen privaten Schlüssel im JSON-Format.</li>
                      <li>Fügen Sie das Dienstkonto in Ihrer Google Search Console als Nutzer hinzu (Vollzugriff).</li>
                      <li>Fügen Sie das Dienstkonto in Ihrer Google Analytics 4 Property als Analyst/Betrachter hinzu.</li>
                      <li>Tragen Sie die Umgebungsvariablen in Ihrem Vercel-Projekt unter <strong>Settings &gt; Environment Variables</strong> ein.</li>
                    </ol>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold text-white tracking-wider">Erforderliche Umgebungsvariablen</h4>
                    <div className="overflow-x-auto border border-white/10 rounded-2xl">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-black/35 text-gray-400 border-b border-white/10 font-bold uppercase tracking-wider text-[10px]">
                            <th className="p-3">Variable Name</th>
                            <th className="p-3">Beschreibung</th>
                            <th className="p-3 w-32">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                          <tr>
                            <td className="p-3 text-white font-bold">GOOGLE_SERVICE_ACCOUNT_EMAIL</td>
                            <td className="p-3 text-gray-400 font-sans font-light">E-Mail-Adresse des Google Dienstkontos (z. B. `my-sa@project.iam.gserviceaccount.com`).</td>
                            <td className="p-3">
                              {analyticsData?.isConnected ? (
                                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">VERBUNDEN</span>
                              ) : (
                                <span className="text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold">INAKTIV (MOCK)</span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 text-white font-bold">GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</td>
                            <td className="p-3 text-gray-400 font-sans font-light">Der private RSA-Schlüssel aus der Dienstkonto-JSON-Datei (inklusive `\n` Zeilenumbrüche).</td>
                            <td className="p-3">
                              {analyticsData?.isConnected ? (
                                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">VERBUNDEN</span>
                              ) : (
                                <span className="text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold">INAKTIV (MOCK)</span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 text-white font-bold">GA4_PROPERTY_ID</td>
                            <td className="p-3 text-gray-400 font-sans font-light">Die ID der Google Analytics 4 Property (nur Zahlen, z. B. `294719481`). Zu finden in den GA4 Einstellungen.</td>
                            <td className="p-3">
                              {analyticsData?.isConnected ? (
                                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">VERBUNDEN</span>
                              ) : (
                                <span className="text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold">INAKTIV (MOCK)</span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 text-white font-bold">SITE_URL</td>
                            <td className="p-3 text-gray-400 font-sans font-light">Die verifizierte URL der Website in der Search Console (z. B. `https://www.rezaivision.de/` oder `sc-domain:rezaivision.de`).</td>
                            <td className="p-3">
                              {gscData?.isConnected ? (
                                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">VERBUNDEN</span>
                              ) : (
                                <span className="text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold">INAKTIV (MOCK)</span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
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
              className="relative w-full max-w-[96vw] lg:max-w-[1400px] max-h-[92vh] bg-brand-darker border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/20">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {editingPost ? "Beitrag bearbeiten" : "Neuen Beitrag erstellen"}
                  </h3>
                </div>

                {/* Desktop Tabs */}
                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("split")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewMode === "split" ? "bg-brand-accent text-brand-bg shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Columns size={14} />
                    Split-Screen
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("edit")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewMode === "edit" ? "bg-brand-accent text-brand-bg shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Edit size={14} />
                    Nur Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("preview")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewMode === "preview" ? "bg-brand-accent text-brand-bg shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Eye size={14} />
                    Nur Vorschau
                  </button>
                </div>

                {/* Mobile Tab Toggle */}
                <div className="flex lg:hidden items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMobileTab("edit")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      mobileTab === "edit" ? "bg-brand-accent text-brand-bg shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Edit size={14} />
                    Bearbeiten
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileTab("preview")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      mobileTab === "preview" ? "bg-brand-accent text-brand-bg shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Eye size={14} />
                    Vorschau
                  </button>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer self-end sm:self-auto"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form & Split-Screen Container */}
              <form onSubmit={handleSave} className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                  {/* Left Column: Form Editor */}
                  <div className={`overflow-y-auto p-6 space-y-6 border-r border-white/5 ${
                    previewMode === 'preview' ? 'hidden' : 'block'
                  } ${
                    mobileTab === 'preview' ? 'hidden lg:block' : 'block'
                  }`}>
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
                  </div>

                  {/* Right Column: Visual Preview */}
                  <div className={`overflow-y-auto p-6 bg-brand-bg text-brand-text select-none ${
                    previewMode === 'edit' ? 'hidden' : 'block'
                  } ${
                    mobileTab === 'edit' ? 'hidden lg:block' : 'block'
                  }`}>
                    <div className="max-w-2xl mx-auto py-4">
                      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4 text-center border-b border-white/5 pb-2">
                        Live Vorschau
                      </div>
                      
                      {/* Hero Section */}
                      <header className="relative pt-12 pb-10 overflow-hidden border border-white/5 rounded-3xl mb-8 bg-black/40">
                        <div className="absolute inset-0 z-0">
                          {formImage ? (
                            <img 
                              loading="lazy" 
                              src={formImage} 
                              alt={formTitle}
                              className="w-full h-full object-cover opacity-25 blur-[2px] scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-900 opacity-30" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg/95 to-brand-bg" />
                        </div>

                        <div className="relative z-10 text-center px-4">
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[8px] font-bold uppercase tracking-[0.2em]">
                              {formCategory === 'corporate' ? 'Business Excellence' : 'Emotional Impact'}
                            </span>
                          </div>

                          <h1 className="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight text-white font-bold">
                            {formTitle || "Unbenannter Artikel"}
                          </h1>

                          <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">
                            <span>{formDate || "Kein Datum"}</span>
                            <span>•</span>
                            <span>{formReadTime || "5 min Lesezeit"}</span>
                          </div>
                        </div>
                      </header>

                      {/* Layout-dependent header showcase */}
                      {formLayout === 'case-study' && (
                        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white/[0.02] border border-white/10 rounded-2xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/5 via-transparent to-transparent pointer-events-none" />
                          <div className="border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:pr-4">
                            <span className="block text-[8px] text-gray-500 uppercase tracking-widest font-bold mb-1">Kunde</span>
                            <span className="text-white font-display font-bold text-sm truncate block">{formClientName || 'Projekt'}</span>
                          </div>
                          
                          <div className="border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:px-4">
                            <span className="block text-[8px] text-gray-500 uppercase tracking-widest font-bold mb-1">Laufzeit</span>
                            <span className="text-white font-display font-bold text-sm truncate block">{formProjectDuration || 'Laufzeit'}</span>
                          </div>

                          <div className="border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:px-4">
                            <span className="block text-xl font-display font-bold text-brand-accent mb-0.5">{formKpiValue1 || '-'}</span>
                            <span className="text-[9px] text-gray-400 font-light leading-snug block">{formKpiTitle1 || 'KPI 1'}</span>
                          </div>

                          <div className="md:px-4">
                            <span className="block text-xl font-display font-bold text-brand-accent mb-0.5">{formKpiValue2 || '-'}</span>
                            <span className="text-[9px] text-gray-400 font-light leading-snug block">{formKpiTitle2 || 'KPI 2'}</span>
                          </div>
                        </div>
                      )}

                      {formLayout === 'gallery' && (formGalleryImage1 || formGalleryImage2 || formGalleryImage3 || formGalleryImage4) && (
                        <div className="mb-8 grid grid-cols-2 gap-3">
                          {[formGalleryImage1, formGalleryImage2, formGalleryImage3, formGalleryImage4].filter(u => u.trim() !== "").map((imgUrl, idx) => (
                            <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg bg-white/5">
                              <img 
                                src={imgUrl} 
                                alt={`Vorschau ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {formLayout === 'video' && formVideoUrl && (
                        <div className="mb-8 aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-xl relative">
                          <iframe 
                            src={getEmbedUrl(formVideoUrl)}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Video Showcase"
                          />
                        </div>
                      )}

                      {/* Excerpt */}
                      {formExcerpt && (
                        <p className="text-gray-400 text-sm italic mb-6 border-l-2 border-brand-accent/50 pl-4 py-1 leading-relaxed">
                          {formExcerpt}
                        </p>
                      )}

                      {/* Main Article Content */}
                      <article className="prose prose-invert prose-brand max-w-none">
                        {renderPreviewContent(formContent)}
                      </article>

                      {/* EEAT Block Mockups */}
                      <div className="mt-12 pt-8 border-t border-white/5 opacity-60">
                        <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                            <img 
                              src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775656862/Parsha_Gru%CC%88nder_Rezai_Vision_Kaiserslautern_pubjom.webp" 
                              alt="Parsha Rezai" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-white">Parsha Rezai</div>
                            <div className="text-[10px] text-brand-accent uppercase tracking-wider">Gründer & Lead Videographer</div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Mockup */}
                      <div className="mt-8 p-6 bg-white/[0.01] border border-white/5 rounded-2xl text-center">
                        <h4 className="text-sm font-bold text-white mb-2">Bereit für den nächsten Schritt?</h4>
                        <span className="inline-block bg-brand-accent text-brand-bg text-xs font-bold px-6 py-2.5 rounded-full cursor-default mt-2">
                          {formCtaLabel || 'Kostenlose Erstberatung'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
                  <div className="text-xs text-gray-500 font-mono">
                    Layout: <span className="text-brand-accent uppercase font-bold">{formLayout}</span>
                  </div>
                  <div className="flex gap-3">
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
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
