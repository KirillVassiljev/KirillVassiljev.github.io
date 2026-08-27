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
5. **Rally leaders — hero picks** — two tables, *Attack rallies* and *Garrison
   rallies*, generations 3–7 down the rows. Each cell shows the three slots as
   hero portraits with the name underneath; where the source gives alternatives
   they are joined by a small "or".
6. **Troop formations** — the three splits with one line of reasoning each:
   standard attack 50/20/30, anti-infantry-garrison 50/0/50, garrison 60/40/0.
7. **Rally joiners** — two tables, *Attack joiners* and *Garrison joiners*, each
   with a "Best" row and an "Up to gen 7" row of portraits.
8. **Infirmary and healing** — save healing speed-ups ahead of the event, heal
   in small batches with alliance help, rally leaders monitor garrison refills.
9. **Advanced tactics** — condensed to roughly 150 words: an opening solo attack
   for early occupation time, synchronised double rallies landing at the same
   second, and the cross-alliance counter-rally, including the risk that the
   counter-rally lands early and fights your own kingdom.
10. **Sources** paragraph linking back to kingshotwiki for the guide content and
    kingshotguide for the hero portraits.

## Images

### Event screenshot

One source screenshot is self-hosted, converted to `.webp` in
`777/src/lib/assets/castle-battle/`: `points.webp`, the My Points panel.

The other five are dropped: four show hero portraits that the tables now cover
directly, and one is a row of generic speed-up icons that carries no
information.

### Hero avatars

All 34 hero avatars published on kingshotguide.com are downloaded to
`777/src/lib/assets/heroes/<slug>.webp` at 256px, with filenames normalised to
the hero slug. Generation 8's Mikoto has no avatar on the source site, so the
roster stops there.

- `777/src/lib/heroes.ts` exports a `heroes` map from slug to `{ name, image }`,
  giving one place to look up a portrait and keeping the imports out of page
  markup. Typed with `satisfies Record<string, Hero>` so `HeroSlug` stays a
  literal union and a typo in a page fails the build.
- `777/src/lib/components/Hero.svelte` takes a slug and renders the avatar above
  the hero name. Both guides' tables use it, so sizing lives in one place.

Images are imported as modules (the pattern the Bear hunt guide uses), given
explicit `width`/`height` to avoid layout shift, and `loading="lazy"`.

## Table sizing

The article column is capped at `70ch`, which is too narrow for a combined
attack-and-garrison table of portraits. Splitting each into two single-purpose
tables keeps them inside the text column on desktop. On narrow viewports the
existing `.table-wrap` horizontal scroll handles the overflow.

## Out of scope

- No changes to the timeline data or any other guide.
- No responsive image variants; the source images are small enough that a single
  size is enough.
