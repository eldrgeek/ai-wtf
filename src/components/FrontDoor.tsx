import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowDown, ExternalLink, Send } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SubscribeButton } from "@/components/SubscribeButton";
import { cn } from "@/lib/utils";
import {
  HOST,
  QUESTIONS,
  staticAnswerer,
  type Answerer,
  type FrontDoorLink,
  type FrontDoorQuestion,
} from "@/data/frontDoor";

// The front door. SOMA-APP-STANDARD §22: the host opens, questions float,
// asking navigates, scrolling still works. Added 2026-09-23 (redesign-verso).
//
// Palette matches the rest of the home page (IndexScroll): navy, cream,
// gold, terracotta, sage, lavender.

interface FrontDoorProps {
  answerer?: Answerer;
  /** Anchor the "scroll and read" affordance targets. */
  readAnchor?: string;
}

type Reply =
  | { kind: "idle" }
  | { kind: "question"; item: FrontDoorQuestion; asked?: string }
  | { kind: "fallback"; asked: string; text: string[]; link?: FrontDoorLink };

const ASK_PARAM = "ask";

function scrollToAnchor(anchor: string, reduced: boolean) {
  const el = document.getElementById(anchor.replace(/^#/, ""));
  el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function AnswerLink({ link, reduced }: { link: FrontDoorLink; reduced: boolean }) {
  const cls =
    "inline-flex min-h-12 items-center gap-2 rounded-md bg-[#81b29a] px-5 font-sans text-base font-semibold text-[#0a1628] no-underline hover:bg-[#93c2ab] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#81b29a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1a2d]";
  if (link.to.startsWith("#")) {
    return (
      <a
        href={link.to}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          scrollToAnchor(link.to, reduced);
        }}
      >
        {link.label} <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }
  if (/^https?:\/\//.test(link.to)) {
    return (
      <a href={link.to} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label} <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link to={link.to} className={cls}>
      {link.label} <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export function FrontDoor({ answerer = staticAnswerer, readAnchor = "#made-this" }: FrontDoorProps) {
  const reduced = usePrefersReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const [reply, setReply] = useState<Reply>(() => {
    const id = searchParams.get(ASK_PARAM);
    const item = id ? QUESTIONS.find((q) => q.id === id) : undefined;
    return item ? { kind: "question", item } : { kind: "idle" };
  });
  const [query, setQuery] = useState("");
  const answerRef = useRef<HTMLDivElement>(null);
  const answerHeadingRef = useRef<HTMLParagraphElement>(null);

  const activeId = reply.kind === "question" ? reply.item.id : null;

  const choose = useCallback(
    (item: FrontDoorQuestion, asked?: string) => {
      setReply({ kind: "question", item, asked });
      const next = new URLSearchParams(searchParams);
      next.set(ASK_PARAM, item.id);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  // After a reply lands: bring it on screen and hand focus to it, so keyboard
  // and screen-reader users land on the answer rather than staying on the chip.
  useEffect(() => {
    if (reply.kind === "idle") return;
    const el = answerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom > window.innerHeight || rect.top < 0) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
    }
    answerHeadingRef.current?.focus({ preventScroll: true });
  }, [reply, reduced]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const asked = query.trim();
    if (!asked) return;
    const result = await answerer(asked);
    if (result.match) {
      choose(result.match, asked);
    } else {
      setReply({ kind: "fallback", asked, text: result.fallback ?? HOST.fallback, link: result.fallbackLink ?? HOST.fallbackLink });
    }
  };

  return (
    <section
      id="front-door"
      aria-labelledby="verso-greeting"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#0d1a2d] px-4 py-14 md:py-20"
    >
      {/* Ambient glow. Decorative; sits under everything. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#e07a5f]/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#81b29a]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Host */}
        <div className="mb-6 flex items-center gap-3 font-sans">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#81b29a] bg-[#0f1d30] text-xl font-bold text-[#81b29a]"
            aria-hidden="true"
          >
            V
          </div>
          <div className="leading-tight">
            <p className="m-0 text-lg font-semibold text-[#f5f0e6]">{HOST.name}</p>
            <p className="m-0 text-xs uppercase tracking-widest text-[#81b29a]">{HOST.label}</p>
          </div>
          <p className="m-0 ml-auto hidden text-sm tracking-wide text-[#d4a853] sm:block" aria-hidden="true">
            AI? WTF?
          </p>
        </div>

        {/* Greeting: the first thing above the fold */}
        <h1 id="verso-greeting" className="mb-8 font-display text-2xl leading-snug text-[#f5f0e6] sm:text-3xl md:text-4xl">
          {HOST.greeting.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Input */}
        <form onSubmit={submit} className="mb-2 flex gap-2" role="search" aria-label="Ask Verso">
          <label htmlFor="verso-input" className="sr-only">
            Ask Verso a question
          </label>
          <input
            id="verso-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={HOST.inputPlaceholder}
            autoComplete="off"
            className="min-h-12 w-full flex-1 rounded-md border border-[#b8a9c9]/40 bg-[#0f1d30] px-4 font-sans text-base text-[#f5f0e6] placeholder:text-[#b8a9c9]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-md bg-[#d4a853] px-4 font-sans text-base font-semibold text-[#0a1628] hover:bg-[#e2bb6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1a2d]"
          >
            <span className="hidden sm:inline">Ask</span>
            <Send className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:hidden">Ask</span>
          </button>
        </form>
        <p className="mb-8 font-sans text-xs text-[#b8a9c9]">{HOST.disclosure}</p>

        {/* Question cloud */}
        <ul className="m-0 mb-8 flex list-none flex-wrap justify-center gap-x-3 gap-y-3 p-0 md:gap-x-4 md:gap-y-4" aria-label="Questions to ask Verso">
          {QUESTIONS.map((item, i) => {
            const active = item.id === activeId;
            return (
              <li
                key={item.id}
                className={cn(!reduced && "fd-float")}
                style={
                  reduced
                    ? undefined
                    : { animationDelay: `${(i * 0.37) % 2.2}s`, animationDuration: `${5 + (i % 4)}s` }
                }
              >
                <button
                  type="button"
                  onClick={() => choose(item)}
                  aria-expanded={active}
                  aria-controls="verso-answer"
                  className={cn(
                    "min-h-12 rounded-full border px-4 py-2 text-left font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1a2d]",
                    item.canonical ? "text-base font-semibold md:text-lg" : "text-sm md:text-base",
                    active
                      ? "border-[#d4a853] bg-[#d4a853] text-[#0a1628]"
                      : item.canonical
                        ? "border-[#d4a853]/70 bg-[#d4a853]/10 text-[#f5f0e6] hover:bg-[#d4a853]/25"
                        : "border-[#b8a9c9]/40 bg-[#0f1d30]/70 text-[#e9e2d6] hover:border-[#b8a9c9] hover:bg-[#1a2638]",
                  )}
                >
                  {item.question}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Answer. Region so screen readers can jump to it; polite so a click
            is announced without interrupting. */}
        <div
          id="verso-answer"
          ref={answerRef}
          role="region"
          aria-live="polite"
          aria-label="Verso's answer"
          className={cn(
            "mb-8 rounded-lg border border-[#81b29a]/40 bg-[#0f1d30]/80 p-5 md:p-6",
            reply.kind === "idle" && "hidden",
          )}
        >
          {reply.kind !== "idle" && (
            <>
              <p
                ref={answerHeadingRef}
                tabIndex={-1}
                className="mb-3 font-sans text-sm text-[#b8a9c9] focus-visible:outline-none"
              >
                <span className="text-[#e07a5f]">You:</span>{" "}
                {reply.kind === "question" ? reply.asked ?? reply.item.question : reply.asked}
              </p>
              <p className="mb-2 font-sans text-xs uppercase tracking-widest text-[#81b29a]">{HOST.name}</p>
              <div className="space-y-3 text-[#f5f0e6]">
                {(reply.kind === "question" ? reply.item.answer : reply.text).map((para, i) => (
                  <p key={i} className="m-0 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-5">
                {reply.kind === "question" ? (
                  <AnswerLink link={reply.item.link} reduced={reduced} />
                ) : reply.link ? (
                  <AnswerLink link={reply.link} reduced={reduced} />
                ) : null}
              </div>
            </>
          )}
        </div>

        {/* Two ways out: subscribe, or read */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <SubscribeButton tone="outline" />
          <a
            href={readAnchor}
            onClick={(e) => {
              e.preventDefault();
              scrollToAnchor(readAnchor, reduced);
            }}
            className="inline-flex min-h-12 items-center gap-2 font-sans text-base text-[#b8a9c9] no-underline hover:text-[#f5f0e6]"
          >
            or scroll and read <ArrowDown className={cn("h-5 w-5", !reduced && "animate-bounce")} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
