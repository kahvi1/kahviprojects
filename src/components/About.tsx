import { about } from '../content/site'
import { Chips, Reveal, SectionHeading } from './ui'

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="About" title="Engineer by trade, researcher by habit" />
          <Reveal className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {about.highlights.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.title} className="card flex gap-3.5 p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{item.title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">{item.detail}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:pt-24">
          <div className="card p-6 sm:p-8">
            <h3 className="font-semibold tracking-tight">Toolbox</h3>
            <div className="mt-6 space-y-6">
              {about.skills.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-semibold tracking-wide text-subtle uppercase">{group.label}</p>
                  <Chips items={group.items} className="mt-2.5" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
