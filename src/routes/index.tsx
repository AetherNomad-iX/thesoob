import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Radio, Shield, Train, Users } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reviews } from "@/components/reviews";
import { TrustBuilder } from "@/components/trust-builder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { featuredProducts, showForDate } from "@/lib/catalog";
import { CATEGORY_TILES, FAQS, SHOW_HOW } from "@/lib/content";
import { DISCORD, SELLER, WHATNOT_USER } from "@/lib/links";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const tonight = showForDate();
  const featured = featuredProducts();

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto grid min-h-[78svh] max-w-6xl lg:grid-cols-2">
          <div className="flex flex-col justify-end px-4 py-14 sm:px-6 lg:py-16">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="live">
                <span className="size-1.5 rounded-full bg-live" />
                Live on Whatnot
              </Badge>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                @{SELLER.handle} · {SELLER.name}
              </p>
            </div>
            <h1 className="mt-5 font-display text-[clamp(3.2rem,12vw,7.2rem)] leading-[0.84] tracking-[0.04em]">
              THE SOOB
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-primary">
              Collectibles · {SITE.domain}
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Live Pokémon TCG. Perfect {SELLER.rating} from {SELLER.reviews}{" "}
              reviews. Every rip on Whatnot sponsors The Soob Station — a
              junction off the street.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={WHATNOT_USER} target="_blank" rel="noopener noreferrer">
                  Watch live
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/shop">Shop the board</Link>
              </Button>
              <Button asChild size="lg" variant="accent">
                <Link to="/station">The Station</Link>
              </Button>
            </div>
            {tonight ? (
              <p className="mt-6 text-sm text-subtle">
                Typical {tonight.day} board:{" "}
                <span className="text-fg">{tonight.title}</span> · {tonight.time}.
                Confirm the actual show on Whatnot.
              </p>
            ) : (
              <p className="mt-6 text-sm text-subtle">
                No typical show booked for tonight. Follow @{SELLER.handle} for
                the next boarding.
              </p>
            )}
          </div>
          <div className="relative h-[46vh] min-h-64 overflow-hidden border-t border-border lg:h-auto lg:min-h-full lg:border-t-0 lg:border-l">
            <img
              src="/images/live.jpg"
              alt="Live-stream host holding a card up to camera"
              className="absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { k: SELLER.rating, v: `${SELLER.reviews} reviews` },
            { k: SELLER.sold, v: "sold" },
            { k: SELLER.followers, v: "followers" },
            { k: SELLER.ship, v: "average ship" },
          ].map((stat) => (
            <div key={stat.v} className="bg-surface px-5 py-7">
              <p className="font-display text-4xl tracking-wide tabular-nums text-fg">
                {stat.k}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-subtle">
                {stat.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">Browse</p>
        <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
          Shop by lane
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {CATEGORY_TILES.map((tile) => {
            const inner = (
              <>
                <img
                  src={tile.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                <div className="relative mt-auto p-4">
                  <p className="font-display text-2xl tracking-wide">{tile.label}</p>
                  <p className="mt-1 text-xs text-muted">{tile.blurb}</p>
                </div>
              </>
            );
            if ("to" in tile && tile.to) {
              return (
                <Link
                  key={tile.id}
                  to={tile.to}
                  className="group relative flex min-h-40 overflow-hidden rounded-xl border border-border"
                >
                  {inner}
                </Link>
              );
            }
            return (
              <Link
                key={tile.id}
                to="/shop"
                search={{ cat: tile.id, q: undefined }}
                className="group relative flex min-h-40 overflow-hidden rounded-xl border border-border"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">
              Arrivals
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
              On the board
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/shop">Full catalog</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <img
            src="/images/hero.jpg"
            alt="Overhead of a live collectibles desk"
            className="h-full min-h-72 w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-white/10"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">
              How a show runs
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-wide">
              Camera on. Chat open. Hammer down.
            </h2>
            <ol className="mt-8 space-y-5">
              {SHOW_HOW.map((step, i) => {
                const Icon = [Radio, Users, Shield][i] ?? Radio;
                return (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-elevated text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <Button asChild className="mt-8" variant="outline">
              <Link to="/shows">Show board</Link>
            </Button>
          </div>
        </div>
      </section>

      <Reviews />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src="/images/station.jpg"
              alt="Empty transit junction at dusk"
              className="h-full min-h-80 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
                <Train className="size-3.5" />
                The junction
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-wide">
                The Soob Station
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-fg/85">
                A nonprofit sponsored by the shop. Geared toward troubled teens
                and young adults becoming capable — and willing — to get
                themselves out of street life.
              </p>
              <Button asChild className="mt-5" size="sm">
                <Link to="/station">Open the Station tab</Link>
              </Button>
            </div>
          </div>
          <TrustBuilder />
        </div>
      </section>

      <section className="border-t border-border bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl tracking-wide">
              Quick answers
            </h2>
            <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-bg">
              {FAQS.slice(0, 4).map((item) => (
                <details key={item.q} className="group px-5 py-4">
                  <summary className="cursor-pointer list-none font-medium text-fg [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
            <Button asChild variant="ghost" className="mt-4">
              <Link to="/faq">Full FAQ</Link>
            </Button>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-border bg-bg p-8">
            <h2 className="font-display text-3xl tracking-wide">
              The room is on Discord too
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              After the stream, the same people hang in the Station Discord.
              Come for pulls. Stay if the mission lands.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <a href={DISCORD} target="_blank" rel="noopener noreferrer">
                  Join Discord
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={WHATNOT_USER} target="_blank" rel="noopener noreferrer">
                  Follow @{SELLER.handle}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
