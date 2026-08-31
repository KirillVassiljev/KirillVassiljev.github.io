# Tri-Alliance Clash guide page — design

## Goal

Add a Tri-Alliance Clash guide to the Kingshot 777 site, condensing the
kingshotwiki.com event page into the same TL;DR-first format used by the
existing Viking vengeance guide.

## Scope

- New route: `777/src/routes/guides/tri-alliance-clash/+page.svelte`
- Nav entry in `777/src/lib/nav.ts`, Guides section, last item after Castle
  battle, titled "Tri-alliance clash", slug `tri-alliance-clash`

No new assets, components, or dependencies. The two images on the source page
(main-player movement routes and the role composition summary) are not copied;
the role composition is rendered as a text table instead.

## Structure

The page mirrors `guides/vikings/+page.svelte`: a `<svelte:head>` with title
`Tri-alliance clash — Kingshot 777` and a meta description, an `<h1>`, a
`.tldr` section, content sections, a `.source` paragraph linking back to the
wiki, and a scoped `<style>` block copied from the existing guide pages
(`.tldr`, `.qa`, `.source`, plus table styles matching `castle-battle`).

## Content

1. **TL;DR** — 6–8 bullets covering: 60-minute three-alliance match every four
   weeks; the Temple of Tides is worth 1,800 points per minute and everything
   before Phase 4 is setup; stay in your assigned lane; supporters rotate so
   the main player never dies and eats the 2-minute respawn walk; five squads
   are needed to skip a building; the Special Force moves as one group of six;
   do not overextend.
2. **Event format** — matchmaking and deployment rules: 30 combatants plus 10
   substitutes, three squads per player, two legions per alliance, soldier
   power ignored for matchmaking, members cannot leave the alliance once on
   the battlefield.
3. **Phases** — table of Phase / Length / What matters: Preparation (3 min),
   Seize & Conquer (17 min), Garrison Occupation (20 min), Temple Onslaught
   (20 min).
4. **Roles** — table of Role / Players / Job for Main Players (6), Supporters
   (12), Special Commander Force (6), Reaction Teams (6), Commanders (2),
   followed by short paragraphs on the two non-obvious roles: the Special
   Force skip rule and the Commanders' buff timing.
5. **Healing rotation** — the main player / supporter swap as a numbered list,
   since it is the highest-value mechanic on the page.
6. **Common mistakes** — overextending, splitting the Special Force,
   supporters pushing ahead, reaction teams rotating without need, rotating to
   the temple too late.
7. **Source** — link to `https://kingshotwiki.com/events/tri-alliance-clash/`.

## Verification

`npm run build` in `777/` succeeds, and the new page renders with a working
sidebar link.
