import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, type ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

type SectionFadeProps = {
  children: ReactNode
  className?: string
}

/**
 * Dissolves a section as it leaves the viewport, synced to Lenis via
 * ScrollTrigger. Skipped entirely for reduced-motion users.
 */
export function SectionFade({ children, className }: SectionFadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.to(element, {
        opacity: 0,
        y: -44,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'bottom 38%',
          end: 'bottom -12%',
          scrub: 0.9,
        },
      })
    })

    return () => context.revert()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
