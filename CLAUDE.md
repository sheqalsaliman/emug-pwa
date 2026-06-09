# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EMUG System is a PWA complaint and job management system for a plumbing & sewerage company (E Man Utama Group, Johor, Malaysia). Customers submit complaints, staff manage and fulfill them.

## Development & Deployment

There is **no build step**. This is a vanilla JS/HTML/CSS project deployed directly to Vercel.

```bash
# Deploy: just push to main — Vercel auto-deploys
git push origin main

# Preview locally (any static file server works)
npx serve .
# or
python -m http.server 8080
```

No package.json, no npm install, no compilation required.

## Architecture

The entire application lives in three files:

| File | Role |
|------|------|
| `index.html` | All UI markup (~1000+ lines). Sections are shown/hidden via JS, not separate pages. |
| `app.js` | All application logic (~2700 lines). Monolithic — routing, auth, data fetching, rendering. |
| `styles.css` | Design system built on CSS custom properties (`:root` tokens). |

**SPA routing** is handled client-side inside `app.js`. Vercel rewrites `/staff` and `/admin` to `index.html` (see `vercel.json`). The JS then reads `window.location.pathname` to decide which view to render.

**Backend** is [Supabase](https://supabase.com) (PostgreSQL + REST). The client is loaded from CDN and initialized near the top of `app.js` with `SUPABASE_URL` and `SUPABASE_KEY` constants. All database reads/writes go through the Supabase JS client.

## Key Supabase Tables

- `complaints` — customer complaint records (ref format: `EMUG-2026-####`)
- `jobs` — operator acceptance/completion tracking per complaint
- `feedback` — post-job customer reviews/ratings
- Gallery photos (before/during/after) stored as URLs in complaint/job records

## Authentication & Roles

Auth is **hardcoded** — the `USERS` array in `app.js` holds credentials. Sessions are persisted in `localStorage` as `emug_session` (`{username, role}`). There is no server-side auth.

Three roles:
- **admin** — full dashboard, assign operators, manage all complaints
- **operator** — accept jobs, upload work photos, mark complete
- **customer** (public) — submit complaints, track by reference number, leave feedback

## State Management

Global in-memory state lives at the top of `app.js`:

```js
let complaints = []
let feedbacks = []
let galleryData = {}
let user = null        // from localStorage.emug_session
```

There is no reactive framework — UI updates are done by re-rendering DOM sections imperatively.

## Internationalisation

All user-facing strings go through the translation object `T` (defined in `app.js`), which has `bm` (Bahasa Malaysia) and `en` keys. The active language is stored in `localStorage.emug_lang`. Use `t('key')` helper to get translated strings; never hardcode display text directly.

## PWA & Service Worker

`sw.js` uses a **network-first** caching strategy under the cache name `emug-v3`. When adding new static assets, update the cache version in `sw.js` to bust stale caches.

## Booking System Constraints

- Available slots: 08:00–09:00 through 16:00–17:00 (8 fixed slots)
- Max 3 bookings per slot per day
- Sundays and past dates are disabled
