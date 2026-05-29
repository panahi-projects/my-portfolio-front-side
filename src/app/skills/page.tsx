import { getSkillsData } from "@/services/api/skills.service";
import { SkillsView } from "@/features/skills/components/SkillsView";

export default async function SkillsPage() {
  const data = await getSkillsData();
  return <SkillsView data={data} />;
}
