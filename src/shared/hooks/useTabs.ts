"use client";

import { useContext } from "react";
import { TabsContext, type TabsContextValue } from "@/features/layout/context/TabsContext";

export function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("useTabs must be used inside a <TabsProvider>.");
  }
  return ctx;
}
