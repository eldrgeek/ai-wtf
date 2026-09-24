import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUBSTACK_NAME, SUBSTACK_SUBSCRIBE_URL } from "@/data/substackLinks";

interface SubscribeButtonProps {
  /** "solid" is gold-on-navy for the dark home page; "light" uses theme tokens. */
  tone?: "solid" | "light" | "outline";
  className?: string;
  children?: React.ReactNode;
}

// A plain link. Substack's embed iframe is deliberately not used: this must
// work with no third-party script and cost nothing to load.
export function SubscribeButton({ tone = "light", className, children }: SubscribeButtonProps) {
  const tones = {
    solid: "bg-[#d4a853] text-[#0a1628] hover:bg-[#e2bb6a] focus-visible:ring-[#d4a853]",
    light: "bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-ring",
    outline:
      "border border-[#d4a853]/60 text-[#f5f0e6] hover:border-[#d4a853] hover:bg-[#d4a853]/10 focus-visible:ring-[#d4a853]",
  } as const;
  return (
    <a
      href={SUBSTACK_SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Subscribe to ${SUBSTACK_NAME} on Substack (opens in a new tab)`}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-2 font-sans text-base font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        tones[tone],
        className,
      )}
    >
      {children ?? "Subscribe on Substack"}
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
