import { useEffect, useRef, useState } from 'react'

// Keeps the render's warm key light, just deepens it into the page's palette.
const GRADE = 'brightness(0.76) contrast(1.06) saturate(1.05)'
const MOBILE_QUERY = '(max-width: 767px)'

type Mode = 'video' | 'images' | 'static'

const MOBILE_SECTIONS = [
  { id: null, src: '/img/bg-poster.jpg' },
  { id: 'about', src: '/img/bg-1.jpg' },
  { id: 'experience', src: '/img/bg-2.jpg' },
  { id: 'projects', src: '/img/bg-3.jpg' },
  { id: 'contact', src: '/img/bg-4.jpg' },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const getMode = (): Mode => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static'
  if (window.matchMedia(MOBILE_QUERY).matches) return 'images'
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return 'images'
  return 'video'
}

/**
 * Fixed cinematic backdrop.
 *
 * Desktop: two copies of the loop — one forward, one reversed — driven by
 * scroll velocity. Slow scrolling seeks the relevant copy frame by frame;
 * fast scrolling plays it at a matching rate. Scrolling up reveals the
 * reversed copy so the scene rewinds instead of stuttering.
 *
 * Mobile: the section stills slide vertically with the scroll. Reduced motion
 * and data-saver users get a single static still.
 */
export function CinematicBackground() {
  const [mode, setMode] = useState<Mode>(() =>
    typeof window !== 'undefined' ? getMode() : 'static',
  )

  const fwdRef = useRef<HTMLVideoElement>(null)
  const revRef = useRef<HTMLVideoElement>(null)
  const mobileLayersRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMode(getMode())

    mobile.addEventListener('change', sync)
    reduced.addEventListener('change', sync)

    return () => {
      mobile.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  // ── Desktop: velocity-aware forward / reverse video scrub ──────────────
  useEffect(() => {
    if (mode !== 'video') return

    const fwd = fwdRef.current
    const rev = revRef.current
    if (!fwd || !rev) return

    let duration = 0
    let raf = 0
    let prevY = window.scrollY
    let prevT = performance.now()
    let vel = 0
    let frozenSnap: number | null = null
    let active: HTMLVideoElement = fwd
    let videoEndScroll = 1

    const FREEZE_VEL = 5
    const PLAY_VEL = 90
    const EDGE = 0.12

    const calcVideoEnd = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const contact = document.getElementById('contact')

      if (contact) {
        const top = contact.getBoundingClientRect().top + window.scrollY
        // The scene finishes when the contact section reaches mid-viewport.
        videoEndScroll = clamp(top + contact.offsetHeight * 0.5 - window.innerHeight * 0.5, 1, max)
      } else {
        videoEndScroll = max
      }
    }

    calcVideoEnd()
    window.addEventListener('load', calcVideoEnd, { once: true })
    window.addEventListener('resize', calcVideoEnd, { passive: true })

    const show = (element: HTMLVideoElement) => {
      if (active === element) return
      active = element
      fwd.style.opacity = element === fwd ? '1' : '0'
      rev.style.opacity = element === rev ? '1' : '0'
    }

    let fwdSeeking = false
    let fwdPending: { t: number; fast: boolean } | null = null
    const seekFwd = (t: number, fast = false) => {
      fwdPending = { t: clamp(t, 0, duration), fast }
      if (!fwdSeeking) flushFwd()
    }
    const flushFwd = () => {
      if (!fwdPending) {
        fwdSeeking = false
        return
      }
      const { t, fast } = fwdPending
      fwdPending = null
      if (Math.abs(fwd.currentTime - t) < 0.033) {
        fwdSeeking = false
        return
      }
      fwdSeeking = true
      if (fast && fwd.fastSeek) fwd.fastSeek(t)
      else fwd.currentTime = t
    }
    fwd.addEventListener('seeked', flushFwd)

    let revSeeking = false
    let revPending: { t: number; fast: boolean } | null = null
    const seekRev = (t: number, fast = false) => {
      revPending = { t: clamp(t, 0, duration), fast }
      if (!revSeeking) flushRev()
    }
    const flushRev = () => {
      if (!revPending) {
        revSeeking = false
        return
      }
      const { t, fast } = revPending
      revPending = null
      if (Math.abs(rev.currentTime - t) < 0.033) {
        revSeeking = false
        return
      }
      revSeeking = true
      if (fast && rev.fastSeek) rev.fastSeek(t)
      else rev.currentTime = t
    }
    rev.addEventListener('seeked', flushRev)

    let fwdSyncAt = 0
    let revSyncAt = 0
    const bgSyncFwd = (t: number, now: number) => {
      if (now - fwdSyncAt < 300 || Math.abs(fwd.currentTime - t) < 0.3) return
      if (fwd.fastSeek) fwd.fastSeek(t)
      else fwd.currentTime = t
      fwdSyncAt = now
    }
    const bgSyncRev = (t: number, now: number) => {
      if (now - revSyncAt < 300 || Math.abs(rev.currentTime - t) < 0.3) return
      if (rev.fastSeek) rev.fastSeek(t)
      else rev.currentTime = t
      revSyncAt = now
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!duration) return

      const dt = Math.max((now - prevT) / 1000, 0.001)
      prevT = now
      const scrollY = window.scrollY
      vel = vel * 0.82 + ((scrollY - prevY) / dt) * 0.18
      prevY = scrollY

      const progress = clamp(scrollY / Math.max(1, videoEndScroll), 0, 1)
      const target = progress * duration
      const reverseTarget = duration - target
      const absVel = Math.abs(vel)
      const atStart = target <= EDGE
      const atEnd = progress >= 1

      // Past the contact midpoint: hold the final frame, no more seeking.
      if (atEnd) {
        if (!fwd.paused) fwd.pause()
        if (!rev.paused) rev.pause()
        show(fwd)
        frozenSnap = null
        return
      }

      // Nearly still (or at the very top): pin the scene.
      if (absVel < FREEZE_VEL || atStart) {
        if (!fwd.paused) fwd.pause()
        if (!rev.paused) rev.pause()
        show(fwd)
        if (frozenSnap === null) {
          frozenSnap = atStart ? 0 : target
          seekFwd(frozenSnap)
        }
        return
      }
      frozenSnap = null

      // Slow scroll: seek frame by frame in the matching direction.
      if (absVel < PLAY_VEL) {
        if (!fwd.paused) fwd.pause()
        if (!rev.paused) rev.pause()

        if (vel > 0) {
          if (target > fwd.currentTime + 0.033) seekFwd(target)
          show(fwd)
          bgSyncRev(reverseTarget, now)
        } else {
          if (reverseTarget > rev.currentTime + 0.033) seekRev(reverseTarget, true)
          show(rev)
          bgSyncFwd(target, now)
        }
        return
      }

      // Fast scroll: let the videos play at a rate that follows the finger.
      const inverse = duration / videoEndScroll

      if (vel > 0) {
        const rate = clamp(vel * inverse, 0.25, 8)
        if (Math.abs(fwd.playbackRate - rate) > 0.05) fwd.playbackRate = rate
        if (Math.abs(fwd.currentTime - target) > 1.5) fwd.currentTime = target
        if (fwd.paused) fwd.play().catch(() => {})
        if (!rev.paused) rev.pause()
        show(fwd)
        bgSyncRev(reverseTarget, now)
      } else {
        const rate = clamp(absVel * inverse, 0.25, 8)
        if (Math.abs(rev.playbackRate - rate) > 0.05) rev.playbackRate = rate
        if (Math.abs(rev.currentTime - reverseTarget) > 1.5) rev.currentTime = reverseTarget
        if (rev.paused) rev.play().catch(() => {})
        if (!fwd.paused) fwd.pause()
        show(rev)
        bgSyncFwd(target, now)
      }
    }

    const onFwdEnded = () => {
      fwd.pause()
      fwd.currentTime = duration
    }
    const onRevEnded = () => {
      rev.pause()
      rev.currentTime = duration
    }
    fwd.addEventListener('ended', onFwdEnded)
    rev.addEventListener('ended', onRevEnded)

    const setup = () => {
      duration = Number.isFinite(fwd.duration) ? fwd.duration : 0
      if (!duration) return

      fwd.currentTime = 0
      if (Number.isFinite(rev.duration) && rev.readyState >= 1) rev.currentTime = duration

      cancelAnimationFrame(raf)
      prevT = performance.now()
      prevY = window.scrollY
      raf = requestAnimationFrame(frame)

      // Warm the reversed copy after first paint so upward scrolling is smooth.
      window.setTimeout(() => {
        if (!rev.isConnected) return
        rev
          .play()
          .then(() => {
            rev.pause()
            rev.currentTime = duration
          })
          .catch(() => {})
      }, 3000)
    }

    if (fwd.readyState >= 1) setup()
    else fwd.addEventListener('loadedmetadata', setup, { once: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', calcVideoEnd)
      fwd.removeEventListener('seeked', flushFwd)
      rev.removeEventListener('seeked', flushRev)
      fwd.removeEventListener('ended', onFwdEnded)
      rev.removeEventListener('ended', onRevEnded)
      fwd.pause()
      rev.pause()
    }
  }, [mode])

  // ── Mobile: images slide up with the scroll ────────────────────────────
  useEffect(() => {
    if (mode !== 'images') return

    const layers = mobileLayersRef.current
    if (!layers.length) return

    let tops: number[] = []
    let zoneSizes: number[] = []
    let raf = 0
    let lastIdx = -1
    let lastProgress = -1

    const measure = () => {
      tops = MOBILE_SECTIONS.map((section) => {
        if (!section.id) return 0
        const element = document.getElementById(section.id)
        if (!element) return 0
        return element.getBoundingClientRect().top + window.scrollY
      })

      zoneSizes = MOBILE_SECTIONS.map((section) => {
        if (!section.id) return window.innerHeight
        const element = document.getElementById(section.id)
        // Keep the next still off-screen until the user actually starts scrolling.
        return Math.min((element?.offsetHeight ?? window.innerHeight) * 0.35, window.innerHeight * 0.5)
      })
    }

    const getIndex = () => {
      const marker = window.scrollY + window.innerHeight * 0.5
      for (let i = MOBILE_SECTIONS.length - 1; i >= 1; i -= 1) {
        if (tops[i] && marker >= tops[i]) return i
      }
      return 0
    }

    const getProgress = (index: number) => {
      const next = index + 1
      if (next >= MOBILE_SECTIONS.length) return 0
      const zone = Math.max(1, zoneSizes[next] || window.innerHeight * 0.35)
      const relative = window.scrollY + window.innerHeight * 0.5 - (tops[next] - zone)
      return clamp(relative / zone, 0, 1)
    }

    const lazyLoad = (layer: HTMLDivElement | null) => {
      if (layer && !layer.style.backgroundImage && layer.dataset.bg) {
        layer.style.backgroundImage = `url(${layer.dataset.bg})`
      }
    }

    const frame = () => {
      raf = requestAnimationFrame(frame)

      const index = getIndex()
      const progress = getProgress(index)
      if (index === lastIdx && Math.abs(progress - lastProgress) < 0.001) return
      lastIdx = index
      lastProgress = progress

      lazyLoad(layers[index] ?? null)
      lazyLoad(layers[index + 1] ?? null)

      layers.forEach((layer, layerIndex) => {
        if (!layer) return

        if (layerIndex === index) {
          layer.style.transform = `translateY(${-(progress * 8).toFixed(2)}%)`
          layer.style.opacity = `${(1 - progress * 0.6).toFixed(3)}`
          layer.style.zIndex = '1'
        } else if (layerIndex === index + 1) {
          layer.style.transform = `translateY(${((1 - progress) * 100).toFixed(2)}%)`
          layer.style.opacity = `${(0.4 + progress * 0.6).toFixed(3)}`
          layer.style.zIndex = '2'
        } else if (layerIndex < index) {
          layer.style.transform = 'translateY(-8%)'
          layer.style.opacity = '0'
          layer.style.zIndex = '0'
        } else {
          layer.style.transform = 'translateY(100%)'
          layer.style.opacity = '0'
          layer.style.zIndex = '0'
        }
      })
    }

    measure()
    frame()
    window.addEventListener('load', measure)
    window.addEventListener('resize', measure, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [mode])

  return (
    <div
      data-background={mode}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink"
      aria-hidden="true"
    >
      {mode === 'video' ? (
        <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
          <video
            ref={fwdRef}
            src="/videos/scene.mp4"
            poster="/img/bg-poster.jpg"
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            disablePictureInPicture
            onError={() => setMode('images')}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: GRADE, transform: 'translateZ(0)' }}
          />
          <video
            ref={revRef}
            src="/videos/scene-rev.mp4"
            muted
            playsInline
            preload="none"
            tabIndex={-1}
            disablePictureInPicture
            onError={() => setMode('images')}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            style={{ filter: GRADE, transform: 'translateZ(0)' }}
          />
        </div>
      ) : null}

      {mode === 'images' ? (
        <div className="absolute inset-0">
          {MOBILE_SECTIONS.map((section, index) => (
            <div
              key={section.src}
              ref={(element) => {
                mobileLayersRef.current[index] = element
              }}
              data-bg={section.src}
              className="absolute inset-0 h-full w-full"
              style={{
                backgroundImage: index === 0 ? `url(${section.src})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: GRADE,
                transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)',
                opacity: index === 0 ? 1 : 0,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      ) : null}

      {mode === 'static' ? (
        <img
          src="/img/bg-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: GRADE }}
        />
      ) : null}

      {/* Legibility veil — keeps body copy readable over the render. */}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/50" />

      {/* Warm accent blooms */}
      <div className="absolute -left-[12%] top-[6%] h-[48vw] w-[48vw] rounded-full bg-accent/10 blur-[150px]" />
      <div className="absolute -bottom-[8%] right-[-6%] h-[34vw] w-[34vw] rounded-full bg-accent/[0.07] blur-[130px]" />
    </div>
  )
}
