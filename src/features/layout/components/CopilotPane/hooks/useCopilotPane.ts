"use client";

import { useContext } from "react";
import { CopilotContext, type CopilotContextValue } from "@/features/layout/context/CopilotContext";

/**
 * Public hook exposing Copilot pane state. Phase 7 covers open/close/toggle;
 * Phase 8 extends this surface with messages + sendMessage.
 */
export function useCopilotPane(): CopilotContextValue {
  const ctx = useContext(CopilotContext);
  if (!ctx) {
    throw new Error("useCopilotPane must be used inside a <CopilotProvider>.");
  }
  return ctx;
}
