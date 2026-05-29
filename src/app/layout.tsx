import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { SettingsProvider } from "@/features/theme/context/SettingsContext";
import { ThemeInitScript } from "@/features/theme/components/ThemeInitScript";
import { DEFAULT_THEME } from "@/features/theme/constants/themes";
import { AppShell } from "@/features/layout/components/AppShell";
import { TabsProvider } from "@/features/layout/context/TabsContext";
import { CopilotProvider } from "@/features/layout/context/CopilotContext";
import { common } from "@/content/common";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: common.app.title,
  description: common.app.title,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme={DEFAULT_THEME}
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeInitScript />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SettingsProvider>
            <TabsProvider>
              <CopilotProvider>
                <AppShell>{children}</AppShell>
              </CopilotProvider>
            </TabsProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
