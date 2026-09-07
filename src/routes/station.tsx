import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, HeartHandshake, Train, Users, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  STATION_HELP,
  STATION_SUPPORT,
  STATION_TABS,
  type StationTabId,
} from "@/lib/content";
import { DISCORD, SELLER, SUPPORT_LISTING } from "@/lib/links";
import { cn } from "@/lib/utils";

type StationSearch = { tab?: StationTabId };

export const Route = createFileRoute("/station")({
  validateSearch: (search: Record<string, unknown>): StationSearch => {
    const tab = search.tab;
    const ok =
      tab === "mission" ||
      tab === "help" ||
      tab === "community" ||
      tab === "support";
    return { tab: ok ? tab : undefined };
  },
  component: StationPage,
});

function StationPage() {
  const { tab: tabParam } = Route.useSearch();
  const [tab, setTab] = useState<StationTabId>(tabParam ?? "mission");

  useEffect(() => {
    if (tabParam) setTab(tabParam);
  }, [tabParam]);

  return (
    <main>
      <section className="relative min-h-[70svh] overflow-hidden">
        <img
          src="/images/station.jpg"
          alt="Transit junction at dusk"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/30" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">
            Nonprofit · sponsored by {SELLER.shop}
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-wide sm:text-7xl">
            The Soob Station
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg/90">
            The junction to a better life. Built to help troubled teens and
            young adults become capable — and more importantly, willing — to get
            themselves out of street life.
          </p>
        </div>
      </section>

      <div className="sticky top-[6.75rem] z-30 border-b border-border bg-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6" role="tablist" aria-label="The Soob Station">
          {STATION_TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "h-11 shrink-0 rounded-md px-4 text-sm transition-colors duration-150",
                tab === item.id
                  ? "bg-primary text-primary-fg"
                  : "text-muted hover:bg-elevated hover:text-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "mission" ? <MissionPanel /> : null}
      {tab === "help" ? <HelpPanel /> : null}
      {tab === "community" ? <CommunityPanel /> : null}
      {tab === "support" ? <SupportPanel /> : null}
    </main>
  );
}

function MissionPanel() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-primary">
          Tab · Mission
        </p>
        <h2 className="mt-2 font-display text-4xl tracking-wide">
          The psychic change
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {SELLER.station} is a nonprofit sponsored by {SELLER.shop}. The bio on
          Whatnot is not marketing copy dressed up as charity — it is the reason
          the shop exists in public. Support is not a tip jar for cardboard. It
          is a bet that someone still in it can change direction.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Capability without willingness does not leave the block. The Station
          aims at both: the skills to get out, and the want to. That is the
          junction — not a ride you get put on, a platform you step onto.
        </p>
        <blockquote className="mt-8 border-l-2 border-primary pl-4 text-base leading-relaxed text-fg">
          “The junction to a better life” — creating a psychic change within
          those stuck in the streets, giving them the willingness to change
          their direction in life.
        </blockquote>
      </div>
      <img
        src="/images/support.jpg"
        alt="Quiet still life for Station support"
        className="rounded-xl border border-border object-cover outline outline-1 -outline-offset-1 outline-white/10"
      />
    </section>
  );
}

function HelpPanel() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">
        Tab · How we help
      </p>
      <h2 className="mt-2 font-display text-4xl tracking-wide">
        Capable. Willing. Moving.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        The Station is not a drop-in slogan. The work is a change in direction,
        made by the person still in it, funded by a shop that ships cardboard
        on time.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {STATION_HELP.map((item, i) => {
          const Icon = [Wrench, HeartHandshake, Train][i] ?? Train;
          return (
            <article
              key={item.n}
              className="rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-border)]"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-elevated text-primary">
                <Icon className="size-4" />
              </span>
              <p className="mt-4 font-display text-sm tracking-[0.2em] text-primary">
                {item.n}
              </p>
              <h3 className="mt-2 font-display text-2xl tracking-wide">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CommunityPanel() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">
        Tab · Community
      </p>
      <h2 className="mt-2 font-display text-4xl tracking-wide">
        After the hammer
      </h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <Users className="size-5 text-primary" />
          <h3 className="mt-4 font-display text-2xl tracking-wide">Discord</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The Station Discord is the room when the camera is off. Pulls,
            check-ins, and people who showed up for cardboard and stayed for
            the mission. Come as you are. Stay if it lands.
          </p>
          <Button asChild className="mt-6">
            <a href={DISCORD} target="_blank" rel="noopener noreferrer">
              Join the Station Discord
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <Train className="size-5 text-primary" />
          <h3 className="mt-4 font-display text-2xl tracking-wide">The live room</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Shows are public. $2 singles, sealed, slabs, Trusts. The same
            host, the same 5.0 record, the same sponsor relationship — the
            shop funds the junction by doing the job well.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/shows">See the show board</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SupportPanel() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">
          Tab · Support
        </p>
        <h2 className="mt-2 font-display text-4xl tracking-wide">How to help</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Money, cardboard, or presence. All three keep the platform lit.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STATION_SUPPORT.map((card) => (
            <article
              key={card.n}
              className="flex flex-col rounded-xl border border-border bg-bg p-6"
            >
              <p className="font-display text-sm tracking-[0.2em] text-primary">
                {card.n}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-wide">
                {card.t}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {card.d}
              </p>
              {"internal" in card && card.internal ? (
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/shop">{card.label}</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="mt-6">
                  <a href={card.href} target="_blank" rel="noopener noreferrer">
                    {card.label}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              )}
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/30 bg-primary/10 px-6 py-5">
          <p className="text-sm text-fg">
            Feeling gratuitous? Bless the Station. $50. Not a card.
          </p>
          <Button asChild>
            <a href={SUPPORT_LISTING} target="_blank" rel="noopener noreferrer">
              Open the blessing
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
