import type { LayoutLoad } from './$types';
import { base } from '$app/paths';
import { browser } from '$app/environment';
import { loadTranslations } from '$lib/translations/i18n';
import { defaultLocale, readSavedLocale } from '$lib/locales';

export const prerender = true;

// Pages are prerendered in the default locale. On the very first client render
// we must hydrate with that same locale so server and client markup match —
// otherwise Svelte keeps the server-rendered {@html} blocks and they never
// refresh. The saved locale is applied right after mount (see +layout.svelte).
// Subsequent client navigations load the active locale directly so there's no
// flash of the default language.
let firstClientLoad = true;

export const load: LayoutLoad = async ({ url }) => {
	// Strip SvelteKit's configured base path (set via BASE_PATH env var,
	// see vite.config.ts) so route matching in sveltekit-i18n's loaders
	// always sees un-prefixed paths like '/guides/bear', not
	// '/sub/guides/bear' — its route matching is strict string equality.
	const route = url.pathname.slice(base.length) || '/';

	const target = browser ? readSavedLocale() : defaultLocale;
	const loadLocale = browser && firstClientLoad ? defaultLocale : target;
	firstClientLoad = false;

	await loadTranslations(loadLocale, route);
	return { route };
};
