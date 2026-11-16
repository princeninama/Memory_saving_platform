# Content, Media, Privacy & Deployment Guide

This guide explains how to customize every photograph, video, voice recording, song, and personal note in **"A Little Place in the Internet, Just for You."**

---

## 1. Folder Structure

- `server.ts` — Express server providing server-side passphrase verification, signed `HttpOnly` session cookies, `X-Robots-Tag: noindex`, and protected `/api/media/*` streaming.
- `private-media/` — **Protected private media folder** (never served publicly without a valid session cookie):
  - `private-media/images/{beach,college,delhi,travel,mountains,portraits,album-art}`
  - `private-media/videos/{intro,college,travel,delhi,mountains}`
  - `private-media/audio/{her,mine,music}`
- `src/assets/images/` — Atmospheric scene backdrops bundled with the frontend (non-personal landscapes only).
- `src/data/` — All editable content & metadata:
  - `src/data/siteContent.ts` — Opening copy, Chapter 02 video path, Chapter 03 destination summaries, ambient track path, Final Letter.
  - `src/data/memories.ts` — College Life gallery, Scratch cards, Envelopes, Timeline, Ghumi Ghumi map stops & perspectives, Delhi Metro fragments.
  - `src/data/mountains.ts` — Personal stories ("Things I never want to forget"), Hampta Pass star-to-memory bindings, Tungnath sunrise photos.
  - `src/data/voicesAndMusic.ts` — Her & your voice recordings, Soundtrack songs, Karaoke corner tracks.
  - `src/data/specialFeatures.ts` — 7 Treasure Hunt items & Final Secret, Time Capsules (including future unlock dates), Little Dictionary, Future Places wishlist.

---

## 2. Adding Photographs & Videos

1. Convert photos to `.webp`, `.avif`, or compressed `.jpg` (recommended width `1600px`–`2200px`). Compress videos to `.mp4` (H.264 + AAC, faststart enabled).
2. Drop files into `private-media/` matching the folder tree:
   - Example: `private-media/videos/intro/her-smile.mp4`
   - Example: `private-media/images/college/corridor-1.jpg`
3. Reference them in `src/data/*.ts` using `/api/media/...`:
   - `videoPath: '/api/media/videos/intro/her-smile.mp4'`
   - `imagePath: '/api/media/images/college/corridor-1.jpg'`
4. You can also test any photo, video, or audio file immediately in the browser using the **"Preview photo"**, **"Preview local video file"**, or **"Load local audio file"** controls.

---

## 3. Adding Voice Recordings & Songs

1. Place real `.mp3`, `.m4a`, or `.wav` recordings in `private-media/audio/her/` and `private-media/audio/mine/`.
2. Update `VOICE_RECORDINGS` in `src/data/voicesAndMusic.ts` with the title, real recording date, optional transcript, and `/api/media/audio/...` path.
3. Optional custom background ambiance: drop an `.mp3` at `private-media/audio/music/ambient.mp3` (otherwise a gentle coastal wave & chord soundscape plays on user interaction).
4. Update `SOUNDTRACK_SONGS` and `KARAOKE_TRACKS` in `src/data/voicesAndMusic.ts` with real song titles, personal notes, and legitimate Spotify/YouTube URLs.

---

## 4. Changing Text & Personal Messages

- **Opening message & signature**: `src/data/siteContent.ts` (`SITE_CONTENT.opening`)
- **Final letter**: `src/data/siteContent.ts` (`SITE_CONTENT.finalLetter`)
- **Envelopes, scratch captions & timelines**: `src/data/memories.ts`
- **Time capsules & future unlock date (`YYYY-MM-DD`)**: `src/data/specialFeatures.ts` (`TIME_CAPSULES`)
- **Inside jokes dictionary**: `src/data/specialFeatures.ts` (`DICTIONARY_ENTRIES`)

---

## 5. Privacy & Security Checklist

- [x] **Set `SITE_PASSWORD` & `SESSION_SECRET`** in your hosting environment variables (`.env` locally, never commit `.env` to Git).
- [x] **Verify no secrets in frontend**: Passwords are verified strictly on the server in `server.ts` using `crypto.timingSafeEqual` and `HttpOnly; SameSite=Lax` signed cookies.
- [x] **Public vs Private Media Audit**:
  - **Publicly bundled**: Only `src/assets/images/*` (the 5 non-personal landscape/scene illustrations) and compiled JS/CSS.
  - **Protected behind authentication**: Everything inside `private-media/*` requires a valid session cookie via `/api/media/*` (HTTP `401` otherwise).
- [x] **Search Engine Blocking**: `<meta name="robots" content="noindex, nofollow, noarchive" />`, `X-Robots-Tag` HTTP header, and `/robots.txt` (`Disallow: /`) are active.
- [x] **Zero third-party analytics/tracking**: No trackers or external analytics scripts are included.

---

## 6. Deployment Instructions

1. Set environment variables on your host (Cloud Run, Railway, Fly.io, Render, or VPS):
   - `NODE_ENV=production`
   - `PORT=3000`
   - `SITE_PASSWORD=<your-private-passphrase>`
   - `PASSPHRASE_HINT=<optional-gentle-hint>`
   - `SESSION_SECRET=<64-char-random-hex>`
   - `HTTPS=true` (when served over HTTPS so cookies set `Secure`)
2. Build the frontend bundle:
   ```bash
   npm run build
   ```
3. Start the Express production server:
   ```bash
   npm start
   ```

---

## 7. Testing Checklist

- [ ] Wrong passphrase on the entrance gate returns an error without unlocking.
- [ ] Correct passphrase unlocks and persists session across refresh.
- [ ] Unauthenticated request to `/api/media/videos/intro/her-smile.mp4` returns `401`.
- [ ] Beach CTA starts ambient music only after user click and scrolls smoothly to Chapter 02.
- [ ] Chapter 02 video does not autoplay with sound; plays/replays cleanly on click.
- [ ] All 3 Memory Worlds (`College Life`, `Ghumi Ghumi Life`, `Delhi Life`) switch cleanly and open media lightboxes.
- [ ] Scratch cards respond to both mouse drag and touch swipe and reveal at ~48% scratched.
- [ ] All 7 Treasure Hunt items unlock and reveal the Final Secret Memory at `7/7`.
- [ ] Both Voice decks (`Through your eyes` / `Through my eyes`) play real audio without overlapping background music.
- [ ] Karaoke corner requests mic permission explicitly, records locally, plays back, and deletes cleanly.
- [ ] Mobile viewport (`375px` width) has zero horizontal overflow and readable typography.
