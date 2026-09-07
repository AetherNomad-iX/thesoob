import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";
import { useHydrated } from "@/lib/use-hydrated";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/watchlist")({ component: WatchlistPage });

function WatchlistPage() {
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);
  const clear = useWishlist((s) => s.clear);
  const waiting = !hydrated;
  const items = waiting ? [] : PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">
            This device
          </p>
          <h1 className="mt-2 font-display text-5xl tracking-wide">Watchlist</h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Saved lots live in this browser. They are not a cart — checkout is
            still on Whatnot.
          </p>
        </div>
        {items.length > 0 ? (
          <Button type="button" variant="ghost" onClick={clear}>
            Clear all
          </Button>
        ) : null}
      </div>
      {waiting ? (
        <p className="mt-16 text-center text-sm text-muted">Loading saved lots…</p>
      ) : items.length === 0 ? (
        <div className="mt-16 rounded-xl border border-border bg-surface px-6 py-16 text-center">
          <p className="font-display text-2xl tracking-wide">Nothing pinned</p>
          <p className="mt-2 text-sm text-muted">
            Heart a lot on the shop board and it will land here.
          </p>
          <Button asChild className="mt-6">
            <Link to="/shop">Open the shop</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
