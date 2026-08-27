# Strongest Governor guide page

## Problem

`777/src/routes/guides/strongest-governor/+page.svelte` is an empty file, but
`src/lib/nav.ts` already links to it. The route renders a blank page.

## Solution

Fill the page in, mirroring the existing Alliance Championship guide
(`777/src/routes/guides/allaince-championship/+page.svelte`) so the two guides read the same.

Content is sourced from <https://kingshotwiki.com/events/strongest-governor/>.

### Structure

1. `<svelte:head>` — title `Strongest governor — Kingshot 777` and a TL;DR meta description.
2. `<h1>Strongest governor</h1>`
3. `.tldr` section — the headline facts: 7-day point competition, one theme per day, where
   points come from, the three leaderboards, and the 250,000-point qualification bar.
4. `<h2>The 7 days</h2>` — day-by-day stage list.
5. `<h2>Details</h2>` — `dl.qa` question/answer list covering scoring, Challenge Medals,
   and which rankings matter.
6. `<h2>Rewards</h2>` — point milestones, Challenge Medal rewards, daily stage ranking,
   kingdom total ranking, cross-kingdom ranking, kingdom-wide rewards.
7. `<h2>Tips</h2>` — banking resources for a chosen day, claiming both daily medals.
8. `<p class="source">` — link back to the wiki page.
9. `<style>` — copied from the Alliance Championship page (`.tldr`, `.qa`, `.source`).

### Out of scope

- No reward value tables. The source only provides them as screenshots.
- No changes to `nav.ts`, the sidebar, or any other route.

## Verification

`npm run build` in `777/` succeeds and the page renders with the sidebar shell.
