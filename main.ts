// food-picture-01 entry (v2: single hero ramen bowl): copies the bundled
// entry.png to the output directory, byte for byte. Node 22 standard library
// only; deterministic; no network, no clock, no randomness.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "entry.png");

if (!existsSync(src)) {
  throw new Error("entry.png is missing next to main.ts");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

const a = statSync(src).size;
const b = statSync(dst).size;
if (a !== b) {
  throw new Error(`copy size mismatch: ${a} != ${b}`);
}
console.log(`entry.png copied: ${b} bytes`);
