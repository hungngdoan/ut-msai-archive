/**
 * Base-aware URL helper.
 *
 * This is a GitHub Pages project site served under `/ut-msai-archive/`,
 * so every internal link and asset must include the configured base.
 * Always use href('/courses') instead of a bare '/courses'.
 */
const BASE = import.meta.env.BASE_URL; // e.g. "/ut-msai-archive/" (has trailing slash)

export function href(path = '/'): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  if (!path || path === '/') return base + '/';
  const clean = path.startsWith('/') ? path : '/' + path;
  return base + clean;
}

/** True when `current` (a request pathname) is within `target` nav path. */
export function isActive(current: string, target: string): boolean {
  const t = href(target).replace(/\/$/, '');
  const c = current.replace(/\/$/, '');
  if (t === href('/').replace(/\/$/, '')) return c === t; // home is exact match
  return c === t || c.startsWith(t + '/');
}
