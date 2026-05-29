# Portfolio — Build Progress

VS Code-themed personal portfolio for **Saeed Panahi**, built phase-by-phase per [`.claude/PROMPT.md`](.claude/PROMPT.md). Each phase ships as its own conventional commit so any partial branch is shippable.

**Current state:** Phases 1-11 done + UI alignment pass. `npx next build` is green (10 prerendered routes = 5 pages × 2 locales). On branch `main`.

**Next up:** Phase 12 — Home page.

---

## Stack

- **Next.js** 16.2.6 (App Router, Turbopack)
- **React** 19.2.4
- **TypeScript** strict
- **TailwindCSS** v4 (CSS-first — no `tailwind.config.ts`)
- **next-intl** v4
- **framer-motion** for animations
- **react-hook-form** + **zod** for forms (used from Phase 16)
- **zustand** available (not used yet)
- **Jest** + **React Testing Library** + `@testing-library/jest-dom` (configured, tests start Phase 19)

---

## Repo layout

```
src/
├── app/[locale]/                       # ALL routes live under [locale]
│   ├── layout.tsx                      # Root (html/body, all providers)
│   ├── page.tsx                        # / (placeholder; real home = Phase 12)
│   ├── about/page.tsx                  # Phase 13
│   ├── skills/page.tsx                 # Phase 14
│   ├── experience/page.tsx             # Phase 15
│   └── contact/page.tsx                # Phase 16
├── proxy.ts                            # next-intl middleware (renamed from middleware.ts in Next 16)
├── features/
│   ├── layout/
│   │   ├── components/
│   │   │   ├── AppShell.tsx            # composes desktop + mobile chrome
│   │   │   ├── TitleBar/               # macOS dots + centered search
│   │   │   ├── MenuBar/                # File/Edit/View/Go/Run/Terminal/Help/Copilot
│   │   │   ├── ActivityBar/            # Files/Search/Git/CloudDownload/Sparkle + Settings
│   │   │   ├── SidebarPanel/           # File tree + Copilot trigger + GitStatus
│   │   │   ├── TabsBar/                # Dynamic tabs + breadcrumb strip
│   │   │   ├── StatusBar/              # Errors/branch left; theme+clock right
│   │   │   ├── MobileNav/              # Top bar + slide-in drawer
│   │   │   ├── CopilotPane/            # Phase 8 will add the pane itself
│   │   │   │   ├── CopilotPaneTrigger.tsx       # animated glowing button
│   │   │   │   ├── hooks/useCopilotPane.ts
│   │   │   │   └── index.ts
│   │   │   └── GitStatus/              # Branch + ahead/sparkles counts
│   │   ├── constants/pages.ts          # PAGES, DECORATIVE_FILES, findPageByPath
│   │   └── context/
│   │       ├── TabsContext.tsx         # URL is source of truth for active tab
│   │       └── CopilotContext.tsx      # isOpen + actions; Phase 8 adds messages
│   └── theme/
│       ├── components/ThemeInitScript.tsx       # inline <head> script — pre-hydration
│       ├── constants/themes.ts                  # THEMES, DEFAULT_THEME, isThemeId
│       ├── context/ThemeContext.tsx
│       └── hooks/useTheme.ts
├── shared/hooks/useTabs.ts             # public hook over TabsContext
├── services/api/mock/                  # EMPTY — Phase 11 populates
├── i18n/
│   ├── routing.ts                      # defineRouting + isRtl()
│   ├── request.ts                      # getRequestConfig merges 6 namespaces
│   ├── navigation.ts                   # localized Link/router/redirect
│   └── locales/{en,fa}/{common,home,about,skills,experience,contact}.json
└── styles/
    ├── globals.css                     # @imports themes + @theme inline exposes tokens
    └── themes/                         # default-dark / rose-pine / tokyo-night
                                        # / catppuccin / nord / gruvbox
```

---

## Architectural decisions worth remembering

1. **`[locale]` is the only root layout.** There's no `src/app/layout.tsx`. `src/app/[locale]/layout.tsx` owns `<html>`/`<body>`. The proxy redirects `/` → `/en`.

2. **TailwindCSS v4 is CSS-first.** All theme tokens live in `src/styles/themes/<id>.css` scoped under `[data-theme="<id>"]`. `globals.css` re-exports them via `@theme inline { … }` so `bg-titlebar`, `text-editor-fg`, etc. work as Tailwind utilities. **Do not add `tailwind.config.ts`.**

3. **Theme switching = `data-theme` attribute.** `ThemeProvider` syncs `document.documentElement.dataset.theme` + `localStorage`. `ThemeInitScript` is an inline `<head>` script that runs **before hydration** to apply the persisted theme without a flash. SSR sets `data-theme={DEFAULT_THEME}` so JS-disabled users still get a valid theme.

4. **6 themes, not the 5 from PROMPT.md.** The user asked for screenshot fidelity. The PROMPT table listed 5 generic VS Code palettes (Dark+/Light+/Monokai/Solarized/GitHub); the Settings panel screenshot shows 6 trendy themes: **Default Dark** (was "Aahana Dark" in references — renamed for portfolio neutrality), **Rosé Pine**, **Tokyo Night**, **Catppuccin (Mocha)**, **Nord**, **Gruvbox**. Default = `default-dark`.

5. **URL is the source of truth for the active tab.** `TabsContext` watches `usePathname()`; URL changes (sidebar `<Link>`, mobile nav, browser back, deep link) auto-sync the active tab and add it to `openTabs` if missing. Sidebar therefore needs no separate `openTab()` call.

6. **Decorative sidebar files** (`projects.js`, `README.md`, `Saeed_Panahi_Resume.pdf`) live in `DECORATIVE_FILES` — non-routable rows for screenshot fidelity.

7. **RTL via logical CSS properties.** Chrome uses `start`/`end`, `borderInlineStart`/`borderInlineEnd`, `ms-*`/`me-*`, `ps-*`/`pe-*`. Activity-bar stripe, sidebar accent stripe, mobile drawer slide direction all flip automatically for FA.

8. **Mobile drawer slides from start side** (left in LTR, right in RTL) per `menu-mobile.png` — not from the end side.

9. **Identity = Saeed Panahi.** Visual style follows screenshots (Aahana Bobade's portfolio); content comes from `INFO.md`. Theme names like "Aahana Dark" → renamed to neutral "Default Dark". Repo handle in chrome = `saeed-panahi`.

10. **Conventional Commits, one per phase.** Per PROMPT.md § Git Commit Strategy. Co-author trailer on every commit:
    ```
    Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
    ```

---

## Next.js 16 / next-intl v4 gotchas

- Middleware file is `proxy.ts`, **not** `middleware.ts`. The export name is `proxy` (default export OK). [Docs: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`]
- `params` is a `Promise<…>` — always `await` it.
- `PageProps<"/[locale]/about">` and `LayoutProps<"/[locale]">` are **global helpers** — don't import them.
- `next-intl` plugin path explicit: `createNextIntlPlugin('./src/i18n/request.ts')`.
- next-intl helpers: server uses `getTranslations` / `setRequestLocale`; client uses `useTranslations`. Both work.
- TailwindCSS v4 has no JS config. Themes live in CSS via `@theme inline`.

---

## ✅ Phases done

| # | Title | Commit | Notes |
|---|-------|--------|-------|
| 1 | Project setup + folder scaffolding | `chore(setup): initialize project structure, config files, and folder scaffold` | Deps installed, `src/` migration, `tsconfig` paths `@/* → ./src/*`, jest + prettier config, full folder skeleton |
| 2 | i18n config (next-intl v4) | `feat(i18n): configure next-intl with EN/FA locales and locale-based routing` | `routing.ts` / `request.ts` / `navigation.ts` / `proxy.ts`, 12 stub translation files, locale-aware `[locale]/layout.tsx` |
| 3 | Theme system | `feat(theme): implement 5 VSCode-inspired themes with CSS variables and ThemeContext` | Initially 5 generic themes; replaced in alignment pass with 6 trendy ones |
| 4 | Desktop layout shell | `feat(layout): build desktop VSCode layout shell — TitleBar, MenuBar, ActivityBar, Sidebar, TabsBar, StatusBar` | 6 chrome components + `AppShell.tsx` + `pages.ts` constants + stub routes |
| 5 | Mobile navigation | `feat(layout): add mobile navigation with hamburger button and slide-in overlay menu` | framer-motion drawer + responsive `md:` switching |
| 6 | Tab system | `feat(tabs): implement tab open/close/switch system connected to sidebar file navigation` | `TabsContext` (URL = source of truth), `useTabs` hook, dynamic `TabsBar` with welcome state |
| — | UI alignment with screenshots (out-of-band) | `style(ui): align chrome with reference screenshots (.claude/screenshots/*)` | Replaced 5 themes → 6 trendy themes; removed window action buttons; swapped Account+Extensions → CloudDownload+Sparkle; added decorative sidebar files + accent stripe; breadcrumb on its own strip; mobile drawer flipped to start side; added `app.{name,repo}` + `sidebar.explorer` + `copilot.*` i18n keys |
| 7 | Git status + Copilot trigger | `feat(sidebar): add git branch status indicator and Copilot trigger button` | `CopilotContext` (just `isOpen` for now), `useCopilotPane`, animated `CopilotPaneTrigger`, `GitStatus` component, mobile sparkle button now toggles Copilot |
| 8 | Copilot Pane (desktop) | `feat(copilot): implement desktop Copilot Pane with mock chat interface and panel state persistence` | `CopilotContext` extended with `messages`/`isThinking`/`sendMessage`/`clearMessages` + `portfolio-copilot-messages` persistence; `mockReplies.ts` (10 replies); `CopilotPane` (slide-in 35% panel, welcome + 6 suggestion chips, auto-scroll, thinking dots), `CopilotChatMessage`, `CopilotChatInput`; `AppShell` editor column split into `<main>` + pane (md:+); added `copilot.{clear,you,assistant,suggestions}` i18n keys (EN+FA) |
| 9 | Copilot Pane (mobile) | `feat(copilot): add mobile full-screen variant of Copilot Pane with swipe dismiss` | `CopilotPaneMobile` (approach b — `flex md:hidden` full-screen overlay rendered in `AppShell`); slides up + swipe-down-to-dismiss via `useDragControls` (header is the drag handle so list still scrolls), body-scroll lock; mirrors MobileNav top bar + identity row + workspace chip + disclaimer; reuses `CopilotChatMessage`/`CopilotChatInput`; added `copilot.{workspace,path,disclaimer}` i18n keys (EN+FA) |
| 10 | Settings panel | `feat(settings): build Settings Panel with theme switcher and language toggle for desktop and mobile` | `SettingsContext` + `useSettings` (transient open/close, not persisted); `SettingsPanel` renders both desktop dropdown (fixed top-start, under File menu) and mobile start-side drawer (breakpoint-gated, single component); shared sections — COLOR THEME rows (swatch+accent ring+✓), KEYBOARD SHORTCUTS, LANGUAGE toggle (next-intl `router.replace(pathname,{locale})`), footer; desktop-only QUICK ACTIONS (Copilot Chat→open, Download Resume→`/Saeed_Panahi_Resume.pdf`, Toggle Fullscreen, +placeholders); mobile-only Copilot pill + LINKS (FaGithub/FaLinkedin/FaMedium/SiLeetcode); Esc-to-close + body-scroll lock; wired ActivityBar gear (toggle) + MobileNav drawer gear (open); `SettingsProvider` added to layout; added `settings.{links,close,openCopilot,actions.*,shortcuts.*,footer.*}` i18n keys (EN+FA) |
| 11 | Mock API service layer | `feat(api): scaffold mock API service layer for all 5 pages with typed mock data` | Per-page types in `src/features/<page>/types/index.ts` (`HomeData`/`AboutData`/`SkillsData`/`ExperienceData`/`ContactData` + sub-interfaces); typed mocks in `src/services/api/mock/<page>.mock.ts` (content from `INFO.md`); async services `src/services/api/<page>.service.ts` exporting `get<Page>Data(): Promise<…>` with `// TODO: Replace with real API call`. Service path matches Phase 12's `services/api/home.service.ts` reference. Not yet wired to UI (pages consume them from Phase 12 on). |

---

## 🚧 Phases remaining

### Phase 12 — Home page
**References:** `.claude/screenshots/1-page-home.png`, `mobile-page (1).png`
**Suggested commit:** `feat(home): implement Home page with hero section, typing animation, and mock data`

- Green code-comment banner `// hello world !! Welcome to my portfolio`
- "Saeed" (white) + "Panahi" (theme-accent gradient — `bg-clip-text text-transparent bg-gradient-to-r`)
- Role chips: `● Frontend Developer / ● Full Stack / ● JS · TS · React / @ Balinex`
- Typing animation tagline. Custom hook `src/shared/hooks/useTypingEffect.ts` that cycles through phrases like `"Building intelligent UIs"`, `"Crafting clean code"`, etc.
- Intro paragraph with inline highlighted keywords (`<span style={{ color: "var(--color-accent)" }}>`)
- CTA buttons: Projects (filled, accent), About Me, Contact (outlined)
- Stats block: `7+ YEARS / 10+ PROJECTS / ∞ CURIOSITY / ↑ ALWAYS LEARNING` (4-col grid, dividers between)
- Social link row: GitHub, LinkedIn, Medium, Tableau, LeetCode, Instagram, Email, YouTube
- Wire to `services/api/home.service.ts`

### Phase 13 — About page
**Reference:** `.claude/screenshots/2-page-about.png`, `mobile-page (4).png`
- HTML-comment banner `<!-- about.html - Saeed Panahi -->`
- "About Me" + subtitle `// who I am · what I do · where I build`
- Bio card with inline highlighted keywords
- "CURRENT FOCUS" grid (4 items + emoji icons)
- "EDUCATION" section
- "Download CV" button

### Phase 14 — Skills page
**Reference:** `.claude/screenshots/3-page-skills.png`, `mobile-page (2).png`
- JSON-comment banner `// skills.json — tech stack & tools I actually use`
- Heading "Skills" + JSON subtitle `{ "status": "always_learning", "passion": "immeasurable" }`
- Categories with progress bars + percentages
- Animate bar fill on scroll into view (`framer-motion useInView`)

### Phase 15 — Experience page
**Reference:** `.claude/screenshots/4-page-experience.png`
- TS-comment banner `// experience.ts - professional journey`
- Heading + `interface Career extends Timeline {}` subtitle
- Vertical timeline (filled circle = current; ring = past)
- Each entry: date range, role, company, paragraph, tech stack chips

### Phase 16 — Contact page
**Reference:** `.claude/screenshots/5-page-contact.png`
- CSS-comment banner `/* contact.css — let's build something */`
- Heading + subtitle `// open to work, collabs & good conversations`
- **Left col — FIND ME ON**: Email / LinkedIn / GitHub / Medium / Tableau / LeetCode cards
- **Right col — SEND A MESSAGE**: form with `// YOUR_NAME *` / `// YOUR_EMAIL *` / `// SUBJECT` / `// MESSAGE *` field labels
- `react-hook-form` + `zod`; mock send + success toast
- Submit button styled `→ send_message()`

### Phase 17 — Fill all i18n keys
**Suggested commit:** `feat(i18n): complete EN and FA translation keys for all pages and UI components`
Sweep all `useTranslations` / `getTranslations` calls, ensure every key exists in both `en/` and `fa/` namespaces, no hardcoded strings.

### Phase 18 — RTL layout for FA
**Suggested commit:** `feat(i18n): add RTL layout mirroring for Farsi locale`
Most chrome already uses logical properties — audit the result. Likely fixes: any place I used `left/right` or `ml-*/mr-*` instead of `start/end`. Spot-check: activity bar, sidebar stripe, tab × position, mobile drawer slide direction, status bar reading order.

### Phase 19 — Layout component tests
**Suggested commit:** `test(layout): add unit tests for TitleBar, MenuBar, ActivityBar, SidebarPanel, TabsBar, StatusBar`

Per component:
- Renders without crashing
- Shows correct localized strings (wrap with `NextIntlClientProvider` + a small `messages` fixture)
- User interactions fire (sidebar click navigates, tab × closes, MenuBar dropdown opens)
- Theme changes reflect in `data-theme` / classes

Create `src/test-utils/render.tsx` that wraps providers (NextIntl + Theme + Tabs + Copilot) for tests.

### Phase 20 — Theme + settings tests
**Suggested commit:** `test(theme): add unit tests for ThemeContext, useTheme, and SettingsPanel`

- `ThemeContext`: setting a theme updates `document.documentElement.dataset.theme` + `localStorage`.
- `useTheme`: throws outside provider.
- `SettingsPanel`: clicking a theme row sets it; clicking language switches locale; checkmark on active theme.

### Phase 21 — Copilot pane tests
**Suggested commit:** `test(copilot): add unit tests for CopilotPane, CopilotPaneTrigger, and useCopilotPane`

- Trigger toggles pane; `aria-pressed` reflects state.
- Pane state + messages persist to localStorage and rehydrate.
- `sendMessage` appends user bubble + delayed assistant bubble.
- Chat area auto-scrolls (mock `scrollIntoView`).

### Phase 22 — Page + service tests
**Suggested commit:** `test(pages): add unit tests for all page components and mock API services`

- Each page renders with mock data.
- Each `get<Page>Data` returns a typed mock matching its interface.

### Phase 23 — README.md
**Suggested commit:** `docs: write README with setup guide, architecture overview, and contribution notes`

Sections: overview / tech stack rationale / architecture (feature-based, SOLID, service layer) / getting started / how to add a page / theme / language / how to swap mock → real API / folder structure / screenshots section linking `.claude/screenshots/` / deployment notes.

### Phase 24 — CLAUDE.md
**Suggested commit:** `docs: write CLAUDE.md with full architecture map, conventions, and future development guide`

Current `CLAUDE.md` is just `@AGENTS.md`. Replace it with a comprehensive AI agent guide: architecture map, naming conventions, theme/i18n/api guides, step-by-step checklists for adding features, all the gotchas in this PROGRESS.md.

### Phase 25 — Lint/type fixes + polish
**Suggested commit:** `fix(polish): resolve lint errors, type issues, and apply final responsive/visual adjustments`

- `npm run lint` — fix all errors.
- `npx next build` — strict TS errors.
- Visual QA across all 6 themes + breakpoints + RTL.
- Optional: `git tag` per PROMPT.md tag plan (`v0.1-layout`, `v0.2-theme`, `v0.3-pages`, `v0.4-tests`, `v1.0`).

---

## Conventions

### File structure per feature
```
features/<feature>/
├── components/<Component>/
│   ├── <Component>.tsx
│   └── index.ts                # barrel: re-exports
├── hooks/use<Name>.ts
├── context/<Name>Context.tsx   # only if state needs to be shared
├── constants/<name>.ts
├── types/index.ts
└── __tests__/                  # Phase 19+
```

### Components
- Chrome = client components (`"use client"`); pages default to server (`async function`).
- Theme tokens: prefer Tailwind utilities (`bg-titlebar`, `text-editor-fg`) when exposed via `@theme inline`. Otherwise inline `style={{ background: "var(--color-…)" }}`.
- Logical CSS only — `start`/`end`, `ms-*`/`me-*`, `ps-*`/`pe-*`, `borderInlineStart`. Don't use `left`/`right`.

### i18n
- All visible strings via `useTranslations(ns)` (client) or `getTranslations(ns)` (server).
- Namespace = page name (`home`, `about`, …) or `common` for shared chrome.
- 6 namespaces total: `common`, `home`, `about`, `skills`, `experience`, `contact`.
- Both `en/` and `fa/` must mirror.

### Commits
Conventional Commits. Trailer on every commit:
```
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

### Run commands
```
npx next dev          # dev (Turbopack)
npx next build        # prod build — use this to verify each phase
npm run lint          # ESLint
npm run format        # Prettier write
npm test              # Jest (from Phase 19)
```

---

## Reference screenshots

All in `.claude/screenshots/`:
- `1-6 page-*.png` — desktop pages (home, about, skills, experience, contact, readme)
- `copilot-desktop.png` / `copilot-mobile.png` — Copilot pane references
- `menu-desktop.png` (Command Palette) / `menu-mobile.png` (Explorer drawer)
- `mobile-page (1)-(4).png` — mobile views of home / skills / projects / about
- `settings-desktop.png` / `settings-mobile.png` — Settings panel
- `theme-1.png … theme-5.png` — 5 of the 6 themes (Catppuccin only appears in the Settings panel list)
