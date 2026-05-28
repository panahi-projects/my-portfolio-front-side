import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];

export const rtlLocales: ReadonlySet<AppLocale> = new Set(["fa"]);

export const isRtl = (locale: string): boolean => rtlLocales.has(locale as AppLocale);
