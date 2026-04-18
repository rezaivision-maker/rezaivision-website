import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowLeft, ArrowRight, Facebook, Twitter, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display font-bold mb-6">Artikel nicht gefunden</h1>
        <p className="text-gray-400 mb-8">Der gesuchte Beitrag existiert leider nicht oder wurde verschoben.</p>
        <Button onClick={() => navigate("/blog")} variant="outline">
          Zurück zum Magazin
        </Button>
      </div>
    );
  }

  // Schema.org Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://rezaivision.de${post.image}`,
    "author": {
      "@type": "Person",
      "name": "Rezai Vision Team",
      "url": "https://rezaivision.de/ueber-uns"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rezai Vision",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rezaivision.de/logo.png"
      }
    },
    "datePublished": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rezaivision.de/blog/${post.slug}`
    }
  };

  // Helper: Render inline markdown (**bold**, normal text)
  const renderInline = (text: string, keyPrefix: string = '') => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, idx) =>
      idx % 2 === 1
        ? <strong key={`${keyPrefix}-${idx}`} className="text-white font-semibold">{part}</strong>
        : <span key={`${keyPrefix}-${idx}`}>{part}</span>
    );
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      // Horizontal Rule
      if (line === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-12 border-white/10" />);
        i++;
        continue;
      }

      // Skip H1 (shown in hero)
      if (line.startsWith('# ') && !line.startsWith('## ')) {
        i++;
        continue;
      }

      // H2
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-3xl md:text-4xl font-display font-bold mt-16 mb-8 text-white">
            {renderInline(line.replace('## ', ''), `h2-${i}`)}
          </h2>
        );
        i++;
        continue;
      }

      // H3
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-2xl font-display font-bold mt-12 mb-6 text-white">
            {renderInline(line.replace('### ', ''), `h3-${i}`)}
          </h3>
        );
        i++;
        continue;
      }

      // Tables
      if (line.startsWith('|')) {
        const tableRows: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableRows.push(lines[i].trim());
          i++;
        }
        const rows = tableRows.filter(r => !r.match(/^\|[\s:]*-+/)); // Skip separator rows
        if (rows.length === 0) continue;
        elements.push(
          <div key={`tbl-${i}`} className="my-10 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.06]">
                  {rows[0].split('|').filter(c => c.trim() !== '').map((cell, idx) => (
                    <th key={idx} className="p-4 text-brand-accent font-bold uppercase text-xs tracking-widest border-b border-white/10">
                      {renderInline(cell.trim(), `th-${i}-${idx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    {row.split('|').filter(c => c.trim() !== '').map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-4 text-gray-300 text-sm">
                        {renderInline(cell.trim(), `td-${i}-${rowIdx}-${cellIdx}`)}
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

      // Unordered Lists (- or *)
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().substring(2));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="space-y-4 my-8 list-none">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-300 text-lg leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 min-w-[6px] rounded-full bg-brand-accent flex-shrink-0" />
                <span>{renderInline(item, `li-${i}-${idx}`)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered Lists (1. 2. 3.)
      if (/^\d+\.\s+/.test(line)) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="space-y-4 my-8 list-none counter-reset-item">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex gap-4 text-gray-300 text-lg leading-relaxed">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent text-sm font-bold">
                  {idx + 1}
                </span>
                <span className="pt-1">{renderInline(item, `oli-${i}-${idx}`)}</span>
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Bold Paragraphs (Answer Box) — starts AND ends with **
      if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <div key={`ab-${i}`} className="my-10 p-6 md:p-8 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed pl-4">
              {line.replace(/^\*\*|\*\*$/g, '')}
            </p>
          </div>
        );
        i++;
        continue;
      }

      // Default Paragraph with inline bold
      if (line !== '') {
        elements.push(
          <p key={`p-${i}`} className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
            {renderInline(line, `p-${i}`)}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg relative">
      <Helmet>
        <title>{post.title} | Rezai Vision Magazin</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://rezaivision.de/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <header className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-20 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg/95 to-brand-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Link 
              to="/blog" 
              className="px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent/20 transition-all"
            >
              {post.category === 'corporate' ? 'Business Excellence' : 'Emotional Impact'}
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-display font-bold mb-10 leading-[1.1] tracking-tighter text-white"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-400 font-bold uppercase tracking-[0.2em]"
          >
            <span className="flex items-center gap-2 text-white/60"><Calendar size={14} className="text-brand-accent" /> {post.date}</span>
            <span className="flex items-center gap-2 text-white/60"><Clock size={14} className="text-brand-accent" /> {post.readTime}</span>
          </motion.div>
        </div>
      </header>

      {/* Content Section */}
      <main className="py-24 px-6 max-w-4xl mx-auto w-full">
        <article className="prose prose-invert prose-brand max-w-none">
          {renderContent(post.content)}
        </article>

        {/* Article CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-10 md:p-16 bg-white/[0.02] border border-white/10 rounded-[2.5rem] text-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] group-hover:bg-brand-accent/20 transition-colors" />
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">Bereit für den nächsten Schritt?</h3>
          <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Lassen Sie uns gemeinsam analysieren, wie wir diese Strategie passgenau für Ihre Marke und Ihre Region umsetzen können.
          </p>
          <Button 
            href={post.ctaLink || '/kontakt'} 
            size="lg" 
            className="px-12 py-8 text-lg rounded-full gap-3 shadow-2xl shadow-brand-accent/30 hover:shadow-brand-accent/50 transition-all font-bold"
          >
            {post.ctaLabel || 'Kostenlose Erstberatung'} <ArrowRight size={22} />
          </Button>
        </motion.div>

        {/* Navigation / Footer of Article */}
        <div className="mt-32 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
          <Link to="/blog" className="flex items-center gap-3 text-gray-400 hover:text-brand-accent transition-all group font-bold uppercase text-xs tracking-widest">
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Magazin Übersicht
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Teilen</span>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all border border-white/10 group"><Facebook size={20} className="group-hover:scale-110 transition-transform" /></button>
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all border border-white/10 group"><Twitter size={20} className="group-hover:scale-110 transition-transform" /></button>
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all border border-white/10 group"><Share2 size={20} className="group-hover:scale-110 transition-transform" /></button>
            </div>
          </div>
        </div>
      </main>

      {/* Suggested Articles */}
      <section className="bg-brand-dark py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-accent font-black mb-6">Discovery</h2>
            <Link to="/blog" className="group">
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white group-hover:text-brand-accent transition-all duration-500">
                Mehr Impulse entdecken
              </h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
