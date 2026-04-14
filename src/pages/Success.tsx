import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, MessageSquare, Briefcase, PlayCircle } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Success() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-bg overflow-hidden relative text-center">
      <Helmet>
        <title>Vielen Dank! Ihre Nachricht ist eingereicht | Rezai Vision & RezaiEmotion</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        <div className="mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-accent/30"
          >
            <CheckCircle2 size={48} className="text-brand-accent" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight"
          >
            Hey, wir haben Ihre <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-400">Nachricht erhalten!</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Vielen Dank für Ihr Vertrauen. Wir schauen uns Ihre Anfrage persönlich an. Denke bitte daran: Gute Ergebnisse brauchen Fokus — daher melden wir uns in Kürze bei Ihnen, um gemeinsam über Ihre Vision zu sprechen.
          </motion.p>
        </div>

        {/* Timeline Section - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-brand-darker/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 w-full max-w-2xl text-left"
        >
          <h2 className="text-2xl font-display font-bold mb-8 text-center sm:text-left">Was passiert jetzt?</h2>
          <div className="space-y-10 relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-white/10 hidden sm:block" />
            
            <div className="relative flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 relative z-10">
                <MessageSquare size={20} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 font-display">Kurzes Erstgespräch</h3>
                <p className="text-sm text-gray-400">Wir sprechen über Ihre Ziele, den Stil und den Rahmen des Projekts.</p>
              </div>
            </div>

            <div className="relative flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 relative z-10">
                <Briefcase size={20} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 font-display">Strukturiertes Konzept</h3>
                <p className="text-sm text-gray-400">Wir entwickeln den Plan für die Umsetzung — strategisch und kreativ.</p>
              </div>
            </div>

            <div className="relative flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 relative z-10">
                <PlayCircle size={20} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 font-display">Die Produktion</h3>
                <p className="text-sm text-gray-400">Wir erwecken Ihre Vision filmisch zum Leben — unkompliziert und auf den Punkt.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            Zurück zur Startseite <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            Zurück zur Startseite <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
