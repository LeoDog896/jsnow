import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from 'vite-plugin-pwa'
import generateSitemap from 'vite-plugin-pages-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
	generateSitemap({ hostname: "https://now.js.org/", routes: ["/", "/index.html"] }),
    VitePWA({
      includeAssets: ['favicon.svg', 'robots.txt'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'jsnow',
        short_name: 'jsnow',
        description: 'A JS/TS evaulator and playground',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/logo.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
        ]
      }
    })
  ],
});
