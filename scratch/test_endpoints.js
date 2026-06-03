import analyticsHandler from '../api/analytics.js';
import searchConsoleHandler from '../api/search-console.js';
import pagespeedHandler from '../api/pagespeed.js';

// Mock response object
const makeMockRes = (resolve) => ({
  statusCode: 200,
  body: null,
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    this.body = data;
    resolve(this);
    return this;
  },
  send: function(data) {
    this.body = data;
    resolve(this);
    return this;
  },
  setHeader: function(key, value) {
    // mock headers
    return this;
  }
});

async function runTests() {
  console.log("Testing api/analytics.js...");
  const analyticsRes = await new Promise(resolve => {
    analyticsHandler({}, makeMockRes(resolve));
  });
  console.log("Analytics response status:", analyticsRes.statusCode);
  console.log("Analytics content keys:", Object.keys(analyticsRes.body));
  console.log("isConnected:", analyticsRes.body.isConnected);

  console.log("\nTesting api/search-console.js...");
  const gscRes = await new Promise(resolve => {
    searchConsoleHandler({}, makeMockRes(resolve));
  });
  console.log("Search Console response status:", gscRes.statusCode);
  console.log("GSC content keys:", Object.keys(gscRes.body));
  console.log("isConnected:", gscRes.body.isConnected);

  console.log("\nTesting api/pagespeed.js...");
  const psRes = await new Promise(resolve => {
    pagespeedHandler({ query: { strategy: 'mobile' } }, makeMockRes(resolve));
  });
  console.log("PageSpeed response status:", psRes.statusCode);
  console.log("PageSpeed content keys:", Object.keys(psRes.body));
  console.log("isLive:", psRes.body.isLive);
}

runTests().catch(console.error);
