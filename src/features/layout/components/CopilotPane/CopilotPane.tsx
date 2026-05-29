"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose, VscClearAll, VscSparkle } from "react-icons/vsc";
import { useCopilotPane } from "./hooks/useCopilotPane";
import { CopilotChatMessage } from "./CopilotChatMessage";
import { CopilotChatInput } from "./CopilotChatInput";

/**
 * Desktop Copilot pane — a slide-in right panel that splits the editor column
 * (~65% editor / 35% pane). Rendered by AppShell behind `hidden md:flex`, so it
 * only appears on desktop. AnimatePresence keeps the slide-out animation.
 */
export function CopilotPane() {
  const t = useTranslations("common.copilot");
  const { isOpen, close, messages, isThinking, sendMessage, clearMessages } = useCopilotPane();

  const bottomRef = useRef<HTMLDivElement>(null);
  const suggestions = (t.raw("suggestions") as string[]) ?? [];
  const hasMessages = messages.length > 0;

  // Auto-scroll to the latest message (or thinking indicator) on append.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          key="copilot-pane"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          className="hidden min-h-0 shrink-0 flex-col border-s md:flex"
          style={{
            flexBasis: "35%",
            maxWidth: "30rem",
            minWidth: "20rem",
            background: "var(--color-copilot-bg)",
            borderColor: "var(--color-copilot-border)",
            color: "var(--color-editor-text)",
          }}
          aria-label={t("title")}
        >
          {/* Header */}
          <header
            className="flex items-center gap-2 border-b px-3 py-2.5"
            style={{
              background: "var(--color-copilot-header-bg)",
              borderColor: "var(--color-copilot-border)",
            }}
          >
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md"
              style={{ background: "var(--color-copilot-accent)" }}
              aria-hidden="true"
            >
              <VscSparkle className="h-4 w-4" style={{ color: "var(--color-copilot-header-bg)" }} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{t("title")}</p>
              <p className="truncate text-[10px] opacity-50">{t("subtitle")}</p>
            </div>
            {hasMessages && (
              <button
                type="button"
                onClick={clearMessages}
                aria-label={t("clear")}
                title={t("clear")}
                className="grid h-7 w-7 place-items-center rounded transition-colors hover:opacity-100"
                style={{ color: "var(--color-editor-text)", opacity: 0.6 }}
              >
                <VscClearAll className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              title={t("close")}
              className="grid h-7 w-7 place-items-center rounded transition-colors hover:opacity-100"
              style={{ color: "var(--color-editor-text)", opacity: 0.6 }}
            >
              <VscChromeClose className="h-4 w-4" />
            </button>
          </header>

          {/* Body */}
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            {/* Welcome / empty state */}
            {!hasMessages && (
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-lg px-3 py-2.5 text-xs leading-relaxed"
                  style={{ background: "var(--color-copilot-ai-bubble)" }}
                >
                  {t("welcome")}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {suggestions.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMessage(chip)}
                      className="rounded-md border px-3 py-2 text-start text-[11px] leading-snug transition-colors"
                      style={{
                        borderColor: "var(--color-copilot-border)",
                        background: "var(--color-copilot-input-bg)",
                        color: "var(--color-editor-text)",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation */}
            {hasMessages && (
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <CopilotChatMessage key={message.id} message={message} />
                ))}
                {isThinking && (
                  <div className="flex items-center gap-1.5 ps-8 opacity-60" aria-live="polite">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--color-copilot-accent)" }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Footer */}
          <div
            className="border-t p-3"
            style={{ borderColor: "var(--color-copilot-border)" }}
          >
            <CopilotChatInput />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
