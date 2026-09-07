import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import {
  CATEGORIES,
  searchProducts,
  type CategoryId,
} from "@/lib/catalog";
import { SELLER } from "@/lib/links";
import { cn } from "@/lib/utils";

type ShopSearch = { q?: string; cat?: CategoryId };

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const q = typeof search.q === "string" ? search.q : undefined;
    const cat = typeof search.cat === "string" ? search.cat : undefined;
    const valid = CATEGORIES.some((c) => c.id === cat)
      ? (cat as CategoryId)
      : undefined;
    return { q, cat: valid };
  },
  component: ShopPage,
});

type SortId = "featured" | "name" | "price";

function ShopPage() {
  const { q, cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState<SortId>("featured");
  const filter = cat ?? "all";
  const query = q ?? "";

  const items = useMemo(() => {
    const found = searchProducts(query, filter);
    const copy = [...found];
    if (sort === "name") copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price") copy.sort((a, b) => a.price.localeCompare(b.price));
    return copy;
  }, [filter, query, sort]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">Catalog</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">Shop the board</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Live lots and Buy It Now from {SELLER.shop}. Checkout always happens on
        Whatnot — this board is the map.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) =>
            void navigate({
              search: (prev) => ({ ...prev, q: e.target.value || undefined }),
            })
          }
          placeholder="Filter lots…"
          aria-label="Filter lots"
          className="sm:max-w-xs"
        />
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg"
          >
            <option value="featured">Featured</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
        <p className="text-xs text-subtle tabular-nums sm:ml-auto">
          {items.length} lot{items.length === 1 ? "" : "s"}
        </p>
      </div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() =>
              void navigate({
                search: (prev) => ({
                  ...prev,
                  cat: c.id === "all" ? undefined : c.id,
                }),
              })
            }
            className={cn(
              "h-11 shrink-0 rounded-full border px-4 text-sm transition-colors duration-150",
              filter === c.id
                ? "border-primary bg-primary text-primary-fg"
                : "border-border bg-surface text-muted hover:text-fg",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {items.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          Nothing on that track right now.
        </p>
      ) : null}
    </main>
  );
}
