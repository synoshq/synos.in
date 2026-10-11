# Agent Maturity Index site

The site has three pages:

- **Home** (`/`) includes the self-score, the score overlay and team alignment, and the cohort and report form.
- **Invitation acceptance** (`/invite`) is linked only from invitation emails.
- **Privacy** (`/privacy`).

The pages are static Astro files. The forms, team scores and emails run in one serverless function, `api/ami/[route].mjs` at the synos.in repo root.

## How it works

- **Agent Maturity Score:** the average of a person's 7 dimension levels, from 1.0 to 5.0. All 7 must be scored.
- **Team alignment score:** appears once 3 people from the same business have scored it. It is `100 × (1 − average spread / 4)`, where spread is the highest level minus the lowest on each dimension.
- **Invitations:** colleagues get an email with a personal link (`/#score.<token>`). The link opens the home page, scrolls to the score section and shows "Tony, Emma invited you to score Acme".
- **Second scorer:** the overlay asks for 1 more colleague.
- **Third scorer:** the overlay shows the alignment score, and every team member who left an email gets it by email.
- **Notifications:** every form submission is emailed to `NOTIFY_EMAIL` (anuraag@synos.in). That covers cohort applications, report sign-ups, invitation acceptances, self-scores and colleague invitations.

The shared logic is in `src/lib/ami-core.js`. Both the API (`api/ami/[route].mjs`) and the preview build use it.

## Deploy (Vercel, at synos.in/agent-maturity-index)

The site lives in the synos.in repo and is served by the same Vercel project.

- `npm run build` (in `packages/ami`) writes the static pages to `public/agent-maturity-index/`. Commit the result: Vercel serves `public/` as committed, with no build step.
- The API is `api/ami/[route].mjs` at the repo root. `vercel.json` rewrites `/agent-maturity-index/api/:route` to it with `?site=agent-maturity-index` (each site keeps its own teams under its own Redis key prefix) and sets the `/agent-maturity-index` security headers.
- Team scores and the rate limit are stored in Upstash Redis. Add it from the Vercel Marketplace (Storage > Upstash Redis) and connect it to the project, which sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
- Set these in Vercel > Settings > Environment Variables:
   - `RESEND_API_KEY`: from resend.com, after you verify the sending domain (synos.in).
   - `MAIL_FROM`: for example `Agent Maturity Index <index@synos.in>`.
   - `NOTIFY_EMAIL`: `anuraag@synos.in` (the default).
   - `SITE_ORIGIN`: `https://synos.in` (the default). Invitation links use it plus this site's path.

## Commands

```bash
npm install
npm run dev        # site only, at http://localhost:4321/agent-maturity-index (forms need the API: use `vercel dev` from the repo root)
npm run build      # production build to ../../public/agent-maturity-index
PUBLIC_PREVIEW=1 npm run build   # review copy: everything runs in the browser and no email is sent
python3 scripts/make-hosted.py ../../public/agent-maturity-index hosted   # self-contained copy for hosting as a shared page
```

## Settings (`src/config.ts`)

- `seatsTotal`, `seatsRemaining`, `inviteDeadline`: the scarcity badges on `/invite`. Leave a value empty to hide its badge.
- `analyticsSrc`: an optional analytics script. It loads only after a visitor accepts cookies.

## Limits and safeguards

- Each IP address can make 40 API requests per hour.
- Each invitation request can include up to 5 colleagues.
- Each team can send up to 15 invitations and have up to 25 members.
- There is a honeypot field against bots.
- Team links are unguessable tokens. Anyone holding one can add a score to that team.
