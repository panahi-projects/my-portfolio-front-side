import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const namespaces = ["common", "home", "about", "skills", "experience", "contact"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const entries = await Promise.all(
    namespaces.map(async (ns) => {
      const mod = await import(`./locales/${locale}/${ns}.json`);
      return [ns, mod.default] as const;
    })
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
  };
});
