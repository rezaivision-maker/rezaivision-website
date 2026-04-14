import { useState } from "react";
import { Play } from "lucide-react";

export function ShowreelSection() {
  const [isPlayingShowreel, setIsPlayingShowreel] = useState(false);

  return (
    <section id="showreel" className="py-24 bg-brand-bg border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Showreel
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Ein Einblick in unsere Arbeit und visuelle Handschrift.
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] gold-border-glow">
          {!isPlayingShowreel && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-brand-bg/20 z-10 cursor-pointer group"
              onClick={() => setIsPlayingShowreel(true)}
            >
              <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-brand-bg transform transition-transform group-hover:scale-110">
                <Play size={32} fill="currentColor" />
              </div>
            </div>
          )}
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={`https://player.vimeo.com/video/1181887633?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479${isPlayingShowreel ? '&autoplay=1' : ''}`} 
            title="Showreel" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
