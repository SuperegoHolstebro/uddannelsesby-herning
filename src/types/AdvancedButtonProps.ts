import { cva, type VariantProps } from 'class-variance-authority'
import { advancedButtonVariants } from '../components/atoms/AdvancedButton'

export interface AdvancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof advancedButtonVariants> {
  variant: 'default' | 'secondary' | 'primary' | 'none'
  asChild?: boolean
}
