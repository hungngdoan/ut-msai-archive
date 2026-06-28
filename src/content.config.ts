import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* ------------------------------------------------------------------ *
 * DATA MODEL
 * Every public entry on the site is one file in one of these
 * collections. The zod schemas below are the source of truth: an
 * invalid or unsafe-shaped edit fails `astro check` / `astro build`,
 * which is exactly what gates AI-generated pull requests.
 *
 * Cross-references use short string codes (e.g. course code "NLP",
 * semester id "fall-2026") resolved in src/lib/collections.ts. Missing
 * references are tolerated so half-finished edits still build.
 * ------------------------------------------------------------------ */

const link = z.object({
  label: z.string(),
  url: z.string().url(),
});

/** Academic terms. One file per term in src/content/semesters/. */
const semesters = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/semesters' }),
  schema: z.object({
    name: z.string(), // e.g. "Fall 2026"
    term: z.enum(['fall', 'spring', 'summer', 'pre-term']),
    year: z.number().int(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    status: z.enum(['upcoming', 'active', 'completed']),
    order: z.number().int().default(0),
    note: z.string().optional(),
  }),
});

/** Courses. One file per course in src/content/courses/. */
const courses = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/courses' }),
  schema: z.object({
    code: z.string(),          // short label used for cross-refs, e.g. "NLP"
    title: z.string(),         // public catalog name
    catalogNumber: z.string().optional(),              // UT catalog number, e.g. "AI 394D"
    type: z.enum(['required', 'elective']).optional(), // degree requirement type
    hoursPerWeek: z.string().optional(),               // weekly time estimate, e.g. "12-15" or "15+"
    semester: z.string(),      // semester id, e.g. "fall-2026"
    status: z.enum(['planned', 'in-progress', 'completed']),
    credits: z.number().optional(),
    accent: z.string().default('#bf5700'), // per-course accent hue
    // My own words only. No syllabi, prompts, rubrics, or slides.
    summary: z.string(),
    focusAreas: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]), // what *I* aim to learn
    links: z.array(link).default([]),          // public resources only
    order: z.number().int().default(0),
  }),
});

/** Weekly progress log. One MDX file per week in src/content/weeks/. */
const weeks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/weeks' }),
  schema: z.object({
    title: z.string(),
    week: z.number().int(),       // ISO-ish week number for the year
    semester: z.string(),         // semester id
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date(),
    courses: z.array(z.string()).default([]), // course codes touched
    focus: z.string(),            // one-line theme
    hours: z.number().optional(), // optional self-reported study hours
    highlights: z.array(z.string()).default([]), // wins
    gaps: z.array(z.string()).default([]),       // honest struggles
    status: z.enum(['draft', 'published']).default('published'),
    tags: z.array(z.string()).default([]),
  }),
});

/** Reading list (metadata + public links only). Single YAML array. */
const readings = defineCollection({
  loader: file('./src/content/readings.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    authors: z.array(z.string()).default([]),
    type: z.enum(['book', 'paper', 'article', 'video', 'course', 'docs']),
    year: z.number().int().optional(),
    venue: z.string().optional(),
    url: z.string().url(),        // must be a public link
    courses: z.array(z.string()).default([]),
    status: z.enum(['to-read', 'reading', 'done', 'reference']),
    rating: z.number().min(1).max(5).optional(),
    tags: z.array(z.string()).default([]),
    note: z.string().optional(), // one-line, my own summary
  }),
});

/** Projects (portfolio-safe). One MDX file per project. */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    status: z.enum(['idea', 'building', 'shipped', 'archived']),
    stack: z.array(z.string()).default([]),
    courses: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    // Honesty switch: never publish raw assignment solutions by default.
    portfolioSafe: z.boolean().default(true),
    featured: z.boolean().default(false),
    highlights: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

/** Reflections, milestones, and gap analyses. One MDX file per entry. */
const reflections = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reflections' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['milestone', 'gap', 'retro', 'note']),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { semesters, courses, weeks, readings, projects, reflections };
