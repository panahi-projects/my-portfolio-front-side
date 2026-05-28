export const THEME_IDS = [
  "dark-plus",
  "light-plus",
  "monokai",
  "solarized-dark",
  "github-dark",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  description: string;
  isDark: boolean;
  swatch: {
    background: string;
    foreground: string;
    accent: string;
  };
}

export const THEMES: readonly ThemeMeta[] = [
  {
    id: "dark-plus",
    name: "Dark+ (Default Dark)",
    description: "Classic VS Code dark",
    isDark: true,
    swatch: { background: "#1e1e1e", foreground: "#d4d4d4", accent: "#007acc" },
  },
  {
    id: "light-plus",
    name: "Light+ (Default Light)",
    description: "Classic VS Code light",
    isDark: false,
    swatch: { background: "#ffffff", foreground: "#1f1f1f", accent: "#007acc" },
  },
  {
    id: "monokai",
    name: "Monokai",
    description: "Dark with vibrant greens & pinks",
    isDark: true,
    swatch: { background: "#272822", foreground: "#f8f8f2", accent: "#f92672" },
  },
  {
    id: "solarized-dark",
    name: "Solarized Dark",
    description: "Warm dark with teal accent",
    isDark: true,
    swatch: { background: "#002b36", foreground: "#93a1a1", accent: "#2aa198" },
  },
  {
    id: "github-dark",
    name: "GitHub Dark",
    description: "GitHub-inspired dark UI",
    isDark: true,
    swatch: { background: "#0d1117", foreground: "#c9d1d9", accent: "#58a6ff" },
  },
];

export const DEFAULT_THEME: ThemeId = "dark-plus";
export const THEME_STORAGE_KEY = "portfolio-theme";

export const isThemeId = (value: unknown): value is ThemeId =>
  typeof value === "string" && (THEME_IDS as readonly string[]).includes(value);
