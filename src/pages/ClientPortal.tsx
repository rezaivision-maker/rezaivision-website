import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { FileVideo, CheckCircle2, Loader2, ListVideo, AlignLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function ClientPortal() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'productionProjects', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const approveProject = async () => {
    if (!project) return;
    setApproving(true);
    try {
      await updateDoc(doc(db, 'productionProjects', project.id), {
        status: 'approved',
        approvedAt: new Date().toISOString()
      });
      setProject({ ...project, status: 'approved' });
      alert("Vielen Dank! Das Projekt wurde freigegeben.");
    } catch (e) {
      console.error(e);
      alert("Fehler bei der Freigabe. Bitte kontaktiere uns direkt.");
    } finally {
      setApproving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <h2>Projekt nicht gefunden. Bitte überprüfe den Link.</h2>
      </div>
    );
  }

  const isApproved = project.status === 'approved';

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-accent/30 selection:text-white">
      <Helmet>
        <title>Kundenportal | {project.title} | Rezai Vision</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 py-6 px-6 md:px-12 sticky top-0 z-50 backdrop-blur-md flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter">
          REZAI<span className="text-brand-accent">.</span>VISION
        </div>
        <div className="text-sm text-gray-400 font-medium">Kundenportal</div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        
        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <FileVideo className="text-brand-accent w-8 h-8" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
          </div>
          <p className="text-gray-400">Hier findest du das Skript und die geplante Shotlist für unseren anstehenden Dreh.</p>
        </div>

        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border p-6 rounded-2xl mb-12 flex flex-col sm:flex-row gap-6 justify-between items-center ${
            isApproved ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-brand-accent/5 border-brand-accent/20'
          }`}
        >
          <div>
            <h3 className={`text-xl font-bold mb-1 ${isApproved ? 'text-emerald-400' : 'text-brand-accent'}`}>
              Status: {isApproved ? 'Freigegeben' : 'Wartet auf Freigabe'}
            </h3>
            <p className="text-sm text-gray-400">
              {isApproved 
                ? 'Dieses Konzept wurde bereits von dir freigegeben. Wir freuen uns auf den Dreh!' 
                : 'Bitte lies dir das Konzept und die Shotlist durch. Wenn alles passt, klicke auf "Freigeben".'
              }
            </p>
          </div>
          
          {!isApproved && (
            <button 
              onClick={approveProject}
              disabled={approving}
              className="bg-brand-accent text-brand-bg px-8 py-3 rounded-xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {approving ? <Loader2 className="animate-spin w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              Jetzt Freigeben
            </button>
          )}
        </motion.div>

        {/* Content Tabs area - We just stack them for the client */}
        <div className="space-y-12">
          
          {/* Script Section */}
          <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex items-center gap-2">
              <AlignLeft className="text-gray-400 w-5 h-5" />
              <h2 className="text-lg font-bold">1. Konzept / Skript</h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">
                {project.script || 'Noch kein Skript hinterlegt.'}
              </div>
            </div>
          </section>

          {/* Shotlist Section */}
          <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex items-center gap-2">
              <ListVideo className="text-gray-400 w-5 h-5" />
              <h2 className="text-lg font-bold">2. Geplante Shotlist</h2>
            </div>
            <div className="p-0 overflow-x-auto">
              {(!project.shotlist || project.shotlist.length === 0) ? (
                <div className="p-6 text-gray-500">Noch keine Shotlist hinterlegt.</div>
              ) : (
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-4 font-bold text-gray-400 text-sm">#</th>
                      <th className="p-4 font-bold text-gray-400 text-sm">Location</th>
                      <th className="p-4 font-bold text-gray-400 text-sm">Shot-Typ</th>
                      <th className="p-4 font-bold text-gray-400 text-sm">Aktion / Motiv</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {project.shotlist.map((shot: any, idx: number) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-gray-500 font-mono text-sm">{shot.shotNumber || idx+1}</td>
                        <td className="p-4 font-bold text-gray-200">{shot.location}</td>
                        <td className="p-4 text-emerald-400 text-sm">{shot.shotType}</td>
                        <td className="p-4 text-gray-300">{shot.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

      </main>

      <footer className="py-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Rezai Vision.
      </footer>
    </div>
  );
}
