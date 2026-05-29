import type { SkillsData } from "@/features/skills/types";

export const skillsMock: SkillsData = {
  categories: [
    {
      name: "Languages",
      skills: [
        { name: "JavaScript", icon: "javascript", proficiency: 95 },
        { name: "TypeScript", icon: "typescript", proficiency: 90 },
        { name: "HTML5", icon: "html5", proficiency: 95 },
        { name: "CSS3", icon: "css3", proficiency: 92 },
        { name: "C#", icon: "csharp", proficiency: 65 },
      ],
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "React", icon: "react", proficiency: 92 },
        { name: "Next.js", icon: "nextjs", proficiency: 90 },
        { name: "Vue", icon: "vuejs", proficiency: 85 },
        { name: "Nuxt", icon: "nuxtjs", proficiency: 80 },
        { name: "NestJS", icon: "nestjs", proficiency: 68 },
      ],
    },
    {
      name: "Styling & UI",
      skills: [
        { name: "Tailwind CSS", icon: "tailwindcss", proficiency: 92 },
        { name: "Sass", icon: "sass", proficiency: 85 },
        { name: "Bootstrap", icon: "bootstrap", proficiency: 85 },
        { name: "Vuetify", icon: "vuetify", proficiency: 80 },
        { name: "MUI", icon: "materialui", proficiency: 80 },
      ],
    },
    {
      name: "Testing & State",
      skills: [
        { name: "Jest", icon: "jest", proficiency: 85 },
        { name: "Vitest", icon: "vitest", proficiency: 80 },
        { name: "Zustand", icon: "zustand", proficiency: 85 },
        { name: "Redux", icon: "redux", proficiency: 82 },
      ],
    },
    {
      name: "Tooling & Backend",
      skills: [
        { name: "Git", icon: "git", proficiency: 90 },
        { name: "Vite", icon: "vitejs", proficiency: 85 },
        { name: "Webpack", icon: "webpack", proficiency: 78 },
        { name: "Docker", icon: "docker", proficiency: 75 },
        { name: "Node.js", icon: "nodejs", proficiency: 80 },
        { name: "MongoDB", icon: "mongodb", proficiency: 78 },
        { name: "Redis", icon: "redis", proficiency: 72 },
      ],
    },
  ],
};
