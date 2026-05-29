"use client";

import { useTranslations } from "next-intl";
import { VscAccount, VscSparkle } from "react-icons/vsc";
import type { CopilotMessage } from "@/features/layout/context/CopilotContext";

/**
 * A single chat bubble. User messages align to the end with the user-bubble
 * token; assistant messages align to the start with the AI-bubble token.
 */
export function CopilotChatMessage({ message }: { message: CopilotMessage }) {
  const t = useTranslations("common.copilot");
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <span
        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
        style={{
          background: isUser ? "var(--color-copilot-user-bubble)" : "var(--color-copilot-accent)",
          color: isUser ? "var(--color-editor-text)" : "var(--color-copilot-header-bg)",
        }}
        aria-hidden="true"
      >
        {isUser ? <VscAccount className="h-3.5 w-3.5" /> : <VscSparkle className="h-3.5 w-3.5" />}
      </span>

      <div className={`flex max-w-[80%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <span className="mb-1 text-[10px] uppercase tracking-wide opacity-50">
          {isUser ? t("you") : t("assistant")}
        </span>
        <div
          className="rounded-lg px-3 py-2 text-xs leading-relaxed"
          style={{
            background: isUser
              ? "var(--color-copilot-user-bubble)"
              : "var(--color-copilot-ai-bubble)",
            color: "var(--color-editor-text)",
            // Sharp corner faces the avatar (logical, so it flips in RTL).
            borderStartStartRadius: isUser ? undefined : 2,
            borderStartEndRadius: isUser ? 2 : undefined,
          }}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
