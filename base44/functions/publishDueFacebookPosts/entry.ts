import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const GRAPH = 'https://graph.facebook.com/v25.0';

// Resolve a Page access token for a single Page by querying the Page node
// directly with the user token. This works for Facebook's New Pages Experience
// where /me/accounts returns empty even for granted Pages.
async function resolvePageAccessToken(headers, pageId) {
  const res = await fetch(`${GRAPH}/${pageId}?fields=access_token`, { headers });
  const data = await res.json();
  if (data.access_token) return data.access_token;

  // Fallback to the /me/accounts edge (classic Pages).
  const accountsRes = await fetch(`${GRAPH}/me/accounts?fields=id,access_token`, { headers });
  const accountsData = await accountsRes.json();
  const match = (accountsData.data || []).find((p) => p.id === pageId);
  return match?.access_token || null;
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Service-role: invoked by the scheduled workflow (no user context).
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('facebook_pages');
    const headers = { Authorization: `Bearer ${accessToken}` };

    const now = new Date().toISOString();
    const duePosts = await base44.asServiceRole.entities.ScheduledPost.filter({
      status: 'pending',
      scheduled_time: { $lte: now }
    });

    const results = [];
    for (const post of duePosts) {
      const pageToken = await resolvePageAccessToken(headers, post.page_id);
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

      const publishRes = await fetch(`${GRAPH}/${post.page_id}/feed`, {
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