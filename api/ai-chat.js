// api/ai-chat.js
// Upgraded to support:
// - Gemini 1.5 Pro (for video understanding via YouTube URLs)
// - Gemini 2.0 Flash (for fast text tasks)
// - Video URL analysis via YouTube URI parts
// - Image analysis via base64 or URL

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, systemInstruction, videoUrl, imageUrl, model: requestedModel } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  // Choose model: video analysis needs Pro, fast text uses Flash
  let model = 'gemini-2.0-flash';
  if (videoUrl || requestedModel === 'pro') {
    model = 'gemini-1.5-pro';
  } else if (requestedModel) {
    model = requestedModel;
  }

  try {
    // Build the parts array for the request
    const parts = [];

    // If a YouTube URL is provided, add it as a file_data part (Gemini native video understanding)
    if (videoUrl) {
      // Check if it's a YouTube URL (Gemini supports youtube.com and youtu.be)
      const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
      
      if (isYouTube) {
        parts.push({
          file_data: {
            mime_type: 'video/mp4',
            file_uri: videoUrl,
          }
        });
      } else {
        // For non-YouTube video URLs, add as text context
        parts.push({ text: `[Analyse dieses Videos: ${videoUrl}]` });
      }
    }

    // If an image URL is provided, fetch and include it
    if (imageUrl && !videoUrl) {
      try {
        const imgRes = await fetch(imageUrl);
        const imgBuffer = await imgRes.arrayBuffer();
        const base64 = Buffer.from(imgBuffer).toString('base64');
        const mimeType = imgRes.headers.get('content-type') || 'image/jpeg';
        parts.push({
          inline_data: { mime_type: mimeType, data: base64 }
        });
      } catch (e) {
        console.warn('Could not fetch image:', e);
      }
    }

    // Add the text prompt
    parts.push({ text: prompt });

    const payload = {
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      }
    };

    if (systemInstruction) {
      payload.system_instruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Gemini API Error (${model}):`, errorData);

      // If Pro model fails, retry with Flash
      if (model === 'gemini-1.5-pro' && !videoUrl) {
        console.log('Retrying with gemini-2.0-flash...');
        payload.contents[0].parts = [{ text: prompt }];
        const fallbackRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
        );
        const fallbackData = await fallbackRes.json();
        const fallbackText = fallbackData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Keine Antwort generiert.';
        return res.status(200).json({ reply: fallbackText, model: 'gemini-2.0-flash-fallback' });
      }

      return res.status(response.status).json({ error: 'Failed to fetch from AI', details: errorData.substring(0, 500) });
    }

    const data = await response.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Keine Antwort generiert.';

    return res.status(200).json({ reply: textResponse, model });

  } catch (error) {
    console.error('Error communicating with AI:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
