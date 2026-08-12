import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { compliantImagePrefix } from '../../shared/contentRules.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    const { content_type, id, image_prompt, slot } = body || {};
    if (!id || !image_prompt) return Response.json({ error: 'id and image_prompt are required' }, { status: 400 });

    const aspectNote = slot === 'header' ? '1920x1080 wide hero' : slot === 'featured' ? '1200x628 banner' : 'square';
    const image = await base44.integrations.Core.GenerateImage({
      prompt: `${compliantImagePrefix} ${image_prompt}. ${aspectNote} composition, no text overlays, no charts or figures.`
    });

    const ent = content_type === 'blog' ? base44.entities.BlogArticle : base44.entities.SocialPost;
    const field = content_type === 'blog'
      ? (slot === 'header' ? 'header_image_url' : 'featured_image_url')
      : 'image_url';
    await ent.update(id, { [field]: image.url });

    return Response.json({ image_url: image.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}