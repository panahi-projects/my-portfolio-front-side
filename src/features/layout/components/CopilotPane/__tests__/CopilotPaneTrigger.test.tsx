import { renderWithProviders, screen, fireEvent } from "@/test-utils/render";
import { CopilotPaneTrigger } from "@/features/layout/components/CopilotPane";

describe("CopilotPaneTrigger", () => {
  it("toggles the pane and reflects state via aria-pressed", () => {
    renderWithProviders(<CopilotPaneTrigger />);
    const btn = screen.getByRole("button", { name: "Saeed's Copilot" });
    expect(btn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("portfolio-copilot-open")).toBe("1");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });
});
