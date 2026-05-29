import { renderWithProviders, screen, fireEvent, act } from "@/test-utils/render";
import { useCopilotPane } from "@/features/layout/components/CopilotPane";

function Probe() {
  const { isOpen, messages, toggle, sendMessage, clearMessages } = useCopilotPane();
  return (
    <>
      <span data-testid="open">{String(isOpen)}</span>
      <span data-testid="count">{messages.length}</span>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{`${m.role}:${m.content}`}</li>
        ))}
      </ul>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <button type="button" onClick={() => sendMessage("hi there")}>
        send
      </button>
      <button type="button" onClick={clearMessages}>
        clear
      </button>
    </>
  );
}

describe("CopilotContext", () => {
  it("persists open state to localStorage", () => {
    renderWithProviders(<Probe />);
    fireEvent.click(screen.getByText("toggle"));
    expect(localStorage.getItem("portfolio-copilot-open")).toBe("1");
    expect(screen.getByTestId("open")).toHaveTextContent("true");
  });

  it("rehydrates open state + messages from localStorage on mount", () => {
    localStorage.setItem("portfolio-copilot-open", "1");
    localStorage.setItem(
      "portfolio-copilot-messages",
      JSON.stringify([{ id: "1", role: "user", content: "hello", timestamp: 1 }])
    );
    renderWithProviders(<Probe />);
    expect(screen.getByTestId("open")).toHaveTextContent("true");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByText("user:hello")).toBeInTheDocument();
  });

  it("appends a user message immediately and a mock assistant reply after a delay", () => {
    jest.useFakeTimers();
    try {
      renderWithProviders(<Probe />);
      fireEvent.click(screen.getByText("send"));

      expect(screen.getByText("user:hi there")).toBeInTheDocument();
      expect(screen.getByTestId("count")).toHaveTextContent("1");

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(screen.getByTestId("count")).toHaveTextContent("2");
      expect(screen.getByText(/^assistant:/)).toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });

  it("clears messages", () => {
    jest.useFakeTimers();
    try {
      renderWithProviders(<Probe />);
      fireEvent.click(screen.getByText("send"));
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(screen.getByTestId("count")).toHaveTextContent("2");
      fireEvent.click(screen.getByText("clear"));
      expect(screen.getByTestId("count")).toHaveTextContent("0");
    } finally {
      jest.useRealTimers();
    }
  });
});
