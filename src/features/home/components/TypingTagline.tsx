"use client";

import { useTypingEffect } from "@/shared/hooks/useTypingEffect";

/** Animated typing tagline — cycles through the home phrases with a blinking caret. */
export function TypingTagline({ phrases }: { phrases: string[] }) {
  const text = useTypingEffect(phrases);

  return (
    <p
      className="font-mono text-sm md:text-base"
      style={{ color: "var(--color-editor-text)" }}
      aria-live="polite"
    >
      <span className="opacity-80">{text}</span>
      <span
        className="ms-0.5 inline-block animate-pulse font-normal"
        style={{ color: "var(--color-accent)" }}
        aria-hidden="true"
      >
        |
      </span>
    </p>
  );
}
