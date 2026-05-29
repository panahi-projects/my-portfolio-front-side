"use client";

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { PAGES, findPageByPath, type PageKey } from "@/features/layout/constants/pages";

const TABS_STORAGE_KEY = "portfolio-open-tabs";

export interface TabsContextValue {
  /** Ordered list of currently-open tabs. */
  openTabs: PageKey[];
  /** The tab matching the current URL, or null if the user closed everything. */
  activeTab: PageKey | null;
  /** Open a tab and navigate to its route. No-op if already open. */
  openTab: (key: PageKey) => void;
  /** Navigate to an already-open tab (or open it if not). */
  switchTab: (key: PageKey) => void;
  /** Remove a tab. If it was active, focus a neighbor. */
  closeTab: (key: PageKey) => void;
  /** Close every tab and clear the active state. URL stays put. */
  closeAll: () => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

const isPageKey = (value: unknown): value is PageKey =>
  typeof value === "string" && PAGES.some((p) => p.key === value);

export function TabsProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Initialise from the URL so SSR + first paint already show the active tab.
  const initial = findPageByPath(pathname).key;
  const [openTabs, setOpenTabs] = useState<PageKey[]>([initial]);
  const [activeTab, setActiveTab] = useState<PageKey | null>(initial);

  // Used to suppress the URL→tab effect right after closeAll, so the URL we're
  // currently sitting on doesn't immediately reopen as a tab.
  const suppressUrlSync = useRef(false);

  // Restore persisted tabs on mount and merge with the URL's tab.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(TABS_STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const stored = parsed.filter(isPageKey);
      if (stored.length === 0) return;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time post-mount rehydration from localStorage
      setOpenTabs((prev) => {
        const merged = [...stored];
        for (const k of prev) if (!merged.includes(k)) merged.push(k);
        return merged;
      });
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  // Sync URL → active tab. If the URL changes (sidebar click, browser back,
  // deep link), reflect it in the tab strip — opening the tab if needed.
  useEffect(() => {
    if (suppressUrlSync.current) {
      suppressUrlSync.current = false;
      return;
    }
    const key = findPageByPath(pathname).key;
    setActiveTab(key);
    setOpenTabs((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, [pathname]);

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(openTabs));
    } catch {
      /* localStorage unavailable */
    }
  }, [openTabs]);

  const goTo = useCallback(
    (key: PageKey) => {
      const page = PAGES.find((p) => p.key === key);
      if (page) router.push(page.href);
    },
    [router]
  );

  const openTab = useCallback(
    (key: PageKey) => {
      setOpenTabs((prev) => (prev.includes(key) ? prev : [...prev, key]));
      goTo(key);
    },
    [goTo]
  );

  const switchTab = useCallback(
    (key: PageKey) => {
      goTo(key);
    },
    [goTo]
  );

  const closeTab = useCallback(
    (key: PageKey) => {
      const idx = openTabs.indexOf(key);
      if (idx === -1) return;
      const next = openTabs.filter((k) => k !== key);
      setOpenTabs(next);
      // Navigation/active-tab updates happen outside the state updater: an
      // updater must stay pure, and router.push() triggers a Router state
      // update — calling it during render throws "Cannot update a component
      // while rendering a different component".
      if (activeTab === key) {
        if (next.length > 0) {
          goTo(next[Math.min(idx, next.length - 1)]);
        } else {
          setActiveTab(null);
        }
      }
    },
    [openTabs, activeTab, goTo]
  );

  const closeAll = useCallback(() => {
    suppressUrlSync.current = true;
    setOpenTabs([]);
    setActiveTab(null);
  }, []);

  return (
    <TabsContext.Provider value={{ openTabs, activeTab, openTab, switchTab, closeTab, closeAll }}>
      {children}
    </TabsContext.Provider>
  );
}
