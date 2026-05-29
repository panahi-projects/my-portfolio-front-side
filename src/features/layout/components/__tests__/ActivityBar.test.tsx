import { renderWithProviders, screen, fireEvent } from "@/test-utils/render";
import { ActivityBar } from "@/features/layout/components/ActivityBar";

describe("ActivityBar", () => {
  it("renders localized item labels", () => {
    renderWithProviders(<ActivityBar />);
    expect(screen.getByRole("button", { name: "Explorer" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Source Control" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
  });

  it("moves the active state when another item is clicked", () => {
    renderWithProviders(<ActivityBar />);
    const explorer = screen.getByRole("button", { name: "Explorer" });
    const search = screen.getByRole("button", { name: "Search" });
    expect(explorer).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(search);
    expect(search).toHaveAttribute("aria-pressed", "true");
    expect(explorer).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles the Settings panel state via the gear button", () => {
    renderWithProviders(<ActivityBar />);
    const gear = screen.getByRole("button", { name: "Settings" });
    expect(gear).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(gear);
    expect(gear).toHaveAttribute("aria-pressed", "true");
  });
});
