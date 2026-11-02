# Rakesh Naraboina — Portfolio

A dark, minimal single-page developer portfolio built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4** and **Framer Motion**.

Inspired by the section flow of [avinash-singh.in](https://www.avinash-singh.in/): hero → about → experience → tech stack → projects → contact.

The motion and depth layer is ported from [5araang.in](https://www.5araang.in/) and its [Nextjs-cinematic-portfolio](https://github.com/5araang/Nextjs-cinematic-portfolio) repo (MIT), rebuilt for React + Vite. The background engine mirrors their `VideoScrub.jsx`: a forward clip plus a reversed clip, velocity thresholds for freeze / seek / play, and a sliding still stack on phones.

## Cinematic layer

| Effect | Where |
| ------ | ----- |
| Lenis smooth scroll, synced to GSAP ScrollTrigger | `src/lib/smooth-scroll.ts` |
| White cursor dot that inverts into a large disc over links (`mix-blend-mode: difference`) | `src/components/CustomCursor.tsx` |
| Scroll-scrubbed 3D render: forward + reversed video, velocity-aware | `src/components/CinematicBackground.tsx` |
| Sliding image stack on phones, reduced motion and data-saver | `src/components/CinematicBackground.tsx` |
| Holographic 3D tilt card with the "Let's talk" CTA in About | `src/components/ProfileCard.tsx` + `profile-card.css` |
| Blur-in words, section dissolve, film grain | `BlurText.tsx`, `SectionFade.tsx`, `.grain-overlay` |

Everything respects `prefers-reduced-motion`: smooth scrolling, the cursor, the tilt card and the section fades all switch off and the page falls back to plain scrolling with the poster frame.

## Background video

`public/videos/scene.mp4` — the 3D character render (2552×1440, 60 fps, 15.2 s) taken from the reference project. Note that the MIT license covers that repo's **code**, not its footage: the render belongs to its author, so replace it with your own asset before publishing commercially. `scene-rev.mp4` is the same clip reversed, generated locally so upward scrolling can play the scene forwards instead of seeking backwards (which stutters on most browsers).

The render keeps its warm orange key light; a light CSS grade (`brightness + contrast + saturate`) plus the page veils blend it into the dark theme.

How the desktop scrub works:

1. Scroll progress up to the contact section maps to the clip timeline.
2. Almost no scroll → the current frame is pinned.
3. Slow scroll → the matching copy seeks frame by frame.
4. Fast scroll → the matching copy plays at up to 8× so the scene follows the gesture.
5. Scrolling down shows the forward copy; scrolling up swaps to the reversed copy.

Phones get five stills cut from the render that slide vertically as the next section arrives, which is much lighter than downloading both clips. The stills are raw frames and receive the same CSS `GRADE` as the video, so the two always match.

- **Swap the clip:** drop your render at `public/videos/scene.mp4` (15–20 s, 60 fps, ideally under ~10 MB) and regenerate the reversed copy plus the stills:
  ```bash
  # reversed copy (buffers the clip in RAM; chunk it on low-memory machines)
  ffmpeg -i public/videos/scene.mp4 -vf reverse -an -c:v libx264 -preset veryfast -crf 20 \
    -pix_fmt yuv420p -movflags +faststart public/videos/scene-rev.mp4

  # five stills: poster + the four section layers
  ffmpeg -ss 0    -i public/videos/scene.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 public/img/bg-poster.jpg
  ffmpeg -ss 3    -i public/videos/scene.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 public/img/bg-1.jpg
  ffmpeg -ss 6    -i public/videos/scene.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 public/img/bg-2.jpg
  ffmpeg -ss 9.5  -i public/videos/scene.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 public/img/bg-3.jpg
  ffmpeg -ss 15   -i public/videos/scene.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 public/img/bg-4.jpg
  ```
  `reverse` holds every decoded frame in memory, so at 1440p60 a 15 s clip needs ~5 GB. On a small machine, reverse it in 2 s chunks and concatenate them in reverse order.
- **Change the grade:** edit `GRADE` in `src/components/CinematicBackground.tsx`. The stills are ungraded frames, so the filter is applied to the image layers **and** the videos — keep both.
- **Disable the background:** remove `<CinematicBackground />` from `src/App.tsx`.
- **Show video on mobile too:** change `MOBILE_QUERY` in `CinematicBackground.tsx` (the image stack is the default because it is ~5× lighter).

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

Drop your image at `public/img/profile.jpg`. It is used in the holographic 3D tilt card in the About section — a portrait crop works best (`object-[52%_22%]` is set in `src/components/profile-card.css`).

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
- The custom cursor only hides the native one on `pointer: fine` devices, and never inside inputs, selects or textareas
- Lazy-loaded images and SVG icons (no icon font)
- Desktop preloads the 8.5 MB forward clip; the 9.1 MB reversed copy is warmed 3 s after first paint
- Phones, reduced-motion and data-saver users never download either clip
- ~184 kB gzipped JS, ~11 kB gzipped CSS (GSAP + Lenis add ~53 kB gzipped)
