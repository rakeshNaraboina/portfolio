import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { easing } from '../lib/motion'

type BlurTextProps = {
  text: string
  className?: string
  /** Seconds between word reveals. */
  delay?: number
}

/** Reveals copy word by word: blur + rise, once in view. */
export function BlurText({ text, className = '', delay = 0.045 }: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  if (reduceMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 16 }}
          animate={
            inView
              ? { opacity: 1, filter: 'blur(0px)', y: 0 }
              : { opacity: 0, filter: 'blur(10px)', y: 16 }
          }
          transition={{ duration: 0.6, delay: index * delay, ease: easing }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}
