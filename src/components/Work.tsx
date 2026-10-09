import { ArrowUpRight, BookMarked, ChevronRight, CircleCheck, ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'

import { featuredProjects, otherProjects } from '../content/site'
import type { FeaturedProject, Project, ProjectLink } from '../types'
import { cx } from './styles'
import { Chips, GitHubIcon, Reveal, SectionHeading, StatusBadge } from './ui'

function LinkIcon({ kind }: { kind: ProjectLink['kind'] }) {
  if (kind === 'code') return <GitHubIcon className="size-4" />
  if (kind === 'paper') return <BookMarked className="size-4" aria-hidden="true" />
  return <ExternalLink className="size-4" aria-hidden="true" />
}

function ProjectLinks({ links, className }: { links: ProjectLink[]; className?: string }) {
  if (links.length === 0) return null
  return (
    <div className={cx('flex flex-wrap gap-x-5 gap-y-2', className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg underline-offset-4 hover:text-accent hover:underline"
        >
          <LinkIcon kind={link.kind} />
          {link.label}
          <ArrowUpRight className="size-3.5 text-subtle" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

function FlowStrip({ flow }: { flow: NonNullable<FeaturedProject['flow']> }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-5">
      <p className="text-xs font-semibold tracking-wide text-accent uppercase">{flow.caption}</p>
      <ol className="mt-4 space-y-3">
        {flow.steps.map((step, index) => (
          <li key={step.label} className="flex items-start gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line-strong bg-surface font-mono text-[11px] text-muted">
              {index + 1}
            </span>
            <span className="text-sm leading-6">
              <span className="font-semibold">{step.label}</span>
              <ChevronRight className="mx-1 inline size-3.5 text-subtle" aria-hidden="true" />
              <span className="text-muted">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function FeaturedCard({ project, index }: { project: FeaturedProject; index: number }) {
  return (
    <Reveal>
      <article
        aria-labelledby={`${project.id}-title`}
        className="card grid gap-8 p-6 transition-colors hover:border-line-strong sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:p-10"
      >
        <div className="min-w-0 lg:col-start-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, '0')}</span>
            <StatusBadge status={project.status} />
            <span className="text-sm text-muted">{project.period}</span>
          </div>

          <h3 id={`${project.id}-title`} className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="font-semibold">{project.role}</span>
            {project.org && <span className="text-muted"> · {project.org}</span>}
          </p>

          <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>
        </div>

        <aside
          className="flex flex-col gap-4 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
          aria-label={`${project.title}: key facts`}
        >
          {project.publication && (
            <div className="rounded-xl border border-line bg-surface-2 p-5">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase">
                <BookMarked className="size-4" aria-hidden="true" />
                Publication · {project.publication.status}
              </p>
              <p className="mt-3 leading-snug font-semibold">{project.publication.title}</p>
              <p className="mt-2 text-sm text-muted">{project.publication.venue}</p>
              <p className="mt-1 text-xs text-subtle">{project.publication.details}</p>
            </div>
          )}

          {project.metrics && (
            <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end rounded-xl border border-line bg-surface-2 p-4">
                  <dt className="mt-1 text-xs leading-snug text-muted">{metric.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.flow && <FlowStrip flow={project.flow} />}
        </aside>

        <div className="min-w-0 lg:col-start-1">
          <ul className="space-y-3">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Chips items={project.stack} className="mt-7" />
          <ProjectLinks links={project.links} className="mt-6" />
        </div>
      </article>
    </Reveal>
  )
}

type Filter = 'all' | Project['status']

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'current', label: 'Current' },
  { id: 'past', label: 'Past' },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col p-5 transition-colors hover:border-line-strong">
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={project.status} />
        <span className="text-right text-xs text-subtle">{project.period}</span>
      </div>
      <h4 className="mt-4 font-semibold tracking-tight">{project.title}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
      <Chips items={project.stack} className="mt-4" />
      <ProjectLinks links={project.links} className="mt-5 border-t border-line pt-4" />
    </article>
  )
}

function OtherProjects() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = useMemo(
    () => (filter === 'all' ? otherProjects : otherProjects.filter((project) => project.status === filter)),
    [filter],
  )

  return (
    <div className="mt-24">
      <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">More projects</h3>
          <p className="mt-2 text-muted">Side projects, client work and experiments.</p>
        </div>
        <div className="inline-flex self-start rounded-full border border-line bg-surface p-1" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cx(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                filter === item.id ? 'bg-fg text-bg' : 'text-muted hover:text-fg',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Work() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects and research"
          description="What I'm building now and what I've shipped before, from national data infrastructure to search engines and peer-reviewed ML research."
        />
        <div className="mt-12 space-y-6">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <OtherProjects />
      </div>
    </section>
  )
}
