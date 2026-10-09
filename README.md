# Kahvi: portfolio & consulting site

A single-page site that shows my current and past projects, my TabPFN research and the consulting services I offer. Built with Vite, React, TypeScript and Tailwind CSS v4, and deployed as a static SPA to Vercel or Cloudflare Workers.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Edit the content

All text lives in [`src/content/site.ts`](src/content/site.ts): profile and links, hero stats, featured projects, the "More projects" list, consulting services, engagement models, process steps and the About section. Components only handle layout, so most updates are a change to that one file.

- **Featured projects** (`featuredProjects`) render as large cards. Each can have `metrics`, a `publication` and/or a `flow` (pipeline steps) shown in the side panel.
- **Other projects** (`otherProjects`) render as compact cards with a Current/Past filter.
- Page title, description and social preview tags are in [`index.html`](index.html).

## Contact form (Formspree)

The form posts to [Formspree](https://formspree.io) when `VITE_FORMSPREE_FORM_ID` is set. Without it, submitting opens the visitor's email app with the message pre-filled, addressed to the email in `site.ts`.

1. Create a form on Formspree and copy its ID (the part after `https://formspree.io/f/`).
2. Locally: copy `.env.example` to `.env.local` and fill in the ID.
3. On Vercel: **Project → Settings → Environment Variables**, add `VITE_FORMSPREE_FORM_ID`, then redeploy. Vite inlines the value at build time.

## Deploy to Vercel

1. Import this repository in Vercel. The Vite preset is detected automatically (build command `npm run build`, output directory `dist`).
2. Add the `VITE_FORMSPREE_FORM_ID` environment variable (optional, see above).
3. Deploy.

[`vercel.json`](vercel.json) rewrites unknown paths to `index.html` so the SPA always loads, and serves the hashed files in `/assets` with a long-lived cache header.

## Deploy to Cloudflare Workers

The site also deploys as an assets-only Cloudflare Worker (no server code). [`wrangler.jsonc`](wrangler.jsonc) serves `dist/` and returns `index.html` for unknown paths; [`public/_headers`](public/_headers) adds the long-lived cache header for `/assets/*`.

**From your machine**

```bash
npx wrangler login   # once, opens the browser
npm run deploy       # builds, then uploads dist/ with wrangler deploy
```

The first deploy prints the URL, `https://kahvi-portfolio.<your-subdomain>.workers.dev`. To use the Formspree form, put `VITE_FORMSPREE_FORM_ID` in `.env.local` before deploying; it's baked in at build time. Run `npm run cf:dev` to preview locally in the Workers runtime.

**From GitHub (deploys on every push)**

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository**, and pick `kahviprojects`.
2. Build command `npm run build`, deploy command `npx wrangler deploy`, production branch `main`.
3. Add `VITE_FORMSPREE_FORM_ID` under the **build** variables (a runtime variable won't reach the browser bundle).

To use your own domain: Worker → **Settings** → **Domains & Routes** → **Add** → **Custom domain** (the domain's DNS must be on Cloudflare).

## Theme

The site is dark by default and follows the visitor's system setting until they pick a theme with the toggle; the choice is saved in `localStorage`. Colours are CSS variables defined for both themes in [`src/index.css`](src/index.css).
