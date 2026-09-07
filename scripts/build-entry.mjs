#!/usr/bin/env node
/**
 * Production build entry. Cloudflare Pages always sets CF_PAGES=1, even
 * when the dashboard still has the Vite default `npm run build`.
 */
import { spawnSync } from "node:child_process";

const cloudflare =
  process.env.CF_PAGES === "1" ||
  process.env.NITRO_PRESET === "static" ||
  process.env.NITRO_PRESET === "cloudflare-pages" ||
  process.env.NITRO_PRESET === "cloudflare_pages";

function run(args) {
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    env: process.env,
  });
  process.exit(result.status ?? 1);
}

if (cloudflare) {
  run(["scripts/build-cloudflare.mjs"]);
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
