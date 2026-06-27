import { getCollection, type CollectionEntry } from 'astro:content';

export type Course = CollectionEntry<'courses'>;
export type Semester = CollectionEntry<'semesters'>;
export type Week = CollectionEntry<'weeks'>;
export type Reading = CollectionEntry<'readings'>;
export type Project = CollectionEntry<'projects'>;
export type Reflection = CollectionEntry<'reflections'>;

/* ----------------------------- loaders ----------------------------- */

export async function getCourses(): Promise<Course[]> {
  const all = await getCollection('courses');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getSemesters(): Promise<Semester[]> {
  const all = await getCollection('semesters');
  return all.sort((a, b) => b.data.order - a.data.order);
}

export async function getSemester(id: string): Promise<Semester | undefined> {
  const all = await getCollection('semesters');
  return all.find((s) => s.id === id);
}

export async function getWeeks({ includeDrafts = false } = {}): Promise<Week[]> {
  const all = await getCollection('weeks');
  return all
    .filter((w) => includeDrafts || w.data.status === 'published')
    .sort((a, b) => b.data.dateEnd.getTime() - a.data.dateEnd.getTime());
}

export async function getReadings(): Promise<Reading[]> {
  return getCollection('readings');
}

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getReflections(): Promise<Reflection[]> {
  const all = await getCollection('reflections');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/* --------------------------- cross-refs ---------------------------- */

export function courseByCode(courses: Course[], code: string): Course | undefined {
  return courses.find((c) => c.data.code.toLowerCase() === code.toLowerCase());
}

export function readingsForCourse(readings: Reading[], code: string): Reading[] {
  return readings.filter((r) => r.data.courses.some((c) => c.toLowerCase() === code.toLowerCase()));
}

export function projectsForCourse(projects: Project[], code: string): Project[] {
  return projects.filter((p) => p.data.courses.some((c) => c.toLowerCase() === code.toLowerCase()));
}

export function weeksForCourse(weeks: Week[], code: string): Week[] {
  return weeks.filter((w) => w.data.courses.some((c) => c.toLowerCase() === code.toLowerCase()));
}

export function coursesForSemester(courses: Course[], semesterId: string): Course[] {
  return courses.filter((c) => c.data.semester === semesterId);
}

/* --------------------------- progress ------------------------------ */

const MS_PER_DAY = 86_400_000;
const WEEKS = 1 / 7;

export type ProgressState = 'upcoming' | 'active' | 'completed';

export interface SemesterProgress {
  state: ProgressState;
  /** 0..1 fraction of the term elapsed (clamped). */
  pct: number;
  /** 1-based current week within the term (0 if not started). */
  weekIndex: number;
  totalWeeks: number;
  daysUntilStart: number; // negative once started
  label: string; // human summary, e.g. "Week 3 of 15" or "Starts in 9 weeks"
}

export function semesterProgress(sem: Semester, now: Date = new Date()): SemesterProgress {
  const start = sem.data.startDate.getTime();
  const end = sem.data.endDate.getTime();
  const t = now.getTime();
  const totalDays = Math.max(1, Math.round((end - start) / MS_PER_DAY));
  const totalWeeks = Math.max(1, Math.round(totalDays * WEEKS));
  const daysUntilStart = Math.ceil((start - t) / MS_PER_DAY);

  if (t < start) {
    const weeksUntil = Math.max(1, Math.ceil(daysUntilStart * WEEKS));
    return {
      state: 'upcoming',
      pct: 0,
      weekIndex: 0,
      totalWeeks,
      daysUntilStart,
      label: daysUntilStart <= 14 ? `Starts in ${daysUntilStart} days` : `Starts in ${weeksUntil} weeks`,
    };
  }
  if (t > end) {
    return { state: 'completed', pct: 1, weekIndex: totalWeeks, totalWeeks, daysUntilStart, label: 'Term complete' };
  }
  const pct = (t - start) / (end - start);
  const weekIndex = Math.min(totalWeeks, Math.max(1, Math.ceil((t - start) / MS_PER_DAY / 7)));
  return { state: 'active', pct, weekIndex, totalWeeks, daysUntilStart, label: `Week ${weekIndex} of ${totalWeeks}` };
}

/**
 * Display progress for a course. Honest by construction:
 * planned -> 0, completed -> 100, in-progress -> follows the term clock.
 */
export function courseProgressPct(course: Course, sem: Semester | undefined, now: Date = new Date()): number {
  if (course.data.status === 'completed') return 100;
  if (course.data.status === 'planned' || !sem) return 0;
  return Math.round(semesterProgress(sem, now).pct * 100);
}

/* ----------------------------- stats ------------------------------- */

export interface DashboardStats {
  coursesInProgress: number;
  coursesPlanned: number;
  coursesCompleted: number;
  weeksLogged: number;
  readingsDone: number;
  readingsTotal: number;
  projectsShipped: number;
  projectsTotal: number;
  reflections: number;
  totalHours: number;
}

export function buildStats(
  courses: Course[],
  weeks: Week[],
  readings: Reading[],
  projects: Project[],
  reflections: Reflection[],
): DashboardStats {
  return {
    coursesInProgress: courses.filter((c) => c.data.status === 'in-progress').length,
    coursesPlanned: courses.filter((c) => c.data.status === 'planned').length,
    coursesCompleted: courses.filter((c) => c.data.status === 'completed').length,
    weeksLogged: weeks.length,
    readingsDone: readings.filter((r) => r.data.status === 'done').length,
    readingsTotal: readings.length,
    projectsShipped: projects.filter((p) => p.data.status === 'shipped').length,
    projectsTotal: projects.length,
    reflections: reflections.length,
    totalHours: weeks.reduce((sum, w) => sum + (w.data.hours ?? 0), 0),
  };
}

/* --------------------------- formatting ---------------------------- */

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const fmtShort = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export function formatDate(d: Date): string {
  return fmt.format(d);
}

export function formatRange(a: Date, b: Date): string {
  const sameYear = a.getFullYear() === b.getFullYear();
  return `${fmtShort.format(a)} – ${sameYear ? fmtShort.format(b) : fmt.format(b)}, ${b.getFullYear()}`;
}

export const STATUS_LABEL: Record<string, string> = {
  planned: 'Planned',
  'in-progress': 'In progress',
  completed: 'Completed',
  upcoming: 'Upcoming',
  active: 'Active',
  idea: 'Idea',
  building: 'Building',
  shipped: 'Shipped',
  archived: 'Archived',
  'to-read': 'To read',
  reading: 'Reading',
  done: 'Done',
  reference: 'Reference',
  draft: 'Draft',
  published: 'Published',
};

/** Maps a status to a pill style class. */
export function statusClass(status: string): string {
  if (['in-progress', 'active', 'building', 'reading'].includes(status)) return 'pill-active';
  if (['completed', 'done', 'shipped'].includes(status)) return 'pill-done';
  return 'pill-planned';
}
