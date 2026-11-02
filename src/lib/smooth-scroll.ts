import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sets up Lenis smooth scrolling and keeps GSAP's ScrollTrigger in sync.
 * Returns a cleanup function. No-op when the user prefers reduced motion.
 */
export function initSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
  })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)

  const raf = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // Route in-page anchor links through Lenis so jumps stay smooth.
  const onClick = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const anchor = target.closest('a[href^="#"]')
    if (!(anchor instanceof HTMLAnchorElement)) return

    const hash = anchor.getAttribute('href')
    if (!hash || hash === '#') return

    const section = document.querySelector(hash)
    if (!(section instanceof HTMLElement)) return

    event.preventDefault()
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash)
    }
    lenis.scrollTo(section, { offset: -72, duration: 1.1 })
  }

  document.addEventListener('click', onClick)

  // Section positions shift once images/fonts settle.
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  requestAnimationFrame(refresh)

  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('load', refresh)
    gsap.ticker.remove(raf)
    gsap.ticker.lagSmoothing(500, 33)
    lenis.destroy()
  }
}
