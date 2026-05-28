"use client";

import { useTranslations } from "next-intl";
import { VscSourceControl, VscSync, VscError, VscWarning, VscCopilot } from "react-icons/vsc";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { usePathname } from "@/i18n/navigation";
import { findPageByPath } from "@/features/layout/constants/pages";

export function StatusBar() {
  const t = useTranslations("common");
  const tStatus = useTranslations("common.statusbar");
  const pathname = usePathname();
  const active = findPageByPath(pathname);
  const { theme, themes } = useTheme();
  const activeTheme = themes.find((th) => th.id === theme) ?? themes[0];

  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  return (
    <footer
      className="flex h-6 shrink-0 items-stretch text-[11px] select-none"
      style={{
        background: "var(--color-statusbar-bg)",
        color: "var(--color-statusbar-text)",
      }}
      aria-label="Status bar"
    >
      <div className="flex items-center gap-4 px-3">
        <span className="flex items-center gap-1" title="Errors">
          <VscError className="h-3.5 w-3.5" aria-hidden="true" />
          <span>0</span>
        </span>
        <span className="flex items-center gap-1" title="Warnings">
          <VscWarning className="h-3.5 w-3.5" aria-hidden="true" />
          <span>0</span>
        </span>
        <span className="flex items-center gap-1" title="Git branch">
          <VscSourceControl className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{tStatus("branch")}</span>
        </span>
        <span className="flex items-center gap-1" title="Sync status">
          <VscSync className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("app.title")}</span>
        </span>
      </div>

      <div className="flex flex-1" />

      <div className="flex items-center gap-4 px-3">
        <span className="flex items-center gap-1" title="GitHub Copilot">
          <VscCopilot className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Copilot</span>
        </span>
        <span>{active.language}</span>
        <span>{tStatus("encoding")}</span>
        <span>Prettier</span>
        <span className="flex items-center gap-1" title={activeTheme.name}>
          <span aria-hidden="true">{activeTheme.emoji}</span>
          <span>{activeTheme.name}</span>
          <span className="opacity-60" aria-hidden="true">▲</span>
        </span>
        <span>{time}</span>
      </div>
    </footer>
  );
}
