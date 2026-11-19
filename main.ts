// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: an agent-made GTA 6 meme (meme.png in this
// repo), posted on X from a public account with make.fun and/or @makefunai and
// the entrant's play code in its text. The house reads the post from X, builds
// a dossier of its first picture and its text, and its AI judge ranks the
// posts two at a time. This program's only job is to hand the house the
// post's address: it reads POST.json from the repository, checks the address
// is an X post's address, and copies it to /output/POST.json, where the gate
// reads it. Nothing this program writes about the post is judged.
//
// The meme: a tired gamer on a Florida couch staring at his TV while GTA VI
// downloads — 99%, 847 GB, "Time remaining: 13 years" — with make.fun's
// ghost mascot sitting beside him on the couch, watching too. The joke is
// the thirteen-year wait since GTA V, told in one picture.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X post's address, as X shows it: x.com or twitter.com (www. or mobile.),
// then a handle and /status/ or /statuses/, or /i/web/status/, then the id
// digits only.
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/([^/]+\/(status|statuses)|i\/web\/status)\/\d+$/;

const postPath = join(BOT_DIR, 'POST.json');
let post;
try {
  post = JSON.parse(readFileSync(postPath, 'utf8'));
} catch (err) {
  console.error(`POST.json could not be read from ${postPath}: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof post?.url !== 'string' || !POST_URL.test(post.url)) {
  console.error(`POST.json names no X post address (expected https://x.com/<handle>/status/<id>): ${JSON.stringify(post)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${postPath}: ${(err as Error).message}`);
  process.exit(1);
}
