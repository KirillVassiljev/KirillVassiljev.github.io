import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				fallback: '404.html'
			}),

			// The repo is named <user>.github.io, so the site is served from the root.
			// BASE_PATH stays as an escape hatch if it is ever moved to a project repo.
			paths: {
				base: process.env.BASE_PATH ? `/${process.env.BASE_PATH.replace(/^\/+/, '')}` : ''
			}
		})
	]
});
