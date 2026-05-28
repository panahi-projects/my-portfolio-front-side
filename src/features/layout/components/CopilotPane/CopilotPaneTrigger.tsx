"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { VscSparkle } from "react-icons/vsc";
import { useCopilotPane } from "./hooks/useCopilotPane";

interface CopilotPaneTriggerProps {
  /** Optional visual size variant. "compact" suits the desktop sidebar slot;
   *  "expanded" gives more breathing room (mobile drawer footer). */
  variant?: "compact" | "expanded";
  className?: string;
}

export function CopilotPaneTrigger({
  variant = "compact",
  className = "",
}: CopilotPaneTriggerProps) {
  const t = useTranslations("common.copilot");
  const { isOpen, toggle } = useCopilotPane();

  const paddingY = variant === "expanded" ? "py-3" : "py-2";

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={isOpen}
      aria-label={t("triggerLabel")}
      className={`flex w-full items-center gap-2 rounded-md border px-3 ${paddingY} text-xs transition-colors ${className}`}
      style={{
        borderColor: isOpen ? "var(--color-copilot-accent)" : "var(--color-border)",
        background: "var(--color-sidebar-hover)",
        color: "var(--color-editor-text)",
      }}
      // Idle glow when the pane is closed; flat when it's open.
      animate={
        isOpen
          ? { boxShadow: "0 0 0 0 transparent" }
          : {
              boxShadow: [
                "0 0 0 0 rgba(0,0,0,0)",
                "0 0 14px 1px var(--color-copilot-accent)",
                "0 0 0 0 rgba(0,0,0,0)",
              ],
            }
      }
      transition={
        isOpen
          ? { duration: 0.2 }
          : { duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
      }
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="grid h-4 w-4 shrink-0 place-items-center"
        animate={isOpen ? {} : { rotate: [0, 12, -8, 0] }}
        transition={
          isOpen ? { duration: 0 } : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
        }
        aria-hidden="true"
      >
        <VscSparkle
          className="h-4 w-4"
          style={{ color: "var(--color-copilot-accent)" }}
        />
      </motion.span>
      <span className="flex-1 truncate text-start">{t("triggerLabel")}</span>
      <span
        className="rounded px-1 text-[10px] tracking-wide opacity-70"
        style={{ background: "var(--color-sidebar-bg)" }}
        aria-hidden="true"
      >
        AI
      </span>
    </motion.button>
  );
}
