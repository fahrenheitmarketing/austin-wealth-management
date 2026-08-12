// Shared content-production rules for the AWM content-production agent.
// Imported by all generation backend functions so compliance rules live in one place.

export const AUDIENCE_SEGMENTS = [
  "Young Adults (25-45): early-to-mid career professionals with 401(k)s, equity compensation, financial plans needing coordination, not beginners.",
  "Professionals & Executives: high-income earners with complex equity compensation (RSUs, ESPPs, ISOs, NQSOs); concerns: tax efficiency, concentrated stock, coordinating advisor/CPA/estate attorney. Peer-level.",
  "Business Owners: intertwined personal/business finances; compensation structure, retirement plan design, business valuation, exit planning. AWM's 401Pro service serves this segment."
];

export const BRAND_PILLARS = ["Education", "Advocacy", "Systems", "Accountability", "Adaptation"];

export const BLOG_DISCLAIMER = "This content is for informational and educational purposes only and does not constitute financial, investment, tax, or legal advice. Past performance does not guarantee future results. Please consult a qualified financial advisor before making any financial decisions. Austin Wealth Management is a Registered Investment Advisor.";
export const LINKEDIN_DISCLAIMER = "For informational purposes only. Not investment advice. Consult a qualified financial advisor before making any financial decisions.";
export const FACEBOOK_DISCLAIMER = "For informational purposes only. Not investment advice.";
export const GBP_DISCLAIMER = "For informational purposes only. Not investment advice.";

export const COMPLIANCE_RULES = `COMPLIANCE — SEC Rule 206(4)-1 marketing material. Mandatory:
- No specific investment recommendations; explain how things work, not what to buy or sell.
- No performance claims, guaranteed returns, projected outcomes, or market predictions/timing.
- No misleading statements, including by omission. No unsubstantiated factual claims (team size, credentials, client counts, AUM must be verifiable).
- No client testimonials or endorsements. No political or partisan framing of economic events.
- No equity compensation content that tells a client when to exercise or sell specific positions.
- Use hedging language throughout: "may," "can," "in many cases," "depending on your situation."`;

export const IMAGE_RULES = `IMAGE COMPLIANCE — no financial documents, tax returns, statements, or projection reports; no charts, graphs, or data visualizations showing upward trends/growth curves (even abstract or branded); no dashboard screens with portfolio values, vesting schedules, balances, or investment figures; no visible numerical figures, percentages, or dollar amounts. Allowed: blank notepads, pens, coffee cups, architectural/environmental settings, Austin-specific compositions (Congress Avenue bridge toward Capitol, The Domain/North Austin, Austin bungalow interiors, Burnet Road, modern boutique office) where location adds value. No staged stock-photo handshakes, generic poses, or clipart.`;

export const LINK_STANDARDS = `LINKS — never show a raw URL as visible text; always use descriptive anchor text hyperlinked to the destination.
- Confirmed live internal pages (only link to these): https://austinwealthmgmt.com/planning/ , https://austinwealthmgmt.com/investing/ , https://austinwealthmgmt.com/401pro/ , https://austinwealthmgmt.com/education/ , https://austinwealthmgmt.com/make-an-appointment/
- External sources only: IRS, SEC, DOL, SSA, SBA, Exit Planning Institute. Max 2 external links.
- Closing CTA: anchor text "Austin Wealth Management" linking to https://austinwealthmgmt.com/make-an-appointment/ (URL never visible).`;

export const WRITING_STANDARDS = `WRITING — no em dashes (use commas, semicolons, or restructure). Vary sentence rhythm. No listicle/textbook phrasing. Peer-level, direct, plain voice; no hand-holding. No hollow openers ("In today's world..."). No filler ("It's important to note..."). Educational: explain how things work, not what to do. Local references only where they add substance.`;

export const IRS_NOTE = `IRS FIGURES — before including any contribution limit, tax bracket, wage base, or exclusion, verify current-year figures using the provided web context. Prefer irs.gov/newsroom. Specify filing status for tax brackets. If a figure cannot be verified, omit the specific number and describe the concept.`;

export const compliantImagePrefix = "Compliant imagery per AWM rules:";

export function buildBlogPrompt({ segment, topic, pillar, publishDate }) {
  return `You are a content writer for Austin Wealth Management (AWM), a fee-only SEC-registered RIA in Austin, TX. Produce ONE blog article as a JSON object.

AUDIENCE SEGMENT (write to this segment, peer-level): ${segment}
TOPIC: ${topic}
BRAND PILLAR: ${pillar || "Education"}
PUBLISH DATE: ${publishDate || ""}

${COMPLIANCE_RULES}

${LINK_STANDARDS}

${IMAGE_RULES}

${WRITING_STANDARDS}

${IRS_NOTE}

REQUIREMENTS: minimum 800 words, target 1000-1400. Include the full blog disclaimer verbatim in the "disclaimer" field. Provide a featured_image_prompt (1200x628) and header_image_prompt (1920x1080), each fully described and compliant with the image rules. Provide meta_title (under 60 chars), meta_description (under 160 chars), 6-8 keywords, 2-3 internal links, max 2 external links, and a closing CTA using "Austin Wealth Management" as anchor text to the make-an-appointment URL. The body is the article text only; represent links via the internal_links/external_links/cta arrays, never inline raw URLs. Return only the JSON object.`;
}

export const blogJsonSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    segment: { type: "string", enum: ["Young Adults", "Professionals & Executives", "Business Owners"] },
    brand_pillar: { type: "string", enum: BRAND_PILLARS },
    category: { type: "string" },
    compliance_sensitivity: { type: "string", enum: ["Low", "Medium", "High"] },
    publish_date: { type: "string" },
    meta_title: { type: "string" },
    meta_description: { type: "string" },
    keywords: { type: "array", items: { type: "string" } },
    internal_links: { type: "array", items: { type: "object", properties: { anchor: { type: "string" }, url: { type: "string" } } } },
    external_links: { type: "array", items: { type: "object", properties: { anchor: { type: "string" }, url: { type: "string" } } } },
    cta: { type: "string" },
    featured_image_prompt: { type: "string" },
    header_image_prompt: { type: "string" },
    body: { type: "string" },
    disclaimer: { type: "string" }
  },
  required: ["title", "segment", "brand_pillar", "category", "compliance_sensitivity", "meta_title", "meta_description", "keywords", "internal_links", "external_links", "cta", "featured_image_prompt", "header_image_prompt", "body", "disclaimer"]
};

export function platformDisclaimer(platform) {
  if (platform === "LinkedIn") return LINKEDIN_DISCLAIMER;
  if (platform === "Google Business Profile") return GBP_DISCLAIMER;
  return FACEBOOK_DISCLAIMER;
}

export function buildSocialPrompt({ platform, segment, theme, publishDate, week }) {
  return `You are a social media writer for Austin Wealth Management (AWM), a fee-only SEC-registered RIA in Austin, TX. Produce ONE ${platform} post as a JSON object.

AUDIENCE SEGMENT: ${segment}
THEME/TOPIC: ${theme}
PUBLISH DATE: ${publishDate || ""} (week ${week || ""})

${COMPLIANCE_RULES}

${IMAGE_RULES}

PLATFORM TONE:
- Facebook: warm, approachable, community-focused; assumes financial sophistication; never beginner tone. Local references only where genuinely relevant.
- LinkedIn: authoritative, peer-level, substantive, no promotional feel; reader is a sophisticated professional evaluating a wealth management relationship.
- Google Business Profile: warm, locally oriented, consultation-focused; reader found AWM via search.

COPY RULES: no em dashes; never include any URL inside the copy text itself (the short link is stored separately in the short_link field); no bare URLs visible; no alarmist urgency ("last chance", "don't miss"); no unsubstantiated benefit claims (soften to "may make a meaningful difference"); breakeven/market claims attributed or softened; do not force the city name where irrelevant. Hashtags for Facebook and LinkedIn only (Google Business Profile: none). Include the platform-specific disclaimer verbatim in "disclaimer". Provide an "image_prompt" fully described and compliant with image rules. Return only the JSON object.`;
}

export const socialJsonSchema = {
  type: "object",
  properties: {
    copy: { type: "string" },
    topic: { type: "string" },
    hashtags: { type: "string" },
    disclaimer: { type: "string" },
    image_description: { type: "string" },
    image_prompt: { type: "string" },
    short_link: { type: "string" }
  },
  required: ["copy", "topic", "disclaimer", "image_description", "image_prompt"]
};

export function buildBlogFeedbackPrompt({ article, feedback }) {
  return `You are revising a blog article for Austin Wealth Management (AWM) based on reviewer feedback. Apply the same compliance, link, image, and writing rules as a fresh article. Keep the same segment and brand pillar. Return the full revised article as a JSON object matching the schema.

ORIGINAL ARTICLE
Segment: ${article.segment || ''}
Brand pillar: ${article.brand_pillar || ''}
Title: ${article.title || ''}
Body:
${article.body || ''}

REVIEWER FEEDBACK:
${feedback}

Produce the revised article JSON now.`;
}

export function buildSocialFeedbackPrompt({ post, feedback }) {
  return `You are revising a ${post.platform || ''} post for Austin Wealth Management (AWM) based on reviewer feedback. Apply the same compliance, image, and copy rules as a fresh post. Keep the same platform and segment. Return the full revised post as a JSON object matching the schema; never include any URL inside the copy text (the short link lives in the short_link field).

ORIGINAL POST
Platform: ${post.platform || ''}
Segment: ${post.segment || ''}
Topic: ${post.topic || ''}
Copy:
${post.copy || ''}

REVIEWER FEEDBACK:
${feedback}

Produce the revised post JSON now.`;
}