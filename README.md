# The Soob Collectibles

Official companion site for **[TheSoob.com](https://thesoob.com)** — live Pokémon TCG on Whatnot, hosted by Hunter Subirats (`@thesoob`). Home of **The Soob Station**, the nonprofit junction off the street.

Checkout stays on [Whatnot](https://www.whatnot.com/user/thesoob). This repo is the catalog, show board, and Station tab.

## Deploy on Cloudflare Pages

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select this repository (`thesoob`).
3. Build settings:

   | Field | Value |
   | --- | --- |
   | Framework preset | None (or Vite) |
   | Build command | `npm run build:cloudflare` |
   | Build output directory | `dist` |
   | Root directory | `/` |
   | Node version | `22` |

4. **Custom domain:** add `thesoob.com` (and `www`) in Pages → Custom domains. Point the DNS at Cloudflare.

Cloudflare sets `CF_PAGES=1` on the build. The Vite config switches Nitro to the `cloudflare-pages` preset automatically.

Local Cloudflare build:

```bash
npm install
npm run build:cloudflare
npx wrangler pages dev dist
```

## Station tab

`/station` is a first-class nav tab with four built panels:

- **Mission** — the psychic change, the junction
- **How we help** — capability + willingness
- **Community** — Discord and the live room
- **Support** — bless the Station, shop, stay

## Stack

React 19, TanStack Start, Tailwind v4. Watchlist, show pins, and Trust picks stay in the browser (`localStorage`). No accounts on this site.

## Brand

The Soob Collectibles · TheSoob.com · mint on graphite · Barlow Condensed + Source Sans 3.
