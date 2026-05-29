import "@testing-library/jest-dom";
import type { ReactNode } from "react";

// next-intl's localized navigation has no real Next.js router in jsdom, so mock
// it with controllable stubs. usePathname defaults to "/" (overridable per test);
// useRouter returns a stable object so tests can assert on push/replace.
jest.mock("@/i18n/navigation", () => {
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

beforeEach(() => {
  localStorage.clear();
  const nav = jest.requireMock("@/i18n/navigation") as {
    usePathname: jest.Mock;
    useRouter: jest.Mock;
    __router: Record<string, jest.Mock>;
  };
  nav.usePathname.mockReturnValue("/");
  Object.values(nav.__router).forEach((fn) => fn.mockClear());
});
