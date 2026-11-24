---
name: tailor-cv
description: Tailor the RenderCV YAML resume in the current folder to a specific job, then write a matching cover letter. Asks a few targeted questions first, fills in the details itself, keeps text short, ATS-friendly and free of buzzwords. Use when the user says "tailor my CV", "apply to <role>", or "cover letter for <job>".
---

# Tailor CV + cover letter

Edits the user's RenderCV YAML for one specific job and writes a cover letter. Output must be ready to send: no placeholders, brackets, TODOs, comments or AI-sounding filler in any file.

## Step 0: Locate files

- Find the RenderCV file in the current folder: `*.yaml` / `*.yml` containing a top-level `cv:` key (check `Glob` for `*.yaml`, `*.yml`; pick the one with `cv:` and `design:`). If several match, ask which one.
- Never overwrite the base file. Copy it to `applications/<company>-<role>/<name>_CV.yaml` and edit the copy. Cover letter goes next to it as `cover_letter.md` and `cover_letter.pdf` (also `cover_letter.txt` if asked). `applications/` is git-ignored: never commit it.
- Read the base YAML fully before asking anything. Do not ask for facts already in it.
- Also read the resume digest, `cv/resume-digest.md` (if `cv/resume-digest.private.md` also exists, read that instead; it is a local-only fuller version). It is the user's own account of their career and is the source of truth for facts, output rules and what to leave out. Use it in every step below:
  - Facts: every claim in the CV and letter must come from the base YAML or the digest. Draw on digest detail the YAML omits when it fits the posting (e.g. Paytm, Wadi and InMobi work, Cape tooling, backend exposure). Never invent metrics, employers, tools or dates; if a number is missing, write the bullet without one.
  - Output rules: obey the digest's "Output rules" and "Do not include" sections. They override the defaults in this file where they differ.
  - Lean: the digest's variants A (Frontend / Design Systems / AI tooling) and B (backend-inclined full-stack) are the two ends of a spectrum, not a switch. Set the lean from what the posting asks for: its title, the split of frontend vs backend vs AI vs platform duties, and its required stack. Weight headline, summary, bullet order, bullet selection and skill grouping toward that mix (e.g. backend-heavy posting: GraphQL BFF, SQL, event-driven, Kubernetes/Terraform bullets first and Backend & data skills first; AI-engineer posting: Cape Fly, MCP, RAG first; design-system or frontend posting: Cape ownership first). Stay honest: the core is frontend with real backend exposure, so never claim a backend or AI title that was not held. Do not ask the user which variant; state the lean chosen in the final message.
  - Do not copy the digest's "Open points" into any file. If one affects the application (phone number, job title), raise it in the final chat message.

## Step 1: Ask questions (one batch, max 6, use AskUserQuestion)

Skip any answer already given. Ask only what you cannot infer:

1. Job posting: paste text or URL (fetch it if URL).
2. Company, role title, hiring manager name if known.
3. Which 2-3 achievements best match this role (offer options drawn from the YAML).
4. Real numbers you lack for those achievements (adoption %, repos, teams, perf gains, team size, release cadence). Only use numbers the user gives or the YAML already has. Never invent metrics.
5. Seniority angle to push: leadership/mentoring, stakeholder management, cross-team influence, technical ownership. Pick the ones the posting rewards.
6. Anything to hide, downplay or avoid (e.g. current employer situation, gaps).

## Step 2: Analyse the posting

Extract the 8-12 keywords/skills the posting repeats. Use those exact terms (ATS matches literally) but only where the user truly has the skill. List gaps for the chat summary; do not fake them.

## Step 3: Edit the YAML copy

Only touch content fields. Do not change `design:`, `locale:` or `rendercv_settings:` unless asked.

- **headline**: role-first, matching the target title where honest. Lead with the user's actual engineering role (e.g. design-system engineering), never undersell it.
- **summary / about**: 2 sentences max. What they build, scale of impact, one seniority signal.
- **Experience bullets**: 3-5 per recent role, 1-2 for older. Reorder so the most relevant come first.
  - Formula: strong verb + what + scope/stakeholders + measurable result.
  - Show seniority through scope, not adjectives: "Led", "Owned", "Aligned 6 product teams on...", "Mentored 4 engineers", "Drove migration across N repos".
  - Show stakeholder management with concrete counterparts: designers, PMs, product teams, directors, platform/security.
  - One line each, ideally under 25 words.
- **Skills section**: group by category, put posting keywords first, drop irrelevant ones. Plain terms only.
- **Education/old roles**: shorten; drop what adds nothing for this role.
- Keep the CV to one page unless there is clearly more worth showing (two max).
- Do NOT state total years of experience anywhere (summary, headline, letter). Dates in roles are fine.
- Plain ATS-safe text: no tables, icons, emojis, special characters in bullets, no first-person pronouns in the CV.

## Step 4: Writing rules (CV and letter)

- No buzzwords: avoid "passionate", "results-driven", "synergy", "leverage", "cutting-edge", "dynamic", "rockstar", "visionary", "spearheaded", "game-changing", "innovative", "holistic".
- Short, concrete sentences. Numbers over adjectives. If a sentence could appear on anyone's CV, cut or sharpen it.
- No em dashes, no filler openers ("I am excited to apply"), no lists of traits.
- Never fabricate. If a number is missing, write the bullet without one.

## Step 5: Cover letter

- 150-220 words, 3 short paragraphs, plain text.
  1. Why this role and company: one specific thing about their product/team plus the matching thing the user has done.
  2. Strongest 1-2 proofs of fit with numbers. Weave in leadership, stakeholder management or cross-team influence as shown by what they did, not claimed.
  3. Brief close: what they would do in the first months, a simple ask for a conversation.
- Greeting: "Dear <hiring manager name>," or "Dear <Company> hiring team,".
- Sign off with the user's name from the YAML.
- Must be paste-ready: no brackets, placeholders or notes inside the file.

## Step 6: Validate and render

1. Check YAML validity: run `rendercv render <file>` (if `rendercv` is installed; otherwise `pip install "rendercv[full]"` after asking). Fix any schema errors.
2. Confirm page count and that PDF text extracts cleanly (ATS check): `pdftotext <pdf> - | head -40`.
3. Re-read bullets once for unsupported claims and banned words.
4. Render the cover letter PDF: `python cv/make_cover_letter_pdf.py applications/<company>-<role>` using a Python 3.10+ with `rendercv[full]` installed (provides `typst`, `rendercv-fonts`, `ruamel.yaml`; if rendercv's CLI import fails, also `pip install click`). Confirm it is 1 page.

## Step 7: Final message (chat only, short)

- Paths of the YAML, PDF and cover letter.
- 3-5 bullets: what changed and why.
- Gaps vs the posting and any claims worth double-checking.
- Caveats and questions go here, never inside the files.
