import type { ExperienceData } from "@/features/experience/types";
import { experienceMock } from "./mock/experience.mock";

/** Returns the Experience page data. */
export async function getExperienceData(): Promise<ExperienceData> {
  // TODO: Replace with real API call
  return experienceMock;
}
