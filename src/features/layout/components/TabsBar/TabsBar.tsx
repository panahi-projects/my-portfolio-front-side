"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { VscClose } from "react-icons/vsc";
import { useTabs } from "@/shared/hooks/useTabs";
import { PAGES, findPageByPath, type PageKey, type PageMeta } from "@/features/layout/constants/pages";
import { usePathname } from "@/i18n/navigation";

const byKey = (pages: readonly PageMeta[]) =>
  Object.fromEntries(pages.map((p) => [p.key, p])) as Record<string, PageMeta>;

const PAGES_BY_KEY = byKey(PAGES);

export function TabsBar() {
  const t = useTranslations("common");
  const { openTabs, activeTab, switchTab, closeTab } = useTabs();
  const pathname = usePathname();
  const breadcrumbPage = activeTab ? PAGES_BY_KEY[activeTab] : findPageByPath(pathname);

  const handleClose = (e: MouseEvent | KeyboardEvent, key: PageKey) => {
    e.preventDefault();
    e.stopPropagation();
    closeTab(key);
  };

  return (
    <div
      className="flex h-9 shrink-0 items-stretch text-xs select-none"
      style={{ background: "var(--color-tabs-bg)", color: "var(--color-sidebar-text)" }}
      role="tablist"
      aria-label="Open editor tabs"
    >
      <div className="flex min-w-0 flex-1 overflow-x-auto">
        {openTabs.length === 0 ? (
          <div className="flex items-center px-3 text-[11px] opacity-60 italic">
            {t("tabs.welcome")}
          </div>
        ) : (
          openTabs.map((key) => {
            const page = PAGES_BY_KEY[key];
            if (!page) return null;
            const isActive = key === activeTab;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => switchTab(key)}
                className="group relative flex h-full shrink-0 items-center gap-2 border-e px-3"
                style={{
                  background: isActive
                    ? "var(--color-tab-active-bg)"
                    : "var(--color-tabs-bg)",
                  color: isActive
                    ? "var(--color-editor-text)"
                    : "var(--color-sidebar-text)",
                  borderInlineEndColor: "var(--color-border)",
                }}
              >
                {isActive ? (
                  <span
                    className="absolute inset-x-0 top-0 h-0.5"
                    style={{ background: "var(--color-tab-active-border)" }}
                    aria-hidden="true"
                  />
                ) : null}
                <page.Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: page.iconColor }}
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">{page.filename}</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleClose(e, key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleClose(e, key);
                  }}
                  title={t("tabs.close")}
                  aria-label={t("tabs.close")}
                  className="ms-1 grid h-4 w-4 place-items-center rounded opacity-60 hover:bg-white/10 hover:opacity-100"
                >
                  <VscClose className="h-3 w-3" aria-hidden="true" />
                </span>
              </button>
            );
          })
        )}
      </div>

      {/* Breadcrumb strip — only shown when something is active */}
      {openTabs.length > 0 ? (
        <div className="hidden items-center px-3 text-[11px] opacity-70 lg:flex">
          <span>portfolio</span>
          <span className="mx-1 opacity-60">›</span>
          <span>src</span>
          <span className="mx-1 opacity-60">›</span>
          <span>{breadcrumbPage.filename}</span>
        </div>
      ) : null}
    </div>
  );
}
