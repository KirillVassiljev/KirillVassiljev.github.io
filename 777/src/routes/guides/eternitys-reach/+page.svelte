<script lang="ts">
	import { t } from '$lib/translations/i18n';
	import ReadingTime from '$lib/components/ReadingTime.svelte';
	import skillTree640 from '$lib/assets/eternitys-reach/skill-tree-640.webp';
	import skillTree1024 from '$lib/assets/eternitys-reach/skill-tree-1024.webp';
	import mapElements640 from '$lib/assets/eternitys-reach/map-elements-640.webp';
	import mapElements1024 from '$lib/assets/eternitys-reach/map-elements-1024.webp';
	import mapElements1600 from '$lib/assets/eternitys-reach/map-elements-1600.webp';
	import peak615 from '$lib/assets/eternitys-reach/peak-615.webp';
</script>

<svelte:head>
	<title>{$t('guides.eternitys-reach.meta.title')}</title>
	<meta name="description" content={$t('guides.eternitys-reach.meta.description')} />
</svelte:head>

<h1>{$t('guides.eternitys-reach.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.eternitys-reach.tldr.heading')}</h2>
	<ReadingTime guide="eternitys-reach" />
	<ul>
		{#each $t('guides.eternitys-reach.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.eternitys-reach.sections.overview.heading')}</h2>

<ul>
	{#each $t('guides.eternitys-reach.sections.overview.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<figure>
	<img
		src={mapElements1024}
		srcset="{mapElements640} 640w, {mapElements1024} 1024w, {mapElements1600} 1600w"
		sizes="(min-width: 768px) 70ch, 100vw"
		width="1600"
		height="445"
		alt={$t('guides.eternitys-reach.images.mapElements.alt')}
		loading="lazy"
		decoding="async"
	/>
	<figcaption>{$t('guides.eternitys-reach.images.mapElements.caption')}</figcaption>
</figure>

<h2>{$t('guides.eternitys-reach.sections.skillOrder.heading')}</h2>

<p>{@html $t('guides.eternitys-reach.sections.skillOrder.intro')}</p>

<figure>
	<img
		src={skillTree1024}
		srcset="{skillTree640} 640w, {skillTree1024} 1024w"
		sizes="(min-width: 768px) 60ch, 100vw"
		width="1024"
		height="957"
		alt={$t('guides.eternitys-reach.images.skillTree.alt')}
		loading="lazy"
		decoding="async"
	/>
	<figcaption>{$t('guides.eternitys-reach.images.skillTree.caption')}</figcaption>
</figure>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.eternitys-reach.sections.skillOrder.table.headers.step')}</th>
				<th scope="col">{$t('guides.eternitys-reach.sections.skillOrder.table.headers.path')}</th>
				<th scope="col">{$t('guides.eternitys-reach.sections.skillOrder.table.headers.effect')}</th>
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.eternitys-reach.sections.skillOrder.table.rows') as row}
				<tr>
					<th scope="row">{row.step}</th>
					<td>{row.path}</td>
					<td>{@html row.effect}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<p>{@html $t('guides.eternitys-reach.sections.skillOrder.note')}</p>

<h2>{$t('guides.eternitys-reach.sections.phases.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">{$t('guides.eternitys-reach.sections.phases.table.headers.phase')}</th>
				<th scope="col">{$t('guides.eternitys-reach.sections.phases.table.headers.marches')}</th>
				<th scope="col">{$t('guides.eternitys-reach.sections.phases.table.headers.whatToDo')}</th>
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.eternitys-reach.sections.phases.table.rows') as row}
				<tr>
					<th scope="row">{@html row.phase}</th>
					<td>{@html row.marches}</td>
					<td>{@html row.whatToDo}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>{$t('guides.eternitys-reach.sections.skill3Loop.heading')}</h2>

<p>{@html $t('guides.eternitys-reach.sections.skill3Loop.intro')}</p>

<ol class="stages">
	{#each $t('guides.eternitys-reach.sections.skill3Loop.items') as item}
		<li>{@html item}</li>
	{/each}
</ol>

<h2>{$t('guides.eternitys-reach.sections.skill5.heading')}</h2>

<ul>
	{#each $t('guides.eternitys-reach.sections.skill5.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.eternitys-reach.sections.positioning.heading')}</h2>

<ul>
	{#each $t('guides.eternitys-reach.sections.positioning.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.eternitys-reach.sections.charms.heading')}</h2>

<ul>
	{#each $t('guides.eternitys-reach.sections.charms.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.eternitys-reach.sections.commonMistakes.heading')}</h2>

<figure class="narrow">
	<img
		src={peak615}
		width="615"
		height="690"
		alt={$t('guides.eternitys-reach.images.peak.alt')}
		loading="lazy"
		decoding="async"
	/>
	<figcaption>{$t('guides.eternitys-reach.images.peak.caption')}</figcaption>
</figure>

<ul>
	{#each $t('guides.eternitys-reach.sections.commonMistakes.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<p class="source">{@html $t('guides.eternitys-reach.source')}</p>

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
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
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

	figure.narrow {
		max-width: 420px;
	}

	figcaption {
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
