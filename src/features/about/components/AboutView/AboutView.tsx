import { Fragment, type ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { VscCloudDownload } from "react-icons/vsc";
import type { AboutData } from "@/features/about/types";

/** Keywords highlighted (accent) inside the bio paragraph. */
const BIO_KEYWORDS = [
  "Saeed Panahi",
  "front-end developer",
  "Balinex",
  "7+ years",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React",
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function highlight(text: string, keywords: string[]): ReactNode {
  if (keywords.length === 0) return text;
  const pattern = new RegExp(`(${keywords.map(escapeRegExp).join("|")})`, "gi");
  return text.split(pattern).map((part, i) =>
    keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} style={{ color: "var(--color-accent)" }} className="font-medium">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/** Teal section heading, e.g. "CURRENT FOCUS" (VS Code "type" color). */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-mono text-sm font-semibold tracking-widest uppercase"
      style={{ color: "#4ec9b0" }}
    >
      {children}
    </h2>
  );
}

const cardStyle = {
  borderColor: "var(--color-border)",
  background: "var(--color-sidebar-hover)",
} as const;

export async function AboutView({ data }: { data: AboutData }) {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10 md:py-12">
      {/* HTML-comment banner */}
      <p className="font-mono text-sm text-green-400 md:text-base">{t("banner")}</p>

      {/* Heading + subtitle */}
      <h1
        className="mt-4 text-4xl font-bold tracking-tight md:text-6xl"
        style={{ color: "var(--color-editor-text)" }}
      >
        {t("title")}
      </h1>
      <p className="mt-2 font-mono text-sm opacity-50 md:text-base">{`// ${t("subtitle")}`}</p>

      {/* Bio card */}
      <div className="mt-8 rounded-lg border p-5 md:p-6" style={cardStyle}>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "#4ade80" }}
              aria-hidden="true"
            />
            <span style={{ color: "#4ade80" }}>{data.availabilityStatus}</span>
          </span>
          <span className="opacity-40">·</span>
          <span className="opacity-60">{data.location}</span>
        </div>
        <p
          className="text-sm leading-relaxed md:text-base"
          style={{ color: "var(--color-editor-text)", opacity: 0.85 }}
        >
          {highlight(data.bio, BIO_KEYWORDS)}
        </p>
      </div>

      {/* Current focus */}
      <section className="mt-10">
        <SectionHeading>{t("currentFocus")}</SectionHeading>
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.currentFocus.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-3 rounded-lg border p-4"
              style={cardStyle}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {item.emoji}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--color-editor-text)" }}>
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed opacity-60">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section className="mt-10">
        <SectionHeading>{t("education")}</SectionHeading>
        <ul className="mt-4 flex flex-col gap-3">
          {data.education.map((edu) => (
            <li
              key={`${edu.institution}-${edu.period}`}
              className="flex items-start gap-3 rounded-lg border p-4"
              style={cardStyle}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                🎓
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium" style={{ color: "var(--color-editor-text)" }}>
                  {edu.institution}
                </p>
                <p className="mt-0.5 text-xs opacity-70">{edu.degree}</p>
              </div>
              <span className="shrink-0 text-xs opacity-50">{edu.period}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Download CV */}
      <div className="mt-8">
        <a
          href={data.cvUrl}
          download
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          style={{
            background: "var(--color-accent)",
            borderColor: "var(--color-accent)",
            color: "var(--color-editor-bg)",
          }}
        >
          <VscCloudDownload className="h-4 w-4" aria-hidden="true" />
          <span>{t("downloadCv")}</span>
        </a>
      </div>
    </div>
  );
}
