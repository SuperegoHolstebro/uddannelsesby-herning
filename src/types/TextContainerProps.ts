export interface TextContainerProps {
  data?: Record<string, unknown>
  asChild?: boolean
  paddingX?: 'default' | 'none' | 'right' | 'left'
  paddingTop?: 'default' | 'none' | any
  paddingBottom?: 'default' | 'none' | any
  children?: React.ReactNode
  [key: string]: any
}
