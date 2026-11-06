# QR SOUND RECORDS — Label Website

> **QR CODE AS A PORTAL INTO MUSIC** — immersive 3D website for the independent
> electronic music label, built with React + TypeScript + Vite + Three.js
> (React Three Fiber) + Framer Motion + Tailwind CSS v4.

The centerpiece is an interactive 3D QR-style cube: each of its six faces is a
navigation section (Home, Releases, Artists, About, Contact, Search). The site
never relies on 3D alone — the header menu, mobile menu and footer always give
parallel access to every page.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
npx tsc -b         # type-check only
```

Node 18+ recommended.

---

## Project structure

```
api/
  demo-submission.ts        Vercel serverless endpoint (Resend e-mail delivery)
public/
  images/logo/              Label logo + avatar (OG image)
  images/releases/<slug>.jpg   One square cover per release (1400×1400 ideal)
  images/artists/<slug>.jpg    Optional artist portraits
src/
  data/
    releases.ts             Release catalogue (source of truth)
    artists.ts              Artist roster (source of truth)
    siteConfig.ts           Label name, contacts, socials, genres, cube settings
  components/
    cube/                   QRCube, CubeFace, CubeScene, CubeNavigation,
                            FallbackCube (CSS cube when WebGL is unavailable)
    releases/               Cards, grid, filters, player, generated covers
    artists/                Cards & grid
    search/                 ⌘K search overlay
    forms/                  Demo submission form
    layout/                 Header, MobileMenu, Footer, ScrollToTop
    ui/                     Button, Loader
  pages/                    Home, Releases, ReleaseDetails, Artists,
                            ArtistDetails, About, Contact, Search, NotFound
  lib/catalog.ts            Sorting/filtering/search + helpers
  hooks/                    useSearch, useMediaQuery, usePageMeta
  styles/                   variables.css (design tokens), globals.css
```

---

## Editing content

### Adding a release (2 steps)

1. **Add one entry** to `src/data/releases.ts`:

```ts
{
  id: "rel-027",
  slug: "my-new-release",          // used in the URL: /releases/my-new-release
  catalogNumber: "QRS 027",
  title: "My New Release",
  artists: ["QBAS"],               // display names, exact match with artists.ts
  releaseDate: "2026-05-01",       // ISO date
  genres: ["Melodic Techno"],
  status: "out-now",               // "out-now" | "upcoming"
  cover: "/images/releases/my-new-release.jpg",
  description: "Short editorial text…",
  tracks: [
    { title: "Main Cut", duration: "06:12" },        // audioUrl enables the player
    // { title: "Main Cut", audioUrl: "/audio/main-cut.mp3" }
  ],
  links: {
    bandcamp: "https://…", spotify: "https://…",     // only real links —
    beatport: "https://…", soundcloud: "https://…"   // missing platforms are hidden
  },
}
```

2. **Drop the cover** in `public/images/releases/my-new-release.jpg` (square,
   ≥1000px). If no file exists, a generated QR-style cover is rendered
   automatically — nothing breaks.

That's it. Cards, filters, search, sitemap of the Relases page, the home page
"Latest transmissions" section and the marquee all read from this one array.

### Adding an artist (1 step)

Add an entry to `src/data/artists.ts`:

```ts
{
  id: "art-xyz",
  slug: "xyz",
  name: "XYZ",                     // must match the name used in releases.artists
  bio: "…",
  genres: ["Melodic House"],
  links: { instagram: "https://…", soundcloud: "https://…" }, // optional
}
```

Releases are **derived automatically** — `artists: ["XYZ"]` on any release in
`releases.ts` ties the two together. Portraits in `public/images/artists/` are
optional: without one the site shows an abstract generated visual (no invented
photos of people).

### Replacing images

- Covers → `public/images/releases/<slug>.jpg` (match the `slug` exactly).
- Logo / OG avatar → `public/images/logo/` (also update `index.html` favicon
  path if you rename).
- Artist portraits → `public/images/artists/<slug>.jpg` and set
  `image: "/images/artists/<slug>.jpg"` in the artist entry.

### Editing label info

Everything operational lives in `src/data/siteConfig.ts`: email, social links,
tagline, location, genre accents, cube rotation speed, latest-release slug.
Some social URLs are marked `// TODO` — replace them with the real profiles.

### Adding a genre

1. Add the name to `siteConfig.genres` (display on home page) **and** start
   using it on releases — the Releases page filters are built from real usage.
2. Map an accent colour in `GENRE_ACCENTS` (`src/data/releases.ts`) and
   `siteConfig.genreAccents`.

---

## Email setup (demo submissions)

The form posts to `/api/demo-submission`, a Vercel serverless function that
sends an e-mail via [Resend](https://resend.com). **No API keys live in the
frontend.**

1. Create an API key at https://resend.com/api-keys
2. Verify your sending domain (or start with the onboarding sender).
3. Set the environment variables (locally in `.env`, in Vercel → Project →
   Settings → Environment Variables). A template is in `.env.example`:

| Variable          | Meaning                                              |
|-------------------|------------------------------------------------------|
| `RESEND_API_KEY`  | Secret API key from Resend                           |
| `CONTACT_EMAIL`   | Label inbox that receives demo submissions           |
| `FROM_EMAIL`      | Verified sender, e.g. `QR Sound <demos@yourdomain>`  |

Behaviour:

- Not configured / endpoint missing → the form shows a clear **"not
  configured"** state and never fakes success.
- Delivered → confirmation state with a "Submit another" action.
- Delivery error → error state with a retry message.

Spam protection: a hidden honeypot field plus full server-side re-validation.

---

## 3D cube notes

- Renders only on the home page (code-split Three.js chunk) — other pages stay
  light.
- Drag to spin (inertia + auto-rotate + cursor parallax); hover a face to see a
  DOM label; click to focus the face and navigate.
- `prefers-reduced-motion`: auto-rotation and satellites are reduced; the film
  grain animation is disabled.
- Tab hidden → render loop pauses.
- No WebGL → `FallbackCube`, a pure-CSS "unfolded cube" with the same six links.

Keyboard (site-wide): `/` or `⌘K` opens search, `Esc` closes it, `↑ ↓`
navigate results, `Enter` opens the selected result.

---

## Deploy

Any static host works. For Vercel (the `api/` folder is already set up):

```bash
vercel                     # follow the prompts
# then add RESEND_API_KEY / CONTACT_EMAIL / FROM_EMAIL in the dashboard
```

`vercel.json` already rewrites all routes to `/index.html` (SPA).

---

## Known placeholders (safe to delete)

- Catalog numbers of pre-2025 releases (`QRS 010`–`025`) are **demo values** —
  Bandcamp does not expose the real numbers; confirm with the label.
- All artist bios are marked `PLACEHOLDER BIO` and artist portraits are
  intentionally abstract generated visuals.
- Some label social URLs in `siteConfig.ts` are marked `// TODO`.
- QBAS "Stop Ignore It" (`QRS 026`) is the expected upcoming release; the cover
  file is not yet added (generated artwork shows in its place).
