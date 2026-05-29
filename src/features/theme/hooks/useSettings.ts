"use client";

import { useContext } from "react";
import { SettingsContext, type SettingsContextValue } from "../context/SettingsContext";

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used inside a <SettingsProvider>.");
  }
  return ctx;
}
