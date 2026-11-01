import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  kicker: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <span className="kicker">{kicker}</span>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
