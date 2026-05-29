"use client";

import { useEffect, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  VscCheck,
  VscChevronRight,
  VscClose,
  VscFilePdf,
  VscScreenFull,
  VscSearch,
  VscSettingsGear,
  VscSparkle,
  VscTerminal,
} from "react-icons/vsc";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import type { IconType } from "react-icons";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { useSettings } from "@/features/theme/hooks/useSettings";
import { useCopilotPane } from "@/features/layout/components/CopilotPane";

const RESUME_HREF = "/Saeed_Panahi_Resume.pdf";

interface QuickAction {
  id: "commandPalette" | "toggleTerminal" | "copilotChat" | "downloadResume" | "toggleFullscreen";
  Icon: IconType;
  shortcut?: string;
}

const QUICK_ACTIONS: readonly QuickAction[] = [
  { id: "commandPalette", Icon: VscSearch, shortcut: "Ctrl+P" },
  { id: "toggleTerminal", Icon: VscTerminal, shortcut: "Ctrl+`" },
  { id: "copilotChat", Icon: VscSparkle },
  { id: "downloadResume", Icon: VscFilePdf },
  { id: "toggleFullscreen", Icon: VscScreenFull, shortcut: "F11" },
];

interface Shortcut {
  keys: readonly string[];
  id: "goToFile" | "toggleSidebar" | "toggleTerminal" | "closeOverlay" | "terminalHistory";
}

const SHORTCUTS: readonly Shortcut[] = [
  { keys: ["Ctrl", "P"], id: "goToFile" },
  { keys: ["Ctrl", "B"], id: "toggleSidebar" },
  { keys: ["Ctrl", "`"], id: "toggleTerminal" },
  { keys: ["Esc"], id: "closeOverlay" },
  { keys: ["↑", "↓"], id: "terminalHistory" },
];

interface SocialLink {
  label: string;
  href: string;
  Icon: IconType;
  color: string;
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/panahi-projects", Icon: FaGithub, color: "#e6e6e6" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/saeed-panahi-developer92",
    Icon: FaLinkedin,
    color: "#0a66c2",
  },
  { label: "Medium", href: "#", Icon: FaMedium, color: "#e6e6e6" },
  { label: "LeetCode", href: "#", Icon: SiLeetcode, color: "#ffa116" },
];

function toggleFullscreen() {
  if (typeof document === "undefined") return;
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else document.documentElement.requestFullscreen().catch(() => {});
}

/** Small uppercase section heading with a leading emoji (matches the screenshots). */
function SectionLabel({ emoji, children }: { emoji: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-2 pt-4 pb-1.5 text-[10px] font-semibold tracking-wider uppercase opacity-50">
      <span aria-hidden="true">{emoji}</span>
      <span>{children}</span>
    </div>
  );
}

function Divider() {
  return <div className="my-1 h-px" style={{ background: "var(--color-border)" }} />;
}

/** COLOR THEME rows — shared by desktop + mobile. */
function ThemeRows({ onPick }: { onPick?: () => void }) {
  const { theme, themes, setTheme } = useTheme();
  return (
    <ul>
      {themes.map((th) => {
        const active = th.id === theme;
        return (
          <li key={th.id}>
            <button
              type="button"
              onClick={() => {
                setTheme(th.id);
                onPick?.();
              }}
              aria-pressed={active}
              className="flex w-full items-center gap-3 rounded px-2 py-2 text-xs transition-colors"
              style={{ background: active ? "var(--color-sidebar-hover)" : "transparent" }}
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{
                  background: th.swatch.background,
                  boxShadow: active
                    ? "0 0 0 2px var(--color-accent)"
                    : "0 0 0 1px var(--color-border)",
                }}
                aria-hidden="true"
              />
              <span aria-hidden="true">{th.emoji}</span>
              <span className="flex-1 truncate text-start" style={{ color: "var(--color-editor-text)" }}>
                {th.name}
              </span>
              {active && (
                <VscCheck
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** KEYBOARD SHORTCUTS — display-only list, shared by desktop + mobile. */
function ShortcutRows() {
  const t = useTranslations("common.settings.shortcuts");
  return (
    <ul className="px-1">
      {SHORTCUTS.map((s) => (
        <li key={s.id} className="flex items-center gap-2 px-1 py-1.5 text-xs">
          <span className="flex shrink-0 gap-1">
            {s.keys.map((k) => (
              <kbd
                key={k}
                className="rounded px-1.5 py-0.5 text-[10px]"
                style={{
                  background: "var(--color-sidebar-hover)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-editor-text)",
                }}
              >
                {k}
              </kbd>
            ))}
          </span>
          <span className="opacity-60">{t(s.id)}</span>
        </li>
      ))}
    </ul>
  );
}

/** LANGUAGE toggle — switches locale via the localized router. */
function LanguageButtons() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-2 px-2">
      {routing.locales.map((loc: AppLocale) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-pressed={active}
            className="flex-1 rounded-md border px-3 py-1.5 text-xs transition-colors"
            style={{
              borderColor: active ? "var(--color-accent)" : "var(--color-border)",
              background: active ? "var(--color-sidebar-hover)" : "transparent",
              color: "var(--color-editor-text)",
            }}
          >
            {t(`languages.${loc}`)}
          </button>
        );
      })}
    </div>
  );
}

function PanelFooter() {
  const t = useTranslations("common.settings.footer");
  return (
    <div className="px-2 py-3 text-[10px] leading-relaxed opacity-50">
      <p>{t("version")}</p>
      <p>{t("madeWith")}</p>
    </div>
  );
}

export function SettingsPanel() {
  const t = useTranslations("common.settings");
  const { isOpen, close } = useSettings();
  const { open: openCopilot } = useCopilotPane();

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  const runQuickAction = (id: QuickAction["id"]) => {
    switch (id) {
      case "copilotChat":
        openCopilot();
        close();
        break;
      case "toggleFullscreen":
        toggleFullscreen();
        close();
        break;
      // commandPalette / toggleTerminal are decorative placeholders for now.
      default:
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ---- Desktop: dropdown anchored top-start, under the File menu ---- */}
          <motion.div
            key="settings-desktop-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 hidden md:block"
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            key="settings-desktop"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50 hidden max-h-[calc(100vh-72px)] w-80 flex-col overflow-y-auto rounded-md border shadow-2xl md:flex"
            style={{
              top: 60,
              insetInlineStart: 4,
              background: "var(--color-sidebar-bg)",
              borderColor: "var(--color-border)",
              color: "var(--color-editor-text)",
            }}
            role="dialog"
            aria-modal="false"
            aria-label={t("title")}
          >
            <div className="px-2 pt-3 pb-1 text-[10px] font-semibold tracking-wider uppercase opacity-50">
              {t("title")}
            </div>
            <Divider />

            <SectionLabel emoji="🎨">{t("theme")}</SectionLabel>
            <ThemeRows />
            <Divider />

            <SectionLabel emoji="⚡">{t("quickActions")}</SectionLabel>
            <ul className="px-1">
              {QUICK_ACTIONS.map(({ id, Icon, shortcut }) =>
                id === "downloadResume" ? (
                  <li key={id}>
                    <a
                      href={RESUME_HREF}
                      download
                      onClick={close}
                      className="flex w-full items-center gap-3 rounded px-2 py-2 text-xs transition-colors hover:bg-white/5"
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
                      <span className="flex-1 text-start">{t(`actions.${id}`)}</span>
                    </a>
                  </li>
                ) : (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => runQuickAction(id)}
                      className="flex w-full items-center gap-3 rounded px-2 py-2 text-xs transition-colors hover:bg-white/5"
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
                      <span className="flex-1 text-start">{t(`actions.${id}`)}</span>
                      {shortcut && (
                        <span className="text-[10px] opacity-50">{shortcut}</span>
                      )}
                    </button>
                  </li>
                ),
              )}
            </ul>
            <Divider />

            <SectionLabel emoji="⌨️">{t("keyboardShortcuts")}</SectionLabel>
            <ShortcutRows />
            <Divider />

            <SectionLabel emoji="🌐">{t("language")}</SectionLabel>
            <LanguageButtons />

            <Divider />
            <PanelFooter />
          </motion.div>

          {/* ---- Mobile: slide-in drawer from the start side ---- */}
          <motion.div
            key="settings-mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/60 md:hidden"
            onClick={close}
            aria-hidden="true"
          />
          <motion.aside
            key="settings-mobile"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.22 }}
            className="fixed inset-y-0 start-0 z-50 flex w-80 max-w-[85vw] flex-col overflow-y-auto md:hidden"
            style={{
              background: "var(--color-sidebar-bg)",
              color: "var(--color-editor-text)",
              borderInlineEnd: "1px solid var(--color-border)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
          >
            <div
              className="flex items-center justify-between px-3 py-3"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase opacity-70">
                {t("title")}
              </span>
              <div className="flex items-center gap-1">
                <span
                  className="grid h-8 w-8 place-items-center rounded"
                  style={{ background: "var(--color-sidebar-hover)" }}
                  aria-hidden="true"
                >
                  <VscSettingsGear className="h-4 w-4" />
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t("close") /* fallback handled by i18n */}
                  className="grid h-8 w-8 place-items-center rounded hover:bg-white/10"
                >
                  <VscClose className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="px-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  openCopilot();
                  close();
                }}
                className="flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-xs"
                style={{
                  borderColor: "var(--color-copilot-accent)",
                  background: "var(--color-copilot-bg)",
                  color: "var(--color-editor-text)",
                }}
              >
                <VscSparkle
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--color-copilot-accent)" }}
                  aria-hidden="true"
                />
                <span className="flex-1 text-start font-medium">{t("openCopilot")}</span>
                <span
                  className="rounded px-1.5 py-0.5 text-[10px]"
                  style={{ background: "var(--color-sidebar-hover)" }}
                  aria-hidden="true"
                >
                  AI ✨
                </span>
              </button>
            </div>

            <SectionLabel emoji="🎨">{t("theme")}</SectionLabel>
            <div className="px-1">
              <ThemeRows />
            </div>
            <Divider />

            <SectionLabel emoji="⌨️">{t("keyboardShortcuts")}</SectionLabel>
            <ShortcutRows />
            <Divider />

            <SectionLabel emoji="🌐">{t("language")}</SectionLabel>
            <LanguageButtons />
            <Divider />

            <SectionLabel emoji="🔗">{t("links")}</SectionLabel>
            <ul className="px-1 pb-1">
              {SOCIAL_LINKS.map(({ label, href, Icon, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded px-2 py-2 text-xs transition-colors hover:bg-white/5"
                  >
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
                    <span className="flex-1 text-start">{label}</span>
                    <VscChevronRight className="h-3.5 w-3.5 opacity-40" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <Divider />
            <PanelFooter />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
