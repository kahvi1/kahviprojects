import { Database, GitMerge, LibraryBig, UserCheck, WandSparkles, Workflow } from 'lucide-react'

import type { FlowStep } from '../types'
import { cx } from './styles'

const stepIcons = [Database, WandSparkles, GitMerge, UserCheck, LibraryBig]

/** Vertical diagram of a pipeline's stages, shown in the hero. */
export function PipelineFlow({
  title,
  caption,
  steps,
  className,
}: {
  title?: string
  caption: string
  steps: FlowStep[]
  className?: string
}) {
  return (
    <figure className={cx('card relative overflow-hidden p-5 sm:p-6', className)}>
      <figcaption className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Workflow className="size-4 text-accent" aria-hidden="true" />
          {title ?? 'Pipeline'}
        </span>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">{caption}</span>
      </figcaption>

      <ol className="mt-5 space-y-1">
        {steps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length]
          const last = index === steps.length - 1
          return (
            <li key={step.label} className="relative flex items-center gap-4 rounded-xl px-2 py-2.5">
              {!last && (
                <span
                  className="absolute top-[calc(50%+18px)] left-[27px] h-[calc(100%-26px)] w-px bg-gradient-to-b from-accent/50 to-line"
                  aria-hidden="true"
                />
              )}
              <span className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{step.label}</span>
                <span className="block text-sm text-muted">{step.detail}</span>
              </span>
              <span className="ml-auto font-mono text-[11px] text-subtle" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
