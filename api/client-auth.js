// api/client-auth.js
// Magic Link authentication for client portal
// Clients receive an email with a one-click login link — no password needed

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;

  // This endpoint sends a "magic link" invite email to a client
  // The actual Firebase Auth magic link is handled client-side via sendSignInLinkToEmail
  // This endpoint handles sending a custom branded notification email

  if (action === 'send-invite' && req.method === 'POST') {
    const { clientEmail, clientName, projectTitle, projectId } = req.body;
    if (!clientEmail || !projectId) {
      return res.status(400).json({ error: 'clientEmail and projectId required' });
    }

    // The portal link - client clicks this and gets auto-logged in
    const portalUrl = `${process.env.VERCEL_URL || 'https://rezaivision.de'}/customer-login?email=${encodeURIComponent(clientEmail)}&project=${projectId}`;

    // We can use Firebase Firestore mail extension or Brevo to send this
    // For now, return the invite URL for manual sending or trigger via Firestore mail extension
    return res.status(200).json({
      success: true,
      inviteUrl: portalUrl,
      message: `Einladungslink für ${clientEmail} generiert.`,
      emailSubject: `Ihr Projekt bei Rezai Vision: ${projectTitle}`,
      emailBody: `
Hallo ${clientName || clientEmail},

Ihr Projekt "${projectTitle}" ist bereit für Ihre Ansicht.

Klicken Sie auf den folgenden Link, um sich einzuloggen und Ihr Konzept, Skript, die Shotlist und alle weiteren Details einzusehen:

${portalUrl}

Der Link ist personalisiert und nur für Sie bestimmt.

Mit freundlichen Grüßen,
Parsha Rezai
Rezai Vision – Premium Videoproduktion
www.rezaivision.de
      `.trim()
    });
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
