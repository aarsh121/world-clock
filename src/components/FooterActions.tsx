import { CloseIcon, CrosshairIcon, GearIcon, PinIcon, PlusIcon } from './icons'

type Props = {
  onSettings: () => void
  onRecenter: () => void
  onAdd: () => void
  canRecenter: boolean
  isSticky?: boolean
  alwaysOnTop?: boolean
  onTogglePin?: () => void
  onClose?: () => void
}

export function FooterActions({
  onSettings,
  onRecenter,
  onAdd,
  canRecenter,
  isSticky,
  alwaysOnTop,
  onTogglePin,
  onClose,
}: Props) {
  return (
    <div className="footer">
      <div className="footer-left">
        <button className="icon-btn" type="button" aria-label="Settings" onClick={onSettings}>
          <GearIcon />
        </button>
        {isSticky && onTogglePin ? (
          <button
            className={`icon-btn${alwaysOnTop ? ' is-active' : ''}`}
            type="button"
            aria-label={alwaysOnTop ? 'Unpin from top' : 'Keep on top'}
            title={alwaysOnTop ? 'Unpin' : 'Keep on top'}
            onClick={onTogglePin}
          >
            <PinIcon />
          </button>
        ) : null}
      </div>
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
        {isSticky && onClose ? (
          <button className="icon-btn icon-btn-danger" type="button" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </div>
  )
}
