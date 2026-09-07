import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reviews } from "@/components/reviews";
import { Button } from "@/components/ui/button";
import { DISCORD, SELLER, WHATNOT_USER } from "@/lib/links";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <img
          src="/images/live.jpg"
          alt="Live stream host at the collectibles desk, seen from behind"
          className="min-h-72 rounded-xl object-cover outline outline-1 -outline-offset-1 outline-white/10"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">
            @{SELLER.handle} · {SITE.domain}
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-wide sm:text-6xl">
            {SELLER.name}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Hunter runs {SELLER.shop} on Whatnot — Pokémon TCG live, with a
            shop floor that actually ships. The public record is clean:{" "}
            {SELLER.rating} across {SELLER.reviews} reviews, {SELLER.sold} sold,{" "}
            {SELLER.followers} followers, {SELLER.ship} average ship.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The shop sponsors {SELLER.station}. That is not a footnote. The
            stream is how the junction stays funded. TheSoob.com is the catalog
            and the Station tab — checkout stays on Whatnot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={WHATNOT_USER} target="_blank" rel="noopener noreferrer">
                Whatnot profile
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer">
                Discord
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/station">The Station</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-4xl tracking-wide">
            What you get in the room
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "A host with a record",
                d: "Five-point-oh is not a vibe. It is 1,419 people saying the mail showed up as described.",
              },
              {
                t: "Pokémon, not everything",
                d: "Singles, sealed, slabs, Japanese exclusives. Destined Rivals and 151 when they are in the case.",
              },
              {
                t: "A reason past the rip",
                d: "If you only came for cardboard, stay. If you have more to give, the Station is on the same ticket.",
              },
            ].map((col) => (
              <div key={col.t}>
                <h3 className="font-display text-2xl tracking-wide">{col.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{col.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
    </main>
  );
}
