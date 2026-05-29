import "@testing-library/jest-dom";
import type { ReactNode } from "react";

// next/navigation has no real Next.js router in jsdom, so mock it with
// controllable stubs. usePathname defaults to "/" (overridable per test);
// useRouter returns a stable object so tests can assert on push/replace.
const __router = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};
jest.mock("next/navigation", () => ({
  __router,
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => __router),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

// next/link needs no router context for our tests; render a plain anchor.
jest.mock("next/link", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest.mock factories are hoisted; can't use module-scope imports
  const React = require("react");
  const Link = ({ href, children, ...rest }: { href: unknown; children: ReactNode }) =>
    React.createElement("a", { href: typeof href === "string" ? href : "#", ...rest }, children);
  Link.displayName = "MockLink";
  return { __esModule: true, default: Link };
});

// jsdom doesn't implement scrollIntoView; the Copilot panes call it on new messages.
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// jsdom lacks IntersectionObserver / ResizeObserver, which framer-motion's
// useInView (skill bars) and other observers rely on. Provide inert stubs.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", { writable: true, value: MockObserver });
Object.defineProperty(window, "ResizeObserver", { writable: true, value: MockObserver });
Object.defineProperty(globalThis, "IntersectionObserver", { writable: true, value: MockObserver });
Object.defineProperty(globalThis, "ResizeObserver", { writable: true, value: MockObserver });

beforeEach(() => {
  localStorage.clear();
  // ThemeProvider writes to <html data-theme>; reset so each test starts clean.
  delete document.documentElement.dataset.theme;
  (window.HTMLElement.prototype.scrollIntoView as jest.Mock).mockClear();
  const nav = jest.requireMock("next/navigation") as {
    usePathname: jest.Mock;
    useRouter: jest.Mock;
    __router: Record<string, jest.Mock>;
  };
  nav.usePathname.mockReturnValue("/");
  Object.values(nav.__router).forEach((fn) => fn.mockClear());
});
