import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Filter } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { useState } from "react";

export default function Blog() {
  const [filter, setFilter] = useState<'all' | 'corporate' | 'emotion'>('all');

  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Magazin | Rezai Vision & RezaiEmotion - Insights & SEO Tipps</title>
        <meta name="description" content="Erfahren Sie mehr über Videoproduktion, Recruiting-Videos und Hochzeitsfilme in unserem Magazin. Experten-Tipps für Ihren Erfolg." />
      </Helmet>

      {/* Header */}
      <div className="mb-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-8">
            Wissen & Inspiration
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 italic">
            Das Magazin
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
            Hintergrundberichte, Experten-Tipps und Strategien für Ihre filmische Präsenz. Von Recruiting-Hacks bis hin zu emotionalem Storytelling.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-16 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 mr-4">
            <Filter size={18} />
            <span className="text-sm font-medium">Filtern:</span>
          </div>
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${
              filter === 'all' 
                ? "bg-brand-accent border-brand-accent text-brand-bg" 
                : "border-white/10 text-gray-400 hover:border-white/30"
            }`}
          >
            Alle
          </button>
          <button 
            onClick={() => setFilter('corporate')}
            className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${
              filter === 'corporate' 
                ? "bg-brand-accent border-brand-accent text-brand-bg" 
                : "border-white/10 text-gray-400 hover:border-white/30"
            }`}
          >
            Business (Vision)
          </button>
          <button 
            onClick={() => setFilter('emotion')}
            className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${
              filter === 'emotion' 
                ? "bg-brand-accent border-brand-accent text-brand-bg" 
                : "border-white/10 text-gray-400 hover:border-white/30"
            }`}
          >
            Emotion
          </button>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-md border ${
                      post.category === 'corporate' 
                        ? "bg-brand-accent/20 border-brand-accent/30 text-brand-accent" 
                        : "bg-purple-500/20 border-purple-500/30 text-purple-400"
                    }`}>
                      {post.category === 'corporate' ? 'Business' : 'Emotion'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
                </div>

                <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-accent transition-colors duration-300 leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-brand-accent font-bold text-sm tracking-widest uppercase group-hover:gap-4 transition-all duration-300">
                  Weiterlesen <ArrowRight size={16} />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-400 italic">Keine Artikel in dieser Kategorie gefunden.</p>
          </div>
        )}
      </div>

      {/* Newsletter / CTA Section */}
      <section className="mt-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <div className="bg-brand-darker border border-white/5 rounded-[2rem] p-8 md:p-16 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Sie haben ein konkretes <br />Projekt im Kopf?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Lassen Sie uns gemeinsam über Ihre Vision sprechen und wie wir sie filmisch umsetzen können.
          </p>
          <Link 
            to="/kontakt" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-bg rounded-full font-bold hover:brightness-110 transition-all hover:scale-105"
          >
            Kostenloses Erstgespräch buchen <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
