import { useState } from "react";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Search, Camera, Aperture, Image as ImageIcon, Lightbulb, Settings2, Video, MonitorPlay, Clapperboard, Mic, ChevronDown, Info, MapPin } from "lucide-react";
import { glossaryCategories, glossaryTerms } from "@/data/glossary";
import { cn } from "@/lib/utils";

export default function GlossaryIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openTermId, setOpenTermId] = useState<string | null>(null);

  const toggleTerm = (id: string) => {
    setOpenTermId(openTermId === id ? null : id);
  };

  const filteredCategories = glossaryCategories.map(category => {
    const terms = glossaryTerms.filter(term => 
      term.categoryId === category.id && 
      (term.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       term.definition.toLowerCase().includes(searchQuery.toLowerCase()))
    ).sort((a, b) => a.title.localeCompare(b.title));
    return { ...category, terms };
  }).filter(category => category.terms.length > 0);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO 
        title="Filmmaking & Videoproduktion Glossar | Rezai Vision"
        description="Das große Videoproduktions-Glossar von Rezai Vision. Wir erklären Fachbegriffe wie B-Roll, Color Grading, Cinematic Look und Imagefilm einfach und verständlich."
        canonical="/glossar"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "@id": "https://www.rezaivision.de/glossar",
          "name": "Filmmaking & Videoproduktion Glossar",
          "description": "Das große Videoproduktions-Glossar von Rezai Vision. Erklärungen von Fachbegriffen wie B-Roll, Color Grading, Cinematic Look und mehr.",
          "hasDefinedTerm": glossaryTerms.map(term => ({
            "@type": "DefinedTerm",
            "name": term.title,
            "description": term.definition,
            "url": `https://www.rezaivision.de/glossar#${term.id}`
          }))
        }}
      />

      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-accent mb-6">
            <BookOpen size={16} />
            Wissensdatenbank
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Filmmaking <span className="text-brand-accent">Glossar</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Von A-Roll bis Zoom: Wir erklären die wichtigsten Fachbegriffe aus der Welt der Videoproduktion einfach, verständlich und praxisnah für dein nächstes Projekt.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Begriff suchen (z.B. Color Grading, Gimbal...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Glossary Accordion List */}
        <div className="space-y-16">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => {
              const IconComponent = {
                Camera, Aperture, Image: ImageIcon, Lightbulb, Settings2, Video, MonitorPlay, Clapperboard, Mic, BookOpen
              }[category.icon] || BookOpen;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold">{category.title}</h2>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.terms.map((term) => {
                      const isOpen = openTermId === term.id;

                      return (
                        <div 
                          key={term.id} 
                          className={cn(
                            "bg-white/5 border rounded-2xl overflow-hidden transition-colors",
                            isOpen ? "border-brand-accent/50" : "border-white/10 hover:border-white/20"
                          )}
                        >
                          <button
                            onClick={() => toggleTerm(term.id)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                          >
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{term.title}</h3>
                              <p className="text-sm text-brand-accent/80 font-medium">{term.subheadline}</p>
                            </div>
                            <ChevronDown 
                              size={20} 
                              className={cn(
                                "text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4",
                                isOpen && "rotate-180 text-brand-accent"
                              )} 
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <div className="px-6 pb-6 pt-2 border-t border-white/5">
                                  <p className="text-gray-300 leading-relaxed mb-6">
                                    {term.definition}
                                  </p>

                                  <div className="grid gap-4 md:grid-cols-2">
                                    {term.importantInfo && (
                                      <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-5">
                                        <h4 className="text-sm font-bold mb-2 flex items-center gap-2 text-brand-accent">
                                          <Info size={16} />
                                          Wichtige Infos
                                        </h4>
                                        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                                          {term.importantInfo}
                                        </p>
                                      </div>
                                    )}

                                    {term.localContext && (
                                      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                        <h4 className="text-sm font-bold mb-2 flex items-center gap-2 text-purple-400">
                                          <MapPin size={16} />
                                          Lokaler Bezug
                                        </h4>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                          {term.localContext}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Keine Begriffe für "{searchQuery}" gefunden.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
