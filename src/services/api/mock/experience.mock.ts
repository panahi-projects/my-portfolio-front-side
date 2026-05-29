import type { ExperienceData } from "@/features/experience/types";

export const experienceMock: ExperienceData = {
  experiences: [
    {
      company: "Balinex",
      role: "Front-end Developer",
      startDate: "2022-01",
      endDate: null,
      location: "Remote",
      current: true,
      achievements: [
        "Build and maintain production interfaces used by real customers.",
        "Lead front-end architecture decisions and component library work.",
        "Improve performance, accessibility and test coverage across the app.",
      ],
      techStack: ["TypeScript", "Next.js", "React", "Vue", "Tailwind CSS", "Jest"],
    },
    {
      company: "Freelance & Contract",
      role: "Front-end Developer",
      startDate: "2019-06",
      endDate: "2021-12",
      location: "Remote",
      current: false,
      achievements: [
        "Delivered responsive web apps for clients across multiple industries.",
        "Translated designs into pixel-accurate, accessible interfaces.",
        "Integrated REST and real-time APIs with robust state management.",
      ],
      techStack: ["JavaScript", "Vue", "Nuxt", "Sass", "Bootstrap", "Socket.io"],
    },
    {
      company: "Web Studio",
      role: "Junior Front-end Developer",
      startDate: "2017-03",
      endDate: "2019-05",
      location: "On-site",
      current: false,
      achievements: [
        "Built marketing sites and dashboards from design mockups.",
        "Learned modern tooling, testing and team collaboration workflows.",
      ],
      techStack: ["JavaScript", "React", "CSS3", "HTML5", "Git"],
    },
  ],
};
