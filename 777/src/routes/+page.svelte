<script lang="ts">
	import { base } from '$app/paths';
	import { sections } from '$lib/nav';
</script>

<h1>Kingshot 777</h1>
<p>Guides, tier lists, and build orders. Pick a topic from the sidebar or start below.</p>

{#each sections as section (section.title)}
	<h2>{section.title}</h2>
	<ul>
		{#each section.items as item (item.slug)}
			<li><a href="{base}/guides/{item.slug}">{item.title}</a></li>
		{/each}
	</ul>
{/each}

