const crypto = require('crypto');

const GA4_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GA4_REPORT_ENDPOINT = (propertyId) =>
  `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
const GA4_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

const base64UrlEncode = (value) => Buffer.from(value).toString('base64url');

const createGa4Jwt = ({ clientEmail, privateKey }) => {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: clientEmail,
      scope: GA4_SCOPE,
      aud: GA4_TOKEN_ENDPOINT,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${payload}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  signer.end();
  const signature = signer.sign(privateKey);
  return `${signingInput}.${signature.toString('base64url')}`;
};

const fetchGa4AccessToken = async ({ clientEmail, privateKey }) => {
  const assertion = createGa4Jwt({ clientEmail, privateKey });
  const response = await fetch(GA4_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GA4 auth failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
};

const runGa4Report = async ({ accessToken, propertyId, startDate, endDate }) => {
  const response = await fetch(GA4_REPORT_ENDPOINT(propertyId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'totalUsers' }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GA4 report failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const value = data?.rows?.[0]?.metricValues?.[0]?.value;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

const fetchVisitorStats = async (reporter) => {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GA4_PRIVATE_KEY;
  const totalStartDate = process.env.GA4_TOTAL_START_DATE || '2020-01-01';

  if (typeof fetch !== 'function') {
    reporter.warn('Fetch API unavailable; visitor stats are disabled.');
    return { today: null, total: null, source: 'no-fetch' };
  }

  if (!propertyId || !clientEmail || !privateKeyRaw) {
    reporter.info('GA4 env vars missing; visitor stats are disabled.');
    return { today: null, total: null, source: 'unconfigured' };
  }

  if (process.env.NODE_ENV !== 'production' && !process.env.GA4_FETCH_IN_DEV) {
    return { today: null, total: null, source: 'development' };
  }

  try {
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
    const accessToken = await fetchGa4AccessToken({ clientEmail, privateKey });
    const [today, total] = await Promise.all([
      runGa4Report({ accessToken, propertyId, startDate: 'today', endDate: 'today' }),
      runGa4Report({ accessToken, propertyId, startDate: totalStartDate, endDate: 'today' }),
    ]);
    return { today, total, source: 'ga4' };
  } catch (error) {
    reporter.warn(`GA4 data fetch failed: ${error.message}`);
    return { today: null, total: null, source: 'error' };
  }
};

module.exports = {
  fetchVisitorStats,
};
