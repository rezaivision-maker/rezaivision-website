// api/meta-ads.js
// Serverless proxy for Meta Marketing API (create campaigns) + Ad Library API (competitor research)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID; // e.g. "act_123456789"
  const PAGE_ID = process.env.META_PAGE_ID;
  const GRAPH_VERSION = 'v21.0';
  const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

  // ── Helper: check config ──
  const requireConfig = (fields) => {
    const missing = fields.filter(f => {
      if (f === 'ACCESS_TOKEN') return !ACCESS_TOKEN;
      if (f === 'AD_ACCOUNT_ID') return !AD_ACCOUNT_ID;
      if (f === 'PAGE_ID') return !PAGE_ID;
    });
    return missing.length > 0 ? missing : null;
  };

  try {

    // ════════════════════════════════════════
    // ACTION: Search Meta Ad Library (public, no auth needed for basic search)
    // ════════════════════════════════════════
    if (action === 'ad-library-search' && req.method === 'POST') {
      const { query, country = 'DE', adCategory = 'ALL', limit = 20 } = req.body;
      if (!query) return res.status(400).json({ error: 'query is required' });

      // Ad Library API requires a user access token but it's free to get
      const token = ACCESS_TOKEN || process.env.META_APP_TOKEN;
      if (!token) {
        return res.status(503).json({
          error: 'META_ACCESS_TOKEN not configured.',
          setup: [
            '1. Gehe zu developers.facebook.com → Deine App → Tools → Graph API Explorer',
            '2. Generiere ein User Access Token mit Berechtigung "ads_read"',
            '3. Füge es in Vercel ein als: META_ACCESS_TOKEN=dein_token',
          ],
          fallback: 'Du kannst die Ad Library auch manuell unter facebook.com/ads/library durchsuchen.'
        });
      }

      const params = new URLSearchParams({
        access_token: token,
        ad_type: 'ALL',
        ad_reached_countries: `["${country}"]`,
        search_terms: query,
        ad_active_status: 'ALL',
        fields: 'id,ad_creation_time,ad_delivery_start_time,ad_creative_bodies,ad_creative_link_captions,ad_creative_link_descriptions,ad_creative_link_titles,ad_snapshot_url,currency,funding_entity,page_id,page_name,impressions,spend',
        limit: String(limit),
      });

      const adLibRes = await fetch(`${GRAPH_BASE}/ads_archive?${params.toString()}`);
      const data = await adLibRes.json();

      if (data.error) {
        return res.status(400).json({ error: data.error.message, type: data.error.type });
      }

      return res.status(200).json(data);
    }

    // ════════════════════════════════════════
    // ACTION: Get own Instagram Insights
    // ════════════════════════════════════════
    if (action === 'instagram-insights' && req.method === 'GET') {
      const missing = requireConfig(['ACCESS_TOKEN', 'PAGE_ID']);
      if (missing) {
        return res.status(503).json({
          error: `Fehlende Konfiguration: ${missing.join(', ')}`,
          setup: 'Konfiguriere META_ACCESS_TOKEN und META_PAGE_ID in deinen Vercel Environment Variables.'
        });
      }

      // Get Instagram Business Account linked to Page
      const igRes = await fetch(`${GRAPH_BASE}/${PAGE_ID}?fields=instagram_business_account&access_token=${ACCESS_TOKEN}`);
      const igData = await igRes.json();

      if (!igData.instagram_business_account) {
        return res.status(400).json({ error: 'Kein Instagram Business Account mit dieser Facebook Page verknüpft.' });
      }

      const igAccountId = igData.instagram_business_account.id;

      // Get account insights
      const insightsRes = await fetch(
        `${GRAPH_BASE}/${igAccountId}/insights?metric=reach,impressions,profile_views,follower_count&period=day&since=${Math.floor(Date.now()/1000) - 30*24*60*60}&until=${Math.floor(Date.now()/1000)}&access_token=${ACCESS_TOKEN}`
      );
      const insightsData = await insightsRes.json();

      // Get recent media
      const mediaRes = await fetch(
        `${GRAPH_BASE}/${igAccountId}/media?fields=id,caption,like_count,comments_count,media_type,timestamp,permalink&limit=10&access_token=${ACCESS_TOKEN}`
      );
      const mediaData = await mediaRes.json();

      return res.status(200).json({
        accountId: igAccountId,
        insights: insightsData.data || [],
        recentMedia: mediaData.data || []
      });
    }

    // ════════════════════════════════════════
    // ACTION: Create Campaign
    // ════════════════════════════════════════
    if (action === 'create-campaign' && req.method === 'POST') {
      const missing = requireConfig(['ACCESS_TOKEN', 'AD_ACCOUNT_ID']);
      if (missing) {
        return res.status(503).json({
          error: `Fehlende Konfiguration: ${missing.join(', ')}`,
          setup: [
            '1. META_ACCESS_TOKEN: Graph API Explorer → User Token mit ads_management Berechtigung',
            '2. META_AD_ACCOUNT_ID: In Ads Manager findest du deine Account ID (Format: act_XXXXXXXX)',
          ]
        });
      }

      const { name, objective = 'OUTCOME_LEADS', status = 'PAUSED', specialAdCategory = 'NONE' } = req.body;
      if (!name) return res.status(400).json({ error: 'Campaign name is required' });

      const campaignRes = await fetch(`${GRAPH_BASE}/${AD_ACCOUNT_ID}/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          objective,
          status,
          special_ad_categories: [specialAdCategory],
          access_token: ACCESS_TOKEN,
        }),
      });

      const data = await campaignRes.json();
      if (data.error) return res.status(400).json({ error: data.error.message });
      return res.status(200).json(data);
    }

    // ════════════════════════════════════════
    // ACTION: Create Ad Set
    // ════════════════════════════════════════
    if (action === 'create-adset' && req.method === 'POST') {
      const missing = requireConfig(['ACCESS_TOKEN', 'AD_ACCOUNT_ID']);
      if (missing) return res.status(503).json({ error: `Fehlende Konfiguration: ${missing.join(', ')}` });

      const {
        campaignId,
        name,
        dailyBudget = 1000, // in Cents (€10.00)
        targetCountries = ['DE'],
        ageMin = 25,
        ageMax = 55,
        billingEvent = 'IMPRESSIONS',
        bidStrategy = 'LOWEST_COST_WITHOUT_CAP',
        optimizationGoal = 'LEAD_GENERATION',
        startTime,
        endTime,
        targeting = {}
      } = req.body;

      if (!campaignId) return res.status(400).json({ error: 'campaignId is required' });

      const adSetRes = await fetch(`${GRAPH_BASE}/${AD_ACCOUNT_ID}/adsets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          campaign_id: campaignId,
          daily_budget: dailyBudget,
          billing_event: billingEvent,
          bid_strategy: bidStrategy,
          optimization_goal: optimizationGoal,
          status: 'PAUSED',
          start_time: startTime || new Date().toISOString(),
          targeting: {
            geo_locations: { countries: targetCountries },
            age_min: ageMin,
            age_max: ageMax,
            ...targeting,
          },
          access_token: ACCESS_TOKEN,
        }),
      });

      const data = await adSetRes.json();
      if (data.error) return res.status(400).json({ error: data.error.message });
      return res.status(200).json(data);
    }

    // ════════════════════════════════════════
    // ACTION: Create Ad (with text creative)
    // ════════════════════════════════════════
    if (action === 'create-ad' && req.method === 'POST') {
      const missing = requireConfig(['ACCESS_TOKEN', 'AD_ACCOUNT_ID', 'PAGE_ID']);
      if (missing) return res.status(503).json({ error: `Fehlende Konfiguration: ${missing.join(', ')}` });

      const {
        adSetId,
        name,
        primaryText,
        headline,
        description,
        linkUrl,
        imageUrl,
        callToAction = 'LEARN_MORE',
      } = req.body;

      if (!adSetId || !primaryText || !headline || !linkUrl) {
        return res.status(400).json({ error: 'adSetId, primaryText, headline, linkUrl are required' });
      }

      // Step 1: Create ad creative
      const creative = {
        name: `Creative: ${name}`,
        object_story_spec: {
          page_id: PAGE_ID,
          link_data: {
            message: primaryText,
            link: linkUrl,
            name: headline,
            description: description || '',
            call_to_action: { type: callToAction },
          },
        },
        access_token: ACCESS_TOKEN,
      };

      if (imageUrl) {
        creative.object_story_spec.link_data.picture = imageUrl;
      }

      const creativeRes = await fetch(`${GRAPH_BASE}/${AD_ACCOUNT_ID}/adcreatives`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creative),
      });
      const creativeData = await creativeRes.json();
      if (creativeData.error) return res.status(400).json({ error: creativeData.error.message, step: 'creative' });

      // Step 2: Create ad
      const adRes = await fetch(`${GRAPH_BASE}/${AD_ACCOUNT_ID}/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          adset_id: adSetId,
          creative: { creative_id: creativeData.id },
          status: 'PAUSED',
          access_token: ACCESS_TOKEN,
        }),
      });
      const adData = await adRes.json();
      if (adData.error) return res.status(400).json({ error: adData.error.message, step: 'ad' });

      return res.status(200).json({ adId: adData.id, creativeId: creativeData.id, status: 'PAUSED' });
    }

    // ════════════════════════════════════════
    // ACTION: List campaigns
    // ════════════════════════════════════════
    if (action === 'list-campaigns' && req.method === 'GET') {
      const missing = requireConfig(['ACCESS_TOKEN', 'AD_ACCOUNT_ID']);
      if (missing) return res.status(503).json({ error: `Fehlende Konfiguration: ${missing.join(', ')}` });

      const campRes = await fetch(
        `${GRAPH_BASE}/${AD_ACCOUNT_ID}/campaigns?fields=id,name,status,objective,daily_budget,spend_cap,created_time&limit=25&access_token=${ACCESS_TOKEN}`
      );
      const data = await campRes.json();
      if (data.error) return res.status(400).json({ error: data.error.message });
      return res.status(200).json(data);
    }

    // ════════════════════════════════════════
    // ACTION: Get Ad Account insights
    // ════════════════════════════════════════
    if (action === 'account-insights' && req.method === 'GET') {
      const missing = requireConfig(['ACCESS_TOKEN', 'AD_ACCOUNT_ID']);
      if (missing) return res.status(503).json({ error: `Fehlende Konfiguration: ${missing.join(', ')}` });

      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const until = new Date().toISOString().split('T')[0];

      const insRes = await fetch(
        `${GRAPH_BASE}/${AD_ACCOUNT_ID}/insights?fields=impressions,clicks,spend,reach,cpm,cpc,ctr,actions&time_range={"since":"${since}","until":"${until}"}&access_token=${ACCESS_TOKEN}`
      );
      const data = await insRes.json();
      if (data.error) return res.status(400).json({ error: data.error.message });
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });

  } catch (error) {
    console.error('Meta Ads API proxy error:', error);
    return res.status(500).json({ error: 'Internal server error in Meta Ads proxy.' });
  }
}
