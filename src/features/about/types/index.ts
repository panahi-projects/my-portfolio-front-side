/** Data contract for the About page. */

export interface FocusItem {
  emoji: string;
  title: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface AboutData {
  /** Bio paragraph (may contain highlighted keywords in the UI). */
  bio: string;
  location: string;
  /** Short availability line, e.g. "Open to opportunities". */
  availabilityStatus: string;
  currentFocus: FocusItem[];
  education: EducationItem[];
  /** Link to the downloadable CV/resume. */
  cvUrl: string;
}
