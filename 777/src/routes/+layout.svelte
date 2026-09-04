<script lang="ts">
	import type { Snippet } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { t, locale, loadTranslations } from '$lib/translations/i18n';
	import { dirFor, readSavedLocale } from '$lib/locales';

	let { children }: { children: Snippet } = $props();

	let open = $state(false);

	// Keep the document's language and text direction in sync with the active
	// locale so Arabic renders right-to-left and screen readers announce the
	// correct language.
	$effect(() => {
		const code = $locale;
		if (!code) return;
		document.documentElement.lang = code;
		document.documentElement.dir = dirFor(code);
	});

	// Runs after every navigation, including the initial one right after
	// hydration. Applying the saved locale here (rather than in +layout.ts's
	// load) guarantees a real post-mount locale transition, which is what makes
	// server-rendered {@html} content re-render in the chosen language.
	afterNavigate(async () => {
		open = false;
		if (!browser) return;
		const target = readSavedLocale();
		if (target === $locale) return;
		const route = page.url.pathname.slice(base.length) || '/';
		await loadTranslations(target, route);
		locale.set(target);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
/>

<div class="shell" class:open>
	<header class="topbar">
		<button
			class="hamburger"
			aria-label={$t('common.layout.toggleNav')}
			aria-expanded={open}
			aria-controls="sidebar"
			onclick={() => (open = !open)}
		>
			<span aria-hidden="true">&#9776;</span>
		</button>
		<span class="topbar-title">{$t('common.layout.brandTitle')}</span>
		<div class="topbar-switcher">
			<LanguageSwitcher />
		</div>
	</header>

	<aside id="sidebar" class="sidebar">
		<div class="brand-row">
			<a class="brand" href="{base}/">{$t('common.layout.brandTitle')}</a>
			<LanguageSwitcher />
		</div>
		<Sidebar />
	</aside>

	<button
		class="backdrop"
		aria-label={$t('common.layout.closeNav')}
		tabindex={open ? 0 : -1}
		onclick={() => (open = false)}
	></button>

	<main>
		<article>
			{@render children()}
		</article>
	</main>
</div>

<style>
	:global(:root) {
		--bg: #0f1115;
		--surface: #171a21;
		--border: #262b36;
		--text: #e6e8ec;
		--muted: #9aa3b2;
		--accent: #d9a441;
		/* Height of the mobile topbar, so sticky page content can clear it. */
		--topbar-height: 3.25rem;
	}

	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--text);
		font-family:
			ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		line-height: 1.6;
	}

	:global(a) {
		color: var(--accent);
	}

	.topbar {
		position: sticky;
		top: 0;
		z-index: 3;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		box-sizing: border-box;
		height: var(--topbar-height);
		padding: 0 max(0.75rem, env(safe-area-inset-right)) 0 max(0.75rem, env(safe-area-inset-left));
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}

	.hamburger {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 6px;
		color: var(--text);
		font-size: 1.1rem;
		cursor: pointer;
	}

	.topbar-title {
		font-weight: 700;
	}

	.topbar-switcher {
		margin-inline-start: auto;
		display: inline-flex;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
		width: min(280px, 85vw);
		height: 100dvh;
		overflow-y: auto;
		overscroll-behavior: contain;
		background: var(--surface);
		border-right: 1px solid var(--border);
		transform: translateX(-100%);
		transition: transform 200ms ease;
	}

	:global([dir='rtl']) .sidebar {
		left: auto;
		right: 0;
		border-right: 0;
		border-left: 1px solid var(--border);
		transform: translateX(100%);
	}

	.shell.open .sidebar {
		transform: none;
	}

	.brand-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 1.25rem 1.25rem 1rem;
	}

	.brand {
		color: var(--text);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-decoration: none;
	}

	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 4;
		display: none;
		padding: 0;
		background: rgb(0 0 0 / 0.55);
		border: 0;
		cursor: pointer;
	}

	.shell.open .backdrop {
		display: block;
	}

	main {
		padding: 1.5rem max(1.25rem, env(safe-area-inset-right)) 4rem
			max(1.25rem, env(safe-area-inset-left));
	}

	article {
		max-width: 70ch;
	}

	@media (min-width: 768px) {
		.shell {
			display: grid;
			grid-template-columns: 280px 1fr;
		}

		.topbar,
		.backdrop,
		.shell.open .backdrop {
			display: none;
		}

		.sidebar,
		:global([dir='rtl']) .sidebar {
			position: sticky;
			z-index: auto;
			width: auto;
			transform: none;
		}

		main {
			padding: 3rem 3rem 6rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sidebar {
			transition: none;
		}
	}
</style>
