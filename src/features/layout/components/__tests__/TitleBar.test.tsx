import { renderWithProviders, screen } from "@/test-utils/render";
import { TitleBar } from "@/features/layout/components/TitleBar";

describe("TitleBar", () => {
  it("renders the banner with the localized file title", () => {
    renderWithProviders(<TitleBar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("saeed-panahi : portfolio")).toBeInTheDocument();
  });
});
