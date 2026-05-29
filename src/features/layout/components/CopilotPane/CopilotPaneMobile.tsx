"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "framer-motion";
import { VscChromeClose, VscClearAll, VscMenu, VscSparkle } from "react-icons/vsc";
import { useCopilotPane } from "./hooks/useCopilotPane";
import { CopilotChatMessage } from "./CopilotChatMessage";
import { CopilotChatInput } from "./CopilotChatInput";
import { common } from "@/content/common";

/**
 * Mobile Copilot pane — a full-screen overlay (per copilot-mobile.png) that
 * slides up from the bottom and can be swiped down to dismiss. Rendered behind
 * `flex md:hidden`, so it only appears on small screens. Shares the same chat
 * state as the desktop pane via CopilotContext, and reuses CopilotChatMessage
 * + CopilotChatInput.
 */
export function CopilotPaneMobile() {
  const t = common;
  const tc = common.copilot;
  const { isOpen, close, messages, isThinking, sendMessage, clearMessages } = useCopilotPane();

  const bottomRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const suggestions = tc.suggestions ?? [];
  const hasMessages = messages.length > 0;

  // Auto-scroll to the latest message (or thinking indicator) on append.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.y > 100) close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="copilot-mobile"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          // Swipe-down-to-dismiss — only the header initiates the drag (see onPointerDown),
          // so the message list stays scrollable.
          drag="y"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={handleDragEnd}
          className="fixed inset-0 z-50 flex flex-col md:hidden"
          style={{ background: "var(--color-copilot-bg)", color: "var(--color-editor-text)" }}
          role="dialog"
          aria-modal="true"
          aria-label={tc.title}
        >
          {/* Top bar — mirrors MobileNav, doubles as the swipe handle */}
          <header
            onPointerDown={(e) => dragControls.start(e)}
            className="flex h-11 shrink-0 items-center gap-2 px-3 text-sm select-none"
            style={{
              background: "var(--color-titlebar-bg)",
              borderBottom: "1px solid var(--color-border)",
              touchAction: "none",
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label={tc.close}
              className="grid h-9 w-9 place-items-center"
            >
              <VscMenu className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="truncate font-medium" style={{ color: "var(--color-editor-text)" }}>
              {tc.path}
            </span>
            <div className="ms-auto flex items-center gap-1">
              <span
                className="grid h-9 w-9 place-items-center rounded"
                style={{ background: "var(--color-sidebar-hover)" }}
                aria-hidden="true"
              >
                <VscSparkle className="h-4 w-4" style={{ color: "var(--color-copilot-accent)" }} />
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={tc.close}
                className="grid h-9 w-9 place-items-center rounded"
                style={{ background: "var(--color-sidebar-hover)" }}
              >
                <VscChromeClose
                  className="h-4 w-4"
                  style={{ color: "var(--color-statusbar-text)" }}
                  aria-hidden="true"
                />
              </button>
            </div>
          </header>

          {/* Assistant identity row */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: "1px solid var(--color-copilot-border)" }}
          >
            <VscSparkle
              className="h-4 w-4 shrink-0"
              style={{ color: "var(--color-copilot-accent)" }}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 truncate text-xs font-semibold">{tc.subtitle}</span>
            {hasMessages && (
              <button
                type="button"
                onClick={clearMessages}
                aria-label={tc.clear}
                className="grid h-7 w-7 place-items-center rounded"
                style={{ color: "var(--color-editor-text)", opacity: 0.6 }}
              >
                <VscClearAll className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Workspace chip row */}
          <div
            className="flex items-center gap-2 px-4 py-2 text-[10px]"
            style={{ borderBottom: "1px solid var(--color-copilot-border)" }}
          >
            <span className="font-medium tracking-wider uppercase opacity-50">
              {tc.workspace}
            </span>
            <span
              className="flex items-center gap-1.5 rounded px-2 py-1"
              style={{ background: "var(--color-copilot-input-bg)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-copilot-accent)" }}
                aria-hidden="true"
              />
              <span style={{ color: "var(--color-statusbar-text)" }}>
                {t.sidebar.portfolio.toLowerCase()} · {t.app.repo}
              </span>
            </span>
          </div>

          {/* Body */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
            {!hasMessages ? (
              <div className="mx-auto flex max-w-md flex-col items-center gap-5 pt-8">
                <span
                  className="grid h-14 w-14 place-items-center rounded-full"
                  style={{ background: "var(--color-copilot-accent)" }}
                  aria-hidden="true"
                >
                  <VscSparkle
                    className="h-6 w-6"
                    style={{ color: "var(--color-copilot-header-bg)" }}
                  />
                </span>
                <div className="text-center">
                  <p className="text-base font-bold">{tc.title} 👋</p>
                  <p className="mt-1.5 text-xs leading-relaxed opacity-60">{tc.welcome}</p>
                </div>
                <div className="grid w-full grid-cols-2 gap-2">
                  {suggestions.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMessage(chip)}
                      className="rounded-md border px-3 py-2.5 text-start text-[11px] leading-snug"
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
            ) : (
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
            className="flex flex-col gap-2 px-4 pt-3 pb-4"
            style={{ borderTop: "1px solid var(--color-copilot-border)" }}
          >
            <CopilotChatInput />
            <p className="text-center text-[10px] opacity-40">{tc.disclaimer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
