import type { City } from '../lib/cities'
import type { CityViewModel } from '../lib/time'
import { MoonIcon, SunIcon } from './icons'

type Props = {
  city: City
  view: CityViewModel
}

export function CityRow({ city, view }: Props) {
  return (
    <div className={`city-row${view.dim ? ' is-dim' : ''}`}>
      <div>
        <div className="city-meta">{view.offsetMeta}</div>
        <div className="city-name">{city.name}</div>
      </div>
      <div>
        <div className="city-status">
          <span>{view.status.label}</span>
          <StatusGlyph tone={view.status.tone} id={view.status.id} />
        </div>
        <div className="city-time">{view.timeLabel}</div>
      </div>
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
