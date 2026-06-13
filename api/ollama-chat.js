export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { model, messages } = req.body;

    if (!model || !messages) {
      return res.status(400).json({ error: 'Missing model or messages' });
    }

    // Proxy request to local Ollama instance running on port 11434
    // NOTE: This will only work locally during development (npm run dev) 
    // unless Ollama is exposed to the public internet (not recommended).
    const ollamaRes = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false // For simplicity, we wait for full response
      }),
    });

    if (!ollamaRes.ok) {
      const errorText = await ollamaRes.text();
      console.error("Ollama API Error:", errorText);
      return res.status(ollamaRes.status).json({ error: 'Failed to communicate with local Ollama server' });
    }

    const data = await ollamaRes.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Ollama Handler Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error. Is Ollama running on your Mac? Start it with "brew services start ollama".' 
    });
  }
}
