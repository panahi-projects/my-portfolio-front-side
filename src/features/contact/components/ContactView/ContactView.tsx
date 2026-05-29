import { VscChevronRight } from "react-icons/vsc";
import { contact } from "@/content/contact";
import type { ContactData } from "@/features/contact/types";
import { getIcon } from "@/features/home/constants/icons";
import { ContactForm } from "@/features/contact/components/ContactForm";

/** Brand-ish accent per social slug (used for the card icon + label). */
const BRAND_COLOR: Record<string, string> = {
  email: "#4ec9b0",
  linkedin: "#0a66c2",
  github: "#e6e6e6",
  medium: "#e6e6e6",
  tableau: "#e8762c",
  leetcode: "#ffa116",
};

/** Teal section heading (VS Code "type" color). */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-mono text-sm font-semibold tracking-widest uppercase"
      style={{ color: "#4ec9b0" }}
    >
      {children}
    </h2>
  );
}

export async function ContactView({ data }: { data: ContactData }) {
  const t = contact;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10 md:py-12">
      {/* CSS code-comment banner */}
      <p className="font-mono text-sm text-green-400 md:text-base">{t.banner}</p>

      {/* Heading + subtitle */}
      <h1
        className="mt-4 text-4xl font-bold tracking-tight md:text-6xl"
        style={{ color: "var(--color-editor-text)" }}
      >
        {t.title}
      </h1>
      <p className="mt-2 font-mono text-sm opacity-50 md:text-base">{`// ${t.subtitle}`}</p>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {/* Left — find me on */}
        <section>
          <SectionHeading>{t.findMeOn}</SectionHeading>
          <ul className="mt-4 flex flex-col gap-3">
            {data.socialLinks.map((link) => {
              const Icon = getIcon(link.icon);
              const color = BRAND_COLOR[link.icon] ?? "var(--color-editor-text)";
              const external = link.href.startsWith("http") || link.href.startsWith("mailto");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-white/5"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-sidebar-hover)",
                    }}
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-md"
                      style={{ background: "var(--color-copilot-input-bg)" }}
                      aria-hidden="true"
                    >
                      {Icon && <Icon className="h-4 w-4" style={{ color }} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block font-mono text-xs font-semibold tracking-wide uppercase"
                        style={{ color }}
                      >
                        {link.label}
                      </span>
                      {link.handle && (
                        <span className="block truncate text-xs opacity-60">{link.handle}</span>
                      )}
                    </span>
                    {external && (
                      <VscChevronRight className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Right — send a message */}
        <section>
          <SectionHeading>{t.sendMessage}</SectionHeading>
          <div className="mt-4">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
