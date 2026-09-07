/**
 * Cloudflare Workers Builds: `npm run build` then `npx wrangler deploy`.
 * Sets WORKERS_CI=1 (not CF_PAGES). Vercel/Grok set VERCEL=1.
 */
import { existsSync } from "node:fs";

export function isCloudflareBuild(env = process.env) {
  if (env.VERCEL === "1" || env.VERCEL === "true") return false;
  if (env.CF_PAGES === "1" || env.CF_PAGES === "true") return true;
  if (env.WORKERS_CI === "1" || env.WORKERS_CI === "true") return true;
  if (env.NITRO_PRESET === "static") return true;
  if (env.NITRO_PRESET === "cloudflare-pages") return true;
  if (env.NITRO_PRESET === "cloudflare_pages") return true;
  if (existsSync("/opt/buildhome")) return true;
  return false;
}
