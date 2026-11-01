# Rakesh Naraboina — Portfolio

A dark, minimal single-page developer portfolio built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4** and **Framer Motion**.

Inspired by the section flow of [avinash-singh.in](https://www.avinash-singh.in/): hero → about → experience → tech stack → projects → contact.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with HMR        |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run oxlint                           |

## Editing content

**All copy lives in one file:** [`src/data/portfolio.ts`](src/data/portfolio.ts)

- `profile` — name, role, tagline, headline, email, LinkedIn, location, availability
- `about` — bio paragraphs, education, highlight stats
- `experience` — companies, roles, periods, bullet points
- `techStack` — grouped skill chips
- `projects` — cards (title, category, description, highlights, tags, links)
- `navLinks` — navigation items

Components only render this data, so you rarely need to touch them.

### Adding a profile photo

Drop your image at `public/img/profile.jpg`. It is displayed in a 4:5 crop — a portrait photo works best. Adjust the crop with the `object-[52%_18%]` class in `src/components/About.tsx`.

### Adding project screenshots

1. Save images to `public/img/` (e.g. `public/img/project-1.png`).
2. In `src/data/portfolio.ts`, set `image: '/img/project-1.png'` on the project.

Without an image, the card automatically shows a generated gradient panel with the project number.

### Adding GitHub / live links

There are no public repo links in the current content, so the buttons are hidden. Add them in `src/data/portfolio.ts`:

```ts
// profile
github: 'https://github.com/your-handle',

// each project
github: 'https://github.com/your-handle/repo',
live: 'https://your-demo.vercel.app',
```

Buttons render automatically when a value is present.

## Enabling the contact form (Formspree)

1. Create a free form at [formspree.io](https://formspree.io/) and copy the form ID (the part after `/f/`).
2. Create a `.env` file in the project root:

```bash
VITE_FORMSPREE_ID=your_form_id
```

3. Restart `npm run dev`.

Until it is configured, submitting the form shows a friendly notice with a `mailto:` fallback. See `.env.example`.

## Deploying

**Vercel** — import the repo; the defaults work (build `npm run build`, output `dist`).

**Netlify** — build command `npm run build`, publish directory `dist`.

**GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.ts` before building.

Remember to add `VITE_FORMSPREE_ID` to the hosting provider's environment variables.

## Accessibility & performance notes

- Semantic landmarks, a skip link, and a single `h1`
- Visible focus rings and `prefers-reduced-motion` support
- Lazy-loaded images and SVG icons (no icon font)
- ~130 kB gzipped JS, ~8 kB gzipped CSS
