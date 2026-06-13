import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FileText, Plus, Trash2, Printer, Loader2, Users } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: string;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceGenerator() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Invoice State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [documentType, setDocumentType] = useState<'Angebot' | 'Rechnung'>('Angebot');
  const [documentNumber, setDocumentNumber] = useState(`ANG-${new Date().getFullYear()}-001`);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Videoproduktion (1x Drehtag)', quantity: 1, price: 1500 },
    { id: '2', description: 'Postproduktion (Schnitt, Color Grading)', quantity: 1, price: 900 }
  ]);
  const [notes, setNotes] = useState('Wir bedanken uns für das Vertrauen und freuen uns auf die Zusammenarbeit.');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const calcLeadsRef = collection(db, 'calculatorLeads');
      const calcSnap = await getDocs(query(calcLeadsRef, orderBy('createdAt', 'desc')));
      
      const calcLeadsData: Lead[] = calcSnap.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || 'Unbekannt',
        email: doc.data().email || '',
        source: 'Preisrechner',
        status: doc.data().status || 'neu'
      }));

      const contactLeadsRef = collection(db, 'contactLeads');
      let contactLeadsData: Lead[] = [];
      try {
        const contactSnap = await getDocs(query(contactLeadsRef, orderBy('createdAt', 'desc')));
        contactLeadsData = contactSnap.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || doc.data().firstName || 'Unbekannt',
          email: doc.data().email || '',
          source: 'Kontaktformular',
          status: doc.data().status || 'neu'
        }));
      } catch(e) { }

      setLeads([...calcLeadsData, ...contactLeadsData]);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const calculateSubtotal = () => items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = calculateSubtotal() * 0.19;
  const total = calculateSubtotal() + tax;

  const printDocument = () => {
    window.print();
  };

  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-black/40 border border-white/10 rounded-2xl overflow-hidden print-container">
      
      {/* Editor Sidebar (Hidden when printing) */}
      <div className="w-full md:w-96 bg-white/5 border-r border-white/10 flex flex-col overflow-y-auto no-print">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <FileText className="text-brand-accent" />
            Dokumenten-Editor
          </h2>
          
          <button 
            onClick={printDocument}
            className="w-full bg-brand-accent text-brand-bg px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg"
          >
            <Printer size={18} /> Als PDF drucken
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Settings */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Dokumenttyp</label>
            <select 
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as any)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-accent"
            >
              <option value="Angebot">Angebot</option>
              <option value="Rechnung">Rechnung</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kunde auswählen (CRM)</label>
            <select 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-accent"
              onChange={(e) => {
                const lead = leads.find(l => l.id === e.target.value);
                setSelectedLead(lead || null);
              }}
              defaultValue=""
            >
              <option value="" disabled>Bitte wählen...</option>
              {leads.map(lead => (
                <option key={lead.id} value={lead.id}>{lead.name} ({lead.source})</option>
              ))}
            </select>
            {loading && <p className="text-xs text-brand-accent mt-2 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> Lade CRM Kontakte...</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nummer</label>
              <input 
                type="text" 
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Datum</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none" 
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-500 uppercase">Posten</label>
              <button onClick={addItem} className="text-brand-accent text-xs font-bold flex items-center gap-1 hover:brightness-110">
                <Plus size={12} /> Hinzufügen
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="bg-black/20 p-3 rounded-lg border border-white/5 space-y-2 relative group">
                  <button onClick={() => removeItem(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={12} />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Beschreibung"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 px-1 py-1 text-sm text-white focus:outline-none focus:border-brand-accent"
                  />
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Anzahl"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                      className="w-1/3 bg-transparent border-b border-white/10 px-1 py-1 text-sm text-white focus:outline-none"
                    />
                    <input 
                      type="number" 
                      placeholder="Preis (€)"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                      className="w-2/3 bg-transparent border-b border-white/10 px-1 py-1 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Abschluss-Notiz</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Document Preview (Live & Print View) */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-8 md:p-12 print-workspace">
        <div className="bg-white max-w-3xl mx-auto shadow-2xl min-h-[1056px] text-black relative p-12 md:p-20">
          
          {/* Company Header */}
          <div className="flex justify-between items-start mb-20 border-b-4 border-black pb-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tighter">REZAI<span className="text-gray-400">.</span>VISION</h1>
              <p className="text-sm font-bold tracking-widest uppercase mt-1 text-gray-500">Premium Videoproduktion</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p className="font-bold text-black mb-1">Parsha Rezai</p>
              <p>Musterstraße 123</p>
              <p>67655 Kaiserslautern</p>
              <p>info@rezaivision.de</p>
            </div>
          </div>

          {/* Client & Meta Info */}
          <div className="flex justify-between items-end mb-16">
            <div className="text-sm">
              <p className="text-gray-400 text-xs font-bold uppercase mb-1">Empfänger</p>
              {selectedLead ? (
                <>
                  <p className="font-bold text-lg">{selectedLead.name}</p>
                  <p className="text-gray-600">{selectedLead.email}</p>
                </>
              ) : (
                <p className="text-gray-400 italic">Kunde in der Sidebar auswählen...</p>
              )}
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-light mb-4 uppercase tracking-widest text-gray-800">{documentType}</h2>
              <table className="text-sm">
                <tbody>
                  <tr>
                    <td className="pr-4 text-gray-500 text-right">Nummer:</td>
                    <td className="font-bold">{documentNumber}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-gray-500 text-right">Datum:</td>
                    <td className="font-bold">{new Date(date).toLocaleDateString('de-DE')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full mb-12 border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-3 text-left font-bold text-sm uppercase tracking-wider">Position</th>
                <th className="py-3 text-center font-bold text-sm uppercase tracking-wider w-24">Menge</th>
                <th className="py-3 text-right font-bold text-sm uppercase tracking-wider w-32">Einzelpreis</th>
                <th className="py-3 text-right font-bold text-sm uppercase tracking-wider w-32">Gesamt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-4 text-gray-800">{item.description || '...'}</td>
                  <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-4 text-right text-gray-600">{item.price.toFixed(2)} €</td>
                  <td className="py-4 text-right font-bold">{((item.quantity * item.price)).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-16">
            <div className="w-64">
              <div className="flex justify-between py-2 text-gray-600">
                <span>Zwischensumme:</span>
                <span>{calculateSubtotal().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-2 text-gray-600 border-b border-gray-300">
                <span>zzgl. 19% MwSt.:</span>
                <span>{tax.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-4 font-bold text-xl">
                <span>Gesamtbetrag:</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="text-sm text-gray-600 border-l-4 border-black pl-4">
            <p>{notes}</p>
          </div>

          {/* Footer details (Bank info etc.) */}
          <div className="absolute bottom-12 left-12 right-12 text-center border-t border-gray-200 pt-6 text-xs text-gray-400 flex justify-between">
            <div>Rezai Vision • Steuernummer: 12/345/67890</div>
            <div>IBAN: DEXX XXXX XXXX XXXX XXXX XX • BIC: XXXXXXXX</div>
          </div>

        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-workspace, .print-workspace * { visibility: visible; }
          .print-workspace { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            background: white !important;
            padding: 0 !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}
