# JobMatch

JobMatch is the planned AI layer over job-listing platforms: employers paste
a listing, the model extracts the real requirements, and matches candidates
honestly.

See [DESIGN.md](./DESIGN.md) for the portfolio's shared design language —
read that before styling a new or revamped project.

## What's missing: the AI layer

This repo is a **UI prototype only**. Every screen — job posting tracker,
application monitor, user scheduler, analytics — renders structured mock
data so the shape of the product is real, but none of it is wired to a
real backend or model yet. Specifically not implemented:

- Listing ingestion (paste/import a real job posting)
- Requirement extraction (the actual AI layer the name refers to)
- Candidate matching/scoring logic
- Persisted jobs/applications/users data (currently mock arrays in each
  page, not database tables)
- Notifications/alerts beyond static UI

Auth, the dashboard shell, and the design system are real and shared with
the rest of the portfolio (see DESIGN.md); the job-matching domain logic is
not.

## Features

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase Authentication
- shadcn-style UI components (`button`, `card` in `src/components/ui/`)
  built with `class-variance-authority` + Radix primitives, following the
  shadcn conventions — there's no `components.json`/CLI setup, they're
  hand-written to match

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Set up your Supabase project and update the environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `NEXT_PUBLIC_REDIRECT_URL` | Yes | Auth redirect base URL (e.g. `http://localhost:3000`) |
| `E2E_TEST_EMAIL` | For `test:e2e` | Dedicated test account email for Playwright smoke tests |
| `E2E_TEST_PASSWORD` | For `test:e2e` | Dedicated test account password |

Authenticated E2E tests skip themselves if `E2E_TEST_EMAIL`/`E2E_TEST_PASSWORD`
aren't set. They're also needed as GitHub Actions secrets of the same names
for CI.

JobMatch shares its Supabase project (`master_db`) with the rest of the
portfolio — see `.env.example` and
`C:\Users\Taufik\project\scripts\setup-supabase-env.mjs` below for how
Production env vars get set without touching the Vercel dashboard by hand.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

```bash
npm test          # Jest unit tests
npm run test:watch  # Jest watch mode
npm run test:e2e     # Playwright end-to-end tests
```

Unit tests use Jest with `@testing-library/react` and `jest-environment-jsdom`.
End-to-end tests use Playwright (`@playwright/test`).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Setting the Supabase Production env vars in one command

Every app in this portfolio shares one Supabase project (`master_db`). Instead
of manually pasting `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
/ `SUPABASE_SERVICE_ROLE_KEY` into the Vercel dashboard for every new project
(the Supabase↔Vercel Marketplace integration only syncs Preview env vars, not
Production — a real limitation on the Hobby plan, not a config mistake),
there's a script for this: `C:\Users\Taufik\project\scripts\setup-supabase-env.mjs`.

One-time setup:
1. Create a Vercel access token: https://vercel.com/account/tokens
2. Persist it: `[Environment]::SetEnvironmentVariable("VERCEL_TOKEN", "...", "User")`
   (PowerShell), then open a new terminal window.

Then, for any project — including a brand new one — one line sets its
Production Supabase vars:

```powershell
node C:\Users\Taufik\project\scripts\setup-supabase-env.mjs <vercel-project-name>
```

It reads the real values out of `duitduit/.env.local` (a repo that already has
working ones) and pushes them straight to the named project's Production
environment via Vercel's REST API — no dashboard clicking. Trigger a redeploy
afterward for it to take effect.

---
Built by [Muhammad Taufik](https://taufik.vercel.app)
