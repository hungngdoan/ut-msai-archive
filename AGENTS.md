# AGENTS.md — rules for AI assistants editing this repo

This file is the contract for any AI assistant (Claude Code or otherwise) asked to update this site.
Read it fully before making changes. Humans: see `README.md`.

## Golden rules

1. **Public-safe content only.** Obey `CONTENT_POLICY.md` exactly. My own words and public links only.
   No syllabi, prompts, rubrics, exams, slides, solutions, Canvas content, or paid PDFs. When unsure, ask
   or leave it out.
2. **Never push to `main`. Never commit unless explicitly told to.** Make changes in the working tree,
   then open a **pull request** targeting `main` for human review. Do not merge it yourself.
3. **Edit content, not plumbing.** Normal updates touch only files under `src/content/`. Do not change
   schemas, layouts, components, config, or workflows unless that is the explicit task.
4. **Validate before opening a PR.** Run `npm run build` (which runs `astro check` + `astro build`).
   If it fails, fix the content until it passes. CI will reject a PR that doesn't build.

## Where content lives (this is the whole data model)

| You want to add… | File to create / edit | Format |
| --- | --- | --- |
| A course | `src/content/courses/<slug>.yaml` | YAML |
| A semester / term | `src/content/semesters/<slug>.yaml` | YAML |
| A weekly log entry | `src/content/weeks/<year>-w<NN>.mdx` | MDX + frontmatter |
| A reading | append an item to `src/content/readings.yaml` | YAML array |
| A project | `src/content/projects/<slug>.mdx` | MDX + frontmatter |
| A reflection | `src/content/reflections/<slug>.mdx` | MDX + frontmatter |

The authoritative field definitions are the zod schemas in `src/content.config.ts`. If a field isn't in
the schema, don't invent it — update the schema in a separate, clearly-scoped PR instead.

Cross-references use short codes: a week or reading lists course **codes** (e.g. `["NLP", "DL"]`); a
course names its **semester id** (e.g. `fall-2026`). Codes are matched case-insensitively.

## Common task: add a weekly log entry

1. Create `src/content/weeks/2026-w<NN>.mdx`.
2. Fill the frontmatter (see the schema and existing entries for the exact fields). Keep `highlights`
   for wins and `gaps` for honest struggles — the gaps are the point.
3. Write the body in MDX, in the first person, in my own words. No course materials.
4. Run `npm run build`. Fix anything it flags.
5. Open a PR to `main` titled e.g. `log: week 27`. Fill in the PR checklist. Stop and wait for review.

## Safety reflexes

- A reading `url` must be a **public** page, never an uploaded or paywalled file.
- A project's `portfolioSafe` should be `true`; if you can't honestly set it true, the project doesn't
  belong here yet.
- Never add real names of classmates or instructors, private data, or anything from Canvas.
- If a request would violate `CONTENT_POLICY.md`, refuse and explain which rule applies.
