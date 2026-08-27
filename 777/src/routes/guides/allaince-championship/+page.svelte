<svelte:head>
	<title>Alliance championship — Kingshot 777</title>
	<meta
		name="description"
		content="TL;DR guide to the Kingshot Alliance Championship for regular members: when to sign up, how the march snapshot works, and what you get."
	/>
</svelte:head>

<h1>Alliance championship</h1>

<section class="tldr">
	<h2>TL;DR</h2>
	<ul>
		<li><strong>Sign up Monday 00:00 → Wednesday 23:00 UTC.</strong> Town Center 10+. Miss the window and you sit the week out.</li>
		<li><strong>Registration is a snapshot.</strong> Your march and every buff active at that moment are frozen in — pet buffs stay even after they expire.</li>
		<li><strong>Don't touch your team after registering.</strong> Updating it re-snapshots and you lose the buffs you locked in.</li>
		<li><strong>Then you're done.</strong> Battles run automatically Thursday to Saturday — you do not need to be online.</li>
		<li><strong>Only the top 20 power in a lane fight</strong>, and a march fights at most twice per round.</li>
		<li><strong>Rewards</strong> come from marches you defeat, plus an alliance-wide tier reward at the end.</li>
	</ul>
</section>

<h2>Details</h2>

<dl class="qa">
	<dt>What is it?</dt>
	<dd>
		A weekly alliance-vs-alliance tournament. Your alliance is matched against five others and
		fights them over five automated rounds across three lanes.
	</dd>

	<dt>When does it run?</dt>
	<dd>
		Every week, Monday 00:00 UTC to the following Monday 00:00 UTC. Sign-ups close Wednesday 23:00
		UTC, the five one-hour battle rounds run through to Saturday 12:00 UTC, and rewards land after
		that.
	</dd>

	<dt>What do I actually have to do?</dt>
	<dd>
		Register one march for a lane during the sign-up window. That's it — nothing during the fights.
		Lane placement is handled by leadership.
	</dd>

	<dt>What's the score next to my name?</dt>
	<dd>
		Your combat score. It sets your fighting order inside the lane — the biggest score fights last.
	</dd>

	<dt>Why did my march not fight?</dt>
	<dd>
		Only the 20 strongest players assigned to a lane step up. And once your march has beaten two
		enemies — or been defeated — it's finished for that hour.
	</dd>
</dl>

<h2>Rewards</h2>

<ul>
	<li>
		<strong>1 enemy march defeated:</strong> 10× 5-min research speed-ups, 20× 10k bread, 20× 10k
		wood, 40× 1k stone, 10× 1k iron.
	</li>
	<li>
		<strong>2 enemy marches defeated:</strong> 15× 5-min research speed-ups, 30× 10k bread, 30× 10k
		wood, 55× 1k stone, 15× 1k iron.
	</li>
	<li>
		<strong>End of event:</strong> alliance-wide rewards based on your final bracket rank and your
		tier — Stone, Iron, Bronze, Silver, Gold or Diamond.
	</li>
</ul>

<h2>Tips</h2>

<ul>
	<li>
		<strong>Register with your buffs up.</strong> Pop your pet buff and anything else temporary
		<em>before</em> you sign up — the snapshot keeps them for the whole week.
	</li>
	<li>
		<strong>Register early.</strong> The alliance needs at least 10 participants or matchmaking
		fails and nobody gets anything.
	</li>
	<li>
		<strong>Only re-register if your setup genuinely improved.</strong> Better troops or stronger
		active buffs are worth it; otherwise you're trading away a good snapshot for a worse one.
	</li>
	<li>
		<strong>Nothing is locked away from you during the fights</strong> — your troops are busy in the
		lane, but the event needs no clicks. Play normally.
	</li>
</ul>

<p class="source">
	Source: <a href="https://kingshotwiki.com/events/alliance-championship/" rel="noreferrer">kingshotwiki.com — Alliance Championship</a>
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

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
