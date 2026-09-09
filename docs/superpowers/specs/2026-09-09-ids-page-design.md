# IDs page design

## Goal

Add a simple static page under the **Tools** nav section (next to Timeline) that lists
the player/governor IDs from the gist:
`https://gist.githubusercontent.com/KirillVassiljev/1483a96d4273479390ddf6738957f3c6/raw/ids.csv`

The gist is a single line of 7 numeric IDs:
`310641156, 314557524, 310674611, 310936924, 322905143, 310788821, 313803270`

## Scope

- Display the IDs only. No API lookups, no extra data.
  (The Century Games `/api/player` lookup endpoint has been removed and now returns
  404, so live profile lookups are not possible anyway.)
- IDs are hardcoded in the page — the site is fully static (adapter-static).

## Changes

1. **Route** `src/routes/guides/ids/+page.svelte`
   - Mirrors existing page shell: `<svelte:head>` title/description, `<h1>`, intro `<p>`.
   - Renders the 7 IDs as a plain list from a local `const ids = [...]` array.
2. **Nav** `src/lib/nav.ts` — add `{ titleKey: 'common.nav.item.ids', slug: 'ids' }`
   to the Tools section.
3. **i18n** `src/lib/translations/i18n.ts` — add `'ids'` to the `guides` array so the
   route-scoped loader is registered.
4. **Translations** for all 6 locales (en, zh, id, tr, pt, ar):
   - `common.json` → `nav.item.ids` label.
   - `guides/ids.json` → `meta.title`, `meta.description`, `h1`, `intro`.
   (All locales required: the i18n loader throws if any `guides/ids.json` is missing.)

## Verification

- `npm run check` passes (svelte-check).
- `npm run build` succeeds.
- Page reachable at `/guides/ids`, shows all 7 IDs, and appears in the Tools nav.
