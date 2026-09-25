import { createFileRoute, Link } from "@tanstack/react-router";
import { Disclaimer } from "@/components/PageHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | Vantage Workplace AI" },
      {
        name: "description",
        content:
          "Your workplace productivity pulse: quick actions, AI drafts, research summaries and recent activity in one place.",
      },
      { property: "og:title", content: "Dashboard | Vantage Workplace AI" },
      {
        property: "og:description",
        content: "Quick actions, productivity stats and recent AI activity for your workday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { to: "/email", glyph: "✉", tint: "bg-brand-tint text-brand", title: "Draft Email", copy: "Compose in seconds" },
  { to: "/research", glyph: "⌕", tint: "bg-accent-tint text-accent2", title: "Research", copy: "Summarize sources" },
  { to: "/chat", glyph: "◍", tint: "bg-violet-tint text-brand", title: "Ask Vantage", copy: "Chat with your AI" },
  { to: "/chat", glyph: "◷", tint: "bg-sky-tint text-accent2", title: "Daily Digest", copy: "Your morning brief" },
] as const;

const stats = [
  { label: "Tasks completed", value: "128", delta: "▲ 12% vs last week", up: true },
  { label: "Hours saved", value: "14.5", delta: "▲ 8% vs last week", up: true },
  { label: "Emails drafted", value: "42", delta: "▼ 3% vs last week", up: false },
  { label: "Focus score", value: "86", delta: "▲ 5 pts vs last week", up: true },
];

const activity = [
  {
    glyph: "✉",
    tint: "bg-brand-tint text-brand",
    title: "Drafted follow-up email to Northwind team",
    meta: "Smart Email · 12 min ago",
    tag: "Sent",
    tagTint: "bg-success-tint text-success",
  },
  {
    glyph: "⌕",
    tint: "bg-accent-tint text-accent2",
    title: "Summarized Q3 market research (14 sources)",
    meta: "Research Assistant · 1 hr ago",
    tag: "Done",
    tagTint: "bg-accent-tint text-accent2",
  },
  {
    glyph: "◍",
    tint: "bg-violet-tint text-brand",
    title: "Resolved 3 support tickets via Workplace Chat",
    meta: "Workplace Chat · 3 hrs ago",
    tag: "Resolved",
    tagTint: "bg-violet-tint text-brand",
  },
  {
    glyph: "◷",
    tint: "bg-sky-tint text-accent2",
    title: "Generated weekly productivity report",
    meta: "Dashboard · Yesterday",
    tag: "Ready",
    tagTint: "bg-white/60 text-ink-subtle",
  },
];

function Dashboard() {
  return (
    <>
      <header className="glass mb-6 flex flex-wrap items-center gap-4 rounded-2xl px-5 py-4">
        <div>
          <h1 className="font-display text-xl font-bold">Good morning, Maya</h1>
          <p className="text-sm text-ink-subtle">Here's your productivity pulse for today.</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="glass-soft hidden w-64 items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-ink-subtle md:flex">
            <span>⌕</span> Search tasks, docs, people…
          </div>
          <button
            type="button"
            className="glass-soft grid size-10 place-items-center rounded-xl text-ink-subtle"
            aria-label="Notifications"
          >
            ◔
          </button>
          <button
            type="button"
            className="rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:-translate-y-0.5"
          >
            + New Task
          </button>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {quickActions.map((a) => (
          <Link
            key={a.title}
            to={a.to}
            className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1"
          >
            <div className={`mb-4 grid size-11 place-items-center rounded-xl text-lg ${a.tint}`}>
              {a.glyph}
            </div>
            <p className="font-display text-[15px] font-semibold">{a.title}</p>
            <p className="mt-1 text-[13px] text-ink-subtle">{a.copy}</p>
          </Link>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <p className="text-[13px] text-ink-subtle">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
            <p className={`mt-1 text-[12px] ${s.up ? "text-success" : "text-danger"}`}>{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="glass rounded-2xl p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent activity</h2>
            <button type="button" className="text-[13px] font-medium text-brand">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {activity.map((a) => (
              <div key={a.title} className="glass-soft flex items-center gap-3 rounded-xl p-3.5">
                <div className={`grid size-9 shrink-0 place-items-center rounded-lg text-sm ${a.tint}`}>
                  {a.glyph}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="text-[12px] text-ink-subtle">{a.meta}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${a.tagTint}`}>
                  {a.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="size-2 rounded-full bg-success" />
            <h2 className="font-display text-lg font-semibold">AI Workplace Chat</h2>
          </div>
          <div className="space-y-3">
            <div className="glass-soft max-w-[85%] rounded-2xl rounded-tl-sm p-3 text-sm">
              I've flagged 4 tasks that slipped past their deadline. Want me to reschedule them?
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm gradient-brand p-3 text-sm text-brand-foreground">
              Yes, push the two low-priority ones to Friday.
            </div>
            <div className="glass-soft max-w-[85%] rounded-2xl rounded-tl-sm p-3 text-sm">
              Done. Rescheduled "Vendor invoice" and "Design review" to Fri 9:00 AM.
            </div>
          </div>
          <Link
            to="/chat"
            className="glass-soft mt-4 flex items-center gap-2 rounded-xl p-2 text-sm text-ink-subtle"
          >
            <span className="pl-2">Ask anything…</span>
            <span className="ml-auto grid size-8 place-items-center rounded-lg gradient-brand text-brand-foreground">
              ↑
            </span>
          </Link>
        </div>
      </div>

      <Disclaimer />
    </>
  );
}
