import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Disclaimer } from "@/components/PageHeader";
import { generateResearch, type SummaryLength } from "@/lib/ai-engine";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Vantage Workplace AI" },
      {
        name: "description",
        content:
          "Paste a topic, question or article and get a structured summary with key insights and follow-up questions.",
      },
      { property: "og:title", content: "AI Research Assistant | Vantage Workplace AI" },
      {
        property: "og:description",
        content: "Summarise topics and articles into insights, key points and follow-up questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

const lengths: { value: SummaryLength; label: string }[] = [
  { value: "brief", label: "Brief" },
  { value: "standard", label: "Standard" },
  { value: "detailed", label: "Detailed" },
];

const examples = [
  "What are the trade-offs of a four-day work week for a 40-person agency?",
  "Summarise our Q3 customer churn findings and what they mean for pricing.",
];

function ResearchPage() {
  const [prompt, setPrompt] = useState("");
  const [length, setLength] = useState<SummaryLength>("standard");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setCopied(false);
    window.setTimeout(() => {
      setOutput(generateResearch({ prompt, length }));
      setLoading(false);
    }, 1000);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <PageHeader
        title="AI Research Assistant"
        subtitle="Turn a topic, question or article into a structured brief."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <section className="glass rounded-2xl p-5 lg:col-span-2">
          <label className="text-[13px] font-medium text-ink-muted" htmlFor="prompt">
            Topic, question or article text
          </label>
          <textarea
            id="prompt"
            rows={10}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste an article, or ask a question like 'How should we price our new tier?'"
            className="glass-soft mt-1.5 w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-ink-subtle/70 focus:ring-2 focus:ring-brand/40"
          />

          <div className="mt-3 flex flex-wrap gap-1.5">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setPrompt(ex)}
                className="glass-soft rounded-full px-3 py-1.5 text-left text-[12px] font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {ex}
              </button>
            ))}
          </div>

          <p className="mt-4 text-[13px] font-medium text-ink-muted">Summary length</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {lengths.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLength(l.value)}
                className={
                  length === l.value
                    ? "h-10 rounded-xl gradient-brand px-4 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/30"
                    : "glass-soft h-10 rounded-xl px-4 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                }
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={run}
            disabled={loading || !prompt.trim()}
            className="mt-5 h-11 w-full rounded-xl gradient-brand text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
          >
            {loading ? "Summarising…" : "Summarise"}
          </button>
        </section>

        <section className="glass rounded-2xl p-5 lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Summary</h2>
            <button
              type="button"
              onClick={copy}
              disabled={!output}
              className="glass-soft h-9 rounded-xl px-3 text-[13px] font-medium text-ink disabled:opacity-40"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[80, 95, 65, 90, 75, 55].map((w, i) => (
                <div
                  key={i}
                  className="h-3.5 animate-pulse rounded-full bg-accent2/20"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          ) : output ? (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              rows={22}
              className="glass-soft w-full resize-none rounded-xl p-4 text-sm leading-relaxed text-ink outline-none focus:ring-2 focus:ring-brand/40"
            />
          ) : (
            <div className="glass-soft flex min-h-[320px] flex-col items-center justify-center rounded-xl p-8 text-center">
              <div className="grid size-12 place-items-center rounded-xl bg-accent-tint text-xl text-accent2">
                ⌕
              </div>
              <p className="mt-3 font-display text-[15px] font-semibold">Nothing to summarise yet</p>
              <p className="mt-1 max-w-sm text-[13px] text-ink-subtle">
                Paste an article or ask a question. You'll get key insights, important points and
                follow-up questions you can edit.
              </p>
            </div>
          )}
        </section>
      </div>

      <Disclaimer />
    </>
  );
}
