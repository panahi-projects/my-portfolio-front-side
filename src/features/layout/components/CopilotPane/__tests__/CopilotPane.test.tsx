import { renderWithProviders, screen, fireEvent } from "@/test-utils/render";
import { CopilotPane, useCopilotPane } from "@/features/layout/components/CopilotPane";

function Harness() {
  const { open } = useCopilotPane();
  return (
    <>
      <button type="button" onClick={open}>
        open-copilot
      </button>
      <CopilotPane />
    </>
  );
}

describe("CopilotPane", () => {
  it("shows the welcome state with suggestion chips when opened", () => {
    renderWithProviders(<Harness />);
    fireEvent.click(screen.getByText("open-copilot"));

    expect(screen.getByText(/Hi! I'm Saeed's Copilot/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tell me about Saeed?" })).toBeInTheDocument();
  });

  it("sending a suggestion replaces the welcome state with the user message", () => {
    renderWithProviders(<Harness />);
    fireEvent.click(screen.getByText("open-copilot"));

    fireEvent.click(screen.getByRole("button", { name: "What's his tech stack?" }));
    expect(screen.getByText("What's his tech stack?")).toBeInTheDocument();
    // welcome chips are gone once a conversation starts
    expect(screen.queryByText(/Hi! I'm Saeed's Copilot/)).not.toBeInTheDocument();
  });

  it("auto-scrolls to the latest message (scrollIntoView) when one is added", () => {
    renderWithProviders(<Harness />);
    fireEvent.click(screen.getByText("open-copilot"));
    (window.HTMLElement.prototype.scrollIntoView as jest.Mock).mockClear();

    fireEvent.click(screen.getByRole("button", { name: "How can I contact Saeed?" }));
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
