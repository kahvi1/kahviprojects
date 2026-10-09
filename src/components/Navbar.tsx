import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { navLinks, profile } from '../content/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { cx } from './styles'
import { ButtonLink } from './ui'

const sectionIds = ['home', ...navLinks.map((link) => link.id)]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  )
}

export function Logo() {
  return (
    <a href="#home" className="group inline-flex items-center gap-2.5 rounded-lg" aria-label={`${profile.name}, back to top`}>
      <span className="bg-accent-gradient grid size-8 place-items-center rounded-lg text-sm font-bold text-white shadow-md shadow-indigo-600/20">
        K
      </span>
      <span className="text-[15px] font-semibold tracking-tight">{profile.name}</span>
    </a>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              className={cx(
                'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                active === link.id ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden sm:block">
            <ButtonLink href="#contact" className="px-4 py-2">
              Work with me
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line md:hidden">
        <div className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className={cx(
                'rounded-xl px-3 py-2.5 text-base font-medium',
                active === link.id ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {link.label}
            </a>
          ))}
          <ButtonLink href="#contact" onClick={() => setOpen(false)} className="mt-2">
            Work with me
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
