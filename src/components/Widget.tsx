import { useEffect, useMemo, useState } from 'react'
import { defaultCities, detectHomeCity, type City } from '../lib/cities'
import { loadPrefs, savePrefs, type Prefs } from '../lib/store'
import { DEFAULT_WORK_HOURS } from '../lib/status'
import {
  buildCityView,
  formatScrubDelta,
  formatUtcOffsetLabel,
} from '../lib/time'
import { AddCitySheet } from './AddCitySheet'
import { CityRow } from './CityRow'
import { FooterActions } from './FooterActions'
import { SettingsSheet } from './SettingsSheet'
import { Timeline } from './Timeline'

async function setAlwaysOnTop(enabled: boolean) {
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window')
    await getCurrentWindow().setAlwaysOnTop(enabled)
  } catch {
    // browser
  }
}

async function closeWindow() {
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window')
    await getCurrentWindow().close()
  } catch {
    // browser
  }
}

function isTauriRuntime() {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
}

export function Widget() {
  const tauri = isTauriRuntime()
  const [prefs, setPrefs] = useState<Prefs>(() => {
    const loaded = loadPrefs()
    // Sticky desktop widget defaults to pinned
    if (tauri && localStorage.getItem('world-clock:v1') == null) {
      return { ...loaded, alwaysOnTop: true }
    }
    return loaded
  })
  const [now, setNow] = useState(() => Date.now())
  const [scrubMs, setScrubMs] = useState(0)
  const [addOpen, setAddOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    savePrefs(prefs)
  }, [prefs])

  useEffect(() => {
    if (tauri) void setAlwaysOnTop(prefs.alwaysOnTop)
  }, [prefs.alwaysOnTop, tauri])

  const inspected = useMemo(() => new Date(now + scrubMs), [now, scrubMs])
  const home = prefs.cities.find((c) => c.id === prefs.homeId) ?? prefs.cities[0]

  const utcLabel = formatUtcOffsetLabel(inspected, home.timeZone)
  const deltaLabel = formatScrubDelta(scrubMs)

  const existingIds = useMemo(() => new Set(prefs.cities.map((c) => c.id)), [prefs.cities])

  function updatePrefs(next: Prefs) {
    const homeCity = next.cities.find((c) => c.id === next.homeId)
    const rest = next.cities.filter((c) => c.id !== next.homeId)
    setPrefs({
      ...next,
      cities: homeCity ? [homeCity, ...rest] : next.cities,
    })
  }

  function addCity(city: City) {
    if (existingIds.has(city.id)) return
    updatePrefs({ ...prefs, cities: [...prefs.cities, city] })
  }

  function removeCity(cityId: string) {
    if (prefs.cities.length <= 1) return
    if (cityId === prefs.homeId) return
    updatePrefs({
      ...prefs,
      cities: prefs.cities.filter((c) => c.id !== cityId),
    })
  }

  function resetPrefs() {
    const detected = detectHomeCity()
    setPrefs({
      cities: defaultCities(detected),
      homeId: detected.id,
      hour12: false,
      workHours: { ...DEFAULT_WORK_HOURS },
      alwaysOnTop: tauri,
    })
  }

  return (
    <div className={`widget${tauri ? ' is-sticky' : ''}`}>
      {tauri ? <div className="sticky-drag" data-tauri-drag-region title="Drag" /> : null}

      <Timeline
        scrubMs={scrubMs}
        onScrub={setScrubMs}
        utcLabel={utcLabel}
        deltaLabel={deltaLabel}
      />

      <div className="city-list">
        {prefs.cities.map((city) => {
          const view = buildCityView(
            inspected,
            home.timeZone,
            city.timeZone,
            city.id === home.id,
            prefs.hour12,
            prefs.workHours,
          )
          const canRemove = city.id !== home.id && prefs.cities.length > 1
          return (
            <CityRow
              key={city.id}
              city={city}
              view={view}
              canRemove={canRemove}
              onRemove={() => removeCity(city.id)}
            />
          )
        })}
      </div>

      <FooterActions
        onSettings={() => setSettingsOpen(true)}
        onRecenter={() => setScrubMs(0)}
        onAdd={() => setAddOpen(true)}
        canRecenter={Math.abs(scrubMs) >= 30_000}
        isSticky={tauri}
        alwaysOnTop={prefs.alwaysOnTop}
        onTogglePin={() => updatePrefs({ ...prefs, alwaysOnTop: !prefs.alwaysOnTop })}
        onClose={() => void closeWindow()}
      />

      <AddCitySheet
        open={addOpen}
        existingIds={existingIds}
        onClose={() => setAddOpen(false)}
        onAdd={addCity}
      />
      <SettingsSheet
        open={settingsOpen}
        prefs={prefs}
        isTauri={tauri}
        onClose={() => setSettingsOpen(false)}
        onChange={updatePrefs}
        onReset={resetPrefs}
      />
    </div>
  )
}
