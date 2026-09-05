# Time to read — design

## Goal

Show a "time to read" estimate near each guide's TL;DR section, calculated as
silent reading time.

## Requirements

- Appears as a small muted line directly **below** the `TL;DR` `<h2>` heading,
  e.g. `🕓 ~3 min read`.
- Based on the **whole guide page content** (all on-page text), not just the
  TL;DR bullets.
- Reading speed: **200 words per minute** (silent reading, conservative web
  default). Single shared constant.
- Reactive to language switching — updates when the active locale changes, and
  is present in the prerendered HTML (no post-mount flash or layout shift).
- Applies to the 7 guides that have a TL;DR: `bear`,
  `allaince-championship`, `strongest-governor`, `vikings`, `castle-battle`,
  `swordland-showdown`, `tri-alliance-clash`. The `timeline` page has no TL;DR
  and is not touched.

## Approach

Reactive, render-time computation from the i18n translation data (chosen over
client-side DOM measurement and build-time precomputation). Because it is
computed during render from the `$t` store, the number is baked into the
prerendered HTML and re-renders automatically on locale change.

## Components

### `src/lib/components/ReadingTime.svelte`

- Prop: `guide: string` (e.g. `"bear"`).
- Reads the guide's translation subtree via `$t('guides.<guide>')`.
- Recursively walks the subtree collecting all **string leaf values**, skipping
  the `meta` block (SEO title/description — not visible on the page).
- Word counting on the collected text:
  1. Strip HTML tags (translation strings contain inline `<strong>`, `<a>`).
  2. Count whitespace-separated tokens.
  3. Add the count of CJK characters so Chinese (which is not space-delimited)
     is not drastically undercounted. Space-delimited scripts (Arabic, Latin,
     etc.) count normally via tokens.
- `minutes = max(1, Math.round(words / WORDS_PER_MINUTE))` with
  `WORDS_PER_MINUTE = 200`.
- Renders a muted line: `🕓 ~{minutes} {label}` where `{label}` comes from
  `common.readingTime` (e.g. `"min read"`).
- Scoped styles: `color: var(--muted)`, ~`0.85rem`, small top margin so it sits
  snugly beneath the heading.

## i18n

Add a `readingTime` key under `common` in every locale's `common.json`
(en, ar, id, pt, tr, zh) with a localized "min read" label.

## Page integration

In each of the 7 guide `+page.svelte` files, import `ReadingTime` and render it
immediately after the TL;DR `<h2>`:

```svelte
<section class="tldr">
    <h2>{$t('guides.bear.tldr.heading')}</h2>
    <ReadingTime guide="bear" />
    <ul>
        ...
    </ul>
</section>
```

## Testing / verification

- `npm run check` passes (type-check).
- `npm run build` succeeds (prerender works, no SSR errors).
- Spot-check a couple of guide pages: reading time line renders under the TL;DR
  heading and shows a plausible number; switching language updates the label and
  the number.

## Out of scope

- No new dependencies.
- No changes to the timeline page or non-guide routes.
- No persisted/precomputed reading-time data.
