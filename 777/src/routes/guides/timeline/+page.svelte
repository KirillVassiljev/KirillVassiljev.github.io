<script lang="ts">
	import { onMount } from 'svelte';
	import { categoryLabels, kingdom, milestones, type Milestone } from '$lib/timeline';

	const MIN_GAP = 88;
	const MAX_GAP = 240;
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

	type Placed = Milestone & { time: number; offset: number };

	const placed: Placed[] = [...milestones]
		.filter((m) => !Number.isNaN(asTime(m.date)))
		.sort((a, b) => asTime(a.date) - asTime(b.date))
		.reduce<Placed[]>((acc, m) => {
			const time = asTime(m.date);
			const previous = acc.at(-1);
			const gap = previous
				? clamp(((time - previous.time) / DAY_MS) * PX_PER_DAY, MIN_GAP, MAX_GAP)
				: 0;
			acc.push({ ...m, time, offset: (previous?.offset ?? 0) + gap });
			return acc;
		}, []);

	const totalHeight = (placed.at(-1)?.offset ?? 0) + MIN_GAP;

	// Prerendered at build time, so today's position is resolved in the browser.
	let todayOffset = $state<number | null>(null);
	let todayMarker = $state<HTMLDivElement | null>(null);

	function offsetForTime(time: number) {
		if (placed.length === 0) return null;
		const first = placed[0];
		const last = placed.at(-1)!;
		if (time <= first.time) return 0;
		if (time >= last.time) return last.offset;

		const next = placed.findIndex((m) => m.time > time);
		const before = placed[next - 1];
		const after = placed[next];
		const span = after.time - before.time;
		const ratio = span === 0 ? 0 : (time - before.time) / span;
		return before.offset + (after.offset - before.offset) * ratio;
	}

	onMount(() => {
		const now = new Date();
		todayOffset = offsetForTime(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
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

{#if placed.length === 0}
	<p class="empty">No milestones recorded yet.</p>
{:else}
	<div class="controls">
		<button type="button" onclick={jumpToToday} disabled={todayOffset === null}>
			Jump to today
		</button>
	</div>

	<div class="timeline" style="height: {totalHeight}px">
		<div class="spine" aria-hidden="true"></div>

		{#if todayOffset !== null}
			<div bind:this={todayMarker} class="today" style="top: {todayOffset}px" aria-hidden="true">
				<span>Today</span>
			</div>
		{/if}

		<ol>
			{#each placed as m (m.date + m.title)}
				<li style="top: {m.offset}px" class:predicted={m.predicted}>
					<span class="dot" aria-hidden="true"></span>

					{#snippet head()}
						<span class="date">
							{dateFormat.format(m.time)}
							{#if m.predicted}<em>predicted</em>{/if}
						</span>
						<span class="title">{m.title}</span>
						<span class="tag">{categoryLabels[m.category]}</span>
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
		top: 0.5rem;
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
		margin: 0 0 2rem;
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
		position: absolute;
		left: 1.25rem;
		right: 0;
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
	}

	details p {
		margin: 0.5rem 0 0;
		color: var(--muted);
		font-size: 0.95rem;
	}

	.today {
		position: absolute;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
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
</style>
