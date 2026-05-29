import { setRequestLocale } from "next-intl/server";
import { getSkillsData } from "@/services/api/skills.service";
import { SkillsView } from "@/features/skills/components/SkillsView";

export default async function SkillsPage({ params }: PageProps<"/[locale]/skills">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = await getSkillsData();
  return <SkillsView data={data} />;
}
