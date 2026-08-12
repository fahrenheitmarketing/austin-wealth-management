import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  MONTH_NAMES, buildSchedule, ensureStatuses, cuCreateTask, cuComment, cuGetComments,
  blogDescription, socialDescription, blogTaskName, socialTaskName, ASSIGNEE_USER_ID, CLICKUP
} from '../../shared/monthlyRun.ts';
import {
  buildBlogPrompt, blogJsonSchema, buildSocialPrompt, socialJsonSchema,
  BLOG_DISCLAIMER, platformDisclaimer, compliantImagePrefix
} from '../../shared/contentRules.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const limit = body.limit ? parseInt(body.limit, 10) : 0; // 0 = no limit (testing)

    // Resolve target month.
    const now = new Date();
    let year = now.getUTCFullYear();
    let month = now.getUTCMonth();
    if (body.month && /^\d{4}-\d{2}$/.test(body.month)) {
      const parts = body.month.split('-');
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
    }
    const monthName = MONTH_NAMES[month];
    const monthStart = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const monthEnd = `${year}-${String(month + 1).padStart(2, '0')}-28`;

    const conn = await base44.asServiceRole.connectors.getConnection('clickup');
    const token = conn && conn.accessToken;
    if (!token) return Response.json({ error: 'no clickup token' }, { status: 500 });
    const h = { Authorization: token, 'Content-Type': 'application/json' };

    // Find the parent task for the month and read the stored topic-plan JSON.
    const parentName = `FM - AWM Content ${monthName} ${year}`;
    const listRes = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}/task?subtasks=true&per_page=100`, { headers: h });
    const listJson = await listRes.json().catch(() => ({}));
    const parentTask = (listJson.tasks || []).find((t) => t.name && t.name.includes(parentName));
    if (!parentTask) return Response.json({ error: 'no parent task found for ' + parentName }, { status: 404 });

    const comments = await cuGetComments(h, parentTask.id);

    // Hold check: if any comment says "hold", pause.
    const hold = comments.some((c) => /\bhold\b/i.test(c));
    if (hold) return Response.json({ paused: true, reason: 'hold comment detected on topic plan' });

    const jsonComment = comments.find((c) => c.includes('[TOPIC_PLAN_JSON]'));
    if (!jsonComment) return Response.json({ error: 'topic plan JSON comment not found' }, { status: 404 });
    const envelope = JSON.parse(jsonComment.split('[TOPIC_PLAN_JSON]')[1].trim());

    const validStatuses = await ensureStatuses(h);
    const draftStatus = validStatuses.includes('Draft') ? 'Draft' : null;

    // Idempotency: find already-generated pieces for the month.
    const existingBlogs = await base44.asServiceRole.entities.BlogArticle.filter({ publish_date: { $gte: monthStart, $lte: monthEnd } });
    const existingSocial = await base44.asServiceRole.entities.SocialPost.filter({ publish_date: { $gte: monthStart, $lte: monthEnd } });
    const blogKeys = new Set(existingBlogs.map((b) => `${b.publish_date}|${b.segment}`));
    const socialKeys = new Set(existingSocial.map((s) => `${s.publish_date}|${s.platform}|${s.segment}`));

    const summary = { blogs: { generated: 0, skipped: 0, failed: 0 }, social: { generated: 0, skipped: 0, failed: 0 }, errors: [] };
    let generated = 0;

    // ---- Blogs ----
    for (const slot of envelope.blogs) {
      if (limit && generated >= limit) break;
      const key = `${slot.date}|${slot.segment}`;
      if (blogKeys.has(key)) { summary.blogs.skipped++; continue; }
      try {
        const article = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: buildBlogPrompt({ segment: slot.segment, topic: slot.topic, pillar: slot.pillar, publishDate: slot.date }),
          add_context_from_internet: true,
          model: 'gemini_3_1_pro',
          response_json_schema: blogJsonSchema
        });
        article.disclaimer = BLOG_DISCLAIMER;
        const featured = await base44.asServiceRole.integrations.Core.GenerateImage({
          prompt: `${compliantImagePrefix} ${article.featured_image_prompt}. Wide 1200x628 banner composition, no text overlays, no charts or figures.`
        });
        const header = await base44.asServiceRole.integrations.Core.GenerateImage({
          prompt: `${compliantImagePrefix} ${article.header_image_prompt}. 1920x1080 wide hero composition, no text overlays, no charts or figures.`
        });
        const created = await base44.asServiceRole.entities.BlogArticle.create({
          title: article.title, slug: article.slug || '', segment: article.segment || slot.segment,
          publish_date: slot.date, brand_pillar: article.brand_pillar || slot.pillar || 'Education',
          category: article.category || '', compliance_sensitivity: article.compliance_sensitivity || 'Medium',
          featured_image_prompt: article.featured_image_prompt, header_image_prompt: article.header_image_prompt,
          body: article.body, meta_title: article.meta_title, meta_description: article.meta_description,
          keywords: article.keywords || [], internal_links: article.internal_links || [],
          external_links: article.external_links || [], cta: article.cta || '',
          disclaimer: BLOG_DISCLAIMER, featured_image_url: featured.url, header_image_url: header.url,
          status: 'Draft', escalated: false
        });
        const task = await cuCreateTask(h, {
          name: blogTaskName(created), description: blogDescription(created),
          parent: envelope.blogsTaskId, assignees: [ASSIGNEE_USER_ID], status: draftStatus
        });
        if (task.id) await base44.asServiceRole.entities.BlogArticle.update(created.id, { clickup_task_id: task.id });
        summary.blogs.generated++; generated++;
      } catch (e) {
        summary.blogs.failed++; summary.errors.push({ blog: slot.topic, error: e.message });
      }
    }

    // ---- Social ----
    for (const w of envelope.weeks) {
      if (limit && generated >= limit) break;
      const weekTaskId = envelope.weekTaskIds[w.num - 1];
      for (const p of w.posts) {
        if (limit && generated >= limit) break;
        const key = `${p.date}|${p.platform}|${w.segment}`;
        if (socialKeys.has(key)) { summary.social.skipped++; continue; }
        const angle = w[p.slot] || w.theme;
        try {
          const post = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: buildSocialPrompt({ platform: p.platform, segment: w.segment, theme: angle, publishDate: p.date, week: String(w.num), pillar: w.pillar }),
            add_context_from_internet: true,
            model: 'gemini_3_flash',
            response_json_schema: socialJsonSchema
          });
          const disclaimer = platformDisclaimer(p.platform);
          post.disclaimer = disclaimer;
          if (p.platform === 'Google Business Profile') post.hashtags = '';
          const image = await base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: `${compliantImagePrefix} ${post.image_prompt}. Square composition, no text overlays, no charts or figures.`
          });
          const created = await base44.asServiceRole.entities.SocialPost.create({
            platform: p.platform, publish_date: p.date, week: String(w.num),
            topic: post.topic || angle, segment: w.segment, copy: post.copy,
            hashtags: post.hashtags || '', disclaimer, image_description: post.image_description,
            image_url: image.url, short_link: post.short_link || '',
            brand_pillar: w.pillar || 'Education', status: 'Draft', escalated: false
          });
          const task = await cuCreateTask(h, {
            name: socialTaskName(created), description: socialDescription(created),
            parent: weekTaskId, assignees: [ASSIGNEE_USER_ID], status: draftStatus
          });
          if (task.id) await base44.asServiceRole.entities.SocialPost.update(created.id, { clickup_task_id: task.id });
          summary.social.generated++; generated++;
        } catch (e) {
          summary.social.failed++; summary.errors.push({ social: `${p.platform} ${p.date}`, error: e.message });
        }
      }
    }

    // Post summary comment on parent.
    const sumLines = [
      `GENERATION COMPLETE — ${monthName} ${year}`,
      `Blogs: ${summary.blogs.generated} generated, ${summary.blogs.skipped} skipped, ${summary.blogs.failed} failed`,
      `Social: ${summary.social.generated} generated, ${summary.social.skipped} skipped, ${summary.social.failed} failed`
    ];
    if (summary.errors.length) sumLines.push('Errors:', ...summary.errors.slice(0, 10).map((e) => `- ${JSON.stringify(e)}`));
    await cuComment(h, envelope.parentTaskId, sumLines.join('\n'));

    return Response.json({ monthKey: envelope.monthKey, ...summary });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}