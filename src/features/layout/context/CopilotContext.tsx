"use client";

import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";

const COPILOT_STORAGE_KEY = "portfolio-copilot-open";

export interface CopilotContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const CopilotContext = createContext<CopilotContextValue | null>(null);

export function CopilotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Restore persisted open state on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(COPILOT_STORAGE_KEY);
      if (raw === "1") setIsOpen(true);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  // Persist changes.
  useEffect(() => {
    try {
      localStorage.setItem(COPILOT_STORAGE_KEY, isOpen ? "1" : "0");
    } catch {
      /* localStorage unavailable */
    }
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <CopilotContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </CopilotContext.Provider>
  );
}
