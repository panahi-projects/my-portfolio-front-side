/** Data contract for the Contact page. */

export interface ContactSocialLink {
  label: string;
  href: string;
  /** Icon slug, e.g. "github", "linkedin", "email". */
  icon: string;
  /** Optional display handle, e.g. "@panahi-projects". */
  handle?: string;
}

export interface ContactData {
  email: string;
  socialLinks: ContactSocialLink[];
  location: string;
  timezone: string;
}
