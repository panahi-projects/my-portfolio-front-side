import { renderWithProviders, screen, fireEvent } from "@/test-utils/render";
import { MenuBar } from "@/features/layout/components/MenuBar";

describe("MenuBar", () => {
  it("renders localized menu items", () => {
    renderWithProviders(<MenuBar />);
    expect(screen.getByRole("button", { name: "File" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Terminal" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copilot" })).toBeInTheDocument();
  });

  it("opens a dropdown when a menu item is clicked", () => {
    renderWithProviders(<MenuBar />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "File" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
