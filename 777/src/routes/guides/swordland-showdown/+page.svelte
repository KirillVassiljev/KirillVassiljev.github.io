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
