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

<h2>Details</h2>

<dl class="qa">
	<dt>What is it?</dt>
	<dd>
		An alliance-wide PvE rally event against the Bear. Everyone piles marches into rallies aimed at
		the trap, and the damage you deal is what earns you points.
	</dd>

	<dt>When does it run?</dt>
	<dd>
		Every two days — a cooldown of two daily in-game resets. Take part today and you're eligible
		again two days later.
	</dd>

	<dt>Why are there two traps?</dt>
	<dd>
		So members in different time zones can each find a slot that suits them. <strong>You only get
		one:</strong> if you joined Bear Trap 1 you cannot also join Bear Trap 2 — you wait two days
		for the next Trap 1.
	</dd>

	<dt>Where is it?</dt>
	<dd>
		At the Bear Hunt trap on the alliance's territory. Marches travel there, so the closer your city
		sits the more hits you land.
	</dd>

	<dt>Who does what?</dt>
	<dd>
		Whales and big accounts lead rallies; everyone else fills them. Alliance leadership assigns wave
		slots before the event so launches stay staggered.
	</dd>

	<dt>Why bother?</dt>
	<dd>
		It's one of the highest-value events in the game, it's pure PvE so your troops don't die, and
		points scale directly with damage — which is why hero choice and troop ratio matter so much.
	</dd>
</dl>

<h2>Tips</h2>

<h3>Before the event</h3>

<ul>
	<li>
		<strong>Upgrade the Pitfall to Level 5</strong> with Explosive Arrowheads. That's a
		<strong>+25% attack boost for the entire alliance</strong> — the single biggest lever available,
		and it needs doing during the preparation stage.
	</li>
	<li>
		<strong>Move your city next to the trap.</strong> Alliance members should interlock borders
		tightly with no gaps so troops deploy faster and get more hits in. Mostly a late-game concern —
		early on, members hopping between alliances makes this messy.
	</li>
	<li>
		<strong>Save preset formations.</strong> Rallies fill and launch in seconds; if you're building a
		march from scratch you've already missed it.
	</li>
	<li>
		<strong>Line up your buffs:</strong> pet buff active, Field Commander minister slot registered.
		Gems can also buy city ATK / Lethality / Deployment Capacity bonuses, though that's really a
		whale expense.
	</li>
</ul>

<h3>During the event</h3>

<ul>
	<li>
		<strong>Archers are the damage.</strong> Ratios shift from balanced early to 10/10/80 by Gen 4;
		late game aim for ~98% archer capacity in every combat march. When joining rather than leading,
		20/30/50 is fine.
	</li>
	<li>
		<strong>Star the whale rallies.</strong> The star feature pins a player's rally to the top of the
		list instead of newest-at-the-bottom — a big help if you're slow to react.
	</li>
	<li>
		<strong>Leading:</strong> all three of your heroes' skills fire, no matter which one is captain,
		so position doesn't matter. Pick the best offensive trio for your generation.
	</li>
	<li>
		<strong>Joining:</strong> only the top expedition skill counts, and only from the four joiners
		with the highest skill levels. A wrong hero can displace a good one and drag the whole rally
		down — <strong>send troops with no hero rather than the wrong hero.</strong>
	</li>
	<li>
		<strong>Troop levels matter too.</strong> Hero skills aren't the whole picture; higher-tier troops
		and the right ratio move the number just as much.
	</li>
</ul>

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

	.qa {
		margin: 1.5rem 0;
	}

	.qa dt {
		margin-top: 1.1rem;
		color: var(--accent);
		font-weight: 700;
	}

	.qa dd {
		margin: 0.3rem 0 0;
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

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
