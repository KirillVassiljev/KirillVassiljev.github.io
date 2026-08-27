<script lang="ts">
	import { onMount } from 'svelte';
	import { categoryLabels, kingdom, milestones, type Milestone } from '$lib/timeline';

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

			out.push({ key: m.date + m.title, gap, milestone: m });
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
	<title>Kingdom {kingdom} timeline — Kingshot 777</title>
	<meta
		name="description"
		content="Milestone timeline for Kingshot kingdom {kingdom}: hero generations, fog clears, KvK firsts, Truegold tiers, and pet generations."
	/>
</svelte:head>

<h1>Kingdom {kingdom} timeline</h1>

<p>
	Milestones recorded for our kingdom, spaced by how far apart they actually fell. Cards with notes
	expand when you open them.
</p>

{#if dated.length === 0}
	<p class="empty">No milestones recorded yet.</p>
{:else}
	<div class="controls">
		<button type="button" onclick={jumpToToday} disabled={today === null}>Jump to today</button>
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
								{#if m.predicted}<em>predicted</em>{/if}
							</span>
							<span class="title">{m.title}</span>
							<span class="tag">{categoryLabels[m.category]}</span>
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

						{#if m.notes}
							<details class="card">
								<summary>{@render head()}</summary>
								<p>{m.notes}</p>
							</details>
						{:else}
							<div class="card">{@render head()}</div>
						{/if}
					</li>
				{:else}
					<li class="today-row" style="margin-top: {row.gap}px">
						<div bind:this={todayMarker} class="today" aria-hidden="true">
							<span>Today</span>
						</div>
					</li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}

<p class="source">
	Dates recorded by us for kingdom {kingdom}. For other kingdoms and predicted milestones, see
	<a href="https://kingshotoptimizer.com/kingdom-timeline/" target="_blank" rel="noreferrer">
		Kingshot Optimizer
	</a>.
</p>

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
