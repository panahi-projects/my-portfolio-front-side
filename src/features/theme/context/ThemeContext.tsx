"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
  type ThemeMeta,
} from "../constants/themes";

export interface ThemeContextValue {
  theme: ThemeId;
  themes: readonly ThemeMeta[];
  setTheme: (id: ThemeId) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeId;
}

export function ThemeProvider({ children, initialTheme = DEFAULT_THEME }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(initialTheme);

  // On mount, sync with whatever the pre-hydration script wrote to the DOM.
  // If the DOM value is missing or invalid, fall back to localStorage, then default.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const fromDom = document.documentElement.dataset.theme;
    if (isThemeId(fromDom)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time post-mount sync from the pre-hydration DOM (avoids a hydration mismatch)
      setThemeState(fromDom);
      return;
    }
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemeId(stored)) setThemeState(stored);
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = id;
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* localStorage unavailable — theme is still applied in-session */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themes: THEMES, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
