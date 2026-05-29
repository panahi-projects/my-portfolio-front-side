import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { THEME_STORAGE_KEY } from "@/features/theme/constants/themes";

function Probe() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={() => setTheme("gruvbox")}>
        set-gruvbox
      </button>
    </>
  );
}

describe("ThemeContext", () => {
  it("syncs the chosen theme to <html data-theme> and localStorage", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("set-gruvbox"));

    expect(document.documentElement.dataset.theme).toBe("gruvbox");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("gruvbox");
    expect(screen.getByTestId("theme")).toHaveTextContent("gruvbox");
  });
});

describe("useTheme", () => {
  it("throws when used outside a ThemeProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    function Bare() {
      useTheme();
      return null;
    }
    expect(() => render(<Bare />)).toThrow("useTheme must be used inside a <ThemeProvider>.");
    spy.mockRestore();
  });
});
