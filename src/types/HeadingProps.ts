export interface HeadingProps {
    children: React.ReactNode
    [key: string]: any
    fontFamily?: 'sans' | 'serif' | 'mono'
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'label' | 'li'
    spacing?: 'default' | 'none' | 'small' | 'large'
    className?: string
    clamp?: 'none' | 1 | 2 | 3 | 4 | 5 | 6
    text?: 'balance' | 'pretty' | 'nowrap' | 'wrap'
    dangerouslySetInnerHTML?: any;
  }
  