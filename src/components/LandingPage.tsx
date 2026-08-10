import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'
import { Widget } from './Widget'

const RELEASES_URL = 'https://github.com/aarsh121/world-clock/releases/latest'

type DesktopOS = 'mac' | 'windows' | 'other'

function detectDesktopOS(): DesktopOS {
  const ua = navigator.userAgent
  const platform = navigator.platform || ''
  if (/Mac|iPhone|iPad|iPod/.test(platform) || /Mac OS X/.test(ua)) return 'mac'
  if (/Win/.test(platform) || /Windows/.test(ua)) return 'windows'
  return 'other'
}

export function LandingPage() {
  const reduce = useReducedMotion()
  const os = useMemo(() => detectDesktopOS(), [])

  const fade = reduce
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="landing">
      <div className="landing-grain" aria-hidden />
      <div className="landing-orb landing-orb-a" aria-hidden />
      <div className="landing-orb landing-orb-b" aria-hidden />

      <header className="landing-nav">
        <div className="landing-brand" aria-label="World Clock">
          <span className="landing-mark" aria-hidden />
          <span className="landing-brand-text">World Clock</span>
        </div>
        <Link to="/app" className="landing-btn ghost">
          Try in browser
        </Link>
      </header>

      <main className="landing-hero">
        <motion.div
          className="landing-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fade}
        >
          <p className="landing-brand-hero">World Clock</p>
          <h1 className="landing-title">
            Timezones,
            <br />
            at a glance.
          </h1>
          <p className="landing-lede">
            A quiet sticky widget for your desktop — scrub hours across cities and see who&apos;s
            working.
          </p>

          <div className="landing-cta" role="group" aria-label="Download">
            <a
              className={`landing-btn large ${os === 'mac' ? 'solid' : 'ghost'}`}
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
            >
              Download for Mac
            </a>
            <a
              className={`landing-btn large ${os === 'windows' || os === 'other' ? 'solid' : 'ghost'}`}
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
            >
              Download for Windows
            </a>
          </div>

          <p className="landing-hint">
            {os === 'mac'
              ? 'macOS · .dmg for Apple Silicon & Intel'
              : os === 'windows'
                ? 'Windows · .exe setup installer'
                : 'Mac (.dmg) and Windows (.exe) on GitHub Releases'}
          </p>
        </motion.div>

        <motion.div
          className="landing-stage"
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...fade, delay: reduce ? 0 : 0.1 }}
        >
          <div className="landing-widget-frame">
            <div className="landing-widget-glow" aria-hidden />
            <Widget />
          </div>
        </motion.div>
      </main>

      <section className="landing-download" id="download" aria-labelledby="download-heading">
        <div className="landing-download-head">
          <p className="landing-kicker">Desktop</p>
          <h2 id="download-heading">Install once. Leave it on your desk.</h2>
        </div>

        <div className="landing-download-grid">
          <a className="landing-os-card" href={RELEASES_URL} target="_blank" rel="noreferrer">
            <span className="landing-os-icon" aria-hidden>
              <AppleGlyph />
            </span>
            <span className="landing-os-copy">
              <strong>macOS</strong>
              <span>.dmg · Apple Silicon & Intel</span>
            </span>
            <span className="landing-os-arrow" aria-hidden>
              →
            </span>
          </a>

          <a className="landing-os-card" href={RELEASES_URL} target="_blank" rel="noreferrer">
            <span className="landing-os-icon" aria-hidden>
              <WindowsGlyph />
            </span>
            <span className="landing-os-copy">
              <strong>Windows</strong>
              <span>.exe setup · current user</span>
            </span>
            <span className="landing-os-arrow" aria-hidden>
              →
            </span>
          </a>
        </div>
      </section>

      <footer className="landing-foot">
        <span>World Clock</span>
        <Link to="/app" className="landing-foot-link">
          Open web version
        </Link>
      </footer>
    </div>
  )
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
      <path d="M16.7 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.3c1.1-1.4 1.5-2.8 1.5-2.9-.1 0-2.9-1.1-2.9-4.2ZM14.8 5.5c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.6-1.3Z" />
    </svg>
  )
}

function WindowsGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M3 5.2 10.4 4.1v7.1H3V5.2Zm8.2-1.2L21 2.5v8.7h-9.8V4ZM3 12.8h7.4v7.1L3 18.8v-6Zm8.2 0H21v8.7l-9.8-1.4v-7.3Z" />
    </svg>
  )
}
