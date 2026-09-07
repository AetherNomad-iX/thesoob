#!/usr/bin/env node
/**
 * Production build entry.
 * Cloudflare Workers Builds runs `npm run build` then `npx wrangler deploy`
 * and does not set CF_PAGES (that's Pages-only).
 */
import { spawnSync } from "node:child_process";
import { isCloudflareBuild } from "./is-cloudflare-build.mjs";

function run(args, extraEnv = {}) {
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    env: { ...process.env, ...extraEnv },
  });
  process.exit(result.status ?? 1);
}

if (isCloudflareBuild()) {
  run(["scripts/build-cloudflare.mjs"], {
    CF_PAGES: "1",
    NITRO_PRESET: "static",
  });
}

const build = spawnSync(
  process.execPath,
  ["scripts/with-app-env.mjs", "vite", "build"],
  { stdio: "inherit", env: process.env },
);
if (build.status) process.exit(build.status);
const migrate = spawnSync("npm", ["run", "db:migrate"], {
  stdio: "inherit",
  env: process.env,
});
process.exit(migrate.status ?? 1);
