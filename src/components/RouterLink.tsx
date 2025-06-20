import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

// Type Imports
import type { ChildrenType } from '@/@core/types'

type RouterLinkProps = LinkProps & Partial<ChildrenType> & {
  className?: string
}

export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => {
  return <Link ref={ref} {...props} />
})

RouterLink.displayName = 'RouterLink'