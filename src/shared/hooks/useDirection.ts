"use client";

import { useLocale } from "next-intl";
import { isRtl } from "@/i18n/routing";

/**
 * Direction helpers for the current locale. framer-motion's `x` transforms are
 * physical (not flipped by `dir="rtl"`), so slide-in panels must pick their
 * hidden offset based on which inline edge they're anchored to.
 */
export function useDirection() {
  const rtl = isRtl(useLocale());
  return {
    rtl,
    /** Hidden x-offset for a panel anchored to the inline-start edge. */
    hiddenStart: rtl ? "100%" : "-100%",
    /** Hidden x-offset for a panel anchored to the inline-end edge. */
    hiddenEnd: rtl ? "-100%" : "100%",
  } as const;
}
