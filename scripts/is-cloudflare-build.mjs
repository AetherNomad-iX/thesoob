/**
 * Cloudflare Workers Builds runs `npm run build` then `npx wrangler deploy`.
 * It sets WORKERS_CI=1, not CF_PAGES (that's classic Pages).
 * Vercel / Grok deploys set VERCEL=1 — those must stay on the Vercel Nitro preset.
 */
import { existsSync } from "node:fs";

export function isCloudflareBuild(env = process.env) {
  if (env.VERCEL === "1" || env.VERCEL === "true") return false;
  if (env.CF_PAGES === "1" || env.CF_PAGES === "true") return true;
  if (env.WORKERS_CI === "1" || env.WORKERS_CI === "true") return true;
  const preset = env.NITRO_PRESET ?? "";
  if (
    preset === "static" ||
    preset === "cloudflare-pages" ||
    preset === "cloudflare_pages"
  ) {
    return true;
  }
  // Cloudflare's shared build image (Pages and Workers Builds).
  if (existsSync("/opt/buildhome")) return true;
  return false;
}
