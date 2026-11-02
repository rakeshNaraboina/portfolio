import { useEffect } from 'react'
import { initSmoothScroll } from '../lib/smooth-scroll'

/** Mounts Lenis smooth scrolling for the lifetime of the app. */
export function SmoothScroll() {
  useEffect(() => initSmoothScroll(), [])
  return null
}
