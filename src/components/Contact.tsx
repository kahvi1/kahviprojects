import { ChevronDown, CircleCheck, LoaderCircle, Mail, Send, TriangleAlert } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'

import { profile, services } from '../content/site'
import { buttonClass } from './styles'
import { GitHubIcon, LinkedInIcon, Reveal, SectionHeading } from './ui'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const inputClass =
  'w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle transition-shadow focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none'

function Field({ label, htmlFor, optional, children }: { label: string; htmlFor: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-subtle">Optional</span>}
      </label>
      {children}
    </div>
  )
}

export function Contact({ service, onServiceChange }: { service: string; onServiceChange: (id: string) => void }) {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Bots fill the hidden field; pretend it worked and drop the message.
    if (data.get('_gotcha')) {
      setStatus('sent')
      return
    }

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const topic = services.find((item) => item.id === service)?.title ?? 'General inquiry'
    const subject = `Consulting inquiry: ${topic}`

    if (!FORMSPREE_ID) {
      const lines = [`Name: ${name}`, `Email: ${email}`]
      if (company) lines.push(`Company: ${company}`)
      lines.push('', message)
      const body = lines.join('\n')
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, service: topic, message, _subject: subject }),
      })
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`)
      form.reset()
      onServiceChange('')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div
        className="hero-glow absolute bottom-0 left-1/2 -z-10 h-[480px] w-[min(900px,140vw)] -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      />
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            description="Tell me what you're working on: the problem, your data and any deadline. I'll reply by email with questions or a proposed next step."
          />
          <Reveal delay={80}>
            <ul className="mt-8 space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-3 text-sm font-medium hover:text-accent"
                >
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-muted group-hover:text-accent">
                    <Mail className="size-[18px]" aria-hidden="true" />
                  </span>
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm font-medium hover:text-accent"
                >
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-muted group-hover:text-accent">
                    <LinkedInIcon className="size-4" />
                  </span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm font-medium hover:text-accent"
                >
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-muted group-hover:text-accent">
                    <GitHubIcon className="size-4" />
                  </span>
                  GitHub
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="card p-6 shadow-xl shadow-black/5 sm:p-8 dark:shadow-black/30">
            {status === 'sent' ? (
              <div className="flex flex-col items-start py-6" role="status">
                <CircleCheck className="size-10 text-emerald-500" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight">Thanks, your message is on its way.</h3>
                <p className="mt-2 text-muted">I'll get back to you by email.</p>
                <button type="button" onClick={() => setStatus('idle')} className={buttonClass('secondary', 'mt-6')}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name">
                    <input id="name" name="name" required autoComplete="name" className={inputClass} placeholder="Your name" />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Company" htmlFor="company" optional>
                    <input id="company" name="company" autoComplete="organization" className={inputClass} placeholder="Company or team" />
                  </Field>
                  <Field label="Topic" htmlFor="service">
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={service}
                        onChange={(event) => onServiceChange(event.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">General inquiry</option>
                        {services.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle"
                        aria-hidden="true"
                      />
                    </div>
                  </Field>
                </div>

                <Field label="Message" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${inputClass} resize-y`}
                    placeholder="What are you building, and where could I help?"
                  />
                </Field>

                <div className="hidden" aria-hidden="true">
                  <label>
                    Leave this field empty
                    <input name="_gotcha" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" disabled={status === 'sending'} className={buttonClass('primary', 'w-full sm:w-auto')}>
                    {status === 'sending' ? (
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="size-4" aria-hidden="true" />
                    )}
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  <p className="text-xs text-subtle">
                    {FORMSPREE_ID ? 'Sent securely via Formspree.' : 'Opens your email app with the message filled in.'}
                  </p>
                </div>

                <div aria-live="polite">
                  {status === 'error' && (
                    <p className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
                      <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>
                        Something went wrong sending your message. Please try again or email me at{' '}
                        <a href={`mailto:${profile.email}`} className="font-semibold underline">
                          {profile.email}
                        </a>
                        .
                      </span>
                    </p>
                  )}
                  {status === 'mailto' && (
                    <p className="flex items-start gap-2 rounded-xl border border-line bg-surface-2 p-3 text-sm text-muted">
                      <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>
                        Your email app should open with the message ready to send. If it didn't, write to{' '}
                        <a href={`mailto:${profile.email}`} className="font-semibold text-fg underline">
                          {profile.email}
                        </a>
                        .
                      </span>
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
