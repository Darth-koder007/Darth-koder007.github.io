# Resume brief: Vijay Singh

Source material for generating a resume (and a master CV). Everything below was stated by Vijay. Do not invent metrics, employers, tools or dates. Where a number is missing, write the bullet without one.

## Output rules (from Vijay)

- Output must be ready to send: no placeholders, brackets, TODOs, internal comments or AI marks inside the resume file. Questions and caveats go in the chat only.
- Do NOT state total years of experience anywhere (he doesn't want to look overqualified). Dates per role are fine.
- Lead with the design-system engineering role. Don't undersell it.
- Tone: concise, direct, concrete. Bullets start with strong verbs. Keep it to 1-2 pages.
- Offer two variants: (A) Frontend / Design Systems / AI tooling (default), (B) Backend-inclined full-stack (sees himself as frontend at his core, with real backend exposure).

## Header

- Name: Vijay Singh
- Headline: Senior Frontend Engineer, Design Systems & AI-Augmented Developer Tooling | React · TypeScript
- Location: Berlin, Germany
- Email: vj2010sn@gmail.com
- LinkedIn: linkedin.com/in/vijay-singh-75b335b4
- Portfolio: vijaysingh.dev (new domain, Oct 2026; GitHub Pages site at darth-koder007.github.io)
- Languages: English (professional), Hindi (native). German is A1, aiming for B1 (leave off the resume unless asked).

## Summary (draft angle)

Frontend engineer specializing in design systems and developer tooling, applying LLMs to code analysis and developer workflows. Built static-analysis tooling (TypeScript parser) to track design-system adoption at scale, and now builds LLM-powered extensions of it: a RAG support bot and an MCP-based design-to-code pipeline. Also has hands-on backend experience: BFF/GraphQL layers, SQL, event-driven processing, deployments via Kubernetes/Terraform/GitOps.

## Experience

### Delivery Hero, Berlin (Oct 2021 – present)

**Senior Software Engineer** (Oct 2024 – present)
Context: Experience team; owns Cape, DH's design system (component library + design tokens shipped as an NPM package, adopted org-wide).

- Owns Cape: component library and design tokens, shipped as an NPM package and adopted org-wide.
- Led Cape Crawler: automated design-system adoption tracking across frontend repos via static analysis.
- Built Cape Fly (proposed, planned and built solo): agentic AI Slack bot using RAG and tool-calling (Gemini 3.1 Pro on Google Vertex AI) that answers design-system questions in #dh-cape-community with cited sources and confidence scoring. Live ~6 months as of Oct 2026. Added a cost-aware ambient-detection mode that gates LLM calls behind explicit user opt-in. Deployed on DH's GDP platform (Drone, Harbor, Argo CD on Kubernetes).
- Built a canonical design-system manifest powering an MCP design-to-code pipeline: Figma's MCP server and a custom Cape MCP server both resolve against it, grounding Claude's generated UI in real component/token contracts instead of hallucinated markup. (Brand new, no usage data yet.)
- Built the Figma-to-production design-token pipeline (Figma Variables → GitHub → token package → component package).
- Versioning/token pipeline work: `capeVersion` parameter system using changeset status to predict future versions in CI/CD, with `[data-cape-version]` attribute selectors for CSS version isolation (chosen over CSS layer ordering).
- Extended the design system into Help Center, a B2C customer-facing product, including a performance workstream (critical rendering path, cold-start optimization).
- Led the GTC Dashboard (tf-dashboards), an internal analytics platform for project-cost and team-management reporting. Set up the project scaffold and led 2 other engineers.
- Contributed to Jarvis (DH's Internal Developer Platform): service catalog, deploy workflows, config-management conflict handling.
- Contributed to dh-backstage (Backstage-based developer portal), including BFF-style data aggregation.
- Integrated Cape into a Next.js ops portal.
- Storybook tooling: `themeWrapper` decorator with conditional theme rendering; type-safe discriminated-union prop restrictions for a ThemeProvider component.
- Hackathon (Mar 2026): participated as the frontend/design-systems attendee; identified "Cape Component Copilot" as the strongest project angle.
- Tech: React, TypeScript, Node.js, LLM/GenAI, RAG, MCP, Figma API, Google Vertex AI (Gemini), Storybook, GitHub Actions, CI/CD, Kubernetes, Argo CD.

**Software Engineer 2** (Oct 2021 – Sep 2024)
Back-office design system, frontend engineer.

- Drove requirements discussions with product engineers, then built reusable, scalable UI components shipped in the design-system NPM package.
- Onboarded product teams to the design system and supported them.
- Metrics project: built a metrics dashboard and API tracking UI-component usage across frontend GitHub repos, using static analysis with a TypeScript parser (the origin of Cape Crawler).
- Took part in revamping the design tokens (a core foundation of the system).
- Wrote unit, integration and visual tests for UI components.
- Automated release/publish of private NPM packages in a monorepo with GitHub Actions.
- Tech: React, Node.js, TypeScript, GitHub Actions, monorepo.

### InMobi, Bangalore (Jan 2019 – Oct 2021)

**SDE II** (Jan 2020 – Oct 2021) / **SDE I** (Jan 2019 – Jan 2020)

- Customer Data Platform: core team that built the CDP UI; took part in UI component, UI-UX and project architecture planning.
- Audience Intelligence Platform: led the team building the UI and mentored team members; worked on UI-UX/product/PRD discussions; delivered with unit and integration tests. Built BFF layer (GraphQL) merging multiple data sources, and created SQL tables for enriched audience segments via a Node SQL library.
- Design system: with architects and the UX lead, part of the initial build; built reusable components and dynamically generated docs for all components.

### Paytm Payments Bank, Noida (May 2018 – Jan 2019)

**Software Engineer**

- One of the founding engineers of the team.
- Built the corporate salary-account experience (React, Redux, SQL, Redis, Docker): lets corporate net-banking users control salary operations for enrolled employees.
- Built the Web Remittance flow (send money to a non-Paytm user): React/Redux/TypeScript, Hapi/Express backend, state machine, reusable OTP component, address book.
- Worked on event-driven processing in net banking (long-running statement downloads, post-order/passive background processes); BFF with GraphQL.
- Wrote Jest and Cypress unit/e2e tests with a mock backend for the net-banking flow.

### Wadi.com, Gurgaon (Jan 2016 – May 2018)

**Software Development Engineer** (Apr 2016 – May 2018) / **Technology Trainee** (Jan – Mar 2016). First job out of college.

- Checkout (frontend DRI for key pieces): built sign-in/sign-up components on the Angular checkout (PHP backend), then rebuilt checkout from scratch in React with SSR, critical-CSS inlining, CDN images, Cypress visual + e2e tests, Sentry, SCSS, responsive/cross-browser support. Features: one-click checkout, social login, OTP auth, Google Analytics, geolocation, address book, the whole post-order consumer experience.
- Order cancellation reduction: DRI for frontend of the OTP verification project (Twilio SMS, Hapi.js backend, later ported to PHP); revamped the user-information capture workflow on My Account and checkout.
- A/B tests on checkout versions using UTM params + GTM keys + Google Analytics to compare field layouts, which led to a unified flow. Fixed thousands of bugs and shipped many small features.
- Wadi Grocery: lead contributor on the mobile web app for ordering fresh groceries in KSA and UAE. Also built the checkout web view embedded in native iOS/Android apps (postMessage bridge).
- Origami internal ops panel (Angular/Node/SQL) with role-based access control; in-house drag-and-drop CMS inside Origami (JSON pages in MongoDB served via CDN, per-country variants) for landing/listing/product pages.
- Standalone signup.wadi.com (AngularJS, Hapi.js, SQL, email OTP, TTL + cron, voucher newsletter); product recommendations.
- Post-order operations: order-process endpoint publishes to RabbitMQ; consumer calls order-details endpoint and sends order-confirmation emails through an Express email service.
- Production SQL changes via a Node SQL library (e.g. added metadata fields).
- Google Analytics/GTM instrumentation on the AngularJS storefront.
- Trello reports (trainee take-home that became a project): Node.js + Trello API order-lane automation, daily and weekly QC reports and visualizations by email.
- Backend context: SQL, Redis, Kubernetes, Terraform, Nginx, AWS.

## Skills (group, don't pad)

- Frontend: React, TypeScript, Redux, Next.js, SSR, Storybook, design systems and tokens, SCSS, Angular/AngularJS (legacy), accessibility/perf (critical rendering path)
- Testing: Jest, Cypress (visual + e2e), unit/integration/visual testing
- Backend / data: Node.js (Express, Hapi), GraphQL BFF, SQL, Redis, MongoDB, RabbitMQ
- AI / tooling: LLM apps, RAG, tool-calling, MCP servers, Google Vertex AI (Gemini), Claude, Figma API, static analysis (TypeScript parser)
- Infra / CI: GitHub Actions, monorepo release automation, Docker, Kubernetes, Terraform, Argo CD / GitOps, AWS, Backstage

## Education

- B.Tech-equivalent Engineer's Degree, Computer Science, Dr. A.P.J. Abdul Kalam Technical University (2012 – 2016)
- Certification: Internship in Java Web Applications

## Do not include

- Anything about disputes with an employer, exit or severance terms, legal matters, job-search status, or compensation.
- Interview process details for other companies.
