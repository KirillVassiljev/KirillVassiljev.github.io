<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>Swordland showdown — Kingshot 777</title>
	<meta
		name="description"
		content="Member guide to Kingshot Swordland Showdown: what actually scores, the map, the 15-minute unlock, your role on the field, squad setup, healing and how to stay alive."
	/>
</svelte:head>

<h1>Swordland showdown</h1>

<section class="tldr">
	<h2>TL;DR</h2>
	<ul>
		<li>
			<strong>Bi-weekly, the battle is always Sunday and lasts exactly one hour.</strong> Two alliances
			field a Legion of up to 30 combatants plus 10 substitutes.
		</li>
		<li>
			<strong>Troops are only injured, never lost.</strong> Everything heals for free when you leave the
			battlefield. Play aggressively.
		</li>
		<li>
			<strong>Two separate reward tracks.</strong> Alliance rewards follow Legion 1's win or loss; your
			personal rewards follow your own Personal Relic Point rank. A top scorer on the losing side out-earns
			a passenger on the winning side.
		</li>
		<li>
			<strong>Clear your infirmary before it starts.</strong> You cannot enter with injured troops waiting.
		</li>
		<li><strong>Nobody scores in the spawn zone.</strong> Points come from moving.</li>
	</ul>
</section>

<h2>Before you enter</h2>

<ul>
	<li>
		<strong>Clear the infirmary.</strong> This is a hard requirement — injured troops waiting to heal
		block entry entirely.
	</li>
	<li>
		<strong>If you registered, show up.</strong> A no-show still counted toward your side's power rating
		but contributes nothing.
	</li>
	<li>
		<strong>Substitutes only auto-fill in the first 3 minutes (180 seconds)</strong>, first-come-first-served.
		If you're a sub, be at the gate from the whistle.
	</li>
	<li><strong>Heal up and recall your marches beforehand.</strong> Enter at full strength.</li>
</ul>

<h2>What actually scores</h2>

<h3>First control bonus</h3>

<p>
	The first alliance to fully occupy a building after its capture timer completes gets a large one-off
	Alliance <em>and</em> Personal bonus. First capture of the Swordshrine alone is 9,000 Alliance / 4,500
	Personal Relic Points, and taking first control of every Phase 1 building totals 26,400 Relic Points.
	This is why spreading out at the start beats stacking one target.
</p>

<h3>Ongoing occupation</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Building</th>
				<th scope="col">Alliance points / min</th>
				<th scope="col">Personal points / min</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Swordshrine</th>
				<td>1,800</td>
				<td>900</td>
			</tr>
			<tr>
				<th scope="row">Sanctum</th>
				<td>1,200</td>
				<td>600</td>
			</tr>
			<tr>
				<th scope="row">Abbey</th>
				<td>600</td>
				<td>300</td>
			</tr>
			<tr>
				<th scope="row">Buff building</th>
				<td>240</td>
				<td>120</td>
			</tr>
		</tbody>
	</table>
</div>

<p>
	<strong>30-minute hold bonus:</strong> once your alliance has held a building for 30 straight minutes,
	it starts paying Personal Relic Points at a higher rate — the patch notes don't say how much. A building
	nearing that threshold is worth more than its base rate suggests, both to hold and to steal.
</p>

<h3>Banked points and Baggage Trains</h3>

<p>
	50% of a building's accumulated alliance points sit visibly above it. Lose the building and those
	points drop on the ground as <strong>Baggage Trains</strong> that either side can pick up with a march,
	and they count for both Alliance and Personal points. Looting is not passive — send a march the moment
	a building flips, yours or theirs.
</p>

<h3>Defeating troops</h3>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Situation</th>
				<th scope="col">Personal points per 10,000 enemy soldier power defeated</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Attacking</th>
				<td>80</td>
			</tr>
			<tr>
				<th scope="row">Defending</th>
				<td>40</td>
			</tr>
		</tbody>
	</table>
</div>

<p>
	Kills pay <strong>Personal points only</strong> — no Alliance points at all. Offense pays roughly double
	defense, and in a high-power kingdom you can hit the personal cap within minutes purely from combat.
</p>

<h3>Undercellars</h3>

<p>
	Unmarked gathering nodes that spawn around the Swordshrine. Find them with the magnifying glass on
	the minimap and send a march like you would to a resource node. Slower than buildings but usually
	uncontested, so they're reliable, safe income for lower-power players. Late in the battle they can
	be worth 20–40k points in total — don't sleep on them.
</p>

<h2>The map</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Building</th>
				<th scope="col">What it does</th>
				<th scope="col">Why you care</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Swordshrine</th>
				<td>Centre of the map, opens at 15 min.</td>
				<td>Highest point flow on the field. The main prize — but not mandatory to win.</td>
			</tr>
			<tr>
				<th scope="row">Sanctums ×2</th>
				<td>Flank the shrine, open from the start.</td>
				<td>The real point engine. Hold at least one all match.</td>
			</tr>
			<tr>
				<th scope="row">Abbeys ×4</th>
				<td>Open from the start.</td>
				<td>Steady income and cheap first-control bonuses.</td>
			</tr>
			<tr>
				<th scope="row">Royal Stables</th>
				<td>Buff: halves the free Advanced Teleporter cooldown for the whole alliance.</td>
				<td>First pick in Phase 1. Mobility wins the map.</td>
			</tr>
			<tr>
				<th scope="row">Bell Tower</th>
				<td>Buff: halves building capture time.</td>
				<td>Highest-priority buff in Phase 1, since every first-control bonus is large.</td>
			</tr>
			<tr>
				<th scope="row">Hall of Reformation</th>
				<td>Buff: +15% attack and 15% damage reduction for your alliance. Opens at 15 min.</td>
				<td>Take it the moment it opens — it applies to every fight afterwards.</td>
			</tr>
			<tr>
				<th scope="row">Mercenary Camp</th>
				<td>Opens at 15 min. Sends mercenaries at an enemy-held building.</td>
				<td>
					No personal combat points from its kills. Use it to soften a target right before your rally,
					never standalone.
				</td>
			</tr>
			<tr>
				<th scope="row">Undercellars</th>
				<td>Unmarked nodes that spawn in waves near the shrine.</td>
				<td>Uncontested points for anyone who can't win fights.</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Timeline</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th scope="col">Phase</th>
				<th scope="col">Clock</th>
				<th scope="col">What matters</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">1 — Opening</th>
				<td>0–15 min</td>
				<td>
					2 Sanctums, 4 Abbeys, Bell Tower and Royal Stables are live.<br /> Priority: Royal Stables →
					Bell Tower → a Sanctum → Abbeys.<br /> Spread out to claim as many first-control bonuses as
					possible.<br /> Strongest players can pressure enemy cities at the same time to pull defenders
					out of buildings.
				</td>
			</tr>
			<tr>
				<th scope="row">2 — Midgame</th>
				<td>from exactly 15:00 (the 900-second mark)</td>
				<td>
					Swordshrine, Hall of Reformation and Mercenary Camp unlock.<br /> Take Reformation immediately;
					the buff applies to every fight afterwards.<br /> Tunnelling everything into the Swordshrine
					while giving up Sanctums and Abbeys is a losing play.<br /> If the shrine is too contested, pivot
					to holding both Sanctums plus Bell Tower, Reformation and the Abbeys.
				</td>
			</tr>
			<tr>
				<th scope="row">3 — Late game</th>
				<td>15 min and 20 min onward</td>
				<td>
					Undercellar waves spawn at 15 min and 20 min.<br /> The last 5–10 minutes are the comeback window.<br
					/> Enemy buildings with big banked reserves are the highest-value targets, because flipping them
					dumps a huge Baggage Train cluster.
				</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Your role</h2>

<h3>Attacker</h3>

<p>
	Teleport onto contested or weakly-held buildings, open rallies, burn enemy cities to force players
	to teleport out of their garrisons, then move on. Golden rule: <strong
		>attackers capture and move on, they do not sit in garrisons.</strong
	>
</p>

<h3>Defender / joiner</h3>

<p>
	Garrison the buildings you're assigned, keep your top 3 heroes home enough to survive, fill garrison
	slots so the enemy can't solo the building, and reinforce neighbours. If a stronger player reinforces
	you and you then teleport away, his garrisoned troops stay with you.
</p>

<h3>Gatherer / support</h3>

<p>
	Chase Baggage Trains the instant a building flips, gather Undercellars, and join rallies as a
	secondary march. You can launch marches from inside the safe zone without exposing your city — this
	is the free-to-play scoring lane, and it works.
</p>

<h2>Squad setup</h2>

<ul>
	<li>
		<strong>Troop ratio:</strong> 50/20/30 infantry/cavalry/archers most of the time. Use 60/40/0 with
		Alcar, Margot or Saul, whose skills lean cavalry and infantry.
	</li>
	<li>
		<strong>Offense and defense are the same.</strong> Kills are calculated simultaneously at the end
		of each mini-round, so neither side needs to "tank more". The only real difference is which scenario
		triggers a hero's widget, which is why the best offensive and defensive heroes are simply the latest
		generation with a matching widget type. Defense does not need more infantry and does not need dedicated
		"defensive" joiners.
	</li>
	<li>
		<strong>For solo attacks</strong>, use the highest-generation heroes you have that are decently invested.
	</li>
</ul>

<h3>PvP joiner heroes</h3>

<p>The same picks in both offense and defense:</p>

<div class="lineup">
	<div class="slot">
		<Hero slug="hilde" />
		<span class="or">or</span>
		<Hero slug="amane" />
	</div>
	<div class="slot"><Hero slug="saul" /></div>
	<div class="slot"><Hero slug="chenko" /></div>
</div>

<h2>Healing and mobility</h2>

<ul>
	<li>
		<strong>No batch healing during the event</strong> — healing speed-ups only, and the event drips out
		free 1h healing speed-ups slowly.
	</li>
	<li>
		<strong>Exit to heal.</strong> Tap the scoreboard at the top and choose <em>Leave battlefield</em> to
		instantly and freely heal everything. You then wait 12 minutes before you can re-enter. With hundreds
		of thousands injured, that round trip beats fighting at half strength.
	</li>
	<li>
		<strong>Don't waste healing speed-ups near the end.</strong> Troops cannot die, the infirmary cannot
		fill up during the event, and everything heals when the event ends.
	</li>
	<li>
		<strong>Free march speed-ups:</strong> a permanent event-only +25% march speed charge accumulates one
		per minute, capped at 10 (some sources say you start with 5 and can bank up to 30). Either way, hoarding
		them is a mistake — spend them.
	</li>
	<li>
		<strong>Free Advanced Teleporter</strong> roughly every 10–12 minutes, halved if your alliance holds
		the Royal Stables. Teleporting again before the free one recharges costs Advanced Teleporters at an
		escalating price (+1 each time), so one paid hop between free ones is fine; chaining several is not.
	</li>
</ul>

<h2>Staying alive</h2>

<ul>
	<li>
		<strong>If a much stronger player attacks you, avoid the injuries.</strong> Deploy troops onto empty
		ground next to your city, teleport away, or recall your top 3 heroes if that's enough to hold.
	</li>
	<li>
		<strong>The guard station takes heavily increased damage here.</strong> If you don't spend gems to
		put the fire out, 10–20 seconds is enough to force-teleport your city home.
	</li>
	<li>
		<strong>Ask a stronger player for reinforcements.</strong> Their garrisoned troops stay with you even
		if you teleport.
	</li>
	<li>
		<strong>Buy the 2h counter-recon</strong> (about 400 gems) so you can't be scouted, and use every attack
		and defense buff you have — a 10% or 20% gem buff multiplies rather than adds.
	</li>
	<li><strong>Scout a lot before attacking</strong>, and use 1-minute rallies liberally.</li>
	<li>
		<strong>You don't have to sit next to a building.</strong> Parking in the open next to an objective
		makes you an easy target. Sit in the safe zone or in dead space between buildings and lean on the free
		march speed-ups.
	</li>
	<li>
		<strong>A lost attack is still a win if you injured more than ~80,000 troops.</strong> Each follow-up
		attack gets easier. Same when defending: under 80k injured is a good trade.
	</li>
	<li>
		<strong>Don't spam every march at one target</strong> unless they're already below ~100,000 troops.
		Only your main march does real damage; the rest just suicide.
	</li>
	<li>
		<strong>Don't send your main march far away</strong> unless a strong second march or a friend is covering
		your city.
	</li>
</ul>

<h2>Common mistakes</h2>

<ul>
	<li><strong>Sitting in the spawn zone doing nothing.</strong> You score zero.</li>
	<li><strong>Hoarding teleporters and march speed-ups</strong> until the event ends.</li>
	<li>
		<strong>Chasing only the Swordshrine</strong> and losing the Sanctums and Abbeys that actually pay.
	</li>
	<li><strong>Ignoring Undercellars and Baggage Trains.</strong> Free points nobody contests.</li>
	<li><strong>Attackers parking in a garrison</strong> instead of moving to the next target.</li>
	<li><strong>Entering with a full infirmary</strong>, or forgetting to show up after registering.</li>
	<li>
		<strong>Burning healing speed-ups in the last minutes</strong>, when everything heals for free at the
		end anyway.
	</li>
</ul>

<p class="source">
	Sources:
	<a href="https://kingshotwiki.com/events/swordland-showdown/" rel="noreferrer"
		>kingshotwiki.com — Swordland Showdown</a
	>,
	<a href="https://kingshotmastery.com/guides/swordland-showdown" rel="noreferrer"
		>kingshotmastery.com — Swordland Showdown guide</a
	>,
	<a href="https://kingshotpro.com/swordland-showdown-guide.html" rel="noreferrer"
		>kingshotpro.com — Swordland Showdown guide</a
	>. Exact point values and building layouts can change with patches — verify against your own
	battlefield screen.
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

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
