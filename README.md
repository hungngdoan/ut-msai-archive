# The Laboratory

A public lab notebook and dashboard for my **UT Austin MSAI** journey — modules, weekly experiments,
a reference library, inventions, and field notes. Built as a static site so it's free to host, has
nothing to operate, and can last the whole program.

The visual identity is an original homage inspired by **Dexter's Laboratory** (charcoal + reactor
teal). It uses no official assets; see [`docs/THEME.md`](./docs/THEME.md) for the design system and IP
guidance.

> My own words and public links only. See [`CONTENT_POLICY.md`](./CONTENT_POLICY.md).

**Live site:** https://hungngdoan.github.io/ut-msai-archive/

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) (static output) |
| Content | Astro **content collections**, validated with [zod](https://zod.dev) schemas |
| Authoring | MDX + YAML — one file per entry |
| Styling | Tailwind CSS v4 |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (build-validate on PRs, deploy on merge to `main`) |

No backend, no database, no login, no comments. The content files are the source of truth.

## Local development

```bash
npm install        # one time
npm run dev        # local dev server (note the /ut-msai-archive/ base path)
npm run build      # astro check (schema/type validation) + astro build
npm run preview    # preview the production build locally
```

Requires Node 22+ (see `.nvmrc`).

## Project structure

```
src/
  content/                 # ← everything you'll normally edit
    semesters/*.yaml        # academic terms
    courses/*.yaml          # one file per course
    weeks/*.mdx             # weekly progress log
    readings.yaml           # reading list (one array)
    projects/*.mdx          # portfolio-safe projects
    reflections/*.mdx       # milestones, gap analyses, retros
  content.config.ts        # the DATA MODEL — zod schemas for everything above
  lib/                     # site config, base-URL helper, progress/stats logic
  components/              # cards, pills, headers, nav, footer
  layouts/                 # BaseLayout
  pages/                   # routes (dashboard, courses, log, readings, …)
  styles/global.css        # design tokens (reactor teal on charcoal)
public/                    # static assets (favicon)
.github/workflows/         # ci.yml (PR validation) + deploy.yml (Pages)
CONTENT_POLICY.md          # what is / isn't public-safe
AGENTS.md                  # rules for AI assistants editing content
```

## Adding content

Each entry is **one file** validated against a schema in `src/content.config.ts`. If an edit doesn't
match the schema, `npm run build` fails — that's the safety net.

- **Course:** add `src/content/courses/<slug>.yaml`
- **Weekly log:** add `src/content/weeks/2026-w27.mdx`
- **Reading:** append an item to `src/content/readings.yaml`
- **Project:** add `src/content/projects/<slug>.mdx`
- **Reflection:** add `src/content/reflections/<slug>.mdx`

Copy an existing file in the same folder as a template. Cross-link by code (`["NLP", "DL"]`) and
semester id (`fall-2026`).

## How updates ship

1. Create a branch and edit content files.
2. `npm run build` locally until green.
3. Open a pull request to `main`. CI re-validates the schema and build.
4. **Review and merge.** On merge, GitHub Actions builds and deploys to Pages automatically.

An AI assistant can do step 1–3 and **open a PR**, but never pushes to `main` or merges — see
[`AGENTS.md`](./AGENTS.md) and [`docs/AI_UPDATE_WORKFLOW.md`](./docs/AI_UPDATE_WORKFLOW.md).

## One-time GitHub Pages setup

In the repo on GitHub: **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.
After that, every merge to `main` deploys. If you later move to a custom domain or a
`<user>.github.io` repo, set `base: '/'` in `astro.config.mjs` and update `site`.

## License

Code is MIT (see [`LICENSE`](./LICENSE)). Written content (notes, reflections, summaries) is © the
author, all rights reserved.
