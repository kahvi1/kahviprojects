# Kahvi: portfolio & consulting site

A single-page site that shows my current and past projects, my TabPFN research and the consulting services I offer. Built with Vite, React, TypeScript and Tailwind CSS v4, and deployed to Vercel as a static SPA.

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

## Theme

The site is dark by default and follows the visitor's system setting until they pick a theme with the toggle; the choice is saved in `localStorage`. Colours are CSS variables defined for both themes in [`src/index.css`](src/index.css).
