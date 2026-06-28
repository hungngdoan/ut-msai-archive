/** Global site configuration. Safe to edit by hand or by an AI assistant. */
export const site = {
  name: 'The Laboratory',
  shortName: 'LAB',
  tagline: 'A graduate AI lab notebook.',
  description:
    'The Laboratory — a public, build-validated notebook for an MSAI journey: a course roadmap, experiment logs, a reference library, inventions, and field notes. My own words and public links only.',
  author: 'Hung Doan',
  programStart: '2026-08-26',
  // The semester to feature on the dashboard. Update once per term.
  currentSemesterId: 'fall-2026',
  github: 'https://github.com/hungngdoan/ut-msai-archive',
  // Primary navigation. `label` is the lab vocabulary; `href` keeps the
  // stable route. The base path is applied by the href() helper.
  nav: [
    { label: 'Control', href: '/' },
    { label: 'Roadmap', href: '/courses' },
    { label: 'Log', href: '/log' },
    { label: 'Library', href: '/readings' },
    { label: 'Inventions', href: '/projects' },
    { label: 'Field Notes', href: '/reflections' },
    { label: 'About', href: '/about' },
  ],
} as const;
