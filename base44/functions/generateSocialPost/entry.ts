import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { buildSocialPrompt, socialJsonSchema, platformDisclaimer, compliantImagePrefix } from '../../shared/contentRules.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    const { platform, segment, theme, publishDate, week, pillar } = body || {};
    if (!platform || !segment || !theme) return Response.json({ error: 'platform, segment and theme are required' }, { status: 400 });

    const post = await base44.integrations.Core.InvokeLLM({
      prompt: buildSocialPrompt({ platform, segment, theme, publishDate, week }),
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: socialJsonSchema
    });

    const disclaimer = platformDisclaimer(platform);
    post.disclaimer = disclaimer;
    if (platform === 'Google Business Profile') post.hashtags = '';

    const image = await base44.integrations.Core.GenerateImage({
      prompt: `${compliantImagePrefix} ${post.image_prompt}. Square composition, no text overlays, no charts or figures.`
    });

    const created = await base44.entities.SocialPost.create({
      platform,
      publish_date: publishDate || '',
      week: week || '',
      topic: post.topic || theme,
      segment,
      copy: post.copy,
      hashtags: post.hashtags || '',
      disclaimer,
      image_description: post.image_description,
      image_url: image.url,
      short_link: post.short_link || '',
      brand_pillar: pillar || 'Education',
      status: 'Draft',
      escalated: false
    });

    return Response.json({ post: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}