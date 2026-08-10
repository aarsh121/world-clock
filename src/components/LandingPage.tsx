import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Widget } from './Widget'
import { useInstallPrompt } from '../lib/install'

export function LandingPage() {
  const reduce = useReducedMotion()
  const { canInstall, install, installed } = useInstallPrompt()

  const fade = reduce
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="landing">
      <div className="landing-grain" aria-hidden />
      <div className="landing-glow" aria-hidden />

      <header className="landing-nav">
        <div className="landing-brand">
          <span className="landing-mark" aria-hidden />
          World Clock
        </div>
        <div className="landing-nav-actions">
          {canInstall ? (
            <button type="button" className="landing-btn ghost" onClick={() => void install()}>
              Install
            </button>
          ) : null}
          <Link to="/app" className="landing-btn solid">
            Open app
          </Link>
        </div>
      </header>

      <main className="landing-hero">
        <motion.div
          className="landing-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fade}
        >
          <p className="landing-kicker">World Clock</p>
          <h1 className="landing-title">
            Every timezone,
            <br />
            one quiet glance.
          </h1>
          <p className="landing-lede">
            Scrub time across cities. See who&apos;s awake, working, or offline —
            without the spreadsheet math.
          </p>
          <div className="landing-cta">
            <Link to="/app" className="landing-btn solid large">
              Launch widget
            </Link>
            {canInstall ? (
              <button type="button" className="landing-btn ghost large" onClick={() => void install()}>
                Install on this PC
              </button>
            ) : (
              <a href="#install" className="landing-btn ghost large">
                How to install
              </a>
            )}
          </div>
          {installed ? (
            <p className="landing-hint">Already installed — open it from your Start menu / Dock.</p>
          ) : null}
        </motion.div>

        <motion.div
          className="landing-stage"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...fade, delay: reduce ? 0 : 0.12 }}
        >
          <div className="landing-widget-frame">
            <Widget />
          </div>
        </motion.div>
      </main>

      <section className="landing-strip" aria-label="Highlights">
        <div>
          <span className="landing-strip-label">Scrub</span>
          <p>Drag the dial to preview any hour across every city.</p>
        </div>
        <div>
          <span className="landing-strip-label">Status</span>
          <p>Night, before work, working, almost done — at a glance.</p>
        </div>
        <div>
          <span className="landing-strip-label">Offline</span>
          <p>Runs in the browser or as a desktop app. No account.</p>
        </div>
      </section>

      <section className="landing-install" id="install">
        <h2>Install on your PC</h2>
        <div className="landing-install-grid">
          <article>
            <h3>Browser install (fastest)</h3>
            <ol>
              <li>Open this site in Chrome or Edge.</li>
              <li>
                Click the install icon in the address bar, or use{' '}
                <strong>Install on this PC</strong> above.
              </li>
              <li>World Clock opens like a normal desktop app.</li>
            </ol>
          </article>
          <article>
            <h3>Sticky desktop note (Tauri)</h3>
            <ol>
              <li>
                Install <a href="https://rustup.rs/">Rust</a> and Tauri prerequisites.
              </li>
              <li>
                Run <code>npm install</code> then <code>npm run tauri:build</code>.
              </li>
              <li>
                Install from <code>src-tauri/target/release/bundle/</code> — frameless,
                always-on-top sticky widget you can drag on the desktop.
              </li>
            </ol>
          </article>
        </div>
      </section>

      <footer className="landing-foot">
        <span>World Clock</span>
        <span className="landing-foot-meta">Less noise. More time.</span>
      </footer>
    </div>
  )
}
