"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { VscSend } from "react-icons/vsc";
import { useCopilotPane } from "./hooks/useCopilotPane";

/**
 * Controlled chat input + send button. Enter (form submit) sends the message
 * and clears the field. Empty/whitespace input is ignored.
 */
export function CopilotChatInput() {
  const t = useTranslations("common.copilot");
  const { sendMessage } = useCopilotPane();
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setValue("");
  };

  const canSend = value.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-lg border px-2 py-1.5"
      style={{
        background: "var(--color-copilot-input-bg)",
        borderColor: "var(--color-copilot-border)",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("placeholder")}
        className="min-w-0 flex-1 bg-transparent px-1 text-xs outline-none placeholder:opacity-50"
        style={{ color: "var(--color-editor-text)" }}
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label={t("send")}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md transition-opacity disabled:opacity-40"
        style={{
          background: canSend ? "var(--color-copilot-accent)" : "transparent",
          color: canSend ? "var(--color-copilot-header-bg)" : "var(--color-editor-text)",
        }}
      >
        <VscSend className="h-4 w-4" />
      </button>
    </form>
  );
}
