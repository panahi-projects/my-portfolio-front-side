/** Data contract for the Skills page. */

export interface Skill {
  name: string;
  /** Icon slug (devicon-style), e.g. "react", "typescript". */
  icon: string;
  /** Proficiency as a percentage, 0–100. Drives the progress bar fill. */
  proficiency: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}
