import { forwardRef } from 'react'
import type { ComponentProps, ForwardedRef, MouseEvent } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type Props = Omit<ComponentProps<typeof RouterLink>, 'to' | 'onClick'> & {
  href?: string
  to?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const Link = (props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { href, to, onClick, ...rest } = props
  const destination = to || href || '/'

  return (
    <RouterLink
      ref={ref}
      {...rest}
      to={destination}
      onClick={onClick ? e => onClick(e) : !destination ? e => e.preventDefault() : undefined}
    />
  )
}

export default forwardRef(Link)