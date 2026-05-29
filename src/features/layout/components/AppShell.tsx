import type { ReactNode } from "react";
import { TitleBar } from "./TitleBar";
import { MenuBar } from "./MenuBar";
import { ActivityBar } from "./ActivityBar";
import { SidebarPanel } from "./SidebarPanel";
import { TabsBar } from "./TabsBar";
import { StatusBar } from "./StatusBar";
import { MobileNav } from "./MobileNav";
import { CopilotPane, CopilotPaneMobile } from "./CopilotPane";
import { SettingsPanel } from "@/features/theme/components/SettingsPanel";

/**
 * Top-level shell that renders the VS Code chrome around `children`.
 * Desktop (>= md): TitleBar + MenuBar + ActivityBar + Sidebar + Tabs + StatusBar.
 * Mobile (< md): MobileNav (simplified top bar + floating hamburger menu).
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-screen w-screen flex-col overflow-hidden"
      style={{ background: "var(--color-editor-bg)", color: "var(--color-editor-text)" }}
    >
      {/* Mobile chrome — top bar + floating hamburger; hidden on desktop */}
      <MobileNav />

      {/* Mobile Copilot — full-screen overlay; hidden on desktop */}
      <CopilotPaneMobile />

      {/* Settings — desktop dropdown + mobile drawer (renders both, breakpoint-gated) */}
      <SettingsPanel />

      {/* Desktop chrome */}
      <div className="hidden md:block">
        <TitleBar />
        <MenuBar />
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Left rail: ActivityBar + SidebarPanel — desktop only */}
        <div className="hidden md:flex">
          <ActivityBar />
          <SidebarPanel />
        </div>

        {/* Editor column: Tabs + (main content | Copilot pane) */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="hidden md:block">
            <TabsBar />
          </div>
          {/* Editor shrinks to ~65% when the Copilot pane slides in (desktop only) */}
          <div className="flex min-h-0 flex-1">
            <main
              className="min-h-0 flex-1 overflow-y-auto"
              style={{ background: "var(--color-editor-bg)", color: "var(--color-editor-text)" }}
            >
              {children}
            </main>
            <CopilotPane />
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <StatusBar />
      </div>
    </div>
  );
}
