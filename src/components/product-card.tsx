import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";
import { Badge } from "./ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const hydrated = useHydrated();
  const saved = useWishlist((s) => s.has(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const on = hydrated && saved;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]">
      <Link to="/shop/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated">
          <img
            src={product.image}
            alt=""
            className="size-full object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.live ? <Badge variant="live">Live lot</Badge> : null}
            <Badge variant="outline">{product.category}</Badge>
          </div>
        </div>
        <div className="p-4 pr-14">
          <h3 className="font-display text-xl tracking-wide text-fg">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{product.priceNote}</p>
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <p className="font-display text-2xl tabular-nums text-primary">
              {product.price}
            </p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">
              {product.availability}
            </p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggle(product.id)}
        aria-pressed={on}
        aria-label={on ? "Remove from watchlist" : "Save to watchlist"}
        className={cn(
          "absolute right-3 bottom-3 inline-flex size-11 items-center justify-center rounded-md border border-border bg-elevated text-fg hover:bg-bg",
          on && "border-primary/40 text-primary",
        )}
      >
        <Heart className={cn("size-5", on && "fill-current")} />
      </button>
    </article>
  );
}
