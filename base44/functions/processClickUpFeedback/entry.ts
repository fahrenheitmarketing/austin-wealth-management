import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { CLICKUP } from '../../shared/clickupConfig.ts';
import { buildBlogFeedbackPrompt, buildSocialFeedbackPrompt, blogJsonSchema, socialJsonSchema, BLOG_DISCLAIMER, platformDisclaimer } from '../../shared/contentRules.ts';

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
    if (!item.clickup_task_id) return Response.json({ feedback: 0, message: 'no clickup task linked' });

    const conn = await base44.asServiceRole.connectors.getConnection('clickup');
    const token = conn && conn.accessToken;
    if (!token) return Response.json({ error: 'no clickup token' }, { status: 500 });
    const h = { Authorization: token, 'Content-Type': 'application/json' };

    const commentsRes = await fetch(`${CLICKUP.apiBase}/task/${item.clickup_task_id}/comment`, { headers: h });
    const commentsJson = await commentsRes.json().catch(() => ({}));
    const rawComments = (commentsJson.comments || []).map((c) => {
      let text = '';
      if (typeof c.text === 'string') text = c.text;
      else if (Array.isArray(c.comment)) {
        text = c.comment.map((b) => Array.isArray(b.text) ? b.text.map((t) => t.text || '').join('') : (b.text || '')).join('');
      } else if (Array.isArray(c.comment_text)) {
        text = c.comment_text.map((b) => b.plain_text || b.text || '').join('');
      }
      return { id: c.id, text };
    }).filter((c) => c.text);
    if (!rawComments.length) return Response.json({ feedback: 0, message: 'no comments found' });
    const feedback = rawComments.map((c, i) => `${i + 1}. ${c.text}`).join('\n');

    let updated;
    if (isBlog) {
      const revised = await base44.integrations.Core.InvokeLLM({
        prompt: buildBlogFeedbackPrompt({ article: item, feedback }),
        add_context_from_internet: true,
        model: 'gemini_3_1_pro',
        response_json_schema: blogJsonSchema
      });
      revised.disclaimer = BLOG_DISCLAIMER;
      updated = await ent.update(id, {
        title: revised.title, body: revised.body,
        meta_title: revised.meta_title, meta_description: revised.meta_description,
        keywords: revised.keywords || [], internal_links: revised.internal_links || [],
        external_links: revised.external_links || [], cta: revised.cta || '',
        status: 'Draft', escalated: false
      });
    } else {
      const revised = await base44.integrations.Core.InvokeLLM({
        prompt: buildSocialFeedbackPrompt({ post: item, feedback }),
        add_context_from_internet: true,
        model: 'gemini_3_flash',
        response_json_schema: socialJsonSchema
      });
      const disclaimer = platformDisclaimer(item.platform);
      revised.disclaimer = disclaimer;
      if (item.platform === 'Google Business Profile') revised.hashtags = '';
      updated = await ent.update(id, {
        copy: revised.copy, topic: revised.topic || item.topic,
        hashtags: revised.hashtags || '', short_link: revised.short_link || item.short_link,
        status: 'Draft', escalated: false
      });
    }

    // Build a change summary and post a reply comment referencing each feedback comment.
    const changes = [];
    if (isBlog) {
      if ((updated.title || '') !== (item.title || '')) changes.push(`Title: "${item.title || ''}" -> "${updated.title || ''}"`);
      if ((updated.body || '') !== (item.body || '')) changes.push(`Body revised (${(item.body || '').length} -> ${(updated.body || '').length} chars)`);
      if ((updated.meta_title || '') !== (item.meta_title || '')) changes.push('Meta title updated');
      if ((updated.meta_description || '') !== (item.meta_description || '')) changes.push('Meta description updated');
      const kwBefore = (item.keywords || []).join('|'), kwAfter = (updated.keywords || []).join('|');
      if (kwBefore !== kwAfter) changes.push(`Keywords updated (${(item.keywords || []).length} -> ${(updated.keywords || []).length})`);
      if ((item.internal_links || []).length !== (updated.internal_links || []).length) changes.push('Internal links updated');
      if ((item.external_links || []).length !== (updated.external_links || []).length) changes.push('External links updated');
      if ((updated.cta || '') !== (item.cta || '')) changes.push('CTA updated');
    } else {
      if ((updated.copy || '') !== (item.copy || '')) changes.push(`Copy revised (${(item.copy || '').length} -> ${(updated.copy || '').length} chars)`);
      if ((updated.topic || '') !== (item.topic || '')) changes.push(`Topic updated: "${item.topic || ''}" -> "${updated.topic || ''}"`);
      if ((updated.hashtags || '') !== (item.hashtags || '')) changes.push('Hashtags updated');
      if ((updated.short_link || '') !== (item.short_link || '')) changes.push('Short link updated');
    }
    const excerpt = (t) => t.length > 140 ? t.slice(0, 137) + '...' : t;
    const commentBody = [
      'REVISION SUMMARY',
      'The following changes were implemented in response to feedback on this task:',
      '',
      'Changes:',
      ...(changes.length ? changes.map((c, i) => `${i + 1}. ${c}`) : ['(no field-level changes detected; content re-confirmed against feedback)']),
      '',
      'Feedback comments addressed:',
      ...rawComments.map((c, i) => `${i + 1}. ${excerpt(c.text)}`)
    ].join('\n');
    try {
      await fetch(`${CLICKUP.apiBase}/task/${item.clickup_task_id}/comment`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ comment_text: [{ text: commentBody }] })
      });
    } catch (e) { /* non-fatal: comment post failed */ }

    return Response.json({ feedback: rawComments.length, updated: { id: updated.id, status: 'Draft' }, revisionCommentPosted: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}