import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('facebook_pages');
    const res = await fetch(
      'https://graph.facebook.com/v25.0/me/accounts?fields=id,name,access_token,picture{url}',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await res.json();
    if (data.error) return Response.json({ error: data.error.message }, { status: 400 });

    return Response.json({
      pages: (data.data || []).map((p) => ({
        id: p.id,
        name: p.name,
        access_token: p.access_token,
        picture: p.picture?.url || null
      }))
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}