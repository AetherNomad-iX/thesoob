import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchForm({
  className,
  initial = "",
  onSubmitDone,
}: {
  className?: string;
  initial?: string;
  onSubmitDone?: () => void;
}) {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void navigate({
      to: "/shop",
      search: { q: q.trim() || undefined, cat: undefined },
    });
    onSubmitDone?.();
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative", className)} role="search">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search trusts, slabs, 151…"
        aria-label="Search the shop"
        className="h-11 bg-elevated pl-10"
      />
    </form>
  );
}
