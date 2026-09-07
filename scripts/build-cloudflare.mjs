#!/usr/bin/env node
/**
 * Cloudflare Pages build. Prerender is static HTML; Nitro then throws a
 * known Vite SSR-entry error. We always run the dist sanitizer afterward
 * and succeed if dist/index.html exists.
 */
import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  CF_PAGES: "1",
  NITRO_PRESET: "static",
};

const build = spawnSync(
  "node",
  ["scripts/with-app-env.mjs", "vite", "build"],
  { stdio: "inherit", env },
);

const prepare = spawnSync("node", ["scripts/prepare-cloudflare-dist.mjs"], {
  stdio: "inherit",
  env,
});

if (prepare.status === 0) {
  process.exit(0);
}

process.exit(prepare.status ?? build.status ?? 1);
