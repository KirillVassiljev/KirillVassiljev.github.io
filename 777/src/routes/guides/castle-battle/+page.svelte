<script lang="ts">
	import points from '$lib/assets/castle-battle/points.webp';
	import Hero from '$lib/components/Hero.svelte';
	import { t } from '$lib/translations/i18n';
	import ReadingTime from '$lib/components/ReadingTime.svelte';
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
	<ReadingTime guide="castle-battle" />
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
