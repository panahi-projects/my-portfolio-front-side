import { DEFAULT_THEME, THEME_IDS, THEME_STORAGE_KEY } from "../constants/themes";

/**
 * Inline script that runs before React hydrates so the persisted theme is
 * applied to <html data-theme="…"> on the very first paint. Prevents a flash
 * of the default theme when the user has previously picked something else.
 */
export function ThemeInitScript() {
  const allowed = JSON.stringify(THEME_IDS);
  const fallback = JSON.stringify(DEFAULT_THEME);
  const key = JSON.stringify(THEME_STORAGE_KEY);
  const script = `(function(){try{var a=${allowed};var t=localStorage.getItem(${key});if(!t||a.indexOf(t)===-1)t=${fallback};document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme=${fallback};}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
