"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { VscMenu, VscClose, VscSettingsGear, VscSparkle, VscSearch } from "react-icons/vsc";
import { Link, usePathname } from "@/i18n/navigation";
import { PAGES, DECORATIVE_FILES, findPageByPath } from "@/features/layout/constants/pages";
import { CopilotPaneTrigger, useCopilotPane } from "@/features/layout/components/CopilotPane";
import { GitStatus } from "@/features/layout/components/GitStatus";
import { useSettings } from "@/features/theme/hooks/useSettings";
import { useDirection } from "@/shared/hooks/useDirection";

export function MobileNav() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const activePage = findPageByPath(pathname);
  const [open, setOpen] = useState(false);
  const { toggle: toggleCopilot } = useCopilotPane();
  const { open: openSettings } = useSettings();
  const { hiddenStart } = useDirection();

  // Close the drawer when the route changes (reset-on-change in render phase — no effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while the menu overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Path label shown next to the hamburger, e.g. "~/home", "~/about"
  const pathLabel = activePage.href === "/" ? "~/home" : `~${activePage.href}`;

  return (
    <>
      {/* Mobile top bar — hidden on desktop */}
      <header
        className="flex h-11 shrink-0 items-center gap-2 px-3 text-sm select-none md:hidden"
        style={{
          background: "var(--color-titlebar-bg)",
          color: "var(--color-sidebar-text)",
          borderBottom: "1px solid var(--color-border)",
        }}
        role="banner"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("sidebar.explorer")}
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center"
        >
          <VscMenu className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="truncate font-medium" style={{ color: "var(--color-editor-text)" }}>
          {pathLabel}
        </span>

        <div className="ms-auto flex items-center gap-1">
          <button
            type="button"
            onClick={toggleCopilot}
            aria-label={t("copilot.title")}
            className="grid h-9 w-9 place-items-center rounded"
            style={{ background: "var(--color-sidebar-hover)" }}
          >
            <VscSparkle
              className="h-4 w-4"
              style={{ color: "var(--color-copilot-accent)" }}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            aria-label={t("search.placeholder")}
            className="grid h-9 w-9 place-items-center rounded"
            style={{ background: "var(--color-sidebar-hover)" }}
          >
            <VscSearch
              className="h-4 w-4"
              style={{ color: "var(--color-statusbar-text)" }}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

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
              initial={{ x: hiddenStart }}
              animate={{ x: 0 }}
              exit={{ x: hiddenStart }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 start-0 z-50 flex w-80 max-w-[85vw] flex-col md:hidden"
              style={{
                background: "var(--color-sidebar-bg)",
                color: "var(--color-sidebar-text)",
                borderInlineEnd: "1px solid var(--color-border)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label={t("sidebar.explorer")}
            >
              <div
                className="flex items-center justify-between px-4 py-3 text-sm"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span className="text-[11px] font-medium tracking-wider uppercase opacity-70">
                  {t("sidebar.explorer")}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openSettings();
                    }}
                    aria-label={t("settings.title")}
                    className="grid h-8 w-8 place-items-center rounded hover:bg-white/10"
                  >
                    <VscSettingsGear className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("tabs.close")}
                    className="grid h-8 w-8 place-items-center rounded hover:bg-white/10"
                  >
                    <VscClose className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="px-4 py-2 text-[11px] font-medium tracking-wider uppercase opacity-70">
                {t("app.repo").toUpperCase()}
              </div>

              <ul className="flex-1 overflow-y-auto pb-2 text-sm">
                {PAGES.map(({ key, filename, href, Icon, iconColor, navKey }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        className="relative flex items-center gap-3 py-2 ps-6 pe-3"
                        style={{
                          background: isActive ? "var(--color-sidebar-hover)" : "transparent",
                          color: isActive
                            ? "var(--color-editor-text)"
                            : "var(--color-sidebar-text)",
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {isActive ? (
                          <span
                            className="absolute inset-y-0 start-0 w-0.5"
                            style={{ background: "var(--color-tab-active-border)" }}
                            aria-hidden="true"
                          />
                        ) : null}
                        <Icon
                          className="h-4 w-4 shrink-0"
                          style={{ color: iconColor }}
                          aria-hidden="true"
                        />
                        <span className="truncate">{filename}</span>
                        <span className="sr-only">{t(`nav.${navKey}`)}</span>
                      </Link>
                    </li>
                  );
                })}

                {DECORATIVE_FILES.map(({ filename, Icon, iconColor }) => (
                  <li key={filename}>
                    <span className="flex items-center gap-3 py-2 ps-6 pe-3 opacity-90">
                      <Icon
                        className="h-4 w-4 shrink-0"
                        style={{ color: iconColor }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{filename}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="flex flex-col gap-2 px-3 pt-2 pb-3"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <CopilotPaneTrigger variant="expanded" />
                <GitStatus hideSparkles />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
