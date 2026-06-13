import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Play, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface LandingPageConfig {
  id: string;
  slug: string;
  targetAudience: string;
  videoUrl?: string;
  content: {
    heroHeadline: string;
    heroSubheadline: string;
    painPoints: string[];
    offerHeadline: string;
    offerText: string;
    ctaText: string;
  };
}

export default function LandingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<LandingPageConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'landingpages'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setPageData({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as LandingPageConfig);
        } else {
          // Fallback to 404
          navigate('/404');
        }
      } catch (error) {
        console.error("Error fetching landing page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
      </div>
    );
  }

  if (!pageData) return null;

  const { content, videoUrl } = pageData;

  // Simple video embed helper
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    if (url.includes('vimeo.com/')) {
      return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    }
    return url;
  };

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <div className="min-h-screen bg-brand-bg text-white font-sans selection:bg-brand-accent/30 selection:text-white">
      <Helmet>
        <title>{content.heroHeadline} | Rezai Vision</title>
        <meta name="description" content={content.heroSubheadline} />
        <meta name="robots" content="noindex, nofollow" /> {/* Landingpages shouldn't compete with main SEO */}
      </Helmet>

      {/* Minimalistic Header */}
      <header className="absolute top-0 w-full py-6 px-6 md:px-12 z-50 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter hover:text-brand-accent transition-colors">
          REZAI<span className="text-brand-accent">.</span>VISION
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-6">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] -z-10 opacity-50" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-block bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full text-brand-accent text-sm font-bold tracking-wide">
              Spezialangebot für {pageData.targetAudience}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              {content.heroHeadline}
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {content.heroSubheadline}
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/kontakt"
                className="bg-brand-accent text-brand-bg px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
              >
                {content.ctaText}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Video Placeholder or Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-accent/20 group"
          >
            {embedUrl ? (
              <iframe 
                src={embedUrl} 
                className="w-full h-full object-cover"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Video"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-gray-500 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-transparent opacity-50" />
                <Play size={64} className="text-white/20 mb-4 z-10" />
                <p className="z-10 font-medium">Video Platzhalter</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 bg-black/50 border-y border-white/5 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Kommen dir diese Probleme bekannt vor?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.painPoints.map((pain, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-xl font-bold mb-6">
                  {idx + 1}
                </div>
                <p className="text-lg text-gray-200">{pain}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution & Offer Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              {content.offerHeadline}
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {content.offerText}
            </p>

            <div className="pt-12">
              <Link 
                to="/kontakt"
                className="inline-flex bg-brand-accent text-brand-bg px-10 py-5 rounded-xl font-bold text-xl hover:brightness-110 transition-all items-center justify-center gap-3 group shadow-[0_0_40px_-10px_rgba(201,255,104,0.5)]"
              >
                {content.ctaText}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-brand-accent" /> 100% Unverbindliches Erstgespräch
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Rezai Vision. Alle Rechte vorbehalten.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
        </div>
      </footer>
    </div>
  );
}
