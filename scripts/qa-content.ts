/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * QA Content — runs an automated content audit across all niches in
 * lib/data/niche-site-content.ts. Sends each niche's content block to
 * Claude with a tight QA prompt and writes a punchlist to
 * data/qa-content-report.md.
 *
 * What it catches:
 *   - typos, grammar, missing commas, broken contractions
 *   - cross-niche bleed (med spa copy referencing salons, etc.)
 *   - placeholder-style content ("Service One", "lorem", "TBD")
 *   - service names that don't fit the niche
 *   - voice/tone breaks
 *   - HTML entity leftovers (&rsquo; etc.) that won't decode in plain JSX
 *
 * Run BEFORE every push that touches niche content:
 *   npm run qa-content
 *
 * Requires ANTHROPIC_API_KEY in .env.local. Add it via:
 *   echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env.local
 */

import Anthropic from "@anthropic-ai/sdk";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import {
  NICHE_SITE_CONTENT,
  type NicheSiteContent,
} from "../lib/data/niche-site-content";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error(
    "❌ ANTHROPIC_API_KEY is not set in .env.local.\n" +
      "   Get one at https://console.anthropic.com/ and add it:\n" +
      '   echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env.local'
  );
  process.exit(1);
}

const client = new Anthropic({ apiKey });

const MODEL = "claude-sonnet-4-5";

const SYSTEM_PROMPT = `You are a strict content QA reviewer for a marketing platform. You audit niche-specific website copy for errors before it ships to customers.

For each content block you review, check for:

1. **Typos and spelling errors** — especially in long-form fields
2. **Grammar errors** — subject-verb agreement, missing articles, broken sentences, missing commas in coordinate adjectives ("calm focused" → "calm, focused")
3. **Cross-niche bleed** — vocabulary from a different industry showing up (e.g. "salon" or "stylist" in a med spa block, "concrete" in a hair salon block)
4. **Placeholder content** — anything still saying "Service One/Two/Three", "lorem", "TBD", "[niche]", or generic filler that wasn't replaced
5. **Service name mismatch** — services that don't fit the industry
6. **HTML entity leftovers** — \`&rsquo;\`, \`&lsquo;\`, \`&ldquo;\`, \`&rdquo;\`, \`&amp;\` showing up in field values (these render literally as text, not as smart quotes — flag every instance)
7. **Voice/tone breaks** — sudden shifts to internal jargon, marketing-speak, or wrong audience

Output format: STRICT JSON only. Schema:
{
  "issues": [
    { "field": "field path (e.g. services[2].description)", "text": "exact problematic text quoted", "issue": "what's wrong", "fix": "suggested fix" }
  ]
}

If the niche is clean, return: { "issues": [] }

Be ruthless. Flag real issues only. Do not flag stylistic preferences or things that are merely "could be better." Empty issues array is the right answer for clean content.

CRITICAL — FALSE POSITIVE GUARD:
Before adding any item to "issues", compare your "text" field against your "fix" field character-by-character. If they are byte-identical, DO NOT include that item — it means the content already has the fix you're suggesting. This applies especially to comma fixes ("calm, focused" already has the comma — do not flag it as missing). Same for spelling, capitalization, possessives, and any other fix where the "before" and "after" would look identical. Empty issues array is correct when no real fixes are needed.`;

interface Issue {
  field: string;
  text: string;
  issue: string;
  fix: string;
}

interface NicheReport {
  slug: string;
  issues: Issue[];
  rawText?: string;
  error?: string;
}

async function reviewNiche(slug: string, content: NicheSiteContent): Promise<NicheReport> {
  const userMessage = `Niche slug: \`${slug}\`

Review this content block for issues per the rules:

\`\`\`json
${JSON.stringify(content, null, 2)}
\`\`\`

Return only the JSON object. No prose, no markdown fences.`;

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const text = textBlock && "text" in textBlock ? textBlock.text : "";
    const cleaned = text
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");

    let parsed: { issues: Issue[] };
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return { slug, issues: [], rawText: text, error: "Failed to parse JSON response" };
    }

    return { slug, issues: parsed.issues || [] };
  } catch (err: any) {
    return { slug, issues: [], error: err?.message || String(err) };
  }
}

function formatReport(reports: NicheReport[]): string {
  const lines: string[] = [];
  lines.push("# Niche Site Content — QA Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Niches reviewed: ${reports.length}`);
  const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0);
  lines.push(`Total issues found: ${totalIssues}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const r of reports) {
    lines.push(`## \`${r.slug}\``);
    lines.push("");
    if (r.error) {
      lines.push(`⚠️  Error: ${r.error}`);
      if (r.rawText) {
        lines.push("");
        lines.push("```");
        lines.push(r.rawText);
        lines.push("```");
      }
      lines.push("");
      continue;
    }
    if (r.issues.length === 0) {
      lines.push("✓ clean");
      lines.push("");
      continue;
    }
    for (const issue of r.issues) {
      lines.push(`- **\`${issue.field}\`**`);
      lines.push(`  - Text: "${issue.text}"`);
      lines.push(`  - Issue: ${issue.issue}`);
      lines.push(`  - Fix: ${issue.fix}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

async function main() {
  const slugs = Object.keys(NICHE_SITE_CONTENT);
  console.log(`🔍 Auditing ${slugs.length} niches with Claude…\n`);

  const reports: NicheReport[] = [];
  // Run sequentially so we don't hit rate limits and so progress is readable
  for (const slug of slugs) {
    process.stdout.write(`  ${slug}… `);
    const report = await reviewNiche(slug, NICHE_SITE_CONTENT[slug]);
    reports.push(report);
    if (report.error) {
      console.log(`⚠️  ${report.error}`);
    } else if (report.issues.length === 0) {
      console.log("✓ clean");
    } else {
      console.log(`⚑ ${report.issues.length} issue${report.issues.length === 1 ? "" : "s"}`);
    }
  }

  const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0);
  console.log(`\nDone. ${totalIssues} issue${totalIssues === 1 ? "" : "s"} across ${reports.length} niches.`);

  // Write report
  const outDir = path.join(process.cwd(), "data");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "qa-content-report.md");
  writeFileSync(outPath, formatReport(reports), "utf-8");
  console.log(`\n📄 Report written to: ${outPath}`);

  // Exit with non-zero status if issues found, so CI can gate on it
  if (totalIssues > 0) {
    console.log("\n❌ Issues found — review the report and fix before pushing.");
    process.exit(1);
  } else {
    console.log("\n✅ All niches clean.");
  }
}

main().catch((err) => {
  console.error("\n❌ QA script failed:", err);
  process.exit(1);
});
