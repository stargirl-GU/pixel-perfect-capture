import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader, Disclaimer } from "@/components/PageHeader";
import { generateChatReply } from "@/lib/ai-engine";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chat | Vantage Workplace AI" },
      {
        name: "description",
        content:
          "Chat with a workplace assistant to draft agendas, summarise notes and plan your week.",
      },
      { property: "og:title", content: "AI Workplace Chat | Vantage Workplace AI" },
      {
        property: "og:description",
        content: "A workplace assistant for agendas, summaries and weekly planning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

type Msg = { id: number; role: "user" | "ai"; text: string };

const suggestions = [
  "Draft a meeting agenda for the Q3 launch review",
  "Summarise this thread into three bullets",
  "Help me plan my week",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    idRef.current += 1;
    setMessages((m) => [...m, { id: idRef.current, role: "user", text: value }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      idRef.current += 1;
      setMessages((m) => [...m, { id: idRef.current, role: "ai", text: generateChatReply(value) }]);
      setTyping(false);
    }, 950);
  };

  return (
    <>
      <PageHeader
        title="AI Workplace Chat"
        subtitle="Ask for agendas, summaries, plans and drafts."
        action={
          <span className="glass-soft flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium text-ink-muted">
            <span className="size-2 rounded-full bg-success" /> Online
          </span>
        }
      />

      <div className="glass flex h-[calc(100vh-14rem)] min-h-[520px] flex-col rounded-2xl p-5">
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.length === 0 && !typing && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid size-12 place-items-center rounded-xl bg-violet-tint text-xl text-brand">
                ◍
              </div>
              <p className="mt-3 font-display text-[15px] font-semibold">
                What are we working on today?
              </p>
              <p className="mt-1 max-w-sm text-[13px] text-ink-subtle">
                Ask about anything work-related — I'll shape a practical answer around your words.
              </p>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user"
                  ? "ml-auto max-w-[85%] animate-rise whitespace-pre-line rounded-2xl rounded-tr-sm gradient-brand p-3 text-sm text-brand-foreground"
                  : "glass-soft max-w-[85%] animate-rise whitespace-pre-line rounded-2xl rounded-tl-sm p-3 text-sm"
              }
            >
              {m.text}
            </div>
          ))}

          {typing && (
            <div className="glass-soft flex max-w-[85%] items-center gap-1.5 rounded-2xl rounded-tl-sm p-4">
              <span className="size-2 animate-bounce rounded-full bg-brand" />
              <span className="size-2 animate-bounce rounded-full bg-brand [animation-delay:150ms]" />
              <span className="size-2 animate-bounce rounded-full bg-brand [animation-delay:300ms]" />
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="glass-soft rounded-full px-3 py-1.5 text-[12px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="glass-soft mt-3 flex items-center gap-2 rounded-xl p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            aria-label="Message the assistant"
            className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-ink-subtle/70"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="grid size-9 shrink-0 place-items-center rounded-lg gradient-brand text-brand-foreground disabled:opacity-40"
            aria-label="Send message"
          >
            ↑
          </button>
        </form>
      </div>

      <Disclaimer />
    </>
  );
}
