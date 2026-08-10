import { CrosshairIcon, GearIcon, PlusIcon } from './icons'

type Props = {
  onSettings: () => void
  onRecenter: () => void
  onAdd: () => void
  canRecenter: boolean
}

export function FooterActions({ onSettings, onRecenter, onAdd, canRecenter }: Props) {
  return (
    <div className="footer">
      <button className="icon-btn" type="button" aria-label="Settings" onClick={onSettings}>
        <GearIcon />
      </button>
      <div className="footer-right">
        <button
          className={`icon-btn${canRecenter ? ' is-active' : ''}`}
          type="button"
          aria-label="Recenter to now"
          onClick={onRecenter}
        >
          <CrosshairIcon />
        </button>
        <button className="icon-btn" type="button" aria-label="Add city" onClick={onAdd}>
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}
