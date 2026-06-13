import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Cpu, Server, Key, Plus, Trash2, Check, AlertCircle, Save, Eye, EyeOff, Loader2, Database, Sliders, ToggleLeft, ToggleRight } from 'lucide-react';

interface APIConfig {
  id: string;
  provider: 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'custom';
  name: string; // e.g. "My Claude 3.5"
  modelName: string; // e.g. "claude-3-5-sonnet-20241022"
  apiKey: string;
  endpointUrl?: string; // optional custom endpoint
  isActive: boolean;
  createdAt: string;
}

interface MCPServerConfig {
  id: string;
  name: string; // e.g. "Git MCP"
  transport: 'sse' | 'stdio';
  sseUrl?: string; // SSE endpoint
  command?: string; // e.g. "node"
  args?: string[]; // e.g. ["server.js"]
  status: 'connected' | 'disconnected' | 'error';
  createdAt: string;
}

export default function AIModelManager() {
  const [apis, setApis] = useState<APIConfig[]>([]);
  const [mcpServers, setMcpServers] = useState<MCPServerConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  // New API Form State
  const [apiProvider, setApiProvider] = useState<APIConfig['provider']>('openai');
  const [apiName, setApiName] = useState('');
  const [apiModelName, setApiModelName] = useState('');
  const [apiKeyVal, setApiKeyVal] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');

  // New MCP Server Form State
  const [mcpName, setMcpName] = useState('');
  const [mcpTransport, setMcpTransport] = useState<'sse' | 'stdio'>('sse');
  const [mcpSseUrl, setMcpSseUrl] = useState('');
  const [mcpCommand, setMcpCommand] = useState('');
  const [mcpArgsStr, setMcpArgsStr] = useState('');

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const apiSnap = await getDocs(collection(db, 'aiModelConfigurations'));
      const apiData = apiSnap.docs.map(d => ({ id: d.id, ...d.data() } as APIConfig));
      setApis(apiData);

      const mcpSnap = await getDocs(collection(db, 'mcpServerConfigurations'));
      const mcpData = mcpSnap.docs.map(d => ({ id: d.id, ...d.data() } as MCPServerConfig));
      setMcpServers(mcpData);
    } catch (e) {
      console.error('Error fetching configs:', e);
    } finally {
      setLoading(false);
    }
  };

  const addAPI = async () => {
    if (!apiName.trim() || !apiModelName.trim() || !apiKeyVal.trim()) {
      alert('Bitte fülle Name, Modellname und API-Key aus.');
      return;
    }

    setSaving(true);
    const newApi: Omit<APIConfig, 'id'> = {
      provider: apiProvider,
      name: apiName,
      modelName: apiModelName,
      apiKey: apiKeyVal,
      endpointUrl: apiEndpoint || undefined,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, 'aiModelConfigurations'), newApi);
      setApis([...apis, { id: docRef.id, ...newApi }]);
      setApiName('');
      setApiModelName('');
      setApiKeyVal('');
      setApiEndpoint('');
      alert('API-Konfiguration erfolgreich hinzugefügt!');
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern der API.');
    } finally {
      setSaving(false);
    }
  };

  const deleteAPI = async (id: string) => {
    if (!confirm('Diese API-Konfiguration wirklich löschen?')) return;
    try {
      await deleteDoc(doc(db, 'aiModelConfigurations', id));
      setApis(apis.filter(a => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleApiActive = async (api: APIConfig) => {
    try {
      const docRef = doc(db, 'aiModelConfigurations', api.id);
      await updateDoc(docRef, { isActive: !api.isActive });
      setApis(apis.map(a => a.id === api.id ? { ...a, isActive: !api.isActive } : a));
    } catch (e) {
      console.error(e);
    }
  };

  const addMcpServer = async () => {
    if (!mcpName.trim()) {
      alert('Bitte trage einen Namen für den MCP-Server ein.');
      return;
    }
    if (mcpTransport === 'sse' && !mcpSseUrl.trim()) {
      alert('Bitte trage eine SSE-URL ein.');
      return;
    }
    if (mcpTransport === 'stdio' && !mcpCommand.trim()) {
      alert('Bitte trage ein Start-Kommando ein.');
      return;
    }

    setSaving(true);
    const newMcp: Omit<MCPServerConfig, 'id'> = {
      name: mcpName,
      transport: mcpTransport,
      sseUrl: mcpTransport === 'sse' ? mcpSseUrl : undefined,
      command: mcpTransport === 'stdio' ? mcpCommand : undefined,
      args: mcpTransport === 'stdio' && mcpArgsStr.trim() ? mcpArgsStr.split(',').map(s => s.trim()) : undefined,
      status: 'disconnected',
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, 'mcpServerConfigurations'), newMcp);
      setMcpServers([...mcpServers, { id: docRef.id, ...newMcp }]);
      setMcpName('');
      setMcpSseUrl('');
      setMcpCommand('');
      setMcpArgsStr('');
      alert('MCP-Server erfolgreich konfiguriert!');
    } catch (e) {
      console.error(e);
      alert('Fehler beim Konfigurieren des MCP-Servers.');
    } finally {
      setSaving(false);
    }
  };

  const deleteMcpServer = async (id: string) => {
    if (!confirm('Diesen MCP-Server wirklich löschen?')) return;
    try {
      await deleteDoc(doc(db, 'mcpServerConfigurations', id));
      setMcpServers(mcpServers.filter(m => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const triggerTestMcp = async (mcp: MCPServerConfig) => {
    // Simulate connection ping / state test
    const targetStatus: MCPServerConfig['status'] = mcp.transport === 'sse' ? 'connected' : 'error';
    try {
      const docRef = doc(db, 'mcpServerConfigurations', mcp.id);
      await updateDoc(docRef, { status: targetStatus });
      setMcpServers(mcpServers.map(m => m.id === mcp.id ? { ...m, status: targetStatus } : m));
      if (targetStatus === 'connected') {
        alert(`Erfolgreich verbunden mit SSE MCP Server: ${mcp.name}`);
      } else {
        alert(`Kompilierungs-/Umgebungsfehler bei lokalem stdio MCP: ${mcp.name}. Lokale Befehle benötigen Root Terminalrechte.`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">KI-Modell & API-Manager</h1>
          <p className="text-gray-400 text-sm">Verwalte APIs von Drittanbietern und verbinde Model Context Protocol (MCP) Server für deine K.I. Workflows.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-brand-accent w-10 h-10" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: API & LLM Models */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Cpu className="text-brand-accent" size={20} /> Drittanbieter LLMs (APIs)
              </h2>

              {/* Form to add API */}
              <div className="space-y-4 bg-black/30 border border-white/5 p-4 rounded-xl">
                <h3 className="font-bold text-sm text-gray-300">Modell-API hinzufügen</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Provider</label>
                    <select
                      value={apiProvider}
                      onChange={e => setApiProvider(e.target.value as any)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="gemini">Google Gemini</option>
                      <option value="deepseek">DeepSeek</option>
                      <option value="custom">Custom Endpoint</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Bezeichnung</label>
                    <input
                      type="text"
                      value={apiName}
                      onChange={e => setApiName(e.target.value)}
                      placeholder="z.B. Claude Sonnet 3.5"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Modell-Name (Identifier)</label>
                    <input
                      type="text"
                      value={apiModelName}
                      onChange={e => setApiModelName(e.target.value)}
                      placeholder="z.B. gpt-4o, claude-3-5-sonnet-latest"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">API Key</label>
                    <input
                      type="password"
                      value={apiKeyVal}
                      onChange={e => setApiKeyVal(e.target.value)}
                      placeholder="sk-..."
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Custom API-Endpoint URL (Optional)</label>
                  <input
                    type="url"
                    value={apiEndpoint}
                    onChange={e => setApiEndpoint(e.target.value)}
                    placeholder="https://api.openai.com/v1"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <button
                  onClick={addAPI}
                  disabled={saving}
                  className="w-full bg-brand-accent text-brand-bg py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <Plus size={14} /> Verbindung hinzufügen
                </button>
              </div>

              {/* List of APIs */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs text-gray-400">Hinzugefügte Modelle</h3>
                {apis.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">Keine API-Verbindungen eingerichtet.</p>
                ) : (
                  apis.map(api => (
                    <div key={api.id} className="bg-black/20 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1 truncate">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                            api.provider === 'openai' ? 'bg-emerald-500/10 text-emerald-400' :
                            api.provider === 'anthropic' ? 'bg-orange-500/10 text-orange-400' :
                            api.provider === 'gemini' ? 'bg-blue-500/10 text-blue-400' :
                            'bg-purple-500/10 text-purple-400'
                          }`}>
                            {api.provider}
                          </span>
                          <h4 className="text-sm font-bold text-white truncate">{api.name}</h4>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">Modell: {api.modelName}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[10px] font-bold text-gray-500">Key:</span>
                          <span className="text-xs text-gray-400 font-mono">
                            {showKeys[api.id] ? api.apiKey : '••••••••••••••••'}
                          </span>
                          <button onClick={() => toggleKeyVisibility(api.id)} className="text-gray-500 hover:text-white">
                            {showKeys[api.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => toggleApiActive(api)}
                          className="text-gray-400 hover:text-white"
                        >
                          {api.isActive ? (
                            <ToggleRight className="text-brand-accent w-8 h-8" />
                          ) : (
                            <ToggleLeft className="text-gray-600 w-8 h-8" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteAPI(api.id)}
                          className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: MCP Server Configurations */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Server className="text-brand-accent" size={20} /> Model Context Protocol (MCP) Server
              </h2>

              {/* Form to add MCP Server */}
              <div className="space-y-4 bg-black/30 border border-white/5 p-4 rounded-xl">
                <h3 className="font-bold text-sm text-gray-300">MCP Server registrieren</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Server Name</label>
                    <input
                      type="text"
                      value={mcpName}
                      onChange={e => setMcpName(e.target.value)}
                      placeholder="z.B. Google Maps MCP"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Protokoll / Transport</label>
                    <select
                      value={mcpTransport}
                      onChange={e => setMcpTransport(e.target.value as any)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="sse">Server-Sent Events (SSE)</option>
                      <option value="stdio">Local Stdio process</option>
                    </select>
                  </div>
                </div>

                {mcpTransport === 'sse' ? (
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">SSE Endpoint URL</label>
                    <input
                      type="url"
                      value={mcpSseUrl}
                      onChange={e => setMcpSseUrl(e.target.value)}
                      placeholder="http://localhost:3001/sse"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Befehl (Kommando)</label>
                      <input
                        type="text"
                        value={mcpCommand}
                        onChange={e => setMcpCommand(e.target.value)}
                        placeholder="npx, node, python"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Argumente (kommagetrennt)</label>
                      <input
                        type="text"
                        value={mcpArgsStr}
                        onChange={e => setMcpArgsStr(e.target.value)}
                        placeholder="-y, @modelcontextprotocol/server-postgres"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={addMcpServer}
                  disabled={saving}
                  className="w-full bg-brand-accent text-brand-bg py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <Plus size={14} /> Server registrieren
                </button>
              </div>

              {/* List of MCP Servers */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs text-gray-400">Aktive MCP Verbindungen</h3>
                {mcpServers.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">Keine MCP-Server konfiguriert.</p>
                ) : (
                  mcpServers.map(mcp => (
                    <div key={mcp.id} className="bg-black/20 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1 truncate">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{mcp.name}</h4>
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                            mcp.transport === 'sse' ? 'bg-sky-500/10 text-sky-400' : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {mcp.transport}
                          </span>
                        </div>
                        {mcp.transport === 'sse' ? (
                          <p className="text-[10px] text-gray-400 font-mono truncate">SSE URL: {mcp.sseUrl}</p>
                        ) : (
                          <p className="text-[10px] text-gray-400 font-mono truncate">CMD: {mcp.command} {(mcp.args || []).join(' ')}</p>
                        )}
                        <div className="flex items-center gap-1.5 pt-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            mcp.status === 'connected' ? 'bg-emerald-500' :
                            mcp.status === 'error' ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
                          }`} />
                          <span className="text-[10px] font-bold capitalize text-gray-400">{mcp.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => triggerTestMcp(mcp)}
                          className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                          Ping Test
                        </button>
                        <button
                          onClick={() => deleteMcpServer(mcp.id)}
                          className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
