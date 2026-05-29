import { renderWithProviders, screen, fireEvent } from "@/test-utils/render";
import { TabsBar } from "@/features/layout/components/TabsBar";

describe("TabsBar", () => {
  it("opens the tab matching the current URL", () => {
    renderWithProviders(<TabsBar />);
    expect(screen.getByRole("tab", { name: /home\.tsx/i })).toBeInTheDocument();
  });

  it("closing the last tab shows the welcome state", () => {
    renderWithProviders(<TabsBar />);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    expect(screen.getByText(/No tabs open/i)).toBeInTheDocument();
  });
});
