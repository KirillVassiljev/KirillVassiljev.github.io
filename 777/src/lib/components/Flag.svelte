<script lang="ts">
	// Simplified circular flags. The parent clips to a circle, so each SVG only
	// needs to fill a 512×512 square.
	let { code, size = 22 }: { code: string; size?: number } = $props();
</script>

<span class="flag" style="width:{size}px;height:{size}px" aria-hidden="true">
	<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
		{#if code === 'en'}
			<rect width="512" height="512" fill="#b22234" />
			<g fill="#fff">
				<rect y="39.4" width="512" height="39.4" />
				<rect y="118.2" width="512" height="39.4" />
				<rect y="196.9" width="512" height="39.4" />
				<rect y="275.7" width="512" height="39.4" />
				<rect y="354.5" width="512" height="39.4" />
				<rect y="433.2" width="512" height="39.4" />
			</g>
			<rect width="205" height="275.7" fill="#3c3b6e" />
			<g fill="#fff">
				<circle cx="45" cy="55" r="11" />
				<circle cx="106" cy="55" r="11" />
				<circle cx="167" cy="55" r="11" />
				<circle cx="45" cy="138" r="11" />
				<circle cx="106" cy="138" r="11" />
				<circle cx="167" cy="138" r="11" />
				<circle cx="45" cy="221" r="11" />
				<circle cx="106" cy="221" r="11" />
				<circle cx="167" cy="221" r="11" />
			</g>
		{:else if code === 'zh'}
			<rect width="512" height="512" fill="#de2910" />
			<polygon
				fill="#ffde00"
				points="140,60 155.9,108.2 206.6,108.4 165.7,138.3 181.1,186.6 140,157 98.9,186.6 114.3,138.3 73.4,108.4 124.1,108.2"
			/>
		{:else if code === 'id'}
			<rect width="512" height="256" fill="#ce1126" />
			<rect y="256" width="512" height="256" fill="#fff" />
		{:else if code === 'tr'}
			<rect width="512" height="512" fill="#e30a17" />
			<circle cx="215" cy="256" r="115" fill="#fff" />
			<circle cx="250" cy="256" r="92" fill="#e30a17" />
			<polygon
				fill="#fff"
				points="335,211 345,242.25 377.8,242.1 351.2,261.25 361.5,292.4 335,273 308.5,292.4 318.8,261.25 292.2,242.1 325,242.25"
			/>
		{:else if code === 'pt'}
			<rect width="512" height="512" fill="#009c3b" />
			<polygon fill="#ffdf00" points="256,60 452,256 256,452 60,256" />
			<circle cx="256" cy="256" r="80" fill="#002776" />
		{:else if code === 'ar'}
			<rect width="512" height="512" fill="#006c35" />
			<rect x="120" y="248" width="272" height="12" rx="6" fill="#fff" />
			<rect x="150" y="300" width="200" height="14" rx="7" fill="#fff" />
			<rect x="345" y="295" width="26" height="24" rx="4" fill="#fff" />
		{/if}
	</svg>
</span>

<style>
	.flag {
		display: inline-block;
		flex: none;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15);
	}

	.flag svg {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
