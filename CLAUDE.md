@AGENTS.md

# CLAUDE.md — agent guide

VS Code-themed portfolio for **Saeed Panahi**. Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4 (CSS-first) · next-intl v4 · framer-motion · Jest. See `README.md` for the human-facing overview and `PROGRESS.md` for the full build history.

> ⚠️ This is Next.js **16** with breaking changes (see AGENTS.md). Read `node_modules/next/dist/docs/` before using an unfamiliar API.

## Architecture map

- **Routes** live only under `src/app/[locale]/`. `layout.tsx` there owns `<html>`/`<body>` and the provider stack (NextIntl → Theme → Settings → Tabs → Copilot → AppShell). There is **no** `src/app/layout.tsx`.
- **Chrome** is in `src/features/layout/components/` (TitleBar, MenuBar, ActivityBar, SidebarPanel, TabsBar, StatusBar, MobileNav, CopilotPane). `AppShell.tsx` composes desktop + mobile chrome around `children`.
- **Pages** are thin server components that call a service and render a feature `*View` (also a server component). Interactive bits are client islands.
- **Data** flows one way: `services/api/<page>.service.ts` → typed `*Data` → `*View` props. Mocks live in `services/api/mock/`.
- **State**: `ThemeContext` (persisted theme), `SettingsContext` (transient open/close), `TabsContext` (URL = source of truth), `CopilotContext` (open + messages, persisted). Each has a `use*` hook that throws outside its provider.

## Conventions

- **Server vs client**: pages + `*View` = `async` server components using `getTranslations`. Anything with state, effects, events, or framer-motion = `"use client"` and uses `useTranslations`.
- **Feature layout**: `features/<feature>/{components,context,hooks,constants,types}`; components in `<Component>/<Component>.tsx` + `index.ts` barrel.
- **Styling**: prefer Tailwind utilities backed by theme tokens (`bg-titlebar`, `text-editor-fg`). Otherwise inline `style={{ background: "var(--color-…)" }}`. **Logical CSS only** — `start`/`end`, `ms-*`/`me-*`, `ps-*`/`pe-*`, `borderInlineStart`; never `left`/`right`/`ml-*`. For framer-motion `x` slides use `useDirection()` (transforms are physical and don't flip under RTL).
- **i18n**: every visible string via `t()`; namespaces = `common` (chrome) or page name; both `en/` and `fa/` must mirror. Page **content** (bios, skills, etc.) stays in the English mock layer by design.
- **Commits**: Conventional Commits, one per phase, with the `Co-Authored-By` trailer.

## Checklists

**Add a page** — `PAGES` entry (`pages.ts`) → `nav.<key>` in both locales → `app/[locale]/<page>/page.tsx` (fetch + render view) → `features/<page>/types` + `*View` + `services/api/<page>.{service,mock}.ts`.

**Add a theme** — `src/styles/themes/<id>.css` (`[data-theme="<id>"]` tokens) → `@import` in `globals.css` → entry in `THEMES` (`themes.ts`). No `tailwind.config.ts`.

**Add a Copilot mock reply** — append to `CopilotPane/constants/mockReplies.ts`.

**Wire a real API** — replace the body of the relevant `get<Page>Data()` (keep the return type); UI is unaffected.

## Gotchas

- Middleware is **`src/proxy.ts`** (Next 16 rename), not `middleware.ts`.
- `params` is a `Promise` — always `await` it. `PageProps<...>` / `LayoutProps<...>` are **global** helpers; don't import them.
- Tailwind v4 has **no JS config**; theme tokens are CSS `@theme inline`.
- 6 themes (default-dark, rose-pine, tokyo-night, catppuccin, nord, gruvbox); default = `default-dark`.
- `TabsContext` derives the active tab from `usePathname()` — sidebar `<Link>`s need no extra `openTab()` call.

## Testing

`npm test`. Use `renderWithProviders` from `src/test-utils/render.tsx`. `jest.config.ts` transforms ESM-only `next-intl`/`use-intl`; `jest.setup.ts` mocks `@/i18n/navigation`, `scrollIntoView`, and `IntersectionObserver`/`ResizeObserver`. Server `*View`s are tested by awaiting them with `next-intl/server` mocked via `test-utils/intl.ts`.

## Verify each change

`npx next build` (strict TS + prerenders all 10 locale routes) and `npm test` must stay green. `npm run lint` should not regress.
