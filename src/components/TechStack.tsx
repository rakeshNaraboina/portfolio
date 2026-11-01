import { techStack } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="shell">
        <SectionHeading
          kicker="What I work with"
          title="Tech Stack"
          description="The tools, frameworks and platforms I reach for when designing, building and shipping products."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {techStack.map((group, index) => (
            <Reveal
              key={group.group}
              delay={Math.min(index * 0.04, 0.2)}
              className={index === techStack.length - 1 && techStack.length % 2 !== 0 ? 'sm:col-span-2' : ''}
            >
              <div className="card h-full p-6 transition-colors duration-300 hover:border-line-bright">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{group.group}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
