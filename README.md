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

## Deploy

`astro.config.mjs` picks URLs from `DEPLOY_TARGET`:

| Target | When | `site` | `base` |
|--------|------|--------|--------|
| `github-pages` | GitHub Actions on `main` | `https://dizzlacus.github.io` | `/danny-alvarado-fitness/` |
| `production` (default) | Cloudflare / `pnpm run build` | `SITE_URL` or `https://danny-alvarado-fitness.workers.dev` | `/` |

Preview the GitHub Pages build locally with `pnpm run build:pages`.

### GitHub Pages (preview)

Repo **Settings → Pages → Source** must be **GitHub Actions** (not “Deploy from a branch”). Pushes to `main` run `.github/workflows/deploy-pages.yml`.

### Cloudflare Workers (live)

In **Workers & Pages → your project → Settings → Builds**:

| Setting | Value |
|--------|--------|
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy --config wrangler.jsonc --no-autoconfig` |
| Root directory | `/` (repo root) |
| `SITE_URL` (optional) | Final custom domain, e.g. `https://www.example.com` |

`--no-autoconfig` is required: Wrangler otherwise detects Astro and tries to install `@astrojs/cloudflare` (SSR) even when `wrangler.jsonc` already defines a static assets deploy.

## Customisation

- Brand colours: black `#000000`, yellow `#ffe500`
- Business facts: `src/data/business.ts`
- Training gallery labels: `src/data/gallery.ts`
- Reviews: `src/data/reviews.ts`
- Pricing: `src/data/pricing.ts`
- FAQ: `src/data/faq.ts`
- Drop photos into `src/assets/images/` when ready, then wire them in the section components
