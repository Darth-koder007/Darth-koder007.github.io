# Portfolio Site

The front door for [the other four projects in this portfolio](..): a single page, one section per project, built with [Project 0's own component library](../00-design-system) rather than a generic template. Replaces a dead, unfinished 2018 "Start Bootstrap" scaffold that was still live at `darth-koder007.github.io`.

## Why this is a real dependency, not a demo

`@ds/components` and `@ds/tokens` are linked in as the actual UI layer (`Card`, `Badge`, and the raw design tokens via CSS custom properties) — not vendored copies, not a reimplementation. If Project 0 changes a token or a component's markup, this site picks it up on the next build. That's the point: a portfolio site built with your own design system is a stronger signal than any framework choice.

## How it works

- `src/data/projects.ts` — one entry per project: name, pitch, tech tags, a real pull-quote pulled from that project's own README, and a hand-maintained `status: "live" | "in-progress"`. Checked in and auditable, not parsed from `PROGRESS.md` at build time — four entries doesn't justify that complexity.
- `src/components/ScrollReveal.tsx` — a from-scratch `IntersectionObserver`-driven reveal (no animation library), skipped entirely when `prefers-reduced-motion` is set.
- `src/components/ProjectSection.tsx` — renders a project as a real `<a href>` when `status: "live"` and a URL is configured, or a plain, non-interactive "In progress" marker otherwise. Never a `#` or a 404 — see the e2e tests below.

## Verified, not just asserted

- 7 unit tests (Vitest + Testing Library): `ProjectSection`'s live/in-progress/fallback rendering, `ScrollReveal`'s observer-triggered and reduced-motion paths (with real jsdom gaps found and fixed along the way — jsdom implements neither `matchMedia` nor `IntersectionObserver`, so both needed explicit polyfills in `src/test-setup.ts`).
- 6 Playwright e2e tests against a real running dev server: zero console errors; every `<a>` on the page has a real, non-placeholder `href` (the literal "no dead links" invariant this project's plan calls for); unfinished projects render no `<a>` at all; exactly one `h1` with an `h2` per section; the contact link is keyboard-focusable; `prefers-reduced-motion` is honored.
- A real screenshot-based check caught a false alarm worth recording: a full-page Playwright screenshot taken without manually scrolling only showed the first two project sections, with a large empty gap after — looked like a broken reveal. Scrolling through the page first (the way a real visitor would) showed all four sections and the contact link rendering correctly. The bug was in the verification method, not the site; documented in `PLAN.md` rather than silently discarded once it turned out to be a non-issue.
- Both the dev server and the production (`vite build` + `vite preview`) build were visually checked and produced an identical render with zero console errors.

## Design decisions

**Hand-maintained link-status config, not a build-time `PROGRESS.md` parse.** The plan allows either. Four project entries is well within the range where a checked-in, human-edited file is more honest and auditable than a cross-repo parsing step that could silently break.

**A plain `<a>` for project links, not the design system's `Button`.** `Button` renders a `<button>` element — correct for in-page actions, wrong semantics for navigation. Styling the link directly off the design tokens (`var(--ds-color-accent)`, etc.) uses the same public CSS-variable contract Project 0's own README documents, without miscasting a navigation link as a button click.

**Contact is a GitHub link, not a guessed email address.** No personal contact email was available to put on a public, job-hunting-facing site, and publishing a work email address on it would mix identities in a way that doesn't serve the stated purpose. GitHub is real, working, and verifiable right now.

## Real limitations (not hidden)

- **M4.1's literal instruction — "repurpose the existing `darth-koder007.github.io` repo, keep the domain config" — couldn't be done as written.** This assistant has no access to that repo's current state (the dead 2018 template, whatever CNAME/domain config it holds). Built as a new repo instead, matching every other project in this portfolio; `.github/workflows/deploy.yml` has an explicit note on what needs adding (a `CNAME` file) once this is actually merged into that repo or repointed at that domain.
- **Deployment (M4.4) and the Lighthouse pass (M4.5) are blocked on the same thing every other project's public-flip milestone is: GitHub account access.** The deploy workflow is written and should work once pushed, but hasn't run for real. Lighthouse needs a live URL to audit, which doesn't exist yet.
- **Accessibility is verified structurally (heading order, keyboard reachability, reduced-motion, zero dead links), not audited with a full axe-core pass.** The e2e suite checks specific, real things rather than claiming a comprehensive accessibility audit it doesn't do.
- **No images exist on the page yet**, so "alt text on all images" (M4.5) is vacuously satisfied rather than actually exercised.

## Running it locally

```bash
# from this portfolio's root, Project 0 must be built first:
cd ../00-design-system && pnpm install && pnpm --filter @ds/tokens run build && pnpm --filter @ds/components run build

cd ../04-portfolio-site
pnpm install
pnpm dev              # http://localhost:5173
pnpm build             # production build to dist/
pnpm test              # unit tests
pnpm test:e2e          # e2e tests (starts its own dev server)
```

## Status

Everything above is verified locally, including real visual checks of both the dev server and the production build. What's pending is external: this repo isn't yet merged into the real `darth-koder007.github.io` repo, and deployment/Lighthouse both need that GitHub access this assistant doesn't have.
