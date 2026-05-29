import { renderWithProviders, screen } from "@/test-utils/render";

import { HomeHero } from "@/features/home/components/HomeHero";
import { AboutView } from "@/features/about/components/AboutView";
import { SkillsView } from "@/features/skills/components/SkillsView";
import { ExperienceView } from "@/features/experience/components/ExperienceView";
import { ContactView } from "@/features/contact/components/ContactView";

import { homeMock } from "@/services/api/mock/home.mock";
import { aboutMock } from "@/services/api/mock/about.mock";
import { skillsMock } from "@/services/api/mock/skills.mock";
import { experienceMock } from "@/services/api/mock/experience.mock";
import { contactMock } from "@/services/api/mock/contact.mock";

describe("page views render with mock data", () => {
  it("Home hero", async () => {
    renderWithProviders(await HomeHero({ data: homeMock }));
    expect(screen.getByText("Saeed")).toBeInTheDocument();
    expect(screen.getByText("Panahi")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("7+")).toBeInTheDocument();
  });

  it("About", async () => {
    renderWithProviders(await AboutView({ data: aboutMock }));
    expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
    expect(screen.getByText(aboutMock.availabilityStatus)).toBeInTheDocument();
    expect(screen.getByText(aboutMock.currentFocus[0].title)).toBeInTheDocument();
  });

  it("Skills", async () => {
    renderWithProviders(await SkillsView({ data: skillsMock }));
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getAllByText("92%").length).toBeGreaterThan(0);
  });

  it("Experience", async () => {
    renderWithProviders(await ExperienceView({ data: experienceMock }));
    expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getAllByText(/Balinex/).length).toBeGreaterThan(0);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("Contact", async () => {
    renderWithProviders(await ContactView({ data: contactMock }));
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    // ContactForm (client island) renders its submit button
    expect(screen.getByRole("button", { name: /send_message/i })).toBeInTheDocument();
  });
});
