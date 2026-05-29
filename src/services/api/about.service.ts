import type { AboutData } from "@/features/about/types";
import { aboutMock } from "./mock/about.mock";

/** Returns the About page data. */
export async function getAboutData(): Promise<AboutData> {
  // TODO: Replace with real API call
  return aboutMock;
}
