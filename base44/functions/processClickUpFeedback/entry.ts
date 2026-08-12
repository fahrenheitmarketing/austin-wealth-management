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
    const texts = (commentsJson.comments || []).map((c) => {
      if (typeof c.text === 'string') return c.text;
      if (Array.isArray(c.comment)) {
        return c.comment.map((b) => Array.isArray(b.text) ? b.text.map((t) => t.text || '').join('') : (b.text || '')).join('');
      }
      if (Array.isArray(c.comment_text)) return c.comment_text.map((b) => b.plain_text || b.text || '').join('');
      return '';
    }).filter(Boolean);
    if (!texts.length) return Response.json({ feedback: 0, message: 'no comments found' });
    const feedback = texts.map((t, i) => `${i + 1}. ${t}`).join('\n');

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

    return Response.json({ feedback: texts.length, updated: { id: updated.id, status: 'Draft' } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}