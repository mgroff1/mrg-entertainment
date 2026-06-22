import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use the static adapter instead of the auto adapter
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // Essential for GitHub pages if a route isn't directly matched
			precompress: false,
			strict: true
		})
	}
};

export default config;