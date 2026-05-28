import type { ReactNode } from "react";
import { TitleBar } from "./TitleBar";
import { MenuBar } from "./MenuBar";
import { ActivityBar } from "./ActivityBar";
import { SidebarPanel } from "./SidebarPanel";
import { TabsBar } from "./TabsBar";
import { StatusBar } from "./StatusBar";

/**
 * Top-level shell that renders the VS Code chrome around `children`.
 * Desktop (>= md): full TitleBar + MenuBar + ActivityBar + Sidebar + Tabs + StatusBar.
 * Mobile (< md): MobileNav is layered in Phase 5; for now the chrome simply
 * hides on small screens and the page content renders full-bleed.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-screen w-screen flex-col overflow-hidden"
      style={{ background: "var(--color-editor-bg)", color: "var(--color-editor-text)" }}
    >
      {/* Desktop chrome — hidden below md, MobileNav (Phase 5) takes over */}
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

        {/* Editor column: Tabs + scrollable main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="hidden md:block">
            <TabsBar />
          </div>
          <main
            className="min-h-0 flex-1 overflow-y-auto"
            style={{ background: "var(--color-editor-bg)", color: "var(--color-editor-text)" }}
          >
            {children}
          </main>
        </div>
      </div>

      <div className="hidden md:block">
        <StatusBar />
      </div>
    </div>
  );
}
