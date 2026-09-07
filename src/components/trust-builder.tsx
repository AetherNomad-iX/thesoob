import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHATNOT_USER } from "@/lib/links";
import { useHydrated } from "@/lib/use-hydrated";
import { useTrustPicks } from "@/lib/wishlist";

export function TrustBuilder() {
  const hydrated = useHydrated();
  const picks = useTrustPicks((s) => s.picks);
  const setPick = useTrustPicks((s) => s.setPick);
  const values = hydrated ? picks : (["", "", ""] as [string, string, string]);
  const filled = values.filter((p) => p.trim()).length;

  async function sendToSoob() {
    const named = values.map((p) => p.trim()).filter(Boolean);
    if (named.length < 3) {
      toast.error("Name all three before you message Soob.");
      return;
    }
    const message = `Hey Soob — my top 3 Pokémon for the Trust: ${named.join(", ")}`;
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Copied. Paste it in a Whatnot DM to thesoob.");
    } catch {
      toast.message(message);
    }
    window.open(WHATNOT_USER, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">
        Trust protocol
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-wide sm:text-4xl">
        Name your three
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Listing copy from the actual Soober Trust: tell Soob your top three
        Pokémon or you get random starters. We keep the names on this device so
        you can paste them into a Whatnot message after you buy.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {values.map((value, index) => (
          <label key={index} className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-subtle">
              Pick {index + 1}
            </span>
            <Input
              value={value}
              placeholder={
                index === 0 ? "Umbreon" : index === 1 ? "Gengar" : "Lugia"
              }
              onChange={(e) =>
                setPick(index as 0 | 1 | 2, e.target.value)
              }
              autoComplete="off"
            />
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="button" variant="accent" onClick={sendToSoob}>
          Copy and message thesoob
          <ArrowUpRight className="size-4" />
        </Button>
        <p className="text-xs text-subtle tabular-nums">{filled}/3 named</p>
      </div>
    </section>
  );
}
