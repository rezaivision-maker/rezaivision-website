import { motion } from "motion/react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { SearchX, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-bg overflow-hidden relative text-center">
      <SEO title="404 - Seite nicht gefunden | Rezai Vision" />
      <meta name="robots" content="noindex, nofollow" />

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10"
        >
          <SearchX size={48} className="text-gray-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-brand-accent font-mono text-xl mb-4 font-bold tracking-widest uppercase">
            Fehler 404
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Seite nicht <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">gefunden</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Die von Ihnen gesuchte Seite existiert leider nicht. Möglicherweise wurde sie verschoben, gelöscht oder Sie haben sich bei der URL vertippt.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105"
          >
            Zurück zur Startseite <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
