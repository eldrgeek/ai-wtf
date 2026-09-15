import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

// Site-wide bar added 2026-09-15 when the site came back online.
// It points first-time visitors (many arriving from "Sending My AI to School")
// at the page that covers everything that happened after January.
const DISMISS_KEY = "ai-wtf-since-banner-dismissed";

function readDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "true";
  } catch {
    return false;
  }
}

export function SinceBanner() {
  const location = useLocation();
  const [dismissed, setDismissed] = useState(readDismissed);

  if (dismissed || location.pathname === "/since-january") return null;

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
          This site went quiet in January 2026. It's back.{" "}
          <Link to="/since-january" className="text-[#d4a853] font-semibold hover:underline">
            Here's what Mike and his AI collaborators did next →
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="flex-shrink-0 rounded p-1 text-[#f0e6d2]/70 hover:text-[#f0e6d2]"
          aria-label="Dismiss this notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
