import { renderWithProviders, screen, fireEvent } from "@/test-utils/render";
import { SettingsPanel } from "@/features/theme/components/SettingsPanel";
import { useSettings } from "@/features/theme/hooks/useSettings";

function OpenButton() {
  const { open } = useSettings();
  return (
    <button type="button" onClick={open}>
      open-settings
    </button>
  );
}

function setup(locale = "en") {
  const utils = renderWithProviders(
    <>
      <OpenButton />
      <SettingsPanel />
    </>,
    { locale }
  );
  fireEvent.click(screen.getByText("open-settings"));
  return utils;
}

describe("SettingsPanel", () => {
  it("is closed until opened", () => {
    renderWithProviders(
      <>
        <OpenButton />
        <SettingsPanel />
      </>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("open-settings"));
    expect(screen.getAllByRole("dialog").length).toBeGreaterThan(0);
  });

  it("applies a theme when its row is clicked", () => {
    setup();
    const nord = screen.getAllByRole("button", { name: "Nord" })[0];
    fireEvent.click(nord);
    expect(document.documentElement.dataset.theme).toBe("nord");
    expect(nord).toHaveAttribute("aria-pressed", "true");
  });

  it("marks the active theme with aria-pressed", () => {
    setup();
    expect(screen.getAllByRole("button", { name: "Default Dark" })[0]).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("switches locale when a language button is clicked", () => {
    setup();
    fireEvent.click(screen.getAllByRole("button", { name: "فارسی" })[0]);
    const nav = jest.requireMock("@/i18n/navigation") as {
      useRouter: () => { replace: jest.Mock };
    };
    expect(nav.useRouter().replace).toHaveBeenCalledWith("/", { locale: "fa" });
  });
});
