import "@testing-library/jest-dom";
import type { ReactNode } from "react";

// next-intl's localized navigation has no real Next.js router in jsdom, so mock
// it with controllable stubs. usePathname defaults to "/" (overridable per test);
// useRouter returns a stable object so tests can assert on push/replace.
jest.mock("@/i18n/navigation", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest.mock factories are hoisted; can't use module-scope imports
  const React = require("react");
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  };
  const Link = ({ href, children, ...rest }: { href: unknown; children: ReactNode }) =>
    React.createElement("a", { href: typeof href === "string" ? href : "#", ...rest }, children);
  Link.displayName = "MockLink";
  return {
    __router: router,
    usePathname: jest.fn(() => "/"),
    useRouter: jest.fn(() => router),
    redirect: jest.fn(),
    getPathname: jest.fn(() => "/"),
    Link,
  };
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
  const nav = jest.requireMock("@/i18n/navigation") as {
    usePathname: jest.Mock;
    useRouter: jest.Mock;
    __router: Record<string, jest.Mock>;
  };
  nav.usePathname.mockReturnValue("/");
  Object.values(nav.__router).forEach((fn) => fn.mockClear());
});
