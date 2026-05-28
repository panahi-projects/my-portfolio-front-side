"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { PAGES, README_META } from "@/features/layout/constants/pages";

export function SidebarPanel() {
  const t = useTranslations("common");
  const pathname = usePathname();

  return (
    <aside
      className="flex w-56 shrink-0 flex-col text-xs select-none"
      style={{ background: "var(--color-sidebar-bg)", color: "var(--color-sidebar-text)" }}
      aria-label="File explorer"
    >
      <div
        className="px-4 py-2 text-[11px] tracking-wider uppercase opacity-70"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {t("sidebar.portfolio")}
      </div>

      <ul className="flex-1 overflow-y-auto py-1">
        {PAGES.map(({ key, filename, href, Icon, iconColor, navKey }) => {
          const isActive = pathname === href || (href === "/" && pathname === "");
          return (
            <li key={key}>
              <Link
                href={href}
                className="flex items-center gap-2 px-4 py-1 transition-colors"
                style={{
                  background: isActive ? "var(--color-sidebar-hover)" : "transparent",
                }}
                aria-current={isActive ? "page" : undefined}
              >
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
        <li>
          <span className="flex items-center gap-2 px-4 py-1 opacity-80">
            <README_META.Icon
              className="h-4 w-4 shrink-0"
              style={{ color: README_META.iconColor }}
              aria-hidden="true"
            />
            <span className="truncate">{README_META.filename}</span>
          </span>
        </li>
      </ul>

      {/* Copilot trigger + Git status placeholders — filled in Phase 7 / 8 */}
      <div
        className="flex flex-col gap-1 px-2 py-2"
        style={{ borderTop: "1px solid var(--color-border)" }}
        data-placeholder="copilot-trigger-and-git-status"
      />
    </aside>
  );
}
