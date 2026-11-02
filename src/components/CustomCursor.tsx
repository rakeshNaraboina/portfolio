import { useEffect, useRef } from 'react'

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]'
const FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]'
const MAX_LABEL = 22

/** Drops decorative glyphs (arrow spans, icons) before reading a label. */
function readableText(element: Element) {
  const clone = element.cloneNode(true) as Element
  clone.querySelectorAll('[aria-hidden="true"]').forEach((node) => node.remove())
  return (clone.textContent ?? '').replace(/\s+/g, ' ').trim()
}

/** Pulls a short, readable label for the cursor bubble. */
function getLabel(element: Element) {
  const explicit = element.getAttribute('data-cursor-label')
  const aria = element.getAttribute('aria-label')
  const text = element.querySelector('[aria-hidden="true"]')
    ? readableText(element)
    : (element.textContent ?? '').replace(/\s+/g, ' ').trim()

  let label = explicit || (text && text.length <= MAX_LABEL ? text : aria) || text || aria || ''
  if (label.length > MAX_LABEL) label = `${label.slice(0, MAX_LABEL - 1).trimEnd()}…`
  return label
}

/**
 * White cursor orb. Shrinks to a dot over empty space and grows into a white
 * disc with the hovered link's label in the middle. Native cursors stay
 * untouched inside form fields.
 */
export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const outer = outerRef.current
    const orb = orbRef.current
    const label = labelRef.current
    if (!outer || !orb || !label) return

    const root = document.documentElement
    root.classList.add('cursor-none')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let posX = mouseX
    let posY = mouseY
    let raf = 0

    const render = () => {
      posX += (mouseX - posX) * 0.16
      posY += (mouseY - posY) * 0.16
      outer.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      outer.classList.add('is-visible')
    }

    const applyTarget = (target: Element | null) => {
      if (!target) {
        outer.classList.remove('is-hovering', 'is-field')
        label.textContent = ''
        return
      }

      if (target.closest(FIELD_SELECTOR)) {
        outer.classList.add('is-field')
        outer.classList.remove('is-hovering')
        label.textContent = ''
        return
      }

      outer.classList.remove('is-field')

      const interactive = target.closest(HOVER_SELECTOR)
      if (!interactive) {
        outer.classList.remove('is-hovering')
        label.textContent = ''
        return
      }

      label.textContent = getLabel(interactive)
      outer.classList.add('is-hovering')
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element) applyTarget(target)
    }

    // Scrolling can move a link out from under a stationary pointer.
    let scrollFrame = 0
    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        applyTarget(document.elementFromPoint(mouseX, mouseY))
      })
    }

    const onDown = () => outer.classList.add('is-pressed')
    const onUp = () => outer.classList.remove('is-pressed')
    const hide = () => outer.classList.remove('is-visible')
    const show = () => outer.classList.add('is-visible')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    window.addEventListener('blur', hide)

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(scrollFrame)
      root.classList.remove('cursor-none')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      window.removeEventListener('blur', hide)
    }
  }, [])

  return (
    <div ref={outerRef} className="cursor" aria-hidden="true">
      <div ref={orbRef} className="cursor__orb">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </div>
  )
}
