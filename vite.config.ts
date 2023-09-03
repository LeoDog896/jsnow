import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
const prefix = `monaco-editor/esm/vs`;
import generateSitemap from 'vite-plugin-pages-sitemap';

generateSitemap({ hostname: 'https://now.js.org/', routes: ['/', '/index.html'] });

const config: UserConfig = {
	plugins: [sveltekit()]
};

export default config;
