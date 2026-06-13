import crypto from 'crypto';

// Helper to generate realistic search history over the last 30 days
function generateSearchHistory() {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().split('T')[0];
    
    const dayOfWeek = date.getDay();
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    
    const baseClicks = isWeekend ? 15 : 35;
    const randomVarClicks = Math.floor(Math.random() * 8) - 4;
    const clicks = Math.max(5, baseClicks + randomVarClicks);
    const impressions = Math.floor(clicks * (25 + Math.random() * 10));
    
    data.push({
      date: dateString,
      clicks,
      impressions
    });
  }
  return data;
}

async function getGoogleAuthToken(email, privateKey, scopes) {
  const cleanPrivateKey = privateKey.replace(/\\n/g, '\n');
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64Encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsignedToken = `${base64Encode(header)}.${base64Encode(claim)}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(cleanPrivateKey, 'base64url');
  const jwt = `${unsignedToken}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to fetch Google Auth token: ${errorData}`);
  }

  const data = await response.json();
  return data.access_token;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    SITE_URL
  } = process.env;

  const targetSiteUrl = SITE_URL || 'sc-domain:rezaivision.de';
  const isConnected = !!(GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);

  if (isConnected) {
    try {
      const accessToken = await getGoogleAuthToken(
        GOOGLE_SERVICE_ACCOUNT_EMAIL,
        GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        ['https://www.googleapis.com/auth/webmasters.readonly']
      );

      // Query Search Console data for last 30 days
      const sscUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(targetSiteUrl)}/searchAnalytics/query`;
      
      // 1. Get totals
      const totalsResponse = await fetch(sscUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: '30daysAgo',
          endDate: 'today',
          dimensions: ['country'] // arbitrary dimension to get aggregated results
        })
      });

      let totalClicks = 0;
      let totalImpressions = 0;
      let avgCtr = 0;
      let avgPosition = 0;

      if (totalsResponse.ok) {
        const totalsData = await totalsResponse.json();
        const rows = totalsData.rows || [];
        rows.forEach(row => {
          totalClicks += row.clicks || 0;
          totalImpressions += row.impressions || 0;
          avgCtr += row.ctr || 0;
          avgPosition += row.position || 0;
        });
        if (rows.length > 0) {
          avgCtr = (avgCtr / rows.length) * 100;
          avgPosition = avgPosition / rows.length;
        }
      }

      // 2. Get history by date
      const historyResponse = await fetch(sscUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: '30daysAgo',
          endDate: 'today',
          dimensions: ['date'],
          rowLimit: 100
        })
      });

      let history = [];
      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        history = (historyData.rows || []).map(row => ({
          date: row.keys[0],
          clicks: row.clicks,
          impressions: row.impressions
        })).sort((a, b) => a.date.localeCompare(b.date));
      }

      // 3. Get top search queries
      const queriesResponse = await fetch(sscUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: '30daysAgo',
          endDate: 'today',
          dimensions: ['query'],
          rowLimit: 15
        })
      });

      let keywords = [];
      if (queriesResponse.ok) {
        const queriesData = await queriesResponse.json();
        keywords = (queriesData.rows || []).map(row => ({
          query: row.keys[0],
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: parseFloat((row.ctr * 100).toFixed(1)),
          position: parseFloat(row.position.toFixed(1))
        }));
      }

      return res.status(200).json({
        isConnected: true,
        siteUrl: targetSiteUrl,
        totalClicks,
        totalImpressions,
        avgCtr: parseFloat(avgCtr.toFixed(1)),
        avgPosition: parseFloat(avgPosition.toFixed(1)),
        history,
        keywords
      });

    } catch (error) {
      console.error('Google Search Console API error, falling back to mock data:', error);
    }
  }

  // Fallback / Mock Data Mode
  const mockHistory = generateSearchHistory();
  const totalClicks = mockHistory.reduce((sum, d) => sum + d.clicks, 0);
  const totalImpressions = mockHistory.reduce((sum, d) => sum + d.impressions, 0);
  const avgCtr = parseFloat(((totalClicks / totalImpressions) * 100).toFixed(1));

  const mockKeywords = [
    { query: 'videoproduktion kaiserslautern', clicks: Math.floor(totalClicks * 0.35), impressions: Math.floor(totalImpressions * 0.30), ctr: 8.5, position: 1.2 },
    { query: 'imagefilm kosten rlp', clicks: Math.floor(totalClicks * 0.18), impressions: Math.floor(totalImpressions * 0.15), ctr: 5.2, position: 2.1 },
    { query: 'recruiting video pfalz', clicks: Math.floor(totalClicks * 0.12), impressions: Math.floor(totalImpressions * 0.10), ctr: 4.8, position: 1.8 },
    { query: 'unternehmensvideo erstellen kaiserslautern', clicks: Math.floor(totalClicks * 0.08), impressions: Math.floor(totalImpressions * 0.08), ctr: 3.5, position: 2.4 },
    { query: 'social media flatrate pfalz', clicks: Math.floor(totalClicks * 0.07), impressions: Math.floor(totalImpressions * 0.05), ctr: 6.1, position: 1.5 },
    { query: 'hochzeitsvideo kaiserslautern', clicks: Math.floor(totalClicks * 0.06), impressions: Math.floor(totalImpressions * 0.12), ctr: 2.1, position: 3.5 },
    { query: 'musikvideo produktion rlp', clicks: Math.floor(totalClicks * 0.05), impressions: Math.floor(totalImpressions * 0.06), ctr: 3.1, position: 2.8 },
    { query: 'werbevideo kaiserslautern', clicks: Math.floor(totalClicks * 0.04), impressions: Math.floor(totalImpressions * 0.04), ctr: 4.0, position: 2.2 },
    { query: 'rezai vision', clicks: Math.floor(totalClicks * 0.03), impressions: Math.floor(totalImpressions * 0.02), ctr: 12.5, position: 1.0 },
    { query: 'reza e motion', clicks: Math.floor(totalClicks * 0.02), impressions: Math.floor(totalImpressions * 0.02), ctr: 10.0, position: 1.1 }
  ];

  return res.status(200).json({
    isConnected: false,
    siteUrl: targetSiteUrl,
    totalClicks,
    totalImpressions,
    avgCtr,
    avgPosition: 2.1,
    history: mockHistory,
    keywords: mockKeywords
  });
}
