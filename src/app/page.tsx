import { getHomeData } from "@/services/api/home.service";
import { HomeHero } from "@/features/home/components/HomeHero";

export default async function HomePage() {
  const data = await getHomeData();
  return <HomeHero data={data} />;
}
