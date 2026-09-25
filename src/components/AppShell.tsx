import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import avatar from "@/assets/avatar-maya.jpg";

const nav = [
  { to: "/", label: "Dashboard", glyph: "◈" },
  { to: "/email", label: "Smart Email Generator", glyph: "✉" },
  { to: "/research", label: "AI Research Assistant", glyph: "⌕" },
  { to: "/chat", label: "AI Workplace Chat", glyph: "◍" },
] as const;

const insights = [
  { label: "Weekly Report", glyph: "◷" },
  { label: "Settings", glyph: "⚙" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="glass flex h-full flex-col rounded-2xl p-5">
      <div className="mb-8 flex items-center gap-2.5 px-1">
        <div className="grid size-9 place-items-center rounded-xl gradient-brand font-display text-lg font-bold text-brand-foreground">
          V
        </div>
        <div>
          <p className="font-display text-[15px] font-bold leading-none">Vantage</p>
          <p className="mt-1 text-[11px] text-ink-subtle">Workplace AI</p>
        </div>
      </div>

      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-subtle">
        Workspace
      </p>
      <nav className="space-y-1">
        {nav.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={
                active
                  ? "flex items-center gap-3 rounded-xl gradient-brand px-3 py-2.5 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/30"
                  : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-white/60 hover:text-ink"
              }
            >
              <span className="text-base">{item.glyph}</span> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-subtle">
          Insights
        </p>
        {insights.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-muted transition-colors hover:bg-white/60 hover:text-ink"
          >
            <span className="text-base">{item.glyph}</span> {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="glass-soft flex items-center gap-3 rounded-xl p-3">
          <img
            src={avatar}
            alt="Maya Chen"
            loading="lazy"
            width={816}
            height={816}
            className="size-9 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Maya Chen</p>
            <p className="truncate text-[11px] text-ink-subtle">Product Lead</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen text-ink">
      <aside className="hidden w-64 shrink-0 p-4 lg:block">
        <div className="sticky top-4 h-[calc(100vh-2rem)]">
          <SidebarContent />
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 w-72 p-4">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 p-4 sm:p-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="glass mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink lg:hidden"
        >
          <span className="text-base">☰</span> Menu
        </button>
        {children}
      </main>
    </div>
  );
}
