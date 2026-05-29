import { setRequestLocale } from "next-intl/server";
import { getExperienceData } from "@/services/api/experience.service";
import { ExperienceView } from "@/features/experience/components/ExperienceView";

export default async function ExperiencePage({ params }: PageProps<"/[locale]/experience">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = await getExperienceData();
  return <ExperienceView data={data} />;
}
