# krisdexheimer.com

Author website for Kris Dexheimer, built around *Distilled in America*, with room to grow for future books and work.

**Status:** the homepage and the Upside of Down page structure are built. Several items still need client content, client approval or service configuration. `npm run check:launch` lists them all and must pass before launch.

## Stack

- React 19 + TypeScript, bundled with Vite (multi-page: homepage plus secondary pages)
- oxlint for linting

No other runtime dependencies.

## Commands

Requires Node.js 22.18+ (developed on Node 24, which runs the TypeScript launch check directly).

```sh
npm install
npm run dev             # production view: approved content only
npm run dev:review      # review view: drafts and missing-content notes shown
npm run build           # production build -> dist/
npm run build:review    # review build -> dist-review/ (includes unpublished pages)
npm run preview         # serve dist/
npm run preview:review  # serve dist-review/
npm run lint
npm run check:launch    # content inventory + launch blockers (exit 1 while blocked)
```

## Content workflow

All copy lives in `src/content/site.ts`. Each item is registered in the content inventory (`src/content/status.ts`) as one of:

| Status | Production build | Review build |
|---|---|---|
| `approved(…)` | Shown | Shown |
| `draft(…)` | Hidden | Shown, marked “Draft for Kris’s approval” with its source |
| `missing(…)` | Hidden (optional blocks are omitted cleanly) | “Awaiting content” note |

When Kris approves a draft, change `draft(` to `approved(`. When content arrives, replace `missing(` with `approved(` and the value.

- **Form endpoints:** `src/config/site.ts`. While an endpoint is `null`, its form doesn't render in production. In review mode it validates input but states plainly that nothing was sent.
  - Newsletter: pending. Kris has no newsletter account yet (confirmed 2026-11-20); no provider is set up.
  - Contact: the Contact section shows Kris's confirmed email as a mailto link. The contact form code is kept but displayed (in any mode) only once `contactEndpoint` is set, so the endpoint isn't a launch requirement.
- **Deferred sections:** `src/config/sections.ts`. The Book Club Kit and Spirited are deferred for this iteration, and the Newsletter section is hidden until an account is connected (2026-11-20): hidden in production and review builds, nav links removed, code and content kept. `check:launch` lists their items as deferred, not blockers. Set `active: true` to bring one back.
- **Secondary page publishing:** `src/config/pages.ts`. The Upside of Down page is built only in review mode until `published: true`.
- **Styles and design tokens:** `src/styles/global.css`. The interface uses only charcoal, cream, neutral greys and coral. Gold appears only inside the cover artwork.

## Folder organization

```
index.html, upside-of-down/index.html   Page entry points
src/
  sections/      Homepage sections
  components/    Header, footer, accordion, forms, content/status renderers
  pages/         HomePage, UpsideOfDownPage
  content/       site.ts (all copy) and status.ts (inventory)
  config/        navigation, integrations, page publishing, review mode
  styles/        global.css
scripts/         check-launch.ts
public/          Served as-is: cover, author photos, favicons, social image, approved downloads
private/         Never served or committed: manuscripts, documents, correspondence, references
incoming/        Drop zone for newly supplied files (also private)
```

`private/` and `incoming/` are excluded from git, blocked from the dev server and never copied into a build. The launch check also scans `dist/` for documents.

## Assets

| Asset | Location | Status |
|---|---|---|
| Original cover, 1838×2775 | `public/book-image.png` | Untouched master |
| Resized cover copies (720 and 1200 px) | `public/images/distilled-in-america-cover-*.jpg` | Used in the hero, same proportions |
| Social sharing image (1200×630) | `public/images/og-distilled.png` | Uses the unaltered cover |
| Author portrait | `public/Kristine Author Pic (1).jpg` | Used in About Kris |
| Red-door photo and three other photos | `public/` | Not used |
| Interim favicon (flask motif from the cover) | `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Interim, needs approval; not the kaha logo |
| Distilled manuscript, EARLY DRAFT (~20,000 words, supplied as `Distilled.pdf`) | `private/manuscripts/Distilled-in-America_manuscript_working-draft.pdf` | Identity verified by contents (see `private/manuscripts/MANUSCRIPT-IDENTIFICATION.md`). Its Ch. 15 “Who am I?” belongs to *The Upside of Down* per Kris. Drafts carry source records (file, section, PDF page, printed page, excerpt/selection/summary). Never place it in `public/`; `check:launch` fails if a document appears there or in `dist/` |
| Published Distilled text: unnumbered chapter “A Light in the Darkness”, from p. 71 | — | Missing (blocker for the 7.5% / “the two” explanation) |
| *The Upside of Down* files | — | Missing |
| kaha publishing logo, transparent (2508×2508 RGBA PNG) | `public/Kaha_Publishing_Logo png transparent.png` | Untouched master, supplied 2026-11-20; replaces the earlier opaque JPG. Alpha verified: fully transparent outside the badge |
| Resized logo copies (160 and 240 px, alpha preserved) | `public/images/kaha-logo-*.png` | Used in the footer at 80 px (72 px on mobile); same artwork and proportions |
| Red Rabbit logo reference | — | Missing |
