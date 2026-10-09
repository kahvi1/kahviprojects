import { ArrowRight } from 'lucide-react'

import { featuredProjects, profile, stats } from '../content/site'
import { PipelineFlow } from './PipelineFlow'
import { ButtonLink, Reveal } from './ui'

const flagship = featuredProjects.find((project) => project.flow)

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="hero-glow absolute top-0 left-1/2 -z-10 h-[560px] w-[min(1000px,140vw)] -translate-x-1/2 -translate-y-1/3"
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={60}>
            <p className="mt-6 text-sm font-medium text-muted sm:text-base">
              {profile.name} <span className="text-subtle">·</span> {profile.role}
            </p>
            <h1 className="mt-3 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {profile.headline.lead} <span className="text-gradient">{profile.headline.highlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#contact">
                Book a consultation <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#work" variant="secondary">
                View my work
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-xs leading-snug text-muted sm:text-sm">{stat.label}</dt>
                  <dd className="text-xl font-semibold tracking-tight sm:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {flagship?.flow && (
          <Reveal delay={200} className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute -inset-4 -z-10 rounded-[28px] bg-accent-gradient opacity-[0.12] blur-2xl"
                aria-hidden="true"
              />
              <PipelineFlow
                title="Now building: national dedup pipeline"
                caption="Airflow"
                steps={flagship.flow.steps}
                className="shadow-2xl shadow-black/5 dark:shadow-black/40"
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
