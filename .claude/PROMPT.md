# 🧠 AI Prompt: VSCode-Themed Developer Portfolio

> **Role**: You are a **senior full-stack developer** with deep expertise in Next.js, TypeScript, TailwindCSS, i18n, component architecture, and test-driven development. You are also an exceptional UI engineer who can faithfully replicate design systems.

---

## 📋 Project Overview

Build a **personal developer portfolio** that mimics the **Visual Studio Code UI/UX** experience. The portfolio must showcase bio, skills, experiences, and contact information. The project skeleton (raw Next.js app) already exists — your job is to **implement the UI, features, architecture, and tests**.

### Tech Stack

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Framework | Next.js 14+ (App Router)                |
| Language  | TypeScript (strict mode)                |
| Styling   | TailwindCSS + CSS Variables             |
| Icons     | `react-icons`                           |
| i18n      | `next-intl`                             |
| Testing   | Jest + React Testing Library            |
| State     | React Context API / Zustand (for theme) |

---

## 🗂️ Architecture: Feature-Based Pattern

Organize the codebase using a **feature-based folder structure**. Every feature must be self-contained with its own components, hooks, types, tests, and (mock) API layer.

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx               # Root layout with locale
│   │   ├── page.tsx                 # Home
│   │   ├── about/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── experience/page.tsx
│   │   └── contact/page.tsx
├── features/
│   ├── layout/
│   │   ├── components/
│   │   │   ├── TitleBar/
│   │   │   ├── MenuBar/
│   │   │   ├── ActivityBar/         # Left icon sidebar
│   │   │   ├── SidebarPanel/        # File/dir explorer
│   │   │   ├── TabsBar/             # Opened tabs with (×)
│   │   │   ├── StatusBar/           # Bottom VSCode status bar
│   │   │   ├── CopilotPane/         # Copilot trigger button
│   │   │   ├── GitStatus/           # Branch indicator
│   │   │   └── MobileNav/           # Hamburger + floating menu
│   │   ├── hooks/
│   │   ├── types/
│   │   └── __tests__/
│   ├── theme/
│   │   ├── components/
│   │   │   ├── SettingsPanel/       # Theme switcher panel (desktop + mobile)
│   │   │   └── ThemePreview/
│   │   ├── context/
│   │   │   └── ThemeContext.tsx
│   │   ├── constants/
│   │   │   └── themes.ts            # 5 VSCode-like theme definitions
│   │   ├── hooks/
│   │   │   └── useTheme.ts
│   │   └── __tests__/
│   ├── home/
│   ├── about/
│   ├── skills/
│   ├── experience/
│   └── contact/
├── shared/
│   ├── components/
│   │   ├── Icon/
│   │   ├── Button/
│   │   ├── Badge/
│   │   └── Spinner/
│   ├── hooks/
│   │   ├── useBreakpoint.ts
│   │   └── useTabs.ts
│   └── types/
├── services/
│   └── api/
│       ├── mock/                    # All mock data lives here
│       │   ├── home.mock.ts
│       │   ├── about.mock.ts
│       │   ├── skills.mock.ts
│       │   ├── experience.mock.ts
│       │   └── contact.mock.ts
│       ├── home.service.ts          # Thin service layer — swap mock → real API here
│       ├── about.service.ts
│       ├── skills.service.ts
│       ├── experience.service.ts
│       └── contact.service.ts
├── i18n/
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── home.json
│   │   │   ├── about.json
│   │   │   ├── skills.json
│   │   │   ├── experience.json
│   │   │   └── contact.json
│   │   └── fa/
│   │       └── ... (mirrors en/)
│   └── config.ts
└── styles/
    ├── globals.css
    └── themes/
        ├── dark-plus.css
        ├── light-plus.css
        ├── monokai.css
        ├── solarized-dark.css
        └── github-dark.css
```

---

## 🖥️ Desktop Layout (VSCode Replica)

Implement **exactly** as described and visible in the provided screenshots. The layout is composed of the following zones:

### 1. Title Bar (top-most)

- macOS-style window controls (🔴🟡🟢 circles) on the left
- App name / current file title in center
- A functional **search box** (Command Palette style) in the center-right
- Window action buttons (minimize/maximize/close) on far right

### 2. Menu Bar

- Horizontal menu: `File`, `Edit`, `View`, `Go`, `Run`, `Terminal`, `Help`
- Each item is hoverable with a dropdown (can be minimal/decorative but must look real)

### 3. Activity Bar (far-left vertical icon strip)

- Large icons stacked vertically, each representing a section:
  - Explorer (files icon) → opens Sidebar file tree
  - Search icon
  - Git icon
  - Extensions icon
  - Settings/gear icon (opens Settings Panel)
- Active icon is highlighted with an accent color
- Bottom of activity bar: avatar or profile icon

### 4. Sidebar Panel (file/directory viewer)

- Positioned immediately to the right of the Activity Bar
- Shows a tree structure of the portfolio "files":
  ```
  📁 PORTFOLIO
    📄 home.tsx
    📄 about.tsx
    📄 skills.tsx
    📄 experience.tsx
    📄 contact.tsx
  ```
- Each file has an appropriate language icon (e.g., React/TSX icon from react-icons)
- Clicking a file opens it as a **tab** in the editor area
- **Below the file tree**: Copilot trigger button (animated, glowing)
- **Below Copilot**: Git branch indicator (e.g., `⎇ main  ✓`)

### 5. Tabs Bar (editor tabs)

- Shows open "files" as tabs at the top of the editor content area
- Each tab has: file icon + filename + `×` close button
- Active tab is highlighted
- Tabs are horizontally scrollable if many are open
- Closing all tabs shows a "welcome" empty state

### 6. Editor / Content Area

- This is where page content renders
- Has a subtle line-number gutter on the left (decorative, matching VSCode)
- Background uses the active theme's editor background color

### 7. Status Bar (bottom strip)

- Full-width, themed colored bar
- Left side: git branch, sync status, error/warning counts
- Right side: language (TypeScript), encoding (UTF-8), line/column info, language mode, notifications bell

---

### 8. Copilot Pane (right-side panel — desktop & mobile)

> 📸 Reference screenshots: `.claude/screenshots/copilot-desktop.png` (desktop), `.claude/screenshots/copilot-mobile.png` (mobile)

The Copilot Pane is a **togglable secondary panel** that slides in from the right side of the editor area when triggered.

#### Trigger

- **Desktop**: The **Copilot trigger button** located at the bottom of the Sidebar Panel (below the file tree) opens/closes the pane. The button should be visually distinct — e.g., the GitHub Copilot icon with an animated glow or pulse effect when the pane is closed, and a highlighted/active state when open.
- **Mobile**: A dedicated **Copilot icon button** in the top bar (or within the floating mobile menu) toggles the pane. On mobile it appears as a **bottom sheet** or **full-screen overlay** rather than a side panel.

#### Desktop Behavior

- The pane slides in from the **right side** of the editor content area (not over the Activity Bar or Sidebar — only the editor zone shrinks)
- The editor content area and Copilot Pane share the horizontal space via a **resizable split** — default split: ~65% editor / 35% Copilot
- The pane has its own header bar with: the Copilot icon + "GitHub Copilot" title + a `×` close button
- The pane state (open/closed) is **persisted in localStorage**

#### Mobile Behavior

- Opens as a **slide-up bottom sheet** (from bottom of screen) or a **full-screen overlay** — reference `.claude/screenshots/copilot-mobile.png` for exact treatment
- Has a drag handle at the top for dismissal
- Dismissable by swiping down or tapping the backdrop

#### Copilot Pane Content (UI)

The pane simulates a Copilot chat interface — it is **decorative/demo only** but must look authentic:

- A **chat history area** showing a welcome message and optionally a few pre-populated mock exchanges (e.g., "Tell me about this developer's skills" → a short AI-style response)
- A **message input field** at the bottom with a send button (icon)
- On submit, the input clears and a **mock AI response** is appended (a hardcoded or randomly selected response from a small pool of mock replies — no real API call needed)
- The chat area is **scrollable** and auto-scrolls to the latest message

#### Component Structure

```
features/layout/components/CopilotPane/
├── CopilotPane.tsx           # Main panel shell (header + body + input)
├── CopilotPaneTrigger.tsx    # The glowing trigger button in Sidebar
├── CopilotChatMessage.tsx    # Individual message bubble (user / assistant)
├── CopilotChatInput.tsx      # Input field + send button
├── hooks/
│   └── useCopilotPane.ts     # open/close state, localStorage persistence, mock reply logic
├── constants/
│   └── mockReplies.ts        # Pool of mock AI responses
└── __tests__/
    ├── CopilotPane.test.tsx
    ├── CopilotPaneTrigger.test.tsx
    └── useCopilotPane.test.ts
```

#### State & Types

```typescript
// features/layout/components/CopilotPane/hooks/useCopilotPane.ts
interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UseCopilotPaneReturn {
  isOpen: boolean;
  messages: CopilotMessage[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  sendMessage: (content: string) => void;
}
```

#### CSS Variables to Add for Copilot Pane

Add these to each theme definition:

```css
--color-copilot-bg          /* pane background */
--color-copilot-header-bg   /* header strip */
--color-copilot-border      /* left border of pane */
--color-copilot-input-bg    /* chat input background */
--color-copilot-user-bubble /* user message bubble */
--color-copilot-ai-bubble   /* assistant message bubble */
--color-copilot-accent      /* send button, active states */
```

#### i18n Keys to Add

```json
"copilot": {
  "title": "GitHub Copilot",
  "placeholder": "Ask Copilot anything...",
  "welcome": "Hi! I'm Copilot. Ask me anything about this developer.",
  "send": "Send",
  "close": "Close Copilot"
}
```

#### Testing Checklist for Copilot Pane

- [ ] Pane opens when trigger button is clicked
- [ ] Pane closes when `×` is clicked
- [ ] Pane state persists across page refresh (localStorage)
- [ ] Sending a message appends it to the chat with `role: 'user'`
- [ ] A mock assistant reply is appended after a short delay
- [ ] Chat area auto-scrolls to the latest message
- [ ] On mobile: pane opens as bottom sheet, dismissable by swipe/backdrop tap
- [ ] On desktop: editor area resizes correctly when pane opens/closes

---

## 📱 Mobile Layout

The mobile experience is different — no side panels. Instead:

- **Full-screen content** view
- **Floating hamburger button** (bottom-right or top-right) opens a **slide-in/overlay navigation menu**
- The mobile menu (see `.claude/screenshots/menu-mobile.png`) shows page links with icons, theme switcher shortcut, and language toggle
- A **simplified top bar** with the app name and icons for settings and language
- No Activity Bar or Sidebar — those are desktop-only

---

## 🎨 Themes

Implement **5 VSCode-inspired themes**. Each theme must define the following CSS custom properties:

```css
--color-titlebar-bg
--color-menubar-bg
--color-activitybar-bg
--color-activitybar-icon
--color-activitybar-active
--color-sidebar-bg
--color-sidebar-text
--color-sidebar-hover
--color-editor-bg
--color-editor-text
--color-editor-line-highlight
--color-tabs-bg
--color-tab-active-bg
--color-tab-active-border
--color-statusbar-bg
--color-statusbar-text
--color-accent
--color-accent-hover
--color-border
--color-scrollbar
```

### The 5 Themes (approximate — match the screenshots):

| #   | Name                   | Style                          |
| --- | ---------------------- | ------------------------------ |
| 1   | Dark+ (Default Dark)   | Classic VSCode dark            |
| 2   | Light+ (Default Light) | Classic VSCode light           |
| 3   | Monokai                | Dark with vibrant greens/pinks |
| 4   | Solarized Dark         | Warm dark with teal accent     |
| 5   | GitHub Dark            | GitHub-inspired dark UI        |

Theme is persisted in `localStorage` and applied via a `data-theme` attribute on `<html>`.

### Settings Panel

- Accessible via the gear icon in Activity Bar (desktop) and settings icon (mobile)
- Shows all 5 themes as **clickable preview cards** with a color swatch preview
- Currently active theme is highlighted
- The panel slides in from the right (desktop) or from the bottom (mobile)

---

## 🌐 Internationalization (i18n)

Use **`next-intl`** for full Farsi (fa) and English (en) support.

- Default locale: **`en`**
- Routes: `/en/...` and `/fa/...`
- All visible UI text must be translation keys — **zero hardcoded strings** in components
- RTL support: when `fa` locale is active, set `dir="rtl"` on `<html>` and mirror the layout (Activity Bar moves to right, sidebar follows, etc.)
- Language toggle is available in: Activity Bar bottom area (desktop), mobile menu, settings panel

### Translation Key Structure (example for `en/common.json`):

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "skills": "Skills",
    "experience": "Experience",
    "contact": "Contact"
  },
  "tabs": {
    "close": "Close"
  },
  "statusbar": {
    "branch": "main",
    "language": "TypeScript",
    "encoding": "UTF-8"
  },
  "settings": {
    "title": "Settings",
    "theme": "Color Theme",
    "language": "Language"
  }
}
```

---

## 📄 Pages & Content

### API Service Pattern

Every page fetches its data through a **service layer**. The service returns a typed response. At this stage the service calls a **mock** — in production it will call a real API.

```typescript
// services/api/about.service.ts
import { getAboutMock } from "./mock/about.mock";
import type { AboutData } from "@/features/about/types";

export async function getAboutData(): Promise<AboutData> {
  // TODO: Replace with real API call
  // return await fetch('/api/about').then(r => r.json());
  return getAboutMock();
}
```

This pattern must be followed consistently for **all 5 pages**.

---

### Page 1: Home (`home.tsx`)

- Hero section with name, title/role (e.g., "Full-Stack Developer"), and a short tagline
- Animated typing effect for the role title
- CTA buttons: "View My Work" → opens Experience, "Contact Me" → opens Contact
- A decorative code block background element (showing a snippet of TypeScript code) as visual flair

**Mock data fields**: `name`, `title`, `tagline`, `ctaButtons[]`, `socialLinks[]`

---

### Page 2: About (`about.tsx`)

- Profile photo (avatar/placeholder)
- Short bio paragraph(s)
- Location, availability status (e.g., "Open to work")
- List of personal interests / hobbies with icons
- A "Download CV" button

**Mock data fields**: `name`, `bio`, `location`, `availabilityStatus`, `interests[]`, `cvUrl`

---

### Page 3: Skills (`skills.tsx`)

- Skills grouped by category (e.g., Frontend, Backend, DevOps, Tools)
- Each skill has: icon, name, proficiency level (1–5 or percentage)
- Animated progress bars or skill badges
- Visual grouping per category with a category header

**Mock data fields**: `categories[{ name, skills[{ name, icon, proficiency }] }]`

---

### Page 4: Experience (`experience.tsx`)

- Timeline layout (vertical)
- Each item: company name, role title, date range, location, bullet-point achievements
- Company logo placeholder or icon
- "Present" indicator for current role

**Mock data fields**: `experiences[{ company, role, startDate, endDate, location, achievements[], current }]`

---

### Page 5: Contact (`contact.tsx`)

- Contact form: Name, Email, Subject, Message fields + Submit button
- Form validation (client-side) with inline error messages
- Social links: GitHub, LinkedIn, Twitter/X, Email
- A "mock send" function that shows a success toast on submit
- Location / timezone info

**Mock data fields**: `email`, `socialLinks[]`, `location`, `timezone`

---

## 🧪 Testing

Add unit tests for **every component and feature**. Use **Jest + React Testing Library**.

### Testing rules:

1. Each component folder must have a `__tests__/ComponentName.test.tsx` file
2. Each service must have a `__tests__/service.test.ts` file
3. Each hook must have a `__tests__/useHookName.test.ts` file

### What to test per component:

- Renders without crashing
- Renders correct children/props
- User interactions (clicks, inputs) trigger correct behavior
- Theme context changes update className/styles
- i18n: Correct text renders per locale
- API services: mock returns correct typed data, shape is valid

### Example test structure:

```typescript
// features/layout/components/TabsBar/__tests__/TabsBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TabsBar } from '../TabsBar';

describe('TabsBar', () => {
  it('renders tab with filename', () => { ... });
  it('calls onClose when × is clicked', () => { ... });
  it('highlights active tab', () => { ... });
  it('is scrollable with many tabs', () => { ... });
});
```

---

## 🧱 SOLID Principles — Implementation Guide

| Principle                     | How to Apply                                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **S** — Single Responsibility | Each component does ONE thing. `TabsBar` only manages tabs. `StatusBar` only shows status. Never mix layout logic with data fetching.      |
| **O** — Open/Closed           | Theme system uses CSS variables — adding a new theme requires only a new CSS file, no component changes.                                   |
| **L** — Liskov Substitution   | All page components implement a consistent `PageProps` interface. Service functions follow a consistent `getData(): Promise<T>` signature. |
| **I** — Interface Segregation | Split large interfaces. `SidebarProps` doesn't include `StatusBarProps`. Each feature's types are local to that feature.                   |
| **D** — Dependency Inversion  | Components depend on service interfaces, not concrete implementations. Hooks abstract data fetching from components.                       |

---

## 🗃️ Mock Data

All mock data must be placed in `services/api/mock/`. It must be **realistic, detailed, and use placeholder content from the `INFO.md` file** (the developer's actual bio).

Structure each mock as a typed constant:

```typescript
// services/api/mock/skills.mock.ts
import type { SkillsData } from "@/features/skills/types";

export const getSkillsMock = (): SkillsData => ({
  categories: [
    {
      name: "Frontend",
      skills: [
        { name: "React", icon: "SiReact", proficiency: 5 },
        { name: "Next.js", icon: "SiNextdotjs", proficiency: 5 },
        { name: "TypeScript", icon: "SiTypescript", proficiency: 4 },
        { name: "TailwindCSS", icon: "SiTailwindcss", proficiency: 5 },
        // ...
      ],
    },
    // ...
  ],
});
```

---

## 📦 Dependencies to Install

```bash
# Core
npm install next-intl

# Icons
npm install react-icons

# Animation
npm install framer-motion

# Form handling
npm install react-hook-form zod @hookform/resolvers

# Testing
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest

# Optional: lightweight state
npm install zustand
```

---

## 📝 Deliverables

### 1. Full Implementation

All source code as described above, fully functional, with:

- Desktop + mobile responsive layouts
- 5 switchable themes
- EN/FA i18n with RTL support
- 5 pages with mock API data
- VSCode-faithful UI components

### 2. `README.md`

Write a thorough `README.md` covering:

- Project overview and purpose
- Tech stack with rationale
- Architecture decisions (feature-based, SOLID, service layer)
- Getting started (clone, install, run, test)
- Environment variables (even if empty for now)
- How to add a new page
- How to add a new theme
- How to swap mock API with real API
- How to add a new language
- Folder structure diagram
- Screenshots section (link to `.claude/screenshots/`)
- Deployment notes

### 3. `CLAUDE.md`

Write a `CLAUDE.md` file for future AI agents working on this codebase. It must include:

- Full architecture map (what lives where and why)
- Naming conventions (files, components, hooks, types, tests)
- How the theme system works (CSS vars, context, localStorage)
- How i18n is structured (locale routing, translation files, RTL)
- How the API service layer works (mock → real migration path)
- How to add features (step-by-step checklist)
- How to add/modify tests
- Known limitations and future TODOs
- What "done" looks like for each phase of the project
- Any gotchas or non-obvious decisions made

---

## ✅ Completion Checklist

Before considering the implementation done, verify:

- [ ] All 5 pages render with mock data
- [ ] Desktop layout matches VSCode screenshots faithfully
- [ ] Mobile layout works with floating hamburger menu
- [ ] All 5 themes apply correctly via CSS variables
- [ ] Settings panel opens/closes correctly on both desktop and mobile
- [ ] Tab system works: open, close, switch tabs
- [ ] i18n: EN and FA both work, RTL flips layout correctly
- [ ] Language persists on refresh (localStorage)
- [ ] Theme persists on refresh (localStorage)
- [ ] Copilot Pane opens/closes from the sidebar trigger button (desktop)
- [ ] Copilot Pane opens as a bottom sheet on mobile
- [ ] Copilot Pane state persists in localStorage
- [ ] Mock chat interaction works (send message → receive reply)
- [ ] All components have at least basic unit tests
- [ ] All service mocks are typed and match their interfaces
- [ ] No hardcoded strings — all text goes through i18n
- [ ] No ESLint errors, no TypeScript errors in strict mode
- [ ] `README.md` and `CLAUDE.md` are complete

---

> 💡 **Implementation Note**: Start with the layout shell (TitleBar → MenuBar → ActivityBar → Sidebar → TabsBar → StatusBar), then add the theme system, then i18n wiring, then implement pages one by one. Keep the mock service layer in place from day one so pages always have data to render.

---

## 🔀 Git Commit Strategy

**After completing each phase or meaningful step, commit the changes immediately** with a clear, conventional commit message. Do not batch multiple phases into a single commit. Every commit must represent a self-contained, working (or at minimum non-breaking) state of the codebase.

### Commit Message Format

Follow the **Conventional Commits** specification:

```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

**Types**: `feat`, `fix`, `style`, `refactor`, `test`, `chore`, `docs`

---

### Commit Schedule — Phase by Phase

| Phase | What to commit                                                                                                                    | Suggested commit message                                                                                        |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 1     | Project config: tsconfig, ESLint, Prettier, TailwindCSS setup, folder scaffolding                                                 | `chore(setup): initialize project structure, config files, and folder scaffold`                                 |
| 2     | i18n config: `next-intl` setup, locale routing, EN + FA translation files (empty/stub keys)                                       | `feat(i18n): configure next-intl with EN/FA locales and locale-based routing`                                   |
| 3     | Theme system: CSS variables for all 5 themes, `ThemeContext`, `useTheme` hook, `data-theme` on `<html>`, localStorage persistence | `feat(theme): implement 5 VSCode-inspired themes with CSS variables and ThemeContext`                           |
| 4     | Layout shell — desktop: `TitleBar`, `MenuBar`, `ActivityBar`, `SidebarPanel`, `TabsBar`, `StatusBar` (static/empty, no data)      | `feat(layout): build desktop VSCode layout shell — TitleBar, MenuBar, ActivityBar, Sidebar, TabsBar, StatusBar` |
| 5     | Layout shell — mobile: `MobileNav`, hamburger button, floating slide-in menu                                                      | `feat(layout): add mobile navigation with hamburger button and slide-in overlay menu`                           |
| 6     | Tab system: open/close/switch tabs via `useTabs` hook, integrate with Sidebar file clicks                                         | `feat(tabs): implement tab open/close/switch system connected to sidebar file navigation`                       |
| 7     | Git status indicator and Copilot trigger button in Sidebar                                                                        | `feat(sidebar): add git branch status indicator and Copilot trigger button`                                     |
| 8     | Copilot Pane — desktop: slide-in right panel, mock chat UI, `useCopilotPane` hook, localStorage persistence                       | `feat(copilot): implement desktop Copilot Pane with mock chat interface and panel state persistence`            |
| 9     | Copilot Pane — mobile: bottom sheet variant, swipe-to-dismiss                                                                     | `feat(copilot): add mobile bottom-sheet variant of Copilot Pane with swipe dismiss`                             |
| 10    | Settings Panel — desktop + mobile: theme switcher UI, language toggle                                                             | `feat(settings): build Settings Panel with theme switcher and language toggle for desktop and mobile`           |
| 11    | Mock API service layer: all 5 service files + mock data files, fully typed                                                        | `feat(api): scaffold mock API service layer for all 5 pages with typed mock data`                               |
| 12    | Home page: component, data hook, content from mock, typing animation                                                              | `feat(home): implement Home page with hero section, typing animation, and mock data`                            |
| 13    | About page: component, data hook, content from mock                                                                               | `feat(about): implement About page with bio, interests, availability status, and CV download`                   |
| 14    | Skills page: component, data hook, categories, animated progress bars                                                             | `feat(skills): implement Skills page with categorized skills and animated proficiency bars`                     |
| 15    | Experience page: component, data hook, timeline layout                                                                            | `feat(experience): implement Experience page with vertical timeline and mock job history`                       |
| 16    | Contact page: component, form with validation, mock send, social links                                                            | `feat(contact): implement Contact page with validated form, mock submission, and social links`                  |
| 17    | Fill all translation keys (EN + FA) across all namespaces                                                                         | `feat(i18n): complete EN and FA translation keys for all pages and UI components`                               |
| 18    | RTL layout support when FA locale is active                                                                                       | `feat(i18n): add RTL layout mirroring for Farsi locale`                                                         |
| 19    | Unit tests — layout components                                                                                                    | `test(layout): add unit tests for TitleBar, MenuBar, ActivityBar, SidebarPanel, TabsBar, StatusBar`             |
| 20    | Unit tests — theme + settings                                                                                                     | `test(theme): add unit tests for ThemeContext, useTheme, and SettingsPanel`                                     |
| 21    | Unit tests — Copilot Pane                                                                                                         | `test(copilot): add unit tests for CopilotPane, CopilotPaneTrigger, and useCopilotPane`                         |
| 22    | Unit tests — pages and services                                                                                                   | `test(pages): add unit tests for all page components and mock API services`                                     |
| 23    | `README.md`                                                                                                                       | `docs: write README with setup guide, architecture overview, and contribution notes`                            |
| 24    | `CLAUDE.md`                                                                                                                       | `docs: write CLAUDE.md with full architecture map, conventions, and future development guide`                   |
| 25    | Final polish: fix any ESLint/TypeScript errors, responsive tweaks, visual QA                                                      | `fix(polish): resolve lint errors, type issues, and apply final responsive/visual adjustments`                  |

---

### Commit Rules

- **Never** commit broken code that prevents the app from building or running
- **Never** bundle more than one phase into a single commit unless the changes are truly inseparable
- Each commit must leave the app in a **runnable state** (even if some pages are still stubs)
- Use the **imperative mood** in commit messages: "add", "implement", "fix" — not "added", "implemented", "fixed"
- If a step is large, split it into logical sub-commits (e.g., Phase 4 could be split into one commit per layout component)
- After the final commit of each major feature group (layout, theme, pages, tests), optionally tag it:
  ```bash
  git tag -a v0.1-layout -m "Complete VSCode layout shell"
  git tag -a v0.2-theme  -m "Complete theme system"
  git tag -a v0.3-pages  -m "All 5 pages implemented with mock data"
  git tag -a v0.4-tests  -m "Full test coverage added"
  git tag -a v1.0        -m "Initial complete release"
  ```
