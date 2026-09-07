import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Bell } from "lucide-react";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SHOWS, showForDate } from "@/lib/catalog";
import { SELLER, WHATNOT_USER } from "@/lib/links";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const useReminders = create<{ ids: string[]; toggle: (id: string) => void }>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id)
            ? s.ids.filter((x) => x !== id)
            : [...s.ids, id],
        })),
    }),
    { name: "soob-show-reminders" },
  ),
);

export const Route = createFileRoute("/shows")({ component: ShowsPage });

function ShowsPage() {
  const tonight = showForDate();
  const hydrated = useHydrated();
  const reminders = useReminders((s) => s.ids);
  const toggle = useReminders((s) => s.toggle);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src="/images/live.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/50" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Badge variant="live">Live auctions</Badge>
          <h1 className="mt-4 font-display text-5xl tracking-wide sm:text-6xl">
            Show board
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Typical weekly lineup for @{SELLER.handle} on TheSoob.com. Whatnot is
          the source of truth — shows move. Pin a night here and we keep it on
          this device so you remember to open the app.
          </p>
          <Button asChild className="mt-6">
            <a href={WHATNOT_USER} target="_blank" rel="noopener noreferrer">
              Open Whatnot
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[4.5rem_1fr_auto] gap-x-4 border-b border-border bg-elevated px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-subtle sm:grid-cols-[5rem_1fr_8rem_auto]">
            <span>Day</span>
            <span>Destination</span>
            <span className="hidden sm:block">Departs</span>
            <span className="text-right">Pin</span>
          </div>
          {SHOWS.map((show) => {
            const active = tonight?.id === show.id;
            const pinned = hydrated && reminders.includes(show.id);
            return (
              <div
                key={show.id}
                className={cn(
                  "grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-4 border-b border-border px-4 py-5 last:border-0 sm:grid-cols-[5rem_1fr_8rem_auto]",
                  active && "bg-primary/10",
                )}
              >
                <p className="font-display text-lg tracking-wide text-primary">
                  {show.day}
                </p>
                <div>
                  <p className="font-medium text-fg">
                    {show.title}
                    {active ? (
                      <span className="ml-2 text-xs uppercase tracking-[0.16em] text-primary">
                        Tonight
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-xs text-muted">{show.tags.join(" · ")}</p>
                  <p className="mt-1 text-xs text-subtle sm:hidden">{show.time}</p>
                </div>
                <p className="hidden font-display text-lg tabular-nums text-fg sm:block">
                  {show.time}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    toggle(show.id);
                    toast.success(
                      pinned
                        ? `Cleared ${show.day}`
                        : `${show.day} pinned on this device`,
                    );
                  }}
                  aria-pressed={pinned}
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-md border border-border hover:bg-elevated",
                    pinned && "border-primary/50 text-primary",
                  )}
                  aria-label={pinned ? "Unpin show" : "Pin show"}
                >
                  <Bell className={cn("size-4", pinned && "fill-current")} />
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-subtle">
          Pins stay in this browser only. They are not push notifications.
        </p>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          {[
            {
              t: "$2 singles",
              d: "The house special. Hundreds of lots, low floor, camera-right. Pre-bid from the shop if you cannot sit the whole show.",
            },
            {
              t: "Sealed and slabs",
              d: "Destined Rivals, 151, tins, and graded plastic. Called on stream before they run. Keep sealed or rip — say so in chat.",
            },
            {
              t: "Trusts",
              d: "Monthly mystery worth the nut. Name your three Pokémon in a DM or you ride with random starters.",
            },
          ].map((item) => (
            <div key={item.t}>
              <h2 className="font-display text-2xl tracking-wide">{item.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
