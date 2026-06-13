import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles, Loader2, Database } from 'lucide-react';

export default function CreatorChannel() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Hallo Parsha! Ich bin dein K.I. Berater für Rezai Vision. Ich kann deine Kundenanfragen analysieren oder dir strategischen Rat zu Content und Sales geben. Was steht heute an?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          systemInstruction: `Du bist der Chef-Berater für Parsha Rezai, Gründer der Videoproduktions-Agentur "Rezai Vision" in Kaiserslautern. Deine Aufgabe ist es, ihm bei der Kundenanalyse, Content-Strategie und Sales-Optimierung zu helfen. Antworte strategisch, kurz und bündig auf Deutsch. Gib ihm konkrete, umsetzbare Tipps für sein Business.`
        })
      });

      if (!response.ok) throw new Error('API Fehler');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: 'Es gab ein Problem bei der Verbindung zur K.I. Bitte prüfe die API Keys.' }]);
    } finally {
      setLoading(false);
    }
  };

  const analyzeLeads = async () => {
    // In a real scenario, we'd fetch from Firestore `calculatorLeads`
    // For now, we simulate sending leads to the K.I.
    const text = "Bitte analysiere meine letzten Leads aus der Datenbank und gib mir eine strategische Zusammenfassung, welche Pakete gerade am beliebtesten sind und wie ich darauf im Sales-Call reagieren soll.";
    sendMessage(text);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col h-[700px] overflow-hidden">
      <div className="p-6 border-b border-white/10 bg-black/20 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Sparkles className="text-brand-accent" size={20} />
            Creator Channel (K.I. Berater)
          </h2>
          <p className="text-sm text-gray-400 mt-1">Chatte mit deiner Rezai Vision K.I. für Strategie & Kundenanalyse.</p>
        </div>
        <button 
          onClick={analyzeLeads}
          className="bg-brand-dark border border-brand-accent/30 text-brand-accent px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-accent/10 transition-all cursor-pointer text-sm"
        >
          <Database size={16} />
          Leads analysieren
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                <Bot size={18} className="text-brand-accent" />
              </div>
            )}
            <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-brand-accent text-brand-bg rounded-br-none' : 'bg-white/10 text-gray-200 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
              <Bot size={18} className="text-brand-accent" />
            </div>
            <div className="p-4 rounded-2xl bg-white/10 text-gray-200 rounded-bl-none flex items-center gap-2">
              <Loader2 className="animate-spin text-brand-accent" size={16} />
              <span className="text-sm text-gray-400">Denkt nach...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-black/20 border-t border-white/10">
        <form 
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex gap-2"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Frag nach Content-Ideen, Sales-Tipps oder Analysen..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-brand-accent text-brand-bg px-4 py-3 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
