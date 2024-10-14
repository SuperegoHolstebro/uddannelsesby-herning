export interface ParagraphProps {
    children: React.ReactNode
    size?: 'regular' | 'increased' | 'medium'
    [key: string]: any
    portableText?: boolean
    spacing?: 'default' | 'none' | 'small' | 'large'
    className?: string
  }