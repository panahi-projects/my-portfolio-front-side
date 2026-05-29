"use client";

import { useState } from "react";
import type { ComponentType, SVGAttributes } from "react";
import { useTranslations } from "next-intl";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscCloudDownload,
  VscSparkle,
  VscSettingsGear,
} from "react-icons/vsc";
import { useSettings } from "@/features/theme/hooks/useSettings";

type ActivityKey = "explorer" | "search" | "git" | "downloads" | "copilot";

interface ActivityItem {
  key: ActivityKey;
  Icon: ComponentType<SVGAttributes<SVGElement>>;
}

const ITEMS: readonly ActivityItem[] = [
  { key: "explorer", Icon: VscFiles },
  { key: "search", Icon: VscSearch },
  { key: "git", Icon: VscSourceControl },
  { key: "downloads", Icon: VscCloudDownload },
  { key: "copilot", Icon: VscSparkle },
];

export function ActivityBar() {
  const t = useTranslations("common");
  const [active, setActive] = useState<ActivityKey>("explorer");
  const { toggle: toggleSettings, isOpen: settingsOpen } = useSettings();

  return (
    <aside
      className="flex w-12 shrink-0 flex-col items-center justify-between py-2"
      style={{ background: "var(--color-activitybar-bg)", color: "var(--color-activitybar-icon)" }}
      aria-label={t("a11y.activityBar")}
    >
      <ul className="flex flex-col">
        {ITEMS.map(({ key, Icon }) => {
          const isActive = active === key;
          const label = t(`activitybar.${key}`);
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => setActive(key)}
                title={label}
                aria-label={label}
                aria-pressed={isActive}
                className="relative grid h-12 w-12 place-items-center transition-colors"
                style={{
                  color: isActive
                    ? "var(--color-activitybar-active)"
                    : "var(--color-activitybar-icon)",
                }}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                {isActive ? (
                  <span
                    className="absolute inset-y-0 start-0 w-0.5"
                    style={{ background: "var(--color-activitybar-active)" }}
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col">
        <li>
          <button
            type="button"
            onClick={toggleSettings}
            title={t("settings.title")}
            aria-label={t("settings.title")}
            aria-pressed={settingsOpen}
            className="grid h-12 w-12 place-items-center transition-colors hover:text-white"
            style={{ color: settingsOpen ? "var(--color-activitybar-active)" : undefined }}
          >
            <VscSettingsGear className="h-6 w-6" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </aside>
  );
}
