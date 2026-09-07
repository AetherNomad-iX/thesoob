import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">Missed connection</p>
      <h1 className="mt-3 font-display text-5xl tracking-wide">No train on this track</h1>
      <p className="mt-3 text-sm text-muted">
        That page is not on the board. Head back to the shop or the live show.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Return to the station</Link>
      </Button>
    </main>
  );
}
