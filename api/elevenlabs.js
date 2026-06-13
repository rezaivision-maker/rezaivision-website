// api/elevenlabs.js
// ElevenLabs proxy: Text-to-Speech, Voice Listing, Voice Cloning info

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = process.env.ELEVENLABS_API_KEY;
  const BASE = 'https://api.elevenlabs.io/v1';
  const { action } = req.query;

  if (!API_KEY) {
    return res.status(503).json({
      error: 'ELEVENLABS_API_KEY nicht konfiguriert.',
      setup: [
        '1. Gehe zu elevenlabs.io und erstelle einen Account (Starter: kostenlos)',
        '2. Settings → API Keys → Create API Key',
        '3. In Vercel eintragen: ELEVENLABS_API_KEY=dein_key',
      ],
      configured: false,
    });
  }

  // ── List available voices ──
  if (action === 'voices' && req.method === 'GET') {
    const r = await fetch(`${BASE}/voices`, { headers: { 'xi-api-key': API_KEY } });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  // ── Get user subscription info ──
  if (action === 'subscription' && req.method === 'GET') {
    const r = await fetch(`${BASE}/user/subscription`, { headers: { 'xi-api-key': API_KEY } });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  // ── Text to Speech ──
  if (action === 'tts' && req.method === 'POST') {
    const {
      text,
      voiceId = 'EXAVITQu4vr4xnSDxMaL', // default: Sarah
      modelId = 'eleven_multilingual_v2',
      stability = 0.5,
      similarityBoost = 0.75,
      style = 0.0,
      useSpeakerBoost = true,
    } = req.body;

    if (!text) return res.status(400).json({ error: 'text is required' });
    if (text.length > 5000) return res.status(400).json({ error: 'Text zu lang. Max 5000 Zeichen.' });

    const ttsRes = await fetch(`${BASE}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: { stability, similarity_boost: similarityBoost, style, use_speaker_boost: useSpeakerBoost },
      }),
    });

    if (!ttsRes.ok) {
      const err = await ttsRes.json().catch(() => ({}));
      return res.status(ttsRes.status).json({ error: err?.detail?.message || 'ElevenLabs TTS Fehler' });
    }

    // Stream the audio back
    const audioBuffer = await ttsRes.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.byteLength);
    res.setHeader('Content-Disposition', 'inline; filename="voice.mp3"');
    return res.status(200).send(Buffer.from(audioBuffer));
  }

  // ── Batch TTS: generate multiple audio files ──
  if (action === 'batch-tts' && req.method === 'POST') {
    const { scripts, voiceId = 'EXAVITQu4vr4xnSDxMaL', modelId = 'eleven_multilingual_v2' } = req.body;

    if (!scripts || !Array.isArray(scripts)) {
      return res.status(400).json({ error: 'scripts array required' });
    }

    // Process up to 5 at a time to avoid rate limits
    const results = [];
    for (const script of scripts.slice(0, 5)) {
      try {
        const ttsRes = await fetch(`${BASE}/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          body: JSON.stringify({
            text: script.text.substring(0, 500), // limit per script
            model_id: modelId,
            voice_settings: { stability: 0.5, similarity_boost: 0.75 },
          }),
        });

        if (ttsRes.ok) {
          const buf = await ttsRes.arrayBuffer();
          const base64 = Buffer.from(buf).toString('base64');
          results.push({ id: script.id, success: true, audioBase64: base64 });
        } else {
          results.push({ id: script.id, success: false, error: 'TTS failed' });
        }
      } catch (e) {
        results.push({ id: script.id, success: false, error: e.message });
      }
    }

    return res.status(200).json({ results });
  }

  // ── Get voice clone info (how many samples needed etc.) ──
  if (action === 'clone-info' && req.method === 'GET') {
    return res.status(200).json({
      info: {
        instant_cloning: {
          audio_needed: '1+ Minuten hochwertiges Audio',
          quality: 'Sehr gut',
          speed: 'Sofort (< 30 Sekunden)',
          tip: 'Am besten: Sprich 2-3 Minuten natürlich, ohne Hintergrundgeräusche'
        },
        professional_cloning: {
          audio_needed: '30+ Minuten kuratiertes Audio',
          quality: 'Studio-Qualität',
          speed: '24-48 Stunden',
          tip: 'Nur für ElevenLabs Professional Plan verfügbar'
        },
        recording_tips: [
          'Ruhiger Raum ohne Hall (z.B. Kleiderschrank)',
          'Sprich in normalem Tempo, variiere die Betonung',
          'Kein Hintergrundmusik oder Lärm',
          'Nutze ein gutes Mikrofon oder AirPods Pro',
          '44.1kHz, 16-bit WAV oder MP3 über 128kbps',
          'Sprich verschiedene Satztypen: Fragen, Ausrufe, ruhige Passagen'
        ],
        api_endpoint: '/v1/voices/add',
        required_plan: 'Starter (11€/Monat) oder höher'
      }
    });
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
