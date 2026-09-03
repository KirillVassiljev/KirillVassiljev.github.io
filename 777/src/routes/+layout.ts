import type { LayoutLoad } from './$types';
import { loadTranslations } from '$lib/translations/i18n';

export const prerender = true;

export const load: LayoutLoad = async ({ url }) => {
	// Locale is hardcoded to 'en' for now — no locale switcher yet.
	await loadTranslations('en', url.pathname);
	return {};
};
