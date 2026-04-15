import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, MessageSquare } from "lucide-react";
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
            className="w-full h-full object-cover opacity-20 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg/90 to-brand-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Link 
              to="/blog" 
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              {post.category === 'corporate' ? 'Business' : 'Emotion'}
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight tracking-tight"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 font-medium uppercase tracking-widest"
          >
            <span className="flex items-center gap-2"><Calendar size={16} className="text-brand-accent" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-brand-accent" /> {post.readTime} Lesezeit</span>
          </motion.div>
        </div>
      </header>

      {/* Content Section */}
      <main className="py-20 px-6 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="prose prose-invert prose-brand max-w-none"
        >
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-3xl font-display font-bold mt-12 mb-6 text-white">{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-2xl font-display font-bold mt-10 mb-4 text-white">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="text-gray-300 ml-4 mb-2">{line.replace('- ', '')}</li>;
            }
            if (line.startsWith('**')) {
              return <p key={i} className="text-lg font-bold text-brand-accent mt-8 mb-4">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="text-gray-300 text-lg leading-relaxed mb-6 font-light">{line}</p>;
          })}
        </motion.div>

        {/* Article CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-white/5 border border-white/10 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent" />
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Interesse geweckt?</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Lassen Sie uns in einem unverbindlichen Gespräch klären, wie wir dieses Thema auch für Ihr Projekt gewinnbringend einsetzen können.
          </p>
          <Button 
            href={post.ctaLink} 
            size="lg" 
            className="px-10 gap-2 shadow-lg shadow-brand-accent/20"
          >
            {post.ctaLabel} <ArrowRight size={18} />
          </Button>
        </motion.div>

        {/* Navigation / Footer of Article */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/blog" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Zurück zum Magazin
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Teilen:</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all border border-white/10"><Facebook size={18} /></button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all border border-white/10"><Twitter size={18} /></button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all border border-white/10"><Share2 size={18} /></button>
            </div>
          </div>
        </div>
      </main>

      {/* Next Article Suggestion (Optional but good) */}
      <section className="bg-brand-darker py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-[0.2em] text-brand-accent font-bold mb-12">Nächster Artikel</h2>
          <Link to="/blog" className="group block text-center">
            <h3 className="text-3xl md:text-5xl font-display font-bold group-hover:text-brand-accent transition-colors duration-500 max-w-2xl mx-auto">
              Mehr Insights in unserem Magazin entdecken <ArrowRight size={32} className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
            </h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
