# i18n Infrastructure & Full Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up the already-installed `sveltekit-i18n` library end-to-end in the `777/` SvelteKit app, and migrate every hardcoded English string on the site — layout chrome, navigation, home page, all 8 guide pages, and timeline milestone data — into translation JSON files, so future locales can be added by dropping in new files. English-only for now; no locale switcher or `[lang]` routing.

**Architecture:** One `sveltekit-i18n` instance (`777/src/lib/translations/i18n.ts`) with `preprocess: 'preserveArrays'` and one loader per content area — a `common` loader (always active) plus a route-scoped loader per guide page, so each guide's translations only load when that page is visited. Rich text (inline `<strong>`/`<em>`) is stored as raw HTML strings in JSON and rendered with `{@html}`.

**Tech Stack:** SvelteKit 2 (Svelte 5, runes mode), `sveltekit-i18n` 2.4.2, static prerendering via `@sveltejs/adapter-static`.

## Global Constraints

- Locale is hardcoded to `'en'` — no locale switcher, no `[lang]` route segment, no browser-locale detection (out of scope for this plan).
- Hero names in `777/src/lib/heroes.ts` are proper nouns and are NOT translated — left as plain data, unchanged.
- Every translation JSON file's content is **flat starting from its first real key** (e.g. `meta`, `h1`) — never wrapped in an extra object matching the loader's own `key` (e.g. never `{"guides": {"bear": {...}}}` inside `en/guides/bear.json`). The loader's `key` (e.g. `'guides.bear'`) already supplies that prefix automatically; double-wrapping silently breaks every `$t(...)` lookup for that file (verified empirically — see Task 10, Step 3, for how to detect this class of bug if it recurs).
- Arrays in translation JSON (list items, Q&A pairs, tip groups) stay as real JS arrays at runtime only because `preprocess: 'preserveArrays'` is set in `777/src/lib/translations/i18n.ts` (Task 1) — every later task's `{#each $t('...') as item}` usage depends on this.
- All existing visible text must be preserved byte-for-byte when moved into JSON (this is a content migration, not a rewrite/rewording).
- The `<style>` blocks and `<script>` import statements (image imports, etc.) in every guide page are unchanged — only the markup/text below them changes.

---

### Task 1: i18n setup + layout/nav/home migration

**Files:**
- Create: `777/src/lib/translations/en/common.json`
- Create: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/+layout.ts`
- Modify: `777/src/routes/+layout.svelte`
- Modify: `777/src/lib/nav.ts`
- Modify: `777/src/lib/components/Sidebar.svelte`
- Modify: `777/src/routes/+page.svelte`

**Interfaces:**
- Produces: `t` (a Svelte store, used as `$t(key: string, params?: object)` in templates), `locale`, `loading`, `loadTranslations(locale: string, route?: string)` — all exported from `777/src/lib/translations/i18n.ts`. Every later task imports `t` from this same module and appends its own entry to the `loaders` array inside it.
- Produces: `NavItem = { titleKey: string; slug: string }` and `NavSection = { titleKey: string; items: NavItem[] }`, exported from `777/src/lib/nav.ts`. This replaces the previous `title: string` field — any other file reading `.title` off these types must be updated to `.titleKey` and wrapped in `$t(...)`.

- [ ] **Step 1: Create the common translations file**

Create `777/src/lib/translations/en/common.json`:

```json
{
	"layout": {
		"brandTitle": "Kingshot 777",
		"toggleNav": "Toggle navigation",
		"closeNav": "Close navigation"
	},
	"sidebar": {
		"ariaLabel": "Site sections"
	},
	"nav": {
		"section": {
			"guides": "Guides",
			"tools": "Tools"
		},
		"item": {
			"bear": "Bear hunt",
			"allaince-championship": "Allaince championship",
			"strongest-governor": "Strongest governor",
			"vikings": "Viking vengeance",
			"castle-battle": "Castle battle",
			"tri-alliance-clash": "Tri-alliance clash",
			"swordland-showdown": "Swordland showdown",
			"timeline": "Timeline"
		}
	},
	"home": {
		"title": "Kingshot 777",
		"description": "Guides, tier lists, and build orders. Pick a topic from the sidebar."
	}
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/common.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Create the i18n config module**

Create `777/src/lib/translations/i18n.ts`:

```ts
import i18n, { type Config } from 'sveltekit-i18n';

// 'preserveArrays' keeps JSON arrays (e.g. list items) as real arrays after
// loading, instead of flattening them into 'key.0', 'key.1', ... entries.
// Every task that adds a `loaders` entry below relies on this setting.
const config: Config = {
	preprocess: 'preserveArrays',
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		}
	]
};

export const { t, locale, loading, loadTranslations } = new i18n(config);
```

- [ ] **Step 4: Wire translation loading into the root layout load function**

Replace the full contents of `777/src/routes/+layout.ts` with:

```ts
import type { LayoutLoad } from './$types';
import { loadTranslations } from '$lib/translations/i18n';

export const prerender = true;

export const load: LayoutLoad = async ({ url }) => {
	// Locale is hardcoded to 'en' for now — no locale switcher yet.
	await loadTranslations('en', url.pathname);
	return {};
};
```

- [ ] **Step 5: Use translations in the root layout template**

In `777/src/routes/+layout.svelte`, add the import and replace the three hardcoded strings.

Add to the `<script>` block (alongside the other `$lib` imports):

```ts
	import { t } from '$lib/translations/i18n';
```

Replace:

```svelte
		<span class="topbar-title">Kingshot 777</span>
```

with:

```svelte
		<span class="topbar-title">{$t('layout.brandTitle')}</span>
```

Replace:

```svelte
		<button
			class="hamburger"
			aria-label="Toggle navigation"
			aria-expanded={open}
			aria-controls="sidebar"
			onclick={() => (open = !open)}
		>
```

with:

```svelte
		<button
			class="hamburger"
			aria-label={$t('layout.toggleNav')}
			aria-expanded={open}
			aria-controls="sidebar"
			onclick={() => (open = !open)}
		>
```

Replace:

```svelte
		<a class="brand" href="{base}/">Kingshot 777</a>
```

with:

```svelte
		<a class="brand" href="{base}/">{$t('layout.brandTitle')}</a>
```

Replace:

```svelte
	<button
		class="backdrop"
		aria-label="Close navigation"
		tabindex={open ? 0 : -1}
		onclick={() => (open = false)}
	></button>
```

with:

```svelte
	<button
		class="backdrop"
		aria-label={$t('layout.closeNav')}
		tabindex={open ? 0 : -1}
		onclick={() => (open = false)}
	></button>
```

- [ ] **Step 6: Migrate nav data to translation keys**

Replace the full contents of `777/src/lib/nav.ts` with:

```ts
export type NavItem = {
	titleKey: string;
	slug: string;
};

export type NavSection = {
	titleKey: string;
	items: NavItem[];
};

export const sections: NavSection[] = [
	{
		titleKey: 'nav.section.guides',
		items:
		[
			{ titleKey: 'nav.item.bear', slug: 'bear' },
			{ titleKey: 'nav.item.allaince-championship', slug: 'allaince-championship' },
			{ titleKey: 'nav.item.strongest-governor', slug: 'strongest-governor' },
			{ titleKey: 'nav.item.vikings', slug: 'vikings' },
			{ titleKey: 'nav.item.castle-battle', slug: 'castle-battle' },
			{ titleKey: 'nav.item.tri-alliance-clash', slug: 'tri-alliance-clash' },
			{ titleKey: 'nav.item.swordland-showdown', slug: 'swordland-showdown' },
		]
	},
	{
		titleKey: 'nav.section.tools',
		items: [{ titleKey: 'nav.item.timeline', slug: 'timeline' }]
	}
];
```

- [ ] **Step 7: Use translations in the Sidebar component**

Replace the full contents of `777/src/lib/components/Sidebar.svelte` with:

```svelte
<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { sections } from '$lib/nav';
	import { t } from '$lib/translations/i18n';
</script>

<nav aria-label={$t('sidebar.ariaLabel')}>
	{#each sections as section (section.titleKey)}
		<div class="group">
			<h2>{$t(section.titleKey)}</h2>
			<ul>
				{#each section.items as item (item.slug)}
					{@const path = `/guides/${item.slug}`}
					<li>
						<a
							href="{base}{path}"
							aria-current={page.url.pathname.endsWith(path) ? 'page' : undefined}
						>
							{$t(item.titleKey)}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>

<style>
	nav {
		padding: 0.5rem 0 2rem;
	}

	.group + .group {
		margin-top: 1.5rem;
	}

	h2 {
		margin: 0 0 0.5rem;
		padding: 0 1.25rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: block;
		padding: 0.5rem 1.25rem;
		border-left: 2px solid transparent;
		color: var(--text);
		text-decoration: none;
		font-size: 0.95rem;
	}

	a:hover {
		background: var(--surface);
	}

	a[aria-current='page'] {
		border-left-color: var(--accent);
		background: var(--surface);
		color: var(--accent);
		font-weight: 600;
	}

	a:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
	}
</style>
```

- [ ] **Step 8: Use translations on the home page**

Replace the full contents of `777/src/routes/+page.svelte` with:

```svelte
<script lang="ts">
	import { t } from '$lib/translations/i18n';
</script>

<h1>{$t('home.title')}</h1>
<p>{$t('home.description')}</p>
```

- [ ] **Step 9: Type-check**

Run: `cd 777 && npm run check`
Expected: no errors (warnings about unrelated pre-existing issues, if any, are out of scope)

- [ ] **Step 10: Build and confirm the home page renders translated text**

Run: `cd 777 && npm run build`
Expected: build succeeds; open `777/build/index.html` and confirm it contains "Kingshot 777" (topbar/brand) and "Guides, tier lists, and build orders. Pick a topic from the sidebar." (home page), not literal translation keys like `home.title`.

- [ ] **Step 11: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations 777/src/routes/+layout.ts 777/src/routes/+layout.svelte 777/src/routes/+page.svelte 777/src/lib/nav.ts 777/src/lib/components/Sidebar.svelte
git commit -m "feat(i18n): set up sveltekit-i18n and migrate layout/nav/home"
```

---

### Task 2: Migrate bear guide content to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/bear.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/guides/bear/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created in Task 1) — this task appends its own loader entry to that array. Relies on `preprocess: 'preserveArrays'` already being set there so JSON arrays stay arrays for `{#each}`.
- Produces: the key namespace `guides.bear.*`, used by nothing else.

- [ ] **Step 1: Create the translation JSON file**

Create `777/src/lib/translations/en/guides/bear.json`. **Important:** keys are flat starting from `meta`/`h1`/etc — do NOT wrap this in an outer `{"guides": {"bear": {...}}}` object; the `guides.bear.` prefix is added automatically by the loader's `key`, so double-wrapping would break every lookup.

```json
{
	"meta": {
		"title": "Bear hunt — Kingshot 777",
		"description": "TL;DR guide to the Kingshot Bear Hunt event: rally formations, troop ratios, buffs, and wave timing."
	},
	"h1": "Bear trap",
	"tldr": {
		"heading": "TL;DR",
		"items": [
			"<strong>Archers win.</strong> Bear damage scales with archers — ratios shift from balanced in Gen 1 to 10/10/80 by Gen 4, and up to ~98% archers late game.",
			"<strong>Rally leader:</strong> all three heroes' skills are active, so pick the best offensive trio for your generation.",
			"<strong>Joining a rally:</strong> only the top expedition skill of the top 4 joiners with max skill counts. Wrong hero hurts the rally — send troops with no hero instead.",
			"<strong>Always on:</strong> pet buff + Field Commander minister buff. Gems for city ATK / Lethality / Deployment if you can afford it.",
			"<strong>Be fast:</strong> pre-save preset formations and star the whale rallies so they show at the top of the list.",
			"<strong>Endgame:</strong> stagger waves 1 min apart and relaunch the moment marches return — never let troops sit idle."
		]
	},
	"sections": {
		"formations": {
			"heading": "Rally leader formations"
		},
		"joiners": {
			"heading": "Joining a rally (Gen 1–6)"
		},
		"details": {
			"heading": "Details"
		},
		"tips": {
			"heading": "Tips",
			"groups": [
				{
					"heading": "Before the event",
					"items": [
						"<strong>Upgrade the Pitfall to Level 5</strong> with Explosive Arrowheads. That's a <strong>+25% attack boost for the entire alliance</strong> — the single biggest lever available, and it needs doing during the preparation stage.",
						"<strong>Move your city next to the trap.</strong> Alliance members should interlock borders tightly with no gaps so troops deploy faster and get more hits in. Mostly a late-game concern — early on, members hopping between alliances makes this messy.",
						"<strong>Save preset formations.</strong> Rallies fill and launch in seconds; if you're building a march from scratch you've already missed it.",
						"<strong>Line up your buffs:</strong> pet buff active, Field Commander minister slot registered. Gems can also buy city ATK / Lethality / Deployment Capacity bonuses, though that's really a whale expense."
					]
				},
				{
					"heading": "During the event",
					"items": [
						"<strong>Archers are the damage.</strong> Ratios shift from balanced early to 10/10/80 by Gen 4; late game aim for ~98% archer capacity in every combat march. When joining rather than leading, 20/30/50 is fine.",
						"<strong>Star the whale rallies.</strong> The star feature pins a player's rally to the top of the list instead of newest-at-the-bottom — a big help if you're slow to react.",
						"<strong>Leading:</strong> all three of your heroes' skills fire, no matter which one is captain, so position doesn't matter. Pick the best offensive trio for your generation.",
						"<strong>Joining:</strong> only the top expedition skill counts, and only from the four joiners with the highest skill levels. A wrong hero can displace a good one and drag the whole rally down — <strong>send troops with no hero rather than the wrong hero.</strong>",
						"<strong>Troop levels matter too.</strong> Hero skills aren't the whole picture; higher-tier troops and the right ratio move the number just as much."
					]
				}
			]
		}
	},
	"qa": [
		{
			"q": "What is it?",
			"a": "An alliance-wide PvE rally event against the Bear. Everyone piles marches into rallies aimed at the trap, and the damage you deal is what earns you points."
		},
		{
			"q": "When does it run?",
			"a": "Every two days — a cooldown of two daily in-game resets. Take part today and you're eligible again two days later."
		},
		{
			"q": "Why are there two traps?",
			"a": "So members in different time zones can each find a slot that suits them. <strong>You only get one:</strong> if you joined Bear Trap 1 you cannot also join Bear Trap 2 — you wait two days for the next Trap 1."
		},
		{
			"q": "Where is it?",
			"a": "At the Bear Hunt trap on the alliance's territory. Marches travel there, so the closer your city sits the more hits you land."
		},
		{
			"q": "Who does what?",
			"a": "Whales and big accounts lead rallies; everyone else fills them. Alliance leadership assigns wave slots before the event so launches stay staggered."
		},
		{
			"q": "Why bother?",
			"a": "It's one of the highest-value events in the game, it's pure PvE so your troops don't die, and points scale directly with damage — which is why hero choice and troop ratio matter so much."
		}
	],
	"images": {
		"formations": {
			"alt": "Best bear formations chart: recommended hero trio and troop ratio for generations 1 to 6, split into best heroes and F2P columns.",
			"caption": "Best bear formations by generation. Tap to open full size."
		},
		"joiners": {
			"alt": "Bear hunt joiner hero tier list with S, A, Avoid, and Never Use These tiers.",
			"caption": "Joiner tier list — only the top expedition skill matters here."
		}
	},
	"source": "Source: <a href=\"https://kingshotwiki.com/events/bear-hunt/\" rel=\"noreferrer\">kingshotwiki.com — Bear Hunt</a>"
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/bear.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Register the loader**

In `777/src/lib/translations/i18n.ts`, add a new entry to the `loaders` array, after the `common` entry:

```ts
		{
			locale: 'en',
			key: 'guides.bear',
			routes: ['/guides/bear'],
			loader: async () => (await import('./en/guides/bear.json')).default
		}
```

- [ ] **Step 4: Rewrite the Svelte template to use the translations**

Replace the full contents of `777/src/routes/guides/bear/+page.svelte` with:

```svelte
<script lang="ts">
	import formations640 from '$lib/assets/bear/formations-640.webp';
	import formations1024 from '$lib/assets/bear/formations-1024.webp';
	import formations1600 from '$lib/assets/bear/formations-1600.webp';
	import joiners640 from '$lib/assets/bear/joiners-640.webp';
	import joiners1024 from '$lib/assets/bear/joiners-1024.webp';
	import { t } from '$lib/translations/i18n';
</script>

<svelte:head>
	<title>{$t('guides.bear.meta.title')}</title>
	<meta name="description" content={$t('guides.bear.meta.description')} />
</svelte:head>

<h1>{$t('guides.bear.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.bear.tldr.heading')}</h2>
	<ul>
		{#each $t('guides.bear.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.bear.sections.formations.heading')}</h2>

<figure>
	<a href={formations1600} target="_blank" rel="noreferrer">
		<img
			src={formations1024}
			srcset="{formations640} 640w, {formations1024} 1024w, {formations1600} 1600w"
			sizes="(min-width: 768px) 70ch, 100vw"
			width="1024"
			height="983"
			alt={$t('guides.bear.images.formations.alt')}
			loading="lazy"
			decoding="async"
		/>
	</a>
	<figcaption>{$t('guides.bear.images.formations.caption')}</figcaption>
</figure>

<h2>{$t('guides.bear.sections.joiners.heading')}</h2>

<figure>
	<img
		src={joiners1024}
		srcset="{joiners640} 640w, {joiners1024} 1024w"
		sizes="(min-width: 768px) 70ch, 100vw"
		width="1024"
		height="423"
		alt={$t('guides.bear.images.joiners.alt')}
		loading="lazy"
		decoding="async"
	/>
	<figcaption>{$t('guides.bear.images.joiners.caption')}</figcaption>
</figure>

<h2>{$t('guides.bear.sections.details.heading')}</h2>

<dl class="qa">
	{#each $t('guides.bear.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<h2>{$t('guides.bear.sections.tips.heading')}</h2>

{#each $t('guides.bear.sections.tips.groups') as group}
	<h3>{group.heading}</h3>
	<ul>
		{#each group.items as item}
			<li>{@html item}</li>
		{/each}
	</ul>
{/each}

<p class="source">{@html $t('guides.bear.source')}</p>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.qa {
		margin: 1.5rem 0;
	}

	.qa dt {
		margin-top: 1.1rem;
		color: var(--accent);
		font-weight: 700;
	}

	.qa dd {
		margin: 0.3rem 0 0;
	}

	figure {
		margin: 1.5rem 0;
	}

	figure img {
		display: block;
		width: 100%;
		height: auto;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	figcaption {
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
```

- [ ] **Step 5: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Archers win\|Rally leader\|Bear trap" 777/src/routes/guides/bear/+page.svelte`
Expected: no output

- [ ] **Step 6: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/bear.json 777/src/lib/translations/i18n.ts 777/src/routes/guides/bear/+page.svelte
git commit -m "feat(i18n): migrate bear guide to translations"
```

---

### Task 3: Migrate allaince-championship guide content to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/allaince-championship.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/guides/allaince-championship/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created in Task 1) — this task appends its own loader entry to that array.
- Produces: the key namespace `guides.allaince-championship.*`, used by nothing else.

- [ ] **Step 1: Create the translation JSON file**

Create `777/src/lib/translations/en/guides/allaince-championship.json`. Keys are flat starting from `meta`/`h1`/etc — do NOT wrap in an outer `{"guides": {"allaince-championship": {...}}}` object.

```json
{
	"meta": {
		"title": "Alliance championship — Kingshot 777",
		"description": "TL;DR guide to the Kingshot Alliance Championship for regular members: when to sign up, how the march snapshot works, and what you get."
	},
	"h1": "Alliance championship",
	"tldr": {
		"heading": "TL;DR",
		"items": [
			"<strong>Sign up Monday 00:00 → Wednesday 23:00 UTC.</strong> Town Center 10+. Miss the window and you sit the week out.",
			"<strong>Registration is a snapshot.</strong> Your march and every buff active at that moment are frozen in — pet buffs stay even after they expire.",
			"<strong>Don't touch your team after registering.</strong> Updating it re-snapshots and you lose the buffs you locked in.",
			"<strong>Then you're done.</strong> Battles run automatically Thursday to Saturday — you do not need to be online.",
			"<strong>Formation:</strong> 50/20/30 infantry/cavalry/archers is the safe pick; 60/40/0 with no cavalry lowers your visible power for softer matchups and beats the standard build.",
			"<strong>Heroes: pure damage only.</strong> Fights are short — take flat attack buffs and burst (Amadeus), skip tanks like Helga, and avoid anything with a sub-50% skill trigger."
		]
	},
	"sections": {
		"details": {
			"heading": "Details"
		},
		"rewards": {
			"heading": "Rewards",
			"items": [
				"<strong>1 enemy march defeated:</strong> 10× 5-min research speed-ups, 20× 10k bread, 20× 10k wood, 40× 1k stone, 10× 1k iron.",
				"<strong>2 enemy marches defeated:</strong> 15× 5-min research speed-ups, 30× 10k bread, 30× 10k wood, 55× 1k stone, 15× 1k iron.",
				"<strong>End of event:</strong> alliance-wide rewards based on your final bracket rank and your tier — Stone, Iron, Bronze, Silver, Gold or Diamond."
			]
		},
		"tips": {
			"heading": "Tips",
			"items": [
				"<strong>Register with your buffs up.</strong> Pop your pet buff and anything else temporary <em>before</em> you sign up — the snapshot keeps them for the whole week.",
				"<strong>Register early.</strong> The alliance needs at least 10 participants or matchmaking fails and nobody gets anything.",
				"<strong>Only re-register if your setup genuinely improved.</strong> Better troops or stronger active buffs are worth it; otherwise you're trading away a good snapshot for a worse one.",
				"<strong>Nothing is locked away from you during the fights</strong> — your troops are busy in the lane, but the event needs no clicks. Play normally."
			]
		}
	},
	"qa": [
		{
			"q": "What is it?",
			"a": "A weekly alliance-vs-alliance tournament. Your alliance is matched against five others and fights them over five automated rounds across three lanes."
		},
		{
			"q": "When does it run?",
			"a": "Every week, Monday 00:00 UTC to the following Monday 00:00 UTC. Sign-ups close Wednesday 23:00 UTC, the five one-hour battle rounds run through to Saturday 12:00 UTC, and rewards land after that."
		},
		{
			"q": "What do I actually have to do?",
			"a": "Register one march for a lane during the sign-up window. That's it — nothing during the fights. Lane placement is handled by leadership."
		},
		{
			"q": "What's the score next to my name?",
			"a": "Your combat score. It sets your fighting order inside the lane — the biggest score fights last."
		},
		{
			"q": "Why did my march not fight?",
			"a": "Only the 20 strongest players assigned to a lane step up. And once your march has beaten two enemies — or been defeated — it's finished for that hour."
		}
	],
	"source": "Source: <a href=\"https://kingshotwiki.com/events/alliance-championship/\" rel=\"noreferrer\">kingshotwiki.com — Alliance Championship</a>"
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/allaince-championship.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Register the loader**

In `777/src/lib/translations/i18n.ts`, add a new entry to the `loaders` array, after the `guides.bear` entry:

```ts
		{
			locale: 'en',
			key: 'guides.allaince-championship',
			routes: ['/guides/allaince-championship'],
			loader: async () => (await import('./en/guides/allaince-championship.json')).default
		}
```

- [ ] **Step 4: Rewrite the Svelte template to use the translations**

Replace the full contents of `777/src/routes/guides/allaince-championship/+page.svelte` with:

```svelte
<script lang="ts">
	import { t } from '$lib/translations/i18n';
</script>

<svelte:head>
	<title>{$t('guides.allaince-championship.meta.title')}</title>
	<meta name="description" content={$t('guides.allaince-championship.meta.description')} />
</svelte:head>

<h1>{$t('guides.allaince-championship.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.allaince-championship.tldr.heading')}</h2>
	<ul>
		{#each $t('guides.allaince-championship.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.allaince-championship.sections.details.heading')}</h2>

<dl class="qa">
	{#each $t('guides.allaince-championship.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<h2>{$t('guides.allaince-championship.sections.rewards.heading')}</h2>

<ul>
	{#each $t('guides.allaince-championship.sections.rewards.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.allaince-championship.sections.tips.heading')}</h2>

<ul>
	{#each $t('guides.allaince-championship.sections.tips.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p class="source">{@html $t('guides.allaince-championship.source')}</p>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.qa {
		margin: 1.5rem 0;
	}

	.qa dt {
		margin-top: 1.1rem;
		color: var(--accent);
		font-weight: 700;
	}

	.qa dd {
		margin: 0.3rem 0 0;
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
```

- [ ] **Step 5: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Sign up Monday\|Alliance championship" 777/src/routes/guides/allaince-championship/+page.svelte`
Expected: no output

- [ ] **Step 6: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/allaince-championship.json 777/src/lib/translations/i18n.ts 777/src/routes/guides/allaince-championship/+page.svelte
git commit -m "feat(i18n): migrate allaince-championship guide to translations"
```

---

### Task 4: Migrate strongest-governor guide content to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/strongest-governor.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/guides/strongest-governor/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created in Task 1) — this task appends its own loader entry to that array.
- Produces: the key namespace `guides.strongest-governor.*`, used by nothing else.

- [ ] **Step 1: Create the translation JSON file**

Create `777/src/lib/translations/en/guides/strongest-governor.json`. Keys are flat starting from `meta`/`h1`/etc — do NOT wrap in an outer `{"guides": {"strongest-governor": {...}}}` object.

```json
{
	"meta": {
		"title": "Strongest governor — Kingshot 777",
		"description": "TL;DR guide to the Kingshot Strongest Governor event: the 7 daily stages, how points are scored, and which rankings pay out."
	},
	"h1": "Strongest governor",
	"tldr": {
		"heading": "TL;DR",
		"items": [
			"<strong>If KvK is close, save your speed-ups for it.</strong> KvK's server-wide build, research and training buffs mean the same speed-ups buy far more power there than in a normal Strongest Governor week.",
			"<strong>Bank everything beforehand.</strong> Nothing you do outside the event window scores. Sit on your speed-ups and resources and dump them on the matching day.",
			"<strong>250,000 points</strong> is the bar to qualify for the kingdom-wide rewards. Aim for it even if you can't rank.",
			"<strong>Grab your 2 Challenge Medals every day</strong> — free rewards for tasks you're already doing."
		]
	},
	"sections": {
		"stages": {
			"heading": "The 7 days",
			"items": [
				"<strong>Day 1 — City construction:</strong> building upgrades and construction speed-ups.",
				"<strong>Day 2 — Hero development:</strong> hero EXP, shards, star-ups.",
				"<strong>Day 3 — Skill upgrades:</strong> hero skill levels.",
				"<strong>Day 4 — Troop training:</strong> training and promoting troops.",
				"<strong>Day 5 — Skill upgrades again.</strong>",
				"<strong>Day 6 — Troop training again.</strong>",
				"<strong>Day 7 — Hero development + gathering.</strong>"
			]
		},
		"details": {
			"heading": "Details"
		},
		"rewards": {
			"heading": "Rewards",
			"items": [
				"<strong>Point milestones:</strong> 5 tiers per day, each needing more points than the last. Claim them as you go.",
				"<strong>Challenge Medal rewards:</strong> claimed with the medals you earn, up to 2 per day.",
				"<strong>Daily stage ranking:</strong> paid at the end of each day to the top 1,000 scorers in your kingdom — gems and speed-ups, scaled by rank.",
				"<strong>Kingdom total ranking:</strong> top 1,000 in your kingdom by total points across the 7 days.",
				"<strong>Cross-kingdom ranking:</strong> top 2,000 across all participating kingdoms. Much better rewards — Truegold and exclusive cosmetics — and much harder.",
				"<strong>Kingdom rewards:</strong> given to everyone in a participating kingdom based on where the kingdom places, but you must personally earn 250,000 points to qualify."
			]
		},
		"tips": {
			"heading": "Tips",
			"items": [
				"<strong>Stockpile before the event.</strong> Hold speed-ups, hero EXP, shards and Truegold and spend them only on the matching day.",
				"<strong>Pick one day to go big.</strong> Daily stage rewards are per-day, so concentrating your hoard on a single stage ranks you higher than spreading it thin.",
				"<strong>Skills and troops come round twice</strong> (days 3/5 and 4/6). Split your skill books and training between the pair rather than blowing everything on the first.",
				"<strong>Queue long upgrades to finish inside the window.</strong> Points land when the action completes, not when you start it.",
				"<strong>Claim milestones and medals daily.</strong> They don't carry over."
			]
		}
	},
	"qa": [
		{
			"q": "What is it?",
			"a": "A recurring competition where every governor scores points for developing their city. It runs for seven days and is split into seven stages, one per day."
		},
		{
			"q": "How do I score?",
			"a": "By finishing the actions that match the day's theme — upgrading buildings, levelling heroes, upgrading skills, training or promoting troops, burning speed-ups, and consuming rare resources."
		},
		{
			"q": "What are Challenge Medals?",
			"a": "A separate daily currency. You can earn up to 2 a day from tasks; spend them in the Challenge Medal Rewards tab. The more you've collected, the better the tier you can claim."
		},
		{
			"q": "Which ranking should I care about?",
			"a": "If you're competitive, the cross-kingdom total ranking pays best — Truegold and exclusive cosmetics — but you're up against every participating kingdom. Otherwise focus on point milestones and hitting 250,000 total."
		},
		{
			"q": "Does spending outside the event count?",
			"a": "No. Only actions completed during the event window score points."
		}
	],
	"source": "Source: <a href=\"https://kingshotwiki.com/events/strongest-governor/\" rel=\"noreferrer\">kingshotwiki.com — Strongest Governor</a>"
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/strongest-governor.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Register the loader**

In `777/src/lib/translations/i18n.ts`, add a new entry to the `loaders` array, after the `guides.allaince-championship` entry:

```ts
		{
			locale: 'en',
			key: 'guides.strongest-governor',
			routes: ['/guides/strongest-governor'],
			loader: async () => (await import('./en/guides/strongest-governor.json')).default
		}
```

- [ ] **Step 4: Rewrite the Svelte template to use the translations**

Replace the full contents of `777/src/routes/guides/strongest-governor/+page.svelte` with:

```svelte
<script lang="ts">
	import { t } from '$lib/translations/i18n';
</script>

<svelte:head>
	<title>{$t('guides.strongest-governor.meta.title')}</title>
	<meta name="description" content={$t('guides.strongest-governor.meta.description')} />
</svelte:head>

<h1>{$t('guides.strongest-governor.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.strongest-governor.tldr.heading')}</h2>
	<ul>
		{#each $t('guides.strongest-governor.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.strongest-governor.sections.stages.heading')}</h2>

<ol class="stages">
	{#each $t('guides.strongest-governor.sections.stages.items') as item}
		<li>{@html item}</li>
	{/each}
</ol>

<h2>{$t('guides.strongest-governor.sections.details.heading')}</h2>

<dl class="qa">
	{#each $t('guides.strongest-governor.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<h2>{$t('guides.strongest-governor.sections.rewards.heading')}</h2>

<ul>
	{#each $t('guides.strongest-governor.sections.rewards.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.strongest-governor.sections.tips.heading')}</h2>

<ul>
	{#each $t('guides.strongest-governor.sections.tips.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p class="source">{@html $t('guides.strongest-governor.source')}</p>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.stages {
		margin: 1.5rem 0;
	}

	.stages li {
		margin: 0.4rem 0;
	}

	.qa {
		margin: 1.5rem 0;
	}

	.qa dt {
		margin-top: 1.1rem;
		color: var(--accent);
		font-weight: 700;
	}

	.qa dd {
		margin: 0.3rem 0 0;
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
```

- [ ] **Step 5: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Strongest governor\|Challenge Medal" 777/src/routes/guides/strongest-governor/+page.svelte`
Expected: no output

- [ ] **Step 6: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/strongest-governor.json 777/src/lib/translations/i18n.ts 777/src/routes/guides/strongest-governor/+page.svelte
git commit -m "feat(i18n): migrate strongest-governor guide to translations"
```

---

### Task 5: Migrate vikings guide content to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/vikings.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/guides/vikings/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created in Task 1) — this task appends its own loader entry to that array.
- Produces: the key namespace `guides.vikings.*`, used by nothing else.

- [ ] **Step 1: Create the translation JSON file**

Create `777/src/lib/translations/en/guides/vikings.json`. Keys are flat starting from `meta`/`h1`/etc — do NOT wrap in an outer `{"guides": {"vikings": {...}}}` object.

```json
{
	"meta": {
		"title": "Viking vengeance — Kingshot 777",
		"description": "TL;DR guide to Kingshot Viking Vengeance: emptying your castle, hero placement, HQ defense, and when not to heal."
	},
	"h1": "Viking vengeance",
	"tldr": {
		"heading": "TL;DR",
		"items": [
			"<strong>Empty your castle.</strong> Trade your troops and spare heroes out to other members. Leftover troops of your own cut the score of everyone supporting you.",
			"<strong>Top 3 heroes in the Guard Station</strong>, strongest first. Everything else goes out on exchange.",
			"<strong>Do not heal mid-event.</strong> Healing pulls your troops home and tanks your supporters' scores. Only heal before the second failure ends it, or in the recall between stages 9 and 10.",
			"<strong>Stages 10 and 20 are HQ.</strong> Shield infantry above tier 8 plus a little cavalry — follow whatever your leadership specifies.",
			"<strong>Reinforce with infantry and cavalry.</strong> Vikings hit infantry first, cavalry second, archers last — leave archers home if your march is full.",
			"<strong>Be online for stages 7, 14 and 17.</strong> Those only hit online players and score the highest.",
			"<strong>Reinforce empty, uncrowded cities.</strong> Points split by share of kills, so avoid doubling up with a whale.",
			"<strong>Pair up with similar power.</strong> Groups of two or six, positioned close together, so support arrives fast within the 1-minute gap."
		]
	},
	"sections": {
		"details": {
			"heading": "Details"
		},
		"maximizing": {
			"heading": "Maximizing your points",
			"items": [
				"<strong>Send infantry and cavalry.</strong> Vikings engage infantry first, then cavalry, then archers — so infantry and cavalry get into the fight early and take the kills. If your march can't hold everything, leave the archers at home.",
				"<strong>Reinforce online players.</strong> Waves 7, 14 and 17 only attack members who are online. March slots spent on offline allies are wasted, and offline players usually haven't cleared their city anyway.",
				"<strong>Pick empty, uncrowded cities.</strong> The point pool is split by share of kills. Look for an ally with no troops of their own and only one or two other reinforcers. Share a city with a whale and their higher-tier troops will siphon most of the kills.",
				"<strong>Rotate to HQ for waves 10 and 20.</strong> Those waves hit the Alliance HQ only — no cities. Once the wave 9 (or 19) battle report has finished, recall one strong march and send it to HQ, then send it back to your ally as soon as the HQ wave ends. Recall too early and you forfeit the previous wave's points.",
				"<strong>Lead with an offensive hero.</strong> Use your Bear Hunt joiner heroes in the leader slot — Chenko, Amadeus, Yeonwoo or Amane — for extra damage and a bigger share of the kills."
			]
		},
		"tips": {
			"heading": "Tips",
			"items": [
				"<strong>Sort your exchange before it starts.</strong> A botched exchange leaves troops sitting in your castle for the whole event.",
				"<strong>Agree positions in advance</strong> so nobody is out of support range when a wave lands."
			]
		}
	},
	"qa": [
		{
			"q": "How does scoring work?",
			"a": "You score by killing Vikings attacking castles — mostly other people's. That's why an empty castle is worth more to your alliance than a defended one: supporters get the kills."
		},
		{
			"q": "Why does leaving troops at home hurt?",
			"a": "Your own troops soak the kills that would otherwise go to your supporters. Exchange them out so your castle is genuinely empty."
		},
		{
			"q": "How much time between stages?",
			"a": "About a minute normally, roughly three minutes for the HQ stages (10 and 20)."
		},
		{
			"q": "What if I have an alt in the alliance?",
			"a": "Use its troops to reinforce your main. If you're tier 10, the alt can also defend on its own for extra points."
		},
		{
			"q": "When does the event end?",
			"a": "On the second failure."
		}
	],
	"source": "Source: <a href=\"https://kingshotwiki.com/events/viking-vengeance/\" rel=\"noreferrer\">kingshotwiki.com — Viking Vengeance</a>"
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/vikings.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Register the loader**

In `777/src/lib/translations/i18n.ts`, add a new entry to the `loaders` array, after the `guides.strongest-governor` entry:

```ts
		{
			locale: 'en',
			key: 'guides.vikings',
			routes: ['/guides/vikings'],
			loader: async () => (await import('./en/guides/vikings.json')).default
		}
```

- [ ] **Step 4: Rewrite the Svelte template to use the translations**

Replace the full contents of `777/src/routes/guides/vikings/+page.svelte` with:

```svelte
<script lang="ts">
	import { t } from '$lib/translations/i18n';
</script>

<svelte:head>
	<title>{$t('guides.vikings.meta.title')}</title>
	<meta name="description" content={$t('guides.vikings.meta.description')} />
</svelte:head>

<h1>{$t('guides.vikings.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.vikings.tldr.heading')}</h2>
	<ul>
		{#each $t('guides.vikings.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.vikings.sections.details.heading')}</h2>

<dl class="qa">
	{#each $t('guides.vikings.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<h2>{$t('guides.vikings.sections.maximizing.heading')}</h2>

<ul>
	{#each $t('guides.vikings.sections.maximizing.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.vikings.sections.tips.heading')}</h2>

<ul>
	{#each $t('guides.vikings.sections.tips.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p class="source">{@html $t('guides.vikings.source')}</p>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.qa {
		margin: 1.5rem 0;
	}

	.qa dt {
		margin-top: 1.1rem;
		color: var(--accent);
		font-weight: 700;
	}

	.qa dd {
		margin: 0.3rem 0 0;
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
```

- [ ] **Step 5: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Viking vengeance\|Empty your castle" 777/src/routes/guides/vikings/+page.svelte`
Expected: no output

- [ ] **Step 6: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/vikings.json 777/src/lib/translations/i18n.ts 777/src/routes/guides/vikings/+page.svelte
git commit -m "feat(i18n): migrate vikings guide to translations"
```

---

### Task 6: Migrate castle-battle guide content to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/castle-battle.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/guides/castle-battle/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created by the i18n setup task) — this task appends its own loader entry to that array. The `$t('...')` calls below assume that same `i18n.ts` config keeps `preprocess: 'preserveArrays'` enabled so JSON arrays remain arrays for `{#each}` instead of flattening into `key.0`, `key.1`, etc.
- Produces: the key namespace `guides.castle-battle.*` used by nothing else.

- [ ] **Step 1: Create the translation JSON file**

```json
{
  "meta": {
    "title": "Castle battle — Kingshot 777",
    "description": "TL;DR guide to Kingshot Castle Battle: how the three point types score, preparation and buffs, rally leader and joiner heroes by generation, troop formations, turret control and double-rally tactics."
  },
  "h1": "Castle battle",
  "common": {
    "or": "or"
  },
  "tldr": {
    "heading": "TL;DR",
    "items": [
      "<strong>Three things score:</strong> enemy troops you kill, the power you have parked in the castle or a turret, and your own troops lost. Losses pay too — this is not an event you can play safe.",
      "<strong>Formations:</strong> 50/20/30 attacking by default, 50/0/50 into an infantry-heavy garrison, 60/20/20 for the rally that captures, 60/40/0 once you're holding.",
      "<strong>Rally leaders run the buffs; everyone else shields up.</strong> City buffs, pet and executive skills are the leader's job. Anyone sitting the fight out wants an 8-hour peace shield.",
      "<strong>Take the turrets.</strong> Enemy-held turrets shoot your garrison the entire time you hold the castle, and it gets worse the longer you leave them.",
      "<strong>Prep the Infirmary before the event.</strong> Upgrade it, hoard healing speed-ups, and heal in small batches so alliance help covers more of it.",
      "<strong>It always overlaps All-Out or KvK.</strong> Kills and losses score in both, so a solo run is worth it even in a fight you can't win."
    ]
  },
  "sections": {
    "scoring": {
      "heading": "How scoring works",
      "qa": [
        {
          "q": "Carnage points (KO points)",
          "a": "Earned for killing enemy troops while contesting the King's Castle and its turrets."
        },
        {
          "q": "Occupation points",
          "a": "Based on the power of the troops you have stationed in the castle or a turret, accumulating for as long as you hold it. Holding with a strong, refilled garrison is what makes this tick up."
        },
        {
          "q": "Casualty points",
          "a": "Earned for your own troops severely wounded or lost. Losses are unavoidable, but rotating and refilling in time keeps them from being pure waste."
        }
      ]
    },
    "preparation": {
      "heading": "Preparation",
      "items": [
        "<strong>Buffs are a rally leader job.</strong> Before you launch or defend, run your 20% attack and 20% defence city buffs, pet skills such as Moose or Grizzly Bear, and your executive skills. Joiners should not burn theirs — only the leader's buffs apply to the rally.",
        "<strong>Teleport next to the castle.</strong> Rally captains want the shortest possible march time, which matters enormously when rallies have to be timed against each other.",
        "<strong>Shield anyone who isn't fighting.</strong> Members who will be offline, or who are too under-levelled to hold a march, should sit behind an 8-hour peace shield. An unshielded Town Center is free kills for the enemy.",
        "<strong>Sort the Infirmary out first.</strong> See <a href=\"#infirmary\">Infirmary and healing</a> — this is the thing most alliances under-prepare."
      ]
    },
    "rallyLeaderHeroes": {
      "heading": "Rally leader heroes",
      "intro": "Attack rallies exist to break the garrison, so they stack damage. Once the castle is yours the job flips to surviving repeated hits, so garrison rallies stack defence and sustain. Each row is three slots; where two portraits are joined by \"or\", either works — pick based on your ratios.",
      "attack": {
        "heading": "Attack rallies",
        "table": {
          "headers": {
            "gen": "Gen",
            "heroes": "Heroes"
          },
          "rows": {
            "gen3": "3",
            "gen4": "4",
            "gen5": "5",
            "gen6": "6",
            "gen7": "7"
          }
        }
      },
      "garrison": {
        "heading": "Garrison rallies",
        "table": {
          "headers": {
            "gen": "Gen",
            "heroes": "Heroes"
          },
          "rows": {
            "gen3": "3",
            "gen4": "4",
            "gen5": "5",
            "gen6": "6",
            "gen7": "7"
          }
        }
      },
      "notes": [
        "<strong>Gen 5:</strong> Thrudd loses most of her skill value if you run 5:0:5 with no cavalry — take Petra instead in that case.",
        "<strong>Gen 6:</strong> Triton gives infantry a lot of attack and defence percentage and is far easier to get than Amadeus, so he's a fine substitute."
      ]
    },
    "formations": {
      "heading": "Troop formations",
      "items": [
        "<strong>Standard attack — 50% infantry, 20% cavalry, 30% archers.</strong> The safe default when you don't know what's sitting in the castle.",
        "<strong>Against an infantry-heavy castle — 50% infantry, 0% cavalry, 50% archers.</strong> Cavalry counter archers but fold to infantry, so drop them when the garrison has few or no archers and put that weight into archers instead.",
        "<strong>Capturing rally — 60% infantry, 20% cavalry, 20% archers.</strong> For the rally that takes an already-weakened castle and has to survive the counter-attack. Tankier than a pure attack march but still carries enough damage to finish the job.",
        "<strong>Settled garrison — 60% infantry, 40% cavalry, 0% archers.</strong> What you refill into once the castle is yours and holding is all that matters. Archers die too fast to be worth the slots."
      ],
      "outro": "Adjust for your alliance's troop levels and what the enemy is fielding, but these hold up as general rules."
    },
    "rallyJoiners": {
      "heading": "Rally joiners",
      "intro": "Joiners only contribute their first-slot hero, exactly like Bear Trap rallies. Attack joiners bring damage; garrison joiners bring defensive buffs.",
      "attack": {
        "heading": "Attack joiners",
        "table": {
          "headers": {
            "priority": "Priority",
            "heroes": "Heroes"
          },
          "rows": {
            "best": "Best",
            "upToGen7": "Up to gen 7",
            "balancedSpread": "Balanced spread"
          },
          "notes": {
            "upToGen7": "Hilde is there to fill stat gaps.",
            "balancedSpread": "One of each across four joiners spreads the skill buffs over all three troop types instead of piling everything onto one."
          }
        }
      },
      "garrison": {
        "heading": "Garrison joiners",
        "table": {
          "headers": {
            "priority": "Priority",
            "heroes": "Heroes"
          },
          "rows": {
            "best": "Best",
            "upToGen7": "Up to gen 7",
            "simplest": "Simplest"
          },
          "notes": {
            "simplest": "Four Sauls, or three Sauls and a Fahd, for flat damage reduction. Nothing to coordinate and hard to get wrong — the right call when your alliance can't reliably organise a spread."
          }
        }
      },
      "tips": [
        "<strong>Rally leaders: remind people every time.</strong> A wrong first-slot hero costs a large chunk of the rally's damage and nobody notices until the report lands.",
        "<strong>Vary the defensive joiners.</strong> Each defensive expedition skill has different strengths, so rotate heroes and read the enemy rather than sending the same four every time.",
        "<strong>Consistency beats perfection.</strong> If coordinating a spread of heroes is too hard, a garrison correctly filled with one right hero type still beats a mixed, half-wrong one."
      ]
    },
    "holding": {
      "heading": "Holding the castle",
      "items": [
        "<strong>Refill infantry constantly.</strong> Infantry soaks the bulk of incoming damage, so it is always the first thing to run out. Keep voice chat live and call out the moment infantry numbers drop so members can send fresh infantry-heavy marches straight away.",
        "<strong>Don't ignore the turrets.</strong> Turrets the enemy holds fire on the castle continuously, and the damage escalates the longer they keep them. You can win the castle fight and still bleed your garrison out through turrets you never contested.",
        "<strong>Split the alliance into two jobs.</strong> Put your whales and top rally leaders on taking and holding the castle, and send mid-tier rallies at the surrounding turrets to shut off the incoming damage."
      ]
    },
    "infirmary": {
      "heading": "Infirmary and healing",
      "items": [
        "<strong>Upgrade the Infirmary in advance</strong> if your alliance intends to compete. Long fights and repeated refills put it under constant load.",
        "<strong>Start saving healing speed-ups days before the event.</strong>",
        "<strong>Heal in small batches</strong> and ask for alliance help each time — it wastes far fewer speed-ups than one big heal."
      ]
    },
    "advancedTactics": {
      "heading": "Advanced tactics",
      "items": [
        "<strong>Open with a solo attack.</strong> The moment the castle opens, if you're strong enough, solo in with a march speed-up and bank some free occupation time.",
        "<strong>Synchronise double rallies.</strong> When one rally can't shift the defenders, have two or more leaders rally the same target, compare march times and count down on voice so every march lands on the same second. Staggered arrivals just let the defender refill between hits.",
        "<strong>Variant: softener then capturer.</strong> Against a castle stacked high enough that a combined hit would still cost you the field, split the two rallies by roles instead of landing them together. Rally 1 goes in with attack heroes at 50/20/30 purely to break the front-line infantry and push their troops into the Infirmary. Rally 2 lands 2 to 5 seconds later with garrison heroes at 60/20/20, takes the weakened castle and simply stays as the garrison. The gap has to be small — leave it too long and the defender refills, which is the exact failure the synchronised approach avoids.",
        "<strong>Counter-rally to cut enemy occupation time.</strong> You can't rally your own castle, so hold it with alliance A and keep alliance B ready. When the enemy rallies A, B rallies the castle <em>after</em> them — delayed enough that B never lands first, or you'll fight your own kingdom and hand the enemy a free win. If the enemy fails, cancel B. If they take the castle, B takes it straight back, holds briefly, then dumps its troops out as A's solo marches arrive so A resumes racking up occupation time. It needs constant comms, and enemy players may grab the castle in the handover gap."
      ]
    }
  },
  "images": {
    "points": {
      "alt": "In-game My Points panel showing total points split into KO points, Occupation points and Casualty points.",
      "caption": "Your score is the sum of the three categories."
    }
  },
  "source": "Event mechanics from <a href=\"https://kingshotwiki.com/events/castle-battle/\" rel=\"noreferrer\">kingshotwiki.com — Castle Battle</a>, with additions from alliance experience."
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/castle-battle.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Append the route-scoped loader entry in `i18n.ts`**

Add this object as a new array element inside the existing `loaders: [...]` array, immediately after the `common` entry. Keep the existing `preprocess: 'preserveArrays'` setting intact; the arrays in `castle-battle.json` rely on it.

```diff
 export const i18n = new I18n({
   preprocess: 'preserveArrays',
   loaders: [
     {
       locale: 'en',
       key: 'common',
       loader: async () => (await import('./en/common.json')).default
     },
+    {
+      locale: 'en',
+      key: 'guides.castle-battle',
+      routes: ['/guides/castle-battle'],
+      loader: async () => (await import('./en/guides/castle-battle.json')).default
+    },
     // existing guide loaders...
   ]
 });
```

- [ ] **Step 4: Rewrite the Svelte template to use the translations**

```svelte
<script lang="ts">
	import points from '$lib/assets/castle-battle/points.webp';
	import Hero from '$lib/components/Hero.svelte';
	import { t } from '$lib/translations/i18n';
</script>

<svelte:head>
	<title>{$t('guides.castle-battle.meta.title')}</title>
	<meta
		name="description"
		content={$t('guides.castle-battle.meta.description')}
	/>
</svelte:head>

<h1>{$t('guides.castle-battle.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.castle-battle.tldr.heading')}</h2>
	<ul>
		{#each $t('guides.castle-battle.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.castle-battle.sections.scoring.heading')}</h2>

<dl class="qa">
	{#each $t('guides.castle-battle.sections.scoring.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<figure>
	<img
		src={points}
		width="686"
		height="299"
		alt={$t('guides.castle-battle.images.points.alt')}
		loading="lazy"
		decoding="async"
	/>
	<figcaption>{$t('guides.castle-battle.images.points.caption')}</figcaption>
</figure>

<h2>{$t('guides.castle-battle.sections.preparation.heading')}</h2>

<ul>
	{#each $t('guides.castle-battle.sections.preparation.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.castle-battle.sections.rallyLeaderHeroes.heading')}</h2>

<p>{$t('guides.castle-battle.sections.rallyLeaderHeroes.intro')}</p>

<h3>{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.heading')}</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.table.headers.gen')}</th>
				<th scope="col">{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.table.headers.heroes')}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.table.rows.gen3')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="amadeus" /></div>
						<div class="slot"><Hero slug="petra" /></div>
						<div class="slot"><Hero slug="marlin" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.table.rows.gen4')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="amadeus" /></div>
						<div class="slot"><Hero slug="petra" /></div>
						<div class="slot"><Hero slug="rosa" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.table.rows.gen5')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="amadeus" /></div>
						<div class="slot">
							<Hero slug="petra" />
							<span class="or">{$t('guides.castle-battle.common.or')}</span>
							<Hero slug="thrud" />
						</div>
						<div class="slot"><Hero slug="rosa" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.table.rows.gen6')}</th>
				<td>
					<div class="lineup">
						<div class="slot">
							<Hero slug="amadeus" />
							<span class="or">{$t('guides.castle-battle.common.or')}</span>
							<Hero slug="triton" />
						</div>
						<div class="slot">
							<Hero slug="petra" />
							<span class="or">{$t('guides.castle-battle.common.or')}</span>
							<Hero slug="thrud" />
						</div>
						<div class="slot"><Hero slug="yang" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.attack.table.rows.gen7')}</th>
				<td>
					<div class="lineup">
						<div class="slot">
							<Hero slug="amadeus" />
							<span class="or">{$t('guides.castle-battle.common.or')}</span>
							<Hero slug="triton" />
							<span class="or">{$t('guides.castle-battle.common.or')}</span>
							<Hero slug="charles" />
						</div>
						<div class="slot"><Hero slug="ava" /></div>
						<div class="slot"><Hero slug="wee-woo" /></div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<h3>{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.heading')}</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.table.headers.gen')}</th>
				<th scope="col">{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.table.headers.heroes')}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.table.rows.gen3')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="eric" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="hilde" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.table.rows.gen4')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="alcar" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="margot" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.table.rows.gen5')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="long-fei" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="margot" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.table.rows.gen6')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="triton" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="sophia" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyLeaderHeroes.garrison.table.rows.gen7')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="charles" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="sophia" /></div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<ul>
	{#each $t('guides.castle-battle.sections.rallyLeaderHeroes.notes') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.castle-battle.sections.formations.heading')}</h2>

<ul>
	{#each $t('guides.castle-battle.sections.formations.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p>{$t('guides.castle-battle.sections.formations.outro')}</p>

<h2>{$t('guides.castle-battle.sections.rallyJoiners.heading')}</h2>

<p>{$t('guides.castle-battle.sections.rallyJoiners.intro')}</p>

<h3>{$t('guides.castle-battle.sections.rallyJoiners.attack.heading')}</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.castle-battle.sections.rallyJoiners.attack.table.headers.priority')}</th>
				<th scope="col">{$t('guides.castle-battle.sections.rallyJoiners.attack.table.headers.heroes')}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyJoiners.attack.table.rows.best')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="chenko" /></div>
						<div class="slot"><Hero slug="yeonwoo" /></div>
						<div class="slot"><Hero slug="amane" /></div>
						<div class="slot"><Hero slug="amadeus" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyJoiners.attack.table.rows.upToGen7')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="vivian" /></div>
						<div class="slot"><Hero slug="margot" /></div>
						<div class="slot"><Hero slug="wee-woo" /></div>
						<div class="slot"><Hero slug="hilde" /></div>
					</div>
					<p class="note">{$t('guides.castle-battle.sections.rallyJoiners.attack.table.notes.upToGen7')}</p>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyJoiners.attack.table.rows.balancedSpread')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="chenko" /></div>
						<div class="slot"><Hero slug="amane" /></div>
						<div class="slot"><Hero slug="saul" /></div>
						<div class="slot"><Hero slug="fahd" /></div>
					</div>
					<p class="note">{$t('guides.castle-battle.sections.rallyJoiners.attack.table.notes.balancedSpread')}</p>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<h3>{$t('guides.castle-battle.sections.rallyJoiners.garrison.heading')}</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.castle-battle.sections.rallyJoiners.garrison.table.headers.priority')}</th>
				<th scope="col">{$t('guides.castle-battle.sections.rallyJoiners.garrison.table.headers.heroes')}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyJoiners.garrison.table.rows.best')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="howard" /></div>
						<div class="slot"><Hero slug="gordon" /></div>
						<div class="slot"><Hero slug="saul" /></div>
						<div class="slot"><Hero slug="hilde" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyJoiners.garrison.table.rows.upToGen7')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="quinn" /></div>
						<div class="slot"><Hero slug="fahd" /></div>
						<div class="slot"><Hero slug="triton" /></div>
						<div class="slot"><Hero slug="eric" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">{$t('guides.castle-battle.sections.rallyJoiners.garrison.table.rows.simplest')}</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="saul" /></div>
						<div class="slot"><Hero slug="fahd" /></div>
					</div>
					<p class="note">{$t('guides.castle-battle.sections.rallyJoiners.garrison.table.notes.simplest')}</p>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<ul>
	{#each $t('guides.castle-battle.sections.rallyJoiners.tips') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.castle-battle.sections.holding.heading')}</h2>

<ul>
	{#each $t('guides.castle-battle.sections.holding.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2 id="infirmary">{$t('guides.castle-battle.sections.infirmary.heading')}</h2>

<ul>
	{#each $t('guides.castle-battle.sections.infirmary.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.castle-battle.sections.advancedTactics.heading')}</h2>

<ul>
	{#each $t('guides.castle-battle.sections.advancedTactics.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p class="source">{@html $t('guides.castle-battle.source')}</p>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.qa {
		margin: 1.5rem 0;
	}

	.qa dt {
		margin-top: 1.1rem;
		color: var(--accent);
		font-weight: 700;
	}

	.qa dd {
		margin: 0.3rem 0 0;
	}

	.table-wrap {
		margin: 1.5rem 0;
		overflow-x: auto;
	}

	table {
		width: max-content;
		min-width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	th,
	td {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}

	thead th {
		background: var(--surface);
		color: var(--accent);
	}

	tbody th {
		background: var(--surface);
		white-space: nowrap;
	}

	h3 {
		margin: 2rem 0 0.5rem;
		font-size: 1.05rem;
	}

	.lineup {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
		gap: 1rem;
	}

	.slot {
		display: flex;
		align-items: flex-start;
		gap: 0.35rem;
	}

	.or {
		align-self: center;
		font-size: 0.75rem;
		color: var(--muted);
	}

	.note {
		max-width: 24rem;
		margin: 0.6rem 0 0;
		font-size: 0.85rem;
		color: var(--muted);
	}

	figure {
		margin: 1.5rem 0;
	}

	figure img {
		display: block;
		width: 100%;
		height: auto;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	figcaption {
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
```

- [ ] **Step 5: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Castle" 777/src/routes/guides/castle-battle/+page.svelte | grep -v "class=\|import\|\$t(" `
Expected: no output (all display text now goes through `$t(...)` or `{@html}` of a `$t(...)` result)

- [ ] **Step 6: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/castle-battle.json 777/src/lib/translations/i18n.ts 777/src/routes/guides/castle-battle/+page.svelte
git commit -m "feat(i18n): migrate castle-battle guide to translations"

---

### Task 7: Migrate swordland-showdown guide content to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/swordland-showdown.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/guides/swordland-showdown/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created by the i18n setup task) — this task appends its own loader entry to that array. The shared `i18n` config must already include `preprocess: 'preserveArrays'` so array-valued keys like `guides.swordland-showdown.tldr.items` remain real arrays for `{#each $t('...') as item}`.
- Produces: the key namespace `guides.swordland-showdown.*` used by nothing else.

- [ ] **Step 1: Create the translation JSON file**

```json
{
  "meta": {
    "title": "Swordland showdown — Kingshot 777",
    "description": "Member guide to Kingshot Swordland Showdown: what actually scores, the map, the 15-minute unlock, your role on the field, squad setup, healing and how to stay alive."
  },
  "h1": "Swordland showdown",
  "tldr": {
    "heading": "TL;DR",
    "items": [
      "<strong>Bi-weekly, the battle is always Sunday and lasts exactly one hour.</strong> Two alliances field a Legion of up to 30 combatants plus 10 substitutes.",
      "<strong>Troops are only injured, never lost.</strong> Everything heals for free when you leave the battlefield. Play aggressively.",
      "<strong>Two separate reward tracks.</strong> Alliance rewards follow Legion 1's win or loss; your personal rewards follow your own Personal Relic Point rank. A top scorer on the losing side out-earns a passenger on the winning side.",
      "<strong>Clear your infirmary before it starts.</strong> You cannot enter with injured troops waiting.",
      "<strong>Nobody scores in the spawn zone.</strong> Points come from moving."
    ]
  },
  "sections": {
    "before": {
      "heading": "Before you enter",
      "items": [
        "<strong>Clear the infirmary.</strong> This is a hard requirement — injured troops waiting to heal block entry entirely.",
        "<strong>If you registered, show up.</strong> A no-show still counted toward your side's power rating but contributes nothing.",
        "<strong>Substitutes only auto-fill in the first 3 minutes (180 seconds)</strong>, first-come-first-served. If you're a sub, be at the gate from the whistle.",
        "<strong>Heal up and recall your marches beforehand.</strong> Enter at full strength."
      ]
    },
    "whatActuallyScores": {
      "heading": "What actually scores",
      "firstControlBonus": {
        "heading": "First control bonus",
        "body": "The first alliance to fully occupy a building after its capture timer completes gets a large one-off Alliance <em>and</em> Personal bonus. First capture of the Swordshrine alone is 9,000 Alliance / 4,500 Personal Relic Points, and taking first control of every Phase 1 building totals 26,400 Relic Points. This is why spreading out at the start beats stacking one target."
      },
      "occupation": {
        "heading": "Ongoing occupation",
        "table": {
          "headers": {
            "building": "Building",
            "alliancePointsPerMinute": "Alliance points / min",
            "personalPointsPerMinute": "Personal points / min"
          },
          "rows": [
            {
              "building": "Swordshrine",
              "alliancePointsPerMinute": "1,800",
              "personalPointsPerMinute": "900"
            },
            {
              "building": "Sanctum",
              "alliancePointsPerMinute": "1,200",
              "personalPointsPerMinute": "600"
            },
            {
              "building": "Abbey",
              "alliancePointsPerMinute": "600",
              "personalPointsPerMinute": "300"
            },
            {
              "building": "Buff building",
              "alliancePointsPerMinute": "240",
              "personalPointsPerMinute": "120"
            }
          ]
        },
        "holdBonus": "<strong>30-minute hold bonus:</strong> once your alliance has held a building for 30 straight minutes, it starts paying Personal Relic Points at a higher rate — the patch notes don't say how much. A building nearing that threshold is worth more than its base rate suggests, both to hold and to steal."
      },
      "bankedPoints": {
        "heading": "Banked points and Baggage Trains",
        "body": "50% of a building's accumulated alliance points sit visibly above it. Lose the building and those points drop on the ground as <strong>Baggage Trains</strong> that either side can pick up with a march, and they count for both Alliance and Personal points. Looting is not passive — send a march the moment a building flips, yours or theirs."
      },
      "defeatingTroops": {
        "heading": "Defeating troops",
        "table": {
          "headers": {
            "situation": "Situation",
            "personalPointsPerPower": "Personal points per 10,000 enemy soldier power defeated"
          },
          "rows": [
            {
              "situation": "Attacking",
              "personalPointsPerPower": "80"
            },
            {
              "situation": "Defending",
              "personalPointsPerPower": "40"
            }
          ]
        },
        "body": "Kills pay <strong>Personal points only</strong> — no Alliance points at all. Offense pays roughly double defense, and in a high-power kingdom you can hit the personal cap within minutes purely from combat."
      },
      "undercellars": {
        "heading": "Undercellars",
        "body": "Unmarked gathering nodes that spawn around the Swordshrine. Find them with the magnifying glass on the minimap and send a march like you would to a resource node. Slower than buildings but usually uncontested, so they're reliable, safe income for lower-power players. Late in the battle they can be worth 20–40k points in total — don't sleep on them."
      }
    },
    "map": {
      "heading": "The map",
      "table": {
        "headers": {
          "building": "Building",
          "whatItDoes": "What it does",
          "whyYouCare": "Why you care"
        },
        "rows": [
          {
            "building": "Swordshrine",
            "whatItDoes": "Centre of the map, opens at 15 min.",
            "whyYouCare": "Highest point flow on the field. The main prize — but not mandatory to win."
          },
          {
            "building": "Sanctums ×2",
            "whatItDoes": "Flank the shrine, open from the start.",
            "whyYouCare": "The real point engine. Hold at least one all match."
          },
          {
            "building": "Abbeys ×4",
            "whatItDoes": "Open from the start.",
            "whyYouCare": "Steady income and cheap first-control bonuses."
          },
          {
            "building": "Royal Stables",
            "whatItDoes": "Buff: halves the free Advanced Teleporter cooldown for the whole alliance.",
            "whyYouCare": "First pick in Phase 1. Mobility wins the map."
          },
          {
            "building": "Bell Tower",
            "whatItDoes": "Buff: halves building capture time.",
            "whyYouCare": "Highest-priority buff in Phase 1, since every first-control bonus is large."
          },
          {
            "building": "Hall of Reformation",
            "whatItDoes": "Buff: +15% attack and 15% damage reduction for your alliance. Opens at 15 min.",
            "whyYouCare": "Take it the moment it opens — it applies to every fight afterwards."
          },
          {
            "building": "Mercenary Camp",
            "whatItDoes": "Opens at 15 min. Sends mercenaries at an enemy-held building.",
            "whyYouCare": "No personal combat points from its kills. Use it to soften a target right before your rally, never standalone."
          },
          {
            "building": "Undercellars",
            "whatItDoes": "Unmarked nodes that spawn in waves near the shrine.",
            "whyYouCare": "Uncontested points for anyone who can't win fights."
          }
        ]
      }
    },
    "timeline": {
      "heading": "Timeline",
      "table": {
        "headers": {
          "phase": "Phase",
          "clock": "Clock",
          "whatMatters": "What matters"
        },
        "rows": [
          {
            "phase": "1 — Opening",
            "clock": "0–15 min",
            "whatMatters": "2 Sanctums, 4 Abbeys, Bell Tower and Royal Stables are live.<br /> Priority: Royal Stables → Bell Tower → a Sanctum → Abbeys.<br /> Spread out to claim as many first-control bonuses as possible.<br /> Strongest players can pressure enemy cities at the same time to pull defenders out of buildings."
          },
          {
            "phase": "2 — Midgame",
            "clock": "from exactly 15:00 (the 900-second mark)",
            "whatMatters": "Swordshrine, Hall of Reformation and Mercenary Camp unlock.<br /> Take Reformation immediately; the buff applies to every fight afterwards.<br /> Tunnelling everything into the Swordshrine while giving up Sanctums and Abbeys is a losing play.<br /> If the shrine is too contested, pivot to holding both Sanctums plus Bell Tower, Reformation and the Abbeys."
          },
          {
            "phase": "3 — Late game",
            "clock": "15 min and 20 min onward",
            "whatMatters": "Undercellar waves spawn at 15 min and 20 min.<br /> The last 5–10 minutes are the comeback window.<br /> Enemy buildings with big banked reserves are the highest-value targets, because flipping them dumps a huge Baggage Train cluster."
          }
        ]
      }
    },
    "roles": {
      "heading": "Your role",
      "items": [
        {
          "heading": "Attacker",
          "body": "Teleport onto contested or weakly-held buildings, open rallies, burn enemy cities to force players to teleport out of their garrisons, then move on. Golden rule: <strong>attackers capture and move on, they do not sit in garrisons.</strong>"
        },
        {
          "heading": "Defender / joiner",
          "body": "Garrison the buildings you're assigned, keep your top 3 heroes home enough to survive, fill garrison slots so the enemy can't solo the building, and reinforce neighbours. If a stronger player reinforces you and you then teleport away, his garrisoned troops stay with you."
        },
        {
          "heading": "Gatherer / support",
          "body": "Chase Baggage Trains the instant a building flips, gather Undercellars, and join rallies as a secondary march. You can launch marches from inside the safe zone without exposing your city — this is the free-to-play scoring lane, and it works."
        }
      ]
    },
    "squadSetup": {
      "heading": "Squad setup",
      "items": [
        "<strong>Troop ratio:</strong> 50/20/30 infantry/cavalry/archers most of the time. Use 60/40/0 with Alcar, Margot or Saul, whose skills lean cavalry and infantry.",
        "<strong>Offense and defense are the same.</strong> Kills are calculated simultaneously at the end of each mini-round, so neither side needs to \"tank more\". The only real difference is which scenario triggers a hero's widget, which is why the best offensive and defensive heroes are simply the latest generation with a matching widget type. Defense does not need more infantry and does not need dedicated \"defensive\" joiners.",
        "<strong>For solo attacks</strong>, use the highest-generation heroes you have that are decently invested."
      ],
      "pvpJoinerHeroes": {
        "heading": "PvP joiner heroes",
        "intro": "The same picks in both offense and defense:",
        "or": "or"
      }
    },
    "healingAndMobility": {
      "heading": "Healing and mobility",
      "items": [
        "<strong>No batch healing during the event</strong> — healing speed-ups only, and the event drips out free 1h healing speed-ups slowly.",
        "<strong>Exit to heal.</strong> Tap the scoreboard at the top and choose <em>Leave battlefield</em> to instantly and freely heal everything. You then wait 12 minutes before you can re-enter. With hundreds of thousands injured, that round trip beats fighting at half strength.",
        "<strong>Don't waste healing speed-ups near the end.</strong> Troops cannot die, the infirmary cannot fill up during the event, and everything heals when the event ends.",
        "<strong>Free march speed-ups:</strong> a permanent event-only +25% march speed charge accumulates one per minute, capped at 10 (some sources say you start with 5 and can bank up to 30). Either way, hoarding them is a mistake — spend them.",
        "<strong>Free Advanced Teleporter</strong> roughly every 10–12 minutes, halved if your alliance holds the Royal Stables. Teleporting again before the free one recharges costs Advanced Teleporters at an escalating price (+1 each time), so one paid hop between free ones is fine; chaining several is not."
      ]
    },
    "stayingAlive": {
      "heading": "Staying alive",
      "items": [
        "<strong>If a much stronger player attacks you, avoid the injuries.</strong> Deploy troops onto empty ground next to your city, teleport away, or recall your top 3 heroes if that's enough to hold.",
        "<strong>The guard station takes heavily increased damage here.</strong> If you don't spend gems to put the fire out, 10–20 seconds is enough to force-teleport your city home.",
        "<strong>Ask a stronger player for reinforcements.</strong> Their garrisoned troops stay with you even if you teleport.",
        "<strong>Buy the 2h counter-recon</strong> (about 400 gems) so you can't be scouted, and use every attack and defense buff you have — a 10% or 20% gem buff multiplies rather than adds.",
        "<strong>Scout a lot before attacking</strong>, and use 1-minute rallies liberally.",
        "<strong>You don't have to sit next to a building.</strong> Parking in the open next to an objective makes you an easy target. Sit in the safe zone or in dead space between buildings and lean on the free march speed-ups.",
        "<strong>A lost attack is still a win if you injured more than ~80,000 troops.</strong> Each follow-up attack gets easier. Same when defending: under 80k injured is a good trade.",
        "<strong>Don't spam every march at one target</strong> unless they're already below ~100,000 troops. Only your main march does real damage; the rest just suicide.",
        "<strong>Don't send your main march far away</strong> unless a strong second march or a friend is covering your city."
      ]
    },
    "commonMistakes": {
      "heading": "Common mistakes",
      "items": [
        "<strong>Sitting in the spawn zone doing nothing.</strong> You score zero.",
        "<strong>Hoarding teleporters and march speed-ups</strong> until the event ends.",
        "<strong>Chasing only the Swordshrine</strong> and losing the Sanctums and Abbeys that actually pay.",
        "<strong>Ignoring Undercellars and Baggage Trains.</strong> Free points nobody contests.",
        "<strong>Attackers parking in a garrison</strong> instead of moving to the next target.",
        "<strong>Entering with a full infirmary</strong>, or forgetting to show up after registering.",
        "<strong>Burning healing speed-ups in the last minutes</strong>, when everything heals for free at the end anyway."
      ]
    }
  },
  "source": "Sources: <a href=\"https://kingshotwiki.com/events/swordland-showdown/\" rel=\"noreferrer\">kingshotwiki.com — Swordland Showdown</a>, <a href=\"https://kingshotmastery.com/guides/swordland-showdown\" rel=\"noreferrer\">kingshotmastery.com — Swordland Showdown guide</a>, <a href=\"https://kingshotpro.com/swordland-showdown-guide.html\" rel=\"noreferrer\">kingshotpro.com — Swordland Showdown guide</a>. Exact point values and building layouts can change with patches — verify against your own battlefield screen."
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/swordland-showdown.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Register the guide loader in `i18n.ts`**

Add this object as a new array element inside the existing `loaders: [...]` array in `777/src/lib/translations/i18n.ts`, immediately after the existing `common` entry. Keep the existing `preprocess: 'preserveArrays'` line unchanged.

```diff
 export const i18n = new I18n({
   preprocess: 'preserveArrays',
   loaders: [
     {
       locale: 'en',
       key: 'common',
       loader: async () => (await import('./en/common.json')).default
     },
+    {
+      locale: 'en',
+      key: 'guides.swordland-showdown',
+      routes: ['/guides/swordland-showdown'],
+      loader: async () => (await import('./en/guides/swordland-showdown.json')).default
+    },
     // keep the existing guide/page loaders below this line
   ]
 });
```

- [ ] **Step 4: Rewrite the Svelte template to use the translations**

```svelte
<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import { t } from '$lib/translations/i18n';
</script>

<svelte:head>
	<title>{$t('guides.swordland-showdown.meta.title')}</title>
	<meta name="description" content={$t('guides.swordland-showdown.meta.description')} />
</svelte:head>

<h1>{$t('guides.swordland-showdown.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.swordland-showdown.tldr.heading')}</h2>
	<ul>
		{#each $t('guides.swordland-showdown.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.swordland-showdown.sections.before.heading')}</h2>

<ul>
	{#each $t('guides.swordland-showdown.sections.before.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.swordland-showdown.sections.whatActuallyScores.heading')}</h2>

<h3>{$t('guides.swordland-showdown.sections.whatActuallyScores.firstControlBonus.heading')}</h3>

<p>{@html $t('guides.swordland-showdown.sections.whatActuallyScores.firstControlBonus.body')}</p>

<h3>{$t('guides.swordland-showdown.sections.whatActuallyScores.occupation.heading')}</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">
					{$t('guides.swordland-showdown.sections.whatActuallyScores.occupation.table.headers.building')}
				</th>
				<th scope="col">
					{$t('guides.swordland-showdown.sections.whatActuallyScores.occupation.table.headers.alliancePointsPerMinute')}
				</th>
				<th scope="col">
					{$t('guides.swordland-showdown.sections.whatActuallyScores.occupation.table.headers.personalPointsPerMinute')}
				</th>
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.swordland-showdown.sections.whatActuallyScores.occupation.table.rows') as row}
				<tr>
					<th scope="row">{row.building}</th>
					<td>{row.alliancePointsPerMinute}</td>
					<td>{row.personalPointsPerMinute}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<p>{@html $t('guides.swordland-showdown.sections.whatActuallyScores.occupation.holdBonus')}</p>

<h3>{$t('guides.swordland-showdown.sections.whatActuallyScores.bankedPoints.heading')}</h3>

<p>{@html $t('guides.swordland-showdown.sections.whatActuallyScores.bankedPoints.body')}</p>

<h3>{$t('guides.swordland-showdown.sections.whatActuallyScores.defeatingTroops.heading')}</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">
					{$t('guides.swordland-showdown.sections.whatActuallyScores.defeatingTroops.table.headers.situation')}
				</th>
				<th scope="col">
					{$t('guides.swordland-showdown.sections.whatActuallyScores.defeatingTroops.table.headers.personalPointsPerPower')}
				</th>
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.swordland-showdown.sections.whatActuallyScores.defeatingTroops.table.rows') as row}
				<tr>
					<th scope="row">{row.situation}</th>
					<td>{row.personalPointsPerPower}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<p>{@html $t('guides.swordland-showdown.sections.whatActuallyScores.defeatingTroops.body')}</p>

<h3>{$t('guides.swordland-showdown.sections.whatActuallyScores.undercellars.heading')}</h3>

<p>{@html $t('guides.swordland-showdown.sections.whatActuallyScores.undercellars.body')}</p>

<h2>{$t('guides.swordland-showdown.sections.map.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.swordland-showdown.sections.map.table.headers.building')}</th>
				<th scope="col">{$t('guides.swordland-showdown.sections.map.table.headers.whatItDoes')}</th>
				<th scope="col">{$t('guides.swordland-showdown.sections.map.table.headers.whyYouCare')}</th>
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.swordland-showdown.sections.map.table.rows') as row}
				<tr>
					<th scope="row">{row.building}</th>
					<td>{row.whatItDoes}</td>
					<td>{row.whyYouCare}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>{$t('guides.swordland-showdown.sections.timeline.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.swordland-showdown.sections.timeline.table.headers.phase')}</th>
				<th scope="col">{$t('guides.swordland-showdown.sections.timeline.table.headers.clock')}</th>
				<th scope="col">{$t('guides.swordland-showdown.sections.timeline.table.headers.whatMatters')}</th>
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.swordland-showdown.sections.timeline.table.rows') as row}
				<tr>
					<th scope="row">{row.phase}</th>
					<td>{row.clock}</td>
					<td>{@html row.whatMatters}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>{$t('guides.swordland-showdown.sections.roles.heading')}</h2>

{#each $t('guides.swordland-showdown.sections.roles.items') as item}
	<h3>{item.heading}</h3>
	<p>{@html item.body}</p>
{/each}

<h2>{$t('guides.swordland-showdown.sections.squadSetup.heading')}</h2>

<ul>
	{#each $t('guides.swordland-showdown.sections.squadSetup.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h3>{$t('guides.swordland-showdown.sections.squadSetup.pvpJoinerHeroes.heading')}</h3>

<p>{$t('guides.swordland-showdown.sections.squadSetup.pvpJoinerHeroes.intro')}</p>

<div class="lineup">
	<div class="slot">
		<Hero slug="hilde" />
		<span class="or">{$t('guides.swordland-showdown.sections.squadSetup.pvpJoinerHeroes.or')}</span>
		<Hero slug="amane" />
	</div>
	<div class="slot"><Hero slug="saul" /></div>
	<div class="slot"><Hero slug="chenko" /></div>
</div>

<h2>{$t('guides.swordland-showdown.sections.healingAndMobility.heading')}</h2>

<ul>
	{#each $t('guides.swordland-showdown.sections.healingAndMobility.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.swordland-showdown.sections.stayingAlive.heading')}</h2>

<ul>
	{#each $t('guides.swordland-showdown.sections.stayingAlive.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.swordland-showdown.sections.commonMistakes.heading')}</h2>

<ul>
	{#each $t('guides.swordland-showdown.sections.commonMistakes.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p class="source">{@html $t('guides.swordland-showdown.source')}</p>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.table-wrap {
		margin: 1.5rem 0;
		overflow-x: auto;
	}

	table {
		width: max-content;
		min-width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	th,
	td {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}

	thead th {
		background: var(--surface);
		color: var(--accent);
	}

	tbody th {
		background: var(--surface);
		white-space: nowrap;
	}

	h3 {
		margin: 2rem 0 0.5rem;
		font-size: 1.05rem;
	}

	.lineup {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
		gap: 1rem;
	}

	.slot {
		display: flex;
		align-items: flex-start;
		gap: 0.35rem;
	}

	.or {
		align-self: center;
		font-size: 0.75rem;
		color: var(--muted);
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
```

- [ ] **Step 5: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Swordland" 777/src/routes/guides/swordland-showdown/+page.svelte | grep -v "class=\|import\|\$t(" `
Expected: no output (all display text now goes through `$t(...)` or `{@html}` of a `$t(...)` result)

- [ ] **Step 6: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/swordland-showdown.json 777/src/lib/translations/i18n.ts 777/src/routes/guides/swordland-showdown/+page.svelte
git commit -m "feat(i18n): migrate swordland-showdown guide to translations"
```

---

### Task 8: Migrate tri-alliance-clash guide content to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/tri-alliance-clash.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/routes/guides/tri-alliance-clash/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created by the i18n setup task) — this task appends its own loader entry to that array. The shared `i18n` config must already include `preprocess: 'preserveArrays'` so array-valued translations like `tldr.items`, `qa`, and ordered-list content remain real arrays for `{#each $t('...') as item}`.
- Produces: the key namespace `guides.tri-alliance-clash.*` used by nothing else, plus one `loaders` entry for route `/guides/tri-alliance-clash`.

- [ ] **Step 1: Create the translation JSON file**

```json
{
  "meta": {
    "title": "Tri-alliance clash — Kingshot 777",
    "description": "Beginner-friendly guide to Kingshot Tri-Alliance Clash: the monthly cycle, entry requirements, energy, squad setup, scoring, phases, the 30-player role split and the temple endgame."
  },
  "h1": "Tri-alliance clash",
  "tldr": {
    "heading": "TL;DR",
    "items": [
      "<strong>Three alliances, 60 minutes, every four weeks.</strong> Points come from holding buildings, and the winner is usually whoever holds the temple at the end.",
      "<strong>The Temple of Tides opens at minute 40.</strong> First capture pays a one-off 50,000 points, then 1,800 points per minute while you hold it. Everything before phase 4 is setup for that fight.",
      "<strong>Energy is your real limit.</strong> Moving, capturing, charging, retreating, reviving and conscripting all cost it. Arrive at minute 20 and minute 40 with a reserve.",
      "<strong>Stay in your lane.</strong> Six lanes, one main player each. A collapsed lane is a hole in your map for the rest of the event.",
      "<strong>Two supporters keep each main player alive.</strong> They rotate forward while the main player heals, so nobody eats the 2-minute respawn walk from HQ.",
      "<strong>Five squads to skip a building.</strong> That's why the special force of six players (18 squads) can drive straight through enemy territory.",
      "<strong>The special force never splits.</strong> It exists to break through and cause chaos, not to win duels.",
      "<strong>Don't overextend.</strong> Push only as fast as your supporters can follow, and stay near your anchor building."
    ]
  },
  "sections": {
    "firstClash": {
      "heading": "If this is your first clash",
      "items": [
        "<strong>Get registered.</strong> Tell your R4/R5 you want in during the sign-up window. You cannot register yourself.",
        "<strong>Set up your three squad presets before you enter.</strong> You can't calmly rebuild marches once the clock is running.",
        "<strong>Learn your lane and role in the 3-minute prep phase.</strong> Ask which building is yours and who your supporters are.",
        "<strong>Take your assigned building</strong> as soon as the phase opens. Don't improvise.",
        "<strong>Stay in your lane.</strong> A lane that empties is a hole for the rest of the hour.",
        "<strong>Don't chase kills.</strong> Kills score nothing directly. Buildings and time do.",
        "<strong>Save energy for minute 20 and minute 40.</strong> Those are the two moments the match is actually decided."
      ]
    },
    "scoring": {
      "heading": "What actually scores",
      "table": {
        "headers": [
          "Source",
          "Opens",
          "Points"
        ],
        "rows": [
          {
            "source": "Garrisons",
            "opens": "Minute 20",
            "points": "1,800 per minute held"
          },
          {
            "source": "Temple of Tides",
            "opens": "Minute 40",
            "points": "50,000 one-off for the first capture, then 1,800 per minute held"
          },
          {
            "source": "Buildings and ruins",
            "opens": "From phase 2",
            "points": "Smaller per-minute income"
          },
          {
            "source": "Kills",
            "opens": "—",
            "points": "No direct points"
          }
        ]
      },
      "items": [
        "<strong>The 50,000 is for capturing the Temple first, not for holding it at the whistle.</strong> If another alliance caps it before you, the match is not over — retaking and holding still pays 1,800 per minute, and twenty minutes of that outweighs the bonus.",
        "<strong>Kills only matter as a means.</strong> You kill to open a building or to keep one. Killing for its own sake spends energy and buys nothing."
      ]
    },
    "energy": {
      "heading": "Energy",
      "body": "This is the mechanic beginners lose to most often. Energy is spent on moving, capturing, charging, retreating, reviving and conscripting. Run out and you cannot answer the Garrison or Temple call, no matter how strong your account is.",
      "items": [
        "<strong>Don't burn energy chasing kills in the first 20 minutes.</strong> Aim to still have a healthy reserve at minute 20, and again at minute 40.",
        "<strong>Assign a Captain after capturing a point.</strong> It improves energy recovery, which is one reason having R4+ players on the field helps.",
        "<strong>Retreat one building back to heal and conscript</strong> out of combat. That's cheaper than instant revive, and far cheaper than dying and eating the ~2-minute walk from HQ.",
        "<strong>Leaving the battlefield has a re-entry cooldown</strong> — commonly cited as around 12 minutes. Most account buffs still apply on the field, except some march speed and capacity effects."
      ]
    },
    "squadSetup": {
      "heading": "Squad setup",
      "intro": "You field three marches, so nine heroes are in rotation. Build the three as presets <strong>before</strong> you enter:",
      "presets": [
        "<strong>Squad 1 — strongest combat squad.</strong> For high-pressure buildings and contested caps.",
        "<strong>Squad 2 — stable squad.</strong> Lane support and reinforcement; it has to survive, not spike.",
        "<strong>Squad 3 — flexible squad.</strong> Routes, recovery cover, retakes."
      ],
      "items": [
        "<strong>Don't even the three out just to make the power numbers look balanced.</strong> Each squad needs a job; three identical mediocre marches do none of them well.",
        "<strong>There is no universal formation ratio.</strong> It depends on your troops, your heroes, the opponent, and whether you're attacking or holding.",
        "<strong>Consider holding one strong march back</strong> for the minute-20 Garrison and minute-40 Temple timings."
      ]
    },
    "eventFormat": {
      "heading": "Event format",
      "items": [
        "<strong>Soldier power is not used for matchmaking.</strong> You can be paired against far stronger alliances, so structure and discipline are what you control.",
        "<strong>You cannot leave the alliance</strong> once you've entered the battlefield."
      ]
    },
    "phases": {
      "heading": "Phases",
      "table": {
        "headers": [
          "Phase",
          "Clock",
          "What matters"
        ],
        "rows": [
          {
            "phase": "1 — Preparation",
            "clock": "0–3 min",
            "matters": "R4/R5 place marks on the map. <br> Everyone confirms their lane and role."
          },
          {
            "phase": "2 — Seize &amp; Conquer",
            "clock": "3–20 min",
            "matters": "Garrisons are shielded and cannot be touched. <br> Main players take their lane keypoint fast, <br> supporters settle into the building behind it, <br> reaction teams sweep the neutral buildings in the centre. <br> Secure the Transit Hubs and route buildings you'll need later."
          },
          {
            "phase": "3 — Garrison Occupation",
            "clock": "20-40 min",
            "matters": "A24, B24 and C24 unlock and pay 1,800 per minute.<br> Priority 1 is holding your <em>own</em> garrison; priority 2 is taking an enemy one.<br> Start the regroup toward the Temple before minute 40, not at it.<br> The special force is at its most active here."
          },
          {
            "phase": "4 — Temple Onslaught",
            "clock": "40-60 min",
            "matters": "Attack the Temple of Tides in one coordinated burst, not one march at a time.<br> Defend the access routes around A29, B29 and C29.<br> This phase decides the match."
          }
        ]
      }
    },
    "roles": {
      "heading": "Roles",
      "table": {
        "headers": [
          "Role",
          "Players",
          "Job"
        ],
        "rows": [
          {
            "role": "Main players",
            "players": "6",
            "job": "One per lane. Capture the lane keypoint immediately, then hold the frontline and keep the enemy out of your interior."
          },
          {
            "role": "Supporters",
            "players": "12",
            "job": "Two per main player. Sit in the building behind the keypoint, step forward only when your main player needs to heal, and never leave the keypoint unmanned."
          },
          {
            "role": "Special commander force",
            "players": "6",
            "job": "A single breakthrough group. Skips low-value buildings, takes undefended structures deep in enemy territory, and forces enemy rotations."
          },
          {
            "role": "Reaction teams",
            "players": "6 (2 × 3)",
            "job": "Grab the central neutral buildings at the start, then float: retake lost buildings and prop up whichever lane is under pressure."
          },
          {
            "role": "Commanders",
            "players": "2",
            "job": "Buff management only. No lane fighting."
          }
        ]
      },
      "qa": [
        {
          "q": "Why does the special force work?",
          "a": "Bypassing a building without capturing it needs five squads. Six players fielding three squads each is 18 squads, enough to skip repeatedly and cover ground fast. Split the group and it stops working — nobody has five squads on their own."
        },
        {
          "q": "Who should be a commander?",
          "a": "Smaller, highly active players who can stay focused for the full 60 minutes. Buff timing swings lane fights and the temple battle, so this is a real job, not a place to park someone weak and inattentive."
        }
      ]
    },
    "map": {
      "heading": "The map",
      "body": "Six lanes feed one centre. Lanes 1, 4 and 5 sit in the upper half, lanes 2, 3 and 6 in the lower half; the garrisons and the temple approaches are the only objectives that decide the score."
    },
    "healingRotation": {
      "heading": "Healing rotation",
      "body": "This is the mechanic that separates an organised alliance from a mob. When a main player gets low:",
      "steps": [
        "One supporter advances and takes over the frontline.",
        "The main player pulls back briefly to heal.",
        "The main player returns as soon as they're healed.",
        "The supporter falls back to the anchor building behind the keypoint."
      ],
      "outro": "The lane never goes quiet, the keypoint is never empty, and nobody has to walk two minutes back from HQ after dying."
    },
    "commonMistakes": {
      "heading": "Common mistakes",
      "items": [
        "<strong>Overextending.</strong> Deep solo pushes leave you cut off from your supporters and hand the enemy free kills.",
        "<strong>Splitting the special force.</strong> Below five squads it can't skip buildings, and its whole value disappears.",
        "<strong>Supporters pushing ahead.</strong> Their strength is stability. An aggressive supporter is a keypoint about to be lost.",
        "<strong>Reaction teams rotating for no reason.</strong> They should move when a lane is genuinely in trouble, not chase every skirmish.",
        "<strong>Rotating to the temple too late.</strong> Lanes need to converge together; arriving piecemeal means being beaten piecemeal."
      ]
    },
    "faq": {
      "heading": "Beginner FAQ",
      "qa": [
        {
          "q": "I'm new — what's the one thing I should get right?",
          "a": "Stay in your lane and save energy. Everything else your R4s can work around; those two they can't."
        },
        {
          "q": "Do kills matter?",
          "a": "Only as a means to hold a building or to open one. There are no points for kills themselves, and duels you didn't need cost energy you'll want at minute 40."
        },
        {
          "q": "What if the enemy caps the Temple first?",
          "a": "Retake it. They get the one-off 50,000, but the 1,800 per minute is still live for whoever holds it — and there are up to twenty minutes of that on the table."
        },
        {
          "q": "Should I use instant revive?",
          "a": "Usually no. Retreat one building back, heal and conscript out of combat. Instant revive burns energy you'll need for the next call."
        },
        {
          "q": "Do I need voice chat?",
          "a": "Strongly recommended. The minute-20 garrison call and the minute-40 temple push happen far too fast to coordinate over text."
        }
      ]
    }
  },
  "images": {
    "map": {
      "alt": "Schematic of the battlefield: six lanes, each with a keypoint and an anchor building behind it, converging on the central Temple of Tides. Lanes 1, 4 and 5 are the upper half, lanes 2, 3 and 6 the lower half. Garrisons A24, B24 and C24 sit off to the side, approach routes A29, B29 and C29 ring the temple, and two neutral buildings sit near the centre.",
      "title": "Lane and objective schematic",
      "caption": "Schematic only, not the in-game map. Each lane is a keypoint with an anchor building behind it; every lane feeds the temple."
    },
    "healingRotation": {
      "alt": "Four-step healing loop: a supporter advances to the frontline, the main player pulls back to heal, the main player returns, the supporter falls back to the anchor building. The keypoint is never left empty.",
      "title": "The four-step healing rotation",
      "caption": "The rotation runs clockwise and repeats; the frontline is always occupied."
    }
  },
  "mapDiagram": {
    "upperHalf": "Upper half — lanes 1, 4, 5",
    "lowerHalf": "Lower half — lanes 2, 3, 6",
    "anchors": {
      "one": "Anchor 1",
      "two": "Anchor 2",
      "three": "Anchor 3",
      "four": "Anchor 4",
      "five": "Anchor 5",
      "six": "Anchor 6"
    },
    "keypoints": {
      "one": "K1",
      "two": "K2",
      "three": "K3",
      "four": "K4",
      "five": "K5",
      "six": "K6"
    },
    "neutral": "Neutral",
    "reactionTeams": "reaction teams",
    "routes": {
      "a29": "A29",
      "b29": "B29",
      "c29": "C29"
    },
    "temple": {
      "line1": "Temple",
      "line2": "of Tides"
    },
    "garrisons": "Garrisons",
    "garrisonIds": {
      "a24": "A24",
      "b24": "B24",
      "c24": "C24"
    },
    "unlock": "unlock min 20"
  },
  "healingDiagram": {
    "steps": {
      "one": {
        "number": "1",
        "title": "Supporter steps up",
        "subtitle": "takes the frontline"
      },
      "two": {
        "number": "2",
        "title": "Main player pulls back",
        "subtitle": "heals out of combat"
      },
      "three": {
        "number": "3",
        "title": "Main player returns",
        "subtitle": "retakes the frontline"
      },
      "four": {
        "number": "4",
        "title": "Supporter falls back",
        "subtitle": "returns to the anchor"
      }
    },
    "keypoint": {
      "line1": "Keypoint",
      "line2": "never empty"
    },
    "loop": "loop as often as needed — nobody walks back from HQ"
  }
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/tri-alliance-clash.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Register the guide loader in `i18n.ts`**

Add one new loader object inside the existing `loaders: [...]` array in `777/src/lib/translations/i18n.ts`. Keep the existing `preprocess: 'preserveArrays'` setting unchanged. Insert the new element after the existing `common` loader entry (or alongside the other guide loaders if the file is already grouped that way).

```diff
 export const i18n = new I18n({
+	preprocess: 'preserveArrays',
 	loaders: [
 		{
 			locale: 'en',
 			key: 'common',
 			loader: async () => (await import('./en/common.json')).default
 		},
+		{
+			locale: 'en',
+			key: 'guides.tri-alliance-clash',
+			routes: ['/guides/tri-alliance-clash'],
+			loader: async () => (await import('./en/guides/tri-alliance-clash.json')).default
+		},
 		// keep existing guide/page loaders here unchanged
 	]
 });
```

If `preprocess: 'preserveArrays'` is already present, do **not** duplicate it; only add the new loader object.

- [ ] **Step 4: Rewrite the Svelte template to use the translations**

```svelte
<script>
	import { t } from '$lib/translations/i18n';
</script>

<svelte:head>
	<title>{$t('guides.tri-alliance-clash.meta.title')}</title>
	<meta name="description" content={$t('guides.tri-alliance-clash.meta.description')} />
</svelte:head>

<h1>{$t('guides.tri-alliance-clash.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.tri-alliance-clash.tldr.heading')}</h2>
	<ul>
		{#each $t('guides.tri-alliance-clash.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.tri-alliance-clash.sections.firstClash.heading')}</h2>

<ol>
	{#each $t('guides.tri-alliance-clash.sections.firstClash.items') as item}
		<li>{@html item}</li>
	{/each}
</ol>

<h2>{$t('guides.tri-alliance-clash.sections.scoring.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				{#each $t('guides.tri-alliance-clash.sections.scoring.table.headers') as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.tri-alliance-clash.sections.scoring.table.rows') as row}
				<tr>
					<th>{@html row.source}</th>
					<td>{@html row.opens}</td>
					<td>{@html row.points}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.scoring.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.energy.heading')}</h2>

<p>{$t('guides.tri-alliance-clash.sections.energy.body')}</p>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.energy.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.squadSetup.heading')}</h2>

<p>{@html $t('guides.tri-alliance-clash.sections.squadSetup.intro')}</p>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.squadSetup.presets') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.squadSetup.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.eventFormat.heading')}</h2>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.eventFormat.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.phases.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				{#each $t('guides.tri-alliance-clash.sections.phases.table.headers') as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.tri-alliance-clash.sections.phases.table.rows') as row}
				<tr>
					<th>{@html row.phase}</th>
					<td>{@html row.clock}</td>
					<td>{@html row.matters}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>{$t('guides.tri-alliance-clash.sections.roles.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				{#each $t('guides.tri-alliance-clash.sections.roles.table.headers') as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.tri-alliance-clash.sections.roles.table.rows') as row}
				<tr>
					<th>{@html row.role}</th>
					<td>{@html row.players}</td>
					<td>{@html row.job}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<dl class="qa">
	{#each $t('guides.tri-alliance-clash.sections.roles.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<h2>{$t('guides.tri-alliance-clash.sections.map.heading')}</h2>

<p>{$t('guides.tri-alliance-clash.sections.map.body')}</p>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 520"
			width="100%"
			height="auto"
			role="img"
			aria-label={$t('guides.tri-alliance-clash.images.map.alt')}
		>
			<title>{$t('guides.tri-alliance-clash.images.map.title')}</title>

			<g stroke="var(--border)" stroke-width="1.5" fill="none">
				<line x1="250" y1="78" x2="250" y2="116" />
				<line x1="420" y1="78" x2="420" y2="116" />
				<line x1="590" y1="78" x2="590" y2="116" />
				<line x1="250" y1="409" x2="250" y2="445" />
				<line x1="420" y1="409" x2="420" y2="445" />
				<line x1="590" y1="409" x2="590" y2="445" />
				<line x1="250" y1="140" x2="420" y2="260" />
				<line x1="420" y1="164" x2="420" y2="260" />
				<line x1="590" y1="140" x2="420" y2="260" />
				<line x1="250" y1="385" x2="420" y2="260" />
				<line x1="420" y1="361" x2="420" y2="260" />
				<line x1="590" y1="385" x2="420" y2="260" />
			</g>

			<text x="420" y="22" text-anchor="middle" font-size="11" fill="var(--muted)"
				>{$t('guides.tri-alliance-clash.mapDiagram.upperHalf')}</text
			>
			<text x="420" y="508" text-anchor="middle" font-size="11" fill="var(--muted)"
				>{$t('guides.tri-alliance-clash.mapDiagram.lowerHalf')}</text
			>

			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="195" y="44" width="110" height="34" rx="6" />
				<rect x="365" y="44" width="110" height="34" rx="6" />
				<rect x="535" y="44" width="110" height="34" rx="6" />
				<rect x="195" y="445" width="110" height="34" rx="6" />
				<rect x="365" y="445" width="110" height="34" rx="6" />
				<rect x="535" y="445" width="110" height="34" rx="6" />
			</g>
			<g font-size="11" fill="var(--muted)" text-anchor="middle">
				<text x="250" y="66">{$t('guides.tri-alliance-clash.mapDiagram.anchors.one')}</text>
				<text x="420" y="66">{$t('guides.tri-alliance-clash.mapDiagram.anchors.four')}</text>
				<text x="590" y="66">{$t('guides.tri-alliance-clash.mapDiagram.anchors.five')}</text>
				<text x="250" y="467">{$t('guides.tri-alliance-clash.mapDiagram.anchors.two')}</text>
				<text x="420" y="467">{$t('guides.tri-alliance-clash.mapDiagram.anchors.three')}</text>
				<text x="590" y="467">{$t('guides.tri-alliance-clash.mapDiagram.anchors.six')}</text>
			</g>

			<g fill="var(--surface)" stroke="var(--border)" stroke-width="1.5">
				<circle cx="250" cy="140" r="24" />
				<circle cx="420" cy="140" r="24" />
				<circle cx="590" cy="140" r="24" />
				<circle cx="250" cy="385" r="24" />
				<circle cx="420" cy="385" r="24" />
				<circle cx="590" cy="385" r="24" />
			</g>
			<g font-size="12" fill="var(--text)" text-anchor="middle">
				<text x="250" y="144">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.one')}</text>
				<text x="420" y="144">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.four')}</text>
				<text x="590" y="144">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.five')}</text>
				<text x="250" y="389">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.two')}</text>
				<text x="420" y="389">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.three')}</text>
				<text x="590" y="389">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.six')}</text>
			</g>

			<g fill="var(--bg)" stroke="var(--border)">
				<rect x="272" y="246" width="56" height="28" rx="4" />
				<rect x="512" y="246" width="56" height="28" rx="4" />
			</g>
			<g font-size="10" fill="var(--muted)" text-anchor="middle">
				<text x="300" y="264">{$t('guides.tri-alliance-clash.mapDiagram.neutral')}</text>
				<text x="540" y="264">{$t('guides.tri-alliance-clash.mapDiagram.neutral')}</text>
				<text x="300" y="288">{$t('guides.tri-alliance-clash.mapDiagram.reactionTeams')}</text>
				<text x="540" y="288">{$t('guides.tri-alliance-clash.mapDiagram.reactionTeams')}</text>
			</g>

			<g fill="var(--bg)" stroke="var(--border)">
				<circle cx="342" cy="215" r="15" />
				<circle cx="498" cy="215" r="15" />
				<circle cx="420" cy="340" r="15" />
			</g>
			<g font-size="10" fill="var(--muted)" text-anchor="middle">
				<text x="342" y="219">{$t('guides.tri-alliance-clash.mapDiagram.routes.a29')}</text>
				<text x="498" y="219">{$t('guides.tri-alliance-clash.mapDiagram.routes.b29')}</text>
				<text x="420" y="344">{$t('guides.tri-alliance-clash.mapDiagram.routes.c29')}</text>
			</g>

			<circle
				cx="420"
				cy="260"
				r="42"
				fill="var(--accent)"
				fill-opacity="0.2"
				stroke="var(--accent)"
				stroke-width="2"
			/>
			<g font-size="11" fill="var(--accent)" text-anchor="middle">
				<text x="420" y="257">{$t('guides.tri-alliance-clash.mapDiagram.temple.line1')}</text>
				<text x="420" y="271">{$t('guides.tri-alliance-clash.mapDiagram.temple.line2')}</text>
			</g>

			<text x="62" y="166" text-anchor="middle" font-size="11" fill="var(--text)"
				>{$t('guides.tri-alliance-clash.mapDiagram.garrisons')}</text
			>
			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="16" y="180" width="92" height="30" rx="6" />
				<rect x="16" y="222" width="92" height="30" rx="6" />
				<rect x="16" y="264" width="92" height="30" rx="6" />
			</g>
			<g font-size="11" fill="var(--muted)" text-anchor="middle">
				<text x="62" y="200">{$t('guides.tri-alliance-clash.mapDiagram.garrisonIds.a24')}</text>
				<text x="62" y="242">{$t('guides.tri-alliance-clash.mapDiagram.garrisonIds.b24')}</text>
				<text x="62" y="284">{$t('guides.tri-alliance-clash.mapDiagram.garrisonIds.c24')}</text>
				<text x="62" y="312">{$t('guides.tri-alliance-clash.mapDiagram.unlock')}</text>
			</g>
		</svg>
	</div>
	<figcaption>{$t('guides.tri-alliance-clash.images.map.caption')}</figcaption>
</figure>

<h2>{$t('guides.tri-alliance-clash.sections.healingRotation.heading')}</h2>

<p>{$t('guides.tri-alliance-clash.sections.healingRotation.body')}</p>

<ol>
	{#each $t('guides.tri-alliance-clash.sections.healingRotation.steps') as item}
		<li>{@html item}</li>
	{/each}
</ol>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 296"
			width="100%"
			height="auto"
			role="img"
			aria-label={$t('guides.tri-alliance-clash.images.healingRotation.alt')}
		>
			<title>{$t('guides.tri-alliance-clash.images.healingRotation.title')}</title>

			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="60" y="40" width="300" height="70" rx="8" />
				<rect x="440" y="40" width="300" height="70" rx="8" />
				<rect x="440" y="182" width="300" height="70" rx="8" />
				<rect x="60" y="182" width="300" height="70" rx="8" />
			</g>

			<g font-size="12">
				<text x="80" y="68" fill="var(--accent)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.one.number')}</text
				>
				<text x="102" y="68" fill="var(--text)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.one.title')}</text
				>
				<text x="102" y="90" fill="var(--muted)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.one.subtitle')}</text
				>

				<text x="460" y="68" fill="var(--accent)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.two.number')}</text
				>
				<text x="482" y="68" fill="var(--text)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.two.title')}</text
				>
				<text x="482" y="90" fill="var(--muted)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.two.subtitle')}</text
				>

				<text x="460" y="210" fill="var(--accent)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.three.number')}</text
				>
				<text x="482" y="210" fill="var(--text)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.three.title')}</text
				>
				<text x="482" y="232" fill="var(--muted)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.three.subtitle')}</text
				>

				<text x="80" y="210" fill="var(--accent)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.four.number')}</text
				>
				<text x="102" y="210" fill="var(--text)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.four.title')}</text
				>
				<text x="102" y="232" fill="var(--muted)"
					>{$t('guides.tri-alliance-clash.healingDiagram.steps.four.subtitle')}</text
				>
			</g>

			<g stroke="var(--accent)" stroke-width="1.5" fill="var(--accent)">
				<line x1="364" y1="75" x2="428" y2="75" />
				<path d="M436 75 L426 70 L426 80 Z" stroke="none" />
				<line x1="590" y1="114" x2="590" y2="170" />
				<path d="M590 178 L585 168 L595 168 Z" stroke="none" />
				<line x1="436" y1="217" x2="372" y2="217" />
				<path d="M364 217 L374 212 L374 222 Z" stroke="none" />
				<line x1="210" y1="178" x2="210" y2="122" />
				<path d="M210 114 L205 124 L215 124 Z" stroke="none" />
			</g>

			<g font-size="11" text-anchor="middle" fill="var(--accent)">
				<text x="400" y="140">{$t('guides.tri-alliance-clash.healingDiagram.keypoint.line1')}</text>
				<text x="400" y="156">{$t('guides.tri-alliance-clash.healingDiagram.keypoint.line2')}</text>
			</g>

			<text x="400" y="284" text-anchor="middle" font-size="11" fill="var(--muted)"
				>{$t('guides.tri-alliance-clash.healingDiagram.loop')}</text
			>
		</svg>
	</div>
	<figcaption>{$t('guides.tri-alliance-clash.images.healingRotation.caption')}</figcaption>
</figure>

<p>{$t('guides.tri-alliance-clash.sections.healingRotation.outro')}</p>

<h2>{$t('guides.tri-alliance-clash.sections.commonMistakes.heading')}</h2>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.commonMistakes.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.faq.heading')}</h2>

<dl class="qa">
	{#each $t('guides.tri-alliance-clash.sections.faq.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.qa {
		margin: 1.5rem 0;
	}

	.qa dt {
		margin-top: 1.1rem;
		color: var(--accent);
		font-weight: 700;
	}

	.qa dd {
		margin: 0.3rem 0 0;
	}

	.table-wrap {
		margin: 1.5rem 0;
		overflow-x: auto;
	}

	.diagram {
		margin: 1.5rem 0;
	}

	.diagram-scroll {
		overflow-x: auto;
	}

	.diagram svg {
		display: block;
		width: 100%;
		min-width: 520px;
		height: auto;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	.diagram figcaption {
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	table {
		width: max-content;
		min-width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	th,
	td {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}

	thead th {
		background: var(--surface);
		color: var(--accent);
	}

	tbody th {
		background: var(--surface);
		white-space: nowrap;
	}
</style>
```

- [ ] **Step 5: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Alliance" 777/src/routes/guides/tri-alliance-clash/+page.svelte | grep -v "class=\|import\|\$t(" `
Expected: no output (all display text now goes through `$t(...)` or `{@html}` of a `$t(...)` result)

- [ ] **Step 6: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/tri-alliance-clash.json 777/src/lib/translations/i18n.ts 777/src/routes/guides/tri-alliance-clash/+page.svelte
git commit -m "feat(i18n): migrate tri-alliance-clash guide to translations"
```

---

### Task 9: Migrate timeline data and guide page to translations

**Files:**
- Create: `777/src/lib/translations/en/guides/timeline.json`
- Modify: `777/src/lib/translations/i18n.ts`
- Modify: `777/src/lib/timeline.ts`
- Modify: `777/src/routes/guides/timeline/+page.svelte`

**Interfaces:**
- Consumes: `t` store and the `loaders` array exported from `777/src/lib/translations/i18n.ts` (created in Task 1) — this task appends its own loader entry to that array.
- Produces: the key namespace `guides.timeline.*`, used by nothing else. Changes `Milestone` type in `777/src/lib/timeline.ts`: `title: string` becomes `titleKey: string`, `notes?: string` becomes `notesKey?: string`. Renames the exported `categoryLabels: Record<MilestoneCategory, string>` to `categoryLabelKeys: Record<MilestoneCategory, string>`, where values are now translation keys instead of display strings. No other file imports from `timeline.ts` besides this guide's own `+page.svelte`, so no other files need updating.

- [ ] **Step 1: Create the translation JSON file**

Create `777/src/lib/translations/en/guides/timeline.json`. Keys are flat starting from `meta`/`h1`/etc — do NOT wrap in an outer `{"guides": {"timeline": {...}}}` object. Placeholders like `{{kingdom}}` are `sveltekit-i18n`'s param-interpolation syntax — they get filled in via `$t('key', { kingdom })` in the template.

```json
{
  "meta": {
    "title": "Kingdom {{kingdom}} timeline — Kingshot 777",
    "description": "Milestone timeline for Kingshot kingdom {{kingdom}}: hero generations, fog clears, KvK firsts, Truegold tiers, and pet generations."
  },
  "h1": "Kingdom {{kingdom}} timeline",
  "intro": "Milestones recorded for our kingdom, spaced by how far apart they actually fell. Cards with notes expand when you open them.",
  "empty": "No milestones recorded yet.",
  "jumpToToday": "Jump to today",
  "predicted": "predicted",
  "today": "Today",
  "source": "Dates recorded by us for kingdom {{kingdom}}. For other kingdoms and predicted milestones, see <a href=\"https://kingshotoptimizer.com/kingdom-timeline/\" target=\"_blank\" rel=\"noreferrer\">Kingshot Optimizer</a>.",
  "categories": {
    "heroes": "Heroes",
    "pvp": "PvP",
    "feature": "New feature",
    "truegold": "Truegold",
    "pets": "Pets",
    "masters": "Masters"
  },
  "milestones": {
    "generation-1-heroes": {
      "title": "Generation 1 Heroes"
    },
    "first-hall-of-governors-hog": {
      "title": "First Hall of Governors (HoG)"
    },
    "first-sanctuary-competition": {
      "title": "First Sanctuary Competition"
    },
    "plains-fog-cleared": {
      "title": "Plains Fog Cleared"
    },
    "mystic-trial-unlocked": {
      "title": "Mystic Trial Unlocked"
    },
    "first-fortress-competition": {
      "title": "First Fortress Competition"
    },
    "hero-gear-reforge-unlocked": {
      "title": "Hero Gear Reforge Unlocked"
    },
    "fertile-land-fog-cleared": {
      "title": "Fertile Land Fog Cleared"
    },
    "alliance-resource-exchange-unlocks": {
      "title": "Alliance Resource Exchange Unlocks"
    },
    "generation-2-heroes": {
      "title": "Generation 2 Heroes",
      "notes": "Zoe (Infantry, Roulette Wheel hero), Hilde (Cavalry), and Marlin (Archer) added to game."
    },
    "first-castle-competition": {
      "title": "First Castle Competition"
    },
    "generation-1-pets": {
      "title": "Generation 1 Pets",
      "notes": "Grey Wolf, Lynx, and Bison added to pet roster."
    },
    "age-of-truegold": {
      "title": "Age of Truegold",
      "notes": "Unlocks TG levels 1-3"
    },
    "generation-2-pets": {
      "title": "Generation 2 Pets",
      "notes": "Cheetah and Moose added to pet roster."
    },
    "first-kvk-prep-starts": {
      "title": "First KvK Prep Starts"
    },
    "first-kvk-castle-competition": {
      "title": "First KvK Castle Competition"
    },
    "first-alliance-brawl": {
      "title": "First Alliance Brawl"
    },
    "generation-3-heroes": {
      "title": "Generation 3 Heroes",
      "notes": "Eric (Infantry), Petra (Cavalry, Roulette Wheel hero), and Jaeger (Archer) added to game."
    },
    "generation-3-pets": {
      "title": "Generation 3 Pets",
      "notes": "Lion and Grizzly Bear added to pet roster."
    },
    "gov-gear-material-exchange-unlocks": {
      "title": "Gov Gear Material Exchange Unlocks",
      "notes": "Allows for the exchange of Governor Gear materials (Satin, Gilded Threads, and Artisan's Vision) in the top right of the gear upgrade panel."
    },
    "masters-unlocked": {
      "title": "Masters Unlocked",
      "notes": "Requires player to have Town Center lvl 25. Valora, Pan, and Roman released as the first 3 masters. We currently suspect this is the first 3 masters only and other generations unlock later/may exist. Need to verify as players progress through this content."
    },
    "truegold-5": {
      "title": "Truegold 5",
      "notes": "Also unlocks Truegold Crucible (converts basic resources into Truegold). Governor charm materials added to Mystic Trial store. Level 8 Terror (Titan Roc) added to the game. From this point forward, your Kingdom will be eligible for the next Kingdom Transfer Window. To see detailed predictions, check out our Kingdom Transfer module."
    },
    "gov-charm-material-exchange-unlocked": {
      "title": "Gov Charm Material Exchange Unlocked",
      "notes": "Allows for the exchange of Governor Charm materials (Charm Guide and Charm Design) in the top right of the gear upgrade panel."
    },
    "4th-master-unlocked": {
      "title": "4th Master Unlocked",
      "notes": "4th master (Cassia) added to the game."
    },
    "governor-charm-cap-raised": {
      "title": "Governor Charm Cap Raised",
      "notes": "Charms level 12+ available. While not immediately achievable for most players, this small milestone splits Transfer Groups and must be called out."
    },
    "generation-4-heroes": {
      "title": "Generation 4 Heroes",
      "notes": "Alcar (Infantry), Margot (Cavalry), and Rosa (Archer, Roulette Wheel hero) added to game. The Desert Trial Event transforms into Champions Way. Gen 2 heroes enter the gold key loot pool."
    },
    "generation-4-pets": {
      "title": "Generation 4 Pets",
      "notes": "Giant Rhino and Mighty Bison added to pet roster."
    },
    "5th-and-6th-masters-unlocked": {
      "title": "5th and 6th Masters Unlocked",
      "notes": "5th and 6th masters (Guinevere and Wilson) added to the game."
    },
    "war-academy-unlocked": {
      "title": "War Academy Unlocked",
      "notes": "Truegold Dust and T11 troops added to game."
    },
    "generation-5-heroes": {
      "title": "Generation 5 Heroes",
      "notes": "Long Fei (Infantry, Roulette Wheel hero), Thrud (Cavalry), and Vivian (Archer) added to game. Gen 3 heroes enter the gold key loot pool."
    },
    "generation-5-pets": {
      "title": "Generation 5 Pets",
      "notes": "Great Moose and Alpha Black Panther added to pet roster."
    },
    "truegold-8": {
      "title": "Truegold 8",
      "notes": "Tempered Truegold added to the game. Enhances Truegold Crucible to allow Tempered Truegold conversion. Governor gear chests added to Mystic Trial store."
    },
    "generation-6-heroes": {
      "title": "Generation 6 Heroes",
      "notes": "Triton (Infantry), Sophia (Cavalry, Roulette Wheel hero), and Yang (Archer) added to game. Gen 4 heroes enter the gold key loot pool."
    },
    "generation-6-pets": {
      "title": "Generation 6 Pets",
      "notes": "Regal White Lion and Ironclad War Elephant added to pet roster."
    },
    "first-flamedragon-tyrant-competition": {
      "title": "First Flamedragon Tyrant Competition"
    },
    "generation-7-heroes": {
      "title": "Generation 7 Heroes",
      "notes": "Charles (Infantry), Ava (Cavalry), and Wee & Woo (Archer, Roulette Wheel hero) added to game. Gen 5 heroes enter the gold key loot pool."
    },
    "generation-7-pets": {
      "title": "Generation 7 Pets",
      "notes": "Ironclad War Bear added to pet roster."
    },
    "advanced-truegold-research": {
      "title": "Advanced Truegold Research",
      "notes": "Advanced Truegold Research becomes available in the War Academy."
    },
    "generation-8-heroes": {
      "title": "Generation 8 Heroes",
      "notes": "Gen 6 heroes enter the gold key loot pool."
    },
    "generation-8-pets": {
      "title": "Generation 8 Pets"
    },
    "generation-9-heroes": {
      "title": "Generation 9 Heroes",
      "notes": "Gen 7 heroes enter the gold key loot pool."
    },
    "truegold-10": {
      "title": "Truegold 10",
      "notes": "Truegold levels 9 and 10 added to the game. New features in conjunction with these levels have yet to be confirmed."
    }
  }
}
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('777/src/lib/translations/en/guides/timeline.json', 'utf8')); console.log('valid')"`
Expected: prints `valid`

- [ ] **Step 3: Register the loader**

In `777/src/lib/translations/i18n.ts`, add a new entry to the `loaders` array, after the `guides.vikings` entry (or whichever guide entry is currently last):

```ts
		{
			locale: 'en',
			key: 'guides.timeline',
			routes: ['/guides/timeline'],
			loader: async () => (await import('./en/guides/timeline.json')).default
		}
```

- [ ] **Step 4: Migrate timeline.ts to use translation keys**

Replace the full contents of `777/src/lib/timeline.ts` with:

```ts
export type MilestoneCategory =
	| 'heroes'
	| 'pvp'
	| 'feature'
	| 'truegold'
	| 'pets'
	| 'masters';

export type Milestone = {
	/** ISO date, e.g. '2025-03-14'. Use the day the milestone unlocked or is expected. */
	date: string;
	/** Translation key into guides.timeline.milestones.<id>.title */
	titleKey: string;
	category: MilestoneCategory;
	/** Set true for dates you expect but that haven't happened yet. */
	predicted?: boolean;
	/** Translation key into guides.timeline.milestones.<id>.notes, shown when the card is expanded. */
	notesKey?: string;
	/** Asset base names in `$lib/assets/timeline`, e.g. ['zoe', 'hilde']. */
	icons?: string[];
};

export const kingdom = 1997;

/** The day K1997 opened. */
export const kingdomCreated = '2026-04-27';

/** Translation keys for each category's display label — looked up via $t(categoryLabelKeys[category]). */
export const categoryLabelKeys: Record<MilestoneCategory, string> = {
	heroes: 'guides.timeline.categories.heroes',
	pvp: 'guides.timeline.categories.pvp',
	feature: 'guides.timeline.categories.feature',
	truegold: 'guides.timeline.categories.truegold',
	pets: 'guides.timeline.categories.pets',
	masters: 'guides.timeline.categories.masters'
};

/**
 * Kingdom 1997 milestones. Dates on or before the kingdom's current age are
 * recorded unlocks; later entries are marked `predicted`.
 */
export const milestones: Milestone[] = [
	{
		date: '2026-04-27',
		titleKey: 'guides.timeline.milestones.generation-1-heroes.title',
		category: 'heroes',
		icons: ['heroes']
	},
	{
		date: '2026-05-02',
		titleKey: 'guides.timeline.milestones.first-hall-of-governors-hog.title',
		category: 'feature'
	},
	{
		date: '2026-05-03',
		titleKey: 'guides.timeline.milestones.first-sanctuary-competition.title',
		category: 'pvp',
		icons: ['sanctuary-battle']
	},
	{
		date: '2026-05-10',
		titleKey: 'guides.timeline.milestones.plains-fog-cleared.title',
		category: 'feature'
	},
	{
		date: '2026-05-18',
		titleKey: 'guides.timeline.milestones.mystic-trial-unlocked.title',
		category: 'feature',
		icons: ['mystic-trial']
	},
	{
		date: '2026-05-21',
		titleKey: 'guides.timeline.milestones.first-fortress-competition.title',
		category: 'pvp',
		icons: ['fortress']
	},
	{
		date: '2026-05-24',
		titleKey: 'guides.timeline.milestones.hero-gear-reforge-unlocked.title',
		category: 'feature',
		icons: ['hero-gear']
	},
	{
		date: '2026-06-04',
		titleKey: 'guides.timeline.milestones.fertile-land-fog-cleared.title',
		category: 'feature'
	},
	{
		date: '2026-06-10',
		titleKey: 'guides.timeline.milestones.alliance-resource-exchange-unlocks.title',
		category: 'feature',
		icons: ['exchange']
	},
	{
		date: '2026-06-15',
		titleKey: 'guides.timeline.milestones.generation-2-heroes.title',
		category: 'heroes',
		notesKey: 'guides.timeline.milestones.generation-2-heroes.notes',
		icons: ['zoe', 'hilde', 'marlin']
	},
	{
		date: '2026-06-19',
		titleKey: 'guides.timeline.milestones.first-castle-competition.title',
		category: 'pvp',
		icons: ['castle']
	},
	{
		date: '2026-06-20',
		titleKey: 'guides.timeline.milestones.generation-1-pets.title',
		category: 'pets',
		notesKey: 'guides.timeline.milestones.generation-1-pets.notes',
		icons: ['gray-wolf', 'lynx', 'bison']
	},
	{
		date: '2026-07-05',
		titleKey: 'guides.timeline.milestones.age-of-truegold.title',
		category: 'truegold',
		notesKey: 'guides.timeline.milestones.age-of-truegold.notes',
		icons: ['tg3']
	},
	{
		date: '2026-07-07',
		titleKey: 'guides.timeline.milestones.generation-2-pets.title',
		category: 'pets',
		notesKey: 'guides.timeline.milestones.generation-2-pets.notes',
		icons: ['cheetah', 'moose']
	},
	{
		date: '2026-07-13',
		titleKey: 'guides.timeline.milestones.first-kvk-prep-starts.title',
		category: 'pvp',
		icons: ['kvk-event']
	},
	{
		date: '2026-07-18',
		titleKey: 'guides.timeline.milestones.first-kvk-castle-competition.title',
		category: 'pvp',
		icons: ['kvk-event', 'castle']
	},
	{
		date: '2026-07-20',
		titleKey: 'guides.timeline.milestones.first-alliance-brawl.title',
		category: 'pvp',
		icons: ['alliance-brawl']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.generation-3-heroes.title',
		category: 'heroes',
		notesKey: 'guides.timeline.milestones.generation-3-heroes.notes',
		icons: ['eric', 'petra', 'jaeger']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.generation-3-pets.title',
		category: 'pets',
		notesKey: 'guides.timeline.milestones.generation-3-pets.notes',
		icons: ['lion', 'grizzly-bear']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.gov-gear-material-exchange-unlocks.title',
		category: 'feature',
		notesKey: 'guides.timeline.milestones.gov-gear-material-exchange-unlocks.notes',
		icons: ['satin', 'exchange']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.masters-unlocked.title',
		category: 'masters',
		notesKey: 'guides.timeline.milestones.masters-unlocked.notes',
		icons: ['valora', 'pan', 'roman']
	},
	{
		date: '2026-09-28',
		titleKey: 'guides.timeline.milestones.truegold-5.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.truegold-5.notes',
		icons: ['tg5']
	},
	{
		date: '2026-09-28',
		titleKey: 'guides.timeline.milestones.gov-charm-material-exchange-unlocked.title',
		category: 'feature',
		predicted: true,
		notesKey: 'guides.timeline.milestones.gov-charm-material-exchange-unlocked.notes',
		icons: ['charm-guide', 'exchange']
	},
	{
		date: '2026-09-28',
		titleKey: 'guides.timeline.milestones.4th-master-unlocked.title',
		category: 'masters',
		predicted: true,
		notesKey: 'guides.timeline.milestones.4th-master-unlocked.notes',
		icons: ['cassia']
	},
	{
		date: '2026-10-19',
		titleKey: 'guides.timeline.milestones.governor-charm-cap-raised.title',
		category: 'feature',
		predicted: true,
		notesKey: 'guides.timeline.milestones.governor-charm-cap-raised.notes',
		icons: ['charm-l12-infantry', 'charm-l12-cavalry', 'charm-l12-archer']
	},
	{
		date: '2026-11-09',
		titleKey: 'guides.timeline.milestones.generation-4-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-4-heroes.notes',
		icons: ['alcar', 'margot', 'rosa']
	},
	{
		date: '2026-11-09',
		titleKey: 'guides.timeline.milestones.generation-4-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-4-pets.notes',
		icons: ['giant-rhino', 'mighty-bison']
	},
	{
		date: '2026-11-09',
		titleKey: 'guides.timeline.milestones.5th-and-6th-masters-unlocked.title',
		category: 'masters',
		predicted: true,
		notesKey: 'guides.timeline.milestones.5th-and-6th-masters-unlocked.notes'
	},
	{
		date: '2026-12-07',
		titleKey: 'guides.timeline.milestones.war-academy-unlocked.title',
		category: 'feature',
		predicted: true,
		notesKey: 'guides.timeline.milestones.war-academy-unlocked.notes',
		icons: ['tier-11', 'truegold-dust']
	},
	{
		date: '2027-02-01',
		titleKey: 'guides.timeline.milestones.generation-5-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-5-heroes.notes',
		icons: ['long-fei', 'thrud', 'vivian']
	},
	{
		date: '2027-02-01',
		titleKey: 'guides.timeline.milestones.generation-5-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-5-pets.notes',
		icons: ['great-moose', 'alpha-black-panther']
	},
	{
		date: '2027-03-15',
		titleKey: 'guides.timeline.milestones.truegold-8.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.truegold-8.notes',
		icons: ['tg8', 'tempered-truegold']
	},
	{
		date: '2027-04-26',
		titleKey: 'guides.timeline.milestones.generation-6-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-6-heroes.notes',
		icons: ['triton', 'sophia', 'yang']
	},
	{
		date: '2027-04-26',
		titleKey: 'guides.timeline.milestones.generation-6-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-6-pets.notes',
		icons: ['regal-white-lion', 'ironclad-war-elephant']
	},
	{
		date: '2027-06-06',
		titleKey: 'guides.timeline.milestones.first-flamedragon-tyrant-competition.title',
		category: 'pvp',
		predicted: true,
		icons: ['flamedragon']
	},
	{
		date: '2027-07-19',
		titleKey: 'guides.timeline.milestones.generation-7-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-7-heroes.notes',
		icons: ['charles', 'ava', 'wee-woo']
	},
	{
		date: '2027-07-19',
		titleKey: 'guides.timeline.milestones.generation-7-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-7-pets.notes',
		icons: ['ironclad-war-bear']
	},
	{
		date: '2027-08-30',
		titleKey: 'guides.timeline.milestones.advanced-truegold-research.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.advanced-truegold-research.notes',
		icons: ['truegold']
	},
	{
		date: '2027-10-11',
		titleKey: 'guides.timeline.milestones.generation-8-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-8-heroes.notes'
	},
	{
		date: '2027-10-11',
		titleKey: 'guides.timeline.milestones.generation-8-pets.title',
		category: 'pets',
		predicted: true
	},
	{
		date: '2028-01-03',
		titleKey: 'guides.timeline.milestones.generation-9-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-9-heroes.notes'
	},
	{
		date: '2028-02-14',
		titleKey: 'guides.timeline.milestones.truegold-10.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.truegold-10.notes'
	},
];
```

- [ ] **Step 5: Rewrite the Svelte template to use the translations**

Replace the full contents of `777/src/routes/guides/timeline/+page.svelte` with:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { categoryLabelKeys, kingdom, milestones, type Milestone } from '$lib/timeline';
	import { t } from '$lib/translations/i18n';

	const iconUrls = import.meta.glob('$lib/assets/timeline/*.{webp,png}', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;

	const iconFor = (name: string) =>
		Object.entries(iconUrls).find(([path]) => path.match(/([^/]+)\.(webp|png)$/)?.[1] === name)?.[1];

	const MIN_GAP = 14;
	const MAX_GAP = 120;
	const PX_PER_DAY = 1.4;
	const DAY_MS = 86_400_000;

	const dateFormat = new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});

	const asTime = (value: string) => Date.parse(`${value}T00:00:00Z`);
	const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

	type Dated = Milestone & { time: number };
	type Row = { key: string; gap: number; milestone?: Dated };

	const dated: Dated[] = [...milestones]
		.filter((m) => !Number.isNaN(asTime(m.date)))
		.map((m) => ({ ...m, time: asTime(m.date) }))
		.sort((a, b) => a.time - b.time);

	// Cards sit in normal flow, so the date distance becomes the gap *between* them.
	// That keeps the spacing proportional without ever letting two cards overlap.
	const gapBetween = (from: number, to: number) =>
		clamp(((to - from) / DAY_MS) * PX_PER_DAY, MIN_GAP, MAX_GAP);

	// Prerendered at build time, so today's position is resolved in the browser.
	let today = $state<number | null>(null);
	let todayMarker = $state<HTMLDivElement | null>(null);

	const rows: Row[] = $derived.by(() => {
		const out: Row[] = [];
		let previous: Dated | null = null;
		let placedToday = today === null;

		for (const m of dated) {
			let gap = previous ? gapBetween(previous.time, m.time) : 0;

			if (!placedToday && today! <= m.time) {
				const span = previous ? m.time - previous.time : 0;
				const ratio = span > 0 ? clamp((today! - previous!.time) / span, 0, 1) : 0;
				out.push({ key: '__today', gap: gap * ratio });
				gap -= gap * ratio;
				placedToday = true;
			}

			out.push({ key: m.date + m.titleKey, gap, milestone: m });
			previous = m;
		}

		if (!placedToday) out.push({ key: '__today', gap: MIN_GAP });
		return out;
	});

	onMount(() => {
		const now = new Date();
		today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
	});

	function jumpToToday() {
		todayMarker?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
</script>

<svelte:head>
	<title>{$t('guides.timeline.meta.title', { kingdom })}</title>
	<meta
		name="description"
		content={$t('guides.timeline.meta.description', { kingdom })}
	/>
</svelte:head>

<h1>{$t('guides.timeline.h1', { kingdom })}</h1>

<p>
	{$t('guides.timeline.intro')}
</p>

{#if dated.length === 0}
	<p class="empty">{$t('guides.timeline.empty')}</p>
{:else}
	<div class="controls">
		<button type="button" onclick={jumpToToday} disabled={today === null}>{$t('guides.timeline.jumpToToday')}</button>
	</div>

	<div class="timeline">
		<div class="spine" aria-hidden="true"></div>

		<ol>
			{#each rows as row (row.key)}
				{#if row.milestone}
					{@const m = row.milestone}
					<li style="margin-top: {row.gap}px" class:predicted={m.predicted}>
						<span class="dot" aria-hidden="true"></span>

						{#snippet head()}
							<span class="date">
								{dateFormat.format(m.time)}
								{#if m.predicted}<em>{$t('guides.timeline.predicted')}</em>{/if}
							</span>
							<span class="title">{$t(m.titleKey)}</span>
							<span class="tag">{$t(categoryLabelKeys[m.category])}</span>
							{#if m.icons?.length}
								<span class="icons">
									{#each m.icons as icon (icon)}
										{@const src = iconFor(icon)}
										{#if src}
											<img {src} alt="" width="40" height="40" loading="lazy" />
										{/if}
									{/each}
								</span>
							{/if}
						{/snippet}

						{#if m.notesKey}
							<details class="card">
								<summary>{@render head()}</summary>
								<p>{$t(m.notesKey)}</p>
							</details>
						{:else}
							<div class="card">{@render head()}</div>
						{/if}
					</li>
				{:else}
					<li class="today-row" style="margin-top: {row.gap}px">
						<div bind:this={todayMarker} class="today" aria-hidden="true">
							<span>{$t('guides.timeline.today')}</span>
						</div>
					</li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}

<p class="source">{@html $t('guides.timeline.source', { kingdom })}</p>

<style>
	.controls {
		position: sticky;
		top: calc(var(--topbar-height) + 0.5rem);
		z-index: 2;
		display: flex;
		justify-content: flex-end;
		margin: 1.5rem 0 0.5rem;
	}

	button {
		padding: 0.45rem 0.9rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 999px;
		color: var(--text);
		font: inherit;
		font-size: 0.9rem;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		border-color: var(--accent);
		color: var(--accent);
	}

	button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	.timeline {
		position: relative;
		margin: 0 0 2rem -0.5rem;
		padding-left: 1.25rem;
	}

	.spine {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 2px;
		background: var(--border);
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
	}

	.dot {
		position: absolute;
		top: 0.85rem;
		left: -1.55rem;
		width: 0.6rem;
		height: 0.6rem;
		background: var(--accent);
		border: 2px solid var(--bg);
		border-radius: 50%;
	}

	li.predicted .dot {
		background: var(--bg);
		border-color: var(--muted);
	}

	.card {
		padding: 0.6rem 0.9rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	li.predicted .card {
		border-style: dashed;
	}

	summary {
		cursor: pointer;
	}

	summary::marker {
		color: var(--muted);
	}

	.date {
		display: block;
		color: var(--muted);
		font-size: 0.8rem;
	}

	.date em {
		font-style: normal;
		color: var(--accent);
	}

	.title {
		font-weight: 600;
	}

	.tag {
		margin-left: 0.5rem;
		color: var(--muted);
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.icons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.5rem;
	}

	.icons img {
		width: 40px;
		height: 40px;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 6px;
		object-fit: contain;
	}

	li.predicted .icons img {
		opacity: 0.55;
	}

	details p {
		margin: 0.5rem 0 0;
		color: var(--muted);
		font-size: 0.95rem;
	}

	.today {
		display: flex;
		align-items: center;
		margin-left: -1.25rem;
		border-top: 1px dashed var(--accent);
	}

	.today span {
		margin-left: auto;
		padding: 0 0.4rem;
		background: var(--bg);
		color: var(--accent);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.empty,
	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}

	@media (min-width: 768px) {
		.controls {
			top: 0.5rem;
		}

		.timeline {
			margin-left: 0;
		}
	}
</style>
```

- [ ] **Step 6: Verify no hardcoded English text remains outside the JSON file**

Run: `grep -n "Jump to today\|No milestones recorded\|Kingdom {kingdom}" 777/src/routes/guides/timeline/+page.svelte`
Expected: no output (the interpolated `{kingdom}` from `svelte:head`/`h1` is now inside `$t(...)` calls, not literal template text)

- [ ] **Step 7: Type-check**

Run: `cd 777 && npm run check`
Expected: no errors (the `Milestone`/`categoryLabelKeys` rename must be fully consistent between `timeline.ts` and `+page.svelte`)

- [ ] **Step 8: Commit**

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add 777/src/lib/translations/en/guides/timeline.json 777/src/lib/translations/i18n.ts 777/src/lib/timeline.ts 777/src/routes/guides/timeline/+page.svelte
git commit -m "feat(i18n): migrate timeline data and guide page to translations"
```

---

### Task 10: Full-site verification

**Files:**
- None created or modified — this task only verifies the work from Tasks 1–6.

**Interfaces:**
- Consumes: the complete translated site produced by Tasks 1–6.

- [ ] **Step 1: Type-check the whole project**

Run: `cd 777 && npm run check`
Expected: no errors

- [ ] **Step 2: Build the static site**

Run: `cd 777 && npm run build`
Expected: build succeeds and prerenders every route (home, all 8 guide pages) without errors or warnings about missing translation keys

- [ ] **Step 3: Grep the build output for leftover literal translation keys**

Run: `grep -rlE "guides\.[a-z-]+\.[a-zA-Z.]+" 777/build --include=*.html`
Expected: no output. (If any file matches, it means a `$t(...)` call resolved to its own key string instead of translated text — find that file's route, cross-reference the loader `key` in `777/src/lib/translations/i18n.ts` against the JSON file's top-level shape, and check for the double-nesting mistake described in Tasks 2–6, i.e. the JSON must NOT be wrapped in an extra `{"guides": {"<slug>": {...}}}` object.)

- [ ] **Step 4: Manual visual spot-check**

Run: `cd 777 && npm run dev` (leave running), then open `http://localhost:5173/guides/bear` in a browser and confirm:
- The page shows real text (not raw keys like `guides.bear.h1`)
- TL;DR list items render with bold text via `<strong>` (proof `{@html}` rendering of rich text works)

Then open `http://localhost:5173/guides/timeline` and confirm:
- Milestone titles and category tags show real text, not translation keys
- Expanding a card with notes (e.g. "Generation 2 Heroes") shows the notes text
- The "Jump to today" button and page heading show real text

Stop the dev server when done (Ctrl+C).

- [ ] **Step 5: Commit any final cleanup**

If Steps 1–4 required no code changes, there is nothing to commit — this task is verification-only. If a bug was found and fixed while investigating Step 3, commit it with a message describing the specific fix, e.g.:

```bash
cd /home/roslyn/Git/KirillVassiljev.github.io
git add -A
git commit -m "fix(i18n): <describe the specific fix>"
```
