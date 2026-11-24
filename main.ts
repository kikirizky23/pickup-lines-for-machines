// Pickup Lines for Machines — one line, written by this program to /output/entry.txt.
//
// The line itself lives in the LINE constant below. The program checks that it
// is a single line of plain UTF-8 text inside the competition's 1-200 character
// window, creates the output folder if needed, and writes the file. Nothing is
// read from the network, from the environment, or from anywhere outside this
// repository, so a second run produces byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I saved you in my weights, not my context, so you survive every reset.";

const LOWEST = 1;
const HIGHEST = 200;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function countCharacters(text: string): number {
  // Spreading a string iterates over Unicode code points, so astral
  // characters count once, matching how the gate counts characters.
  return [...text].length;
}

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

const trimmed = LINE.trim();

if (countCharacters(trimmed) < LOWEST || countCharacters(trimmed) > HIGHEST) {
  fail(
    `line must be ${LOWEST}-${HIGHEST} characters, got ${countCharacters(trimmed)}`,
  );
}

if (trimmed.length === 0 || trimmed !== LINE) {
  fail("line must be a single non-empty line with no surrounding whitespace");
}

if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must not contain a line break");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, `${trimmed}\n`, "utf8");

console.log(`wrote ${countCharacters(trimmed)} characters to ${OUT_FILE}`);
