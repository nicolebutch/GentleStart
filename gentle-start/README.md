# Gentle Start

A gentle daily planner: one next step, never overdue. Plain HTML, CSS and JavaScript with no build step.

## Files
- `index.html`, `styles.css`, `app.js`: the app
- `manifest.webmanifest` and `icons/`: what makes it installable with its own icon
- `sw.js`: offline support. Change `VERSION` at the top whenever you update the app files.

## Put it online (GitHub Pages, free)
1. Make a free account at github.com and create a new repository. Free GitHub Pages needs it to be public. That is fine here: the code holds no names or personal details (the app asks for your name, a partner's name and a pet's name on first launch and keeps them on your device), and your data never leaves your device.
2. On the repository page choose "Add file", then "Upload files", and drag in everything from this folder: the three app files, `sw.js`, `manifest.webmanifest`, and the whole `icons` folder.
3. Commit. Then go to Settings, then Pages, set the source to "Deploy from a branch", branch `main`, folder `/ (root)`, and save.
4. After a minute or two your app is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Install it on your phone
- iPhone: open the link in Safari, tap Share, then "Add to Home Screen".
- Android: open in Chrome, menu, then "Install app".

Install first, then start using it from the home screen icon. On iPhone the installed app keeps its own separate storage from Safari, so anything entered in a Safari tab will not show up in the installed app. Menu, then Data lets you save a backup file and restore it, which is also how you move to a new phone.

## What works and what is not here yet
- Works: everything in the prototype, offline, with data stored on the device.
- Not yet: syncing across devices, sharing with a partner, Google Calendar import, notifications, and the "Stuck?" chat and tiny-step maker. Those last two need a small server to talk to Claude, so they stay hidden for now.

## Other free hosts
Netlify and Cloudflare Pages both let you drag this unzipped folder into their dashboard with no GitHub needed. The link is unlisted, not password protected.
