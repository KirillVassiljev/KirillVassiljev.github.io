<script lang="ts">
	import { t } from '$lib/translations/i18n';

	const ids = [
		'310641156',
		'314557524',
		'310674611',
		'310936924',
		'322905143',
		'310788821',
		'313803270'
	];
</script>

<svelte:head>
	<title>{$t('guides.ids.meta.title')}</title>
	<meta name="description" content={$t('guides.ids.meta.description')} />
</svelte:head>

<h1>{$t('guides.ids.h1')}</h1>

<p>
	{$t('guides.ids.intro')}
</p>

<ul class="ids">
	{#each ids as id (id)}
		<li>{id}</li>
	{/each}
</ul>

<style>
	.ids {
		list-style: none;
		margin: 1.5rem 0 2rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.ids li {
		padding: 0.6rem 0.9rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 8px;
		font-variant-numeric: tabular-nums;
	}
</style>
