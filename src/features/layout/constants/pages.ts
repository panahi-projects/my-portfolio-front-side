import type { ComponentType, SVGAttributes } from "react";
import { SiReact, SiHtml5, SiJavascript, SiTypescript, SiCss, SiMarkdown } from "react-icons/si";
import { VscJson, VscFilePdf } from "react-icons/vsc";

export type PageKey = "home" | "about" | "skills" | "experience" | "contact";

export type IconComponent = ComponentType<SVGAttributes<SVGElement>>;

export interface PageMeta {
  key: PageKey;
  /** Display filename in the sidebar / tabs (decorative — extension varies for visual variety). */
  filename: string;
  /** Route path under the current locale, without locale prefix. "/" for home. */
  href: string;
  /** Display language tag (shown in StatusBar when this page is active). */
  language: string;
  /** Icon used in sidebar + tabs. */
  Icon: IconComponent;
  /** Color used for the file icon. */
  iconColor: string;
  /** i18n key (under `common.nav`) for the human-readable page name. */
  navKey: PageKey;
}

export const PAGES: readonly PageMeta[] = [
  {
    key: "home",
    filename: "home.tsx",
    href: "/",
    language: "TypeScript React",
    Icon: SiReact,
    iconColor: "#61dafb",
    navKey: "home",
  },
  {
    key: "about",
    filename: "about.html",
    href: "/about",
    language: "HTML",
    Icon: SiHtml5,
    iconColor: "#e34f26",
    navKey: "about",
  },
  {
    key: "skills",
    filename: "skills.json",
    href: "/skills",
    language: "JSON",
    Icon: VscJson,
    iconColor: "#facc15",
    navKey: "skills",
  },
  {
    key: "experience",
    filename: "experience.ts",
    href: "/experience",
    language: "TypeScript",
    Icon: SiTypescript,
    iconColor: "#3178c6",
    navKey: "experience",
  },
  {
    key: "contact",
    filename: "contact.css",
    href: "/contact",
    language: "CSS",
    Icon: SiCss,
    iconColor: "#1572b6",
    navKey: "contact",
  },
];

/**
 * Decorative file entries that appear in the sidebar tree alongside the
 * navigable pages. They're not routes, so clicking does nothing — they exist
 * to fill out the "filesystem" visual of a real editor.
 */
export interface DecorativeFile {
  filename: string;
  Icon: IconComponent;
  iconColor: string;
}

export const DECORATIVE_FILES: readonly DecorativeFile[] = [
  { filename: "projects.js", Icon: SiJavascript, iconColor: "#facc15" },
  { filename: "README.md", Icon: SiMarkdown, iconColor: "#519aba" },
  { filename: "Saeed_Panahi_Resume.pdf", Icon: VscFilePdf, iconColor: "#ec4144" },
];

/** Lookup a page by route path. Falls back to home. */
export const findPageByPath = (path: string): PageMeta => {
  // Strip locale prefix: "/en/about" -> "/about", "/en" -> "/"
  const stripped = path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
  return PAGES.find((p) => p.href === stripped) ?? PAGES[0];
};
