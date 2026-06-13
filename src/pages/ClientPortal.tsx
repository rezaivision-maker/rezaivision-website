import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileVideo, CheckCircle2, Loader2, MessageSquare, AlertCircle,
  Download, Clock, RotateCcw, Send, User, ChevronDown, ChevronUp,
  Play, Check, X, History, Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const extractDriveFileId = (url: string): string | null => {
  if (!url) return null;
  // Matches: /file/d/FILE_ID/ or id=FILE_ID or /d/FILE_ID
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
};

const getDriveEmbedUrl = (fileId: string) =>
  `https://drive.google.com/file/d/${fileId}/preview`;

const getDriveDownloadUrl = (fileId: string) =>
  `https://drive.google.com/uc?export=download&id=${fileId}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// ─────────────────────────────────────────────
// MAIN CLIENT PORTAL
// ─────────────────────────────────────────────
export default function ClientPortal() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Comment state
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState(() => localStorage.getItem('portal_name') || '');
  const [showHistory, setShowHistory] = useState(false);
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [confirmChanges, setConfirmChanges] = useState(false);
  const [changeComment, setChangeComment] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const snap = await getDoc(doc(db, 'productionProjects', id));
        if (snap.exists()) setProject({ id: snap.id, ...snap.data() });
        else setProject(null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const saveAuthor = (name: string) => {
    setAuthorName(name);
    localStorage.setItem('portal_name', name);
  };

  // Get current version data
  const versions: any[] = project?.versions || [];
  const currentVersion = versions.find((v: any) => v.version === project?.currentVersion) || versions[versions.length - 1];
  const fileId = currentVersion?.driveFileId || extractDriveFileId(currentVersion?.driveUrl || '');

  const addComment = async () => {
    if (!commentText.trim() || !authorName.trim()) return;
    const comment = {
      text: commentText.trim(),
      author: authorName.trim(),
      timestamp: new Date().toISOString(),
      version: project.currentVersion,
    };
    try {
      await updateDoc(doc(db, 'productionProjects', id!), {
        feedback: arrayUnion(comment),
        updatedAt: new Date().toISOString(),
      });
      setProject((p: any) => ({ ...p, feedback: [...(p.feedback || []), comment] }));
      setCommentText('');
    } catch (e) {
      alert('Fehler beim Senden des Kommentars.');
    }
  };

  const handleApprove = async () => {
    if (!confirmApprove) { setConfirmApprove(true); return; }
    setSubmitting(true);
    try {
      const downloadUrl = fileId ? getDriveDownloadUrl(fileId) : currentVersion?.driveUrl;
      await updateDoc(doc(db, 'productionProjects', id!), {
        status: 'approved',
        approvedAt: new Date().toISOString(),
        downloadUrl,
        updatedAt: new Date().toISOString(),
      });
      setProject((p: any) => ({ ...p, status: 'approved', downloadUrl }));
      setConfirmApprove(false);
    } catch (e) {
      alert('Fehler bei der Freigabe. Bitte kontaktiere uns direkt.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestChanges = async () => {
    if (!changeComment.trim()) { alert('Bitte beschreibe die gewünschten Änderungen.'); return; }
    if (!confirmChanges) { setConfirmChanges(true); return; }
    setSubmitting(true);
    const comment = {
      text: `[ÄNDERUNGSWUNSCH]: ${changeComment.trim()}`,
      author: authorName || 'Kunde',
      timestamp: new Date().toISOString(),
      version: project.currentVersion,
      type: 'change_request',
    };
    try {
      await updateDoc(doc(db, 'productionProjects', id!), {
        status: 'changes_requested',
        feedback: arrayUnion(comment),
        updatedAt: new Date().toISOString(),
      });
      setProject((p: any) => ({ ...p, status: 'changes_requested', feedback: [...(p.feedback || []), comment] }));
      setConfirmChanges(false);
      setChangeComment('');
    } catch (e) {
      alert('Fehler. Bitte kontaktiere uns direkt.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#E8B84B] animate-spin" />
          <p className="text-gray-400">Projekt wird geladen...</p>
        </div>
      </div>
    );
  }

  // ── Not found ──
  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white px-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Projekt nicht gefunden</h2>
          <p className="text-gray-400">Bitte überprüfe den Link oder kontaktiere uns direkt.</p>
        </div>
      </div>
    );
  }

  const status = project.status;
  const feedback: any[] = project.feedback || [];
  const isApproved = status === 'approved';
  const isChangesRequested = status === 'changes_requested';

  const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
    in_review: { label: 'Wartet auf deine Freigabe', color: 'text-[#E8B84B]', bg: 'bg-[#E8B84B]/10', border: 'border-[#E8B84B]/30', icon: Clock },
    approved: { label: 'Freigegeben ✅', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle2 },
    changes_requested: { label: 'Änderungen angefordert', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: RotateCcw },
    delivered: { label: 'Geliefert', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: Download },
  };
  const sc = statusConfig[status] || statusConfig.in_review;
  const StatusIcon = sc.icon;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#E8B84B]/30">
      <Helmet>
        <title>Video Review | {project.title} | Rezai Vision</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E8B84B]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#E8B84B]" />
            </div>
            <div>
              <span className="font-black text-white tracking-tight">REZAI<span className="text-[#E8B84B]">.</span>VISION</span>
              <span className="text-gray-500 text-xs ml-2">· Video Review Portal</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${sc.bg} ${sc.border} border ${sc.color}`}>
            <StatusIcon size={12} />
            {sc.label}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Title */}
        <div>
          <p className="text-[#E8B84B] text-sm font-bold uppercase tracking-wider mb-1">Version {project.currentVersion || 1}</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{project.title}</h1>
          {project.clientName && <p className="text-gray-400 mt-1">Für {project.clientName}</p>}
        </div>

        {/* VIDEO PLAYER */}
        {fileId && (
          <div className="bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-black/60 px-5 py-3 border-b border-white/10 flex items-center gap-2">
              <Play size={14} className="text-[#E8B84B]" />
              <span className="text-sm font-bold text-white">Dein Video – Version {project.currentVersion || 1}</span>
              <span className="ml-auto text-xs text-gray-500">Powered by Google Drive</span>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={getDriveEmbedUrl(fileId)}
                className="absolute inset-0 w-full h-full"
                allow="autoplay"
                title={project.title}
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}

        {!fileId && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <FileVideo className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Das Video wird in Kürze hochgeladen. Bitte schau später nochmal rein.</p>
          </div>
        )}

        {/* ── APPROVED: Download Box ── */}
        <AnimatePresence>
          {isApproved && project.downloadUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-6 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-2xl font-black text-white mb-1">Video freigegeben!</h2>
              <p className="text-gray-400 mb-5">Dein finales Video steht zum Download bereit.</p>
              <a
                href={project.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-emerald-500/30"
              >
                <Download size={22} /> Finales Video herunterladen
              </a>
              <p className="text-xs text-gray-500 mt-3">Der Link führt direkt zu Google Drive</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CHANGES REQUESTED: Waiting Banner ── */}
        {isChangesRequested && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 flex gap-4">
            <RotateCcw className="text-orange-400 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-orange-400 text-lg">Änderungen angefordert</h3>
              <p className="text-gray-300 text-sm mt-1">
                Deine Änderungswünsche wurden an Rezai Vision übermittelt. Wir melden uns zeitnah mit einer überarbeiteten Version. 
                Du bekommst automatisch den Zugang zum neuen Video.
              </p>
            </div>
          </div>
        )}

        {/* ── ACTION BUTTONS (only when in_review) ── */}
        {status === 'in_review' && fileId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* APPROVE */}
            <div className={`rounded-2xl border p-5 transition-all ${confirmApprove ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/5 border-white/10'}`}>
              <h3 className="font-bold text-white mb-1 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> Video freigeben</h3>
              <p className="text-gray-400 text-sm mb-4">
                Das Video entspricht deinen Vorstellungen und ist so in Ordnung.
                Du erhältst sofort den Download-Link.
              </p>
              {!confirmApprove ? (
                <button
                  onClick={() => setConfirmApprove(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
                >
                  <Check size={18} /> Freigeben
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-emerald-400 font-bold text-sm">✅ Bist du sicher? Nach der Freigabe erhältst du den Download-Link.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleApprove}
                      disabled={submitting}
                      className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
                    >
                      {submitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                      Ja, Freigeben!
                    </button>
                    <button onClick={() => setConfirmApprove(false)} className="bg-white/10 text-gray-400 px-4 rounded-xl hover:bg-white/20 transition-all">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* REQUEST CHANGES */}
            <div className={`rounded-2xl border p-5 transition-all ${confirmChanges ? 'bg-orange-500/10 border-orange-500/40' : 'bg-white/5 border-white/10'}`}>
              <h3 className="font-bold text-white mb-1 flex items-center gap-2"><RotateCcw size={18} className="text-orange-400" /> Änderungen anfordern</h3>
              <p className="text-gray-400 text-sm mb-4">
                Du möchtest Anpassungen am Video. Beschreibe was geändert werden soll.
              </p>
              <textarea
                value={changeComment}
                onChange={e => setChangeComment(e.target.value)}
                rows={3}
                placeholder="z.B. Ab Sekunde 15 soll das Logo sichtbar sein. Der Abspann soll länger sein..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-400 focus:outline-none resize-none mb-3"
              />
              {!confirmChanges ? (
                <button
                  onClick={() => {
                    if (!changeComment.trim()) { alert('Bitte beschreibe die gewünschten Änderungen.'); return; }
                    setConfirmChanges(true);
                  }}
                  className="w-full bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/30 text-orange-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw size={16} /> Änderungen anfordern
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-orange-400 font-bold text-sm">Änderungswunsch absenden?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleRequestChanges}
                      disabled={submitting}
                      className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-400 transition-all"
                    >
                      {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      Absenden
                    </button>
                    <button onClick={() => setConfirmChanges(false)} className="bg-white/10 text-gray-400 px-4 rounded-xl hover:bg-white/20 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── COMMENTS SECTION ── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
            <MessageSquare size={18} className="text-[#E8B84B]" />
            <h2 className="font-bold text-white">Kommentare & Feedback</h2>
            {feedback.length > 0 && (
              <span className="ml-auto text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-full">{feedback.length}</span>
            )}
          </div>

          {/* Existing comments */}
          <div className="divide-y divide-white/5">
            {feedback.length === 0 && (
              <div className="p-8 text-center text-gray-600">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Noch keine Kommentare. Schreib uns direkt hier!</p>
              </div>
            )}
            {feedback.map((c: any, i: number) => (
              <div key={i} className={`px-6 py-4 ${c.type === 'change_request' ? 'bg-orange-500/5' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    c.type === 'change_request' ? 'bg-orange-500/20 text-orange-400' : 'bg-[#E8B84B]/20 text-[#E8B84B]'
                  }`}>
                    {(c.author || 'K').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">{c.author || 'Kunde'}</span>
                      {c.version && <span className="text-xs bg-white/10 text-gray-500 px-1.5 py-0.5 rounded">V{c.version}</span>}
                      {c.type === 'change_request' && <span className="text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-bold">Änderungswunsch</span>}
                      <span className="text-xs text-gray-600 ml-auto">{formatDate(c.timestamp)}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {c.type === 'change_request' ? c.text.replace('[ÄNDERUNGSWUNSCH]: ', '') : c.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New comment input */}
          {!isApproved && (
            <div className="p-5 border-t border-white/10 bg-black/20 space-y-3">
              <input
                type="text"
                value={authorName}
                onChange={e => saveAuthor(e.target.value)}
                placeholder="Dein Name"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#E8B84B] focus:outline-none"
              />
              <div className="flex gap-2">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  rows={2}
                  placeholder="Kommentar oder Rückfrage zum Video..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#E8B84B] focus:outline-none resize-none"
                  onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) addComment(); }}
                />
                <button
                  onClick={addComment}
                  disabled={!commentText.trim() || !authorName.trim()}
                  className="bg-[#E8B84B] text-black px-4 rounded-lg font-bold flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-600">Strg+Enter zum schnellen Absenden</p>
            </div>
          )}
        </div>

        {/* ── VERSION HISTORY ── */}
        {versions.length > 1 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <History size={16} className="text-gray-400" />
                <span className="font-bold text-white text-sm">Versionshistorie ({versions.length} Versionen)</span>
              </div>
              {showHistory ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
            </button>
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="divide-y divide-white/5 border-t border-white/10">
                    {[...versions].reverse().map((v: any) => {
                      const vFileId = v.driveFileId || extractDriveFileId(v.driveUrl || '');
                      const isCurrent = v.version === project.currentVersion;
                      return (
                        <div key={v.version} className={`px-6 py-4 flex items-center gap-4 ${isCurrent ? 'bg-[#E8B84B]/5' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${isCurrent ? 'bg-[#E8B84B] text-black' : 'bg-white/10 text-gray-400'}`}>
                            {v.version}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">
                              Version {v.version} {isCurrent && <span className="text-[#E8B84B] text-xs font-bold">(Aktuell)</span>}
                            </p>
                            <p className="text-gray-500 text-xs">{v.uploadedAt ? formatDate(v.uploadedAt) : 'Datum unbekannt'}</p>
                            {v.changeNote && <p className="text-gray-400 text-xs mt-1">"{v.changeNote}"</p>}
                          </div>
                          {vFileId && !isCurrent && (
                            <a
                              href={getDriveEmbedUrl(vFileId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-500 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all"
                            >
                              Ansehen
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </main>

      <footer className="py-12 text-center text-gray-600 text-sm border-t border-white/5 mt-12">
        © {new Date().getFullYear()} Rezai Vision · Kaiserslautern ·{' '}
        <a href="https://rezaivision.de" className="hover:text-[#E8B84B] transition-colors">rezaivision.de</a>
      </footer>
    </div>
  );
}
