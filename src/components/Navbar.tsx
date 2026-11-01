import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-line bg-ink/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-18 items-center justify-between gap-6">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-xl font-semibold tracking-tight text-white"
          >
            {profile.logo}
            <span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === link.href ? 'text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {link.label}
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-primary !px-5 !py-2.5 text-[13px]"
            >
              Let's Connect
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <motion.div
          className="h-px origin-left bg-accent"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="border-b border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <nav className="shell flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-zinc-300 transition-colors hover:bg-elevated hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-3 w-full"
              >
                Let's Connect
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
