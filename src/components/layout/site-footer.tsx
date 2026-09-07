import { Link } from "@tanstack/react-router";
import { StationMark } from "@/components/brand/logo";
import { DISCORD, SELLER, WHATNOT_SHOP, WHATNOT_USER } from "@/lib/links";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <StationMark />
            <p className="font-display text-2xl tracking-[0.12em]">THE SOOB</p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {SELLER.shop} — live Pokémon TCG on Whatnot, hosted by {SELLER.name}.
            The shop sponsors {SELLER.station}, a nonprofit built as a junction
            off the street.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-subtle">
            {SITE.domain}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-subtle">On site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/shop" className="text-muted hover:text-fg">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/shows" className="text-muted hover:text-fg">
                Shows
              </Link>
            </li>
            <li>
              <Link to="/station" className="text-muted hover:text-fg">
                The Station
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted hover:text-fg">
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted hover:text-fg">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted hover:text-fg">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-subtle">Off site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={WHATNOT_USER}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-fg"
              >
                Whatnot · @{SELLER.handle}
              </a>
            </li>
            <li>
              <a
                href={WHATNOT_SHOP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-fg"
              >
                Profile shop
              </a>
            </li>
            <li>
              <a
                href={DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-fg"
              >
                Discord
              </a>
            </li>
            <li>
              <Link to="/policies" className="text-muted hover:text-fg">
                Policies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Purchases and live auctions run on Whatnot. Buyer Guarantee applies
            there.
          </p>
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
