import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { POLICIES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/policies")({ component: PoliciesPage });

function PoliciesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">Legal</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">Policies</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        How {SITE.name} works with Whatnot, shipping, and The Soob Station.
      </p>
      <div className="mt-10 space-y-8">
        {POLICIES.map((p) => (
          <section key={p.id} id={p.id}>
            <h2 className="font-display text-2xl tracking-wide">{p.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
          </section>
        ))}
      </div>
      <Button asChild variant="outline" className="mt-10">
        <Link to="/faq">Read the FAQ</Link>
      </Button>
    </main>
  );
}
