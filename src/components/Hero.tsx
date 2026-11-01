import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'
import { easing } from '../lib/motion'
import { GithubIcon, LinkedinIcon } from './icons'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easing } },
}

const words = ['Learning.', 'Building.', 'Improving.']

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-60" />
        <div className="absolute -top-44 left-1/2 h-[540px] w-[min(900px,95vw)] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[340px] w-[340px] rounded-full bg-accent/5 blur-[110px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 select-none flex-col items-end gap-1 xl:flex"
      >
        {words.map((word, index) => (
          <span
            key={word}
            className={`font-display text-7xl font-bold leading-[0.95] tracking-tighter ${
              index === 2 ? 'text-outline' : 'text-white/[0.045]'
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="shell relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={item} className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              {profile.tagline}
            </span>
          </motion.div>

          <h1 className="mt-8 font-display text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            <motion.span variants={item} className="block">
              {profile.headline.lead}
            </motion.span>
            <motion.span variants={item} className="block text-accent">
              {profile.headline.accent}
            </motion.span>
            <motion.span variants={item} className="block">
              {profile.headline.tail}
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-primary group">
              Let's Connect
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#projects" className="btn-ghost group">
              View Projects
              <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Find me
            </span>
            <span className="h-px w-8 bg-line-bright" />
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-zinc-400 transition-colors hover:border-accent/60 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-zinc-400 transition-colors hover:border-accent/60 hover:text-white"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              {profile.github ? (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-zinc-400 transition-colors hover:border-accent/60 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-accent"
            animate={{ y: [0, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </section>
  )
}
