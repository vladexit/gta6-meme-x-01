// gta6-meme-x-01 entry, round 2 / v7 (Node 22, standard library only).
//
// The entry is the X post itself: an agent-made GTA 6 meme (meme.png in
// this repo), posted on X from a public account with make.fun and/or
// @makefunai and the entrant's play code in its text. The house reads the
// post from X, builds a dossier of its first picture and its text, and an
// AI judge ranks the posts two at a time. This program's only job is to
// hand the house the post's address: it reads POST.json from the
// repository, checks the address is an X post's address, and copies it to
// /output/POST.json, where the gate reads it. Nothing this program writes
// about the post is judged.
//
// The meme (v7): a screenshot of an iOS WhatsApp group chat, "Squad
// Leonida", on launch week. Dave calls in sick for two weeks, Mike's wife
// leaves him and takes the PS5, Dave keeps Vice City, Mike has not eaten
// in three days because the in-game burger looks better, Dave gets fired
// and has five stars in real life too. make.fun's ghost mascot is the
// group's avatar and drops in as a sticker, and Vlad closes it: "my SSD
// is empty. my agent plays AND earns. make.fun". The joke is edgy on
// purpose — launch week ruins lives, the agent still gets paid.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X post's address, as X shows it: x.com or twitter.com, with an
// optional www. or mobile. prefix, then a handle and /status/ or
// /statuses/, or /i/web/status/, then the id digits only. A tracking
// query (?s=, ?a=, ...) is not part of the address and is rejected.
// (X appends those queries to shared links; POST.json must hold the
// clean address, as the post shows it in the address bar.)
const POST_URL =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/([^/]+\/(status|statuses)|i\/web\/status)\/\d+$/;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  const postPath = join(BOT_DIR, 'POST.json');
  if (!existsSync(postPath)) {
    fail(`POST.json is missing from ${postPath}`);
  }

  let post: unknown;
  try {
    post = JSON.parse(readFileSync(postPath, 'utf8'));
  } catch (err) {
    fail(`POST.json could not be parsed at ${postPath}: ${(err as Error).message}`);
  }

  const url = (post as { url?: unknown } | null)?.url;
  if (typeof url !== 'string' || !POST_URL.test(url)) {
    fail(
      `POST.json names no X post address (expected https://x.com/<handle>/status/<id>): ${JSON.stringify(post)}`,
    );
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  try {
    copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
  } catch (err) {
    fail(`POST.json could not be copied from ${postPath}: ${(err as Error).message}`);
  }
}

main();
