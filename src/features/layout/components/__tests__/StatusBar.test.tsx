import { renderWithProviders, screen, fireEvent } from "@/test-utils/render";
import { StatusBar } from "@/features/layout/components/StatusBar";
import { useTheme } from "@/features/theme/hooks/useTheme";

function ThemeProbe() {
  const { setTheme } = useTheme();
  return (
    <button type="button" onClick={() => setTheme("nord")}>
      set-nord
    </button>
  );
}

describe("StatusBar", () => {
  it("renders localized branch, encoding and the active theme name", () => {
    renderWithProviders(<StatusBar />);
    expect(screen.getByText("main")).toBeInTheDocument();
    expect(screen.getByText("UTF-8")).toBeInTheDocument();
    expect(screen.getByText("Default Dark")).toBeInTheDocument();
  });

  it("reflects a theme change in document.dataset.theme and the label", () => {
    renderWithProviders(
      <>
        <ThemeProbe />
        <StatusBar />
      </>,
    );
    fireEvent.click(screen.getByText("set-nord"));
    expect(document.documentElement.dataset.theme).toBe("nord");
    expect(screen.getByText("Nord")).toBeInTheDocument();
  });
});
