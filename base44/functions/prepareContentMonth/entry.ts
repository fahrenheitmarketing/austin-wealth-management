import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  MONTH_NAMES, shouldRunForDate, buildSchedule, buildResearchPrompt, buildIrsPrompt,
  buildTopicSelectionPrompt, topicPlanSchema, formatTopicPlanReadable,
  ensureStatuses, cuCreateTask, cuComment, getPriorTopics, fetchBriefExcerpt, ASSIGNEE_USER_ID, CLICKUP
} from '../../shared/monthlyRun.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const force = !!body.force;
    const dryRun = !!body.dryRun;

    // Resolve target month.
    const now = new Date();
    let year = now.getUTCFullYear();
    let month = now.getUTCMonth();
    if (body.month && /^\d{4}-\d{2}$/.test(body.month)) {
      const parts = body.month.split('-');
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
    } else {
      const decision = shouldRunForDate(now);
      if (!decision.run && !force) {
        return Response.json({ skipped: true, reason: decision.reason });
      }
    }
    const monthName = MONTH_NAMES[month];
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

    const conn = await base44.asServiceRole.connectors.getConnection('clickup');
    const token = conn && conn.accessToken;
    if (!token) return Response.json({ error: 'no clickup token' }, { status: 500 });
    const h = { Authorization: token, 'Content-Type': 'application/json' };

    // 1. Research phase (web context).
    const research = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: buildResearchPrompt(monthName, month),
      add_context_from_internet: true,
      model: 'gemini_3_flash'
    });
    const irs = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: buildIrsPrompt(),
      add_context_from_internet: true,
      model: 'gemini_3_flash'
    });

    // 2. Continuity + brief.
    const priorTopics = await getPriorTopics(h);
    const briefExcerpt = await fetchBriefExcerpt(h);

    // 3. Topic selection.
    const schedule = buildSchedule(year, month);
    const plan = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: buildTopicSelectionPrompt({ monthName, schedule, research, irs, priorTopics, briefExcerpt }),
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: topicPlanSchema
    });

    // Merge schedule dates into the plan to form the full envelope.
    const blogs = (plan.blogs || []).map((b, i) => ({ ...schedule.blogs[i], ...b }));
    const weeks = (plan.weeks || []).map((w, i) => ({
      num: schedule.weeks[i].num,
      segment: schedule.weeks[i].segment,
      tue: schedule.weeks[i].tue,
      thu: schedule.weeks[i].thu,
      posts: schedule.weeks[i].posts,
      ...w
    }));

    if (dryRun) {
      return Response.json({
        skipped: false, dryRun: true, monthKey, monthName, year,
        researchPreview: String(research).slice(0, 600),
        irsPreview: String(irs).slice(0, 400),
        priorTopicCount: priorTopics.length,
        blogs, weeks
      });
    }

    // 4. Create ClickUp hierarchy.
    const validStatuses = await ensureStatuses(h);
    const draftStatus = validStatuses.includes('Draft') ? 'Draft' : null;
    const parentName = `FM - AWM Content ${monthName} ${year}`;
    const parentTask = await cuCreateTask(h, {
      name: parentName,
      description: `Autonomous monthly content generation for ${monthName} ${year}.`,
      assignees: [ASSIGNEE_USER_ID],
      status: draftStatus
    });
    if (!parentTask.id) return Response.json({ error: 'parent task creation failed', detail: parentTask }, { status: 502 });

    const blogsTask = await cuCreateTask(h, {
      name: `FM - AWM Blogs ${monthName} ${year}`,
      description: '8 blog articles (2/week, Tue + Thu).',
      parent: parentTask.id, assignees: [ASSIGNEE_USER_ID], status: draftStatus
    });
    const socialTask = await cuCreateTask(h, {
      name: `FM - AWM Social ${monthName} ${year}`,
      description: '20 social posts (8 Facebook, 8 LinkedIn, 4 GBP) across 4 weeks.',
      parent: parentTask.id, assignees: [ASSIGNEE_USER_ID], status: draftStatus
    });

    const weekTaskIds = [];
    for (const w of weeks) {
      const wt = await cuCreateTask(h, {
        name: `Week of ${w.tue} — ${w.theme || ('Week ' + w.num)}`,
        description: `Segment: ${w.segment} | Theme: ${w.theme || ''}`,
        parent: socialTask.id, assignees: [ASSIGNEE_USER_ID], status: draftStatus
      });
      weekTaskIds.push(wt.id);
    }

    // 5. Post topic plan (human-readable + machine JSON for the generate step).
    const envelope = {
      monthKey, monthName, year,
      parentTaskId: parentTask.id, blogsTaskId: blogsTask.id, socialTaskId: socialTask.id,
      weekTaskIds, blogs, weeks,
      irs_summary: plan.irs_summary || '',
      research_summary: String(research).slice(0, 1500),
      irs_full: String(irs).slice(0, 1000)
    };
    await cuComment(h, parentTask.id, formatTopicPlanReadable(envelope));
    await cuComment(h, parentTask.id, `[TOPIC_PLAN_JSON]\n${JSON.stringify(envelope)}`);

    return Response.json({
      skipped: false, monthKey, monthName, year,
      parentTaskId: parentTask.id, blogsTaskId: blogsTask.id, socialTaskId: socialTask.id,
      weekTaskIds, blogCount: blogs.length, weekCount: weeks.length,
      priorTopicCount: priorTopics.length
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}