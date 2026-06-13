import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Users, Mail, Phone, Calendar, Loader2, Tag, ExternalLink } from 'lucide-react';

interface Lead {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  source: string; // e.g. "Preisrechner", "Kontaktformular"
  createdAt: string;
  status: 'neu' | 'kontaktiert' | 'kunde' | 'absage';
  details?: string;
}

export default function CRMManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      // Fetch calculator leads
      const calcLeadsRef = collection(db, 'calculatorLeads');
      const calcSnap = await getDocs(query(calcLeadsRef, orderBy('createdAt', 'desc')));
      
      const calcLeadsData: Lead[] = calcSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Unbekannt',
          email: data.email || 'Keine E-Mail',
          phone: data.phone || '-',
          source: 'Preisrechner',
          createdAt: data.createdAt || new Date().toISOString(),
          status: data.status || 'neu',
          details: `Geschätzter Preis: ${data.totalPrice}€ | Videoart: ${data.selections?.videoType || 'Unbekannt'}`
        };
      });

      // We can also fetch contact form leads here if a 'contactLeads' collection exists
      const contactLeadsRef = collection(db, 'contactLeads');
      let contactLeadsData: Lead[] = [];
      try {
        const contactSnap = await getDocs(query(contactLeadsRef, orderBy('createdAt', 'desc')));
        contactLeadsData = contactSnap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || data.firstName || 'Unbekannt',
            email: data.email || 'Keine E-Mail',
            phone: data.phone || '-',
            source: 'Kontaktformular',
            createdAt: data.createdAt || new Date().toISOString(),
            status: data.status || 'neu',
            details: data.message || '-'
          };
        });
      } catch(e) {
        // collection might not exist yet
      }

      // Combine and sort
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

  const updateStatus = async (leadId: string, source: string, newStatus: string) => {
    try {
      const collectionName = source === 'Preisrechner' ? 'calculatorLeads' : 'contactLeads';
      await updateDoc(doc(db, collectionName, leadId), { status: newStatus });
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus as any } : l));
    } catch (e) {
      console.error('Error updating status:', e);
      alert('Fehler beim Aktualisieren des Status.');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'neu': return 'bg-brand-accent/20 text-brand-accent border-brand-accent/30';
      case 'kontaktiert': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'kunde': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'absage': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="text-brand-accent" />
            Lead Datenbank (CRM)
          </h2>
          <button onClick={fetchLeads} className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all">
            Aktualisieren
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-brand-accent w-8 h-8" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Noch keine Leads vorhanden.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="pb-3 pr-4 font-medium">Datum</th>
                  <th className="pb-3 pr-4 font-medium">Kontakt</th>
                  <th className="pb-3 pr-4 font-medium">Quelle</th>
                  <th className="pb-3 pr-4 font-medium">Details</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4 text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-500" />
                        {new Date(lead.createdAt).toLocaleDateString('de-DE')}
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="font-bold text-white mb-1">{lead.name}</div>
                      <div className="flex flex-col gap-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5"><Mail size={12}/> {lead.email}</span>
                        {lead.phone && lead.phone !== '-' && (
                          <span className="flex items-center gap-1.5"><Phone size={12}/> {lead.phone}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-gray-300 text-xs">
                        <Tag size={12} />
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-gray-400 text-xs max-w-[200px] truncate" title={lead.details}>
                      {lead.details}
                    </td>
                    <td className="py-4">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, lead.source, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none appearance-none cursor-pointer ${getStatusColor(lead.status)}`}
                      >
                        <option value="neu" className="bg-black text-white">Neu</option>
                        <option value="kontaktiert" className="bg-black text-white">Kontaktiert</option>
                        <option value="kunde" className="bg-black text-white">Kunde</option>
                        <option value="absage" className="bg-black text-white">Absage</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
