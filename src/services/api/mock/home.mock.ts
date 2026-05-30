import type { HomeData } from "@/features/home/types";

export const homeMock: HomeData = {
  name: "Saeed",
  lastName: "Panahi",
  title: "Front-end Developer",
  tagline: [
    "Building intelligent UIs",
    "Crafting clean, maintainable code",
    "Shipping delightful user experiences",
    "Turning ideas into interfaces",
    "Consulting on software architecture",
  ],
  intro:
    "I'm a front-end developer with 7+ years of experience building intuitive, " +
    "performant interfaces. I work at the intersection of clean code and great UX, " +
    "currently crafting production UIs at Balinex.",
  roleChips: [
    { label: "Senior Software Engineer", dotColor: "#c084fc" },
    { label: "Full-Stack Developer", dotColor: "#f59e0b" },
    { label: "Frontend Developer", dotColor: "#4ade80" },
    { label: "JS · TS · React", dotColor: "#38bdf8" },
    { label: "Balinex", isCompany: true },
  ],
  ctaButtons: [
    { label: "Projects", href: "#projects", variant: "filled", icon: "folder" },
    { label: "About Me", href: "/about", variant: "outline", icon: "account" },
    { label: "Contact", href: "/contact", variant: "outline", icon: "mail" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/panahi-projects", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/saeed-panahi-developer92/",
      icon: "linkedin",
    },
    { label: "Medium", href: "#", icon: "medium" },
    { label: "Tableau", href: "#", icon: "tableau" },
    { label: "LeetCode", href: "#", icon: "leetcode" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Email", href: "mailto:panahi.projects@gmail.com", icon: "email" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
  stats: [
    { value: "7+", label: "Years" },
    { value: "10+", label: "Projects" },
    { value: "∞", label: "Curiosity" },
    { value: "↑", label: "Always Learning" },
  ],
};
