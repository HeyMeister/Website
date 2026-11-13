# heymeister-web

Marketing website for **HeyMeister Elektro**: electrical inspections (DGUV V3, BetrSichV) as a monthly subscription per site.
Next.js (App Router) · TypeScript strict · Tailwind CSS · statically generated · deployed on Vercel.

> **Not public yet.** Until `PUBLIC_LAUNCH=true` the site is `noindex`, `robots.txt` disallows everything,
> and the build refuses to launch with placeholders in the legal pages.

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
| `npm run generate:logo` | Regenerate wordmark paths and favicon from Inter Bold |

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

## Design tokens

Colours are defined once in [`src/styles/tokens.ts`](src/styles/tokens.ts). Tailwind exposes them as utilities and as CSS
variables on `:root` (`--hm-accent`, `--hm-accent-rgb`, …) for reuse in Ops engine and CRM. `tests/basics.test.ts`
fails if a text/background pair drops below WCAG AA (4.5:1).

- Brand accent `#E4572E` is for the logo, dots, icons and large display text only. It is too light for small text, so
  primary buttons use `accent-strong` (`#CC4620`, white text) and small accent text on dark uses `accent-on-dark`.
- Because `text-base` is Tailwind's font-size utility, the base colour is `text-ink` for text and `bg-base`/`border-base`
  elsewhere.

## Site modes

`SITE_MODE=validation` (default): one landing page with jump links, plus Impressum, Datenschutz and the thank-you page.
`SITE_MODE=full`: all pages (being built in later phases). Both modes use the same components and content.

Switch by setting `SITE_MODE=full` in Vercel and redeploying (values are baked in at build time).

## Visibility and protection

- `PUBLIC_LAUNCH` not `true` → `<meta name="robots" content="noindex, nofollow">`, `X-Robots-Tag` header,
  `robots.txt` with `Disallow: /`, empty sitemap.
- Enable **Vercel Password Protection** (Project → Settings → Deployment Protection). As a second layer, set
  `SITE_PASSWORD` to require HTTP Basic Auth (see `src/proxy.ts`).
- `npm run build` runs `scripts/check-launch.ts`: with `PUBLIC_LAUNCH=true` the build **fails** if `content/legal.ts` still
  contains placeholders, and warns about placeholders elsewhere.

## Lead form

`POST /api/lead` (`src/app/api/lead/route.ts`, logic in `src/lib/lead-handler.ts`):
Zod validation (shared with the client), honeypot, minimum fill time of 3 s, rate limit per IP (Upstash if configured,
in-memory otherwise), email via Resend, optional CRM webhook signed with HMAC-SHA256
(`X-HeyMeister-Signature: sha256=<hex>` over `<timestamp>.<body>`, timestamp in `X-HeyMeister-Timestamp`).
A failing webhook never affects the visitor.

## Privacy

Self-hosted Inter, no Google services, no cookies. Plausible is proxied through `/stats/*`, so the browser makes no
third-party request. The booking widget (`BOOKING_URL`) loads only after a click.

## Launch checklist

- [ ] Approval for public communication is in place
- [ ] Operator defined; Impressum and Datenschutz complete and legally reviewed
- [ ] Meister and Handwerksrolle statements match the operator
- [ ] Site sizes and Basis/Plus difference defined
- [ ] Real photos of Leon and the testing equipment
- [ ] References only with written approval
- [ ] Domain connected, `PUBLIC_LAUNCH=true`, password protection off
