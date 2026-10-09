import { ArrowRight, Check } from 'lucide-react'

import { engagementModels, processSteps, services } from '../content/site'
import { Reveal, SectionHeading } from './ui'

export function Consulting({ onSelectService }: { onSelectService: (serviceId: string) => void }) {
  return (
    <section id="consulting" className="relative border-y border-line bg-surface/50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Consulting"
          title="Hire me for data, ML and product engineering"
          description="I take on a small number of engagements alongside my current work. Bring a messy dataset, a search problem or a product idea; you get working software and a clear write-up."
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <li key={service.id}>
                <Reveal delay={(index % 2) * 80} className="h-full">
                  <article className="card group flex h-full flex-col p-6 transition-colors hover:border-accent/40 sm:p-7">
                    <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      onClick={() => onSelectService(service.id)}
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent"
                    >
                      Discuss this
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="text-xl font-semibold tracking-tight">Ways to work together</h3>
            <ul className="mt-6 space-y-3">
              {engagementModels.map((model) => (
                <li key={model.title} className="card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-semibold">{model.title}</h4>
                    <span className="text-xs font-medium text-subtle">Best for: {model.bestFor}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{model.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="text-xl font-semibold tracking-tight">How it works</h3>
            <ol className="mt-6 space-y-0">
              {processSteps.map((step, index) => (
                <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
                  {index < processSteps.length - 1 && (
                    <span className="absolute top-10 bottom-0 left-[19px] w-px bg-line" aria-hidden="true" />
                  )}
                  <span className="bg-accent-gradient grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="pt-1.5">
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
