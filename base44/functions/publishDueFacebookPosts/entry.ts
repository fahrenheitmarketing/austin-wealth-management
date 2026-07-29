import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Service-role: invoked by the scheduled workflow (no user context).
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('facebook_pages');

    // Resolve page access tokens for all managed Pages.
    const accountsRes = await fetch(
      'https://graph.facebook.com/v25.0/me/accounts?fields=id,name,access_token',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const accountsData = await accountsRes.json();
    if (accountsData.error) return Response.json({ error: accountsData.error.message }, { status: 400 });
    const pageTokens = {};
    for (const p of accountsData.data || []) {
      pageTokens[p.id] = p.access_token;
    }

    const now = new Date().toISOString();
    const duePosts = await base44.asServiceRole.entities.ScheduledPost.filter({
      status: 'pending',
      scheduled_time: { $lte: now }
    });

    const results = [];
    for (const post of duePosts) {
      const pageToken = pageTokens[post.page_id];
      if (!pageToken) {
        await base44.asServiceRole.entities.ScheduledPost.update(post.id, {
          status: 'failed',
          error_message: 'Page access token not found — reconnect Facebook Pages.'
        });
        results.push({ id: post.id, status: 'failed', reason: 'no page token' });
        continue;
      }

      const body = new URLSearchParams();
      body.append('message', post.message);
      if (post.link) body.append('link', post.link);
      body.append('published', 'true');

      const publishRes = await fetch(`https://graph.facebook.com/v25.0/${post.page_id}/feed`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${pageToken}` },
        body
      });
      const publishData = await publishRes.json();

      if (publishData.error) {
        await base44.asServiceRole.entities.ScheduledPost.update(post.id, {
          status: 'failed',
          error_message: publishData.error.message
        });
        results.push({ id: post.id, status: 'failed', reason: publishData.error.message });
      } else {
        await base44.asServiceRole.entities.ScheduledPost.update(post.id, {
          status: 'published',
          facebook_post_id: String(publishData.id)
        });
        results.push({ id: post.id, status: 'published', facebook_post_id: publishData.id });
      }
    }

    return Response.json({ processed: results.length, results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}