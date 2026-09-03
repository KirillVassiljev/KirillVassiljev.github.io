# i18n Infrastructure Setup (English-only)

## Context

The `777/` SvelteKit app already lists `sveltekit-i18n` as a dependency and has an
empty `src/lib/translations/` folder, but nothing is wired up. All UI text is
currently hardcoded in Svelte components, `src/lib/nav.ts`, `src/lib/timeline.ts`,
and the eight guide page routes.

## Goal

Set up the `sveltekit-i18n` infrastructure end-to-end and migrate **all**
existing hardcoded UI/content text — layout chrome, sidebar/nav, home page, all
eight guide pages, and timeline milestone data — into translation files, so
future locales can be added by dropping in new JSON files. Only English is
supported for now — no locale switcher or `[lang]` routing is added in this
pass. Hero names in `heroes.ts` are proper nouns and stay as plain data.

## Approaches Considered

1. **`sveltekit-i18n`** (chosen) — already installed, provides a reactive
   `$t()` store and JSON-based lazy-loaded translation files.
2. Custom lightweight helper — zero deps, but reinvents loading/fallback logic
   already provided by option 1.
3. Paraglide JS — compile-time i18n, more powerful at scale, but a different
   toolchain that would replace the already-installed dependency. Overkill for
   a single-locale setup.

## Design

### File structure

- `src/lib/translations/en/common.json` — flat, dot-namespaced key → string
  map holding layout/nav/home UI text.
- `src/lib/translations/en/guides/{bear,allaince-championship,strongest-governor,
  vikings,castle-battle,tri-alliance-clash,swordland-showdown,timeline}.json`
  — one file per guide page, nested to mirror that page's structure (see
  "Content migration" below).
- `src/lib/translations/i18n.ts` — creates and exports the `sveltekit-i18n`
  instance, with one loader per content area. Guide loaders are scoped to
  their route via sveltekit-i18n's `routes` filter so a guide's translations
  only load when that page is visited:

  ```ts
  import i18n from 'sveltekit-i18n';

  const config = {
    loaders: [
      { locale: 'en', key: 'common', loader: async () => (await import('./en/common.json')).default },
      {
        locale: 'en',
        key: 'guides.bear',
        routes: ['/guides/bear'],
        loader: async () => (await import('./en/guides/bear.json')).default
      }
      // ...one such entry per guide, plus guides.timeline
    ]
  };

  export const { t, locale, loading, loadTranslations } = new i18n(config);
  ```

- `src/routes/+layout.ts` — becomes an async `load()` that calls
  `loadTranslations('en', url.pathname)` before returning, keeping
  `prerender = true`. Locale is hardcoded to `'en'` for now; this can be
  extended later without restructuring.

### Rich text handling

Guide content includes inline HTML (e.g. `<strong>Archers win.</strong>`)
inside list items and paragraphs. Since this content is static and
developer-authored (not user input), translation values may contain raw HTML
and are rendered with `{@html $t('...')}`. List items are stored as JSON
arrays and rendered with `{#each $t('...') as item}<li>{@html item}</li>{/each}`.

### Content migration (guide pages)

Each guide page's `<svelte:head>` title/description, headings, TL;DR list
items, Q&A `dt`/`dd` pairs, tips lists, image `alt` text, and `figcaption`
text move into that guide's JSON file, nested to mirror the page (e.g.
`meta.title`, `meta.description`, `h1`, `tldr.items[]`, `qa[].question`/
`qa[].answer`, `tips.before[]`, `tips.during[]`, image `alt`/`caption` keys).
The exact key shape is determined per page during implementation, following
this pattern. The "Source: kingshotwiki.com" attribution line is also moved
(link text + URL can stay in the JSON value as HTML).

### Timeline data (`timeline.ts`)

- `Milestone` gets a new stable `id` field (kebab-case, e.g. `gen-1-heroes`),
  derived from the current title, used as a translation key.
- `title`/`notes` fields become `titleKey`/`notesKey`, pointing into
  `guides.timeline.milestones.<id>.title` / `.notes` in
  `en/guides/timeline.json`.
- `categoryLabels` values move into `guides.timeline.categories.<category>`
  in the same file; `timeline.ts` keeps the `MilestoneCategory` keys but looks
  up display labels via `$t(...)`.
- `heroes.ts` is unchanged — hero names are proper nouns and stay as plain
  data, not translated.

### Translation keys

| Key | Value | Used in |
|---|---|---|
| `layout.brandTitle` | "Kingshot 777" | topbar title + sidebar brand link |
| `layout.toggleNav` | "Toggle navigation" | hamburger `aria-label` |
| `layout.closeNav` | "Close navigation" | backdrop `aria-label` |
| `sidebar.ariaLabel` | "Site sections" | `<nav aria-label>` |
| `nav.section.guides` | "Guides" | section title |
| `nav.section.tools` | "Tools" | section title |
| `nav.item.bear` | "Bear hunt" | nav item |
| `nav.item.allaince-championship` | "Allaince championship" | nav item |
| `nav.item.strongest-governor` | "Strongest governor" | nav item |
| `nav.item.vikings` | "Viking vengeance" | nav item |
| `nav.item.castle-battle` | "Castle battle" | nav item |
| `nav.item.tri-alliance-clash` | "Tri-alliance clash" | nav item |
| `nav.item.swordland-showdown` | "Swordland showdown" | nav item |
| `nav.item.timeline` | "Timeline" | nav item |
| `home.title` | "Kingshot 777" | home `<h1>` |
| `home.description` | "Guides, tier lists, and build orders. Pick a topic from the sidebar." | home `<p>` |

`nav.ts`'s `NavItem`/`NavSection` types change `title: string` → `titleKey:
string`, holding the translation key instead of display text.

### Wiring

- `+layout.svelte`: import `t` from `$lib/translations/i18n`, replace the
  topbar title, brand link text, and the two `aria-label`s with `$t(...)`.
- `Sidebar.svelte`: import `t`, replace the static `aria-label` and render
  `$t(section.titleKey)` / `$t(item.titleKey)`.
- `+page.svelte`: import `t`, replace heading/paragraph with `$t('home.title')`
  / `$t('home.description')`.
- `nav.ts`: swap `title` values for the `titleKey` values above.

### Out of scope

- Locale switcher UI, `[lang]` route segment, browser-locale detection.
- Hero names in `heroes.ts` (proper nouns, stay as plain data).

## Testing / Verification

- `npm run check` (svelte-check) in `777/` — confirm no type errors from the
  `NavItem`/`NavSection`/`Milestone` type changes and new imports.
- `npm run build` in `777/` — confirm the static adapter still prerenders all
  routes successfully with translations resolved (no missing-key warnings, no
  literal keys leaking into rendered HTML).
- Manual visual spot-check via `npm run dev` of one guide page with rich-text
  list items (e.g. bear hunt) and the timeline page, to confirm `{@html}`
  rendering and milestone lookups render correctly.
