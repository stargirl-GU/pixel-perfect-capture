import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageHeader, Disclaimer } from "@/components/PageHeader";
import { generateEmail, type Tone } from "@/lib/ai-engine";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Vantage Workplace AI" },
      {
        name: "description",
        content:
          "Turn a recipient, a few key points and a tone into a polished, editable work email in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator | Vantage Workplace AI" },
      {
        property: "og:description",
        content: "Draft professional emails from key points with formal, friendly or persuasive tone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

const tones: { value: Tone; label: string }[] = [
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "persuasive", label: "Persuasive" },
];

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("friendly");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const variant = useRef(0);

  const run = (next = false) => {
    if (!context.trim() && !purpose.trim()) return;
    if (next) variant.current += 1;
    setLoading(true);
    setCopied(false);
    window.setTimeout(() => {
      setOutput(generateEmail({ recipient, purpose, context, tone, variant: variant.current }));
      setLoading(false);
    }, 900);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <PageHeader
        title="Smart Email Generator"
        subtitle="Turn a few key points into a polished draft."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <section className="glass rounded-2xl p-5 lg:col-span-2">
          <label className="text-[13px] font-medium text-ink-muted" htmlFor="recipient">
            Recipient
          </label>
          <input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="priya@northwind.co"
            className="glass-soft mt-1.5 h-11 w-full rounded-xl px-3 text-sm outline-none placeholder:text-ink-subtle/70 focus:ring-2 focus:ring-brand/40"
          />

          <label className="mt-4 block text-[13px] font-medium text-ink-muted" htmlFor="purpose">
            Purpose
          </label>
          <input
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="the Q3 budget sign-off"
            className="glass-soft mt-1.5 h-11 w-full rounded-xl px-3 text-sm outline-none placeholder:text-ink-subtle/70 focus:ring-2 focus:ring-brand/40"
          />

          <label className="mt-4 block text-[13px] font-medium text-ink-muted" htmlFor="context">
            Key points / context
          </label>
          <textarea
            id="context"
            rows={6}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={"Meeting moved to Thursday 2pm\nNeed design sign-off by Friday\nBudget update still outstanding from finance"}
            className="glass-soft mt-1.5 w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-ink-subtle/70 focus:ring-2 focus:ring-brand/40"
          />

          <p className="mt-4 text-[13px] font-medium text-ink-muted">Tone</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tones.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTone(t.value)}
                className={
                  tone === t.value
                    ? "h-10 rounded-xl gradient-brand px-4 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/30"
                    : "glass-soft h-10 rounded-xl px-4 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => run(false)}
            disabled={loading || (!context.trim() && !purpose.trim())}
            className="mt-5 h-11 w-full rounded-xl gradient-brand text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
          >
            {loading ? "Generating…" : "Generate Email"}
          </button>
        </section>

        <section className="glass rounded-2xl p-5 lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Draft</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copy}
                disabled={!output}
                className="glass-soft h-9 rounded-xl px-3 text-[13px] font-medium text-ink disabled:opacity-40"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={() => run(true)}
                disabled={!output || loading}
                className="glass-soft h-9 rounded-xl px-3 text-[13px] font-medium text-ink disabled:opacity-40"
              >
                Regenerate
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[90, 70, 100, 85, 60].map((w, i) => (
                <div
                  key={i}
                  className="h-3.5 animate-pulse rounded-full bg-brand/15"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          ) : output ? (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              rows={20}
              className="glass-soft w-full resize-none rounded-xl p-4 font-sans text-sm leading-relaxed text-ink outline-none focus:ring-2 focus:ring-brand/40"
            />
          ) : (
            <div className="glass-soft flex min-h-[320px] flex-col items-center justify-center rounded-xl p-8 text-center">
              <div className="grid size-12 place-items-center rounded-xl bg-brand-tint text-xl text-brand">
                ✉
              </div>
              <p className="mt-3 font-display text-[15px] font-semibold">No draft yet</p>
              <p className="mt-1 max-w-sm text-[13px] text-ink-subtle">
                Add a recipient, a purpose and a few bullet points — the draft appears here and
                stays fully editable.
              </p>
            </div>
          )}
        </section>
      </div>

      <Disclaimer />
    </>
  );
}
