"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const MENU_KEYS = ["file", "edit", "view", "go", "run", "terminal", "help", "copilot"] as const;
type MenuKey = (typeof MENU_KEYS)[number];

export function MenuBar() {
  const t = useTranslations("common.menu");
  const tCommon = useTranslations("common");
  const [openKey, setOpenKey] = useState<MenuKey | null>(null);

  return (
    <nav
      className="flex h-7 shrink-0 items-center gap-1 px-2 text-xs select-none"
      style={{ background: "var(--color-menubar-bg)", color: "var(--color-sidebar-text)" }}
      aria-label={tCommon("a11y.menuBar")}
    >
      {MENU_KEYS.map((key) => {
        const isOpen = openKey === key;
        return (
          <div key={key} className="relative">
            <button
              type="button"
              className="h-6 rounded px-2 transition-colors hover:bg-white/10"
              style={isOpen ? { background: "var(--color-sidebar-hover)" } : undefined}
              onMouseEnter={() => openKey && setOpenKey(key)}
              onClick={() => setOpenKey(isOpen ? null : key)}
              aria-expanded={isOpen}
              aria-haspopup="menu"
            >
              {t(key)}
            </button>
            {isOpen ? (
              <div
                role="menu"
                className="absolute top-full left-0 z-50 mt-0.5 min-w-40 rounded border py-1 text-xs shadow-lg"
                style={{
                  background: "var(--color-sidebar-bg)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-sidebar-text)",
                }}
                onMouseLeave={() => setOpenKey(null)}
              >
                <span className="block px-3 py-1 opacity-60">— {t(key)} —</span>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
