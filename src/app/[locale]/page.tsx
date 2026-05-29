import { setRequestLocale } from "next-intl/server";
import { getHomeData } from "@/services/api/home.service";
import { HomeHero } from "@/features/home/components/HomeHero";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = await getHomeData();
  return <HomeHero data={data} />;
}
