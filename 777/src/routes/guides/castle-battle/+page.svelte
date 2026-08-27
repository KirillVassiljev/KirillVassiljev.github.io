<script lang="ts">
	import points from '$lib/assets/castle-battle/points.webp';
	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>Castle battle — Kingshot 777</title>
	<meta
		name="description"
		content="TL;DR guide to Kingshot Castle Battle: how the three point types score, rally leader and joiner heroes by generation, troop formations, healing prep and counter-rally tactics."
	/>
</svelte:head>

<h1>Castle battle</h1>

<section class="tldr">
	<h2>TL;DR</h2>
	<ul>
		<li>
			<strong>Three things score:</strong> enemy troops you kill, the power you have parked in the castle
			or a turret, and your own troops lost. Losses pay too — this is not an event you can play safe.
		</li>
		<li>
			<strong>Check your first-slot hero before every join.</strong> Attack rallies want Chenko, Yeonwoo,
			Amane or Amadeus; garrisons want Howard, Gordon, Saul or Hilde. The wrong hero quietly guts the
			rally.
		</li>
		<li>
			<strong>Formations:</strong> 50/20/30 attacking by default, 50/0/50 into an infantry-heavy garrison,
			60/40/0 when you're the one holding.
		</li>
		<li>
			<strong>Prep the Infirmary before the event.</strong> Upgrade it, hoard healing speed-ups, and heal
			in small batches so alliance help covers more of it.
		</li>
		<li>
			<strong>It always overlaps All-Out or KvK.</strong> Kills and losses score in both, so a solo run
			is worth it even in a fight you can't win.
		</li>
	</ul>
</section>

<h2>How scoring works</h2>

<dl class="qa">
	<dt>Carnage points (KO points)</dt>
	<dd>Earned for killing enemy troops while contesting the King's Castle and its turrets.</dd>

	<dt>Occupation points</dt>
	<dd>
		Based on the power of the troops you have stationed in the castle or a turret, accumulating for as
		long as you hold it. Holding with a strong, refilled garrison is what makes this tick up.
	</dd>

	<dt>Casualty points</dt>
	<dd>
		Earned for your own troops severely wounded or lost. Losses are unavoidable, but rotating and
		refilling in time keeps them from being pure waste.
	</dd>
</dl>

<figure>
	<img
		src={points}
		width="686"
		height="299"
		alt="In-game My Points panel showing total points split into KO points, Occupation points and Casualty points."
		loading="lazy"
		decoding="async"
	/>
	<figcaption>Your score is the sum of the three categories.</figcaption>
</figure>

<h2>Rally leader heroes</h2>

<p>
	Attack rallies exist to break the garrison, so they stack damage. Once the castle is yours the job
	flips to surviving repeated hits, so garrison rallies stack defence and sustain. Each row is three
	slots; where two portraits are joined by "or", either works — pick based on your ratios.
</p>

<h3>Attack rallies</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Gen</th>
				<th scope="col">Heroes</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">3</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="amadeus" /></div>
						<div class="slot"><Hero slug="petra" /></div>
						<div class="slot"><Hero slug="marlin" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">4</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="amadeus" /></div>
						<div class="slot"><Hero slug="petra" /></div>
						<div class="slot"><Hero slug="rosa" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">5</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="amadeus" /></div>
						<div class="slot">
							<Hero slug="petra" />
							<span class="or">or</span>
							<Hero slug="thrud" />
						</div>
						<div class="slot"><Hero slug="rosa" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">6</th>
				<td>
					<div class="lineup">
						<div class="slot">
							<Hero slug="amadeus" />
							<span class="or">or</span>
							<Hero slug="triton" />
						</div>
						<div class="slot">
							<Hero slug="petra" />
							<span class="or">or</span>
							<Hero slug="thrud" />
						</div>
						<div class="slot"><Hero slug="yang" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">7</th>
				<td>
					<div class="lineup">
						<div class="slot">
							<Hero slug="amadeus" />
							<span class="or">or</span>
							<Hero slug="triton" />
							<span class="or">or</span>
							<Hero slug="charles" />
						</div>
						<div class="slot"><Hero slug="ava" /></div>
						<div class="slot"><Hero slug="wee-woo" /></div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<h3>Garrison rallies</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Gen</th>
				<th scope="col">Heroes</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">3</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="eric" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="hilde" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">4</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="alcar" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="margot" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">5</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="long-fei" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="margot" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">6</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="triton" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="sophia" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">7</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="charles" /></div>
						<div class="slot"><Hero slug="jaeger" /></div>
						<div class="slot"><Hero slug="sophia" /></div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<ul>
	<li>
		<strong>Gen 5:</strong> Thrudd loses most of her skill value if you run 5:0:5 with no cavalry — take
		Petra instead in that case.
	</li>
	<li>
		<strong>Gen 6:</strong> Triton gives infantry a lot of attack and defence percentage and is far easier
		to get than Amadeus, so he's a fine substitute.
	</li>
</ul>

<h2>Troop formations</h2>

<ul>
	<li>
		<strong>Standard attack — 50% infantry, 20% cavalry, 30% archers.</strong> The safe default when you
		don't know what's sitting in the castle.
	</li>
	<li>
		<strong>Against an infantry-heavy castle — 50% infantry, 0% cavalry, 50% archers.</strong> Cavalry counter
		archers but fold to infantry, so drop them when the garrison has few or no archers and put that weight
		into archers instead.
	</li>
	<li>
		<strong>Garrison — 60% infantry, 40% cavalry, 0% archers.</strong> Holding is about durability, so go
		infantry-heavy.
	</li>
</ul>

<p>
	Adjust for your alliance's troop levels and what the enemy is fielding, but these hold up as general
	rules.
</p>

<h2>Rally joiners</h2>

<p>
	Joiners only contribute their first-slot hero, exactly like Bear Trap rallies. Attack joiners bring
	damage; garrison joiners bring defensive buffs.
</p>

<h3>Attack joiners</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Priority</th>
				<th scope="col">Heroes</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Best</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="chenko" /></div>
						<div class="slot"><Hero slug="yeonwoo" /></div>
						<div class="slot"><Hero slug="amane" /></div>
						<div class="slot"><Hero slug="amadeus" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">Up to gen 7</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="vivian" /></div>
						<div class="slot"><Hero slug="margot" /></div>
						<div class="slot"><Hero slug="wee-woo" /></div>
						<div class="slot"><Hero slug="hilde" /></div>
					</div>
					<p class="note">Hilde is there to fill stat gaps.</p>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<h3>Garrison joiners</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Priority</th>
				<th scope="col">Heroes</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Best</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="howard" /></div>
						<div class="slot"><Hero slug="gordon" /></div>
						<div class="slot"><Hero slug="saul" /></div>
						<div class="slot"><Hero slug="hilde" /></div>
					</div>
				</td>
			</tr>
			<tr>
				<th scope="row">Up to gen 7</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="quinn" /></div>
						<div class="slot"><Hero slug="fahd" /></div>
						<div class="slot"><Hero slug="triton" /></div>
						<div class="slot"><Hero slug="eric" /></div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<ul>
	<li>
		<strong>Rally leaders: remind people every time.</strong> A wrong first-slot hero costs a large chunk
		of the rally's damage and nobody notices until the report lands.
	</li>
	<li>
		<strong>Vary the defensive joiners.</strong> Each defensive expedition skill has different strengths,
		so rotate heroes and read the enemy rather than sending the same four every time.
	</li>
	<li>
		<strong>Consistency beats perfection.</strong> If coordinating a spread of heroes is too hard, a garrison
		correctly filled with one right hero type still beats a mixed, half-wrong one.
	</li>
</ul>

<h2>Infirmary and healing</h2>

<ul>
	<li>
		<strong>Upgrade the Infirmary in advance</strong> if your alliance intends to compete. Long fights and
		repeated refills put it under constant load.
	</li>
	<li><strong>Start saving healing speed-ups days before the event.</strong></li>
	<li>
		<strong>Heal in small batches</strong> and ask for alliance help each time — it wastes far fewer speed-ups
		than one big heal.
	</li>
	<li>
		<strong>Rally leaders watch the garrison count</strong> and nag members to refill before the numbers
		get thin.
	</li>
</ul>

<h2>Advanced tactics</h2>

<ul>
	<li>
		<strong>Open with a solo attack.</strong> The moment the castle opens, if you're strong enough, solo
		in with a march speed-up and bank some free occupation time.
	</li>
	<li>
		<strong>Synchronise double rallies.</strong> When one rally can't shift the defenders, have two or more
		leaders rally the same target, compare march times and count down on voice so every march lands on the
		same second. Staggered arrivals just let the defender refill between hits.
	</li>
	<li>
		<strong>Counter-rally to cut enemy occupation time.</strong> You can't rally your own castle, so hold
		it with alliance A and keep alliance B ready. When the enemy rallies A, B rallies the castle
		<em>after</em> them — delayed enough that B never lands first, or you'll fight your own kingdom and hand
		the enemy a free win. If the enemy fails, cancel B. If they take the castle, B takes it straight back,
		holds briefly, then dumps its troops out as A's solo marches arrive so A resumes racking up occupation
		time. It needs constant comms, and enemy players may grab the castle in the handover gap.
	</li>
</ul>

<p class="source">
	Sources: <a href="https://kingshotwiki.com/events/castle-battle/" rel="noreferrer">kingshotwiki.com — Castle Battle</a>.
	Hero portraits from <a href="https://www.kingshotguide.com/heroes" rel="noreferrer">kingshotguide.com</a>.
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

	.table-wrap {
		margin: 1.5rem 0;
		overflow-x: auto;
	}

	table {
		width: max-content;
		min-width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	th,
	td {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}

	thead th {
		background: var(--surface);
		color: var(--accent);
	}

	tbody th {
		background: var(--surface);
		white-space: nowrap;
	}

	h3 {
		margin: 2rem 0 0.5rem;
		font-size: 1.05rem;
	}

	.lineup {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
		gap: 1rem;
	}

	.slot {
		display: flex;
		align-items: flex-start;
		gap: 0.35rem;
	}

	.or {
		align-self: center;
		font-size: 0.75rem;
		color: var(--muted);
	}

	.note {
		margin: 0.6rem 0 0;
		font-size: 0.85rem;
		color: var(--muted);
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
