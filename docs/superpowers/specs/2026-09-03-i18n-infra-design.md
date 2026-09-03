# i18n Infrastructure Setup (English-only)

## Context

The `777/` SvelteKit app already lists `sveltekit-i18n` as a dependency and has an
empty `src/lib/translations/` folder, but nothing is wired up. All UI text is
currently hardcoded in Svelte components and `src/lib/nav.ts`.

## Goal

Set up the `sveltekit-i18n` infrastructure end-to-end and migrate all existing
hardcoded UI strings (layout chrome, sidebar/nav, home page) into translation
files, so future locales can be added by dropping in new JSON files. Only
English is supported for now — no locale switcher or `[lang]` routing is added
in this pass.

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
  map holding all extracted UI text.
- `src/lib/translations/i18n.ts` — creates and exports the `sveltekit-i18n`
  instance:

  ```ts
  import i18n from 'sveltekit-i18n';

  const config = {
    loaders: [
      { locale: 'en', key: 'common', loader: async () => (await import('./en/common.json')).default }
    ]
  };

  export const { t, locale, loading, loadTranslations } = new i18n(config);
  ```

- `src/routes/+layout.ts` — becomes an async `load()` that calls
  `loadTranslations('en', url.pathname)` before returning, keeping
  `prerender = true`. Locale is hardcoded to `'en'` for now; this can be
  extended later without restructuring.

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
- Guide page long-form content (bear hunt, castle battle, etc.) — stays
  hardcoded for now.

## Testing / Verification

- `npm run check` (svelte-check) in `777/` — confirm no type errors from the
  `NavItem`/`NavSection` type change or new imports.
- `npm run build` in `777/` — confirm the static adapter still prerenders all
  routes successfully with translations resolved (no missing-key warnings, no
  literal keys leaking into rendered HTML).
