// api/higgsfield.js
// Serverless proxy for Higgsfield AI API
// Keeps API key on server, handles async polling

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.HIGGSFIELD_API_KEY;

  if (!apiKey) {
    // Return a helpful error with setup instructions
    return res.status(503).json({ 
      error: 'HIGGSFIELD_API_KEY not configured.',
      setup: 'Add HIGGSFIELD_API_KEY to your Vercel Environment Variables. Get your key at cloud.higgsfield.ai → Settings → API Keys.'
    });
  }

  const { action } = req.query;

  try {
    // --- ACTION: Generate video (text-to-video or image-to-video) ---
    if (action === 'generate' && req.method === 'POST') {
      const { prompt, imageUrl, mode = 'text-to-video', duration = 4, aspectRatio = '16:9' } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'prompt is required.' });
      }

      // Build the request payload based on Higgsfield API spec
      const payload = {
        prompt,
        duration,
        aspect_ratio: aspectRatio,
      };

      if (imageUrl && mode === 'image-to-video') {
        payload.image_url = imageUrl;
      }

      const higgsRes = await fetch('https://api.higgsfield.ai/v1/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!higgsRes.ok) {
        const errText = await higgsRes.text();
        console.error('Higgsfield API error:', errText);
        return res.status(higgsRes.status).json({ 
          error: 'Higgsfield API returned an error.', 
          details: errText 
        });
      }

      const data = await higgsRes.json();
      return res.status(200).json(data);
    }

    // --- ACTION: Poll job status ---
    if (action === 'status' && req.method === 'GET') {
      const { jobId } = req.query;
      if (!jobId) return res.status(400).json({ error: 'jobId is required.' });

      const statusRes = await fetch(`https://api.higgsfield.ai/v1/video/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!statusRes.ok) {
        return res.status(statusRes.status).json({ error: 'Failed to get job status.' });
      }

      const data = await statusRes.json();
      return res.status(200).json(data);
    }

    // --- ACTION: List models ---
    if (action === 'models' && req.method === 'GET') {
      // Return static list of supported models with descriptions
      return res.status(200).json({
        models: [
          { id: 'higgsfield-v1', name: 'Higgsfield V1', description: 'Cinematic video generation, strong on character consistency.', type: 'text-to-video' },
          { id: 'higgsfield-v1-img', name: 'Higgsfield V1 (Image-to-Video)', description: 'Animate your own images or photos with cinematic motion.', type: 'image-to-video' },
          { id: 'soul-mode', name: 'Soul Mode', description: 'Character-consistent video from a reference portrait photo.', type: 'image-to-video' },
        ]
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}. Use generate, status, or models.` });

  } catch (error) {
    console.error('Higgsfield proxy error:', error);
    return res.status(500).json({ error: 'Internal server error in Higgsfield proxy.' });
  }
}
