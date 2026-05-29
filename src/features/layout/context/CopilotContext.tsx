"use client";

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { MOCK_REPLIES } from "@/features/layout/components/CopilotPane/constants/mockReplies";

const COPILOT_OPEN_KEY = "portfolio-copilot-open";
const COPILOT_MESSAGES_KEY = "portfolio-copilot-messages";

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface CopilotContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  messages: CopilotMessage[];
  /** True while the mock assistant "thinks" before its reply lands. */
  isThinking: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}

export const CopilotContext = createContext<CopilotContextValue | null>(null);

let messageSeq = 0;
function nextId(): string {
  messageSeq += 1;
  return `${Date.now().toString(36)}-${messageSeq}`;
}

function pickReply(): string {
  return MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
}

export function CopilotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore persisted state on mount (kept out of initial state to avoid hydration mismatch).
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time post-mount rehydration from localStorage
      if (localStorage.getItem(COPILOT_OPEN_KEY) === "1") setIsOpen(true);
      const rawMessages = localStorage.getItem(COPILOT_MESSAGES_KEY);
      if (rawMessages) {
        const parsed = JSON.parse(rawMessages);
        if (Array.isArray(parsed)) setMessages(parsed as CopilotMessage[]);
      }
    } catch {
      /* localStorage unavailable or corrupt */
    }
  }, []);

  // Persist open state.
  useEffect(() => {
    try {
      localStorage.setItem(COPILOT_OPEN_KEY, isOpen ? "1" : "0");
    } catch {
      /* localStorage unavailable */
    }
  }, [isOpen]);

  // Persist messages.
  useEffect(() => {
    try {
      localStorage.setItem(COPILOT_MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      /* localStorage unavailable */
    }
  }, [messages]);

  // Clear any pending reply timer on unmount.
  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = useCallback((content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMessage: CopilotMessage = {
      id: nextId(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Mock assistant reply after a short "thinking" delay (600–1000ms).
    setIsThinking(true);
    if (replyTimer.current) clearTimeout(replyTimer.current);
    const delay = 600 + Math.floor(Math.random() * 400);
    replyTimer.current = setTimeout(() => {
      const assistantMessage: CopilotMessage = {
        id: nextId(),
        role: "assistant",
        content: pickReply(),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
      replyTimer.current = null;
    }, delay);
  }, []);

  const clearMessages = useCallback(() => {
    if (replyTimer.current) {
      clearTimeout(replyTimer.current);
      replyTimer.current = null;
    }
    setIsThinking(false);
    setMessages([]);
  }, []);

  return (
    <CopilotContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        messages,
        isThinking,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
}
