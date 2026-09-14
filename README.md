# Samantha's Magical 7th Birthday

A mobile-first, interactive birthday invitation built with Next.js, React, TypeScript, Tailwind CSS, GSAP, AOS, and Canvas Confetti. The project exports to a fully static site for Vercel or GitHub Pages.

## Project structure

```text
.
|-- .github/workflows/deploy.yml   # GitHub Pages deployment
|-- public/images/                 # Replaceable portrait and gallery art
|-- samples/                       # Original visual references
|-- src/
|   |-- app/                       # App Router page, metadata, and global styles
|   |-- components/                # Invitation sections and interactions
|   |-- hooks/                     # Web Audio birthday melody
|   `-- lib/event-data.ts          # Event, program, and placeholder content
|-- next.config.ts                 # Static export and Pages base path
|-- package.json
`-- tsconfig.json
```

## Install and run

Node.js 20.9 or later is required. Node.js 24 LTS is recommended.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production checks:

```bash
npm run lint
npm run build
```

The static production site is written to `out/`.

## Main dependencies

- `next`, `react`, `react-dom`: application framework and UI runtime
- `tailwindcss`, `@tailwindcss/postcss`: utility CSS pipeline
- `gsap`: hero and mouse-follow motion
- `aos`: scroll-triggered section reveals
- `canvas-confetti`: lightweight celebration effects
- `lucide-react`: accessible interface icons

The Happy Birthday instrumental is synthesized with the browser Web Audio API, so it does not autoplay and does not require a licensed audio file or external CDN.

## Deploy to Vercel

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Keep the detected framework as Next.js and deploy. No environment variables are required.

The project uses static export, which Vercel serves directly.

## Deploy to GitHub Pages

1. Push the repository to a `main` branch on GitHub.
2. In repository **Settings > Pages**, set **Source** to **GitHub Actions**.
3. The included workflow builds and deploys `out/` automatically.

`next.config.ts` detects GitHub Actions and applies the repository name as the base path. Vercel and local builds remain rooted at `/`.

## Future customization

### Replace Samantha's portrait

Replace `public/images/samantha-placeholder.svg` with Samantha's image while keeping the same filename, or update the `src` inside `src/components/InvitationExperience.tsx`. A square or vertical image at least 1200px tall works best. Keep the existing `alt` text accurate.

### Update gallery photos

Replace `public/images/gallery-1.svg` through `gallery-6.svg`, then update the paths and descriptions in `src/lib/event-data.ts` if the file extensions or meanings change. The gallery already supports lazy loading, keyboard navigation, zoom, and mobile swipe.

### Change event details

Edit `eventDetails` and `programItems` in `src/lib/event-data.ts`. The countdown uses an ISO timestamp with the Philippine UTC offset (`+08:00`). Update page metadata in `src/app/layout.tsx` if the title changes.

### Add the real 7 Gifts, 7 Roses, and 7 Dances lists

Edit `giftCards`, `roseCards`, and `danceCards` in `src/lib/event-data.ts`. Keep seven objects in each collection. The cards resize and become a swipeable rail on small screens automatically.

### Connect RSVP submissions

The current form demonstrates validation and a success state but deliberately stores no personal information. Replace the submit handler in `src/components/RSVPForm.tsx` with Formspree, a Google Apps Script endpoint, or a private API. The existing **RSVP Now** button opens the supplied Google Sheet in a new tab; update `rsvpUrl` and `contacts` in `src/lib/event-data.ts`.

### Add the parents' message

Replace `Message coming soon.` in `src/components/InvitationExperience.tsx`. The nearby source comment marks the exact location.

## Asset note

All shipped illustration assets are original placeholders stored locally in `public/images`. The supplied files in `samples/` are retained as visual references only and are not bundled into the website. Use only photos and branded character assets you have permission to publish.