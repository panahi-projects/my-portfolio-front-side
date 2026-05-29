import { getAboutData } from "@/services/api/about.service";
import { AboutView } from "@/features/about/components/AboutView";

export default async function AboutPage() {
  const data = await getAboutData();
  return <AboutView data={data} />;
}
