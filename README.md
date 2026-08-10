# World Clock

Scrub time across cities. A quiet world-clock widget — browser, PWA, or Tauri desktop.

**Live:** https://world-clock-ivory-phi.vercel.app  
**Repo:** https://github.com/aarsh121/world-clock

## Install on PC

### Option A — Install from the website (recommended)
1. Open the Vercel URL in **Chrome** or **Edge**
2. Click **Install on this PC** on the landing page, or use the install icon in the address bar
3. World Clock opens as a standalone desktop window (PWA)

### Option B — Sticky desktop widget (Tauri)
Frameless, always-on-top sticky note that sits on your desktop (skips the taskbar). Requires [Rust](https://rustup.rs/) and [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/).

```bash
npm install
npm run tauri:build
```

Installers land in `src-tauri/target/release/bundle/`. Drag the top handle to move; pin/unpin and close from the footer.

## Develop

```bash
npm install
npm run dev        # http://localhost:1420  (landing + /app)
npm run build
npm run tauri:dev  # desktop shell
```

## Stack

Vite · React 19 · TypeScript · Motion · Tauri 2 · Vercel
