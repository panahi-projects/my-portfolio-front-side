import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaMedium, FaInstagram, FaYoutube } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { VscFolder, VscAccount, VscMail, VscGraphLine } from "react-icons/vsc";

/**
 * Resolves icon slugs used in mock data (social links, CTA buttons) to icon
 * components. Tableau has no Simple-Icons entry, so it falls back to a chart icon.
 */
const ICON_MAP: Record<string, IconType> = {
  // social
  github: FaGithub,
  linkedin: FaLinkedin,
  medium: FaMedium,
  instagram: FaInstagram,
  youtube: FaYoutube,
  leetcode: SiLeetcode,
  tableau: VscGraphLine,
  email: VscMail,
  // cta
  folder: VscFolder,
  account: VscAccount,
  mail: VscMail,
};

export function getIcon(slug?: string): IconType | null {
  if (!slug) return null;
  return ICON_MAP[slug] ?? null;
}
