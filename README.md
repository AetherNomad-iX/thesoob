# The Soob Collectibles

Official companion site for **[TheSoob.com](https://thesoob.com)** — live Pokémon TCG on Whatnot, hosted by Hunter Subirats (`@thesoob`). Home of **The Soob Station**, the nonprofit junction off the street.

Checkout stays on [Whatnot](https://www.whatnot.com/user/thesoob). This repo is the catalog, show board, and Station tab.

## Deploy on Cloudflare

This project is set up for **Workers Builds** (Connect to Git → Worker). Cloudflare runs `npm run build` then `npx wrangler deploy`.

`wrangler.toml` points Wrangler at the static `dist/` folder. No Worker script — HTML, CSS, JS, and images only.

If Git is already connected, push to `main` (or **Retry deployment**). You do not need to change the dashboard build command.

Custom domain: Workers & Pages → thesoob → **Custom domains** → add `thesoob.com` and `www`.

Local:

```bash
npm ci
npm run build:cloudflare
npx wrangler deploy
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
