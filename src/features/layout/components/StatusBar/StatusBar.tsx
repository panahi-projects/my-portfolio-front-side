"use client";

import { useEffect, useState } from "react";
import { VscSourceControl, VscSync, VscError, VscWarning, VscCopilot } from "react-icons/vsc";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { usePathname } from "next/navigation";
import { findPageByPath } from "@/features/layout/constants/pages";
import { common } from "@/content/common";

export function StatusBar() {
  const tStatus = common.statusbar;
  const pathname = usePathname();
  const active = findPageByPath(pathname);
  const { theme, themes } = useTheme();
  const activeTheme = themes.find((th) => th.id === theme) ?? themes[0];

  // Render the clock only after mount. The server and client can render in
  // different minutes, which causes a hydration mismatch — so we start empty
  // (matching SSR) and fill in on the client, ticking every 30s.
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time post-mount clock init; SSR renders empty to avoid a hydration mismatch
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      className="flex h-6 shrink-0 items-stretch text-[11px] select-none"
      style={{
        background: "var(--color-statusbar-bg)",
        color: "var(--color-statusbar-text)",
      }}
      aria-label={common.a11y.statusBar}
    >
      <div className="flex items-center gap-4 px-3">
        <span className="flex items-center gap-1" title={tStatus.errors}>
          <VscError className="h-3.5 w-3.5" aria-hidden="true" />
          <span>0</span>
        </span>
        <span className="flex items-center gap-1" title={tStatus.warnings}>
          <VscWarning className="h-3.5 w-3.5" aria-hidden="true" />
          <span>0</span>
        </span>
        <span className="flex items-center gap-1" title={tStatus.gitBranch}>
          <VscSourceControl className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{tStatus.branch}</span>
        </span>
        <span className="flex items-center gap-1" title={tStatus.syncStatus}>
          <VscSync className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{common.app.title}</span>
        </span>
      </div>

      <div className="flex flex-1" />

      <div className="flex items-center gap-4 px-3">
        <span className="flex items-center gap-1" title={tStatus.copilot}>
          <VscCopilot className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{tStatus.copilotLabel}</span>
        </span>
        <span>{active.language}</span>
        <span>{tStatus.encoding}</span>
        <span>Prettier</span>
        <span className="flex items-center gap-1" title={activeTheme.name}>
          <span aria-hidden="true">{activeTheme.emoji}</span>
          <span>{activeTheme.name}</span>
          <span className="opacity-60" aria-hidden="true">
            ▲
          </span>
        </span>
        <span>{time}</span>
      </div>
    </footer>
  );
}
