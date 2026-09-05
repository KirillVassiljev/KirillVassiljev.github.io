<script lang="ts">
	import { t } from '$lib/translations/i18n';
	import ReadingTime from '$lib/components/ReadingTime.svelte';
</script>

<svelte:head>
	<title>{$t('guides.vikings.meta.title')}</title>
	<meta name="description" content={$t('guides.vikings.meta.description')} />
</svelte:head>

<h1>{$t('guides.vikings.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.vikings.tldr.heading')}</h2>
	<ReadingTime guide="vikings" />
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
