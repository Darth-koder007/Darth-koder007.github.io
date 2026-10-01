export type ProjectStatus = "live" | "in-progress";

export interface ProjectEntry {
  id: string;
  name: string;
  pitch: string;
  tech: string[];
  pullQuote: string;
  /** Status is hand-maintained against PROGRESS.md's public-flip milestones (M0.9, M1.10,
   * M2.10, M3.8) rather than parsed from it at build time — four entries is simple enough that
   * a checked-in, auditable config beats a build-time cross-repo parse. */
  status: ProjectStatus;
  url?: string;
}

export const PROJECTS: ProjectEntry[] = [
  {
    id: "00-design-system",
    name: "Design System",
    pitch:
      "A small, original React component library — 14 components, a themeable token pipeline, Storybook docs, and a self-hosted visual regression suite. Built from scratch rather than wrapping MUI or Radix, because the point was to prove component API design and release discipline, not to prove I can write JSX around someone else's primitives.",
    tech: ["TypeScript", "React", "Vite", "Storybook", "Playwright"],
    pullQuote:
      'Focus management for Modal and Table\'s controlled/uncontrolled duality were the two places where "looks right" and "is actually correct" diverged the most in testing.',
    status: "in-progress",
  },
  {
    id: "01-design-system-ai-assistant",
    name: "Design-System AI Assistant",
    pitch:
      "A static-analysis tool for the design system above, with an LLM layer on top: it detects real violations (deprecated props, raw HTML duplicating a component), explains each one grounded in the component's actual prop API, and generates a type-checked codemod diff where the fix is mechanical.",
    tech: ["TypeScript", "ts-morph", "Ollama", "Anthropic"],
    pullQuote:
      "Rules stay deterministic; the LLM is scoped to explanation and is never the thing deciding what's wrong.",
    status: "in-progress",
  },
  {
    id: "02-agentic-codemod-tool",
    name: "Agentic Codemod Tool",
    pitch:
      "A CLI that turns a plain-English instruction into a reviewable diff: deterministic AST transforms for known instruction shapes, an LLM for everything else, both gated by the same safety rail — write the real file, type-check it, always revert — before a diff is ever shown.",
    tech: ["TypeScript", "ts-morph", "Ollama", "Anthropic"],
    pullQuote: "The safety rail verifies the output, not fidelity to the instruction.",
    status: "in-progress",
  },
  {
    id: "03-rag-doc-search",
    name: "RAG Component Doc Search",
    pitch:
      "Natural-language Q&A over the design system's real component source: ask how to do something and get an answer grounded in the actual prop types and usage examples, with a citation back to the source file — or an honest \"I don't have documentation for that\" when the question has no real answer.",
    tech: ["TypeScript", "ts-morph", "Ollama embeddings", "RAG"],
    pullQuote:
      "The interesting engineering problem in a RAG system isn't picking an embedding model — it's whether the thing fails loudly or silently.",
    status: "in-progress",
  },
];
