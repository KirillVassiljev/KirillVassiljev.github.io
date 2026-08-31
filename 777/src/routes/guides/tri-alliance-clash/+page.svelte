<svelte:head>
	<title>Tri-alliance clash — Kingshot 777</title>
	<meta
		name="description"
		content="Beginner-friendly guide to Kingshot Tri-Alliance Clash: the monthly cycle, entry requirements, energy, squad setup, scoring, phases, the 30-player role split and the temple endgame."
	/>
</svelte:head>

<h1>Tri-alliance clash</h1>

<section class="tldr">
	<h2>TL;DR</h2>
	<ul>
		<li>
			<strong>Three alliances, 60 minutes, every four weeks.</strong> Points come from holding buildings,
			and the winner is usually whoever holds the temple at the end.
		</li>
		<li>
			<strong>The Temple of Tides opens at minute 40.</strong> First capture pays a one-off 50,000 points,
			then 1,800 points per minute while you hold it. Everything before phase 4 is setup for that fight.
		</li>
		<li>
			<strong>Energy is your real limit.</strong> Moving, capturing, charging, retreating, reviving and
			conscripting all cost it. Arrive at minute 20 and minute 40 with a reserve.
		</li>
		<li>
			<strong>Stay in your lane.</strong> Six lanes, one main player each. A collapsed lane is a hole in
			your map for the rest of the event.
		</li>
		<li>
			<strong>Two supporters keep each main player alive.</strong> They rotate forward while the main player
			heals, so nobody eats the 2-minute respawn walk from HQ.
		</li>
		<li>
			<strong>Five squads to skip a building.</strong> That's why the special force of six players (18
			squads) can drive straight through enemy territory.
		</li>
		<li>
			<strong>The special force never splits.</strong> It exists to break through and cause chaos, not to
			win duels.
		</li>
		<li>
			<strong>Don't overextend.</strong> Push only as fast as your supporters can follow, and stay near
			your anchor building.
		</li>
	</ul>
</section>

<h2>If this is your first clash</h2>

<p>What a normal member — not an R4, not a commander — actually has to do:</p>

<ol>
	<li>
		<strong>Get registered.</strong> Tell your R4/R5 you want in during the sign-up window. You cannot
		register yourself.
	</li>
	<li>
		<strong>Set up your three squad presets before you enter.</strong> You can't calmly rebuild marches
		once the clock is running.
	</li>
	<li><strong>Join Discord or in-game voice.</strong> The important calls happen in seconds.</li>
	<li>
		<strong>Learn your lane and role in the 3-minute prep phase.</strong> Ask which building is yours and
		who your supporters are.
	</li>
	<li><strong>Take your assigned building</strong> as soon as the phase opens. Don't improvise.</li>
	<li><strong>Stay in your lane.</strong> A lane that empties is a hole for the rest of the hour.</li>
	<li>
		<strong>Don't chase kills.</strong> Kills score nothing directly. Buildings and time do.
	</li>
	<li>
		<strong>Save energy for minute 20 and minute 40.</strong> Those are the two moments the match is
		actually decided.
	</li>
</ol>

<h2>The monthly cycle</h2>

<p>
	Tri-Alliance Clash runs once every four weeks. The week around it is fixed, so you know in advance
	when to be available.
</p>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 170"
			width="100%"
			height="auto"
			role="img"
			aria-label="Weekly cycle: Monday to Tuesday voting, Wednesday to Thursday sign-up, Friday matchmaking, Saturday battle, repeating every four weeks."
		>
			<title>The four-week Tri-Alliance Clash cycle</title>

			<rect x="20" y="34" width="160" height="66" rx="8" fill="var(--surface)" stroke="var(--border)" />
			<text x="100" y="60" text-anchor="middle" font-size="12" fill="var(--muted)">Mon–Tue</text>
			<text x="100" y="80" text-anchor="middle" font-size="13" fill="var(--text)">Voting</text>

			<rect x="220" y="34" width="160" height="66" rx="8" fill="var(--surface)" stroke="var(--border)" />
			<text x="300" y="60" text-anchor="middle" font-size="12" fill="var(--muted)">Wed–Thu</text>
			<text x="300" y="80" text-anchor="middle" font-size="13" fill="var(--text)">Sign-up</text>

			<rect x="420" y="34" width="160" height="66" rx="8" fill="var(--surface)" stroke="var(--border)" />
			<text x="500" y="60" text-anchor="middle" font-size="12" fill="var(--muted)">Fri</text>
			<text x="500" y="80" text-anchor="middle" font-size="13" fill="var(--text)">Matchmaking</text>

			<rect
				x="620"
				y="34"
				width="160"
				height="66"
				rx="8"
				fill="var(--accent)"
				fill-opacity="0.18"
				stroke="var(--accent)"
			/>
			<text x="700" y="60" text-anchor="middle" font-size="12" fill="var(--muted)">Sat</text>
			<text x="700" y="80" text-anchor="middle" font-size="13" fill="var(--accent)">Battle — 60 min</text>

			<g stroke="var(--muted)" stroke-width="1.5" fill="var(--muted)">
				<line x1="184" y1="67" x2="208" y2="67" />
				<path d="M216 67 L206 62 L206 72 Z" stroke="none" />
				<line x1="384" y1="67" x2="408" y2="67" />
				<path d="M416 67 L406 62 L406 72 Z" stroke="none" />
				<line x1="584" y1="67" x2="608" y2="67" />
				<path d="M616 67 L606 62 L606 72 Z" stroke="none" />
			</g>

			<path
				d="M700 100 L700 130 L100 130 L100 108"
				fill="none"
				stroke="var(--border)"
				stroke-width="1.5"
				stroke-dasharray="4 4"
			/>
			<path d="M100 100 L95 110 L105 110 Z" fill="var(--border)" />
			<text x="400" y="152" text-anchor="middle" font-size="12" fill="var(--muted)"
				>repeats every 4 weeks</text
			>
		</svg>
	</div>
	<figcaption>The clash week. Only Saturday is the match; the rest is admin you can miss.</figcaption>
</figure>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th>Day</th>
				<th>Phase</th>
				<th>What happens</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>Mon–Tue</th>
				<td>Voting</td>
				<td>Members vote on the preferred time slot. R4/R5 make the final call.</td>
			</tr>
			<tr>
				<th>Wed–Thu</th>
				<td>Sign-up</td>
				<td>R4+ register the participants and substitutes.</td>
			</tr>
			<tr>
				<th>Fri</th>
				<td>Matchmaking</td>
				<td>Alliances are paired into three-way battlefields.</td>
			</tr>
			<tr>
				<th>Sat</th>
				<td>Battle</td>
				<td>The 60-minute match runs in your alliance's registered time slot.</td>
			</tr>
		</tbody>
	</table>
</div>

<p>
	An alliance can field <strong>two legions</strong>, in separate battlefields with different time
	slots. Their rewards are calculated separately, so being in the second legion is not a demotion.
</p>

<h2>Can you take part?</h2>

<ul>
	<li>
		<strong>Your alliance must rank top 20 in the kingdom</strong> by alliance power. If it doesn't, nobody
		in it plays.
	</li>
	<li>
		<strong>You must be in the alliance</strong>, typically with City Center Lv.16+, and 5+ days of
		inactivity can block you from being registered.
	</li>
	<li>
		<strong>30 combatants plus 10 substitutes</strong> per alliance, each fielding 3 squads.
	</li>
	<li><strong>R4/R5 sign you up.</strong> There is no self-registration.</li>
	<li>
		<strong>Exact thresholds vary by server version.</strong> Check the in-game event rules before you
		promise anyone anything.
	</li>
</ul>

<h2>What actually scores</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th>Source</th>
				<th>Opens</th>
				<th>Points</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>Garrisons</th>
				<td>Minute 20</td>
				<td>1,800 per minute held</td>
			</tr>
			<tr>
				<th>Temple of Tides</th>
				<td>Minute 40</td>
				<td>50,000 one-off for the first capture, then 1,800 per minute held</td>
			</tr>
			<tr>
				<th>Buildings and ruins</th>
				<td>From phase 2</td>
				<td>Smaller per-minute income</td>
			</tr>
			<tr>
				<th>Kills</th>
				<td>—</td>
				<td>No direct points</td>
			</tr>
		</tbody>
	</table>
</div>

<ul>
	<li>
		<strong>The 50,000 is for capturing the Temple first, not for holding it at the whistle.</strong> If
		another alliance caps it before you, the match is not over — retaking and holding still pays 1,800
		per minute, and twenty minutes of that outweighs the bonus.
	</li>
	<li>
		<strong>Kills only matter as a means.</strong> You kill to open a building or to keep one. Killing for
		its own sake spends energy and buys nothing.
	</li>
</ul>

<h2>Energy</h2>

<p>
	This is the mechanic beginners lose to most often. Energy is spent on moving, capturing, charging,
	retreating, reviving and conscripting. Run out and you cannot answer the Garrison or Temple call,
	no matter how strong your account is.
</p>

<ul>
	<li>
		<strong>Don't burn energy chasing kills in the first 20 minutes.</strong> Aim to still have a healthy
		reserve at minute 20, and again at minute 40.
	</li>
	<li>
		<strong>Assign a Captain after capturing a point.</strong> It improves energy recovery, which is one
		reason having R4+ players on the field helps.
	</li>
	<li>
		<strong>Retreat one building back to heal and conscript</strong> out of combat. That's cheaper than
		instant revive, and far cheaper than dying and eating the ~2-minute walk from HQ.
	</li>
	<li>
		<strong>Leaving the battlefield has a re-entry cooldown</strong> — commonly cited as around 12
		minutes. Most account buffs still apply on the field, except some march speed and capacity effects.
	</li>
</ul>

<h2>Squad setup</h2>

<p>
	You field three marches, so nine heroes are in rotation. Build the three as presets
	<strong>before</strong> you enter:
</p>

<ul>
	<li><strong>Squad 1 — strongest combat squad.</strong> For high-pressure buildings and contested caps.</li>
	<li><strong>Squad 2 — stable squad.</strong> Lane support and reinforcement; it has to survive, not spike.</li>
	<li><strong>Squad 3 — flexible squad.</strong> Routes, recovery cover, retakes.</li>
</ul>

<ul>
	<li>
		<strong>Don't even the three out just to make the power numbers look balanced.</strong> Each squad
		needs a job; three identical mediocre marches do none of them well.
	</li>
	<li>
		<strong>There is no universal formation ratio.</strong> It depends on your troops, your heroes, the
		opponent, and whether you're attacking or holding.
	</li>
	<li>
		<strong>Consider holding one strong march back</strong> for the minute-20 Garrison and minute-40
		Temple timings.
	</li>
</ul>

<h2>Event format</h2>

<ul>
	<li>
		<strong>Soldier power is not used for matchmaking.</strong> You can be paired against far stronger
		alliances, so structure and discipline are what you control.
	</li>
	<li><strong>You cannot leave the alliance</strong> once you've entered the battlefield.</li>
</ul>

<h2>Phases</h2>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 156"
			width="100%"
			height="auto"
			role="img"
			aria-label="Timeline of the 60-minute match: preparation 0 to 3 minutes, seize and conquer 3 to 20, garrison occupation 20 to 40, temple onslaught 40 to 60. Garrisons unlock at minute 20 and the temple opens at minute 40."
		>
			<title>The 60-minute phase timeline</title>

			<rect x="20" y="64" width="38" height="44" fill="var(--surface)" stroke="var(--border)" />
			<rect x="58" y="64" width="215" height="44" fill="var(--surface)" stroke="var(--border)" />
			<rect x="273" y="64" width="254" height="44" fill="var(--surface)" stroke="var(--border)" />
			<rect
				x="527"
				y="64"
				width="253"
				height="44"
				fill="var(--accent)"
				fill-opacity="0.2"
				stroke="var(--accent)"
			/>

			<g fill="var(--text)" font-size="11" text-anchor="middle">
				<text x="39" y="126">Prep</text>
				<text x="165" y="126">Seize &amp; Conquer</text>
				<text x="400" y="126">Garrison Occupation</text>
				<text x="653" y="126" fill="var(--accent)">Temple Onslaught</text>
			</g>
			<g fill="var(--muted)" font-size="11" text-anchor="middle">
				<text x="39" y="141">0–3</text>
				<text x="165" y="141">3–20</text>
				<text x="400" y="141">20–40</text>
				<text x="653" y="141">40–60</text>
			</g>

			<g stroke="var(--accent)" stroke-width="2">
				<line x1="273" y1="48" x2="273" y2="116" />
				<line x1="527" y1="48" x2="527" y2="116" />
			</g>
			<circle cx="273" cy="44" r="4" fill="var(--accent)" />
			<circle cx="527" cy="44" r="4" fill="var(--accent)" />

			<g text-anchor="middle" font-size="11">
				<text x="273" y="20" fill="var(--accent)">min 20</text>
				<text x="273" y="34" fill="var(--muted)">garrisons — 1,800/min</text>
				<text x="527" y="20" fill="var(--accent)">min 40</text>
				<text x="527" y="34" fill="var(--muted)">temple — 50,000 first cap</text>
			</g>
		</svg>
	</div>
	<figcaption>
		Phase lengths to scale. The two marked minutes are where the match is actually decided.
	</figcaption>
</figure>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th>Phase</th>
				<th>Clock</th>
				<th>What matters</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>1 — Preparation</th>
				<td>0–3 min</td>
				<td>R4/R5 place marks on the map. Everyone confirms their lane and role.</td>
			</tr>
			<tr>
				<th>2 — Seize &amp; Conquer</th>
				<td>3–20 min</td>
				<td>
					Garrisons are shielded and cannot be touched. Main players take their lane keypoint fast,
					supporters settle into the building behind it, reaction teams sweep the neutral buildings in
					the centre. Secure the Transit Hubs and route buildings you'll need later.
				</td>
			</tr>
			<tr>
				<th>3 — Garrison Occupation</th>
				<td>20–40 min</td>
				<td>
					A24, B24 and C24 unlock and pay 1,800 per minute. Priority 1 is holding your <em>own</em>
					garrison; priority 2 is taking an enemy one. Start the regroup toward the Temple before minute
					40, not at it. The special force is at its most active here.
				</td>
			</tr>
			<tr>
				<th>4 — Temple Onslaught</th>
				<td>40–60 min</td>
				<td>
					Attack the Temple of Tides in one coordinated burst, not one march at a time. Defend the
					access routes around A29, B29 and C29. This phase decides the match.
				</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Roles</h2>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 182"
			width="100%"
			height="auto"
			role="img"
			aria-label="The 30 combatants split into 6 main players, 12 supporters, 6 special commander force and 6 reaction team players, plus 2 commanders counted separately."
		>
			<title>How the 30 combatants are divided</title>

			<g font-size="11" text-anchor="middle">
				<text x="111" y="20" fill="var(--text)">Main 6</text>
				<text x="327" y="20" fill="var(--text)">Supporters 12</text>
				<text x="543" y="20" fill="var(--text)">Special force 6</text>
				<text x="687" y="20" fill="var(--text)">Reaction 6</text>
			</g>

			<g stroke="var(--border)" fill="none">
				<path d="M40 36 V28 H182 V36" />
				<path d="M184 36 V28 H470 V36" />
				<path d="M472 36 V28 H614 V36" />
				<path d="M616 36 V28 H758 V36" />
			</g>

			<g stroke="var(--border)" fill="var(--accent)">
				<g fill-opacity="1">
					<rect x="40" y="40" width="22" height="24" />
					<rect x="64" y="40" width="22" height="24" />
					<rect x="88" y="40" width="22" height="24" />
					<rect x="112" y="40" width="22" height="24" />
					<rect x="136" y="40" width="22" height="24" />
					<rect x="160" y="40" width="22" height="24" />
				</g>
				<g fill-opacity="0.28">
					<rect x="184" y="40" width="22" height="24" />
					<rect x="208" y="40" width="22" height="24" />
					<rect x="232" y="40" width="22" height="24" />
					<rect x="256" y="40" width="22" height="24" />
					<rect x="280" y="40" width="22" height="24" />
					<rect x="304" y="40" width="22" height="24" />
					<rect x="328" y="40" width="22" height="24" />
					<rect x="352" y="40" width="22" height="24" />
					<rect x="376" y="40" width="22" height="24" />
					<rect x="400" y="40" width="22" height="24" />
					<rect x="424" y="40" width="22" height="24" />
					<rect x="448" y="40" width="22" height="24" />
				</g>
				<g fill-opacity="0.68">
					<rect x="472" y="40" width="22" height="24" />
					<rect x="496" y="40" width="22" height="24" />
					<rect x="520" y="40" width="22" height="24" />
					<rect x="544" y="40" width="22" height="24" />
					<rect x="568" y="40" width="22" height="24" />
					<rect x="592" y="40" width="22" height="24" />
				</g>
				<g fill-opacity="0.45">
					<rect x="616" y="40" width="22" height="24" />
					<rect x="640" y="40" width="22" height="24" />
					<rect x="664" y="40" width="22" height="24" />
					<rect x="688" y="40" width="22" height="24" />
					<rect x="712" y="40" width="22" height="24" />
					<rect x="736" y="40" width="22" height="24" />
				</g>
			</g>

			<text x="40" y="90" font-size="12" fill="var(--text)">6 + 12 + 6 + 6 = 30 combatants</text>

			<g fill="none" stroke="var(--muted)" stroke-dasharray="3 3">
				<rect x="40" y="104" width="22" height="24" />
				<rect x="64" y="104" width="22" height="24" />
			</g>
			<text x="98" y="121" font-size="12" fill="var(--muted)"
				>+ 2 commanders — buffs only, outside the 30</text
			>

			<g stroke="var(--border)" fill="var(--accent)">
				<rect x="40" y="150" width="12" height="12" fill-opacity="1" />
				<rect x="230" y="150" width="12" height="12" fill-opacity="0.28" />
				<rect x="420" y="150" width="12" height="12" fill-opacity="0.68" />
				<rect x="610" y="150" width="12" height="12" fill-opacity="0.45" />
			</g>
			<g font-size="11" fill="var(--muted)">
				<text x="58" y="160">Main players — 6</text>
				<text x="248" y="160">Supporters — 12</text>
				<text x="438" y="160">Special force — 6</text>
				<text x="628" y="160">Reaction — 6</text>
			</g>
		</svg>
	</div>
	<figcaption>
		One square per registered combatant. The two commanders sit outside the 30 and never fight a lane.
	</figcaption>
</figure>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th>Role</th>
				<th>Players</th>
				<th>Job</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>Main players</th>
				<td>6</td>
				<td>
					One per lane. Capture the lane keypoint immediately, then hold the frontline and keep the
					enemy out of your interior.
				</td>
			</tr>
			<tr>
				<th>Supporters</th>
				<td>12</td>
				<td>
					Two per main player. Sit in the building behind the keypoint, step forward only when your
					main player needs to heal, and never leave the keypoint unmanned.
				</td>
			</tr>
			<tr>
				<th>Special commander force</th>
				<td>6</td>
				<td>
					A single breakthrough group. Skips low-value buildings, takes undefended structures deep in
					enemy territory, and forces enemy rotations.
				</td>
			</tr>
			<tr>
				<th>Reaction teams</th>
				<td>6 (2 × 3)</td>
				<td>
					Grab the central neutral buildings at the start, then float: retake lost buildings and prop
					up whichever lane is under pressure.
				</td>
			</tr>
			<tr>
				<th>Commanders</th>
				<td>2</td>
				<td>Buff management only. No lane fighting.</td>
			</tr>
		</tbody>
	</table>
</div>

<dl class="qa">
	<dt>Why does the special force work?</dt>
	<dd>
		Bypassing a building without capturing it needs five squads. Six players fielding three squads
		each is 18 squads, enough to skip repeatedly and cover ground fast. Split the group and it stops
		working — nobody has five squads on their own.
	</dd>

	<dt>Who should be a commander?</dt>
	<dd>
		Smaller, highly active players who can stay focused for the full 60 minutes. Buff timing swings
		lane fights and the temple battle, so this is a real job, not a place to park someone weak and
		inattentive.
	</dd>
</dl>

<h2>The map</h2>

<p>
	Six lanes feed one centre. Lanes 1, 4 and 5 sit in the upper half, lanes 2, 3 and 6 in the lower
	half; the garrisons and the temple approaches are the only objectives that decide the score.
</p>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 520"
			width="100%"
			height="auto"
			role="img"
			aria-label="Schematic of the battlefield: six lanes, each with a keypoint and an anchor building behind it, converging on the central Temple of Tides. Lanes 1, 4 and 5 are the upper half, lanes 2, 3 and 6 the lower half. Garrisons A24, B24 and C24 sit off to the side, approach routes A29, B29 and C29 ring the temple, and two neutral buildings sit near the centre."
		>
			<title>Lane and objective schematic</title>

			<g stroke="var(--border)" stroke-width="1.5" fill="none">
				<line x1="250" y1="78" x2="250" y2="116" />
				<line x1="420" y1="78" x2="420" y2="116" />
				<line x1="590" y1="78" x2="590" y2="116" />
				<line x1="250" y1="409" x2="250" y2="445" />
				<line x1="420" y1="409" x2="420" y2="445" />
				<line x1="590" y1="409" x2="590" y2="445" />
				<line x1="250" y1="140" x2="420" y2="260" />
				<line x1="420" y1="164" x2="420" y2="260" />
				<line x1="590" y1="140" x2="420" y2="260" />
				<line x1="250" y1="385" x2="420" y2="260" />
				<line x1="420" y1="361" x2="420" y2="260" />
				<line x1="590" y1="385" x2="420" y2="260" />
			</g>

			<text x="420" y="22" text-anchor="middle" font-size="11" fill="var(--muted)"
				>Upper half — lanes 1, 4, 5</text
			>
			<text x="420" y="508" text-anchor="middle" font-size="11" fill="var(--muted)"
				>Lower half — lanes 2, 3, 6</text
			>

			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="195" y="44" width="110" height="34" rx="6" />
				<rect x="365" y="44" width="110" height="34" rx="6" />
				<rect x="535" y="44" width="110" height="34" rx="6" />
				<rect x="195" y="445" width="110" height="34" rx="6" />
				<rect x="365" y="445" width="110" height="34" rx="6" />
				<rect x="535" y="445" width="110" height="34" rx="6" />
			</g>
			<g font-size="11" fill="var(--muted)" text-anchor="middle">
				<text x="250" y="66">Anchor 1</text>
				<text x="420" y="66">Anchor 4</text>
				<text x="590" y="66">Anchor 5</text>
				<text x="250" y="467">Anchor 2</text>
				<text x="420" y="467">Anchor 3</text>
				<text x="590" y="467">Anchor 6</text>
			</g>

			<g fill="var(--surface)" stroke="var(--border)" stroke-width="1.5">
				<circle cx="250" cy="140" r="24" />
				<circle cx="420" cy="140" r="24" />
				<circle cx="590" cy="140" r="24" />
				<circle cx="250" cy="385" r="24" />
				<circle cx="420" cy="385" r="24" />
				<circle cx="590" cy="385" r="24" />
			</g>
			<g font-size="12" fill="var(--text)" text-anchor="middle">
				<text x="250" y="144">K1</text>
				<text x="420" y="144">K4</text>
				<text x="590" y="144">K5</text>
				<text x="250" y="389">K2</text>
				<text x="420" y="389">K3</text>
				<text x="590" y="389">K6</text>
			</g>

			<g fill="var(--bg)" stroke="var(--border)">
				<rect x="272" y="246" width="56" height="28" rx="4" />
				<rect x="512" y="246" width="56" height="28" rx="4" />
			</g>
			<g font-size="10" fill="var(--muted)" text-anchor="middle">
				<text x="300" y="264">Neutral</text>
				<text x="540" y="264">Neutral</text>
				<text x="300" y="288">reaction teams</text>
				<text x="540" y="288">reaction teams</text>
			</g>

			<g fill="var(--bg)" stroke="var(--border)">
				<circle cx="342" cy="215" r="15" />
				<circle cx="498" cy="215" r="15" />
				<circle cx="420" cy="340" r="15" />
			</g>
			<g font-size="10" fill="var(--muted)" text-anchor="middle">
				<text x="342" y="219">A29</text>
				<text x="498" y="219">B29</text>
				<text x="420" y="344">C29</text>
			</g>

			<circle
				cx="420"
				cy="260"
				r="42"
				fill="var(--accent)"
				fill-opacity="0.2"
				stroke="var(--accent)"
				stroke-width="2"
			/>
			<g font-size="11" fill="var(--accent)" text-anchor="middle">
				<text x="420" y="257">Temple</text>
				<text x="420" y="271">of Tides</text>
			</g>

			<text x="62" y="166" text-anchor="middle" font-size="11" fill="var(--text)">Garrisons</text>
			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="16" y="180" width="92" height="30" rx="6" />
				<rect x="16" y="222" width="92" height="30" rx="6" />
				<rect x="16" y="264" width="92" height="30" rx="6" />
			</g>
			<g font-size="11" fill="var(--muted)" text-anchor="middle">
				<text x="62" y="200">A24</text>
				<text x="62" y="242">B24</text>
				<text x="62" y="284">C24</text>
				<text x="62" y="312">unlock min 20</text>
			</g>
		</svg>
	</div>
	<figcaption>
		Schematic only, not the in-game map. Each lane is a keypoint with an anchor building behind it;
		every lane feeds the temple.
	</figcaption>
</figure>

<h2>Healing rotation</h2>

<p>
	This is the mechanic that separates an organised alliance from a mob. When a main player gets low:
</p>

<ol>
	<li>One supporter advances and takes over the frontline.</li>
	<li>The main player pulls back briefly to heal.</li>
	<li>The main player returns as soon as they're healed.</li>
	<li>The supporter falls back to the anchor building behind the keypoint.</li>
</ol>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 296"
			width="100%"
			height="auto"
			role="img"
			aria-label="Four-step healing loop: a supporter advances to the frontline, the main player pulls back to heal, the main player returns, the supporter falls back to the anchor building. The keypoint is never left empty."
		>
			<title>The four-step healing rotation</title>

			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="60" y="40" width="300" height="70" rx="8" />
				<rect x="440" y="40" width="300" height="70" rx="8" />
				<rect x="440" y="182" width="300" height="70" rx="8" />
				<rect x="60" y="182" width="300" height="70" rx="8" />
			</g>

			<g font-size="12">
				<text x="80" y="68" fill="var(--accent)">1</text>
				<text x="102" y="68" fill="var(--text)">Supporter steps up</text>
				<text x="102" y="90" fill="var(--muted)">takes the frontline</text>

				<text x="460" y="68" fill="var(--accent)">2</text>
				<text x="482" y="68" fill="var(--text)">Main player pulls back</text>
				<text x="482" y="90" fill="var(--muted)">heals out of combat</text>

				<text x="460" y="210" fill="var(--accent)">3</text>
				<text x="482" y="210" fill="var(--text)">Main player returns</text>
				<text x="482" y="232" fill="var(--muted)">retakes the frontline</text>

				<text x="80" y="210" fill="var(--accent)">4</text>
				<text x="102" y="210" fill="var(--text)">Supporter falls back</text>
				<text x="102" y="232" fill="var(--muted)">returns to the anchor</text>
			</g>

			<g stroke="var(--accent)" stroke-width="1.5" fill="var(--accent)">
				<line x1="364" y1="75" x2="428" y2="75" />
				<path d="M436 75 L426 70 L426 80 Z" stroke="none" />
				<line x1="590" y1="114" x2="590" y2="170" />
				<path d="M590 178 L585 168 L595 168 Z" stroke="none" />
				<line x1="436" y1="217" x2="372" y2="217" />
				<path d="M364 217 L374 212 L374 222 Z" stroke="none" />
				<line x1="210" y1="178" x2="210" y2="122" />
				<path d="M210 114 L205 124 L215 124 Z" stroke="none" />
			</g>

			<g font-size="11" text-anchor="middle" fill="var(--accent)">
				<text x="400" y="140">Keypoint</text>
				<text x="400" y="156">never empty</text>
			</g>

			<text x="400" y="284" text-anchor="middle" font-size="11" fill="var(--muted)"
				>loop as often as needed — nobody walks back from HQ</text
			>
		</svg>
	</div>
	<figcaption>The rotation runs clockwise and repeats; the frontline is always occupied.</figcaption>
</figure>

<p>
	The lane never goes quiet, the keypoint is never empty, and nobody has to walk two minutes back from
	HQ after dying.
</p>

<h2>Common mistakes</h2>

<ul>
	<li>
		<strong>Overextending.</strong> Deep solo pushes leave you cut off from your supporters and hand the
		enemy free kills.
	</li>
	<li>
		<strong>Splitting the special force.</strong> Below five squads it can't skip buildings, and its whole
		value disappears.
	</li>
	<li>
		<strong>Supporters pushing ahead.</strong> Their strength is stability. An aggressive supporter is
		a keypoint about to be lost.
	</li>
	<li>
		<strong>Reaction teams rotating for no reason.</strong> They should move when a lane is genuinely in
		trouble, not chase every skirmish.
	</li>
	<li>
		<strong>Rotating to the temple too late.</strong> Lanes need to converge together; arriving piecemeal
		means being beaten piecemeal.
	</li>
</ul>

<h2>Beginner FAQ</h2>

<dl class="qa">
	<dt>I'm new — what's the one thing I should get right?</dt>
	<dd>
		Stay in your lane and save energy. Everything else your R4s can work around; those two they can't.
	</dd>

	<dt>Do kills matter?</dt>
	<dd>
		Only as a means to hold a building or to open one. There are no points for kills themselves, and
		duels you didn't need cost energy you'll want at minute 40.
	</dd>

	<dt>What if the enemy caps the Temple first?</dt>
	<dd>
		Retake it. They get the one-off 50,000, but the 1,800 per minute is still live for whoever holds
		it — and there are up to twenty minutes of that on the table.
	</dd>

	<dt>Should I use instant revive?</dt>
	<dd>
		Usually no. Retreat one building back, heal and conscript out of combat. Instant revive burns
		energy you'll need for the next call.
	</dd>

	<dt>Do I need voice chat?</dt>
	<dd>
		Strongly recommended. The minute-20 garrison call and the minute-40 temple push happen far too
		fast to coordinate over text.
	</dd>
</dl>

<p class="source">Sources:</p>

<ul class="source">
	<li>
		<a href="https://kingshotwiki.com/events/tri-alliance-clash/" rel="noreferrer"
			>kingshotwiki.com — Tri-Alliance Clash</a
		> — roles, lanes, healing rotation, skip rule
	</li>
	<li>
		<a href="https://kingshotmastery.com/guides/tri-alliance-clash" rel="noreferrer"
			>kingshotmastery.com — Tri-Alliance Clash</a
		> — phases, scoring, energy
	</li>
	<li>
		<a href="https://kingshotdata.kr/en/guides/Tri-Alliance-Clash.html" rel="noreferrer"
			>kingshotdata.kr — Tri-Alliance Clash</a
		> — entry requirements, map coordinates, energy
	</li>
	<li>
		<a
			href="https://centurygames.helpshift.com/hc/en/140-kingshot/faq/8521-what-is-tri-alliance-clash/"
			rel="noreferrer">Century Games support — What is Tri-Alliance Clash?</a
		> — official schedule and legions
	</li>
	<li>
		<a href="https://kingshot.net/game-announcements/15-tri-alliance-clash-is-imminent" rel="noreferrer"
			>kingshot.net — Tri-Alliance Clash is imminent</a
		> — official announcement
	</li>
</ul>

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

	.diagram {
		margin: 1.5rem 0;
	}

	.diagram-scroll {
		overflow-x: auto;
	}

	.diagram svg {
		display: block;
		width: 100%;
		min-width: 520px;
		height: auto;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	.diagram figcaption {
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.9rem;
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

	.source {
		color: var(--muted);
		font-size: 0.9rem;
	}

	p.source {
		margin-bottom: 0.3rem;
	}

	ul.source {
		margin-top: 0;
	}
</style>
