import type { SkillsData } from "@/features/skills/types";
import { skillsMock } from "./mock/skills.mock";

/** Returns the Skills page data. */
export async function getSkillsData(): Promise<SkillsData> {
  // TODO: Replace with real API call
  return skillsMock;
}
