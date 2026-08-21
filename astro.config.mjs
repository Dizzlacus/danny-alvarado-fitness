import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const deployTarget = process.env.DEPLOY_TARGET === "github-pages" ? "github-pages" : "production";

const deploy = {
  // Project site: https://dizzlacus.github.io/the-playground/
  "github-pages": {
    site: "https://dizzlacus.github.io",
    base: "/the-playground/",
  },
  // Cloudflare Workers / custom domain. Set SITE_URL when the live domain is ready.
  production: {
    site: process.env.SITE_URL || "https://the-playground.workers.dev",
    base: "/",
  },
}[deployTarget];

export default defineConfig({
  site: deploy.site,
  base: deploy.base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
