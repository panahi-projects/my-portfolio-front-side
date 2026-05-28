export const THEME_IDS = [
  "default-dark",
  "rose-pine",
  "tokyo-night",
  "catppuccin",
  "nord",
  "gruvbox",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  description: string;
  emoji: string;
  isDark: boolean;
  swatch: {
    background: string;
    foreground: string;
    accent: string;
  };
}

export const THEMES: readonly ThemeMeta[] = [
  {
    id: "default-dark",
    name: "Default Dark",
    description: "Deep navy with purple & cyan accents",
    emoji: "💜",
    isDark: true,
    swatch: { background: "#0e1020", foreground: "#c9cad6", accent: "#c084fc" },
  },
  {
    id: "rose-pine",
    name: "Rosé Pine",
    description: "Soho-vibe dark with rose accents",
    emoji: "🌹",
    isDark: true,
    swatch: { background: "#191724", foreground: "#e0def4", accent: "#eb6f92" },
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "Deep blue with cyan & purple accents",
    emoji: "🌃",
    isDark: true,
    swatch: { background: "#1a1b26", foreground: "#c0caf5", accent: "#7aa2f7" },
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
    description: "Mocha — warm pastels on deep mauve",
    emoji: "🐱",
    isDark: true,
    swatch: { background: "#1e1e2e", foreground: "#cdd6f4", accent: "#cba6f7" },
  },
  {
    id: "nord",
    name: "Nord",
    description: "Arctic blue-gray with frost accents",
    emoji: "🧊",
    isDark: true,
    swatch: { background: "#2e3440", foreground: "#d8dee9", accent: "#88c0d0" },
  },
  {
    id: "gruvbox",
    name: "Gruvbox",
    description: "Warm sepia & retro orange",
    emoji: "🔥",
    isDark: true,
    swatch: { background: "#282828", foreground: "#ebdbb2", accent: "#fb4934" },
  },
];

export const DEFAULT_THEME: ThemeId = "default-dark";
export const THEME_STORAGE_KEY = "portfolio-theme";

export const isThemeId = (value: unknown): value is ThemeId =>
  typeof value === "string" && (THEME_IDS as readonly string[]).includes(value);
