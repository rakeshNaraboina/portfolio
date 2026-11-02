import { CircleCheck, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formspreeId, profile } from '../data/portfolio'
import { Reveal } from './Reveal'
import { GithubIcon, LinkedinIcon } from './icons'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent('Project enquiry from your portfolio')}`

export function Contact() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const isConfigured = Boolean(formspreeId) && formspreeId !== 'YOUR_FORMSPREE_ID'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isConfigured) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, message }),
      })

      if (!response.ok) throw new Error(`Request failed with ${response.status}`)

      setStatus('success')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/85 backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/4 h-64 w-96 rounded-full bg-accent/10 blur-[110px]"
          />
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-25" />

          <div className="relative grid gap-12 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <Reveal>
              <span className="kicker">Get in touch</span>
              <h2 className="section-title">Let's Connect</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
                Have a role, a product or a tricky frontend problem in mind? I'm always happy to talk
                architecture, performance and building things that scale.
              </p>

              <div className="mt-9 space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor-label="Email"
                  className="group flex items-center gap-4 rounded-xl border border-line bg-ink/60 p-4 transition-colors hover:border-accent/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      Email
                    </span>
                    <span className="block truncate text-sm font-medium text-white transition-colors group-hover:text-accent-soft">
                      {profile.email}
                    </span>
                  </span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label="LinkedIn"
                  className="group flex items-center gap-4 rounded-xl border border-line bg-ink/60 p-4 transition-colors hover:border-accent/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-zinc-300">
                    <LinkedinIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      LinkedIn
                    </span>
                    <span className="block truncate text-sm font-medium text-white transition-colors group-hover:text-accent-soft">
                      in/rakesh-naraboina
                    </span>
                  </span>
                </a>

                {profile.github ? (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="GitHub"
                    className="group flex items-center gap-4 rounded-xl border border-line bg-ink/60 p-4 transition-colors hover:border-accent/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-zinc-300">
                      <GithubIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                        GitHub
                      </span>
                      <span className="block truncate text-sm font-medium text-white transition-colors group-hover:text-accent-soft">
                        View profile
                      </span>
                    </span>
                  </a>
                ) : null}

                <div className="flex items-center gap-4 rounded-xl border border-line bg-ink/60 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-zinc-300">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      Based in
                    </span>
                    <span className="block text-sm font-medium text-white">{profile.location}</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-line bg-ink/70 p-6 sm:p-7"
              >
                <p className="font-display text-base font-semibold text-white">Or send a message</p>
                <p className="mt-1 text-xs text-zinc-500">
                  I usually reply within a day.
                </p>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      Email address
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-accent/60 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      Your message
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Tell me a little about what you have in mind…"
                      className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-accent/60 focus:outline-none"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      Sending…
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div aria-live="polite" className="mt-4 text-xs">
                  {status === 'success' ? (
                    <p className="flex items-center gap-2 text-emerald-400">
                      <CircleCheck className="h-4 w-4" />
                      Thanks — your message is on its way.
                    </p>
                  ) : null}
                  {status === 'error' ? (
                    <p className="text-red-400">
                      Something went wrong. Please email me directly at{' '}
                      <a href={mailtoHref} className="underline underline-offset-2">
                        {profile.email}
                      </a>
                      .
                    </p>
                  ) : null}
                  {status === 'unconfigured' ? (
                    <p className="text-zinc-400">
                      The form isn't connected yet. Add your Formspree ID to{' '}
                      <code className="rounded bg-elevated px-1 py-0.5 font-mono text-[11px] text-accent-soft">
                        VITE_FORMSPREE_ID
                      </code>{' '}
                      — or{' '}
                      <a href={mailtoHref} className="text-white underline underline-offset-2">
                        email me directly
                      </a>
                      .
                    </p>
                  ) : null}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
