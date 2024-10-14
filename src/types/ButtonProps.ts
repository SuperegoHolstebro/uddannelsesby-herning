export interface ButtonProps {
  children: React.ReactNode
  scrollTo?: string
  link: {
    url: string
    blank?: boolean
    label: string
    email?: string
    phone?: string
    _ref?: string
    internalUrl?: string
    anchor?: string
    internalLink: {
      _type?: string
    }
  }
  variant?: 'default' | 'primary' | 'secondary' | 'none' | string
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'full' | string
  className?: string
  [key: string]: any
}
