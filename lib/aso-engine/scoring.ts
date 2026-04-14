/**
 * ASO Engine — Scoring System
 * Universal scoring rubric based on the 6 ASO pillars.
 */

export interface PillarResult {
  pillar: string;
  pillarLabel: string;
  grade: string;
  score: number;
  findings: Finding[];
  recommendations: string[];
  serviceName: string;
  serviceLink: string;
}

export interface Finding {
  status: "pass" | "fail" | "warn" | "info";
  message: string;
  weight: number; // how much this finding impacts the score
}

export interface FullAuditReport {
  businessName: string;
  niche: string;
  nicheLabel: string;
  cityState: string;
  websiteUrl: string;
  overallGrade: string;
  overallScore: number;
  pillars: PillarResult[];
  summary: string;
  topPriorities: string[];
  generatedAt: string;
}

export function scoreToGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "F";
}

export function gradeColor(grade: string): string {
  switch (grade) {
    case "A": return "#22c55e";
    case "B": return "#3b82f6";
    case "C": return "#eab308";
    case "D": return "#f97316";
    default: return "#ef4444";
  }
}

/**
 * Calculate a pillar score from its findings.
 * Each finding has a weight (points possible). Pass = full points, fail = 0, warn = half.
 */
export function calculatePillarScore(findings: Finding[]): number {
  const totalWeight = findings.reduce((sum, f) => sum + f.weight, 0);
  if (totalWeight === 0) return 0;

  const earned = findings.reduce((sum, f) => {
    if (f.status === "pass") return sum + f.weight;
    if (f.status === "warn") return sum + f.weight * 0.5;
    return sum;
  }, 0);

  return Math.round((earned / totalWeight) * 100);
}

/**
 * Generate the overall summary paragraph based on score.
 */
export function generateSummary(score: number, businessName: string, niche: string): string {
  if (score >= 90) {
    return `${businessName} has an excellent online presence for a ${niche}. You're in the top tier for AI search readiness and traditional SEO. Focus on maintaining freshness and expanding content to stay ahead.`;
  }
  if (score >= 75) {
    return `${businessName} has a solid foundation but is leaving opportunities on the table. Competitors with better AI search optimization are likely capturing customers who should be yours. Targeted improvements in 2-3 areas would put you in the top tier.`;
  }
  if (score >= 60) {
    return `${businessName} is visible online but has significant gaps. AI search engines (ChatGPT, Perplexity, Google AI) are unlikely to cite your business. Most of your competitors have the same gaps — the first to fix them wins.`;
  }
  if (score >= 45) {
    return `${businessName} has critical weaknesses across multiple areas. You're losing customers to competitors every day — especially through AI search channels where you're completely invisible. Immediate action needed.`;
  }
  return `${businessName} has severe online presence issues. Your business is essentially invisible to both traditional and AI search engines. Competitors are capturing virtually all search-driven customers in your market. This needs to be fixed urgently.`;
}

/**
 * Pick the top 3 priorities from pillar results (worst-scoring pillars first).
 */
export function getTopPriorities(pillars: PillarResult[]): string[] {
  return [...pillars]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((p) => {
      const topFail = p.findings.find((f) => f.status === "fail");
      return topFail
        ? `${p.pillarLabel}: ${topFail.message}`
        : `${p.pillarLabel}: Score ${p.score}/100 — needs improvement`;
    });
}
