import { getHomeData } from "@/services/api/home.service";
import { getAboutData } from "@/services/api/about.service";
import { getSkillsData } from "@/services/api/skills.service";
import { getExperienceData } from "@/services/api/experience.service";
import { getContactData } from "@/services/api/contact.service";

import { homeMock } from "@/services/api/mock/home.mock";
import { aboutMock } from "@/services/api/mock/about.mock";
import { skillsMock } from "@/services/api/mock/skills.mock";
import { experienceMock } from "@/services/api/mock/experience.mock";
import { contactMock } from "@/services/api/mock/contact.mock";

describe("mock API services", () => {
  it("getHomeData returns the typed home mock", async () => {
    const data = await getHomeData();
    expect(data).toEqual(homeMock);
    expect(data.name).toBe("Saeed");
    expect(data.roleChips.length).toBeGreaterThan(0);
    expect(data.stats.length).toBe(4);
  });

  it("getAboutData returns the typed about mock", async () => {
    const data = await getAboutData();
    expect(data).toEqual(aboutMock);
    expect(typeof data.bio).toBe("string");
    expect(data.currentFocus.length).toBeGreaterThan(0);
  });

  it("getSkillsData returns the typed skills mock", async () => {
    const data = await getSkillsData();
    expect(data).toEqual(skillsMock);
    expect(data.categories[0].skills[0]).toHaveProperty("proficiency");
  });

  it("getExperienceData returns the typed experience mock", async () => {
    const data = await getExperienceData();
    expect(data).toEqual(experienceMock);
    expect(data.experiences.some((e) => e.current)).toBe(true);
  });

  it("getContactData returns the typed contact mock", async () => {
    const data = await getContactData();
    expect(data).toEqual(contactMock);
    expect(data.email).toContain("@");
    expect(data.socialLinks.length).toBeGreaterThan(0);
  });
});
