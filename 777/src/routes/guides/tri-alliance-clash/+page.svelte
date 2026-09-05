<script>
	import { t } from '$lib/translations/i18n';
	import ReadingTime from '$lib/components/ReadingTime.svelte';
</script>

<svelte:head>
	<title>{$t('guides.tri-alliance-clash.meta.title')}</title>
	<meta name="description" content={$t('guides.tri-alliance-clash.meta.description')} />
</svelte:head>

<h1>{$t('guides.tri-alliance-clash.h1')}</h1>

<section class="tldr">
	<h2>{$t('guides.tri-alliance-clash.tldr.heading')}</h2>
	<ReadingTime guide="tri-alliance-clash" />
	<ul>
		{#each $t('guides.tri-alliance-clash.tldr.items') as item}
			<li>{@html item}</li>
		{/each}
	</ul>
</section>

<h2>{$t('guides.tri-alliance-clash.sections.firstClash.heading')}</h2>

<ol>
	{#each $t('guides.tri-alliance-clash.sections.firstClash.items') as item}
		<li>{@html item}</li>
	{/each}
</ol>

<h2>{$t('guides.tri-alliance-clash.sections.scoring.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				{#each $t('guides.tri-alliance-clash.sections.scoring.table.headers') as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.tri-alliance-clash.sections.scoring.table.rows') as row}
				<tr>
					<th>{@html row.source}</th>
					<td>{@html row.opens}</td>
					<td>{@html row.points}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.scoring.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.energy.heading')}</h2>

<p>{$t('guides.tri-alliance-clash.sections.energy.body')}</p>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.energy.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.squadSetup.heading')}</h2>

<p>{@html $t('guides.tri-alliance-clash.sections.squadSetup.intro')}</p>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.squadSetup.presets') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.squadSetup.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.eventFormat.heading')}</h2>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.eventFormat.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.phases.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				{#each $t('guides.tri-alliance-clash.sections.phases.table.headers') as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.tri-alliance-clash.sections.phases.table.rows') as row}
				<tr>
					<th>{@html row.phase}</th>
					<td>{@html row.clock}</td>
					<td>{@html row.matters}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>{$t('guides.tri-alliance-clash.sections.roles.heading')}</h2>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				{#each $t('guides.tri-alliance-clash.sections.roles.table.headers') as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $t('guides.tri-alliance-clash.sections.roles.table.rows') as row}
				<tr>
					<th>{@html row.role}</th>
					<td>{@html row.players}</td>
					<td>{@html row.job}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<dl class="qa">
	{#each $t('guides.tri-alliance-clash.sections.roles.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

<h2>{$t('guides.tri-alliance-clash.sections.map.heading')}</h2>

<p>{$t('guides.tri-alliance-clash.sections.map.body')}</p>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 520"
			width="100%"
			height="auto"
			role="img"
			aria-label={$t('guides.tri-alliance-clash.images.map.alt')}
		>
			<title>{$t('guides.tri-alliance-clash.images.map.title')}</title>

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

			<text x="420" y="22" text-anchor="middle" font-size="11" fill="var(--muted)">
				{$t('guides.tri-alliance-clash.mapDiagram.upperHalf')}</text
			>
			<text x="420" y="508" text-anchor="middle" font-size="11" fill="var(--muted)">
				{$t('guides.tri-alliance-clash.mapDiagram.lowerHalf')}</text
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
				<text x="250" y="66">{$t('guides.tri-alliance-clash.mapDiagram.anchors.one')}</text>
				<text x="420" y="66">{$t('guides.tri-alliance-clash.mapDiagram.anchors.four')}</text>
				<text x="590" y="66">{$t('guides.tri-alliance-clash.mapDiagram.anchors.five')}</text>
				<text x="250" y="467">{$t('guides.tri-alliance-clash.mapDiagram.anchors.two')}</text>
				<text x="420" y="467">{$t('guides.tri-alliance-clash.mapDiagram.anchors.three')}</text>
				<text x="590" y="467">{$t('guides.tri-alliance-clash.mapDiagram.anchors.six')}</text>
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
				<text x="250" y="144">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.one')}</text>
				<text x="420" y="144">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.four')}</text>
				<text x="590" y="144">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.five')}</text>
				<text x="250" y="389">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.two')}</text>
				<text x="420" y="389">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.three')}</text>
				<text x="590" y="389">{$t('guides.tri-alliance-clash.mapDiagram.keypoints.six')}</text>
			</g>

			<g fill="var(--bg)" stroke="var(--border)">
				<rect x="272" y="246" width="56" height="28" rx="4" />
				<rect x="512" y="246" width="56" height="28" rx="4" />
			</g>
			<g font-size="10" fill="var(--muted)" text-anchor="middle">
				<text x="300" y="264">{$t('guides.tri-alliance-clash.mapDiagram.neutral')}</text>
				<text x="540" y="264">{$t('guides.tri-alliance-clash.mapDiagram.neutral')}</text>
				<text x="300" y="288">{$t('guides.tri-alliance-clash.mapDiagram.reactionTeams')}</text>
				<text x="540" y="288">{$t('guides.tri-alliance-clash.mapDiagram.reactionTeams')}</text>
			</g>

			<g fill="var(--bg)" stroke="var(--border)">
				<circle cx="342" cy="215" r="15" />
				<circle cx="498" cy="215" r="15" />
				<circle cx="420" cy="340" r="15" />
			</g>
			<g font-size="10" fill="var(--muted)" text-anchor="middle">
				<text x="342" y="219">{$t('guides.tri-alliance-clash.mapDiagram.routes.a29')}</text>
				<text x="498" y="219">{$t('guides.tri-alliance-clash.mapDiagram.routes.b29')}</text>
				<text x="420" y="344">{$t('guides.tri-alliance-clash.mapDiagram.routes.c29')}</text>
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
				<text x="420" y="257">{$t('guides.tri-alliance-clash.mapDiagram.temple.line1')}</text>
				<text x="420" y="271">{$t('guides.tri-alliance-clash.mapDiagram.temple.line2')}</text>
			</g>

			<text x="62" y="166" text-anchor="middle" font-size="11" fill="var(--text)">
				{$t('guides.tri-alliance-clash.mapDiagram.garrisons')}</text
			>
			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="16" y="180" width="92" height="30" rx="6" />
				<rect x="16" y="222" width="92" height="30" rx="6" />
				<rect x="16" y="264" width="92" height="30" rx="6" />
			</g>
			<g font-size="11" fill="var(--muted)" text-anchor="middle">
				<text x="62" y="200">{$t('guides.tri-alliance-clash.mapDiagram.garrisonIds.a24')}</text>
				<text x="62" y="242">{$t('guides.tri-alliance-clash.mapDiagram.garrisonIds.b24')}</text>
				<text x="62" y="284">{$t('guides.tri-alliance-clash.mapDiagram.garrisonIds.c24')}</text>
				<text x="62" y="312">{$t('guides.tri-alliance-clash.mapDiagram.unlock')}</text>
			</g>
		</svg>
	</div>
	<figcaption>{$t('guides.tri-alliance-clash.images.map.caption')}</figcaption>
</figure>

<h2>{$t('guides.tri-alliance-clash.sections.healingRotation.heading')}</h2>

<p>{$t('guides.tri-alliance-clash.sections.healingRotation.body')}</p>

<ol>
	{#each $t('guides.tri-alliance-clash.sections.healingRotation.steps') as item}
		<li>{@html item}</li>
	{/each}
</ol>

<figure class="diagram">
	<div class="diagram-scroll">
		<svg
			viewBox="0 0 800 296"
			width="100%"
			height="auto"
			role="img"
			aria-label={$t('guides.tri-alliance-clash.images.healingRotation.alt')}
		>
			<title>{$t('guides.tri-alliance-clash.images.healingRotation.title')}</title>

			<g fill="var(--surface)" stroke="var(--border)">
				<rect x="60" y="40" width="300" height="70" rx="8" />
				<rect x="440" y="40" width="300" height="70" rx="8" />
				<rect x="440" y="182" width="300" height="70" rx="8" />
				<rect x="60" y="182" width="300" height="70" rx="8" />
			</g>

			<g font-size="12">
				<text x="80" y="68" fill="var(--accent)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.one.number')}</text
				>
				<text x="102" y="68" fill="var(--text)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.one.title')}</text
				>
				<text x="102" y="90" fill="var(--muted)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.one.subtitle')}</text
				>

				<text x="460" y="68" fill="var(--accent)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.two.number')}</text
				>
				<text x="482" y="68" fill="var(--text)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.two.title')}</text
				>
				<text x="482" y="90" fill="var(--muted)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.two.subtitle')}</text
				>

				<text x="460" y="210" fill="var(--accent)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.three.number')}</text
				>
				<text x="482" y="210" fill="var(--text)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.three.title')}</text
				>
				<text x="482" y="232" fill="var(--muted)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.three.subtitle')}</text
				>

				<text x="80" y="210" fill="var(--accent)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.four.number')}</text
				>
				<text x="102" y="210" fill="var(--text)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.four.title')}</text
				>
				<text x="102" y="232" fill="var(--muted)">
					{$t('guides.tri-alliance-clash.healingDiagram.steps.four.subtitle')}</text
				>
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
				<text x="400" y="140">{$t('guides.tri-alliance-clash.healingDiagram.keypoint.line1')}</text>
				<text x="400" y="156">{$t('guides.tri-alliance-clash.healingDiagram.keypoint.line2')}</text>
			</g>

			<text x="400" y="284" text-anchor="middle" font-size="11" fill="var(--muted)">
				{$t('guides.tri-alliance-clash.healingDiagram.loop')}</text
			>
		</svg>
	</div>
	<figcaption>{$t('guides.tri-alliance-clash.images.healingRotation.caption')}</figcaption>
</figure>

<p>{$t('guides.tri-alliance-clash.sections.healingRotation.outro')}</p>

<h2>{$t('guides.tri-alliance-clash.sections.commonMistakes.heading')}</h2>

<ul>
	{#each $t('guides.tri-alliance-clash.sections.commonMistakes.items') as item}
		<li>{@html item}</li>
	{/each}
</ul>

<h2>{$t('guides.tri-alliance-clash.sections.faq.heading')}</h2>

<dl class="qa">
	{#each $t('guides.tri-alliance-clash.sections.faq.qa') as item}
		<dt>{item.q}</dt>
		<dd>{@html item.a}</dd>
	{/each}
</dl>

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
</style>
