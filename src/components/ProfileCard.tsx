import { useEffect, useRef } from 'react'
import './profile-card.css'

type ProfileCardProps = {
  imageUrl: string
  name: string
  title: string
  handle: string
  status: string
  contactText: string
  contactHref: string
  className?: string
}

const SMOOTHING = 0.14

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max)

export function ProfileCard({
  imageUrl,
  name,
  title,
  handle,
  status,
  contactText,
  contactHref,
  className = '',
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const shell = shellRef.current
    if (!wrap || !shell) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: 50, y: 50, rx: 0, ry: 0 }
    const current = { x: 50, y: 50, rx: 0, ry: 0 }
    let raf = 0
    let last = performance.now()
    let hovering = false

    const write = () => {
      wrap.style.setProperty('--pointer-x', `${current.x.toFixed(2)}%`)
      wrap.style.setProperty('--pointer-y', `${current.y.toFixed(2)}%`)
      wrap.style.setProperty('--rotate-x', `${current.rx.toFixed(3)}deg`)
      wrap.style.setProperty('--rotate-y', `${current.ry.toFixed(3)}deg`)
      wrap.style.setProperty('--pointer-from-left', (current.x / 100).toFixed(4))
      wrap.style.setProperty('--pointer-from-top', (current.y / 100).toFixed(4))
      wrap.style.setProperty(
        '--pointer-from-center',
        Math.min(1, Math.hypot(current.x - 50, current.y - 50) / 50).toFixed(4),
      )
      wrap.style.setProperty('--background-x', `${(50 + (current.x - 50) * 1.8).toFixed(2)}%`)
      wrap.style.setProperty('--background-y', `${(50 + (current.y - 50) * 1.8).toFixed(2)}%`)
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      const alpha = 1 - Math.exp(-dt / SMOOTHING)

      current.x += (target.x - current.x) * alpha
      current.y += (target.y - current.y) * alpha
      current.rx += (target.rx - current.rx) * alpha
      current.ry += (target.ry - current.ry) * alpha
      write()

      const settled =
        Math.abs(target.x - current.x) < 0.05 &&
        Math.abs(target.y - current.y) < 0.05 &&
        Math.abs(target.rx - current.rx) < 0.02 &&
        Math.abs(target.ry - current.ry) < 0.02

      if (!hovering && settled) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const px = clamp(((event.clientX - rect.left) / rect.width) * 100)
      const py = clamp(((event.clientY - rect.top) / rect.height) * 100)

      target.x = px
      target.y = py
      target.ry = ((px - 50) / 50) * 12
      target.rx = -((py - 50) / 50) * 10
      start()
    }

    const onEnter = () => {
      hovering = true
      wrap.classList.add('is-active')
      wrap.style.setProperty('--card-opacity', '1')
      start()
    }

    const onLeave = () => {
      hovering = false
      wrap.classList.remove('is-active')
      wrap.style.setProperty('--card-opacity', '0')
      target.x = 50
      target.y = 50
      target.rx = 0
      target.ry = 0
      start()
    }

    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerenter', onEnter, { passive: true })
    wrap.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className={`pc-wrap ${className}`}>
      <div className="pc-behind" aria-hidden="true" />

      <div ref={shellRef} className="pc-shell">
        <div className="pc-inner">
          <img
            className="pc-avatar"
            src={imageUrl}
            alt={`${name} — ${title}`}
            loading="lazy"
            draggable={false}
          />
          <div className="pc-scrim" aria-hidden="true" />
          <div className="pc-shine" aria-hidden="true" />
          <div className="pc-glare" aria-hidden="true" />

          <div className="pc-hud">
            <span className="pc-status">
              <span className="pc-dot" />
              {status}
            </span>

            <div className="pc-foot">
              <div>
                <p className="pc-name">{name}</p>
                <p className="pc-title">{title}</p>
                <p className="pc-handle">{handle}</p>
              </div>
              <a className="pc-cta" href={contactHref}>
                {contactText}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
