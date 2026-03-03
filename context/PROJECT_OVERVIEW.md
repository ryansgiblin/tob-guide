# TOB Guide — Project Overview

## Purpose
An interactive, role-by-role guide for max efficiency 4-person (4s) Theatre of Blood.
Built for OSRS clan use. Covers room procedure, setup, plugin recommendations, and video examples.

## MVP Scope (4s TOB only)
- 6 rooms: Maiden, Bloat, Nylos, Sotetseg, Xarpus, Verzik
- Per-room: Overview, Setup, Role-specific procedure, Video examples (YouTube + gifs)
- Plugin page: recommended RuneLite plugins with descriptions
- Dark OSRS-themed UI

## Future Roadmap
- Times leaderboard (4s and 5s)
- 5s scale role procedures
- Admin-editable content (if non-devs need to update it)
- Mobile-optimized experience

## Tech Stack
- React + Vite (no router, useState-based navigation)
- Tailwind CSS v4 (via @tailwindcss/vite)
- @headlessui/react (tabs, accordion)
- Deployed on Vercel

## Local Dev
```
vercel dev   # runs at http://localhost:3000
```
or:
```
npm run dev  # runs at http://localhost:5173
```

## Content Management
All content lives in `src/data/rooms.js` and `src/data/plugins.js`.
To add/edit a room procedure or role, edit the relevant object in rooms.js.
To add YouTube videos, paste the video ID into the `videos` array of the relevant role.
To add self-hosted gifs, drop the file in `public/assets/` and reference `/assets/filename.gif`.

## Deployment
```
vercel --prod
```
Connected to GitHub repo: tob-guide (branch: main)
