import { ArrowUp, Mail } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './icons'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="font-display text-xl font-semibold tracking-tight text-white">
              {profile.logo}
              <span className="text-accent">.</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {profile.role} building fast, accessible and scalable products from {profile.location}.
            </p>
            <div className="mt-5 flex items-center gap-2">
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
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-2">
            <p className="col-span-full font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
              Navigate
            </p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-accent/60 hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Built with React &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
