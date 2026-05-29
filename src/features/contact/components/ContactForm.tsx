"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { VscCheck } from "react-icons/vsc";
import { contact } from "@/content/contact";

export function ContactForm() {
  const t = contact;
  const [sent, setSent] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t.form.required),
        email: z.email(t.form.invalidEmail),
        subject: z.string().optional(),
        message: z.string().min(1, t.form.required),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  // Auto-hide the success toast a few seconds after it appears.
  useEffect(() => {
    if (!sent) return;
    const timer = setTimeout(() => setSent(false), 4000);
    return () => clearTimeout(timer);
  }, [sent]);

  const onSubmit = handleSubmit(async () => {
    // TODO: Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
    setSent(true);
  });

  const inputStyle = {
    background: "var(--color-copilot-input-bg)",
    borderColor: "var(--color-border)",
    color: "var(--color-editor-text)",
  } as const;

  const renderLabel = (field: "name" | "email" | "subject" | "message", required: boolean) => (
    <label className="mb-1.5 block font-mono text-xs opacity-70">
      {`// ${t.form[field]} `}
      {required && <span style={{ color: "#ef4444" }}>*</span>}
    </label>
  );

  const errorText = (msg?: string) =>
    msg ? (
      <p className="mt-1 text-[11px]" style={{ color: "#ef4444" }}>
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div>
        {renderLabel("name", true)}
        <input
          type="text"
          placeholder={t.form.stringPlaceholder}
          className="w-full rounded-md border px-3 py-2 text-sm outline-none placeholder:opacity-40 focus:border-[var(--color-accent)]"
          style={inputStyle}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errorText(errors.name?.message)}
      </div>

      <div>
        {renderLabel("email", true)}
        <input
          type="email"
          placeholder={t.form.stringPlaceholder}
          className="w-full rounded-md border px-3 py-2 text-sm outline-none placeholder:opacity-40 focus:border-[var(--color-accent)]"
          style={inputStyle}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errorText(errors.email?.message)}
      </div>

      <div>
        {renderLabel("subject", false)}
        <input
          type="text"
          placeholder={t.form.stringPlaceholder}
          className="w-full rounded-md border px-3 py-2 text-sm outline-none placeholder:opacity-40 focus:border-[var(--color-accent)]"
          style={inputStyle}
          {...register("subject")}
        />
      </div>

      <div>
        {renderLabel("message", true)}
        <textarea
          rows={4}
          placeholder={t.form.messagePlaceholder}
          className="w-full resize-y rounded-md border px-3 py-2 text-sm outline-none placeholder:opacity-40 focus:border-[var(--color-accent)]"
          style={inputStyle}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errorText(errors.message?.message)}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-mono text-sm font-medium transition-opacity disabled:opacity-60"
        style={{ background: "var(--color-accent)", color: "var(--color-editor-bg)" }}
      >
        <span aria-hidden="true">→</span>
        <span>{isSubmitting ? t.form.sending : t.form.submit}</span>
      </button>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs"
            style={{ borderColor: "#22c55e", background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
            role="status"
          >
            <VscCheck className="h-4 w-4" aria-hidden="true" />
            {t.form.success}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="font-mono text-[11px] opacity-40">{t.footer}</p>
    </form>
  );
}
