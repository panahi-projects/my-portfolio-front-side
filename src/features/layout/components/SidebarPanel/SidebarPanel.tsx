"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES, DECORATIVE_FILES } from "@/features/layout/constants/pages";
import { CopilotPaneTrigger } from "@/features/layout/components/CopilotPane";
import { GitStatus } from "@/features/layout/components/GitStatus";
import { common } from "@/content/common";

export function SidebarPanel() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-56 shrink-0 flex-col text-xs select-none"
      style={{ background: "var(--color-sidebar-bg)", color: "var(--color-sidebar-text)" }}
      aria-label={common.a11y.fileExplorer}
    >
      <div className="px-4 py-2 text-[11px] font-medium tracking-wider uppercase opacity-70">
        {common.sidebar.portfolio}
      </div>

      <ul className="flex-1 overflow-y-auto py-1">
        {PAGES.map(({ key, filename, href, Icon, iconColor, navKey }) => {
          const isActive = pathname === href || (href === "/" && pathname === "");
          return (
            <li key={key}>
              <Link
                href={href}
                className="relative flex items-center gap-2 py-1 ps-6 pe-3 transition-colors"
                style={{
                  background: isActive ? "var(--color-sidebar-hover)" : "transparent",
                  color: isActive ? "var(--color-editor-text)" : "var(--color-sidebar-text)",
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
                <span className="truncate" title={filename}>
                  {filename}
                </span>
                <span className="sr-only">{common.nav[navKey]}</span>
              </Link>
            </li>
          );
        })}

        {DECORATIVE_FILES.map(({ filename, Icon, iconColor }) => (
          <li key={filename}>
            <span className="flex items-center gap-2 py-1 ps-6 pe-3 opacity-90">
              <Icon className="h-4 w-4 shrink-0" style={{ color: iconColor }} aria-hidden="true" />
              <span className="truncate" title={filename}>
                {filename}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 px-3 pt-2 pb-3">
        <CopilotPaneTrigger />
        <GitStatus />
      </div>
    </aside>
  );
}
