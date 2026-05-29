/**
 * Pool of canned assistant replies for the mock Copilot chat. Picked at random
 * when the user sends a message (see CopilotContext.sendMessage). Content is
 * drawn from Saeed's INFO so it reads plausibly without a real backend.
 */
export const MOCK_REPLIES: string[] = [
  "Saeed Panahi is a Front-end Developer with 7+ years of experience, currently building at Balinex. He specializes in crafting clean, performant UIs with React, Next.js, Vue and TypeScript.",
  "His core stack is JavaScript & TypeScript with React/Next.js and Vue/Nuxt. On the styling side he reaches for Tailwind, Sass and CSS3, and he tests with Jest, Vitest and React Testing Library.",
  "Saeed works full-stack when needed — NestJS, C#, MongoDB, Redis, RabbitMQ and Socket.io all show up in his projects, alongside Docker, Webpack and Vite for tooling.",
  "Want to reach Saeed? Email him at panahi.projects@gmail.com, connect on LinkedIn (linkedin.com/in/saeed-panahi-developer92), or check out his code on GitHub (github.com/panahi-projects).",
  "Saeed currently works as a front-end developer at Balinex, where he builds and maintains production interfaces used by real customers.",
  "State management? Saeed is comfortable with both Zustand and Redux, and picks whichever fits the project's complexity rather than reaching for the heaviest tool by default.",
  "He cares a lot about developer experience and code quality — strict TypeScript, component-driven architecture, and a solid testing setup are non-negotiables in his projects.",
  "Saeed has shipped a range of projects across frontend and full-stack — from polished marketing sites to data-heavy dashboards — always with an eye on accessibility and responsiveness.",
  "For UI libraries he's worked with MUI, Vuetify and Bootstrap, but he's just as happy building a bespoke design system from scratch with Tailwind.",
  "The best way to support Saeed is to connect on LinkedIn, share his work, or reach out about collaborations and opportunities — he's always open to a good conversation.",
];
