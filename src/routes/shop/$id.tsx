import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { TrustBuilder } from "@/components/trust-builder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProduct, PRODUCTS } from "@/lib/catalog";
import { SELLER } from "@/lib/links";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const hydrated = useHydrated();
  const saved = useWishlist((s) => s.has(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const on = hydrated && saved;
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured),
  ).slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs text-subtle">
        <Link to="/shop" className="hover:text-fg">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {product.name}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <img
            src={product.image}
            alt=""
            className="aspect-[4/3] w-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {product.live ? <Badge variant="live">Live lot</Badge> : null}
            <Badge variant="outline">{product.category}</Badge>
            <Badge>{product.condition}</Badge>
          </div>
          <h1 className="mt-4 font-display text-5xl tracking-wide">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-4xl tabular-nums text-primary">
            {product.price}
          </p>
          <p className="mt-1 text-sm text-muted">{product.priceNote}</p>
          <p className="mt-6 text-base leading-relaxed text-fg/90">
            {product.blurb}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Condition", product.condition],
              ["Language", product.language],
              ["Availability", product.availability],
              ["Ship", `${SELLER.ship} avg`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border border-border bg-surface px-3 py-2">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-subtle">
                  {k}
                </dt>
                <dd className="mt-0.5 text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {product.details.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a
                href={product.whatnotUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy on Whatnot
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => toggle(product.id)}
              aria-pressed={on}
            >
              <Heart className={cn("size-4", on && "fill-current")} />
              {on ? "Saved" : "Save to watchlist"}
            </Button>
          </div>
          <p className="mt-4 text-xs text-subtle">
            Payment and shipping live on Whatnot. {SELLER.shop} does not take
            cards off-platform.
          </p>
        </div>
      </div>
      {product.id === "soober-trust" ? (
        <div className="mt-12">
          <TrustBuilder />
        </div>
      ) : null}
      <section className="mt-16">
        <h2 className="font-display text-3xl tracking-wide">Also on the board</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
