# Project 4 — Portfolio Site

## Purpose

Replace `darth-koder007.github.io` — currently a dead, unfinished 2018 "Start Bootstrap" template (lorem ipsum project copy, dead social/download links, `#` hrefs). The new site is the umbrella that ties Projects 0-3 together for anyone landing from the resume or LinkedIn.

## Tech decisions

- **Built with Project 0's own component library.** This is the point, not an implementation detail: the portfolio site is a real consumer of the design system, and "I used my own component library to build my portfolio" is a stronger line than any framework choice. Layout/page shell can be plain React around it.
- **Hosting:** GitHub Pages at the existing `darth-koder007.github.io` custom domain slot — this is one of the rare repos that's public from day one, since it's the public front door, but see M4.3 for how unfinished projects are represented without dead links.
- **Effect:** scroll-triggered reveal per project section (IntersectionObserver-driven, CSS transforms) rather than a heavy parallax library — keeps M4.5's performance pass realistic and is easy to defend as "I built this, not a plugin" in an interview.

## Milestones

### M4.1 — Repo scaffold — done (as a new repo; see note)

- [x] New repo — **could not literally "repurpose the existing `darth-koder007.github.io` repo"**: this assistant has no access to inspect or modify that repo's current content (the dead 2018 template, whatever domain/CNAME config it holds). Built as a new local repo instead, same as every other project in this portfolio; disclosed rather than silently substituted. Merging this into that repo (or repointing the domain at it) is a manual step for the user, same category as every other GitHub-access blocker in this portfolio.
- [x] Project 0's packages installed as real dependencies via `link:../00-design-system/packages/{components,tokens}` — same pattern as Project 1, verified by actually building the site against them (not just resolving)
- [x] Basic page shell: hero/intro, project sections, contact
- **Acceptance:** `pnpm build` produces a working production bundle (151 KB JS / 13 KB CSS, 49 KB gzipped JS); real `Card`/`Badge` from `@ds/components` render correctly, confirmed via a live Playwright screenshot of both the dev server and the production preview — not just "it compiled."

### M4.2 — Section-per-project layout + effect — done

- [x] One section per project (0-3; the fifth "project" in this numbering is this site itself, so 4 sections), each with: name, one-paragraph pitch, tech stack tags, live link, a real pull-quote taken verbatim from that project's own README
- [x] Scroll-triggered reveal (`ScrollReveal.tsx`, hand-written `IntersectionObserver`, no animation library), respecting `prefers-reduced-motion`
- [x] Real, specific copy throughout — every pitch and pull-quote is either lifted verbatim from or directly paraphrased from that project's own README, not generic
- **Acceptance:** 7 unit tests (`ProjectSection.test.tsx`, `ScrollReveal.test.tsx`) plus live verification — a real Playwright screenshot initially showed only 2 of 4 sections with a large empty gap after; turned out to be the screenshot method (full-page capture without manually scrolling doesn't reliably fire every `IntersectionObserver` below the fold), not a real bug — confirmed by scrolling through the page programmatically first and seeing all 4 sections plus Contact render correctly. Two real jsdom gaps found while writing the unit tests: jsdom implements neither `matchMedia` nor `IntersectionObserver`, both needed explicit polyfills in `test-setup.ts` before any test rendering `ScrollReveal` could run at all.

### M4.3 — Live wiring without dead links — done

- [x] Each project section reads its live-link state from `src/data/projects.ts`, a small hand-maintained config (not a build-time `PROGRESS.md` parse — four entries doesn't justify that complexity) — finished projects show the real link, unfinished ones show an honest "In progress" marker that is structurally not an `<a>` at all, never a broken `#` or 404
- **Acceptance:** live Playwright e2e test (`e2e/portfolio.spec.ts`) against a real running dev server: every `<a>` on the page has a real, non-placeholder `href`; "In progress" markers are confirmed to not be `<a>` tags. All 4 projects currently show "In progress" since none has reached its public-flip milestone yet (`PROGRESS.md`'s M0.9/M1.10/M2.10/M3.8) — this is the honest current state, not a placeholder left for later.

### M4.4 — Deploy — written, not run (blocked)

- [x] `.github/workflows/deploy.yml` written: GitHub Pages build/deploy via Actions, builds Project 0's packages first (same cross-repo pattern as Project 1's CI), uploads the `vite build` output
- [x] Contact is a real, working GitHub profile link — not a guessed email address (no personal contact email was available, and publishing a work email on a public job-hunting site would be the wrong move) and not the old template's non-functional form
- **Not yet run for real** — needs this repo actually pushed to (or merged into) `darth-koder007.github.io`, the same GitHub-access blocker as every other project's public-flip milestone. The workflow has an explicit comment noting a `CNAME` file needs adding once the real domain config is known.

### M4.5 — Performance + accessibility pass — partially done (Lighthouse blocked)

- [x] Keyboard navigable (e2e-verified: the contact link is reachable via `.focus()` and asserted focused), correct heading structure (e2e-verified: exactly one `h1`, one `h2` per section)
- [x] `prefers-reduced-motion` honored (e2e-verified: content renders already-visible with motion disabled, no animation)
- [ ] Lighthouse scores — **blocked**, needs a live deployed URL to audit against; nothing to measure yet
- **Acceptance, scoped honestly:** accessibility is verified structurally (heading order, keyboard reachability, reduced-motion, zero dead links via 6 passing e2e tests), not audited with a full axe-core pass — this project's own testing-strategy note calls this "lighter than other projects by nature," and the e2e suite checks specific real things rather than claiming a comprehensive audit it doesn't do. No images exist on the page yet, so "alt text on all images" is currently vacuous rather than exercised.

### M4.6 — README — done

- [x] Short and repo-facing — what it's built with, why the design-system dependency, how to run locally
- **Acceptance:** README includes the exact `pnpm install && pnpm build` sequence for both repos (Project 0 then this one), matching what was actually run and verified during development.

## Testing strategy (summary)

Lighter than the other projects by nature (a marketing/portfolio page, not an application) — the meaningful checks are Lighthouse thresholds in CI (M4.5) and the "no dead links" invariant (M4.3), both automatable rather than manual QA every time a project section is added.
