import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import generateSitemap from 'vite-plugin-pages-sitemap';

generateSitemap.default({ hostname: 'https://now.js.org/', routes: ['/', '/index.html'] })

const config: UserConfig = {
	plugins: [
		sveltekit(),
	]
};

export default config;