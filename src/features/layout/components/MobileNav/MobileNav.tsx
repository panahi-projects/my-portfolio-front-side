"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  VscMenu,
  VscClose,
  VscSettingsGear,
  VscSourceControl,
  VscCopilot,
} from "react-icons/vsc";
import { Link, usePathname } from "@/i18n/navigation";
import { PAGES } from "@/features/layout/constants/pages";

export function MobileNav() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the menu overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Simplified top bar — visible only on mobile */}
      <header
        className="flex h-11 shrink-0 items-center justify-between px-4 text-sm select-none md:hidden"
        style={{
          background: "var(--color-titlebar-bg)",
          color: "var(--color-sidebar-text)",
          borderBottom: "1px solid var(--color-border)",
        }}
        role="banner"
      >
        <span className="flex items-center gap-2 font-medium">
          <VscCopilot
            className="h-4 w-4"
            style={{ color: "var(--color-accent)" }}
            aria-hidden="true"
          />
          <span className="truncate">{t("app.title")}</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={t("settings.title")}
            className="grid h-9 w-9 place-items-center opacity-80"
          >
            <VscSettingsGear className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Floating hamburger — only when overlay is closed */}
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("menu.file")}
          aria-expanded={false}
          className="fixed end-4 bottom-4 z-40 grid h-12 w-12 place-items-center rounded-full shadow-lg md:hidden"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-statusbar-text)",
          }}
        >
          <VscMenu className="h-6 w-6" aria-hidden="true" />
        </button>
      ) : null}

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-black/60 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 end-0 z-50 flex w-80 max-w-[85vw] flex-col md:hidden"
              style={{
                background: "var(--color-sidebar-bg)",
                color: "var(--color-sidebar-text)",
                borderInlineStart: "1px solid var(--color-border)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label={t("sidebar.portfolio")}
            >
              <div
                className="flex items-center justify-between px-4 py-3 text-sm"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span className="text-[11px] tracking-wider uppercase opacity-70">
                  {t("sidebar.portfolio")}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("tabs.close")}
                  className="grid h-8 w-8 place-items-center rounded hover:bg-white/10"
                >
                  <VscClose className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto py-2 text-sm">
                {PAGES.map(({ key, filename, href, Icon, iconColor, navKey }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          background: isActive ? "var(--color-sidebar-hover)" : "transparent",
                          color: isActive
                            ? "var(--color-editor-text)"
                            : "var(--color-sidebar-text)",
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon
                          className="h-5 w-5 shrink-0"
                          style={{ color: iconColor }}
                          aria-hidden="true"
                        />
                        <span className="flex flex-col">
                          <span className="font-medium">{t(`nav.${navKey}`)}</span>
                          <span className="text-xs opacity-60">{filename}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Footer slot — theme switcher / language toggle wired in Phase 10 */}
              <div
                className="flex items-center justify-between px-4 py-3 text-xs opacity-80"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <span className="flex items-center gap-1">
                  <VscSourceControl className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t("statusbar.branch")}</span>
                </span>
                <span>{t("languages.en")} · {t("languages.fa")}</span>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
