import i18n, { type Config } from 'sveltekit-i18n';

// 'preserveArrays' keeps JSON arrays (e.g. list items) as real arrays after
// loading, instead of flattening them into 'key.0', 'key.1', ... entries.
// Every task that adds a `loaders` entry below relies on this setting.
const config: Config = {
	preprocess: 'preserveArrays',
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		}
	]
};

export const { t, locale, loading, loadTranslations } = new i18n(config);
