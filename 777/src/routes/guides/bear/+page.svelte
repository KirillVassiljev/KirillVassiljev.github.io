<script lang="ts">
	import formations640 from '$lib/assets/bear/formations-640.webp';
	import formations1024 from '$lib/assets/bear/formations-1024.webp';
	import formations1600 from '$lib/assets/bear/formations-1600.webp';
	import joiners640 from '$lib/assets/bear/joiners-640.webp';
	import joiners1024 from '$lib/assets/bear/joiners-1024.webp';
</script>

<svelte:head>
	<title>Bear hunt — Kingshot 777</title>
	<meta
		name="description"
		content="TL;DR guide to the Kingshot Bear Hunt event: rally formations, troop ratios, buffs, and wave timing."
	/>
</svelte:head>

<h1>Bear trap</h1>

<section class="tldr">
	<h2>TL;DR</h2>
	<ul>
		<li><strong>Archers win.</strong> Bear damage scales with archers — ratios shift from balanced in Gen 1 to 10/10/80 by Gen 4, and up to ~98% archers late game.</li>
		<li><strong>Rally leader:</strong> all three heroes' skills are active, so pick the best offensive trio for your generation.</li>
		<li><strong>Joining a rally:</strong> only the top expedition skill of the top 4 joiners with max skill counts. Wrong hero hurts the rally — send troops with no hero instead.</li>
		<li><strong>Always on:</strong> pet buff + Field Commander minister buff. Gems for city ATK / Lethality / Deployment if you can afford it.</li>
		<li><strong>Be fast:</strong> pre-save preset formations and star the whale rallies so they show at the top of the list.</li>
		<li><strong>Endgame:</strong> stagger waves 1 min apart and relaunch the moment marches return — never let troops sit idle.</li>
	</ul>
</section>

<h2>Rally leader formations</h2>

<figure>
	<a href={formations1600} target="_blank" rel="noreferrer">
		<img
			src={formations1024}
			srcset="{formations640} 640w, {formations1024} 1024w, {formations1600} 1600w"
			sizes="(min-width: 768px) 70ch, 100vw"
			width="1024"
			height="983"
			alt="Best bear formations chart: recommended hero trio and troop ratio for generations 1 to 6, split into best heroes and F2P columns."
			loading="lazy"
			decoding="async"
		/>
	</a>
	<figcaption>Best bear formations by generation. Tap to open full size.</figcaption>
</figure>

<h2>Joining a rally (Gen 1–6)</h2>

<figure>
	<img
		src={joiners1024}
		srcset="{joiners640} 640w, {joiners1024} 1024w"
		sizes="(min-width: 768px) 70ch, 100vw"
		width="1024"
		height="423"
		alt="Bear hunt joiner hero tier list with S, A, Avoid, and Never Use These tiers."
		loading="lazy"
		decoding="async"
	/>
	<figcaption>Joiner tier list — only the top expedition skill matters here.</figcaption>
</figure>

<p class="source">
	Source: <a href="https://kingshotwiki.com/events/bear-hunt/" rel="noreferrer">kingshotwiki.com — Bear Hunt</a>
</p>

<style>
	.tldr {
		margin: 1.5rem 0 2rem;
		padding: 1rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.tldr h2 {
		margin-top: 0;
	}

	.table-wrap {
		overflow-x: auto;
	}

	table {
		width: 100%;
		min-width: 34rem;
		border-collapse: collapse;
	}

	figure {
		margin: 1.5rem 0;
	}

	figure img {
		display: block;
		width: 100%;
		height: auto;
		background: #fff;
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	figcaption {
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.note {
		color: var(--muted);
		font-size: 0.95rem;
	}

	th,
	td {
		padding: 0.4rem 0.6rem;
		border-bottom: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>