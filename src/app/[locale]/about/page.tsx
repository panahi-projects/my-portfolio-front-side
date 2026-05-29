import { setRequestLocale } from "next-intl/server";
import { getAboutData } from "@/services/api/about.service";
import { AboutView } from "@/features/about/components/AboutView";

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = await getAboutData();
  return <AboutView data={data} />;
}
