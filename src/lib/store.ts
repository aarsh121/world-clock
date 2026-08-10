import { defaultCities, detectHomeCity, type City } from './cities'
import { DEFAULT_WORK_HOURS, type WorkHours } from './status'

const KEY = 'world-clock:v1'

export type Prefs = {
  cities: City[]
  homeId: string
  hour12: boolean
  workHours: WorkHours
  alwaysOnTop: boolean
}

export function loadPrefs(): Prefs {
  const home = detectHomeCity()
  const fallback: Prefs = {
    cities: defaultCities(home),
    homeId: home.id,
    hour12: false,
    workHours: { ...DEFAULT_WORK_HOURS },
    alwaysOnTop: false,
  }

  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<Prefs>
    if (!parsed.cities?.length) return fallback
    return {
      cities: parsed.cities,
      homeId: parsed.homeId ?? parsed.cities[0].id,
      hour12: Boolean(parsed.hour12),
      workHours: { ...DEFAULT_WORK_HOURS, ...parsed.workHours },
      alwaysOnTop: Boolean(parsed.alwaysOnTop),
    }
  } catch {
    return fallback
  }
}

export function savePrefs(prefs: Prefs) {
  localStorage.setItem(KEY, JSON.stringify(prefs))
}
