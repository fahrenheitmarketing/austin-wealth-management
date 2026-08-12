import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { buildBlogPrompt, blogJsonSchema, BLOG_DISCLAIMER, compliantImagePrefix } from '../../shared/contentRules.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    const { segment, topic, pillar, publishDate } = body || {};
    if (!segment || !topic) return Response.json({ error: 'segment and topic are required' }, { status: 400 });

    const article = await base44.integrations.Core.InvokeLLM({
      prompt: buildBlogPrompt({ segment, topic, pillar, publishDate }),
      add_context_from_internet: true,
      model: 'gemini_3_1_pro',
      response_json_schema: blogJsonSchema
    });

    article.disclaimer = BLOG_DISCLAIMER;

    const featured = await base44.integrations.Core.GenerateImage({
      prompt: `${compliantImagePrefix} ${article.featured_image_prompt}. Wide 1200x628 banner composition, no text overlays, no charts or figures.`
    });
    const header = await base44.integrations.Core.GenerateImage({
      prompt: `${compliantImagePrefix} ${article.header_image_prompt}. 1920x1080 wide hero composition, no text overlays, no charts or figures.`
    });

    const created = await base44.entities.BlogArticle.create({
      title: article.title,
      segment: article.segment,
      publish_date: article.publish_date || publishDate || '',
      brand_pillar: article.brand_pillar || pillar || 'Education',
      category: article.category || '',
      compliance_sensitivity: article.compliance_sensitivity || 'Medium',
      featured_image_prompt: article.featured_image_prompt,
      header_image_prompt: article.header_image_prompt,
      body: article.body,
      meta_title: article.meta_title,
      meta_description: article.meta_description,
      keywords: article.keywords || [],
      internal_links: article.internal_links || [],
      external_links: article.external_links || [],
      cta: article.cta || '',
      disclaimer: BLOG_DISCLAIMER,
      featured_image_url: featured.url,
      header_image_url: header.url,
      status: 'Draft',
      escalated: false
    });

    return Response.json({ article: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}