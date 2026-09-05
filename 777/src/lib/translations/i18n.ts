import i18n, { type Config } from 'sveltekit-i18n';
import { locales } from '$lib/locales';

// 'preserveArrays' keeps JSON arrays (e.g. list items) as real arrays after
// loading, instead of flattening them into 'key.0', 'key.1', ... entries.
const guides = [
	'bear',
	'allaince-championship',
	'strongest-governor',
	'vikings',
	'castle-battle',
	'swordland-showdown',
	'tri-alliance-clash',
	'timeline'
];

// One `common` loader plus one route-scoped loader per guide, repeated for
// every locale. Vite needs statically analysable dynamic imports, so the glob
// map below is resolved at build time and indexed by the runtime path.
const files = import.meta.glob('./**/*.json');

function load(path: string) {
	const loader = files[path];
	if (!loader) throw new Error(`Missing translation file: ${path}`);
	return async () =>
		((await loader()) as { default: Record<string, unknown> }).default;
}

const loaders: Config['loaders'] = [];

for (const { code } of locales) {
	loaders.push({
		locale: code,
		key: 'common',
		loader: load(`./${code}/common.json`)
	});

	for (const guide of guides) {
		loaders.push({
			locale: code,
			key: `guides.${guide}`,
			routes: [`/guides/${guide}`],
			loader: load(`./${code}/guides/${guide}.json`)
		});
	}
}

const config: Config<{ kingdom: string }> = {
	preprocess: 'preserveArrays',
	loaders
};

export const { t, locale, loading, loadTranslations, translations } = new i18n(config);
