import { useLocation } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { essayForRoute, substackPostUrl } from "@/data/substackLinks";

interface AlsoOnSubstackProps {
  /** Defaults to the current route. Pass explicitly when the essay lives
   *  inside another page (the home essay). */
  route?: string;
  tone?: "light" | "dark";
  className?: string;
}

// One line under an essay title. Renders nothing for routes that are not in
// src/data/substackLinks.ts, so it is safe to drop onto any page.
export function AlsoOnSubstack({ route, tone = "light", className }: AlsoOnSubstackProps) {
  const location = useLocation();
  const essay = essayForRoute(route ?? location.pathname);
  if (!essay) return null;
  return (
    <p className={cn("font-sans text-sm", tone === "dark" ? "text-[#b8a9c9]" : "text-muted-foreground", className)}>
      <a
        href={substackPostUrl(essay.slug)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex min-h-8 items-center gap-1 no-underline hover:underline",
          tone === "dark" ? "text-[#d4a853]" : "text-accent",
        )}
      >
        Also on Substack <span aria-hidden="true">&rarr;</span>
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </p>
  );
}
