"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Site chat assistant.
 *
 * Asks the same questions as the project planner (budget, service, timing),
 * adds the name and email the planner never captured, and stores the enquiry
 * through the existing /api/contact-leads endpoint so it appears in the admin
 * leads list. WhatsApp and email remain available at the end, so the fastest
 * reply path is unchanged.
 */

const SERVICES = ["Custom Software", "Websites", "Mobile Apps"] as const;
const BUDGETS = ["£1,500", "£2,500", "£5,000", "£10,000", "Custom"] as const;
const TIMINGS = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "Just exploring",
] as const;

const WHATSAPP_NUMBER = "919662106793";

type Stage = "service" | "budget" | "timing" | "name" | "email" | "review" | "done";

interface Draft {
  service: string;
  budget: string;
  timing: string;
  name: string;
  email: string;
}

const EMPTY: Draft = {
  service: "",
  budget: "",
  timing: "",
  name: "",
  email: "",
};

function summary(draft: Draft): string {
  return [
    `Service: ${draft.service || "Not sure yet"}`,
    `Budget: ${draft.budget || "Not decided"}`,
    `Start: ${draft.timing || "Flexible"}`,
    `Name: ${draft.name}`,
    `Email: ${draft.email}`,
  ].join("\n");
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("service");
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const update = (patch: Partial<Draft>) =>
    setDraft((current) => ({ ...current, ...patch }));

  const answer = (patch: Partial<Draft>, next: Stage) => {
    update(patch);
    setText("");
    setError(null);
    setStage(next);
  };

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open, stage]);

  async function submit() {
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/contact-leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          email: draft.email,
          service: draft.service || "Not sure yet",
          budget: draft.budget,
          message: [
            `Planned with the site assistant.`,
            `Service: ${draft.service || "Not sure yet"}`,
            `Budget: ${draft.budget || "Not decided"}`,
            `Start: ${draft.timing || "Flexible"}`,
          ].join("\n"),
          website: "",
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; lead?: { shareToken?: string } }
        | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? "Could not send that. Please try again.");
      }
      setShareToken(payload.lead?.shareToken ?? null);
      setStage("done");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not send that.",
      );
    } finally {
      setSending(false);
    }
  }

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello TrishulHub — project enquiry\n\n${summary(draft)}`,
  )}`;
  const mailHref = `mailto:info@trishulhub.in?subject=${encodeURIComponent(
    "Project enquiry",
  )}&body=${encodeURIComponent(`Hello TrishulHub,\n\n${summary(draft)}\n`)}`;

  const optionClass =
    "w-full rounded-xl border border-[#0d3c1f]/15 bg-white px-4 py-2.5 text-left text-sm font-medium text-[#111111] transition hover:border-[#0D3C1F]/40 hover:bg-[#f4faf7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0d9488]";
  const primaryClass =
    "inline-flex w-full items-center justify-center rounded-xl bg-[#0D3C1F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#164a28] disabled:opacity-50";

  return (
    <>
      <button
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-[2147483000] flex h-14 w-14 items-center justify-center rounded-full bg-[#0D3C1F] text-white shadow-[0_14px_34px_rgba(6,43,22,0.32)] transition hover:bg-[#164a28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d9488]"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? (
          <svg
            aria-hidden="true"
            fill="none"
            height="22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="22"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 9 9 0 0 1-2.6-.4L4 21l1.4-4a8.3 8.3 0 0 1-1.3-4.6 8.4 8.4 0 0 1 8.5-8.4A8.4 8.4 0 0 1 21 11.5Z" />
          </svg>
        )}
      </button>

      {open ? (
        <section
          aria-label="Chat with TrishulHub"
          className="fixed bottom-24 right-5 z-[2147483000] flex max-h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-[#0d3c1f]/15 bg-white shadow-[0_28px_70px_rgba(6,43,22,0.28)]"
        >
          <header className="flex items-center gap-3 bg-[#0D3C1F] px-4 py-3 text-white">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[13px] font-bold"
            >
              TH
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">TrishulHub</p>
              <p className="text-[11.5px] text-white/70">
                Usually replies within 1 business day
              </p>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#fafafa] p-4">
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-[#374151] shadow-sm">
              Hi 👋 Planning a project? Three quick questions and I&apos;ll get
              your brief to the team.
            </p>

            {stage === "service" ? (
              <div className="space-y-2">
                <p className="text-[13px] font-semibold text-[#111111]">
                  Which service do you need?
                </p>
                {SERVICES.map((service) => (
                  <button
                    className={optionClass}
                    key={service}
                    onClick={() => answer({ service }, "budget")}
                    type="button"
                  >
                    {service}
                  </button>
                ))}
                <button
                  className={optionClass}
                  onClick={() => answer({ service: "Not sure yet" }, "budget")}
                  type="button"
                >
                  Not sure yet
                </button>
              </div>
            ) : (
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2.5 text-sm text-white">
                {draft.service}
              </p>
            )}

            {stage === "budget" ? (
              <div className="space-y-2">
                <p className="text-[13px] font-semibold text-[#111111]">
                  What is your budget?{" "}
                  <span className="font-normal text-[#6b7280]">
                    Projects start at £1,500.
                  </span>
                </p>
                {BUDGETS.filter((b) => b !== "Custom").map((budget) => (
                  <button
                    className={optionClass}
                    key={budget}
                    onClick={() => answer({ budget }, "timing")}
                    type="button"
                  >
                    {budget}
                  </button>
                ))}
                <div className="flex gap-2">
                  <input
                    aria-label="Custom budget"
                    className="w-full rounded-xl border border-[#0d3c1f]/15 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && text.trim()) {
                        answer({ budget: text.trim() }, "timing");
                      }
                    }}
                    placeholder="Custom amount"
                    value={text}
                  />
                  <button
                    className="rounded-xl bg-[#0D3C1F] px-4 text-sm font-semibold text-white disabled:opacity-40"
                    disabled={!text.trim()}
                    onClick={() => answer({ budget: text.trim() }, "timing")}
                    type="button"
                  >
                    Set
                  </button>
                </div>
              </div>
            ) : draft.budget ? (
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2.5 text-sm text-white">
                {draft.budget}
              </p>
            ) : null}

            {stage === "timing" ? (
              <div className="space-y-2">
                <p className="text-[13px] font-semibold text-[#111111]">
                  When would you like to start?
                </p>
                {TIMINGS.map((timing) => (
                  <button
                    className={optionClass}
                    key={timing}
                    onClick={() => answer({ timing }, "name")}
                    type="button"
                  >
                    {timing}
                  </button>
                ))}
              </div>
            ) : draft.timing ? (
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2.5 text-sm text-white">
                {draft.timing}
              </p>
            ) : null}

            {stage === "name" || stage === "email" ? (
              <div className="space-y-2">
                <p className="text-[13px] font-semibold text-[#111111]">
                  {stage === "name"
                    ? "Great — what is your name?"
                    : "And the best email for the reply?"}
                </p>
                <div className="flex gap-2">
                  <input
                    aria-label={stage === "name" ? "Your name" : "Your email"}
                    autoComplete={stage === "name" ? "name" : "email"}
                    className="w-full rounded-xl border border-[#0d3c1f]/15 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => {
                      const value = text.trim();
                      if (event.key !== "Enter" || !value) return;
                      if (stage === "name") answer({ name: value }, "email");
                      else if (value.includes("@"))
                        answer({ email: value }, "review");
                    }}
                    placeholder={stage === "name" ? "Your name" : "you@company.com"}
                    ref={inputRef}
                    type={stage === "name" ? "text" : "email"}
                    value={text}
                  />
                  <button
                    className="rounded-xl bg-[#0D3C1F] px-4 text-sm font-semibold text-white disabled:opacity-40"
                    disabled={
                      !text.trim() ||
                      (stage === "email" && !text.includes("@"))
                    }
                    onClick={() => {
                      const value = text.trim();
                      if (stage === "name") answer({ name: value }, "email");
                      else answer({ email: value }, "review");
                    }}
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}

            {stage === "review" ? (
              <div className="space-y-3">
                <p className="text-[13px] font-semibold text-[#111111]">
                  Here&apos;s what I&apos;ll send:
                </p>
                <pre className="whitespace-pre-wrap rounded-xl border border-[#0d3c1f]/12 bg-white p-3 text-[12.5px] leading-relaxed text-[#374151]">
                  {summary(draft)}
                </pre>
                {error ? (
                  <p className="text-[12.5px] text-red-600">{error}</p>
                ) : null}
                <button
                  className={primaryClass}
                  disabled={sending}
                  onClick={() => void submit()}
                  type="button"
                >
                  {sending ? "Sending…" : "Send to TrishulHub"}
                </button>
                <div className="flex gap-2">
                  <a
                    className="flex-1 rounded-xl border border-[#d1d5db] px-3 py-2.5 text-center text-[12.5px] font-semibold text-[#111111] transition hover:border-[#0D3C1F]/40"
                    href={waHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    WhatsApp instead
                  </a>
                  <a
                    className="flex-1 rounded-xl border border-[#d1d5db] px-3 py-2.5 text-center text-[12.5px] font-semibold text-[#111111] transition hover:border-[#0D3C1F]/40"
                    href={mailHref}
                  >
                    Email instead
                  </a>
                </div>
              </div>
            ) : null}

            {stage === "done" ? (
              <div className="space-y-3">
                <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-[#374151] shadow-sm">
                  Thanks {draft.name.split(" ")[0]} — your brief is with the team.
                  We reply within one business day, usually with a few questions
                  and a fixed-price plan.
                </p>
                {shareToken ? (
                  <a
                    className={primaryClass}
                    href={`/lead/${shareToken}`}
                  >
                    View your brief
                  </a>
                ) : null}
                <button
                  className="w-full rounded-xl border border-[#d1d5db] px-4 py-2.5 text-sm font-semibold text-[#111111]"
                  onClick={() => {
                    setDraft(EMPTY);
                    setText("");
                    setShareToken(null);
                    setStage("service");
                  }}
                  type="button"
                >
                  Start another enquiry
                </button>
              </div>
            ) : null}
          </div>

          <p className="border-t border-[#0d3c1f]/10 bg-white px-4 py-2 text-[11px] text-[#6b7280]">
            We only use your details to reply to this enquiry.
          </p>
        </section>
      ) : null}
    </>
  );
}
