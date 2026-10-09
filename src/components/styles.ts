export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-gradient text-white shadow-lg shadow-indigo-600/20 hover:brightness-110 hover:shadow-indigo-600/30',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-accent/60 hover:bg-surface-2',
  ghost: 'text-muted hover:bg-surface-2 hover:text-fg',
}

export function buttonClass(variant: ButtonVariant = 'primary', className?: string) {
  return cx(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    buttonStyles[variant],
    className,
  )
}
