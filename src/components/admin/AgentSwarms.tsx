import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Plus, Cpu, Bot, Settings, Play, CheckCircle2, Loader2, ArrowRight, X, Trash2 } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  systemPrompt: string;
}

interface SwarmMessage {
  agentName: string;
  role: string;
  content: string;
  timestamp: string;
}

export default function AgentSwarms() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Vision Researcher',
      role: 'Marktforschung',
      model: 'llama3.2',
      systemPrompt: 'Du bist der Lead Researcher. Suche nach den besten psychologischen Angles für das vom User genannte Thema. Sei extrem analytisch.'
    },
    {
      id: '2',
      name: 'Sabri Copywriter',
      role: 'Texterstellung',
      model: 'llama3.2',
      systemPrompt: 'Du bist ein Elite-Copywriter nach dem Vorbild von Sabri Suby. Nimm die Recherche von Agent 1 und schreibe einen hochkonvertierenden Text (Hook, Body, CTA).'
    },
    {
      id: '3',
      name: 'Compliance & Editor',
      role: 'Qualitätskontrolle',
      model: 'llama3.2',
      systemPrompt: 'Du bist der finale Editor. Nimm den Text von Agent 2. Prüfe auf Lesbarkeit, Emotionen und entferne alle Floskeln. Gib nur das finale, perfekte Ergebnis aus.'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'swarm' | 'builder'>('swarm');
  const [taskInput, setTaskInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(-1);
  const [swarmOutput, setSwarmOutput] = useState<SwarmMessage[]>([]);

  // Builder States
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRole, setNewAgentRole] = useState('');
  const [newAgentModel, setNewAgentModel] = useState('llama3.2');
  const [newAgentPrompt, setNewAgentPrompt] = useState('');

  const handleAddAgent = () => {
    if (!newAgentName || !newAgentPrompt) return;
    setAgents([...agents, {
      id: Math.random().toString(36).substring(7),
      name: newAgentName,
      role: newAgentRole || 'Allrounder',
      model: newAgentModel,
      systemPrompt: newAgentPrompt
    }]);
    setNewAgentName('');
    setNewAgentRole('');
    setNewAgentPrompt('');
  };

  const removeAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
  };

  const runSwarm = async () => {
    if (!taskInput.trim() || agents.length === 0) return;
    
    setIsProcessing(true);
    setSwarmOutput([]);
    let currentPayload = taskInput;
    const newOutput: SwarmMessage[] = [];

    for (let i = 0; i < agents.length; i++) {
      setCurrentAgentIndex(i);
      const agent = agents[i];

      try {
        // Send directly to local Ollama instance running on port 11434
        const res = await fetch('http://localhost:11434/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: agent.model,
            messages: [
              { role: 'system', content: agent.systemPrompt },
              { role: 'user', content: i === 0 
                  ? `Hier ist die Aufgabe: ${currentPayload}` 
                  : `Hier ist die Vorarbeit deines Kollegen. Bitte bearbeite sie entsprechend deiner Rolle weiter:\n\n${currentPayload}` 
              }
            ],
            stream: false
          })
        });

        if (!res.ok) throw new Error('Ollama API Error');
        const data = await res.json();
        
        currentPayload = data.message.content; // Hand over to next agent
        
        newOutput.push({
          agentName: agent.name,
          role: agent.role,
          content: currentPayload,
          timestamp: new Date().toLocaleTimeString()
        });
        
        setSwarmOutput([...newOutput]);

      } catch (err) {
        console.error(err);
        newOutput.push({
          agentName: agent.name,
          role: agent.role,
          content: "Fehler: Ollama-Modell nicht erreichbar oder nicht installiert. Lade das Modell mit 'ollama pull " + agent.model + "' herunter.",
          timestamp: new Date().toLocaleTimeString()
        });
        setSwarmOutput([...newOutput]);
        break; // Stop swarm on error
      }
    }

    setIsProcessing(false);
    setCurrentAgentIndex(-1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2 flex items-center gap-3">
            <Network className="text-brand-accent" size={32} />
            Agent Swarms
          </h1>
          <p className="text-gray-400">Verwalte deine lokalen KI-Mitarbeiter (Ollama) und baue automatisierte Workflows.</p>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
          <button 
            onClick={() => setActiveTab('swarm')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'swarm' ? 'bg-brand-accent text-brand-bg shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Mission Control
          </button>
          <button 
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'builder' ? 'bg-white/10 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Agent Builder
          </button>
        </div>
      </div>

      {activeTab === 'swarm' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Swarm Chain Config */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <Settings size={16} className="text-brand-accent" />
                Aktive Team-Kette
              </h3>
              
              <div className="space-y-3 relative">
                {/* Vertical Line Connector */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/10 z-0" />
                
                {agents.map((agent, idx) => (
                  <div key={agent.id} className="relative z-10 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 shadow-lg transition-all ${
                      currentAgentIndex === idx 
                        ? 'bg-brand-accent border-brand-accent/50 animate-pulse text-brand-bg' 
                        : currentAgentIndex > idx 
                          ? 'bg-white/10 border-brand-accent/30 text-brand-accent'
                          : 'bg-black border-white/10 text-gray-500'
                    }`}>
                      {currentAgentIndex === idx ? <Loader2 className="animate-spin" size={20} /> : 
                       currentAgentIndex > idx ? <CheckCircle2 size={20} /> : <Bot size={20} />}
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-bold ${currentAgentIndex === idx ? 'text-brand-accent' : 'text-white'}`}>{agent.name}</h4>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 font-mono">{agent.model}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{agent.role}</p>
                    </div>
                  </div>
                ))}

                {agents.length === 0 && (
                  <p className="text-sm text-gray-400 italic">Keine Agenten im Team. Baue zuerst einen Agenten im Builder.</p>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl">
              <p className="text-xs text-brand-accent/80 leading-relaxed font-mono">
                System Info: Das "Agent Swarm" Modul greift auf dein lokales Ollama-Netzwerk zu. Die Daten verlassen deinen Rechner nicht.
              </p>
            </div>
          </div>

          {/* Execution Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-white mb-2 text-lg">Neuer Swarm Auftrag</h3>
              <p className="text-sm text-gray-400 mb-4">Was soll das Agenten-Team für dich erledigen?</p>
              
              <textarea
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Beispiel: Recherchiere die besten Haken für einen TikTok Arzt Account und schreibe 3 Skripte..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-accent resize-none mb-4"
              />
              
              <button
                onClick={runSwarm}
                disabled={isProcessing || !taskInput.trim() || agents.length === 0}
                className="w-full bg-brand-accent text-brand-bg font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
                {isProcessing ? 'Swarm arbeitet...' : 'Swarm starten'}
              </button>
            </div>

            {/* Output Stream */}
            <div className="flex-1 bg-black/20 border border-white/5 rounded-3xl p-6 min-h-[400px]">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Live Output Protokoll</h3>
              
              {swarmOutput.length === 0 && !isProcessing && (
                <div className="h-40 flex items-center justify-center text-gray-600 italic">
                  Warte auf Auftrag...
                </div>
              )}

              <div className="space-y-8">
                {swarmOutput.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className="relative"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                        <Bot size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{msg.agentName}</h4>
                        <p className="text-[10px] text-gray-500 font-mono">{msg.role} • {msg.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="ml-11 bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-light">
                      {msg.content}
                    </div>

                    {idx < agents.length - 1 && idx === swarmOutput.length - 1 && isProcessing && (
                      <div className="ml-11 mt-4 flex items-center gap-2 text-brand-accent/60">
                        <ArrowRight size={16} className="animate-pulse" />
                        <span className="text-xs font-mono animate-pulse">Übergabe an {agents[idx+1].name}...</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create New Agent */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2">
              <Plus className="text-brand-accent" size={24} />
              Neuen Agent rekrutieren
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Agenten Name</label>
                <input 
                  type="text" 
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="z.B. Nischen-Forscher"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Rolle</label>
                  <input 
                    type="text" 
                    value={newAgentRole}
                    onChange={(e) => setNewAgentRole(e.target.value)}
                    placeholder="z.B. Analyse"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lokales Modell</label>
                  <select 
                    value={newAgentModel}
                    onChange={(e) => setNewAgentModel(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-accent appearance-none"
                  >
                    <option value="llama3.2">Llama 3.2 (Schnell)</option>
                    <option value="nemotron-mini">Nemotron Mini (Smart)</option>
                    <option value="qwen2.5">Qwen 2.5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">System Prompt (Anweisung)</label>
                <textarea 
                  value={newAgentPrompt}
                  onChange={(e) => setNewAgentPrompt(e.target.value)}
                  placeholder="Du bist ein Experte für..."
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-accent resize-none"
                />
              </div>

              <button
                onClick={handleAddAgent}
                disabled={!newAgentName || !newAgentPrompt}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4 cursor-pointer"
              >
                Agent zum Team hinzufügen
              </button>
            </div>
          </div>

          {/* Active Roster */}
          <div>
            <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2">
              <Cpu className="text-gray-400" size={24} />
              Aktiver Team Roster ({agents.length})
            </h3>
            
            <div className="space-y-3">
              {agents.map((agent, idx) => (
                <div key={agent.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                    <span className="font-bold text-xs">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white">{agent.name}</h4>
                        <p className="text-xs text-gray-500">{agent.role} • Modell: {agent.model}</p>
                      </div>
                      <button 
                        onClick={() => removeAgent(agent.id)}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 bg-black/40 p-2 rounded-lg line-clamp-2 italic">
                      "{agent.systemPrompt}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
