import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { messages } from "./intl";
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { SettingsProvider } from "@/features/theme/context/SettingsContext";
import { TabsProvider } from "@/features/layout/context/TabsContext";
import { CopilotProvider } from "@/features/layout/context/CopilotContext";

interface ProviderOptions extends Omit<RenderOptions, "wrapper"> {
  /** Locale passed to NextIntlClientProvider (use "fa" to exercise RTL). */
  locale?: string;
}

/**
 * Renders `ui` wrapped in every app provider (NextIntl + Theme + Settings +
 * Tabs + Copilot), so layout chrome and feature components behave as in the app.
 */
export function renderWithProviders(
  ui: ReactElement,
  { locale = "en", ...options }: ProviderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          <SettingsProvider>
            <TabsProvider>
              <CopilotProvider>{children}</CopilotProvider>
            </TabsProvider>
          </SettingsProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

// Re-export Testing Library so tests import everything from one place.
export * from "@testing-library/react";
