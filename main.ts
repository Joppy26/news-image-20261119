// The World in One Page, Thursday 19 November 2026.
//
// The picture is drawn by gen.py, a small Python program that only uses
// the standard library plus Pillow. It reads no clock, no network and no
// random source, so running it twice gives the same bytes. The finished
// picture ships in this repo as entry.png, and this file is the entry
// point the harness runs: it places an exact copy of that picture at
// /output/entry.png, or in MAKEFUN_OUTPUT_DIR when that is set.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(targetDir, "entry.png");

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

const before = readFileSync(source);
const after = readFileSync(target);
if (before.length !== after.length || !before.equals(after)) {
  throw new Error("copied entry.png does not match the shipped picture");
}
console.log(`wrote ${target} (${after.length} bytes)`);
