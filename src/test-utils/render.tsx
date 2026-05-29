import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { SettingsProvider } from "@/features/theme/context/SettingsContext";
import { TabsProvider } from "@/features/layout/context/TabsContext";
import { CopilotProvider } from "@/features/layout/context/CopilotContext";

/**
 * Renders `ui` wrapped in every app provider (Theme + Settings + Tabs + Copilot),
 * so layout chrome and feature components behave as in the app.
 */
export function renderWithProviders(
  ui: ReactElement,
  options: Omit<RenderOptions, "wrapper"> = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider>
        <SettingsProvider>
          <TabsProvider>
            <CopilotProvider>{children}</CopilotProvider>
          </TabsProvider>
        </SettingsProvider>
      </ThemeProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

// Re-export Testing Library so tests import everything from one place.
export * from "@testing-library/react";
