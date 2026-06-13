import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Settings, Volume2, VolumeX, RefreshCw } from 'lucide-react';

// Declaration for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type Status = 'idle' | 'listening' | 'thinking' | 'speaking';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function JarvisCopilot() {
  const [status, setStatus] = useState<Status>('idle');
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Speech APIs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'de-DE';

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setStatus('idle');
        };

        recognitionRef.current.onend = () => {
          if (status === 'listening') {
            handleSpeechEnd();
          }
        };
      }

      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || [];
        setVoices(availableVoices);
        // Try to find a good German voice, preferably male/neutral
        const deVoice = availableVoices.find(v => v.lang.startsWith('de') && (v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Premium')));
        if (deVoice) setSelectedVoice(deVoice);
        else if (availableVoices.length > 0) setSelectedVoice(availableVoices[0]);
      };
      
      loadVoices();
      if (synthRef.current?.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, transcript]);

  const toggleListening = () => {
    if (status === 'listening') {
      recognitionRef.current?.stop();
      setStatus('idle');
    } else {
      setTranscript('');
      try {
        recognitionRef.current?.start();
        setStatus('listening');
        // If speaking, stop it
        if (synthRef.current) synthRef.current.cancel();
      } catch (e) {
        console.error("Recognition already started or error:", e);
      }
    }
  };

  const handleSpeechEnd = async () => {
    setStatus('thinking');
    
    // Capture the final transcript
    const finalTranscript = transcript.trim();
    if (!finalTranscript) {
      setStatus('idle');
      return;
    }

    const newMessages = [...messages, { role: 'user', content: finalTranscript } as Message];
    setMessages(newMessages);
    setTranscript('');

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          systemPrompt: "Du bist Jarvis, ein hochentwickelter KI-Assistent, integriert in das Rezai Vision Agency OS CRM deines Benutzers. Antworte immer extrem kurz, präzise und professionell, als wärst du der JARVIS aus Iron Man. Keine langen Aufzählungen, sondern klare Ansagen."
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.text;
        
        setMessages([...newMessages, { role: 'assistant', content: reply }]);
        speakReply(reply);
      } else {
        throw new Error("API Error");
      }
    } catch (error) {
      console.error("Error communicating with Jarvis:", error);
      setMessages([...newMessages, { role: 'assistant', content: "Verbindung unterbrochen, Sir." }]);
      speakReply("Verbindung unterbrochen, Sir.");
    }
  };

  const speakReply = (text: string) => {
    if (isMuted || !synthRef.current) {
      setStatus('idle');
      return;
    }

    setStatus('speaking');
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    // Make it sound slightly more robotic/deep if possible
    utterance.pitch = 0.9;
    utterance.rate = 1.05;

    utterance.onend = () => {
      setStatus('idle');
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setStatus('idle');
    };

    synthRef.current.speak(utterance);
  };

  const clearHistory = () => {
    setMessages([]);
    setTranscript('');
    if (synthRef.current) synthRef.current.cancel();
    setStatus('idle');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-black/40 border border-white/5 rounded-3xl overflow-hidden relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqrw0hbr0/image/upload/v1716900898/grid_f3q9xj.svg')] bg-center opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Mic className="text-cyan-400" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-white tracking-widest uppercase">J.A.R.V.I.S.</h2>
            <p className="text-[10px] text-cyan-400/80 font-mono">Lokales Sprach-Interface v1.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={clearHistory}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Chat leeren"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title={isMuted ? "Stummschaltung aufheben" : "Stummschalten"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden z-10">
        
        {/* Visualizer Orb Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-b from-transparent to-cyan-900/10">
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Rings */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-cyan-500/20"
              animate={{ 
                rotate: 360,
                scale: status === 'speaking' ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity }
              }}
            />
            <motion.div 
              className="absolute inset-4 rounded-full border border-cyan-400/30 border-dashed"
              animate={{ 
                rotate: -360,
                scale: status === 'listening' ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
            />

            {/* Core Orb */}
            <motion.button
              onClick={toggleListening}
              className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                status === 'idle' ? 'bg-cyan-950 border-2 border-cyan-500/50 hover:bg-cyan-900' :
                status === 'listening' ? 'bg-cyan-600 border-2 border-cyan-300' :
                status === 'thinking' ? 'bg-purple-600 border-2 border-purple-300' :
                'bg-cyan-400 border-2 border-white'
              }`}
              animate={{
                boxShadow: status === 'idle' ? '0 0 20px rgba(6,182,212,0.2)' :
                           status === 'listening' ? ['0 0 20px rgba(6,182,212,0.5)', '0 0 60px rgba(6,182,212,0.8)', '0 0 20px rgba(6,182,212,0.5)'] :
                           status === 'thinking' ? ['0 0 20px rgba(168,85,247,0.5)', '0 0 40px rgba(168,85,247,0.8)', '0 0 20px rgba(168,85,247,0.5)'] :
                           ['0 0 40px rgba(34,211,238,0.6)', '0 0 80px rgba(34,211,238,1)', '0 0 40px rgba(34,211,238,0.6)']
              }}
              transition={{ duration: status === 'listening' || status === 'speaking' ? 1 : 2, repeat: Infinity }}
            >
              {status === 'idle' && <Mic size={32} className="text-cyan-300" />}
              {status === 'listening' && <div className="flex gap-1"><span className="w-2 h-2 bg-white rounded-full animate-bounce" /><span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}} /><span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}} /></div>}
              {status === 'thinking' && <RefreshCw size={32} className="text-white animate-spin" />}
              {status === 'speaking' && <Volume2 size={32} className="text-cyan-950" />}
            </motion.button>
          </div>

          <div className="mt-12 text-center h-16">
            {status === 'idle' && <p className="text-cyan-500/50 font-mono text-sm uppercase tracking-widest">System bereit. Orb klicken zum Sprechen.</p>}
            {status === 'listening' && <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest animate-pulse">Höre zu...</p>}
            {status === 'thinking' && <p className="text-purple-400 font-mono text-sm uppercase tracking-widest animate-pulse">Verarbeite Spracheingabe...</p>}
            {status === 'speaking' && <p className="text-cyan-300 font-mono text-sm uppercase tracking-widest animate-pulse">Audio-Ausgabe aktiv</p>}
          </div>

        </div>

        {/* Transcript / Chat Area */}
        <div className="flex-1 flex flex-col bg-black/20 relative">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kommunikations-Protokoll</h3>
          </div>
          
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.length === 0 && !transcript && (
              <div className="h-full flex items-center justify-center text-center opacity-30 grayscale">
                <div>
                  <Mic size={48} className="mx-auto mb-4" />
                  <p className="font-mono text-sm uppercase tracking-widest">Keine aktiven Protokolle</p>
                </div>
              </div>
            )}
            
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-50' 
                      : 'bg-white/5 border border-white/10 text-gray-300'
                  }`}>
                    <div className="flex items-center gap-2 mb-2 opacity-50">
                      {msg.role === 'user' ? <Mic size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      <span className="text-[10px] uppercase font-mono tracking-wider">
                        {msg.role === 'user' ? 'User' : 'Jarvis'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Live Transcript */}
              {transcript && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] rounded-2xl p-4 bg-cyan-500/5 border border-cyan-500/20 text-cyan-200/70 italic">
                    <p className="text-sm leading-relaxed">{transcript}...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Subtle Input alternative just in case mic fails */}
          <div className="p-4 border-t border-white/5">
            <p className="text-[10px] text-gray-500 font-mono text-center">
              Hinweis: Für ElevenLabs (Premium Stimme) wird ein API Key in den Einstellungen benötigt.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
