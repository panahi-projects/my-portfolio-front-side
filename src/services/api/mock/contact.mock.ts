import type { ContactData } from "@/features/contact/types";

export const contactMock: ContactData = {
  email: "panahi.projects@gmail.com",
  location: "Tehran, Iran",
  timezone: "GMT+3:30 (IRST)",
  socialLinks: [
    {
      label: "Email",
      href: "mailto:panahi.projects@gmail.com",
      icon: "email",
      handle: "panahi.projects@gmail.com",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/saeed-panahi-developer92/",
      icon: "linkedin",
      handle: "in/saeed-panahi-developer92",
    },
    {
      label: "GitHub",
      href: "https://github.com/panahi-projects",
      icon: "github",
      handle: "@panahi-projects",
    },
    { label: "Medium", href: "#", icon: "medium", handle: "@saeed-panahi" },
    { label: "Tableau", href: "#", icon: "tableau", handle: "saeed.panahi" },
    { label: "LeetCode", href: "#", icon: "leetcode", handle: "panahi-projects" },
  ],
};
