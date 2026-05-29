import common from "@/i18n/locales/en/common.json";
import home from "@/i18n/locales/en/home.json";
import about from "@/i18n/locales/en/about.json";
import skills from "@/i18n/locales/en/skills.json";
import experience from "@/i18n/locales/en/experience.json";
import contact from "@/i18n/locales/en/contact.json";

/** Full EN message tree, keyed by namespace (mirrors next-intl's runtime shape). */
export const messages = { common, home, about, skills, experience, contact };

type AnyRecord = Record<string, unknown>;

function getByPath(obj: unknown, pathStr: string): unknown {
  return pathStr
    .split(".")
    .reduce<unknown>((o, k) => (o == null ? undefined : (o as AnyRecord)[k]), obj);
}

/**
 * Builds a minimal `t` function over the EN messages for a namespace — used to
 * mock `next-intl/server`'s `getTranslations` when unit-testing server views.
 * Supports `{placeholder}` interpolation and `t.raw(key)`.
 */
export function makeT(namespace?: string) {
  const base = namespace ? getByPath(messages, namespace) : messages;
  const t = (key: string, values?: Record<string, string | number>) => {
    let v = getByPath(base, key);
    if (typeof v === "string" && values) {
      for (const k of Object.keys(values)) {
        v = (v as string).replace(new RegExp(`\\{${k}\\}`, "g"), String(values[k]));
      }
    }
    return typeof v === "string" ? v : key;
  };
  t.raw = (key: string) => getByPath(base, key);
  return t;
}
