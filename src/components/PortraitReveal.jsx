import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import portraitPhoto from '../assets/hero-portrait-photo.webp'
import { useMediaQuery } from '../hooks/useMediaQuery'

const trailDuration = 2800
const trailHold = 600
const maxTrailPoints = 16

export default function PortraitReveal({ artSrc, alt }) {
  const buttonRef = useRef(null)
  const frameRef = useRef(null)
  const pointRef = useRef(null)
  const trailRef = useRef([])
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [photoReady, setPhotoReady] = useState(false)

  useEffect(() => {
    const button = buttonRef.current
    return () => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
      pointRef.current = null
      trailRef.current = []
      button?.removeAttribute('data-revealing')
    }
  }, [reducedMotion])

  function resetPointer() {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    pointRef.current = null
    trailRef.current = []
    buttonRef.current?.removeAttribute('data-revealing')
    buttonRef.current?.style.removeProperty('--reveal-mask')
  }

  function paintReveal() {
    frameRef.current = null
    const button = buttonRef.current
    if (!button) return
    const now = performance.now()
    trailRef.current = trailRef.current.filter(point => now - point.time < trailDuration)
    const point = pointRef.current
    const spots = trailRef.current.map(sample => ({
      ...sample, opacity: Math.pow(1 - Math.max(0, now - sample.time - trailHold) / (trailDuration - trailHold), 1.5) * 0.85
    }))
    if (point) spots.push({ ...point, opacity: 1 })
    if (!spots.length) { resetPointer(); return }

    // Keep the art opaque underneath: complementary alpha masks caused a dark seam.
    const mask = spots.map(spot =>
      `radial-gradient(ellipse var(--reveal-radius-x) var(--reveal-radius-y) at ${(spot.x * 100).toFixed(3)}% ${(spot.y * 100).toFixed(3)}%, rgb(0 0 0 / ${spot.opacity.toFixed(3)}) 35%, transparent 100%)`
    ).join(', ')
    button.style.setProperty('--reveal-mask', mask)
    button.setAttribute('data-revealing', 'true')
    if (trailRef.current.length) frameRef.current = requestAnimationFrame(paintReveal)
  }

  function scheduleReveal() {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(paintReveal)
  }

  function leavePointer() {
    if (reducedMotion) { resetPointer(); return }
    if (pointRef.current) {
      trailRef.current = [...trailRef.current, { ...pointRef.current, time: performance.now() }].slice(-maxTrailPoints)
      pointRef.current = null
    }
    if (trailRef.current.length) scheduleReveal()
  }

  function revealAtPointer(event) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    if (x > 0.5 || x < 0 || y < 0 || y > 1) { leavePointer(); return }
    const radiusX = Math.min(50, Math.max(32, bounds.width * 0.0925))
    const previous = pointRef.current
    if (!reducedMotion && previous) {
      const distance = Math.hypot((x - previous.x) * bounds.width, (y - previous.y) * bounds.height)
      if (distance > 2) {
        const steps = Math.min(8, Math.ceil(distance / (radiusX * 0.6)))
        const time = performance.now()
        for (let step = 0; step < steps; step++) {
          trailRef.current.push({
            x: previous.x + (x - previous.x) * step / steps,
            y: previous.y + (y - previous.y) * step / steps, time
          })
        }
        trailRef.current = trailRef.current.slice(-maxTrailPoints)
      }
    }
    pointRef.current = { x, y }
    event.currentTarget.style.setProperty('--reveal-x', x * 100 + '%')
    event.currentTarget.style.setProperty('--reveal-y', y * 100 + '%')
    event.currentTarget.style.setProperty('--reveal-radius-x', radiusX + 'px')
    event.currentTarget.style.setProperty('--reveal-radius-y', radiusX * 1.55 + 'px')
    scheduleReveal()
  }

  return (
    <div ref={buttonRef} className="hero-portrait" data-photo-ready={photoReady}
      onPointerEnter={revealAtPointer} onPointerMove={revealAtPointer}
      onPointerLeave={leavePointer} onPointerCancel={resetPointer}>
      <img className="hero-art-base" src={artSrc} alt={alt} width="960" height="1152"
        loading="eager" decoding="async" draggable="false" />
      <span className="hero-art-real-side" aria-hidden="true">
        <img src={portraitPhoto} alt="" width="960" height="1152" loading="eager"
          decoding="async" draggable="false" />
      </span>
      <span className="hero-art-reveal" aria-hidden="true">
        <img src={portraitPhoto} alt="" width="960" height="1152" loading="eager"
          decoding="async" draggable="false" onLoad={() => setPhotoReady(true)}
          onError={() => setPhotoReady(false)} />
      </span>
    </div>
  )
}

PortraitReveal.propTypes = { artSrc: PropTypes.string.isRequired, alt: PropTypes.string.isRequired }
