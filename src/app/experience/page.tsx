import { getExperienceData } from "@/services/api/experience.service";
import { ExperienceView } from "@/features/experience/components/ExperienceView";

export default async function ExperiencePage() {
  const data = await getExperienceData();
  return <ExperienceView data={data} />;
}
