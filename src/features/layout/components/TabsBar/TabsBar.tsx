"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { findPageByPath } from "@/features/layout/constants/pages";

/**
 * Static TabsBar for Phase 4 — shows whichever single page matches the current
 * URL as the "active" tab. The full tab open/close/switch system arrives in
 * Phase 6 (useTabs hook).
 */
export function TabsBar() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const active = findPageByPath(pathname);

  return (
    <div
      className="flex h-9 shrink-0 items-stretch text-xs select-none"
      style={{ background: "var(--color-tabs-bg)", color: "var(--color-sidebar-text)" }}
      role="tablist"
      aria-label="Open editor tabs"
    >
      <button
        type="button"
        role="tab"
        aria-selected="true"
        className="group relative flex h-full items-center gap-2 px-3"
        style={{
          background: "var(--color-tab-active-bg)",
          color: "var(--color-editor-text)",
        }}
      >
        <span
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ background: "var(--color-tab-active-border)" }}
          aria-hidden="true"
        />
        <active.Icon
          className="h-4 w-4 shrink-0"
          style={{ color: active.iconColor }}
          aria-hidden="true"
        />
        <span>{active.filename}</span>
        <span
          className="ml-1 grid h-4 w-4 place-items-center rounded text-[10px] opacity-60 hover:opacity-100"
          title={t("tabs.close")}
          aria-label={t("tabs.close")}
        >
          ×
        </span>
      </button>

      {/* Breadcrumb strip below the tab row */}
      <div className="flex flex-1 items-center px-3 text-[11px] opacity-70">
        <span>portfolio</span>
        <span className="mx-1 opacity-60">›</span>
        <span>src</span>
        <span className="mx-1 opacity-60">›</span>
        <span>{active.filename}</span>
      </div>
    </div>
  );
}
