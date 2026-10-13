/** Public-safe wording only: mirrors cv/cv.yaml, no internal counts, org names or system names. */

export interface Stat {
  value: string;
  label: string;
}

export interface WorkItem {
  id: string;
  title: string;
  summary: string;
}

export const STATS: Stat[] = [
  { value: "5 → 14", label: "design-system themes shipped" },
  { value: "−15%", label: "design-token bundle size" },
  { value: "20+", label: "themes under automated visual regression" },
  { value: "~1 day → <10 s", label: "answer time for design-system questions" },
];

export const WORK: WorkItem[] = [
  {
    id: "cape",
    title: "Cape design system",
    summary:
      "Token architecture, component APIs, versioning, migration codemods, visual regression testing and adoption analytics for Delivery Hero's design system.",
  },
  {
    id: "cape-fly",
    title: "Cape Fly",
    summary:
      "An agentic RAG Slack bot (Gemini on Vertex AI) that answers design-system questions with cited sources. Built solo. Ambient mode calls the LLM only after a private opt-in.",
  },
  {
    id: "design-to-code",
    title: "MCP design-to-code pipeline",
    summary:
      "A canonical component and token manifest plus a custom MCP server that, with Figma's MCP, grounds Claude's UI generation in real contracts instead of invented markup.",
  },
  {
    id: "kpi-dashboard",
    title: "Executive KPI dashboard",
    summary:
      "Led a React, Node.js (Hono), BigQuery, Redis and Kubernetes dashboard for executive engineering leadership.",
  },
];
