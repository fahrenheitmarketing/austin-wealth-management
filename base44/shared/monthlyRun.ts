// Shared logic for the autonomous monthly content-generation cycle.
// Imported by prepareContentMonth and generateContentMonth.

import { CLICKUP, REVIEW_STATUSES, STATUS_COLORS, ASSIGNEE_USER_ID, BRIEF_DOC_ID } from './clickupConfig.ts';
import { AUDIENCE_SEGMENTS, BRAND_PILLARS } from './contentRules.ts';

export const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function pad(n) { return String(n).padStart(2, '0'); }
export function ymd(d) { return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`; }

export function firstWeekday(year, month, targetDay) {
  const d = new Date(Date.UTC(year, month, 1));
  const day = d.getUTCDay();
  const offset = (targetDay - day + 7) % 7;
  return new Date(Date.UTC(year, month, 1 + offset));
}
export function addDays(d, n) { return new Date(d.getTime() + n * 86400000); }

// Federal holidays that fall on the first Monday of a month: Labor Day (September).
export function isFirstMondayHoliday(year, month) { return month === 8; }

// Determine whether a given date should trigger the monthly cycle.
export function shouldRunForDate(now) {
  const day = now.getUTCDay();
  const dom = now.getUTCDate();
  const month = now.getUTCMonth();
  const year = now.getUTCFullYear();
  const firstMondayDom = firstWeekday(year, month, 1).getUTCDate();
  if (day === 1 && dom === firstMondayDom) {
    return { run: !isFirstMondayHoliday(year, month), reason: isFirstMondayHoliday(year, month) ? 'first monday is Labor Day' : 'first monday' };
  }
  const firstTuesdayDom = firstWeekday(year, month, 2).getUTCDate();
  if (day === 2 && dom === firstTuesdayDom && isFirstMondayHoliday(year, month)) {
    return { run: true, reason: 'first tuesday (holiday deferral)' };
  }
  return { run: false, reason: 'not a monthly trigger date' };
}

// Pre-assigned segment rotation for the month.
export function buildSchedule(year, month) {
  const firstTue = firstWeekday(year, month, 2);
  const firstThu = firstWeekday(year, month, 4);
  const blogSegments = ['Young Adults','Professionals & Executives','Business Owners','Young Adults','Professionals & Executives','Business Owners','Professionals & Executives','Business Owners'];
  const weekSegments = ['Young Adults','Professionals & Executives','Business Owners','Young Adults'];
  const blogs = [];
  for (let w = 0; w < 4; w++) {
    const tue = addDays(firstTue, w * 7);
    const thu = addDays(firstThu, w * 7);
    blogs.push({ slot: w * 2, date: ymd(tue), segment: blogSegments[w * 2] });
    blogs.push({ slot: w * 2 + 1, date: ymd(thu), segment: blogSegments[w * 2 + 1] });
  }
  const weeks = [];
  for (let w = 0; w < 4; w++) {
    const tue = addDays(firstTue, w * 7);
    const thu = addDays(firstThu, w * 7);
    weeks.push({
      num: w + 1,
      segment: weekSegments[w],
      tue: ymd(tue),
      thu: ymd(thu),
      posts: [
        { platform: 'Facebook', date: ymd(tue), slot: 'fb_tue' },
        { platform: 'Facebook', date: ymd(thu), slot: 'fb_thu' },
        { platform: 'LinkedIn', date: ymd(tue), slot: 'li_tue' },
        { platform: 'LinkedIn', date: ymd(thu), slot: 'li_thu' },
        { platform: 'Google Business Profile', date: ymd(thu), slot: 'gbp' }
      ]
    });
  }
  return { blogs, weeks };
}

export const topicPlanSchema = {
  type: 'object',
  properties: {
    blogs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          topic: { type: 'string' },
          pillar: { type: 'string', enum: BRAND_PILLARS },
          rationale: { type: 'string' },
          driver: { type: 'string' }
        },
        required: ['topic', 'pillar', 'rationale']
      }
    },
    weeks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          theme: { type: 'string' },
          pillar: { type: 'string', enum: BRAND_PILLARS },
          driver: { type: 'string' },
          fb_tue: { type: 'string' },
          fb_thu: { type: 'string' },
          li_tue: { type: 'string' },
          li_thu: { type: 'string' },
          gbp: { type: 'string' }
        },
        required: ['theme', 'pillar', 'fb_tue', 'fb_thu', 'li_tue', 'li_thu', 'gbp']
      }
    },
    irs_summary: { type: 'string' }
  },
  required: ['blogs', 'weeks']
};

const SEASONAL_NOTES = {
  0: 'New IRS limits effective; new year financial planning',
  1: 'Tax document season; IRA contribution deadline approaching',
  2: 'Tax document season; IRA contribution deadline',
  3: 'Post-tax planning; mid-year framing',
  4: 'Mid-year financial review; benefits enrollment reminders',
  5: 'Mid-year financial review; benefits enrollment reminders',
  6: 'Back-to-school (529 plans); RSU vesting calendar planning; cash reserve mid-year review',
  7: 'Back-to-school (529 plans); RSU vesting calendar planning; cash reserve mid-year review',
  8: 'Open enrollment; Medicare planning (turning 65); Q4 tax planning kickoff',
  9: 'Open enrollment; Medicare planning (turning 65); Q4 tax planning kickoff',
  10: 'Year-end deadlines; RMDs; charitable giving; business year-end wrap',
  11: 'Year-end deadlines; RMDs; charitable giving; business year-end wrap'
};

export function buildResearchPrompt(monthName, monthIdx) {
  return `You are researching current, topical, search-relevant financial planning content for Austin Wealth Management (AWM), a fee-only SEC-registered RIA in Austin, TX, for the month of ${monthName}.

Use current web sources. For each of AWM's three audience segments below, identify what is currently topical and search-relevant this month.

SEGMENTS:
${AUDIENCE_SEGMENTS.map((s, i) => `${i + 1}. ${s}`).join('\n')}

For EACH segment, research and report:
- Current topical items: recent events, legislative or IRS changes, market conditions, Austin-specific news where relevant
- Seasonal triggers relevant to ${monthName} (${SEASONAL_NOTES[monthIdx] || ''})

Be specific and citable. Do not fabricate figures; if a figure is uncertain, say so. Output a structured summary per segment. This research will drive topic selection for the month's content.`;
}

export function buildIrsPrompt() {
  return `Verify the current-year IRS figures against irs.gov/newsroom. Check each of the following and report the verified current value with filing status where applicable:
- HSA contribution limits (self / family, catch-up 55+)
- 401(k) employee deferral limit + catch-up (age 50+ and 60-63 tiers)
- Solo 401(k) total contribution cap
- SEP-IRA contribution cap
- SIMPLE IRA limit + catch-up
- Roth and traditional IRA limit + catch-up
- Gift tax annual exclusion
- Federal tax brackets by filing status (single, MFJ, HoH)
- Social Security wage base
- ESPP purchase limit (IRC 423)
- Dependent Care FSA limit

If a figure cannot be verified from current sources, state "unverified" for that item rather than guessing. Output a concise verified list.`;
}

export function buildTopicSelectionPrompt({ monthName, schedule, research, irs, priorTopics, briefExcerpt }) {
  const blogLines = schedule.blogs.map((b, i) => `${i + 1}. Publish ${b.date} — Segment: ${b.segment}`).join('\n');
  const weekLines = schedule.weeks.map((w) => `Week ${w.num} (week of ${w.tue}) — Segment: ${w.segment} | Posts: Facebook ${w.tue}, Facebook ${w.thu}, LinkedIn ${w.tue}, LinkedIn ${w.thu}, Google Business Profile ${w.thu}`).join('\n');
  return `You are the topic strategist for Austin Wealth Management (AWM), a fee-only SEC-registered RIA in Austin, TX. Select topics for the month of ${monthName} based on the research below.

CONTENT STRATEGY RULES:
- RELEVANCE: every topic must be currently topical (recent event, legislative/IRS change, market condition) or seasonally appropriate for ${monthName}. Evergreen topics only with a current angle.
- ROTATION: blog segments and weekly social segments are pre-assigned below; honor them.
- NON-DUPLICATION: do not repeat any topic from the "Previously covered topics" list unless there is a materially new angle driven by recent legislation, market events, or IRS changes.
- PILLAR MAPPING: assign one brand pillar per topic (${BRAND_PILLARS.join(', ')}). Never leave blank.
- SOPHISTICATION: every topic assumes a financially sophisticated reader (equity compensation, existing financial plan, or business complexity). Elevate mass-market topics accordingly.
- Each week's 5 social posts share the weekly theme but each needs a DISTINCT angle (fb_tue, fb_thu, li_tue, li_thu, gbp). Facebook and LinkedIn posts must be distinct pieces, not reformats of each other.

BLOG SLOTS (8) — one topic per slot, matching the pre-assigned segment:
${blogLines}

WEEKLY SOCIAL (4 weeks) — each week has a pre-assigned segment and 5 posts. Provide a weekly theme + a distinct angle for each post:
${weekLines}

PREVIOUSLY COVERED TOPICS (do not repeat):
${priorTopics || '(none — first cycle)'}

AWM CONTENT STRATEGY BRIEF EXCERPT:
${briefExcerpt || '(brief unavailable — rely on research and continuity)'}

CURRENT RESEARCH:
${research}

IRS FIGURES (verified):
${irs}

Return a JSON object with:
- blogs: array of 8 objects { topic, pillar, rationale (one sentence why timely this month), driver (seasonal trigger or current event) } in slot order
- weeks: array of 4 objects { theme, pillar, driver, fb_tue, fb_thu, li_tue, li_thu, gbp } in week order — each *_* field is the distinct angle for that post
- irs_summary: short note on which figures were verified vs unverified

Return only the JSON object.`;
}

export function formatTopicPlanReadable(envelope) {
  const lines = [];
  lines.push(`TOPIC PLAN — ${envelope.monthName} ${envelope.year}`);
  lines.push('');
  lines.push('BLOG ARTICLES (8):');
  envelope.blogs.forEach((b, i) => {
    lines.push(`${i + 1}. [${b.date}] ${b.segment} | ${b.pillar}`);
    lines.push(`   Topic: ${b.topic}`);
    lines.push(`   Why now: ${b.rationale} (Driver: ${b.driver || 'seasonal'})`);
  });
  lines.push('');
  lines.push('WEEKLY SOCIAL (4 weeks):');
  envelope.weeks.forEach((w) => {
    lines.push(`Week ${w.num} (week of ${w.tue}) — ${w.segment} | ${w.pillar}`);
    lines.push(`   Theme: ${w.theme} (Driver: ${w.driver || 'seasonal'})`);
    lines.push(`   FB ${w.tue}: ${w.fb_tue}`);
    lines.push(`   FB ${w.thu}: ${w.fb_thu}`);
    lines.push(`   LI ${w.tue}: ${w.li_tue}`);
    lines.push(`   LI ${w.thu}: ${w.li_thu}`);
    lines.push(`   GBP ${w.thu}: ${w.gbp}`);
  });
  lines.push('');
  lines.push(`IRS verification: ${envelope.irs_summary || '(see research)'}`);
  return lines.join('\n');
}

// ---- ClickUp helpers ----

export async function ensureStatuses(h) {
  const listRes = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}`, { headers: h });
  const listJson = await listRes.json().catch(() => ({}));
  const existing = (listJson.statuses || []).map((s) => s.status);
  for (let i = 0; i < REVIEW_STATUSES.length; i++) {
    const name = REVIEW_STATUSES[i];
    if (!existing.includes(name)) {
      try {
        await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}/status`, {
          method: 'POST', headers: h,
          body: JSON.stringify({ status: name, orderindex: i, color: STATUS_COLORS[name] })
        });
      } catch (e) { /* may require higher plan */ }
    }
  }
  const listRes2 = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}`, { headers: h });
  const listJson2 = await listRes2.json().catch(() => ({}));
  return (listJson2.statuses || []).map((s) => s.status);
}

export async function cuCreateTask(h, { name, description, parent, assignees, status }) {
  const body = { name, description };
  if (parent) body.parent = parent;
  if (assignees && assignees.length) body.assignees = assignees;
  if (status) body.status = status;
  const res = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}/task`, {
    method: 'POST', headers: h, body: JSON.stringify(body)
  });
  const j = await res.json().catch(() => ({}));
  return j;
}

export async function cuUpdateTask(h, taskId, patch) {
  const res = await fetch(`${CLICKUP.apiBase}/task/${taskId}`, {
    method: 'PUT', headers: h, body: JSON.stringify(patch)
  });
  return res.ok;
}

export async function cuDeleteTask(h, taskId) {
  const res = await fetch(`${CLICKUP.apiBase}/task/${taskId}`, {
    method: 'DELETE', headers: h
  });
  return res.ok;
}

export async function cuAttachImage(authToken, taskId, imageUrl, filename) {
  try {
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return false;
    const blob = await imgRes.blob();
    const form = new FormData();
    form.append('attachment', blob, filename);
    const res = await fetch(`${CLICKUP.apiBase}/task/${taskId}/attachment`, {
      method: 'POST',
      headers: { Authorization: authToken },
      body: form
    });
    return res.ok;
  } catch (e) { return false; }
}

export async function cuComment(h, taskId, text) {
  const res = await fetch(`${CLICKUP.apiBase}/task/${taskId}/comment`, {
    method: 'POST', headers: h,
    body: JSON.stringify({ comment_text: [{ text }] })
  });
  return res.ok;
}

export async function cuGetComments(h, taskId) {
  const res = await fetch(`${CLICKUP.apiBase}/task/${taskId}/comment`, { headers: h });
  const j = await res.json().catch(() => ({}));
  return (j.comments || []).map((c) => {
    if (typeof c.text === 'string') return c.text;
    if (Array.isArray(c.comment)) return c.comment.map((b) => Array.isArray(b.text) ? b.text.map((t) => t.text || '').join('') : (b.text || '')).join('');
    return '';
  }).filter(Boolean);
}

export async function cuGetCommentList(h, taskId) {
  const res = await fetch(`${CLICKUP.apiBase}/task/${taskId}/comment`, { headers: h });
  const j = await res.json().catch(() => ({}));
  return (j.comments || []).map((c) => {
    let text = '';
    if (typeof c.text === 'string') text = c.text;
    else if (Array.isArray(c.comment)) text = c.comment.map((b) => Array.isArray(b.text) ? b.text.map((t) => t.text || '').join('') : (b.text || '')).join('');
    return { id: c.id, text };
  }).filter((c) => c.id);
}

export async function cuDeleteComment(h, taskId, commentId) {
  const res = await fetch(`${CLICKUP.apiBase}/comment/${commentId}`, {
    method: 'DELETE', headers: h
  });
  return res.ok;
}

// Collect previously covered blog topics from the list (names containing "[Blog]").
export async function getPriorTopics(h) {
  const res = await fetch(`${CLICKUP.apiBase}/list/${CLICKUP.listId}/task?subtasks=true&per_page=100`, { headers: h });
  const j = await res.json().catch(() => ({}));
  const tasks = j.tasks || [];
  const topics = tasks
    .map((t) => (t.name || '').replace(/^\s*\[[^\]]*\]\s*/, '').replace(/^\s*[^|]*\|\s*/, '').trim())
    .filter((n) => /\[Blog\]/i.test(n));
  return topics.slice(0, 60);
}

// Best-effort fetch of the Content Strategy Brief doc text.
export async function fetchBriefExcerpt(h) {
  if (!BRIEF_DOC_ID) return '';
  try {
    const res = await fetch(`${CLICKUP.apiBase}/doc/${BRIEF_DOC_ID}`, { headers: h });
    const j = await res.json().catch(() => ({}));
    const text = JSON.stringify(j).replace(/\\n/g, ' ').replace(/[{}\[\]"]/g, ' ');
    return text.slice(0, 1500);
  } catch (e) { return ''; }
}

export function blogDescription(item) {
  return `${item.body || ''}\n\nDisclaimer: ${item.disclaimer || ''}\n\nSegment: ${item.segment || ''} | Pillar: ${item.brand_pillar || ''}\nFeatured image: ${item.featured_image_url || ''}\nHeader image: ${item.header_image_url || ''}`;
}

export function blogCommentText(item) {
  const links = (item.internal_links || []).concat(item.external_links || [])
    .map((l) => `${l.anchor}: ${l.url}`).join('\n');
  return [
    `BLOG ARTICLE — ${item.title}`,
    `Publish: ${item.publish_date || ''} | Segment: ${item.segment || ''} | Pillar: ${item.brand_pillar || ''} | Category: ${item.category || ''}`,
    `Slug: ${item.slug || ''}`,
    `Meta title: ${item.meta_title || ''}`,
    `Meta description: ${item.meta_description || ''}`,
    `Keywords: ${(item.keywords || []).join(', ')}`,
    '',
    item.body || '',
    '',
    `CTA: ${item.cta || ''}`,
    links ? `Links:\n${links}` : '',
    `Featured image: ${item.featured_image_url || ''}`,
    `Header image: ${item.header_image_url || ''}`,
    '',
    `Disclaimer: ${item.disclaimer || ''}`
  ].filter(Boolean).join('\n');
}
export function socialDescription(item) {
  return `${item.copy || ''}\n\nHashtags: ${item.hashtags || ''}\nDisclaimer: ${item.disclaimer || ''}\n\nSegment: ${item.segment || ''} | Pillar: ${item.brand_pillar || ''}\nImage: ${item.image_url || ''}`;
}
export function blogTaskName(item) { return `Draft | [Blog] ${item.title}`; }
export function socialTaskName(item) { return `Draft | [${item.platform}] ${item.topic}`; }

export { ASSIGNEE_USER_ID, CLICKUP, REVIEW_STATUSES };