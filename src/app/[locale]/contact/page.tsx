import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <section className="p-8">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-2 opacity-70">{t("subtitle")}</p>
    </section>
  );
}
