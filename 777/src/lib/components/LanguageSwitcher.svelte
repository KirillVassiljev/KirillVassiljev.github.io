<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { locale, loadTranslations, t } from '$lib/translations/i18n';
	import { locales, STORAGE_KEY } from '$lib/locales';
	import Flag from './Flag.svelte';

	let open = $state(false);
	let root = $state<HTMLDivElement>();

	const current = $derived(locales.find((l) => l.code === $locale) ?? locales[0]);

	async function select(next: string) {
		open = false;
		if (next === $locale) return;

		localStorage.setItem(STORAGE_KEY, next);

		// Load the target locale for the route we're on before switching, so the
		// visible page has its strings ready the moment `locale` flips.
		const route = page.url.pathname.slice(base.length) || '/';
		await loadTranslations(next, route);
		locale.set(next);
	}

	function onWindowClick(event: MouseEvent) {
		if (open && root && !root.contains(event.target as Node)) open = false;
	}
</script>

<svelte:window
	onclick={onWindowClick}
	onkeydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
/>

<div class="switcher" bind:this={root}>
	<button
		class="flag-button"
		aria-haspopup="menu"
		aria-expanded={open}
		aria-label="{$t('common.layout.language')}: {current.label}"
		onclick={() => (open = !open)}
	>
		<Flag code={current.code} size={26} />
	</button>

	{#if open}
		<ul class="menu" role="menu">
			{#each locales as { code, label } (code)}
				<li role="none">
					<button
						role="menuitemradio"
						aria-checked={code === $locale}
						class="option"
						class:active={code === $locale}
						onclick={() => select(code)}
					>
						<Flag {code} size={20} />
						<span>{label}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.switcher {
		position: relative;
		display: inline-flex;
	}

	.flag-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		background: transparent;
		border: 0;
		border-radius: 50%;
		line-height: 0;
		cursor: pointer;
	}

	.flag-button:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.menu {
		position: absolute;
		top: calc(100% + 8px);
		inset-inline-end: 0;
		z-index: 20;
		min-width: 190px;
		margin: 0;
		padding: 6px;
		list-style: none;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 10px;
		box-shadow: 0 8px 24px rgb(0 0 0 / 0.4);
	}

	.option {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		box-sizing: border-box;
		padding: 7px 9px;
		background: transparent;
		border: 0;
		border-radius: 7px;
		color: var(--text);
		font-size: 0.9rem;
		text-align: start;
		cursor: pointer;
	}

	.option:hover {
		background: rgb(255 255 255 / 0.06);
	}

	.option.active {
		background: rgb(217 164 65 / 0.16);
		color: var(--accent);
		font-weight: 600;
	}

	.option:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
	}
</style>
