import crypto from 'crypto';
import fs from 'fs';

async function getGoogleAuthToken(email, privateKey, scopes) {
  const cleanPrivateKey = privateKey.replace(/\\n/g, '\n');
  const header = { alg: 'RS256', typ: 'JWT' };
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
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt })
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch token: ${await response.text()}`);
  }
  const data = await response.json();
  return data.access_token;
}

async function run() {
  const envText = fs.readFileSync('.env', 'utf-8');
  let email = '';
  let key = '';
  let propId = '';
  for (const line of envText.split('\n')) {
    if (line.startsWith('GOOGLE_SERVICE_ACCOUNT_EMAIL=')) {
      email = line.split('=')[1].replace(/^"|"$/g, '');
    }
    if (line.startsWith('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=')) {
      key = line.split('="')[1].replace(/"$/, '');
    }
    if (line.startsWith('GA4_PROPERTY_ID=')) {
      propId = line.split('=')[1].replace(/^"|"$/g, '');
    }
  }

  try {
    const token = await getGoogleAuthToken(email, key, ['https://www.googleapis.com/auth/analytics.readonly']);
    console.log("Token success");
    const analyticsUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propId}:runReport`;
    const response = await fetch(analyticsUrl, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }]
      })
    });
    if (!response.ok) {
      console.error("API call failed:", await response.text());
    } else {
      console.log("API call succeeded:", await response.json());
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
