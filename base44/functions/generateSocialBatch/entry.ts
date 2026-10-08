import { createClientFromRequest } from 'npm:@base44/sdk@0.8.53';
import { AUDIENCE_SEGMENTS, BRAND_PILLARS, COMPLIANCE_RULES, IMAGE_RULES, compliantImagePrefix, FACEBOOK_DISCLAIMER, LINKEDIN_DISCLAIMER } from '../../shared/contentRules.ts';

const SEGMENT_NAMES = ['Young Adults', 'Professionals & Executives', 'Business Owners'];

const MONTH_NOTES = {
  10: 'Year-end deadlines approaching: RMDs, charitable giving, tax-loss harvesting, open enrollment, business year-end planning.',
  11: 'Year-end deadlines: charitable giving, RMDs, tax-loss harvesting, business year-end wrap, employee benefits, gifting.',
  0: 'New-year IRS limits and planning reset: contribution limits, fresh planning cycle, IRA contribution window, business planning for the year.'
};

const planSchema = {
  type: 'object',
  properties: {
    topic: { type: 'string' },
    pillar: { type: 'string', enum: BRAND_PILLARS },
    facebook: {
      type: 'object',
      properties: { copy: { type: 'string' }, hashtags: { type: 'string' } },
      required: ['copy', 'hashtags']
    },
    linkedin: {
      type: 'object',
      properties: { copy: { type: 'string' }, hashtags: { type: 'string' } },
      required: ['copy', 'hashtags']
    },
    image_description: { type: 'string' },
    image_prompt: { type: 'string' }
  },
  required: ['topic', 'pillar', 'facebook', 'linkedin', 'image_description', 'image_prompt']
};

export function buildDateSchedule(startDate, endDate) {
  const dates = [];
  const d = new Date(startDate + 'T00:00:00Z');
  const end = new Date(endDate + 'T00:00:00Z');
  while (d <= end) {
    const day = d.getUTCDay();
    if (day === 2 || day === 4) {
      const iso = d.toISOString().slice(0, 10);
      const excluded = ['2026-11-26', '2026-12-22', '2026-12-24', '2026-12-29', '2026-12-31'];
      if (!excluded.includes(iso)) dates.push(iso); // skip Thanksgiving and Christmas/New Year weeks
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return dates;
}

function weekLabel(iso) {
  // Label as "Week of <nearest Monday>"
  const d = new Date(iso + 'T00:00:00Z');
  const offset = (d.getUTCDay() + 6) % 7; // days since Monday
  d.setUTCDate(d.getUTCDate() - offset);
  return `Week of ${d.toISOString().slice(0, 10)}`;
}

export function buildPairPrompt(iso, segmentIndex) {
  const d = new Date(iso + 'T00:00:00Z');
  const monthIdx = d.getUTCMonth();
  const monthNote = MONTH_NOTES[monthIdx] || '';
  const segment = SEGMENT_NAMES[segmentIndex % 3];
  const audience = AUDIENCE_SEGMENTS[segmentIndex % 3];
  const seasonal = monthIdx >= 10 || monthIdx === 0
    ? `SEASONAL CONTEXT: ${monthNote} Topics must feel timely for this date, not generic.`
    : '';
  return `You are a social media writer for Austin Wealth Management (AWM), a fee-only SEC-registered RIA in Austin, TX. Create ONE social media post topic and write it as two near-identical platform variants for publish date ${iso}.

AUDIENCE SEGMENT (weekly rotation): ${segment}
${audience}

${seasonal}

BRAND PILLARS (assign exactly one): ${BRAND_PILLARS.join(', ')}

${COMPLIANCE_RULES}

${IMAGE_RULES}

THE TWO PLATFORM VARIANTS:
- facebook.copy: warm, approachable, community-focused. Same substance.
- linkedin.copy: authoritative, peer-level, substantive, no promotional feel. Same substance.
The two variants are THE SAME POST slightly altered per platform: identical topic, identical key points and framing; only tone and light rewording differ. Neither includes any URL inside the copy text. No em dashes. No alarmist urgency. No unsubstantiated benefit claims. Hashtags are stored separately (2-4 for Facebook, 3-5 for LinkedIn) and must not appear inside the copy.

Also provide:
- topic: short topic label
- pillar: one brand pillar
- image_prompt: one shared image prompt, photographic style, fully described and compliant with the image rules
- image_description: one-sentence description of the image

Return only the JSON object.`;
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const startDate = body.start_date || '2026-11-03';
    const endDate = body.end_date || '2027-01-28';
    const batchSize = Math.min(Number(body.batch_size) || 3, 5);

    const schedule = buildDateSchedule(startDate, endDate);

    // Idempotency: find dates already covered (either platform record exists)
    const existing = await base44.entities.SocialPost.filter(
      { publish_date: { $gte: startDate, $lte: endDate } },
      { limit: 1000 }
    );
    const existingItems = Array.isArray(existing) ? existing : (existing.items || []);
    const doneDates = new Set(existingItems.map((p) => p.publish_date));
    const pending = schedule.filter((iso) => !doneDates.has(iso));

    const generated = [];
    const failed = [];

    for (let i = 0; i < Math.min(batchSize, pending.length); i++) {
      const iso = pending[i];
      const segIdx = schedule.indexOf(iso) % 3;
      try {
        const plan = await base44.integrations.Core.InvokeLLM({
          prompt: buildPairPrompt(iso, segIdx),
          add_context_from_internet: true,
          model: 'gemini_3_flash',
          response_json_schema: planSchema
        });

        const image = await base44.integrations.Core.GenerateImage({
          prompt: `${compliantImagePrefix} ${plan.image_prompt}. Square composition, no text overlays, no charts or figures.`
        });

        const week = weekLabel(iso);
        const base = {
          publish_date: iso,
          week,
          topic: plan.topic,
          segment: SEGMENT_NAMES[segIdx % 3],
          image_description: plan.image_description,
          image_url: image.url,
          brand_pillar: plan.pillar || 'Education',
          status: 'Draft',
          escalated: false
        };

        const [fb, li] = await base44.entities.SocialPost.bulkCreate([
          { ...base, platform: 'Facebook', copy: plan.facebook.copy, hashtags: plan.facebook.hashtags || '', disclaimer: FACEBOOK_DISCLAIMER },
          { ...base, platform: 'LinkedIn', copy: plan.linkedin.copy, hashtags: plan.linkedin.hashtags || '', disclaimer: LINKEDIN_DISCLAIMER }
        ]);
        generated.push({ date: iso, topic: plan.topic, fb_id: fb.id, li_id: li.id });
      } catch (e) {
        failed.push({ date: iso, error: e.message });
      }
    }

    return Response.json({
      generated,
      failed,
      remaining: pending.length - generated.length - failed.length
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}