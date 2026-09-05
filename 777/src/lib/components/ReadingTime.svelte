<script lang="ts">
	import { t, locale, translations } from '$lib/translations/i18n';

	// Silent reading speed used for the estimate. See the design spec.
	const WORDS_PER_MINUTE = 200;

	let { guide }: { guide: string } = $props();

	// Flatten every string leaf reachable from a translation value (strings,
	// arrays, and nested objects such as the qa entries).
	function collectStrings(value: unknown, out: string[]): void {
		if (typeof value === 'string') out.push(value);
		else if (Array.isArray(value)) for (const item of value) collectStrings(item, out);
		else if (value && typeof value === 'object')
			for (const item of Object.values(value)) collectStrings(item, out);
	}

	function countWords(text: string): number {
		// Drop inline HTML tags (translations contain <strong>, <a>, ...).
		const plain = text.replace(/<[^>]*>/g, ' ');
		const cjkPattern = /[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff]/;
		const tokens = plain.match(/\S+/g) ?? [];
		// CJK characters are not space-delimited, so count them individually to
		// avoid drastically undercounting locales like Chinese. Space-delimited
		// scripts (Latin, Arabic, ...) count via whitespace tokens.
		const cjkChars = plain.match(new RegExp(cjkPattern.source, 'g')) ?? [];
		const nonCjkTokens = tokens.filter((token) => !cjkPattern.test(token));
		return nonCjkTokens.length + cjkChars.length;
	}

	// The `translations` store is a flattened dictionary keyed by dotted paths
	// (e.g. 'guides.bear.tldr.items'). Collect every string under the active
	// guide, excluding the SEO-only `meta` block, then estimate reading time.
	let minutes = $derived.by(() => {
		const dict = $translations[$locale] as Record<string, unknown> | undefined;
		if (!dict) return 1;
		const prefix = `guides.${guide}`;
		const strings: string[] = [];
		for (const [key, value] of Object.entries(dict)) {
			if (!key.startsWith(`${prefix}.`) || key.startsWith(`${prefix}.meta.`)) continue;
			collectStrings(value, strings);
		}
		const words = countWords(strings.join(' '));
		return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	});
</script>

<p class="reading-time">🕓 ~{minutes} {$t('common.readingTime')}</p>

<style>
	.reading-time {
		margin: 0.25rem 0 0.75rem;
		color: var(--muted);
		font-size: 0.85rem;
	}
</style>
