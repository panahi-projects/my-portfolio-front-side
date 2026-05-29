"use client";

import { VscSearch } from "react-icons/vsc";
import { common } from "@/content/common";

export function TitleBar() {
  return (
    <header
      className="relative flex h-8 shrink-0 items-center px-3 text-xs select-none"
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
      <div className="absolute inset-x-0 flex items-center justify-center">
        <div
          className="flex h-6 w-full max-w-md items-center gap-2 rounded border px-2 text-xs"
          style={{ background: "var(--color-editor-bg)", borderColor: "var(--color-border)" }}
        >
          <VscSearch className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          <span className="flex-1 truncate text-center opacity-80">{common.app.fileTitle}</span>
          <span
            className="flex shrink-0 items-center gap-1 rounded px-1 text-[10px] tracking-wide opacity-70"
            style={{ background: "var(--color-sidebar-hover)" }}
            aria-hidden="true"
          >
            <span>Ctrl</span>
            <span>P</span>
          </span>
        </div>
      </div>
    </header>
  );
}
