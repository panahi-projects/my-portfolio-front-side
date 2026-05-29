import { Fragment, type ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { HomeData } from "@/features/home/types";
import { getIcon } from "@/features/home/constants/icons";
import { TypingTagline } from "@/features/home/components/TypingTagline";

/** Keywords highlighted (accent color) inside the intro paragraph. */
const INTRO_KEYWORDS = ["front-end developer", "7+ years", "clean code", "UX", "Balinex"];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Splits `text` and wraps any keyword occurrences in an accent span. */
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
    ),
  );
}

export async function HomeHero({ data }: { data: HomeData }) {
  const t = await getTranslations("home");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
      {/* Green code-comment banner */}
      <p className="font-mono text-sm text-green-400 md:text-base">{t("banner")}</p>

      {/* Name */}
      <h1 className="mt-4 text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
        <span style={{ color: "var(--color-editor-text)" }}>{data.name}</span>
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--color-accent), var(--color-accent-hover), #ec4899)",
          }}
        >
          {data.lastName}
        </span>
      </h1>

      {/* Role chips */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {data.roleChips.map((chip) => (
          <li
            key={chip.label}
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-sidebar-hover)",
              color: "var(--color-editor-text)",
            }}
          >
            {chip.isCompany ? (
              <span style={{ color: "var(--color-accent)" }}>@</span>
            ) : (
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: chip.dotColor ?? "var(--color-accent)" }}
                aria-hidden="true"
              />
            )}
            <span>{chip.label}</span>
          </li>
        ))}
      </ul>

      {/* Typing tagline */}
      <div className="mt-6">
        <TypingTagline phrases={data.tagline} />
      </div>

      {/* Intro paragraph */}
      <p
        className="mt-6 max-w-2xl text-sm leading-relaxed md:text-base"
        style={{ color: "var(--color-editor-text)", opacity: 0.85 }}
      >
        {highlight(data.intro, INTRO_KEYWORDS)}
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        {data.ctaButtons.map((cta) => {
          const Icon = getIcon(cta.icon);
          const filled = cta.variant === "filled";
          const content = (
            <>
              {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
              <span>{cta.label}</span>
            </>
          );
          const className =
            "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors";
          const style = filled
            ? {
                background: "var(--color-accent)",
                borderColor: "var(--color-accent)",
                color: "var(--color-editor-bg)",
              }
            : {
                background: "transparent",
                borderColor: "var(--color-border)",
                color: "var(--color-editor-text)",
              };

          return cta.href.startsWith("/") ? (
            <Link key={cta.label} href={cta.href} className={className} style={style}>
              {content}
            </Link>
          ) : (
            <a key={cta.label} href={cta.href} className={className} style={style}>
              {content}
            </a>
          );
        })}
      </div>

      {/* Stats */}
      <ul
        className="mt-12 grid grid-cols-2 overflow-hidden rounded-lg border md:grid-cols-4"
        style={{ borderColor: "var(--color-border)", background: "var(--color-sidebar-hover)" }}
      >
        {data.stats.map((stat, i) => (
          <li
            key={stat.label}
            className="flex flex-col items-center gap-1 px-4 py-8 text-center"
            style={{
              borderInlineStart: i % 4 === 0 ? undefined : "1px solid var(--color-border)",
              borderTop: i >= 2 ? "1px solid var(--color-border)" : undefined,
            }}
          >
            <span
              className="text-3xl font-bold md:text-4xl"
              style={{ color: "var(--color-editor-text)" }}
            >
              {stat.value}
            </span>
            <span className="text-[10px] tracking-widest uppercase opacity-50">{stat.label}</span>
          </li>
        ))}
      </ul>

      {/* Social links */}
      <ul className="mt-8 flex flex-wrap gap-2">
        {data.socialLinks.map((link) => {
          const Icon = getIcon(link.icon);
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors hover:opacity-100"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-sidebar-hover)",
                  color: "var(--color-editor-text)",
                  opacity: 0.85,
                }}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
