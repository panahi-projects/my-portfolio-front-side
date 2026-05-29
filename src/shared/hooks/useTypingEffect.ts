"use client";

import { useEffect, useState } from "react";

interface TypingOptions {
  /** ms per character while typing. */
  typingSpeed?: number;
  /** ms per character while deleting. */
  deletingSpeed?: number;
  /** pause once a phrase is fully typed, before deleting. */
  pauseMs?: number;
}

/**
 * Typewriter effect that cycles through `phrases`: types one out, pauses,
 * deletes it, then moves to the next (looping). Returns the current text.
 *
 * All state updates happen inside timeouts (never synchronously in the effect
 * body) so the loop stays smooth and lint-clean.
 */
export function useTypingEffect(
  phrases: string[],
  { typingSpeed = 70, deletingSpeed = 40, pauseMs = 1600 }: TypingOptions = {},
): string {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[phraseIndex % phrases.length];

    // Fully typed → pause, then switch to deleting.
    if (!deleting && text === current) {
      const timer = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(timer);
    }

    // Fully deleted → advance to the next phrase and start typing again.
    if (deleting && text === "") {
      const timer = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }

    // Otherwise add or remove one character.
    const timer = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(timer);
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}
