<script lang="ts">
	import { t } from '$lib/translations/i18n';
	import ReadingTime from '$lib/components/ReadingTime.svelte';

	const SYMBOL: Record<string, string> = { spend: '✅', alt: '🔸', none: '—' };
</script>

<svelte:head>
	<title>{$t('guides.kingdom-of-power.meta.title')}</title>
	<meta name="description" content={$t('guides.kingdom-of-power.meta.description')} />
</svelte:head>

<h1>{$t('guides.kingdom-of-power.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.kingdom-of-power.tldr.heading')}</h2>
	<ReadingTime guide="kingdom-of-power" />
	<ul>
		{#each $t('guides.kingdom-of-power.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.kingdom-of-power.sections.phases.heading')}</h2>

<ol class="stages">
	{#each $t('guides.kingdom-of-power.sections.phases.items') as item}
		<li>{@html item}</li>
	{/each}
</ol>

<h2>{$t('guides.kingdom-of-power.sections.spend.heading')}</h2>

<p>{@html $t('guides.kingdom-of-power.sections.spend.intro')}</p>

<div class="table-wrap">
	<table class="matrix">
		<thead>
			<tr>
				{#each $t('guides.kingdom-of-power.sections.spend.cols') as col, i}
					<th scope="col" class={i === 0 ? 'rowhead' : ''}>{@html col}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.kingdom-of-power.sections.spend.rows') as row}
				{@const legend = $t('guides.kingdom-of-power.sections.spend.legend')}
				<tr>
					<th scope="row">{@html row.label}</th>
					{#each row.cells as cell}
						<td class={'cell ' + cell} title={legend[cell]}>
							<span aria-hidden="true">{SYMBOL[cell]}</span>
							<span class="sr-only">{legend[cell]}</span>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<ul class="legend">
	<li><span aria-hidden="true">✅</span> {$t('guides.kingdom-of-power.sections.spend.legend.spend')}</li>
	<li><span aria-hidden="true">🔸</span> {$t('guides.kingdom-of-power.sections.spend.legend.alt')}</li>
	<li><span aria-hidden="true">—</span> {$t('guides.kingdom-of-power.sections.spend.legend.none')}</li>
</ul>

<h2>{$t('guides.kingdom-of-power.sections.rewards.heading')}</h2>

<ul>
	{#each $t('guides.kingdom-of-power.sections.rewards.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.kingdom-of-power.sections.tips.heading')}</h2>

<ul>
	{#each $t('guides.kingdom-of-power.sections.tips.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p class="source">{@html $t('guides.kingdom-of-power.source')}</p>

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

	.table-wrap {
		margin: 1.25rem 0 1.75rem;
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
		text-align: start;
		vertical-align: top;
	}

	thead th {
		background: var(--surface);
		color: var(--accent);
	}

	tbody th {
		background: var(--surface);
		white-space: nowrap;
		font-weight: 600;
	}

	.matrix thead th:not(.rowhead) {
		text-align: center;
		white-space: nowrap;
	}

	.matrix .cell {
		text-align: center;
		font-weight: 700;
	}

	.matrix .cell.spend {
		color: #3fb950;
	}

	.matrix .cell.alt {
		color: #d29922;
	}

	.matrix .cell.none {
		color: var(--muted);
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.25rem;
		margin: -0.75rem 0 1.75rem;
		padding: 0;
		list-style: none;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
