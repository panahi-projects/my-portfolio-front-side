import type { AboutData } from "@/features/about/types";

export const aboutMock: AboutData = {
  bio:
    "I'm Saeed Panahi, a seasoned software engineer passionate about building intuitive, " +
    "user-friendly interfaces. Currently a front-end developer at Balinex, I work with " +
    "JavaScript, TypeScript, Next.js, React and more. With 7+ years of experience I've " +
    "collaborated with diverse teams, solved complex problems, and delivered high-quality " +
    "solutions that meet real user needs.",
  location: "Shiraz, Iran",
  availabilityStatus: "Open to opportunities & collaborations",
  currentFocus: [
    {
      emoji: "⚡",
      title: "Performance-first UIs",
      description: "Fast, accessible interfaces that feel instant on any device.",
    },
    {
      emoji: "🧩",
      title: "Design systems",
      description: "Reusable, themeable component libraries with strong typing.",
    },
    {
      emoji: "🧪",
      title: "Testing & quality",
      description: "Confident shipping backed by Jest, Vitest and RTL.",
    },
    {
      emoji: "🚀",
      title: "Learning in public",
      description: "Exploring new tools and sharing what I build along the way.",
    },
  ],
  education: [
    {
      institution: "Self-taught & continuous learning",
      degree: "Front-end engineering, web platform & system design",
      period: "Ongoing",
    },
    {
      institution: "University",
      degree: "B.Sc. in Computer-related field",
      period: "Completed",
    },
  ],
  cvUrl: "/Saeed_Panahi_Resume.pdf",
};
