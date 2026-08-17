# danny-alvarado-fitness

Static Astro site for Danny Alvarado Fitness — Hyrox personal training.

## Local development

```bash
pnpm install
pnpm run dev
```

Open the URL Astro prints (usually http://localhost:4321).

```bash
pnpm run build       # production build → dist/
pnpm run preview     # preview the production build locally
pnpm run preview:cf  # build + preview via Wrangler (Cloudflare)
```

## Deploy (Cloudflare Workers + GitHub)

Deploys via Cloudflare Workers Builds connected to this GitHub repo.

In **Workers & Pages → your project → Settings → Builds**:

| Setting | Value |
|--------|--------|
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy --config wrangler.jsonc --no-autoconfig` |
| Root directory | `/` (repo root) |

`--no-autoconfig` is required: Wrangler otherwise detects Astro and tries to install `@astrojs/cloudflare` (SSR) even when `wrangler.jsonc` already defines a static assets deploy.

After the first successful deploy, update `site` in `astro.config.mjs` to your live `*.workers.dev` or custom domain URL so sitemap and Open Graph URLs are correct.

## Customisation

- Brand colours: black `#000000`, yellow `#ffe500`
- Business facts: `src/data/business.ts`
- Training gallery labels: `src/data/gallery.ts`
- Reviews: `src/data/reviews.ts`
- Pricing: `src/data/pricing.ts`
- FAQ: `src/data/faq.ts`
- Drop photos into `src/assets/images/` when ready, then wire them in the section components
