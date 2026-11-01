import { GraduationCap, MapPin } from 'lucide-react'
import { about, profile } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading kicker="Get to know me" title="About Me" />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5" y={32}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2.5 rounded-[1.85rem] border border-line/80 sm:-inset-3"
              />
              <div className="relative overflow-hidden rounded-3xl border border-line bg-elevated">
                <img
                  src={profile.photo}
                  alt={`${profile.name} — ${profile.role}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full scale-[1.02] object-cover object-[52%_18%] grayscale-[12%] transition-all duration-700 ease-out hover:scale-105 hover:grayscale-0"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{profile.name}</p>
                    <p className="text-xs text-zinc-400">{profile.shortRole}</p>
                  </div>
                  <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="space-y-5 text-base leading-relaxed text-zinc-400">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                <MapPin className="h-4 w-4 text-accent" />
                {profile.location}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <div className="card flex flex-wrap items-center justify-between gap-5 p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                      Education
                    </p>
                    <p className="mt-1 font-display text-base font-semibold text-white">
                      {about.education.school}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {about.education.degree} · {about.education.year}
                    </p>
                  </div>
                </div>
                <span className="chip !border-accent/30 !bg-accent/10 !text-accent-soft">
                  {about.education.grade}
                </span>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {about.highlights.map((highlight, index) => (
                <Reveal key={highlight.label} delay={0.05 * index} className="bg-surface">
                  <div className="px-5 py-5">
                    <p className="font-display text-2xl font-semibold tracking-tight text-white">
                      {highlight.value}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{highlight.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
