import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { City } from '../lib/cities'
import type { Prefs } from '../lib/store'
import type { WorkHours } from '../lib/status'

type Props = {
  open: boolean
  prefs: Prefs
  isTauri: boolean
  onClose: () => void
  onChange: (next: Prefs) => void
  onReset: () => void
}

export function SettingsSheet({ open, prefs, isTauri, onClose, onChange, onReset }: Props) {
  const reduce = useReducedMotion()

  function patchWork(key: keyof WorkHours, value: number) {
    onChange({
      ...prefs,
      workHours: { ...prefs.workHours, [key]: value },
    })
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="sheet-backdrop"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
            onClick={onClose}
          />
          <motion.div
            className="sheet"
            role="dialog"
            aria-label="Settings"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: 'spring', stiffness: 420, damping: 36, mass: 0.9 }
            }
          >
            <div className="sheet-handle" />
            <div className="sheet-title">Settings</div>

            <div className="settings-group">
              <div className="settings-row">
                <label htmlFor="hour12">12-hour clock</label>
                <button
                  type="button"
                  className={`toggle${prefs.hour12 ? ' is-on' : ''}`}
                  id="hour12"
                  aria-pressed={prefs.hour12}
                  onClick={() => onChange({ ...prefs, hour12: !prefs.hour12 })}
                >
                  <span className="toggle-knob" />
                </button>
              </div>

              <div className="settings-row">
                <label htmlFor="home">Home city</label>
                <select
                  id="home"
                  value={prefs.homeId}
                  onChange={(e) => onChange({ ...prefs, homeId: e.target.value })}
                >
                  {prefs.cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {isTauri ? (
                <div className="settings-row">
                  <label htmlFor="aot">Always on top</label>
                  <button
                    type="button"
                    className={`toggle${prefs.alwaysOnTop ? ' is-on' : ''}`}
                    id="aot"
                    aria-pressed={prefs.alwaysOnTop}
                    onClick={() => onChange({ ...prefs, alwaysOnTop: !prefs.alwaysOnTop })}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              ) : null}
            </div>

            <div className="sheet-title" style={{ marginTop: 4, fontSize: 13 }}>
              Work hours
            </div>
            <div className="settings-group">
              {(
                [
                  ['beforeWorkStart', 'Before work'],
                  ['workStart', 'Working'],
                  ['almostDoneStart', 'Almost done'],
                  ['eveningStart', 'Evening'],
                  ['nightStart', 'Night'],
                ] as const
              ).map(([key, label]) => (
                <div className="settings-row" key={key}>
                  <label htmlFor={key}>{label} from</label>
                  <input
                    id={key}
                    type="number"
                    min={0}
                    max={23}
                    value={prefs.workHours[key]}
                    onChange={(e) => patchWork(key, Number(e.target.value))}
                  />
                </div>
              ))}
            </div>

            <div className="sheet-title" style={{ marginTop: 4, fontSize: 13 }}>
              Cities
            </div>
            <div className="city-chip-list">
              {prefs.cities.map((city: City) => (
                <div className="city-chip" key={city.id}>
                  <span>
                    {city.name}
                    {city.id === prefs.homeId ? ' · home' : ''}
                  </span>
                  {prefs.cities.length > 1 && city.id !== prefs.homeId ? (
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...prefs,
                          cities: prefs.cities.filter((c) => c.id !== city.id),
                        })
                      }
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

            <button type="button" className="ghost-btn" onClick={onReset}>
              Reset to defaults
            </button>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
