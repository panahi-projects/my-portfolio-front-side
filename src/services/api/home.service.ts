import type { HomeData } from "@/features/home/types";
import { homeMock } from "./mock/home.mock";

/** Returns the Home page data. */
export async function getHomeData(): Promise<HomeData> {
  // TODO: Replace with real API call
  return homeMock;
}
