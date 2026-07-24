# Black Day — Evidence Archive (React)

A React + Vite version of the Black Day site, built so the Evidence Wall and
Submit form can be pointed at a real database instead of the browser demo.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

This outputs static files to `dist/` that you can deploy anywhere (Vercel,
Netlify, your own server).

## Project structure

```
src/
  api.js                  ← the ONLY file you need to change to add a database
  App.jsx                 ← composes all sections
  index.css               ← all styling
  components/
    Nav.jsx, Hero.jsx, Stats.jsx, WhoWeAre.jsx, WhatHappened.jsx,
    Wangchuk.jsx, Demands.jsx, Timeline.jsx   ← static content sections
    EvidenceWall.jsx       ← fetches + displays submissions, has filters
    UploadForm.jsx         ← the submission form
    CockroachCursor.jsx    ← the roach that follows your cursor
```

## Connecting a real database

Everything currently reads/writes through two functions in `src/api.js`:
`fetchEvidence()` and `submitEvidence(item)`. They currently use
`localStorage`, so each visitor only sees their own local demo data. To make
this a real shared archive:

1. **Pick a backend.** Easiest options for a small team:
   - **Supabase** or **Firebase** — hosted Postgres/Firestore + file storage,
     no server code required, good free tier.
   - **Node/Express + Postgres (or MongoDB)** if you want full control and
     already have somewhere to host a server.

2. **Two endpoints is all you need:**
   - `GET /evidence` → returns an array of approved submissions.
   - `POST /evidence` → accepts a new submission (as `multipart/form-data` if
     you want the photo/video file itself, or JSON plus a separate signed
     upload URL for large video files).

3. **Add moderation server-side.** Give every submission a `status` field
   (`pending` by default). `GET /evidence` should only return
   `status === 'approved'` rows to the public. Build yourself a small admin
   view (or just query the database directly at first) to flip submissions
   to `approved` after you've checked them. This is the single most
   important step — without it, anyone can post anything under your name.

4. **Update `src/api.js`.** Both functions have the real `fetch()` calls
   already written as comments right above the demo code — uncomment them,
   point them at your backend's URL, and delete the `localStorage` lines.
   Nothing else in the app needs to change: `EvidenceWall.jsx` and
   `UploadForm.jsx` don't know or care where the data comes from.

5. **For video specifically:** don't try to upload large video files
   straight through your own server if you can avoid it. Use your storage
   provider's direct/presigned upload (S3, Supabase Storage, Firebase
   Storage all support this) so big files go straight from the browser to
   storage, and your `POST /evidence` only ever receives the resulting URL
   plus the metadata.

## A note on safety

Once uploads are public, screen for:
- Doxxing — personal information about identifiable police officers or
  bystanders who didn't consent to being shown.
- Doctored or out-of-context media — the "I confirm this is authentic"
  checkbox in the form is a start, but a human review step matters more.
- Anything that could put a specific injured student at risk of retaliation
  if named without their OK.
