"use client";

import { useTranslations } from "next-intl";
import { VscSourceControl } from "react-icons/vsc";

interface GitStatusProps {
  /** Decorative branch name override. Defaults to the i18n branch string. */
  branch?: string;
  /** Commits ahead of the upstream branch. */
  ahead?: number;
  /** Pending stashes / sparkles (decorative). */
  sparkles?: number;
  /** Hide the sparkle counter (used by mobile where space is tight). */
  hideSparkles?: boolean;
  className?: string;
}

export function GitStatus({
  branch,
  ahead = 1,
  sparkles = 3,
  hideSparkles = false,
  className = "",
}: GitStatusProps) {
  const t = useTranslations("common.statusbar");
  const tCommon = useTranslations("common");
  const label = branch ?? t("branch");

  return (
    <div
      className={`flex items-center gap-2 px-1 text-[11px] opacity-80 ${className}`}
      aria-label={tCommon("a11y.gitStatus")}
    >
      <VscSourceControl className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label}</span>
      <span className="ms-auto flex items-center gap-2">
        <span className="flex items-center gap-0.5" title={t("commitsAhead")}>
          <span aria-hidden="true">↑</span>
          <span>{ahead}</span>
        </span>
        {hideSparkles ? null : (
          <span
            className="flex items-center gap-0.5"
            title={t("pending")}
            style={{ color: "var(--color-copilot-accent)" }}
          >
            <span aria-hidden="true">✦</span>
            <span>{sparkles}</span>
          </span>
        )}
      </span>
    </div>
  );
}
