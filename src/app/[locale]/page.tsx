import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">{tCommon("app.title")}</h1>
        <p className="mt-4 text-sm opacity-70">{t("headline")}</p>
        <p className="mt-6 text-xs opacity-50">
          Layout, theme, and pages land in the next phases.
        </p>
      </div>
    </main>
  );
}
