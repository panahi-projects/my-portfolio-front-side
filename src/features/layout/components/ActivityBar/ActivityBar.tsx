"use client";

import { useState } from "react";
import type { ComponentType, SVGAttributes } from "react";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscExtensions,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

type ActivityKey = "explorer" | "search" | "git" | "extensions";

interface ActivityItem {
  key: ActivityKey;
  label: string;
  Icon: ComponentType<SVGAttributes<SVGElement>>;
}

const ITEMS: readonly ActivityItem[] = [
  { key: "explorer", label: "Explorer", Icon: VscFiles },
  { key: "search", label: "Search", Icon: VscSearch },
  { key: "git", label: "Source Control", Icon: VscSourceControl },
  { key: "extensions", label: "Extensions", Icon: VscExtensions },
];

export function ActivityBar() {
  const [active, setActive] = useState<ActivityKey>("explorer");

  return (
    <aside
      className="flex w-12 shrink-0 flex-col items-center justify-between py-2"
      style={{ background: "var(--color-activitybar-bg)", color: "var(--color-activitybar-icon)" }}
      aria-label="Activity bar"
    >
      <ul className="flex flex-col gap-1">
        {ITEMS.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => setActive(key)}
                title={label}
                aria-label={label}
                aria-pressed={isActive}
                className="relative grid h-10 w-12 place-items-center transition-colors"
                style={{
                  color: isActive
                    ? "var(--color-activitybar-active)"
                    : "var(--color-activitybar-icon)",
                }}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                {isActive ? (
                  <span
                    className="absolute top-0 bottom-0 left-0 w-0.5"
                    style={{ background: "var(--color-activitybar-active)" }}
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col gap-1">
        <li>
          <button
            type="button"
            title="Account"
            aria-label="Account"
            className="grid h-10 w-12 place-items-center transition-colors hover:text-white"
          >
            <VscAccount className="h-6 w-6" aria-hidden="true" />
          </button>
        </li>
        <li>
          <button
            type="button"
            title="Settings"
            aria-label="Settings"
            className="grid h-10 w-12 place-items-center transition-colors hover:text-white"
          >
            <VscSettingsGear className="h-6 w-6" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </aside>
  );
}
