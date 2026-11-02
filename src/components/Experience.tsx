import { MapPin } from 'lucide-react'
import { experience } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function ExperienceSection() {
  return (
    <section id="experience" className="section border-y border-line/40">
      <div className="shell">
        <SectionHeading
          kicker="Where I've worked"
          title="Experience"
          description="Five years of shipping production software across enterprise platforms, design systems and micro-frontend architectures."
        />

        <div className="mt-14 space-y-4">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 0.06}>
              <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-bright sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {job.company}
                      </h3>
                      {index === 0 ? (
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-accent">{job.role}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-flex rounded-full border border-line bg-elevated px-3 py-1 font-mono text-[11px] tracking-wide text-zinc-400">
                      {job.period}
                    </span>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-zinc-500">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 grid gap-3 sm:gap-2.5">
                  {job.points.map((point) => (
                    <li key={point.slice(0, 30)} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/80"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
