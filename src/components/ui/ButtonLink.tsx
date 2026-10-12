import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/classNames'
import { isExternalUrl } from '../../lib/paths'
import './ButtonLink.css'

export type ButtonVariant = 'primary' | 'ghost'

type Props = {
  href: string
  variant?: ButtonVariant
  className?: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'target' | 'rel'>

/** Anchor styled as a button; off-site links open in a new tab. */
export function ButtonLink({ href, variant = 'primary', className, children, ...rest }: Props) {
  const external = isExternalUrl(href)

  return (
    <a
      href={href}
      className={cx('btn', variant, className)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      {...rest}
    >
      {children}
    </a>
  )
}
