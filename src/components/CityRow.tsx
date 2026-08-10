import type { City } from '../lib/cities'
import type { CityViewModel } from '../lib/time'
import { MoonIcon, RemoveIcon, SunIcon } from './icons'

type Props = {
  city: City
  view: CityViewModel
  canRemove?: boolean
  onRemove?: () => void
}

export function CityRow({ city, view, canRemove, onRemove }: Props) {
  return (
    <div className={`city-row${view.dim ? ' is-dim' : ''}`}>
      <div className="city-main">
        <div className="city-meta">{view.offsetMeta}</div>
        <div className="city-name">{city.name}</div>
      </div>
      <div className="city-side">
        <div className="city-status">
          <span>{view.status.label}</span>
          <StatusGlyph tone={view.status.tone} id={view.status.id} />
        </div>
        <div className="city-time">{view.timeLabel}</div>
      </div>
      {canRemove && onRemove ? (
        <button
          type="button"
          className="city-remove"
          aria-label={`Remove ${city.name}`}
          title="Remove city"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <RemoveIcon />
        </button>
      ) : null}
    </div>
  )
}

function StatusGlyph({
  tone,
  id,
}: {
  tone: CityViewModel['status']['tone']
  id: CityViewModel['status']['id']
}) {
  if (id === 'night') return <MoonIcon className="status-icon" />
  if (id === 'before_work' || id === 'evening') return <SunIcon className="status-icon" />
  return <span className={`status-dot tone-${tone === 'orange' ? 'orange' : tone === 'warm' ? 'warm' : ''}`} />
}
