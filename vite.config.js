import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import generateSitemap from 'vite-plugin-pages-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		generateSitemap({ hostname: 'https://now.js.org/', routes: ['/', '/index.html'] })
	]
});
