import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { BadgeProps } from '@/types/BadgeProps'
import { cn } from '@/utils/utils'

/**
 *
 * @returns: En overskriftskomponent med brugerdefineret styling
 * @example: <Badge >Overskrift</Badge>
 * @alias: Badge
 * @module: components/global/Badge
 * @summary: Denne komponent bruges til at oprette en ny overskrift med brugerdefinerede stilarter.
 * @see: src/components/global/Badge.tsx
 * @version: 1.0.0
 * @property: [fontFamily, type, tag, spacing, maxWidth, clamp, text]
 * @author: Kasper Buchholtz
 *
 **/

const BadgeVariants = cva(
  'p-2.5 leading-none text-regular w-fit uppercase rounded-full h-fit',
  {
    variants: {
      variant: {
        pink: 'bg-signal-pink',
        dark: 'bg-mørk text-lys',
      },
    },
    defaultVariants: {
      variant: 'pink',
    },
  },
)

type ExtendedBadgeProps = BadgeProps & VariantProps<typeof BadgeVariants>

const Badge: React.FC<ExtendedBadgeProps> = ({
  children,
  variant,
  className,
  dangerouslySetInnerHTML,
  ...props
}) => {
  return (
    <span
      {...props}
      className={cn(
        className,
        BadgeVariants({
          variant,
        }),
      )}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </span>
  )
}

export default Badge

/* import React from 'react'

const Badge = ({className}) => {
  return <span>Hello from bg-mørk p-2 text-lys rounded-full </span>
}

export default Badge
 */
