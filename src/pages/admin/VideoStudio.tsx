import { useState } from "react";
import { SEO } from "../../components/SEO";

export default function VideoStudio() {
  const [prompt, setPrompt] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [htmlUrl, setHtmlUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerateAI = async () => {
    if (!prompt) return alert("Bitte gib einen Prompt ein.");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, num_frames: 24, width: 512, height: 512 }),
      });
      const data = await response.json();
      setResult(data);
      alert(`Erfolg: ${data.message} (Gerät: ${data.device_used})`);
    } catch (error) {
      console.error(error);
      alert("Fehler bei der Verbindung zur lokalen KI-API. Läuft der Server auf Port 8000?");
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
            className="px-6 py-3 bg-brand-accent text-white font-medium rounded-lg hover:bg-brand-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Generiere..." : "KI Clip Generieren"}
          </button>
          {result && (
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Gerät:</strong> {result.device_used}</p>
            </div>
          )}
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

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            3. Hyperframes (HTML to Video)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Wandle eine Web-URL oder ein HTML-Layout in eine Video-Animation um.
          </p>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Website URL (z.B. für animierte Charts oder UI-Mockups)
            </label>
            <input
              type="url"
              className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="https://deine-website.de/animation"
              value={htmlUrl}
              onChange={(e) => setHtmlUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            4. Programmgesteuerte Montage (Remotion)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Kombiniere KI-Assets, deine Uploads und Hyperframes zu einem finalen Video.
          </p>
          <button 
            onClick={handleRenderRemotion}
            className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            Finales Video Rendern (Vorschau öffnen)
          </button>
        </div>

      </div>
    </div>
  );
}
