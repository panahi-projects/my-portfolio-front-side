"use client";

import { useTranslations } from "next-intl";
import { VscSourceControl, VscSparkle } from "react-icons/vsc";
import { Link, usePathname } from "@/i18n/navigation";
import { PAGES, DECORATIVE_FILES } from "@/features/layout/constants/pages";

export function SidebarPanel() {
  const t = useTranslations("common");
  const pathname = usePathname();

  return (
    <aside
      className="flex w-56 shrink-0 flex-col text-xs select-none"
      style={{ background: "var(--color-sidebar-bg)", color: "var(--color-sidebar-text)" }}
      aria-label="File explorer"
    >
      <div className="px-4 py-2 text-[11px] font-medium tracking-wider uppercase opacity-70">
        {t("sidebar.portfolio")}
      </div>

      <ul className="flex-1 overflow-y-auto py-1">
        {PAGES.map(({ key, filename, href, Icon, iconColor, navKey }) => {
          const isActive = pathname === href || (href === "/" && pathname === "");
          return (
            <li key={key}>
              <Link
                href={href}
                className="relative flex items-center gap-2 py-1 pe-3 ps-6 transition-colors"
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
                <span className="sr-only">{t(`nav.${navKey}`)}</span>
              </Link>
            </li>
          );
        })}

        {DECORATIVE_FILES.map(({ filename, Icon, iconColor }) => (
          <li key={filename}>
            <span className="flex items-center gap-2 py-1 pe-3 ps-6 opacity-90">
              <Icon
                className="h-4 w-4 shrink-0"
                style={{ color: iconColor }}
                aria-hidden="true"
              />
              <span className="truncate" title={filename}>
                {filename}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Bottom slot — Copilot trigger + git status. Wired in Phase 7/8;
          for now these are visual mocks that match the screenshots. */}
      <div className="flex flex-col gap-2 px-3 pt-2 pb-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-sidebar-hover)",
            color: "var(--color-editor-text)",
          }}
          data-placeholder="copilot-trigger"
        >
          <VscSparkle
            className="h-4 w-4 shrink-0"
            style={{ color: "var(--color-copilot-accent)" }}
            aria-hidden="true"
          />
          <span className="flex-1 truncate text-start">{t("copilot.triggerLabel")}</span>
          <span
            className="rounded px-1 text-[10px] tracking-wide opacity-70"
            style={{ background: "var(--color-sidebar-bg)" }}
          >
            AI
          </span>
        </button>

        <div
          className="flex items-center gap-2 px-1 text-[11px] opacity-80"
          data-placeholder="git-status"
        >
          <VscSourceControl className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("statusbar.branch")}</span>
          <span className="ms-auto flex items-center gap-2 opacity-80">
            <span className="flex items-center gap-0.5">
              <span aria-hidden="true">↑</span>
              <span>1</span>
            </span>
            <span
              className="flex items-center gap-0.5"
              style={{ color: "var(--color-copilot-accent)" }}
            >
              <span aria-hidden="true">✦</span>
              <span>3</span>
            </span>
          </span>
        </div>
      </div>
    </aside>
  );
}
