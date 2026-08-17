import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Update to your workers.dev or custom domain after the first Cloudflare deploy
  site: "https://danny-alvarado-fitness.workers.dev",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
