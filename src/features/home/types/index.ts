/** Data contract for the Home page (hero section). */

export interface RoleChip {
  /** Display label, e.g. "Frontend Developer". */
  label: string;
  /** Optional dot color (CSS color or theme var) shown before the label. */
  dotColor?: string;
  /** When true, rendered as a "@ company" chip rather than a role. */
  isCompany?: boolean;
}

export interface CtaButton {
  label: string;
  href: string;
  variant: "filled" | "outline";
  /** Icon slug resolved to a component by the UI. */
  icon?: string;
}

export interface HomeSocialLink {
  label: string;
  href: string;
  /** Icon slug, e.g. "github", "linkedin", "email". */
  icon: string;
}

export interface HomeStat {
  value: string;
  label: string;
}

export interface HomeData {
  /** First name, rendered in the editor foreground color. */
  name: string;
  /** Last name, rendered with the accent gradient. */
  lastName: string;
  title: string;
  /** Phrases cycled by the typing animation. */
  tagline: string[];
  /** Intro paragraph (may contain highlighted keywords in the UI). */
  intro: string;
  roleChips: RoleChip[];
  ctaButtons: CtaButton[];
  socialLinks: HomeSocialLink[];
  stats: HomeStat[];
}
