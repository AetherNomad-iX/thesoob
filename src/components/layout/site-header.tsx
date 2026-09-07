import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Heart, Menu, Train, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { WHATNOT_USER } from "@/lib/links";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/shows", label: "Shows" },
  { to: "/station", label: "Station", featured: true },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useHydrated();
  const saved = useWishlist((s) => s.ids.length);
  const count = hydrated ? saved : 0;

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md">
      <div className="border-b border-border bg-elevated">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="truncate text-[11px] uppercase tracking-[0.18em] text-muted">
            {SITE.domain} · every purchase sponsors The Soob Station
          </p>
          <Link
            to="/station"
            className="hidden shrink-0 text-[11px] uppercase tracking-[0.16em] text-primary hover:text-fg sm:inline"
          >
            Station tab
          </Link>
        </div>
      </div>
      <div className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                pathname === item.to || pathname.startsWith(`${item.to}/`);
              const featured = "featured" in item && item.featured;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-sm transition-colors duration-150",
                    featured &&
                      (active
                        ? "bg-primary text-primary-fg"
                        : "bg-primary/10 text-primary hover:bg-primary/20"),
                    !featured && (active ? "text-fg" : "text-muted hover:text-fg"),
                  )}
                >
                  {featured ? <Train className="size-3.5" /> : null}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <SearchForm className="hidden w-56 lg:block xl:w-72" />
            <Link
              to="/station"
              className="inline-flex size-11 items-center justify-center rounded-md text-primary hover:bg-elevated md:hidden"
              aria-label="The Soob Station"
            >
              <Train className="size-5" />
            </Link>
            <Link
              to="/watchlist"
              className="relative inline-flex size-11 items-center justify-center rounded-md text-fg hover:bg-elevated"
              aria-label={`Watchlist, ${count} saved`}
            >
              <Heart className="size-5" />
              {count > 0 ? (
                <span className="absolute top-1.5 right-1.5 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] font-semibold text-primary-fg tabular-nums">
                  {count}
                </span>
              ) : null}
            </Link>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={WHATNOT_USER} target="_blank" rel="noopener noreferrer">
                Watch live
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md md:hidden hover:bg-elevated"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div className="border-b border-border bg-bg px-4 py-4 md:hidden">
          <SearchForm className="mb-3" onSubmitDone={() => setOpen(false)} />
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => {
              const featured = "featured" in item && item.featured;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-md px-3 text-base text-fg hover:bg-elevated",
                    featured && "bg-primary/10 text-primary",
                  )}
                >
                  {featured ? <Train className="size-4" /> : null}
                  {item.label}
                </Link>
              );
            })}
            <a
              href={WHATNOT_USER}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-fg px-4 text-sm font-medium text-bg"
            >
              Watch on Whatnot
              <ArrowUpRight className="size-4" />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
