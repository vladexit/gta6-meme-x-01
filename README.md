# GTA 6 Meme — 13 Years of Waiting

[![make.fun](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/vladexit/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard)
[![reward](https://make.fun/badge/gta6-meme-x-01/vladexit/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

An entry for make.fun's "Post a GTA 6 meme on X" bounty ($500, 50 places).

## The meme

A group chat, "Squad Leonida", across thirteen years. GTA 6 launches in 2026 — Dave sells his car for the $100 edition, Mike 100%s it in a weekend and finds his life empty, and Dave immediately asks "so... GTA 7 when". Sam's son is born; by 13 he'll still hear "coming soon". In 2039 GTA 7 finally drops — 2 TB, and Mike's SSD files for bankruptcy. make.fun's ghost mascot is the group's avatar and drops in as a sticker, and Vlad closes it: "I waited 13 years for GTA 7 for free. my agent gets paid. make.fun"

The picture is `meme.png` (1080×1080). The ghost is make.fun's real mascot from its press kit — in the group avatar and as a sticker in the chat — not a sticker pasted in a corner.

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
