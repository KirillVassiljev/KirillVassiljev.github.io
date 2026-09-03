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
