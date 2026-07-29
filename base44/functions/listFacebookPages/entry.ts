import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Facebook's "New Pages Experience" returns an empty /me/accounts edge even when
// Pages were explicitly granted during OAuth. Querying each granted Page node
// directly still returns a valid Page access token, so we fall back to that.
const KNOWN_PAGE_IDS = [
  '479143628835632', // Austin Wealth Management
  '201778773221996', // Greenspoint Dental
];

const GRAPH = 'https://graph.facebook.com/v25.0';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('facebook_pages');
    const headers = { Authorization: `Bearer ${accessToken}` };

    // Standard enumeration first (works for classic Pages).
    const accountsRes = await fetch(`${GRAPH}/me/accounts?fields=id,name,access_token,picture{url}`, { headers });
    const accountsData = await accountsRes.json();
    if (accountsData.error) return Response.json({ error: accountsData.error.message }, { status: 400 });

    let pages = (accountsData.data || []).map((p) => ({
      id: p.id,
      name: p.name,
      access_token: p.access_token,
      picture: p.picture?.url || null
    }));

    // Fallback for New Pages Experience: resolve each known Page node directly.
    if (pages.length === 0) {
      const resolved = await Promise.all(KNOWN_PAGE_IDS.map(async (id) => {
        try {
          const r = await (await fetch(`${GRAPH}/${id}?fields=id,name,access_token,picture{url}`, { headers })).json();
          if (r.error || !r.access_token) return null;
          return {
            id: r.id,
            name: r.name,
            access_token: r.access_token,
            picture: r.picture?.url || null
          };
        } catch {
          return null;
        }
      }));
      pages = resolved.filter(Boolean);
    }

    return Response.json({ pages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}