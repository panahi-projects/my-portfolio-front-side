import { renderWithProviders, screen } from "@/test-utils/render";
import { SidebarPanel } from "@/features/layout/components/SidebarPanel";

describe("SidebarPanel", () => {
  it("renders the explorer header and file rows", () => {
    renderWithProviders(<SidebarPanel />);
    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();
    expect(screen.getByText("home.tsx")).toBeInTheDocument();
    expect(screen.getByText("about.html")).toBeInTheDocument();
    expect(screen.getByText("contact.css")).toBeInTheDocument();
  });

  it("links each page row to its localized route", () => {
    renderWithProviders(<SidebarPanel />);
    expect(screen.getByRole("link", { name: /about\.html/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /skills\.json/i })).toHaveAttribute("href", "/skills");
  });
});
