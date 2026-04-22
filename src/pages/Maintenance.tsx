import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-bg overflow-hidden relative text-center">
      <Helmet>
        <title>503 - Wartungsarbeiten | Rezai Vision</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-24 h-24 flex items-center justify-center mx-auto mb-8 border border-blue-500/30 bg-blue-500/10 rounded-full"
        >
          <Wrench size={48} className="text-blue-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-blue-400 font-mono text-xl mb-4 font-bold tracking-widest uppercase">
            Status 503
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Wir führen gerade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Wartungsarbeiten</span>
            <br /> durch.
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Um Ihnen auch weiterhin die beste Qualität zu bieten, aktualisieren wir aktuell unser System. Wir sind in Kürze wieder für Sie da!
        </motion.p>
      </div>
    </div>
  );
}
