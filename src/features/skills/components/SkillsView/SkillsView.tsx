import { getTranslations } from "next-intl/server";
import type { SkillsData } from "@/features/skills/types";
import { barColor } from "@/features/skills/constants/colors";
import { SkillBar } from "@/features/skills/components/SkillBar";

export async function SkillsView({ data }: { data: SkillsData }) {
  const t = await getTranslations("skills");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
      {/* JSON code-comment banner */}
      <p className="font-mono text-sm text-green-400 md:text-base">{t("banner")}</p>

      {/* Heading + JSON subtitle */}
      <h1
        className="mt-4 text-4xl font-bold tracking-tight md:text-6xl"
        style={{ color: "var(--color-editor-text)" }}
      >
        {t("title")}
      </h1>
      <p className="mt-2 font-mono text-sm opacity-50 md:text-base">{t("jsonSubtitle")}</p>

      {/* Category grid */}
      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {data.categories.map((category) => (
          <section key={category.name}>
            <h2
              className="font-mono text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-accent)" }}
            >
              {category.name}
            </h2>
            <div className="mt-2 h-px" style={{ background: "var(--color-border)" }} />

            <div className="mt-5 flex flex-col gap-4">
              {category.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  proficiency={skill.proficiency}
                  color={barColor(i)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
