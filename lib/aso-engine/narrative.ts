/**
 * ASO Engine --AI Narrative Summary Generator
 * Uses Anthropic Claude API to write a personalized, human-readable report
 * narrative from the raw pillar data.
 *
 * Cost: ~$0.05-0.10 per report (Claude Haiku)
 */

import type { FullAuditReport } from "./scoring";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

interface NarrativeResult {
  executiveSummary: string;
  pillarNarratives: { pillar: string; narrative: string }[];
  actionPlan: string;
  closingPitch: string;
}

export async function generateNarrative(report: FullAuditReport): Promise<NarrativeResult> {
  if (!ANTHROPIC_API_KEY) {
    console.log("[Narrative] Anthropic API key not set --using template fallback");
    return generateFallbackNarrative(report);
  }

  try {
    const pillarSummaries = report.pillars.map((p) => {
      const passes = p.findings.filter((f) => f.status === "pass").length;
      const fails = p.findings.filter((f) => f.status === "fail").length;
      const topFails = p.findings
        .filter((f) => f.status === "fail")
        .slice(0, 3)
        .map((f) => f.message)
        .join("; ");
      return `${p.pillarLabel}: ${p.grade} (${p.score}/100) --${passes} passing, ${fails} failing. Top issues: ${topFails || "None"}`;
    }).join("\n");

    const prompt = `You are writing a professional business audit report narrative for ${report.businessName}, a ${report.nicheLabel} in ${report.cityState}. Their website is ${report.websiteUrl}.

Overall score: ${report.overallGrade} (${report.overallScore}/100)

Pillar scores:
${pillarSummaries}

Top priorities: ${report.topPriorities.join("; ")}

Write the following sections in a direct, professional tone. No fluff. Be specific about their actual findings. Use their business name throughout.

1. EXECUTIVE SUMMARY (3-4 sentences): Overall assessment. What's working, what's broken, and what it's costing them.

2. PILLAR NARRATIVES (one short paragraph per pillar): For each of the 6 pillars, explain what we found and why it matters in plain English. Reference their specific findings --not generic advice.

3. ACTION PLAN (numbered list of 5-7 items): Prioritized list of exactly what needs to be fixed, in order of impact. Be specific --"Add FAQPage schema with 7 industry-specific questions" not "improve SEO."

4. CLOSING (2-3 sentences): If they want help fixing everything, Fast Digital Marketing can implement all recommendations. Mention our plans start at $197/mo and include a link to the free audit at fastdigitalmarketing.com/audit.

Output as JSON with keys: executiveSummary, pillarNarratives (array of {pillar, narrative}), actionPlan, closingPitch. No markdown formatting in values --just plain text with line breaks where needed.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-20250414",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error(`[Narrative] Anthropic API error: ${res.status}`);
      return generateFallbackNarrative(report);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        executiveSummary: parsed.executiveSummary || "",
        pillarNarratives: parsed.pillarNarratives || [],
        actionPlan: parsed.actionPlan || "",
        closingPitch: parsed.closingPitch || "",
      };
    }

    return generateFallbackNarrative(report);
  } catch (err) {
    console.error("[Narrative] Failed to generate:", err);
    return generateFallbackNarrative(report);
  }
}

/**
 * Fallback narrative when Anthropic API is unavailable.
 * Template-based, still personalized with business data.
 */
function generateFallbackNarrative(report: FullAuditReport): NarrativeResult {
  const biz = report.businessName;
  const niche = report.nicheLabel;
  const city = report.cityState;

  const worstPillars = [...report.pillars].sort((a, b) => a.score - b.score).slice(0, 3);
  const bestPillars = [...report.pillars].sort((a, b) => b.score - a.score).slice(0, 2);

  const executiveSummary = `${biz} scored ${report.overallGrade} (${report.overallScore}/100) in our comprehensive AI Search Optimization audit. ` +
    `Your strongest areas are ${bestPillars.map(p => `${p.pillarLabel} (${p.grade})`).join(" and ")}. ` +
    `However, critical weaknesses in ${worstPillars.map(p => `${p.pillarLabel} (${p.grade})`).join(", ")} are preventing AI search engines like ChatGPT, Perplexity, and Google AI Overviews from citing your business. ` +
    `This means potential customers asking AI for ${niche} recommendations in ${city} are being sent to your competitors instead.`;

  const pillarNarratives = report.pillars.map((p) => {
    const fails = p.findings.filter(f => f.status === "fail");
    const passes = p.findings.filter(f => f.status === "pass");

    let narrative: string;
    if (p.score >= 80) {
      narrative = `${p.pillarLabel} is one of your strongest areas at ${p.grade} (${p.score}/100). ${passes.length} of ${p.findings.length} checks passed. ` +
        (fails.length > 0 ? `Minor gaps remain: ${fails.map(f => f.message).join(". ")}.` : "No critical issues found.");
    } else if (p.score >= 60) {
      narrative = `${p.pillarLabel} scored ${p.grade} (${p.score}/100) --functional but leaving opportunities on the table. ` +
        `Key issues: ${fails.slice(0, 3).map(f => f.message).join(". ")}. ` +
        `Fixing these would improve your AI search visibility significantly.`;
    } else {
      narrative = `${p.pillarLabel} is a critical weakness at ${p.grade} (${p.score}/100). ` +
        `${fails.length} of ${p.findings.length} checks failed. ` +
        `Top issues: ${fails.slice(0, 3).map(f => f.message).join(". ")}. ` +
        `This is directly costing you customers who search via AI.`;
    }

    return { pillar: p.pillarLabel, narrative };
  });

  const actionItems = worstPillars.flatMap(p =>
    p.findings.filter(f => f.status === "fail").slice(0, 2).map(f => f.message)
  );

  const actionPlan = `Priority fixes for ${biz}:\n` +
    actionItems.map((item, i) => `${i + 1}. ${item}`).join("\n") +
    `\n${actionItems.length + 1}. Re-run this audit after implementing changes to verify improvement.`;

  const closingPitch = `If you'd rather have experts handle all of this, Fast Digital Marketing specializes in exactly these fixes. ` +
    `Our plans start at $197/mo and include implementation of every recommendation in this report. ` +
    `We also offer a complete done-for-you setup --website rebuild, schema implementation, AI search optimization, and ongoing management. ` +
    `Visit fastdigitalmarketing.com or call (888) 983-4449 to get started.`;

  return { executiveSummary, pillarNarratives, actionPlan, closingPitch };
}
