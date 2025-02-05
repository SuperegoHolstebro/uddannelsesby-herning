import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { AdvancedButtonProps } from '@/types/AdvancedButtonProps'
import { cn } from '@/utils/utils'

/**
 *
 * @returns: En knap-komponent med brugerdefineret styling
 * @example:
 * <AdvancedButton variant="default">Knap</AdvancedButton>
 * <AdvancedButton variant="default"><Link>Knap</Link></AdvancedButton>
 * <AdvancedButton variant="default"><Icon /><Link>Knap</Link></AdvancedButton>
 * @alias: AdvancedButton
 * @module: components/AdvancedButton
 * @summary: Denne komponent bruges til at oprette en ny knap med brugerdefinerede stilarter.
 * @see: src/components/AdvancedButton.tsx
 * @version: 1.0.0
 * @property: [variant, size, asChild]
 * @author: Kasper Buchholtz
 *
 **/

const advancedButtonVariants = cva(
  'inline-flex items-center uppercase gap-4 justify-center rounded-md text-sm font-medium ring-offset-background group/button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#325FF3] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', // whitespace-nowrap
  {
    variants: {
      variant: {
        default: 'pr-4 py-2 text-mørk font-bold hover:', // @deprecated
        primary: 'pr-4 py-2 text-mørk font-bold hover:',
        secondary: 'pr-4 py-2 text-signal-gul font-bold hover:',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type ExtendedAdvancedButtonProps = AdvancedButtonProps &
  VariantProps<typeof advancedButtonVariants>

const AdvancedButton = React.forwardRef<
  HTMLButtonElement,
  ExtendedAdvancedButtonProps
>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(advancedButtonVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
})
AdvancedButton.displayName = 'Button'

export { AdvancedButton, advancedButtonVariants }
