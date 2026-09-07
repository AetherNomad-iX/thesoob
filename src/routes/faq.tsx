import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FAQS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">Help</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">FAQ</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {SITE.name} is the catalog. Whatnot is checkout. The Station is the
        mission.
      </p>
      <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface">
        {FAQS.map((item) => (
          <details key={item.q} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-medium text-fg [&::-webkit-details-marker]:hidden">
              {item.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link to="/policies">Policies</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
    </main>
  );
}
