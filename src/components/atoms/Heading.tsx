import { cva } from 'class-variance-authority'
import React from 'react'
import { HeadingProps } from '@/types/HeadingProps'
import { cn } from '@/utils/utils'

/**
 *
 * @returns: En overskriftskomponent med brugerdefineret styling
 * @example: <Heading >Overskrift</Heading>
 * @alias: Heading
 * @module: components/global/Heading
 * @summary: Denne komponent bruges til at oprette en ny overskrift med brugerdefinerede stilarter.
 * @see: src/components/global/Heading.tsx
 * @version: 1.0.0
 * @property: [fontFamily, type, tag, spacing, maxWidth, clamp, text]
 * @author: Kasper Buchholtz
 *
 **/

const HeadingVariants = cva('text-balance rwx hyphens-auto', {
  variants: {
    text: {
      balance: 'text-balance',
      pretty: 'text-pretty',
      nowrap: 'text-nowrap',
      wrap: 'text-wrap',
    },
    type: {
      h1: 'text-giant font-bold leading-none tracking-normal',
      h2: 'text-huge leading-none tracking-normal font-bold',
      h3: 'text-large leading-tight tracking-tight font-bold',
      h4: 'text-medium leading-none tracking-tight font-bold',
      h5: 'text-increased leading-none tracking-tight font-bold',
      h6: 'text-regular font-bold',
      span: 'text-small font-bold',
      p: 'text-regular font-normal',
    },
    fontFamily: {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    },
    tag: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      span: 'span',
      p: 'p',
    },
    spacing: {
      large: 'mb-12',
      default: 'mb-8',
      small: 'mb-4',
      none: '',
    },
    maxWidth: {
      default: 'max-w-prose',
      none: '',
    },
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
      none: '',
    },
  },
  defaultVariants: {
    type: 'h2',
    fontFamily: 'sans',
    tag: 'h2',
    spacing: 'default',
    maxWidth: 'default',
    clamp: 'none',
    text: 'balance',
  },
})

const Heading: React.FC<HeadingProps> = ({
  type,
  text,
  children,
  clamp,
  tag,
  fontFamily,
  spacing,
  className,
  maxWidth,
  dangerouslySetInnerHTML,
}) => {
  const HeadingTag = tag || 'h2'
  return (
    <HeadingTag
      className={cn(
        HeadingVariants({
          className,
          text,
          fontFamily,
          clamp,
          spacing,
          maxWidth,
          type,
        }),
        type,
      )}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </HeadingTag>
  )
}

export default Heading
