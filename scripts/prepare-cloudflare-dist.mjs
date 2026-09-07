#!/usr/bin/env node
/**
 * Cloudflare Pages Git integration is a static file host. Nitro's
 * `cloudflare-pages` preset writes `_worker.js` as a directory, which
 * fails the deploy step. The `static` preset prerenders HTML into
 * `.output/public`, then Vite/Nitro crashes on a known SSR-entry bug
 * AFTER prerender succeeded.
 *
 * This script copies the prerendered tree into `dist/` and strips any
 * Functions artifacts so Pages only uploads HTML, CSS, JS, and images.
 */
import { cp, readdir, rm, stat, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const nitroPublic = join(root, ".output/public");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function hasIndex(dir) {
  return exists(join(dir, "index.html"));
}

async function main() {
  let source = null;
  if (await hasIndex(nitroPublic)) source = nitroPublic;
  else if (await hasIndex(dist)) source = dist;

  if (!source) {
    console.error("[cloudflare] no prerendered index.html in .output/public or dist/");
    process.exit(1);
  }

  if (resolve(source) !== resolve(dist)) {
    await rm(dist, { recursive: true, force: true });
    await cp(source, dist, { recursive: true });
    console.log(`[cloudflare] copied ${source} → dist/`);
  }

  for (const name of ["_worker.js", "_routes.json", "nitro.json"]) {
    await rm(join(dist, name), { recursive: true, force: true });
  }

  await writeFile(join(dist, "_redirects"), "/*    /index.html   200\n", "utf8");

  const html = [];
  async function walk(dir, prefix = "") {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(join(dir, entry.name), rel);
      else if (entry.name.endsWith(".html")) html.push(rel);
    }
  }
  await walk(dist);

  if (!(await hasIndex(dist))) {
    console.error("[cloudflare] dist/index.html missing after copy");
    process.exit(1);
  }
  if (await exists(join(dist, "_worker.js"))) {
    console.error("[cloudflare] _worker.js still present — aborting");
    process.exit(1);
  }

  console.log(`[cloudflare] static Pages dist ready (${html.length} html files)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
