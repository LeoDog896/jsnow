import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
const prefix = `monaco-editor/esm/vs`;
import generateSitemap from 'vite-plugin-pages-sitemap';

generateSitemap.default({ hostname: 'https://now.js.org/', routes: ['/', '/index.html'] });

const config: UserConfig = {
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					jsonWorker: [`${prefix}/language/json/json.worker`],
					cssWorker: [`${prefix}/language/css/css.worker`],
					htmlWorker: [`${prefix}/language/html/html.worker`],
					tsWorker: [`${prefix}/language/typescript/ts.worker`],
					editorWorker: [`${prefix}/editor/editor.worker`]
				}
			}
		}
	}
};

export default config;
