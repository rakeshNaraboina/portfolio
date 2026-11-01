import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { GithubIcon } from './icons'

export function Projects() {
  return (
    <section id="projects" className="section border-y border-line/60 bg-surface/40">
      <div className="shell">
        <SectionHeading
          kicker="Explore my creations"
          title="Project Showcase"
          description="A selection of engineering initiatives — from reusable micro-frontend packages to platform-wide performance work."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={Math.min(index * 0.06, 0.2)}>
              <article className="group card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-line-bright hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.95)]">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-[radial-gradient(130%_120%_at_10%_0%,#1d1d26_0%,#0b0b10_62%)]">
                  <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
                  <div
                    aria-hidden="true"
                    className="absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/15 blur-[70px] transition-opacity duration-500 group-hover:opacity-100 sm:opacity-70"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-10 right-3 select-none font-display text-[9rem] font-bold leading-none text-white/[0.05]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : null}

                  <span className="absolute left-4 top-4 max-w-[85%] truncate rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-300 backdrop-blur">
                    {project.category}
                  </span>

                  <div aria-hidden="true" className="absolute right-4 top-4 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                  </div>

                  <div aria-hidden="true" className="absolute bottom-4 left-4 flex items-end gap-1.5">
                    {[10, 18, 26, 14, 22].map((height, barIndex) => (
                      <span
                        key={barIndex}
                        style={{ height }}
                        className="w-1 rounded-full bg-accent/25 transition-all duration-500 group-hover:bg-accent/40"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-accent-soft sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{project.description}</p>

                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight.slice(0, 24)} className="flex gap-2.5 text-[13px] leading-relaxed text-zinc-400">
                        <span
                          aria-hidden="true"
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent/80"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="chip !px-2.5 !py-1 !text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.github || project.live ? (
                      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            GitHub
                          </a>
                        ) : null}
                        {project.live ? (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            Live Site
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
