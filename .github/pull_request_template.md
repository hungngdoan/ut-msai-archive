<!--
  Every PR — human or AI-authored — must pass this checklist before merge.
  The CI workflow validates the schema and build; this checklist covers the
  things a build can't check: content safety and academic integrity.
-->

## What changed

<!-- One or two sentences. Which content files or components did you touch? -->

## Content-safety checklist

- [ ] Only **my own words**, **public links**, and **metadata** were added.
- [ ] No syllabi, assignment prompts, rubrics, exams, quizzes, or answer keys.
- [ ] No lecture slides, recordings, Canvas screenshots, or announcements.
- [ ] No paid textbook PDFs or other copyrighted full texts.
- [ ] No classmate content, private datasets, or personal data.
- [ ] Any published code is **portfolio-safe** (not a raw assignment solution), and course policy allows it.
- [ ] New reading links point to **public** pages, not uploaded files.

## Build

- [ ] `npm run build` passes locally (or CI is green).

<!-- See CONTENT_POLICY.md and AGENTS.md for the full rules. -->
