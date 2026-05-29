"use client";

import { createContext, useCallback, useState, type ReactNode } from "react";

export interface SettingsContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

/**
 * Open/close state for the Settings panel. Lifted to a provider because two
 * disconnected consumers toggle it: the ActivityBar gear (desktop) and the
 * MobileNav drawer gear (mobile). Not persisted — settings is a transient overlay.
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <SettingsContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SettingsContext.Provider>
  );
}
