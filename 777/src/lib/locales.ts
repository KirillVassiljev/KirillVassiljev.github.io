// Single source of truth for the locales the site ships with. Adding a new
// language means adding an entry here, a matching folder under
// `src/lib/translations/<code>/`, and loader entries in `translations/i18n.ts`.

export type TextDirection = 'ltr' | 'rtl';

export type LocaleMeta = {
	/** BCP-47 code used as the sveltekit-i18n locale and the <html lang>. */
	code: string;
	/** Language name shown in the switcher, written in that language. */
	label: string;
	/** Text direction applied to <html dir> when this locale is active. */
	dir: TextDirection;
};

export const locales: LocaleMeta[] = [
	{ code: 'en', label: 'English', dir: 'ltr' },
	{ code: 'zh', label: '简体中文', dir: 'ltr' },
	{ code: 'id', label: 'Bahasa Indonesia', dir: 'ltr' },
	{ code: 'tr', label: 'Türkçe', dir: 'ltr' },
	{ code: 'ar', label: 'العربية', dir: 'rtl' }
];

export const defaultLocale = 'en';

/** localStorage key used to remember the visitor's language choice. */
export const STORAGE_KEY = 'locale';

const byCode = new Map(locales.map((l) => [l.code, l]));

export function isSupportedLocale(code: string | null | undefined): boolean {
	return code != null && byCode.has(code);
}

export function dirFor(code: string | null | undefined): TextDirection {
	return (code && byCode.get(code)?.dir) || 'ltr';
}

/**
 * Reads the persisted locale, falling back to the default. Safe to call during
 * SSR/prerender (returns the default when there's no browser storage).
 */
export function readSavedLocale(): string {
	if (typeof localStorage === 'undefined') return defaultLocale;
	const saved = localStorage.getItem(STORAGE_KEY);
	return isSupportedLocale(saved) ? (saved as string) : defaultLocale;
}
