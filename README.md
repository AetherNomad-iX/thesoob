# The Soob Collectibles

Official companion site for **[TheSoob.com](https://thesoob.com)** — live Pokémon TCG on Whatnot, hosted by Hunter Subirats (`@thesoob`). Home of **The Soob Station**, the nonprofit junction off the street.

Checkout stays on [Whatnot](https://www.whatnot.com/user/thesoob). This repo is the catalog, show board, and Station tab.

## Deploy on Cloudflare Pages

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select this repository (`thesoob`).
3. Build settings (use **None**, not the Vite preset):

   | Field | Value |
   | --- | --- |
   | Framework preset | **None** |
   | Install command | `npm ci` |
   | Build command | `npm run build:cloudflare` |
   | Build output directory | `dist` |
   | Root directory | `/` |
   | Node version | `22` |

   Then **Retry deployment** with **Clear build cache**.

   The site is prerendered to static HTML. There is no Cloudflare Worker / Functions bundle — Git-connected Pages only uploads files.

4. Environment variables (optional — the repo already includes build tools in `dependencies`):

   | Name | Value |
   | --- | --- |
   | `NODE_VERSION` | `22` |

5. **Custom domain:** add `thesoob.com` (and `www`) in Pages → Custom domains.

Cloudflare sets `CF_PAGES=1` on the build. The Vite config switches Nitro to the `cloudflare-pages` preset automatically.

If Git integration is already connected, retry the latest deployment after this commit. Cache can be stale — use **Retry deployment** with **Clear build cache** if it still fails.

### GitHub Action (optional)

Add repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Pushes to `main` will build and `wrangler pages deploy dist`.

Local Cloudflare build:

```bash
npm ci
npm run build:cloudflare
npx wrangler pages deploy dist --project-name=thesoob
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
