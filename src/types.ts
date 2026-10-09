import type { LucideIcon } from 'lucide-react'

export type ProjectStatus = 'current' | 'past' | 'research'

export interface ProjectLink {
  label: string
  href: string
  kind: 'live' | 'code' | 'paper'
}

export interface Metric {
  value: string
  label: string
}

export interface FlowStep {
  label: string
  detail: string
}

export interface Publication {
  title: string
  venue: string
  details: string
  status: string
}

export interface FeaturedProject {
  id: string
  title: string
  status: ProjectStatus
  period: string
  role: string
  org?: string
  summary: string
  highlights: string[]
  stack: string[]
  metrics?: Metric[]
  flow?: { caption: string; steps: FlowStep[] }
  publication?: Publication
  links: ProjectLink[]
}

export interface Project {
  id: string
  title: string
  status: Exclude<ProjectStatus, 'research'>
  period: string
  description: string
  stack: string[]
  links: ProjectLink[]
}

export interface Service {
  id: string
  title: string
  icon: LucideIcon
  summary: string
  deliverables: string[]
}

export interface EngagementModel {
  title: string
  description: string
  bestFor: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Highlight {
  icon: LucideIcon
  title: string
  detail: string
}

export interface SkillGroup {
  label: string
  items: string[]
}
