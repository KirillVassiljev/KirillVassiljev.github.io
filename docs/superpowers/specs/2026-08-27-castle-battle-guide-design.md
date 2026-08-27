# Castle Battle guide — design

Date: 2026-08-27

## Goal

Add a Castle Battle event guide to the Kingshot 777 site, condensed from
<https://kingshotwiki.com/events/castle-battle/>, following the conventions the
existing event guides already use.

## Route and navigation

- New page: `777/src/routes/guides/castle-battle/+page.svelte`.
- Registered in `777/src/lib/nav.ts` under the **Guides** section as
  `{ title: 'Castle battle', slug: 'castle-battle' }`, placed after
  Viking vengeance.
- No new components or layout changes. The page reuses the `.tldr`, `.qa` and
  `.source` styles that the other guide pages define locally.

## Page outline

1. `svelte:head` with title `Castle battle — Kingshot 777` and a one-sentence
   meta description.
2. `<h1>Castle battle</h1>`.
3. **TL;DR** box covering: the three point categories, checking the first-slot
   hero before joining a rally, formations, Infirmary and healing prep, and the
   overlap with All-Out / KvK that lets kills and losses score twice.
4. **How scoring works** — Carnage (KO), Occupation and Casualty points, with
   the in-game "My Points" screenshot.
5. **Rally leaders — hero picks** — a single table, generations 3–7 down the
   rows, *Attack rally* and *Garrison rally* as the two columns. Slashes denote
   interchangeable picks, matching the source.
6. **Troop formations** — the three splits with one line of reasoning each:
   standard attack 50/20/30, anti-infantry-garrison 50/0/50, garrison 60/40/0.
7. **Rally joiners** — a table of *Attack* vs *Garrison* first-slot heroes with
   the "up to gen 7" alternatives underneath, plus the two hero-portrait
   screenshots.
8. **Infirmary and healing** — save healing speed-ups ahead of the event, heal
   in small batches with alliance help, rally leaders monitor garrison refills.
9. **Advanced tactics** — condensed to roughly 150 words: an opening solo attack
   for early occupation time, synchronised double rallies landing at the same
   second, and the cross-alliance counter-rally, including the risk that the
   counter-rally lands early and fights your own kingdom.
10. **Source** paragraph linking back to kingshotwiki.

## Images

Three of the six source screenshots are self-hosted, converted to `.webp` in
`777/src/lib/assets/castle-battle/`:

- `points.webp` — the My Points panel.
- `joiners-attack.webp` — the four attack first-slot heroes.
- `joiners-garrison.webp` — the four garrison joiner heroes.

The other three are dropped: two show generation-3 hero portraits that the
rally-leader table already covers, and one is a row of generic speed-up icons
that carries no information.

Images are imported as modules (the pattern the Bear hunt guide uses), given
explicit `width`/`height` to avoid layout shift, and `loading="lazy"`.

## Out of scope

- No changes to the timeline data or any other guide.
- No responsive image variants; the source images are under 850px wide, so a
  single size is enough.
