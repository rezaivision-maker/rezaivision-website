import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { aestheticInkSlides } from "@/data/homeData";

export function CasesSection() {
  const [isPlayingLull, setIsPlayingLull] = useState(false);
  const [currentAestheticInkSlide, setCurrentAestheticInkSlide] = useState(0);

  const nextAestheticInkSlide = () => setCurrentAestheticInkSlide((prev) => (prev + 1) % aestheticInkSlides.length);
  const prevAestheticInkSlide = () => setCurrentAestheticInkSlide((prev) => (prev - 1 + aestheticInkSlides.length) % aestheticInkSlides.length);

  return (
    <section className="py-24 bg-brand-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ausgewählte Projekte
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Einblicke in ausgewählte Arbeiten aus Imagefilm, Recruiting, Social Content und Videoads.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {/* Featured Case: Schlossgut Lüll */}
          <div className="flex flex-col gap-4">
            {/* Obere Tags - Placed above the grid */}
            <div className="flex flex-wrap gap-3 px-2">
              <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Imagefilm</span>
              <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Markenauftritt</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-8 lg:gap-12">
              {/* Left Column: Text Frame & Video */}
              <div className="flex flex-col gap-8">
                
                {/* Text Frame */}
                <div className="bg-brand-darker/40 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 gold-border-glow">
                  {/* Titel */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gold-text-gradient tracking-tight">Schlossgut Lüll</h3>
                  
                  {/* Content Block */}
                  <div className="space-y-4">
                    <p className="text-gray-300 text-xl md:text-2xl font-light">
                      Imagefilm-Serie für das Weingut Schlossgut Lüll.
                    </p>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                      Gezeigt werden Ort, Atmosphäre, Handwerk und die visuelle Identität des Projekts.
                    </p>
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">
                      Für einen emotionalen und stimmigen Markenauftritt.
                    </p>
                  </div>

                  {/* Untere Tags */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Imagefilm</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Marke</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Atmosphäre</span>
                  </div>
                </div>

                {/* Main Video */}
                <div className="relative rounded-3xl overflow-hidden aspect-video bg-black shadow-2xl gold-border-glow group">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://player.vimeo.com/video/1180528605?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479${isPlayingLull ? '&autoplay=1' : ''}`} 
                    title="Schlossgut Lüll - Imagefilm" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                  {!isPlayingLull && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      onClick={() => setIsPlayingLull(true)}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Column: 3 Stills */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="relative rounded-3xl overflow-hidden aspect-video bg-brand-darker gold-border-glow">
                  <img 
                    src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775735612/lu%CC%88ll1_bekioh.webp" 
                    alt="Imagefilm Schlossgut Lüll Weingut Rheinhessen — Rezai Vision Videoproduktion" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-video bg-brand-darker gold-border-glow">
                  <img 
                    src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775735607/Lu%CC%88ll_2_tjbakc.webp" 
                    alt="Weingut Atmosphäre Schlossgut Lüll — Unternehmensfilm Kaiserslautern" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-video bg-brand-darker gold-border-glow">
                  <img 
                    src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775735609/lu%CC%88ll3_uxkzzl.webp" 
                    alt="Weinberg Landschaft Schlossgut Lüll — Imagefilm Produktion Pfalz" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>
          
          {/* Aesthetic Ink */}
          <div className="flex flex-col gap-4">
            {/* Obere Tags */}
            <div className="flex flex-wrap gap-3 px-2">
              <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Video Ads</span>
              <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Social Content</span>
            </div>

            {/* Text Frame */}
            <div className="bg-brand-darker/40 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 gold-border-glow">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text-gradient tracking-tight">Aesthetic Ink</h3>
              <p className="text-gray-300 text-xl font-light mb-4">Reels, Social Content und Videoads für Sichtbarkeit und Nachfrage.</p>
              <p className="text-gray-400 text-lg leading-relaxed font-light mb-4">Visuelle Inhalte für Social Media, Werbeanzeigen und digitale Präsenz im Beauty-Bereich.</p>
              <p className="text-gray-500 text-base leading-relaxed font-light mb-8">Starkes Angebot und starke Visuals führten in kurzer Zeit zu hoher Nachfrage.</p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Beauty</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Reels</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Ads</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-8 lg:gap-12 mt-4">
              {/* Left: Reel Area (Carousel) */}
              <div className="flex flex-col gap-4">
                <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-brand-darker gold-border-glow group">
                  <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAestheticInkSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <iframe 
                      src={aestheticInkSlides[currentAestheticInkSlide]} 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      className="w-full h-full" 
                      title={`Aesthetic Ink Slide ${currentAestheticInkSlide + 1}`}
                    ></iframe>
                  </motion.div>
                </AnimatePresence>
                
                {/* Carousel Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <button 
                    onClick={prevAestheticInkSlide}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-accent hover:text-brand-bg transition-colors pointer-events-auto"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextAestheticInkSlide}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-accent hover:text-brand-bg transition-colors pointer-events-auto"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-xs tracking-widest uppercase z-10">
                  {currentAestheticInkSlide + 1} / {aestheticInkSlides.length}
                </div>

                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2">
                  {aestheticInkSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentAestheticInkSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentAestheticInkSlide === idx 
                          ? "w-8 bg-brand-accent" 
                          : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: 4 Images Grid */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:gap-6">
                <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                  <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775733154/Aestethic_Ink_Kaiserslautern__ppagfi.webp" alt="Aesthetic Ink Tattoo Studio Kaiserslautern — Social Media Video Ads Rezai Vision" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                  <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775734649/Aestethic_Ink_5_Kaiserslautern_e8isjk.webp" alt="Aesthetic Ink Reels Content Kaiserslautern — Beauty Marketing Videoproduktion" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                  <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775734565/Ausethetik_INK_4_qnvksf.webp" alt="Aesthetic Ink Social Media Content Kaiserslautern — Werbefilm Beauty Branche" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                  <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775734141/AestethicInk_Kaiserslautern_2_h6yrms.webp" alt="Aesthetic Ink Werbevideo Kaiserslautern — Instagram Reels Tattoo Studio" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

          {/* 2 Columns: Behnke & Pflege mit Erfolg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Behnke */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3 px-2">
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Social Content</span>
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Reels</span>
              </div>
              
              <div className="bg-brand-darker/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 gold-border-glow flex-1">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 gold-text-gradient tracking-tight">KSB Rechtsanwälte</h3>
                <p className="text-gray-300 text-lg font-light mb-3">Social-Media-Content für Aufmerksamkeit, Präsenz und Vertrauen.</p>
                <p className="text-gray-400 text-base leading-relaxed font-light mb-3">Vertikale Inhalte für organische Posts und aktiv beworbene Kampagnen auf Social Media.</p>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">Eingesetzt für Sichtbarkeit, Vertrauen und gezielte Leads.</p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Reels</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Ads</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Leads</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-brand-darker gold-border-glow">
                  <iframe 
                    src="https://player.vimeo.com/video/1181564492?badge=0&autopause=0&player_id=0&app_id=58479&muted=0" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    className="absolute top-0 left-0 w-full h-full" 
                    title="KSB RECHTSANWÄLTE"
                  ></iframe>
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775737722/Behnke1_ao07wt.webp" alt="KSB Rechtsanwälte Social Media Content Kaiserslautern — Rezai Vision" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775740583/KSB_KL_pttnwy.webp" alt="KSB Rechtsanwälte Kanzlei Video Kaiserslautern — Vertrauensaufbau durch Reels" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pflege mit Erfolg */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3 px-2">
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Recruiting</span>
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Pflege</span>
              </div>
              
              <div className="bg-brand-darker/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 gold-border-glow flex-1">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 gold-text-gradient tracking-tight">Pflege mit Erfolg</h3>
                <p className="text-gray-300 text-lg font-light mb-3">Recruiting-Content zur Mitarbeitergewinnung im Pflegebereich.</p>
                <p className="text-gray-400 text-base leading-relaxed font-light mb-3">Visuelle Inhalte für eine glaubwürdige Ansprache potenzieller Bewerber.</p>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">Durch Videomarketing konnten passende Mitarbeiter gefunden und eingestellt werden.</p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Recruiting</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Bewerber</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Pflege</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-brand-darker gold-border-glow">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600" alt="Pflege mit Erfolg Recruiting Video Rodalben — Mitarbeitergewinnung Pflegebranche" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-brand-darker gold-border-glow">
                  <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600" alt="Pflege Recruiting Content Rodalben Pfalz — Bewerbervideo Pflegedienst" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-brand-darker gold-border-glow">
                  <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600" alt="Pflege Personal finden Rodalben — Authentisches Recruiting Video Pfalz" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

          {/* 2 Columns: Social Care & Pfaff */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Social Care */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3 px-2">
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Social Content</span>
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Arbeitsvermittlung</span>
              </div>
              
              <div className="bg-brand-darker/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 gold-border-glow flex-1">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 gold-text-gradient tracking-tight">Social Care</h3>
                <p className="text-gray-300 text-lg font-light mb-3">Reels und Social Content für Sichtbarkeit, Vertrauen und Bewerberansprache.</p>
                <p className="text-gray-400 text-base leading-relaxed font-light mb-3">Talking Heads, Mitarbeiterstimmen und authentische Einblicke für eine Arbeitsvermittlung im sozialen Bereich.</p>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">Während der Videopostings kamen rund 70 % der Bewerbungen über Instagram.</p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Recruiting</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Reels</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Instagram</span>
                </div>
              </div>

              <div className="grid grid-cols-[4fr_6fr] gap-4 mt-2">
                <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-brand-darker gold-border-glow">
                  <video 
                    src="https://res.cloudinary.com/dzt4f9xdi/video/upload/q_auto/f_auto/v1775985431/Social_Care_EXPOFIX_jftef4.mov"
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  />
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775742144/Social_Care1_slwplk.jpg" alt="Social Care Arbeitsvermittlung Mainz — Social Media Recruiting Content" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775810663/Marcel_Social_care_2.1.1_phx9yw.webp" alt="Social Care Talking Head Video Mainz — Instagram Reels Arbeitgeber" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775810388/Adonay_welde_social_care_1.12.1_d3uhxu.webp" alt="Social Care Mitarbeiterstimmen Mainz — Authentisches Employer Branding" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775809428/Social_CAre_3.1.1_upw3fj.webp" alt="Social Care Bewerbervideo Mainz — 70 Prozent Bewerbungen über Instagram" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pfaff */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3 px-2">
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Produktvideos</span>
                <span className="px-3 py-1 bg-white/5 border border-brand-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium text-brand-accent">Industrie</span>
              </div>
              
              <div className="bg-brand-darker/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 gold-border-glow flex-1">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 gold-text-gradient tracking-tight">Pfaff</h3>
                <p className="text-gray-300 text-lg font-light mb-3">Produktcontent für Social Media, Messe und YouTube.</p>
                <p className="text-gray-400 text-base leading-relaxed font-light mb-3">Technische Inhalte zur Präsentation von Funktionen, Anwendung und Produktnutzen.</p>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">Eingesetzt für klare Produktkommunikation auf Displays, Messen und digitalen Kanälen.</p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Industrie</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Produkte</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-medium text-gray-500">Messe</span>
                </div>
              </div>

              <div className="grid grid-cols-[4fr_6fr] gap-4 mt-2">
                <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-brand-darker gold-border-glow">
                  <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775741110/pfaff1_2.3.1_hxcq6a.webp" alt="Pfaff Industrienähmaschinen Produktvideo Kaiserslautern Bensheim — Rezai Vision" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775741311/pfaff_4_1.8.2_emhgzd.webp" alt="Pfaff Nähmaschine Detail Produktfilm Kaiserslautern — Industrievideo Messe" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775741116/pfaff2_1.9.1_aju6fd.webp" alt="Pfaff Produktpräsentation Video Bensheim — Social Media Content Industrie" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative rounded-3xl overflow-hidden bg-brand-darker gold-border-glow col-span-2">
                    <img src="https://res.cloudinary.com/dzt4f9xdi/image/upload/q_auto/f_auto/v1775741113/pfaff3_1.3.1_lv6rrj.webp" alt="Pfaff Nähmaschine Nahaufnahme Produktvideo — YouTube und Messe Content" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button href="/kontakt" variant="outline" size="lg">
            Jetzt Kontakt aufnehmen
          </Button>
        </div>
      </div>
    </section>
  );
}
