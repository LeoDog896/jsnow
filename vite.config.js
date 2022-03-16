import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from 'vite-plugin-pwa'
import generateSitemap from 'vite-plugin-pages-sitemap'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "buffer": "buffer"
    }
  },
  plugins: [
    svelte(),
	  generateSitemap({ hostname: "https://now.js.org/", routes: ["/", "/index.html"] }),
    injectProcessEnv({ 
      BABEL_8_BREAKING: 'true'
    })
  ],
});
