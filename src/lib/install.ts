import { useEffect, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function detectBrowser(): 'chrome' | 'edge' | 'safari' | 'firefox' | 'other' {
  const ua = navigator.userAgent
  if (/Edg\//.test(ua)) return 'edge'
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return 'chrome'
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'safari'
  if (/Firefox\//.test(ua)) return 'firefox'
  return 'other'
}

export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)
  const [browser, setBrowser] = useState<ReturnType<typeof detectBrowser>>('other')

  useEffect(() => {
    setBrowser(detectBrowser())

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
    if (standalone) setInstalled(true)

    function onBeforeInstall(e: Event) {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    function onInstalled() {
      setInstalled(true)
      setDeferred(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  async function install(): Promise<'prompted' | 'guide' | 'installed'> {
    if (installed) return 'installed'
    if (deferred) {
      await deferred.prompt()
      const choice = await deferred.userChoice
      setDeferred(null)
      return choice.outcome === 'accepted' ? 'installed' : 'prompted'
    }
    return 'guide'
  }

  return {
    /** Native install prompt is available (Chrome/Edge). */
    canPrompt: Boolean(deferred) && !installed,
    installed,
    browser,
    install,
  }
}

export function installGuideText(browser: ReturnType<typeof detectBrowser>): string {
  switch (browser) {
    case 'chrome':
      return 'In Chrome: open the ⋮ menu → Install World Clock… — or click the install icon in the address bar.'
    case 'edge':
      return 'In Edge: open the ⋯ menu → Apps → Install this site as an app.'
    case 'safari':
      return 'In Safari: Share → Add to Dock / Add to Home Screen.'
    case 'firefox':
      return 'Firefox doesn’t support install prompts. Use Chrome or Edge, or build the sticky desktop app with Tauri.'
    default:
      return 'Use Chrome or Edge, then Install from the browser menu / address bar.'
  }
}
