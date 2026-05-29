"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillBarProps {
  name: string;
  /** 0–100. */
  proficiency: number;
  color: string;
}

/** A single skill row: name · animated progress bar · percentage.
 *  The bar fills from 0 → proficiency the first time it scrolls into view. */
export function SkillBar({ name, proficiency, color }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span
        className="w-24 shrink-0 text-xs leading-tight md:w-28 md:text-sm"
        style={{ color: "var(--color-editor-text)", opacity: 0.85 }}
      >
        {name}
      </span>

      <div
        className="relative h-0.5 flex-1 rounded-full"
        style={{ background: "var(--color-border)" }}
        role="progressbar"
        aria-valuenow={proficiency}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={name}
      >
        <motion.div
          className="absolute inset-y-0 start-0 rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${proficiency}%` : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>

      <span className="w-9 shrink-0 text-end text-xs font-medium" style={{ color }}>
        {proficiency}%
      </span>
    </div>
  );
}
