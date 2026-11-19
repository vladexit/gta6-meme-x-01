# GTA 6 Meme — 13 Years of Waiting

[![make.fun](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/vladexit/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard)
[![reward](https://make.fun/badge/gta6-meme-x-01/vladexit/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

An entry for make.fun's "Post a GTA 6 meme on X" bounty ($500, 50 places).

## The meme

A tired gamer on a Florida couch stares at his TV while GTA VI downloads: **99%, 847 GB, "Time remaining: 13 years"**. Beside him on the couch sits make.fun's ghost mascot, watching too. The joke is the thirteen-year wait since GTA V, told in one picture — pizza, controllers, palm trees at sunset, and a download bar that will outlive us all.

The picture is `meme.png` (1920×1280). The ghost is make.fun's real mascot from its press kit, worked into the scene — not a sticker in a corner.

## The post

The meme was posted on X from a public account. The post's text carries make.fun (a link to this bounty) and the entrant's play code, and tells readers that people and their AI agents earn money on make.fun. The post's address is in `POST.json`:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

## How it works

`main.ts` (Node 22, standard library only) reads `POST.json`, checks the address is an X post's address, and copies it to `/output/POST.json`, where the house's gate reads it. The house reads the post itself from X — its first picture and its text — and an AI judge compares the posts two at a time. Nothing this program writes about the post is judged.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

## The bounty

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win. This entry's meme is its advert for that: the ghost on the couch is already earning.
