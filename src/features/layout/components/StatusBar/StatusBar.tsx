"use client";

import { useTranslations } from "next-intl";
import { VscSourceControl, VscSync, VscError, VscWarning, VscBell, VscCopilot } from "react-icons/vsc";
import { usePathname } from "@/i18n/navigation";
import { findPageByPath } from "@/features/layout/constants/pages";

export function StatusBar() {
  const t = useTranslations("common.statusbar");
  const pathname = usePathname();
  const active = findPageByPath(pathname);

  return (
    <footer
      className="flex h-6 shrink-0 items-stretch text-[11px] select-none"
      style={{
        background: "var(--color-statusbar-bg)",
        color: "var(--color-statusbar-text)",
      }}
      aria-label="Status bar"
    >
      <div className="flex items-center gap-3 px-3">
        <span className="flex items-center gap-1" title="Git branch">
          <VscSourceControl className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("branch")}</span>
        </span>
        <span className="flex items-center gap-1" title="Sync status">
          <VscSync className="h-3.5 w-3.5" aria-hidden="true" />
          <span>0 ↓ 0 ↑</span>
        </span>
        <span className="flex items-center gap-1" title="Errors">
          <VscError className="h-3.5 w-3.5" aria-hidden="true" />
          <span>0</span>
        </span>
        <span className="flex items-center gap-1" title="Warnings">
          <VscWarning className="h-3.5 w-3.5" aria-hidden="true" />
          <span>0</span>
        </span>
      </div>

      <div className="flex flex-1" />

      <div className="flex items-center gap-3 px-3">
        <span title="GitHub Copilot" className="flex items-center gap-1">
          <VscCopilot className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Copilot</span>
        </span>
        <span>{active.language}</span>
        <span>{t("encoding")}</span>
        <span>{t("lineColumn", { line: 1, column: 1 })}</span>
        <span>{t("spaces")}</span>
        <span title={t("notifications")} aria-label={t("notifications")}>
          <VscBell className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </footer>
  );
}
