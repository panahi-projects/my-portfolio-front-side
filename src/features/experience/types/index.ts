/** Data contract for the Experience page (timeline). */

export interface ExperienceItem {
  company: string;
  role: string;
  /** ISO-ish start, e.g. "2022-01". */
  startDate: string;
  /** ISO-ish end, or null when this is the current role. */
  endDate: string | null;
  location: string;
  achievements: string[];
  techStack: string[];
  /** True for the present role (rendered as a filled timeline node). */
  current: boolean;
}

export interface ExperienceData {
  experiences: ExperienceItem[];
}
