/** Joins the truthy class names, e.g. cx('card', isActive && 'is-active'). */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
