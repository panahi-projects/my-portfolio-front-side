import { experience } from "@/content/experience";
import type { ExperienceData } from "@/features/experience/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2022-01" → "Jan 2022". Falls back to the raw value if unparsable. */
function formatMonth(value: string): string {
  const [year, month] = value.split("-");
  const idx = Number(month) - 1;
  if (year && idx >= 0 && idx < 12) return `${MONTHS[idx]} ${year}`;
  return value;
}

export async function ExperienceView({ data }: { data: ExperienceData }) {
  const t = experience;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
      {/* TS code-comment banner */}
      <p className="font-mono text-sm text-green-400 md:text-base">{t.banner}</p>

      {/* Heading + interface subtitle */}
      <h1
        className="mt-4 text-4xl font-bold tracking-tight md:text-6xl"
        style={{ color: "var(--color-editor-text)" }}
      >
        {t.title}
      </h1>
      <p className="mt-2 font-mono text-sm opacity-50 md:text-base">{t.interfaceLine}</p>

      {/* Timeline */}
      <ul className="relative mt-10">
        {/* vertical spine */}
        <span
          className="absolute top-2 bottom-2 w-px"
          style={{ insetInlineStart: "7px", background: "var(--color-border)" }}
          aria-hidden="true"
        />

        {data.experiences.map((exp) => {
          const range = `${formatMonth(exp.startDate)} - ${
            exp.current || !exp.endDate ? t.present : formatMonth(exp.endDate)
          }`;
          return (
            <li key={`${exp.company}-${exp.startDate}`} className="relative ps-8 pb-10">
              {/* node — filled for current, ring for past */}
              <span
                className="absolute top-1 h-3.5 w-3.5 rounded-full"
                style={{
                  insetInlineStart: 0,
                  background: exp.current ? "var(--color-accent)" : "var(--color-editor-bg)",
                  border: "2px solid var(--color-accent)",
                }}
                aria-hidden="true"
              />

              <p className="font-mono text-xs tracking-wide opacity-60">{range}</p>
              <h3
                className="mt-1 text-xl font-bold md:text-2xl"
                style={{ color: "var(--color-editor-text)" }}
              >
                {exp.role}
              </h3>
              <p className="mt-0.5 text-sm" style={{ color: "var(--color-accent)" }}>
                @ {exp.company}
                <span className="opacity-50" style={{ color: "var(--color-editor-text)" }}>
                  {" "}
                  · {exp.location}
                </span>
              </p>

              <p
                className="mt-3 max-w-2xl text-sm leading-relaxed"
                style={{ color: "var(--color-editor-text)", opacity: 0.8 }}
              >
                {exp.achievements.join(" ")}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border px-2 py-1 text-xs"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-sidebar-hover)",
                      color: "var(--color-editor-text)",
                    }}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
