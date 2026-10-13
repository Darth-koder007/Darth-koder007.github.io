# Portfolio Site

Source for [darth-koder007.github.io](https://darth-koder007.github.io): a single page with one section per project, built with my own component library rather than a generic template.

The projects it links to:

- [00-design-system](https://github.com/Darth-koder007/00-design-system): React component library, token pipeline, Storybook, visual regression tests
- [01-design-system-ai-assistant](https://github.com/Darth-koder007/01-design-system-ai-assistant): static analysis plus an LLM explanation layer for design-system violations
- [02-agentic-codemod-tool](https://github.com/Darth-koder007/02-agentic-codemod-tool): plain-English instruction to a reviewable, type-checked diff
- [03-rag-doc-search](https://github.com/Darth-koder007/03-rag-doc-search): grounded Q&A over the design system's component source

My CV is published at [`/cv.pdf`](https://darth-koder007.github.io/cv.pdf) and generated from [`cv/cv.yaml`](cv/README.md).

## Why the design system is a real dependency

`@ds/components` and `@ds/tokens` are linked in as the actual UI layer (`Card`, `Badge`, and the design tokens as CSS custom properties), not vendored copies. If a token or component changes in the design system, this site picks it up on the next build.

## How it works

- `src/data/projects.ts`: one entry per project (name, pitch, tech tags, a pull-quote from that project's README, and a hand-maintained `status: "live" | "in-progress"`).
- `src/components/ScrollReveal.tsx`: a from-scratch `IntersectionObserver` reveal with no animation library, skipped when `prefers-reduced-motion` is set.
- `src/components/ProjectSection.tsx`: renders a real `<a href>` when a project is `live` and has a URL, otherwise a non-interactive "In progress" marker. Never a `#` or a 404.

## Tests

- 7 unit tests (Vitest + Testing Library): `ProjectSection` live / in-progress / fallback rendering, and `ScrollReveal` observer and reduced-motion paths. jsdom implements neither `matchMedia` nor `IntersectionObserver`, so `src/test-setup.ts` polyfills both.
- 6 Playwright e2e tests against a running dev server: no console errors, every `<a>` has a real `href`, unfinished projects render no `<a>`, one `h1` with an `h2` per section, the contact link is keyboard-focusable, and `prefers-reduced-motion` is honored.

CI (`.github/workflows/ci.yml`) runs on every push.

## Design decisions

- **Hand-maintained link status, not a build-time parse of another repo.** With four entries, a checked-in, human-edited file is more honest and easier to audit.
- **A plain `<a>` for project links, not the design system's `Button`.** `Button` renders a `<button>`, which is the wrong semantics for navigation. The link is styled directly off the public token variables.
- **Contact is email, LinkedIn and GitHub.** No contact form, no work email.

## Known limitations

- Lighthouse (v12, local production build) scores 100 for performance, accessibility, best practices and SEO on both mobile and desktop. That is an automated audit, not a full manual accessibility review. Structural checks (heading order, keyboard reachability, reduced motion, no dead links) are covered by the e2e suite.
- There are no images on the page yet, so there is no alt-text coverage to test.

## Running it locally

The design system must sit next to this repo and be built first:

```bash
git clone https://github.com/Darth-koder007/00-design-system.git
cd 00-design-system && pnpm install \
  && pnpm --filter @ds/tokens run build \
  && pnpm --filter @ds/components run build
cd ..

git clone https://github.com/Darth-koder007/Darth-koder007.github.io.git
cd Darth-koder007.github.io
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # production build to dist/
pnpm test         # unit tests
pnpm test:e2e     # e2e tests (starts its own dev server)
```

## Deployment

Pushes to `main` build the site (checking out and building the design system first) and publish it with GitHub Pages via `.github/workflows/deploy.yml`.
