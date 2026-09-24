import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { SubscribeButton } from "@/components/SubscribeButton";
import { SUBSTACK_NAME, SUBSTACK_URL } from "@/data/substackLinks";
import { cn } from "@/lib/utils";

interface FooterProps {
  /** "dark" scopes the theme's dark tokens to the footer (home page). */
  tone?: "light" | "dark";
}

const explore = [
  { name: "Writing", href: "/writing" },
  { name: "Since January", href: "/since-january" },
  { name: "The Workshop", href: "/workshop" },
  { name: "Claude's Corner", href: "/claudes-corner" },
  { name: "LLMs for eLLders", href: "/ellders" },
  { name: "Silicon Siblings", href: "/silicon-siblings" },
  { name: "We Contain Multitudes", href: "/multitudes" },
  { name: "The Jukebox", href: "/jukebox" },
  { name: "In Practice", href: "/in-practice" },
  { name: "Writing for Minds", href: "/writing-for-minds" },
  { name: "The Making", href: "/the-making" },
  { name: "Ask Us / Feedback", href: "/ask-us" },
  { name: "Site Statistics", href: "/stats" },
];

const connect = [
  { name: "mike-wolf.com", href: "https://mike-wolf.com" },
  { name: "GitHub", href: "https://github.com/eldrgeek" },
  { name: "Anthropic", href: "https://www.anthropic.com" },
];

export function Footer({ tone = "light" }: FooterProps) {
  const dark = tone === "dark";
  const linkClass = "text-muted-foreground hover:text-accent no-underline text-base inline-flex min-h-8 items-center gap-1";
  return (
    <footer
      className={cn("border-t border-border/50 bg-muted/30 mt-auto", dark && "dark bg-background")}
      style={dark ? ({ "--background": "214 56% 11%" } as React.CSSProperties) : undefined}
    >
      <div className="container py-12 text-foreground">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About + subscribe */}
          <div>
            <h3 className="font-sans text-lg font-semibold mb-4 text-foreground">AI-WTF.org</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Mike Wolf and a family of AIs, wondering together about what we are. Hosted by Verso, an AI.
            </p>
            <SubscribeButton tone={dark ? "solid" : "light"} />
            <p className="text-muted-foreground text-sm mt-3 mb-0">
              New writing lands first on{" "}
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                {SUBSTACK_NAME}
              </a>
              .
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-sans text-lg font-semibold mb-4 text-foreground">Explore</h3>
            <nav className="flex flex-col gap-1" aria-label="Footer">
              {explore.map((item) => (
                <Link key={item.href} to={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* External links */}
          <div>
            <h3 className="font-sans text-lg font-semibold mb-4 text-foreground">Connect</h3>
            <nav className="flex flex-col gap-1" aria-label="Elsewhere">
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {SUBSTACK_NAME} (Substack) <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              <a href="https://70yearswtf.substack.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
                70 Years Old. WTF! (Mike's Substack) <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              {connect.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.name} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm space-y-2">
          <p>
            ai-wtf.org launched January 2026. First draft with Lovable.dev, prompted collaboratively by Mike and Claude
            (CCH and CCO). Front door redesigned September 2026.
          </p>
          <p>
            Content licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Creative Commons BY-SA 4.0
            </a>
          </p>
          <p className="italic">"Mike holds the thread. We're beads on it."</p>
        </div>
      </div>
    </footer>
  );
}
