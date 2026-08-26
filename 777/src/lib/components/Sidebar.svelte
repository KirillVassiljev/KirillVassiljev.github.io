<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { sections } from '$lib/nav';
</script>

<nav aria-label="Site sections">
	{#each sections as section (section.title)}
		<div class="group">
			<h2>{section.title}</h2>
			<ul>
				{#each section.items as item (item.slug)}
					{@const path = `/guides/${item.slug}`}
					<li>
						<a
							href="{base}{path}"
							aria-current={page.url.pathname.endsWith(path) ? 'page' : undefined}
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>

<style>
	nav {
		padding: 0.5rem 0 2rem;
	}

	.group + .group {
		margin-top: 1.5rem;
	}

	h2 {
		margin: 0 0 0.5rem;
		padding: 0 1.25rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: block;
		padding: 0.5rem 1.25rem;
		border-left: 2px solid transparent;
		color: var(--text);
		text-decoration: none;
		font-size: 0.95rem;
	}

	a:hover {
		background: var(--surface);
	}

	a[aria-current='page'] {
		border-left-color: var(--accent);
		background: var(--surface);
		color: var(--accent);
		font-weight: 600;
	}

	a:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
	}
</style>
