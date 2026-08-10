import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { searchCities, type City } from '../lib/cities'

type Props = {
  open: boolean
  existingIds: Set<string>
  onClose: () => void
  onAdd: (city: City) => void
}

export function AddCitySheet({ open, existingIds, onClose, onAdd }: Props) {
  const [query, setQuery] = useState('')
  const reduce = useReducedMotion()
  const results = useMemo(() => searchCities(query, existingIds), [query, existingIds])

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
            aria-label="Add city"
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
            <div className="sheet-title">Add city</div>
            <input
              className="sheet-search"
              placeholder="Search 400+ cities & timezones"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <div className="sheet-list">
              {results.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  className="sheet-item"
                  onClick={() => {
                    onAdd(city)
                    setQuery('')
                    onClose()
                  }}
                >
                  <div>
                    <div className="sheet-item-name">{city.name}</div>
                    <div className="sheet-item-meta">{city.country ?? city.timeZone}</div>
                  </div>
                  <div className="sheet-item-zone">{city.timeZone.split('/').pop()}</div>
                </button>
              ))}
              {results.length === 0 ? (
                <div className="sheet-item-meta" style={{ padding: 12 }}>
                  No matches
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
