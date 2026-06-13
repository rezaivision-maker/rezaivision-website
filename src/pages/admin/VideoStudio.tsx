import { useState } from "react";
import { SEO } from "../../components/SEO";

export default function VideoStudio() {
  const [prompt, setPrompt] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handleGenerateAI = () => {
    alert("KI Video Generierung (LTX 2.3) wird gestartet mit Prompt: " + prompt);
    // Hier kommt später der API Aufruf hin
  };

  const handleRenderRemotion = () => {
    alert("Remotion Rendering wird gestartet...");
    // Hier kommt später der Remotion Aufruf hin
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-900">
      <SEO 
        title="Video Studio Dashboard | Rezaemotion" 
        description="KI und Remotion Video Produktion" 
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Video Studio Dashboard
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            1. KI Video Generierung (LTX 2.3)
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Prompt für das KI-Video
            </label>
            <textarea
              className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              rows={4}
              placeholder="Beschreibe die Szene, die die KI generieren soll..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button 
            onClick={handleGenerateAI}
            className="px-6 py-3 bg-brand-accent text-white font-medium rounded-lg hover:bg-brand-accent/90 transition-colors"
          >
            KI Clip Generieren
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            2. Menschliche Medien hinzufügen
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Lade ein Bild oder Video hoch
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent/10 file:text-brand-accent hover:file:bg-brand-accent/20"
              onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
            />
            {mediaFile && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Ausgewählt: {mediaFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            3. Programmgesteuerte Montage (Remotion)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Kombiniere KI-Assets, Text und deine Uploads zu einem finalen Video.
          </p>
          <button 
            onClick={handleRenderRemotion}
            className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            Finales Video Rendern
          </button>
        </div>

      </div>
    </div>
  );
}
