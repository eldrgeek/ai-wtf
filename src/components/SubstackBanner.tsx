import { useState } from "react";
import { X } from "lucide-react";
import { SUBSTACK_NAME, SUBSTACK_SUBSCRIBE_URL } from "@/data/substackLinks";

// Site-wide bar. Added 2026-09-15 as the "since January" notice; retargeted
// to the Substack 2026-09-23 (redesign-verso). New storage key on purpose, so
// visitors who dismissed the old notice see this one once.
const DISMISS_KEY = "ai-wtf-substack-banner-dismissed";

function readDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "true";
  } catch {
    return false;
  }
}

export function SubstackBanner() {
  const [dismissed, setDismissed] = useState(readDismissed);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Storage can be blocked; the bar still hides for this visit.
    }
  };

  return (
    <div className="relative z-[60] w-full bg-[#1a1a2e] text-[#f0e6d2] border-b border-[#d4a853]/40">
      <div className="container flex items-center justify-between gap-3 py-2 text-sm font-sans">
        <p className="m-0 leading-snug">
          AI WTF now lives on Substack too.{" "}
          <a
            href={SUBSTACK_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d4a853] font-semibold hover:underline"
          >
            Subscribe to {SUBSTACK_NAME} &rarr;
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="flex-shrink-0 rounded p-2 -m-1 text-[#f0e6d2]/70 hover:text-[#f0e6d2]"
          aria-label="Dismiss this notice"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
