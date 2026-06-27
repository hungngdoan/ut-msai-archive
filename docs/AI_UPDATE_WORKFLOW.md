# Safe AI update workflow

This site is designed so an AI assistant can keep it current without ever being able to publish
something unsafe or unreviewed. The safety comes from three layers, not from trusting the model.

## The loop

```
You ask the AI to add/update content
        │
        ▼
AI edits files under src/content/  ──►  runs `npm run build` locally
        │                                 (astro check + astro build)
        ▼
AI opens a PULL REQUEST to `main`   ──►  CI re-runs the build on the PR
        │                                 (.github/workflows/ci.yml)
        ▼
YOU review the diff + PR checklist  ──►  merge if it's correct and public-safe
        │
        ▼
GitHub Actions builds & deploys to Pages  (.github/workflows/deploy.yml)
```

The AI's authority stops at "open a PR." It never pushes to `main` and never merges.

## The three safety layers

1. **Schema validation (build-time).** Every content file is checked against the zod schemas in
   `src/content.config.ts`. A malformed entry — wrong type, missing field, non-URL link — fails
   `astro check` and the build, so it can't reach a PR in a passing state.
2. **CI gate (PR-time).** `ci.yml` re-runs the validation on the pull request itself. A red check
   blocks the merge button. This catches anything that wasn't validated locally.
3. **Human review (merge-time).** You read the diff and the PR content-safety checklist. The build
   can verify shape; only you verify that the *words* are yours and the links are public. This is the
   layer that enforces academic integrity, because no automated check can.

## What the AI is told

The rules the assistant must follow live in [`AGENTS.md`](../AGENTS.md) and
[`CONTENT_POLICY.md`](../CONTENT_POLICY.md). In short: public-safe content only, edit `src/content/`
only, validate with `npm run build`, open a PR, never push or merge.

## Suggested prompts

- "Add this week's log entry. I worked on X, Y clicked, Z is still a struggle. Public-safe only, then
  open a PR."
- "Add a reading: <title>, <authors>, <public url>, tag it to the NLP course, status to-read."
- "Mark the Deep Learning course as in-progress now that the term has started, and open a PR."

The assistant should always finish by reporting the PR link and stopping for your review.
