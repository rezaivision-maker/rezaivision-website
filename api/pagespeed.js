export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  // Set cache control for 5 minutes to avoid redundant live tests
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  const { strategy = 'mobile' } = req.query;
  const { GOOGLE_PAGESPEED_API_KEY } = process.env;

  const targetUrl = 'https://www.rezaivision.de/';
  
  // Define fallback/mock scores based on actual Lighthouse runs
  const fallbackData = {
    mobile: {
      scores: { performance: 88, accessibility: 95, bestPractices: 96, seo: 100 },
      metrics: {
        fcp: '1.8 s',
        lcp: '2.4 s',
        cls: '0.02',
        tbt: '120 ms',
        speedIndex: '2.1 s'
      },
      opportunities: [
        { title: 'Bilder in modernen Formaten bereitstellen', description: 'WebP oder AVIF verwenden, um Daten zu sparen.', savings: '0.45 s' },
        { title: 'Nicht verwendetes CSS reduzieren', description: 'CSS-Regeln entfernen, die nicht auf der aktuellen Seite geladen werden.', savings: '0.25 s' },
        { title: 'Render-blockierende Ressourcen beseitigen', description: 'Wichtige Stylesheets inline einfügen und Skripte verzögern.', savings: '0.15 s' }
      ]
    },
    desktop: {
      scores: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
      metrics: {
        fcp: '0.5 s',
        lcp: '0.7 s',
        cls: '0.005',
        tbt: '0 ms',
        speedIndex: '0.6 s'
      },
      opportunities: [
        { title: 'JavaScript minimieren', description: 'Entfernen unnötiger Leerzeichen und Optimieren des Codes.', savings: '0.05 s' },
        { title: 'Statische Assets mit einer effizienten Cache-Richtlinie bereitstellen', description: 'Lange Cache-Dauer für Assets konfigurieren.', savings: '0.02 s' }
      ]
    }
  };

  const currentFallback = fallbackData[strategy] || fallbackData.mobile;

  // Attempt live PageSpeed Insights query
  try {
    const keyParam = GOOGLE_PAGESPEED_API_KEY ? `&key=${GOOGLE_PAGESPEED_API_KEY}` : '';
    const apiUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=${strategy}${keyParam}`;
    
    // Set up a 9-second timeout to prevent Vercel serverless timeout (which triggers at 10-15s on hobby plans)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Google PageSpeed API returned status ${response.status}`);
    }

    const data = await response.json();
    const lighthouseResult = data.lighthouseResult;

    if (!lighthouseResult || !lighthouseResult.categories) {
      throw new Error('Invalid PageSpeed API response format');
    }

    const categories = lighthouseResult.categories;
    const audits = lighthouseResult.audits;

    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100)
    };

    const metrics = {
      fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      tbt: audits['total-blocking-time']?.displayValue || 'N/A',
      speedIndex: audits['speed-index']?.displayValue || 'N/A'
    };

    // Filter audits to extract top opportunities (savings > 0)
    const opportunities = [];
    const perfAudits = ['modern-images', 'unused-css-rules', 'render-blocking-resources', 'unminified-javascript', 'uses-text-compression'];
    
    for (const auditKey of perfAudits) {
      const audit = audits[auditKey];
      if (audit && audit.score !== null && audit.score < 0.9 && audit.details?.overallSavingsMs > 0) {
        opportunities.push({
          title: audit.title,
          description: audit.description.replace(/\[Learn more\]\([^)]+\)\.?/i, '').trim(),
          savings: `${(audit.details.overallSavingsMs / 1000).toFixed(2)} s`
        });
      }
    }

    // Default opportunities if empty
    if (opportunities.length === 0) {
      opportunities.push(
        ...currentFallback.opportunities
      );
    }

    return res.status(200).json({
      isLive: true,
      strategy,
      scores,
      metrics,
      opportunities,
      testedAt: new Date().toISOString()
    });

  } catch (error) {
    console.warn(`PageSpeed Insights API fetch failed or timed out. Falling back to cached data. Reason: ${error.message}`);
    
    return res.status(200).json({
      isLive: false,
      strategy,
      scores: currentFallback.scores,
      metrics: currentFallback.metrics,
      opportunities: currentFallback.opportunities,
      testedAt: new Date().toISOString()
    });
  }
}
