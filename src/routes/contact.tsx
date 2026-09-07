import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DISCORD, SELLER, WHATNOT_USER } from "@/lib/links";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Shop");
  const [body, setBody] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) {
      toast.error("Write the note first.");
      return;
    }
    const message = `Hey Soob — ${name.trim() || "a collector"} on ${SITE.domain} (${topic}): ${body.trim()}`;
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Copied. Paste it in a Whatnot DM to thesoob.");
    } catch {
      toast.message(message);
    }
    window.open(WHATNOT_USER, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">
        {SITE.domain}
      </p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">Contact</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        There is no inbox on this site. Orders, lots, and Station blessings go
        through @{SELLER.handle} on Whatnot. Discord is the room after.
      </p>
      <form onSubmit={onSubmit} className="mt-10 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-subtle">
            Name
          </span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-subtle">
            Topic
          </span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg"
          >
            <option>Shop</option>
            <option>Trust</option>
            <option>The Station</option>
            <option>Shows</option>
            <option>Other</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-subtle">
            Note
          </span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full rounded-md border border-border bg-elevated px-3 py-2 text-sm text-fg placeholder:text-subtle outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <Button type="submit">
          Copy and open Whatnot
          <ArrowUpRight className="size-4" />
        </Button>
      </form>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <a href={WHATNOT_USER} target="_blank" rel="noopener noreferrer">
            Whatnot
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
        <Button asChild variant="ghost">
          <a href={DISCORD} target="_blank" rel="noopener noreferrer">
            Discord
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>
    </main>
  );
}
