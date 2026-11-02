import { useEffect, useRef } from 'react'

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]'
const FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]'

/**
 * White cursor orb: a ~10 px dot at rest that grows into a 104 px disc over
 * any link. The wrapper blends into the page (`mix-blend-mode: difference`),
 * so the disc inverts whatever sits under it — link text flips to black
 * inside the circle. Native cursors stay untouched inside form fields.
 */
export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const outer = outerRef.current
    if (!outer) return

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
      const inField = Boolean(target?.closest(FIELD_SELECTOR))
      const interactive = target?.closest(HOVER_SELECTOR)

      outer.classList.toggle('is-field', inField)
      outer.classList.toggle('is-hovering', Boolean(interactive) && !inField)
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
      <div className="cursor__orb" />
    </div>
  )
}
