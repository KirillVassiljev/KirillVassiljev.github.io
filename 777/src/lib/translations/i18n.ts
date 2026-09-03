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
		},
		{
			locale: 'en',
			key: 'guides.bear',
			routes: ['/guides/bear'],
			loader: async () => (await import('./en/guides/bear.json')).default
		},
		{
			locale: 'en',
			key: 'guides.allaince-championship',
			routes: ['/guides/allaince-championship'],
			loader: async () => (await import('./en/guides/allaince-championship.json')).default
		},
		{
			locale: 'en',
			key: 'guides.strongest-governor',
			routes: ['/guides/strongest-governor'],
			loader: async () => (await import('./en/guides/strongest-governor.json')).default
		},
		{
			locale: 'en',
			key: 'guides.vikings',
			routes: ['/guides/vikings'],
			loader: async () => (await import('./en/guides/vikings.json')).default
		},
		{
			locale: 'en',
			key: 'guides.castle-battle',
			routes: ['/guides/castle-battle'],
			loader: async () => (await import('./en/guides/castle-battle.json')).default
		},
		{
			locale: 'en',
			key: 'guides.swordland-showdown',
			routes: ['/guides/swordland-showdown'],
			loader: async () => (await import('./en/guides/swordland-showdown.json')).default
		}
	]
};

export const { t, locale, loading, loadTranslations } = new i18n(config);
