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

The Happy Birthday instrumental is synthesized with the browser Web Audio API, starts automatically when browser policy permits, and does not require a licensed audio file or external CDN. If autoplay is blocked, the first page interaction starts it.

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

### Add the real seven-part tradition lists

Edit `traditionGroups` in `src/lib/event-data.ts`. Keep seven cards in each collection. The cards resize and become a swipeable rail on small screens automatically.

### Connect RSVP submissions

The RSVP form submits to a Google Apps Script web app. The script source is in `google-apps-script/Code.gs` and targets the assigned spreadsheet. On the first valid submission, it creates a private `RSVP Responses` tab with these columns:

`Timestamp`, `Submission ID`, `Name`, `Contact`, `Attendance`, `Guests`, `Adults`, `Kids`, and `Message`.

`Guests` stores the combined total of `Adults` and `Kids`. When the updated script receives its first submission, an existing seven-column response tab is migrated automatically by inserting the new breakdown columns without removing earlier responses.

To deploy the endpoint:

1. Open the assigned Google Spreadsheet as its owner, then select **Extensions > Apps Script**.
2. Replace the Apps Script editor contents with `google-apps-script/Code.gs` and save.
3. Select **Deploy > New deployment > Web app**.
4. Set **Execute as** to the spreadsheet owner and **Who has access** to **Anyone**.
5. Deploy, authorize spreadsheet access, and copy the deployed URL ending in `/exec`.
6. In the spreadsheet sharing settings, change **General access** to **Restricted** so only organizers can read responses.
7. For local development, copy `.env.example` to `.env.local` and replace the placeholder URL.
8. GitHub Pages builds use the deployed `/exec` URL configured as `NEXT_PUBLIC_RSVP_ENDPOINT` in `.github/workflows/deploy.yml`. Replace that value and rerun the deployment workflow after creating a new Apps Script deployment.

`NEXT_PUBLIC_RSVP_ENDPOINT` is intentionally public because browsers must call it. Never place Google credentials or OAuth tokens in a `NEXT_PUBLIC_` variable. Keep the spreadsheet itself restricted to organizers; the invitation no longer links guests directly to it.

The handler validates field lengths and attendance values, neutralizes formula-like text, deduplicates retries by submission UUID, serializes writes with `LockService`, and includes a honeypot plus minimum completion time for basic spam resistance.

### Add the parents' message

Replace `Message coming soon.` in `src/components/InvitationExperience.tsx`. The nearby source comment marks the exact location.

## Asset note

The Cinnamoroll party artwork in `public/images/cinnamoroll-party.png` was extracted from a supplied reference in `samples/`; the remaining shipped illustrations are original placeholders. Confirm permission to publish branded character artwork before deploying the invitation publicly.