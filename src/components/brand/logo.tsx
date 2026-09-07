import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function StationMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-8 text-primary", className)}
    >
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M11 22 L16 9 L21 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12.4 17.6 H19.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 text-fg no-underline"
      aria-label="The Soob Collectibles home"
    >
      <StationMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-semibold tracking-[0.14em]">
          THE SOOB
        </span>
        {compact ? null : (
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted">
            Collectibles
          </span>
        )}
      </span>
    </Link>
  );
}
