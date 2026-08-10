import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react'
import {
  PX_PER_HOUR,
  pixelsFromScrubMs,
  scrubMsFromPixels,
} from '../lib/time'

type Props = {
  scrubMs: number
  onScrub: (ms: number) => void
  utcLabel: string
  deltaLabel: string
}

const HOURS_SPAN = 36 // visible window ±18h around playhead content

export function Timeline({ scrubMs, onScrub, utcLabel, deltaLabel }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startX: number; startScrub: number; pointerId: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [width, setWidth] = useState(360)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const ticks = useMemo(() => {
    const half = (HOURS_SPAN / 2) * PX_PER_HOUR
    const centerShift = -pixelsFromScrubMs(scrubMs)
    const items: { key: number; x: number; major: boolean; hour: boolean }[] = []
    // Place ticks every 15 minutes across a wide band, then translate with scrub
    const stepPx = PX_PER_HOUR / 4
    const origin = centerShift
    const start = Math.floor((-half - origin) / stepPx) * stepPx
    for (let x = start; x <= half * 2; x += stepPx) {
      const abs = x + origin
      if (abs < -half - 40 || abs > half + 40) continue
      const hourIndex = Math.round((x / PX_PER_HOUR) * 4) / 4
      const isHour = Number.isInteger(hourIndex)
      const isMajor = isHour && hourIndex % 3 === 0
      items.push({ key: x, x: abs + width / 2, major: isMajor, hour: isHour })
    }
    return items
  }, [scrubMs, width])

  function onPointerDown(e: ReactPointerEvent) {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    drag.current = { startX: e.clientX, startScrub: scrubMs, pointerId: e.pointerId }
    setDragging(true)
  }

  function onPointerMove(e: ReactPointerEvent) {
    if (!drag.current || drag.current.pointerId !== e.pointerId) return
    const dx = e.clientX - drag.current.startX
    // Dragging right → earlier time (ruler moves with finger under fixed playhead)
    onScrub(drag.current.startScrub - scrubMsFromPixels(dx))
  }

  function endDrag(e: ReactPointerEvent) {
    if (!drag.current || drag.current.pointerId !== e.pointerId) return
    drag.current = null
    setDragging(false)
  }

  function onWheel(e: ReactWheelEvent) {
    e.preventDefault()
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
    onScrub(scrubMs + scrubMsFromPixels(delta * 0.35))
  }

  return (
    <div
      className={`timeline${dragging ? ' is-dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
    >
      <div className="timeline-header">
        <span>{utcLabel}</span>
        <span>{deltaLabel}</span>
      </div>
      <div className="timeline-track" ref={trackRef}>
        <div className="timeline-ticks">
          {ticks.map((t) => (
            <span
              key={t.key}
              className={`tick${t.major ? ' is-major' : t.hour ? ' is-hour' : ' is-minor'}`}
              style={{ left: t.x }}
            />
          ))}
        </div>
        <div className="playhead" />
      </div>
    </div>
  )
}
