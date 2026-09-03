<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { locale, loadTranslations, t } from '$lib/translations/i18n';
	import { locales, STORAGE_KEY } from '$lib/locales';

	async function change(event: Event) {
		const next = (event.currentTarget as HTMLSelectElement).value;
		if (next === $locale) return;

		localStorage.setItem(STORAGE_KEY, next);

		// Load the target locale for the route we're on before switching, so the
		// visible page has its strings ready the moment `locale` flips.
		const route = page.url.pathname.slice(base.length) || '/';
		await loadTranslations(next, route);
		locale.set(next);
	}
</script>

<div class="switcher">
	<label class="visually-hidden" for="language-select">{$t('common.layout.language')}</label>
	<select
		id="language-select"
		aria-label={$t('common.layout.language')}
		value={$locale}
		onchange={change}
	>
		{#each locales as { code, label } (code)}
			<option value={code}>{label}</option>
		{/each}
	</select>
</div>

<style>
	.switcher {
		padding: 0 1.25rem 0.75rem;
	}

	select {
		width: 100%;
		box-sizing: border-box;
		padding: 0.4rem 0.6rem;
		background: var(--bg);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 6px;
		font-size: 0.9rem;
		cursor: pointer;
	}

	select:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}
</style>
