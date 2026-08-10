export type DayStatusId =
  | 'night'
  | 'before_work'
  | 'working'
  | 'almost_done'
  | 'evening'

export type WorkHours = {
  beforeWorkStart: number
  workStart: number
  almostDoneStart: number
  eveningStart: number
  nightStart: number
}

export const DEFAULT_WORK_HOURS: WorkHours = {
  beforeWorkStart: 6,
  workStart: 9,
  almostDoneStart: 17,
  eveningStart: 19,
  nightStart: 22,
}

export type DayStatus = {
  id: DayStatusId
  label: string
  tone: 'muted' | 'green' | 'orange' | 'warm'
}

const LABELS: Record<DayStatusId, DayStatus> = {
  night: { id: 'night', label: 'NIGHT', tone: 'muted' },
  before_work: { id: 'before_work', label: 'BEFORE WORK', tone: 'warm' },
  working: { id: 'working', label: 'WORKING', tone: 'green' },
  almost_done: { id: 'almost_done', label: 'ALMOST DONE', tone: 'orange' },
  evening: { id: 'evening', label: 'EVENING', tone: 'warm' },
}

export function statusForHour(hour: number, hours: WorkHours = DEFAULT_WORK_HOURS): DayStatus {
  const h = ((hour % 24) + 24) % 24
  if (h >= hours.nightStart || h < hours.beforeWorkStart) return LABELS.night
  if (h < hours.workStart) return LABELS.before_work
  if (h < hours.almostDoneStart) return LABELS.working
  if (h < hours.eveningStart) return LABELS.almost_done
  return LABELS.evening
}
