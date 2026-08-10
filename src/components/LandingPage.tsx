import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Widget } from './Widget'
import { installGuideText, useInstallPrompt } from '../lib/install'

const RELEASES_URL = 'https://github.com/aarsh121/world-clock/releases/latest'

export function LandingPage() {
  const reduce = useReducedMotion()
  const { canPrompt, install, installed, browser } = useInstallPrompt()

  const fade = reduce
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }

  async function onInstallClick() {
    const result = await install()
    if (result === 'guide') {
      document.getElementById('install')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
          <a className="landing-btn ghost" href={RELEASES_URL} target="_blank" rel="noreferrer">
            Download .exe
          </a>
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
            <a className="landing-btn solid large" href={RELEASES_URL} target="_blank" rel="noreferrer">
              Download for Windows
            </a>
            <Link to="/app" className="landing-btn ghost large">
              Open in browser
            </Link>
          </div>
          {installed ? (
            <p className="landing-hint">Already installed — open it from your Start menu.</p>
          ) : (
            <p className="landing-hint">
              Get the <strong>.exe installer</strong> for the sticky desktop widget. Or use the
              browser app below.
            </p>
          )}
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
            <h3>Windows installer (.exe)</h3>
            <ol>
              <li>
                Download <strong>World Clock_…_x64-setup.exe</strong> from GitHub Releases.
              </li>
              <li>Run the installer (current-user install, no admin required).</li>
              <li>
                A sticky always-on-top widget opens — drag the top handle to place it on your
                desktop.
              </li>
            </ol>
            <a
              className="landing-btn solid"
              style={{ marginTop: 14 }}
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
            >
              Download .exe
            </a>
          </article>
          <article>
            <h3>Browser app (optional)</h3>
            <ol>
              <li>Open this site in Chrome or Edge.</li>
              <li>Use Install from the address bar / menu for a PWA shortcut.</li>
              <li>Or just use <Link to="/app">Open app</Link> in the browser.</li>
            </ol>
            <p className="landing-install-note">{installGuideText(browser)}</p>
            {!installed ? (
              <button
                type="button"
                className="landing-btn ghost"
                style={{ marginTop: 14 }}
                onClick={() => void onInstallClick()}
              >
                {canPrompt ? 'Install browser app' : 'Show browser install steps'}
              </button>
            ) : null}
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
