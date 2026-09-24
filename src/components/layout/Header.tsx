import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubscribeButton } from "@/components/SubscribeButton";
import { cn } from "@/lib/utils";

// Nav restructured 2026-09-23 (redesign-verso): six primary items, the rest
// under "More". Nothing was removed; the mobile sheet lists everything flat.
const primary = [
  { name: "Home", href: "/" },
  { name: "Writing", href: "/writing" },
  { name: "Since January", href: "/since-january" },
  { name: "Workshop", href: "/workshop" },
  { name: "Silicon Siblings", href: "/silicon-siblings" },
  { name: "Claude's Corner", href: "/claudes-corner" },
];

const more = [
  { name: "LLMs for eLLders", href: "/ellders" },
  { name: "We Contain Multitudes", href: "/multitudes" },
  { name: "The Jukebox", href: "/jukebox" },
  { name: "In Practice", href: "/in-practice" },
  { name: "Writing for Minds", href: "/writing-for-minds" },
  { name: "The Making", href: "/the-making" },
  { name: "Ask Us", href: "/ask-us" },
  { name: "Site Statistics", href: "/stats" },
];

interface HeaderProps {
  /** "dark" scopes the theme's dark tokens to the header (home page). */
  tone?: "light" | "dark";
}

export function Header({ tone = "light" }: HeaderProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";
  const moreActive = more.some((item) => item.href === location.pathname);

  const linkClass = (active: boolean, mobile = false) =>
    cn(
      "font-sans font-medium rounded-md transition-colors no-underline",
      mobile ? "px-4 py-3 text-base min-h-12 flex items-center" : "px-3 py-2 text-sm",
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        dark && "dark",
      )}
      style={dark ? ({ "--background": "214 56% 11%" } as React.CSSProperties) : undefined}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* The logo's text is light (#e8e8e8); on the light header it sits on a navy chip. */}
        <Link
          to="/"
          className={cn("flex items-center gap-2 no-underline rounded-md", !dark && "bg-[#0a1628] px-2 py-1")}
          aria-label="AI-WTF.org home"
        >
          <img src="/logo-mark.png" alt="" className="h-9 w-9 hover:opacity-80 transition-opacity" />
          <span className="font-sans text-base font-bold tracking-tight text-[#f5f0e6]">
            AI-WTF<span className="font-normal text-[#b8a9c9]">.org</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {primary.map((item) => (
            <Link key={item.href} to={item.href} className={linkClass(location.pathname === item.href)}>
              {item.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(linkClass(moreActive), "inline-flex items-center gap-1")}>
              More <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn(dark && "dark")}>
              {more.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link to={item.href} className="no-underline min-h-10 cursor-pointer">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <SubscribeButton
            tone={dark ? "solid" : "light"}
            className="hidden sm:inline-flex min-h-10 px-4 text-sm"
          >
            Subscribe
          </SubscribeButton>

          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={cn("w-72 overflow-y-auto", dark && "dark")}>
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <nav className="flex flex-col gap-1 mt-8" aria-label="Site">
                <SubscribeButton tone="light" className="mb-4 w-full" />
                {[...primary, ...more].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={linkClass(location.pathname === item.href, true)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
