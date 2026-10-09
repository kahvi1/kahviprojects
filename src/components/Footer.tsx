import { ArrowUp, Mail } from 'lucide-react'

import { navLinks, profile } from '../content/site'
import { Logo } from './Navbar'
import { GitHubIcon, LinkedInIcon } from './ui'

const year = new Date().getFullYear()

const socials = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: <Mail className="size-[18px]" aria-hidden="true" /> },
  { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedInIcon className="size-4" /> },
  { label: 'GitHub', href: profile.github, icon: <GitHubIcon className="size-4" /> },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={social.label}
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="container-page">
        <div className="flex items-center justify-between border-t border-line py-6 text-xs text-subtle">
          <p>
            © {year} {profile.fullName}
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 hover:text-fg">
            Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
