# Sidebar Shell for the Kingshot Guide Site

Date: 2026-08-25
Status: Approved

## Problem

The site is a static SvelteKit app deployed to GitHub Pages with a single
placeholder page. It needs a shell: a scrollable navigation panel on the left
that lists guide pages, and a content area on the right that displays the
selected page.

## Scope

A proof of concept covering the layout, navigation, active-page state, mobile
behaviour, and dark theme, populated with six placeholder guides across three
categories: Getting Started (Overview, First Steps), Heroes (Tier List, Gear),
and Base (Buildings, Research). Real guide content comes later.

## Decisions

| Decision | Choice | Reason |
| --- | --- | --- |
| Content format | Plain `.svelte` pages | No new dependencies; full markup control |
| Expected size | 10-40 pages, grouped into categories | Sidebar needs grouping, not search || Nav source | Hand-maintained manifest in `src/lib/nav.ts` | Single source of truth; avoids duplicated markup |
| Mobile | Off-canvas drawer under 768px | Preserves full-width reading on phones |
| Styling | Scoped CSS plus custom properties | Zero dependencies; restyling means editing a few values |
| Theme | Dark, game-themed | Matches the subject matter |

Two alternatives were rejected. Hardcoding the links in the layout tangles
categories, active state, and drawer markup into one block that does not survive
40 pages. Deriving the nav from the filesystem with `import.meta.glob` removes
drift but forces every page to carry a `+page.ts` for its title and makes
ordering awkward, which is more machinery than this size warrants. Revisit the
filesystem approach beyond 50 pages.

## Structure

```
src/lib/nav.ts                        NavSection[] { title, items: { title, slug }[] }
src/lib/components/Sidebar.svelte     Nav rendering, active highlight, own scrollbar
src/routes/+layout.svelte             Grid shell, drawer state, hamburger, theme tokens
src/routes/+page.svelte               Landing page
src/routes/guides/<slug>/+page.svelte Placeholder guides
```

### `nav.ts`

Exports a typed `NavSection[]`. Each item carries a title and a slug; hrefs are
derived as `${base}/guides/${slug}` so the `BASE_PATH` override keeps working.
The manifest defines both the sidebar order and the set of routes that must
exist.

### `Sidebar.svelte`

Receives no data beyond the manifest it imports. Renders a `<nav>` containing one
group per section, each with a heading and a list of links. Compares each href
against `page.url.pathname` from `$app/state` to set both an active CSS class and
`aria-current="page"`. Owns its scrollbar so long lists scroll without moving the
article.

### `+layout.svelte`

Holds the grid, the drawer open state, the hamburger button, the backdrop, and
the `:root` custom properties. Above 768px the grid is `280px 1fr`, the sidebar
is `position: sticky` at `100dvh` with `overflow-y: auto`, and the content column
is capped at `70ch`. Below 768px the grid collapses to one column, the sidebar
becomes `position: fixed` and translated off-canvas, and a slim top bar exposes
the hamburger.

## Behaviour

The drawer closes on backdrop click, on `Escape`, and on navigation via
`afterNavigate`. The last case is the one that breaks if forgotten: tapping a
link would otherwise leave the drawer covering the page it just opened.

## Constraints

Runes mode is forced in `vite.config.ts`, so state uses `$state` and `$props`,
not legacy stores. `+layout.ts` sets `prerender = true` and `adapter-static` runs
with `strict: true`, so every guide route must be reachable by link from a
prerendered page or the build fails. The sidebar links satisfy this. Every guide
listed in the manifest must therefore have a matching route folder.

## Theme

Six custom properties on `:root`: page background, elevated surface, border,
primary text, muted text, accent. Every colour in the shell references one of
them.

## Verification

1. `npm run build` succeeds, which proves under `strict: true` that all routes prerendered.
2. `build/index.html` and one guide's `index.html` contain rendered markup, not an empty shell.
3. Browser check at desktop width: sidebar scrolls independently, active link is highlighted.
4. Browser check at mobile width: hamburger opens the drawer, and the drawer closes on selecting a link.

## Out of scope

Search, breadcrumbs, collapsible sections, a light theme, real guide content, and
per-page metadata.
