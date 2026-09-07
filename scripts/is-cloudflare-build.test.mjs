import assert from "node:assert/strict";
import test from "node:test";
import { isCloudflareBuild } from "./is-cloudflare-build.mjs";

test("Grok/Vercel stays off Cloudflare", () => {
  assert.equal(isCloudflareBuild({ VERCEL: "1", CI: "true" }), false);
});

test("Workers Builds is on", () => {
  assert.equal(isCloudflareBuild({ WORKERS_CI: "1", CI: "true" }), true);
});

test("classic Pages is on", () => {
  assert.equal(isCloudflareBuild({ CF_PAGES: "1" }), true);
});

test("local default is off", () => {
  assert.equal(isCloudflareBuild({}), false);
});
