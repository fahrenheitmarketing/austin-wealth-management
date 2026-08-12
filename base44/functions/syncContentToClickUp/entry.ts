import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { CLICKUP, REVIEW_STATUSES, STATUS_COLORS } from '../../shared/clickupConfig.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    const { content_type, id } = body || {};
    if (!content_type || !id) return Response.json({ error: 'content_type and id required' }, { status: 400 });

    const isBlog = content_type === 'blog';
    const ent = isBlog ? base44.entities.BlogArticle : base44.entities.SocialPost;
    const item = await ent.get(id);
    if (!item) return Response.json({ error: 'not found' }, { status: 404 });

    const conn = await base44.asServiceRole.connectors.getConnection('clickup');
    const token = conn && conn.accessToken;
    if (!token) return Response.json({ error: 'no clickup token' }, { status: 500 });
    const h = { Authorization: token, 'Content-Type': 'application/json' };

    // Ensure custom review statuses exist on the list (best-effort; requires Business+ plan).
    const listRes = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}`, { headers: h });
    const listJson = await listRes.json().catch(() => ({}));
    const existingNames = (listJson.statuses || []).map((s) => s.status);
    for (let i = 0; i < REVIEW_STATUSES.length; i++) {
      const name = REVIEW_STATUSES[i];
      if (!existingNames.includes(name)) {
        try {
          await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}/status`, {
            method: 'POST', headers: h,
            body: JSON.stringify({ status: name, orderindex: i, color: STATUS_COLORS[name] })
          });
        } catch (e) { /* status creation may require a higher plan; ignore */ }
      }
    }

    // Re-read statuses to confirm what is actually available.
    const listRes2 = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}`, { headers: h });
    const listJson2 = await listRes2.json().catch(() => ({}));
    const validNames = (listJson2.statuses || []).map((s) => s.status);
    const targetStatus = validNames.includes(item.status) ? item.status : null;

    const label = isBlog ? `[Blog] ${item.title}` : `[${item.platform}] ${item.topic}`;
    const name = `${item.status} | ${label}`;
    const description = isBlog
      ? `${item.body || ''}\n\nDisclaimer: ${item.disclaimer || ''}\n\nSegment: ${item.segment || ''} | Pillar: ${item.brand_pillar || ''}`
      : `${item.copy || ''}\n\nHashtags: ${item.hashtags || ''}\nDisclaimer: ${item.disclaimer || ''}\n\nSegment: ${item.segment || ''} | Pillar: ${item.brand_pillar || ''}`;

    let taskId = item.clickup_task_id;
    const taskBody = { name, description, ...(targetStatus ? { status: targetStatus } : {}) };

    if (!taskId) {
      const createRes = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}/task`, {
        method: 'POST', headers: h, body: JSON.stringify(taskBody)
      });
      const created = await createRes.json().catch(() => ({}));
      taskId = created.id;
      if (!taskId) return Response.json({ error: 'clickup task creation failed', detail: created }, { status: 502 });
      await ent.update(id, { clickup_task_id: taskId });
    } else {
      await fetch(`${CLICKUP.apiBase}/task/${taskId}`, {
        method: 'PUT', headers: h, body: JSON.stringify(taskBody)
      });
    }

    return Response.json({ clickup_task_id: taskId, status: targetStatus || validNames[0] || null });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}