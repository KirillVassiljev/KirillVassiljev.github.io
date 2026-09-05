<script lang="ts">
	import formations640 from '$lib/assets/bear/formations-640.webp';
	import formations1024 from '$lib/assets/bear/formations-1024.webp';
	import formations1600 from '$lib/assets/bear/formations-1600.webp';
	import joiners640 from '$lib/assets/bear/joiners-640.webp';
	import joiners1024 from '$lib/assets/bear/joiners-1024.webp';
	import { t } from '$lib/translations/i18n';
	import ReadingTime from '$lib/components/ReadingTime.svelte';
</script>

<svelte:head>
	<title>{$t('guides.bear.meta.title')}</title>
	<meta name="description" content={$t('guides.bear.meta.description')} />
</svelte:head>

<h1>{$t('guides.bear.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.bear.tldr.heading')}</h2>
	<ReadingTime guide="bear" />
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

