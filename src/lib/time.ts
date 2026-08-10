import type { WorkHours } from './status'
import { statusForHour, type DayStatus } from './status'

const offsetFmtCache = new Map<string, Intl.DateTimeFormat>()
const partsFmtCache = new Map<string, Intl.DateTimeFormat>()

function offsetFormatter(timeZone: string) {
  let f = offsetFmtCache.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
    })
    offsetFmtCache.set(timeZone, f)
  }
  return f
}

function partsFormatter(timeZone: string) {
  let f = partsFmtCache.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      weekday: 'short',
    })
    partsFmtCache.set(timeZone, f)
  }
  return f
}

export function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const parts = offsetFormatter(timeZone).formatToParts(date)
  const raw = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT'
  // GMT, GMT+2, GMT+5:30, UTC+02:00, etc.
  const m = raw.match(/(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?/i)
  if (!m) return 0
  const sign = m[1] === '-' ? -1 : 1
  const hours = Number(m[2])
  const mins = Number(m[3] ?? '0')
  return sign * (hours * 60 + mins)
}

export function formatUtcOffsetLabel(date: Date, timeZone: string): string {
  const mins = getTimeZoneOffsetMinutes(date, timeZone)
  const sign = mins < 0 ? '-' : '+'
  const abs = Math.abs(mins)
  const h = String(Math.floor(abs / 60)).padStart(2, '0')
  const m = String(abs % 60).padStart(2, '0')
  return `UTC${sign}${h}:${m}`
}

export function getZonedParts(date: Date, timeZone: string) {
  const parts = partsFormatter(timeZone).formatToParts(date)
  const map: Record<string, string> = {}
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = p.value
  }
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
    weekday: map.weekday ?? '',
  }
}

export function formatClockTime(
  date: Date,
  timeZone: string,
  hour12: boolean,
): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12,
  }).format(date)
}

export function formatShortDate(date: Date, timeZone: string): string {
  const parts = getZonedParts(date, timeZone)
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  // weekday from Intl is short English; map via Date in that zone via weekday part
  const wd = parts.weekday.toUpperCase().slice(0, 3)
  const label = weekdays.includes(wd) ? wd : wd
  return `${label} ${parts.day} ${months[parts.month - 1]}`
}

export function formatRelativeOffset(
  inspected: Date,
  homeZone: string,
  cityZone: string,
): { offsetLabel: string; abbr: string } {
  const homeMins = getTimeZoneOffsetMinutes(inspected, homeZone)
  const cityMins = getTimeZoneOffsetMinutes(inspected, cityZone)
  const diff = cityMins - homeMins
  const sign = diff < 0 ? '-' : '+'
  const abs = Math.abs(diff)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  let offsetLabel: string
  if (diff === 0) offsetLabel = '0H'
  else if (m === 0) offsetLabel = `${sign}${h}H`
  else offsetLabel = `${sign}${h}H ${m}M`

  const abbr = new Intl.DateTimeFormat('en-US', {
    timeZone: cityZone,
    timeZoneName: 'short',
  })
    .formatToParts(inspected)
    .find((p) => p.type === 'timeZoneName')?.value ?? ''

  return { offsetLabel, abbr }
}

export type DayRelation = 'YESTERDAY' | 'TODAY' | 'TOMORROW' | null

export function dayRelation(
  inspected: Date,
  homeZone: string,
  cityZone: string,
): DayRelation {
  const home = getZonedParts(inspected, homeZone)
  const city = getZonedParts(inspected, cityZone)
  const homeKey = home.year * 10000 + home.month * 100 + home.day
  const cityKey = city.year * 10000 + city.month * 100 + city.day
  if (cityKey < homeKey) return 'YESTERDAY'
  if (cityKey > homeKey) return 'TOMORROW'
  return null
}

export type CityViewModel = {
  offsetMeta: string
  timeLabel: string
  status: DayStatus
  dim: boolean
  isHome: boolean
  dateLabel: string
}

export function buildCityView(
  inspected: Date,
  homeZone: string,
  cityZone: string,
  isHome: boolean,
  hour12: boolean,
  workHours: WorkHours,
): CityViewModel {
  const parts = getZonedParts(inspected, cityZone)
  const status = statusForHour(parts.hour, workHours)
  const { offsetLabel, abbr } = formatRelativeOffset(inspected, homeZone, cityZone)
  const rel = dayRelation(inspected, homeZone, cityZone)

  let offsetMeta: string
  if (isHome) {
    offsetMeta = `YOUR TIME · ${formatShortDate(inspected, cityZone)}`
  } else {
    const bits = [offsetLabel]
    if (abbr && !abbr.startsWith('GMT') && !abbr.startsWith('UTC')) bits.push(abbr)
    let left = bits.join(' / ')
    if (rel) left = `${left} · ${rel}`
    offsetMeta = left
  }

  return {
    offsetMeta,
    timeLabel: formatClockTime(inspected, cityZone, hour12),
    status,
    dim: status.id === 'night',
    isHome,
    dateLabel: formatShortDate(inspected, cityZone),
  }
}

export function formatScrubDelta(offsetMs: number): string {
  if (Math.abs(offsetMs) < 30_000) return 'NOW'
  const mins = Math.round(offsetMs / 60_000)
  const sign = mins < 0 ? '-' : '+'
  const abs = Math.abs(mins)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  if (h === 0) return `${sign}${m}M`
  if (m === 0) return `${sign}${h}H`
  return `${sign}${h}H ${m}M`
}

/** Pixels per hour on the timeline ruler. */
export const PX_PER_HOUR = 48
export const MS_PER_HOUR = 3_600_000

export function scrubMsFromPixels(dx: number): number {
  return (dx / PX_PER_HOUR) * MS_PER_HOUR
}

export function pixelsFromScrubMs(ms: number): number {
  return (ms / MS_PER_HOUR) * PX_PER_HOUR
}
