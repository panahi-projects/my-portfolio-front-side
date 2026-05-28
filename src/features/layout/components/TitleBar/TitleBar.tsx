"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose, VscSearch } from "react-icons/vsc";

export function TitleBar() {
  const t = useTranslations("common");
  const [query, setQuery] = useState("");

  return (
    <header
      className="flex h-9 shrink-0 items-center gap-2 px-3 text-xs select-none"
      style={{ background: "var(--color-titlebar-bg)", color: "var(--color-sidebar-text)" }}
      role="banner"
    >
      {/* macOS window controls */}
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Centered command-palette search */}
      <div className="flex flex-1 items-center justify-center">
        <label
          className="flex h-6 w-full max-w-md items-center gap-2 rounded border border-black/20 px-2 text-xs"
          style={{ background: "var(--color-editor-bg)" }}
        >
          <VscSearch className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="flex-1 bg-transparent outline-none placeholder:opacity-60"
            style={{ color: "var(--color-editor-text)" }}
            aria-label={t("search.placeholder")}
          />
          <span
            className="rounded border px-1 text-[10px] tracking-wide opacity-70"
            style={{ borderColor: "var(--color-border)" }}
            aria-hidden="true"
          >
            Ctrl P
          </span>
        </label>
      </div>

      {/* Window action buttons */}
      <div className="flex items-center gap-1" aria-hidden="true">
        <button
          type="button"
          className="grid h-6 w-8 place-items-center opacity-70 hover:opacity-100"
          tabIndex={-1}
        >
          <VscChromeMinimize className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="grid h-6 w-8 place-items-center opacity-70 hover:opacity-100"
          tabIndex={-1}
        >
          <VscChromeMaximize className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="grid h-6 w-8 place-items-center opacity-70 hover:bg-red-600 hover:opacity-100"
          tabIndex={-1}
        >
          <VscChromeClose className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
