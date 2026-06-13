import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Users, Mail, Phone, Calendar, Loader2, Tag, BrainCircuit, X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import ReactMarkdown from 'react-markdown';

interface Lead {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  source: string; // e.g. "Preisrechner", "Kontaktformular"
  createdAt: string;
  status: 'neu' | 'kontaktiert' | 'angebot' | 'kunde' | 'absage';
  details?: string;
  rawSelections?: any; // To pass to AI
  knowledgeBase?: string; // Client specific RAG context
}

const COLUMNS = [
  { id: 'neu', title: 'Neu', color: 'border-white/10' },
  { id: 'kontaktiert', title: 'Kontaktiert', color: 'border-blue-500/30' },
  { id: 'angebot', title: 'Termin / Angebot', color: 'border-amber-500/30' },
  { id: 'kunde', title: 'Kunde (Gewonnen)', color: 'border-emerald-500/30' },
  { id: 'absage', title: 'Absage', color: 'border-red-500/30' },
];

export default function CRMManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // AI Copilot State
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const calcLeadsRef = collection(db, 'calculatorLeads');
      const calcSnap = await getDocs(query(calcLeadsRef, orderBy('createdAt', 'desc')));
      
      const calcLeadsData: Lead[] = calcSnap.docs.map(doc => {
        const data = doc.data();
        // Fallback for old leads that didn't have 'angebot'
        let st = data.status || 'neu';
        if (st !== 'neu' && st !== 'kontaktiert' && st !== 'angebot' && st !== 'kunde' && st !== 'absage') {
          st = 'neu';
        }

        return {
          id: doc.id,
          name: data.name || 'Unbekannt',
          email: data.email || 'Keine E-Mail',
          phone: data.phone || '-',
          source: 'Preisrechner',
          createdAt: data.createdAt || new Date().toISOString(),
          status: st,
          details: `Budget ca. ${data.totalPrice}€ | ${data.selections?.videoType || ''}`,
          rawSelections: data.selections,
          knowledgeBase: data.knowledgeBase || ''
        };
      });

      const contactLeadsRef = collection(db, 'contactLeads');
      let contactLeadsData: Lead[] = [];
      try {
        const contactSnap = await getDocs(query(contactLeadsRef, orderBy('createdAt', 'desc')));
        contactLeadsData = contactSnap.docs.map(doc => {
          const data = doc.data();
          let st = data.status || 'neu';
          if (st !== 'neu' && st !== 'kontaktiert' && st !== 'angebot' && st !== 'kunde' && st !== 'absage') {
            st = 'neu';
          }
          return {
            id: doc.id,
            name: data.name || data.firstName || 'Unbekannt',
            email: data.email || 'Keine E-Mail',
            phone: data.phone || '-',
            source: 'Kontaktformular',
            createdAt: data.createdAt || new Date().toISOString(),
            status: st,
            details: data.message || '-',
            rawSelections: data.message,
            knowledgeBase: data.knowledgeBase || ''
          };
        });
      } catch(e) { }

      const allLeads = [...calcLeadsData, ...contactLeadsData].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setLeads(allLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as Lead['status'];
    
    // Optimistic UI Update
    setLeads(prev => prev.map(lead => {
      if (lead.id === draggableId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    }));

    // Update Firebase
    try {
      const draggedLead = leads.find(l => l.id === draggableId);
      if (!draggedLead) return;
      const collectionName = draggedLead.source === 'Preisrechner' ? 'calculatorLeads' : 'contactLeads';
      await updateDoc(doc(db, collectionName, draggableId), { status: newStatus });
    } catch (e) {
      console.error('Error updating status:', e);
      // Revert on error
      fetchLeads();
    }
  };

  const analyzeLead = async (lead: Lead) => {
    setAnalyzing(true);
    setAiAnalysis('');
    
    const prompt = `
Du bist ein erstklassiger Sales-Consultant für eine Premium-Videoproduktion (Rezai Vision).
Analysiere diesen eingehenden Lead und erstelle mir eine Sales-Call-Strategie.

Lead Name: ${lead.name}
Quelle: ${lead.source}
Daten/Eingaben: ${JSON.stringify(lead.rawSelections)}
Notiz/Details: ${lead.details}

Gib mir in kurzen, prägnanten Bulletpoints (Markdown):
1. Eine kurze Einschätzung der Lead-Qualität (Budget, Ernsthaftigkeit).
2. Die 2 wichtigsten "Pain Points", die ich im Gespräch ansprechen sollte, basierend auf seinen Eingaben.
3. Welches "Upsell" (z.B. Drohne, mehr Drehtage) könnte bei diesem Kunden Sinn machen?
`;

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      setAiAnalysis(data.reply);
    } catch (err) {
      setAiAnalysis("Fehler bei der K.I. Analyse.");
    } finally {
      setAnalyzing(false);
    }
  };

  const openLead = (lead: Lead) => {
    setSelectedLead(lead);
    setAiAnalysis('');
  };

  const saveKnowledgeBase = async (id: string, source: string, kbContent: string) => {
    const collectionName = source === 'Preisrechner' ? 'calculatorLeads' : 'contactLeads';
    try {
      await updateDoc(doc(db, collectionName, id), { knowledgeBase: kbContent });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, knowledgeBase: kbContent } : l));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, knowledgeBase: kbContent });
      }
    } catch (e) {
      console.error('Error saving knowledge base:', e);
      alert('Fehler beim Speichern des Dossiers.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <Users className="text-brand-accent" />
            CRM & Pipeline
          </h2>
          <p className="text-sm text-gray-400">Verwalte deine Leads per Drag & Drop und nutze die K.I. für Sales-Strategien.</p>
        </div>
        <button onClick={fetchLeads} className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all">
          Aktualisieren
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-brand-accent w-8 h-8" />
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 min-w-max">
              {COLUMNS.map(column => {
                const columnLeads = leads.filter(l => l.status === column.id);
                return (
                  <div key={column.id} className={`w-80 bg-white/5 rounded-2xl border-t-4 ${column.color} flex flex-col max-h-[70vh]`}>
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                      <h3 className="font-bold text-white">{column.title}</h3>
                      <span className="bg-white/10 text-xs font-bold px-2 py-1 rounded-full text-gray-300">
                        {columnLeads.length}
                      </span>
                    </div>
                    
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 overflow-y-auto p-3 space-y-3 transition-colors ${
                            snapshot.isDraggingOver ? 'bg-white/[0.02]' : ''
                          }`}
                        >
                          {columnLeads.map((lead, index) => (
                            <Draggable key={lead.id} draggableId={lead.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => openLead(lead)}
                                  className={`bg-black/40 border border-white/10 p-4 rounded-xl cursor-pointer transition-all hover:border-brand-accent/50 ${
                                    snapshot.isDragging ? 'shadow-2xl shadow-brand-accent/20 border-brand-accent rotate-2 scale-105' : ''
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-white truncate pr-2">{lead.name}</h4>
                                    <span className="text-[10px] uppercase font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded">
                                      {lead.source.substring(0, 4)}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{lead.details}</p>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      {new Date(lead.createdAt).toLocaleDateString('de-DE')}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedLead.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Mail size={14} /> {selectedLead.email}</span>
                  {selectedLead.phone && selectedLead.phone !== '-' && (
                    <span className="flex items-center gap-1"><Phone size={14} /> {selectedLead.phone}</span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Lead Infos ({selectedLead.source})</h4>
                <p className="text-white text-sm">{selectedLead.details}</p>
              </div>

              {/* RAG Knowledge Base (Client Dossier) */}
              <div className="bg-brand-darker border border-white/10 rounded-xl p-4 relative">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <BrainCircuit size={16} className="text-brand-accent" />
                    Kunden-Dossier (Knowledge Base)
                  </h4>
                  <button 
                    onClick={() => saveKnowledgeBase(selectedLead.id, selectedLead.source, selectedLead.knowledgeBase || '')}
                    className="text-xs bg-brand-accent text-brand-bg px-3 py-1.5 rounded-lg font-bold hover:brightness-110 transition-all"
                  >
                    Speichern
                  </button>
                </div>
                <p className="text-xs text-gray-400 mb-3">Hinterlege hier Hintergrundinfos (Zielgruppe, Produkte, Tonfall). Die KI greift später im Marketing Studio genau auf diese Infos zu.</p>
                <textarea
                  value={selectedLead.knowledgeBase || ''}
                  onChange={(e) => setSelectedLead({...selectedLead, knowledgeBase: e.target.value})}
                  placeholder="Z.B.: Zielgruppe sind Handwerker. Lockere Sprache. USP: 24h Lieferung."
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none resize-y"
                />
              </div>

              {/* Creator Channel / AI Box */}
              <div className="border border-brand-accent/30 bg-brand-accent/5 rounded-xl overflow-hidden">
                <div className="bg-brand-accent/10 p-4 border-b border-brand-accent/20 flex justify-between items-center">
                  <h4 className="font-bold text-brand-accent flex items-center gap-2">
                    <BrainCircuit size={18} />
                    Creator Channel (K.I. Copilot)
                  </h4>
                  {!aiAnalysis && !analyzing && (
                    <button 
                      onClick={() => analyzeLead(selectedLead)}
                      className="bg-brand-accent text-brand-bg px-4 py-1.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all"
                    >
                      Strategie generieren
                    </button>
                  )}
                </div>
                <div className="p-4">
                  {analyzing ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                      <Loader2 className="animate-spin text-brand-accent w-6 h-6" />
                      <p className="text-sm text-brand-accent/70">K.I. analysiert den Kunden...</p>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-ul:my-2 prose-li:my-0 text-gray-300">
                      <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">
                      Klicke auf "Strategie generieren", um eine personalisierte Sales-Strategie für diesen Lead zu erhalten.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
