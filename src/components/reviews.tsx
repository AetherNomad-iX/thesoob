import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/content";
import { SELLER } from "@/lib/links";

export function Reviews() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">
          {SELLER.rating} · {SELLER.reviews} reviews
        </p>
        <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
          What the room says
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Public Whatnot record. Composite of the kind of note that keeps a 5.0
          at this volume — not a paid testimonial.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="rounded-xl border border-border bg-bg p-5 shadow-[var(--shadow-border)]"
            >
              <div className="flex gap-0.5 text-primary" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-fg">
                {r.text}
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-subtle">
                {r.name} · {r.loc}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
