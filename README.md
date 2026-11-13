# heymeister-web

Marketing website for **HeyMeister Elektro**: electrical inspections (DGUV V3, BetrSichV) as a monthly subscription per site.
Next.js (App Router) · TypeScript strict · Tailwind CSS · statically generated · deployed on Vercel.

> **Publicly reachable, not yet indexed.** Anyone can open the site. Until `PUBLIC_LAUNCH=true` it is `noindex`,
> `robots.txt` disallows everything, and the build refuses to launch with placeholders in the legal pages.

## Setup (under 5 minutes)

```bash
npm install
cp .env.example .env.local   # defaults are fine for local work
npm run dev                  # http://localhost:3000
```

Without `RESEND_API_KEY`, form submissions in development are printed to the server console instead of being emailed.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Launch check + production build |
| `npm test` | Unit tests (Vitest) |
| `npm run typecheck` / `npm run lint` | TypeScript / ESLint |
| `npm run check:launch` | Show remaining placeholders |
| `npm run generate:logo` | Regenerate wordmark, icons and favicon from Poppins Bold |

## Editing text and prices

All copy lives in typed files under [`content/`](content/). Components never contain copy.

| File | Contents |
| --- | --- |
| `content/site.ts` | Name, domain, contact data, trust signals, pilot programme, SEO defaults |
| `content/home.ts` | Landing page copy, logbook mockup example data |
| `content/pricing.ts` | Prices per size and tier, setup fees, volume discounts |
| `content/faq.ts` | FAQ (`short: true` = shown on the validation landing page) |
| `content/legal.ts` | Impressum and Datenschutz |
| `content/team.ts` | Team (only `published: true` is shown) |
| `content/navigation.ts` | Header/footer links per mode |

**Placeholders** are written in square brackets, e.g. `"[TELEFON]"`. They render as violet, dashed markers so nothing
unfinished goes unnoticed. Phone/email links are only created once the value is real.

## Brand (HeyMeister Brandbook v1, November 2026)

The brandbook is the reference for every design decision. Where it differs from the original build prompt, the brandbook wins.

- **Name:** "HeyMeister" (one word, no dot). In running text and as company name: "HeyMeister Elektro".
- **Wordmark:** Poppins Bold, letter-spacing −3.5 %, exported as paths by `npm run generate:logo`
  ([`logo-paths.ts`](src/components/brand/logo-paths.ts), static files in [`public/brand/`](public/brand/)).
  "Hey" coral, "Meister" navy (white on navy; on coral "Hey" turns white). Minimum width 120 px, below that use the icon.
  Protective space: the height of the "H".
- **Icon:** "H" with a coral dot on a rounded square (radius 22 %): `icon-navy` (favicon, standard), `icon-koralle`, `icon-hell`.
  Never next to the wordmark.
- **Colours** ([`tokens.ts`](src/styles/tokens.ts), also as CSS variables `--hm-*`): Koralle `#E4572E`, Koralle-Dunkel `#C4461F`,
  Koralle-Hell, Navy `#14213D`, Navy-Hell, Papier `#FBFBF8`, Fläche-2. Status colours are separate from the brand;
  focus ring blue `#1F4FD8`. Ratio 80 % paper/white, 15 % navy, 5 % coral.
- **Type:** Poppins 700 for display and headings, Inter 400/600 for body, tables and forms, JetBrains Mono 500 for measurements,
  IDs and dates in tables. Always tabular figures. Scale: display-xl 64/68, display-l 44/50, heading 28/34, subheading 20/28,
  body 16/24, small 14/20, label 12/16 (uppercase, 0.08 em), data mono 14/20. Body text max. 65 characters.
- **Components:** primary button coral, hover coral-dark, radius 10 px; secondary with navy border; never two primary buttons
  side by side. Cards white on paper, 1 px border, radius 16 px, padding 24 px, no shadow. Tables: head in Fläche-2 with labels,
  numbers right-aligned in mono, status as pill with a word.
- **Language:** "Sie" for customers, "Du" for applicants and the team. No exclamation marks, no "Jetzt", "Sofort", "Revolutionär".
  "kann kürzen", never "wird kürzen". Defect classes 1–3 are explained where they first appear.
- **Never:** symbols (lightning bolts, tools, helmets), yellow/black, a dot after the name, gradients, shadows, outlines, emojis.

**Accessibility notes.** Coral reaches 3.6:1 with white, which WCAG only allows for large text. Button labels are therefore
set in 19 px bold (counts as large text). Small accent text uses Koralle-Dunkel; on navy it uses Koralle-Hell. The blue focus
ring turns white on navy, where blue would not reach 3:1. `tests/basics.test.ts` checks every colour pair.

Because `text-base` is Tailwind's font-size utility, the navy base colour is `text-ink` for text and `bg-base`/`border-base`
elsewhere.

## Site modes

`SITE_MODE=validation` (default): one landing page with jump links, plus Impressum, Datenschutz and the thank-you page.
`SITE_MODE=full`: all pages (being built in later phases). Both modes use the same components and content.

Switch by setting `SITE_MODE=full` in Vercel and redeploying (values are baked in at build time).

## Visibility and protection

- `PUBLIC_LAUNCH` not `true` → `<meta name="robots" content="noindex, nofollow">`, `X-Robots-Tag` header,
  `robots.txt` with `Disallow: /`, empty sitemap.
- The site is public by default. There is no password gate unless you opt in.
- Optional preview password: set `PREVIEW_AUTH=true` **and** `PREVIEW_PASSWORD` to require HTTP Basic Auth
  (see `src/proxy.ts`). If either is missing, the site stays open. Vercel Deployment Protection is configured
  separately in the Vercel dashboard.
- `npm run build` runs `scripts/check-launch.ts`: with `PUBLIC_LAUNCH=true` the build **fails** if `content/legal.ts` still
  contains placeholders, and warns about placeholders elsewhere.

## Lead form

`POST /api/lead` (`src/app/api/lead/route.ts`, logic in `src/lib/lead-handler.ts`):
Zod validation (shared with the client), honeypot, minimum fill time of 3 s, rate limit per IP (Upstash if configured,
in-memory otherwise), email via Resend, optional CRM webhook signed with HMAC-SHA256
(`X-HeyMeister-Signature: sha256=<hex>` over `<timestamp>.<body>`, timestamp in `X-HeyMeister-Timestamp`).
A failing webhook never affects the visitor.

## Investor data room (`/dataroom`)

Private area for investor materials: an admin creates personal logins, uploads decks and documents, decides who sees what,
and sees who viewed or downloaded what. It is not linked from the public site; share the URL directly.

**Stack:** Supabase (region Frankfurt) for login, database and private file storage. Files are only reachable through
signed URLs that expire after 60 seconds, created after a session and permission check (`/dataroom/files/[id]`). All tables
have Row Level Security without policies, so the browser cannot read anything directly; the server uses the secret key after
checking the role. The data room is always `noindex`, excluded in `robots.txt`, has no analytics and is exempt from
the optional preview password (it has its own login).

### Setup (about 10 minutes)

1. Create a project at supabase.com, region **Frankfurt (eu-central-1)**.
2. SQL Editor → paste [`supabase/migrations/0001_dataroom.sql`](supabase/migrations/0001_dataroom.sql) → Run.
3. Settings → API: copy URL, publishable key and secret key into `.env.local` (and later into Vercel):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`.
4. Authentication → Sign In / Providers: keep Email enabled, **disable "Allow new users to sign up"**
   (accounts are only created by admins).
5. Create the first admin: `npm run dataroom:create-admin -- --email you@example.de --name "Vorname Nachname"`.
   The password is printed once.
6. Sign in at `/dataroom/login`.

### Use

- **Zugänge:** name, e-mail, company, optional expiry date, role. A password is generated and shown once, with a ready-made
  message to send. "Neues Passwort", "Sperren" (also ends open sessions) and "Löschen" per person.
- **Dokumente:** PDF, PPTX, XLSX, DOCX, CSV, PNG, JPG, MP4 up to 50 MB (Supabase free plan). Uploads go straight from the
  browser to storage. Visible to all investors or to selected ones; editable later.
- **Aktivität:** logins, views and downloads per person (no IP addresses). Admin previews are not logged.

**Limits:** no watermarking and no page-level tracking (would need files to pass through the server). Downloaded files can be
forwarded; the log shows who downloaded what. Add the data room to the privacy policy before inviting external investors.

## Privacy

Self-hosted fonts (Poppins, Inter, JetBrains Mono), no Google services, no cookies. Plausible is proxied through `/stats/*`, so the browser makes no
third-party request. The booking widget (`BOOKING_URL`) loads only after a click.

## Launch checklist

- [ ] Approval for public communication is in place
- [ ] Operator defined; Impressum and Datenschutz complete and legally reviewed
- [ ] Meister and Handwerksrolle statements match the operator
- [ ] Site sizes and Basis/Plus difference defined
- [ ] Real photos of Leon and the testing equipment
- [ ] References only with written approval
- [ ] Domain connected, `PUBLIC_LAUNCH=true`, `PREVIEW_AUTH` not set
