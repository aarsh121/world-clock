# World Clock

Scrub time across cities. Sticky desktop widget + web app.

**Live:** https://world-clock-ivory-phi.vercel.app  
**Repo:** https://github.com/aarsh121/world-clock  
**Windows installer:** https://github.com/aarsh121/world-clock/releases/latest

## Install on Windows (recommended)

1. Open the [latest release](https://github.com/aarsh121/world-clock/releases/latest)
2. Download `World Clock_*_x64-setup.exe`
3. Run it — sticky always-on-top widget installs for your user

CI builds the `.exe` automatically via GitHub Actions (`.github/workflows/release-desktop.yml`).

## Develop

```bash
npm install
npm run dev          # web: http://localhost:1420
npm run tauri:dev    # desktop (needs Rust + VS C++ Build Tools)
npm run tauri:build  # local installer under src-tauri/target/release/bundle/nsis/
```

## Stack

Vite · React 19 · TypeScript · Motion · Tauri 2 · Vercel
