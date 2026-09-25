// Client-side "AI" engine: deterministic, contextual response templates.
// Frontend-only prototype — no network calls.

const clean = (s: string) => s.trim().replace(/\s+/g, " ");

export const splitPoints = (text: string): string[] =>
  text
    .split(/\n|(?<=[.!?])\s+|;|•|- /)
    .map((p) => clean(p).replace(/^[-*]\s*/, ""))
    .filter((p) => p.length > 2);

const titleCase = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

const nameFromRecipient = (recipient: string) => {
  const r = clean(recipient);
  if (!r) return "there";
  const emailName = (r.includes("@") ? r.split("@")[0] : r) ?? r;
  const first = emailName.split(/[.\s_-]/)[0] ?? emailName;
  return titleCase(first.replace(/[^a-zA-Z]/g, "")) || "there";
};

export type Tone = "formal" | "friendly" | "persuasive";

export function generateEmail(opts: {
  recipient: string;
  purpose: string;
  context: string;
  tone: Tone;
  variant?: number;
}): string {
  const { recipient, purpose, context, tone } = opts;
  const variant = opts.variant ?? 0;
  const name = nameFromRecipient(recipient);
  const points = splitPoints(context);
  const topic = clean(purpose) || (points[0] ?? "our next steps");

  const subjects: Record<Tone, string[]> = {
    formal: [`Regarding ${topic}`, `${titleCase(topic)} — next steps`],
    friendly: [`Quick note on ${topic}`, `${titleCase(topic)} — a quick update`],
    persuasive: [`${titleCase(topic)}: worth a look`, `Why ${topic} matters now`],
  };

  const openers: Record<Tone, string[]> = {
    formal: [
      `Dear ${name},\n\nI hope this message finds you well. I am writing regarding ${topic}.`,
      `Dear ${name},\n\nI wanted to follow up with you on ${topic}.`,
    ],
    friendly: [
      `Hi ${name},\n\nHope your week is going well! I wanted to share a quick update on ${topic}.`,
      `Hi ${name},\n\nJust a quick one about ${topic} — thought it was worth putting in writing.`,
    ],
    persuasive: [
      `Hi ${name},\n\nI'll keep this short, because ${topic} is time-sensitive and I think it's a real opportunity for us.`,
      `Hi ${name},\n\nThere's a clear win available around ${topic}, and I'd like your support to move on it.`,
    ],
  };

  const bodyIntro: Record<Tone, string> = {
    formal: "Please find the key points summarised below:",
    friendly: "Here's the short version:",
    persuasive: "Here's why this is worth your time:",
  };

  const closers: Record<Tone, string[]> = {
    formal: [
      `I would welcome your thoughts at your earliest convenience.\n\nKind regards,\nMaya Chen`,
      `Please let me know if any of the above requires clarification.\n\nKind regards,\nMaya Chen`,
    ],
    friendly: [
      `Let me know what you think — happy to jump on a quick call if that's easier.\n\nThanks so much,\nMaya`,
      `Shout if anything looks off and I'll adjust.\n\nCheers,\nMaya`,
    ],
    persuasive: [
      `Can I get your go-ahead this week so we don't lose the window?\n\nThanks,\nMaya`,
      `If you're comfortable, I'd like to proceed by Friday. Happy to walk you through the detail.\n\nThanks,\nMaya`,
    ],
  };

  const pick = <T,>(arr: T[]) => arr[variant % arr.length];

  const bullets = points.length
    ? points.map((p) => `• ${titleCase(p.replace(/[.]$/, ""))}.`).join("\n")
    : `• ${titleCase(topic)} is the main item to align on.\n• I'd value your input before we proceed.`;

  const ask =
    tone === "persuasive"
      ? "\n\nThe cost of waiting is higher than the cost of acting, and the work is already scoped."
      : "";

  return [
    `Subject: ${pick(subjects[tone])}`,
    "",
    pick(openers[tone]),
    "",
    bodyIntro[tone],
    "",
    bullets + ask,
    "",
    pick(closers[tone]),
  ].join("\n");
}

export type SummaryLength = "brief" | "standard" | "detailed";

export function generateResearch(opts: {
  prompt: string;
  length: SummaryLength;
  variant?: number;
}): string {
  const { prompt, length } = opts;
  const text = clean(prompt);
  const points = splitPoints(prompt);
  const words = text.split(" ").filter(Boolean);
  const topic = words.slice(0, 8).join(" ") || "the topic";
  const isLong = words.length > 60;

  const counts: Record<SummaryLength, number> = { brief: 2, standard: 4, detailed: 6 };
  const n = counts[length];

  const source = points.length >= 2 ? points : words.join(" ").split(/,\s*/);
  const insights = Array.from({ length: n }, (_, i) => {
    const frag = clean(source[i % source.length] ?? topic).slice(0, 160);
    const lenses = [
      `Core idea — ${frag}.`,
      `What it implies — if this holds, teams should plan around ${frag.toLowerCase()}.`,
      `Evidence to check — how strong is the support for "${frag.slice(0, 60)}"?`,
      `Risk — the weakest assumption here is around ${frag.toLowerCase()}.`,
      `Opportunity — ${frag} could be turned into a concrete next action this quarter.`,
      `Counterpoint — consider the case where ${frag.toLowerCase()} does not hold.`,
    ];
    return `${i + 1}. ${lenses[i % lenses.length]}`;
  });

  const overview = isLong
    ? `The material centres on ${topic}. Stripped back, it makes a small number of claims and supports them with context that is mostly descriptive rather than quantitative.`
    : `You asked about ${topic}. Below is a structured read of the question, the angles worth exploring, and where the evidence usually sits.`;

  const followUps = [
    `What evidence would change your view on ${topic}?`,
    `Who owns the decision, and what do they need to see?`,
    `What is the smallest test that would validate this in two weeks?`,
    `What does the counter-case look like, and who would argue it?`,
  ].slice(0, length === "brief" ? 2 : length === "standard" ? 3 : 4);

  return [
    "SUMMARY",
    overview,
    "",
    "KEY INSIGHTS",
    ...insights,
    "",
    "IMPORTANT POINTS",
    `• Focus: ${topic}`,
    `• Depth requested: ${length}`,
    `• Source length: ${words.length} words`,
    "",
    "SUGGESTED FOLLOW-UP QUESTIONS",
    ...followUps.map((q) => `→ ${q}`),
  ].join("\n");
}

export function generateChatReply(prompt: string): string {
  const text = clean(prompt);
  const lower = text.toLowerCase();
  const subject = text.replace(/^(help me|can you|please|could you)\s+/i, "");

  if (/agenda|meeting/.test(lower)) {
    return [
      `Here's a meeting agenda for "${subject}":`,
      "",
      "1. Context & objective (5 min) — why we're here and what a good outcome looks like.",
      "2. Status round (10 min) — each owner shares progress and blockers.",
      "3. Decisions needed (15 min) — the open items that need a call today.",
      "4. Risks & dependencies (10 min).",
      "5. Actions & owners (5 min) — who does what, by when.",
      "",
      "Want me to turn this into an invite-ready description?",
    ].join("\n");
  }

  if (/summar|tl;?dr|shorten/.test(lower)) {
    const pts = splitPoints(text).slice(1, 5);
    return [
      "Here's the condensed version:",
      "",
      ...(pts.length
        ? pts.map((p) => `• ${titleCase(p)}`)
        : [`• The main thread is ${subject}.`, "• Paste the full text and I'll pull out decisions, owners and dates."]),
      "",
      "Tell me if you'd like this as bullets for a status update instead.",
    ].join("\n");
  }

  if (/plan (my )?(week|day)|schedule|prioriti/.test(lower)) {
    return [
      "Here's a plan built around deep work first:",
      "",
      "Mon — Set the week: pick the two outcomes that matter, block 2h of focus in the morning.",
      "Tue — Deep work on outcome one. Keep the afternoon for meetings.",
      "Wed — Mid-week checkpoint, unblock others, review progress.",
      "Thu — Deep work on outcome two, then draft any updates that are due.",
      "Fri — Ship, write the weekly summary, and clear small admin.",
      "",
      `I've framed this around "${subject}" — share your fixed meetings and I'll work around them.`,
    ].join("\n");
  }

  if (/email|reply|draft/.test(lower)) {
    return [
      `Happy to draft that. Here's a first pass on "${subject}":`,
      "",
      "Hi there,",
      "",
      `Following up on ${subject}. I've outlined where things stand and what I need from you, so you can reply in a line or two.`,
      "",
      "Thanks,\nMaya",
      "",
      "Tip: the Smart Email Generator gives you tone control and an editable draft.",
    ].join("\n");
  }

  if (/\?$/.test(text) || /^(what|why|how|when|who|which)/i.test(text)) {
    return [
      `Good question. On "${subject}", here's how I'd think about it:`,
      "",
      "• Start with the decision you're actually trying to make — that narrows the useful information fast.",
      "• Separate what you know from what you're assuming; the assumptions are where the risk lives.",
      "• Then pick the smallest step that produces real evidence this week.",
      "",
      "Want me to research this properly in the Research Assistant?",
    ].join("\n");
  }

  return [
    `Got it — you're working on "${subject}".`,
    "",
    "Here's how I'd approach it:",
    "• Define the outcome in one sentence so success is checkable.",
    "• List the two or three constraints that actually bind (time, people, budget).",
    "• Draft the first version quickly, then refine — momentum beats polish early on.",
    "",
    "Tell me more about the context and I'll get more specific.",
  ].join("\n");
}
