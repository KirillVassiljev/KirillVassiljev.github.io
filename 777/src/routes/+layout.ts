import type { LayoutLoad } from './$types';
import { base } from '$app/paths';
import { loadTranslations } from '$lib/translations/i18n';

export const prerender = true;

export const load: LayoutLoad = async ({ url }) => {
	// Locale is hardcoded to 'en' for now — no locale switcher yet.
	// Strip SvelteKit's configured base path (set via BASE_PATH env var,
	// see vite.config.ts) so route matching in sveltekit-i18n's loaders
	// always sees un-prefixed paths like '/guides/bear', not
	// '/sub/guides/bear' — its route matching is strict string equality.
	const route = url.pathname.slice(base.length) || '/';
	await loadTranslations('en', route);
	return {};
};
