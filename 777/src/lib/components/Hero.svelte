<script lang="ts">
	import { heroes, type HeroSlug } from '$lib/heroes';

	let { slug }: { slug: HeroSlug } = $props();

	const hero = $derived(heroes[slug]);
</script>

<figure class="hero">
	<img src={hero.image} width="256" height="256" alt="" loading="lazy" decoding="async" />
	<figcaption>{hero.name}</figcaption>
</figure>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		margin: 0;
		width: 4.25rem;
	}

	img {
		display: block;
		width: 2.75rem;
		height: 2.75rem;
		object-fit: contain;
		border-radius: 10px;
	}

	figcaption {
		font-size: 0.75rem;
		line-height: 1.2;
		text-align: center;
		color: var(--text);
	}
</style>
