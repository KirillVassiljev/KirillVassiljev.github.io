<script lang="ts">
	import points from '$lib/assets/castle-battle/points.webp';
	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>Castle battle — Kingshot 777</title>
	<meta
		name="description"
		content="TL;DR guide to Kingshot Castle Battle: how the three point types score, preparation and buffs, rally leader and joiner heroes by generation, troop formations, turret control and double-rally tactics."
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
			<strong>Formations:</strong> 50/20/30 attacking by default, 50/0/50 into an infantry-heavy garrison,
			60/20/20 for the rally that captures, 60/40/0 once you're holding.
		</li>
		<li>
			<strong>Rally leaders run the buffs; everyone else shields up.</strong> City buffs, pet and executive
			skills are the leader's job. Anyone sitting the fight out wants an 8-hour peace shield.
		</li>
		<li>
			<strong>Take the turrets.</strong> Enemy-held turrets shoot your garrison the entire time you hold
			the castle, and it gets worse the longer you leave them.
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

<h2>Preparation</h2>

<ul>
	<li>
		<strong>Buffs are a rally leader job.</strong> Before you launch or defend, run your 20% attack and
		20% defence city buffs, pet skills such as Moose or Grizzly Bear, and your executive skills. Joiners
		should not burn theirs — only the leader's buffs apply to the rally.
	</li>
	<li>
		<strong>Teleport next to the castle.</strong> Rally captains want the shortest possible march time,
		which matters enormously when rallies have to be timed against each other.
	</li>
	<li>
		<strong>Shield anyone who isn't fighting.</strong> Members who will be offline, or who are too
		under-levelled to hold a march, should sit behind an 8-hour peace shield. An unshielded Town Center
		is free kills for the enemy.
	</li>
	<li>
		<strong>Sort the Infirmary out first.</strong> See <a href="#infirmary">Infirmary and healing</a> —
		this is the thing most alliances under-prepare.
	</li>
</ul>

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
		<strong>Capturing rally — 60% infantry, 20% cavalry, 20% archers.</strong> For the rally that takes an
		already-weakened castle and has to survive the counter-attack. Tankier than a pure attack march but
		still carries enough damage to finish the job.
	</li>
	<li>
		<strong>Settled garrison — 60% infantry, 40% cavalry, 0% archers.</strong> What you refill into once the
		castle is yours and holding is all that matters. Archers die too fast to be worth the slots.
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
			<tr>
				<th scope="row">Balanced spread</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="chenko" /></div>
						<div class="slot"><Hero slug="amane" /></div>
						<div class="slot"><Hero slug="saul" /></div>
						<div class="slot"><Hero slug="fahd" /></div>
					</div>
					<p class="note">
						One of each across four joiners spreads the skill buffs over all three troop types instead
						of piling everything onto one.
					</p>
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
			<tr>
				<th scope="row">Simplest</th>
				<td>
					<div class="lineup">
						<div class="slot"><Hero slug="saul" /></div>
						<div class="slot"><Hero slug="fahd" /></div>
					</div>
					<p class="note">
						Four Sauls, or three Sauls and a Fahd, for flat damage reduction. Nothing to coordinate and
						hard to get wrong — the right call when your alliance can't reliably organise a spread.
					</p>
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

<h2>Holding the castle</h2>

<ul>
	<li>
		<strong>Refill infantry constantly.</strong> Infantry soaks the bulk of incoming damage, so it is
		always the first thing to run out. Keep voice chat live and call out the moment infantry numbers
		drop so members can send fresh infantry-heavy marches straight away.
	</li>
	<li>
		<strong>Don't ignore the turrets.</strong> Turrets the enemy holds fire on the castle continuously,
		and the damage escalates the longer they keep them. You can win the castle fight and still bleed
		your garrison out through turrets you never contested.
	</li>
	<li>
		<strong>Split the alliance into two jobs.</strong> Put your whales and top rally leaders on taking
		and holding the castle, and send mid-tier rallies at the surrounding turrets to shut off the
		incoming damage.
	</li>
</ul>

<h2 id="infirmary">Infirmary and healing</h2>

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
		<strong>Variant: softener then capturer.</strong> Against a castle stacked high enough that a combined
		hit would still cost you the field, split the two rallies by roles instead of landing them together.
		Rally 1 goes in with attack heroes at 50/20/30 purely to break the front-line infantry and push their
		troops into the Infirmary. Rally 2 lands 2 to 5 seconds later with garrison heroes at 60/20/20, takes
		the weakened castle and simply stays as the garrison. The gap has to be small — leave it too long and
		the defender refills, which is the exact failure the synchronised approach avoids.
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
	Event mechanics from <a href="https://kingshotwiki.com/events/castle-battle/" rel="noreferrer">kingshotwiki.com — Castle Battle</a>,
	with additions from alliance experience.
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
		max-width: 24rem;
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
