import { cva } from 'class-variance-authority'
import * as React from 'react'
import { SectionProps } from '@/types/SectionProps'
import { cn } from '@/utils/utils'

/**
 * @returns: En sektion.
 * @example: <Section />
 * @alias: Section
 * @module: components/sections/Section
 * @summary: Denne komponent bruges til at oprette en ny sektion.
 * @see: src/components/sections/Section.tsx
 * @version: 1.0.0
 * @property: [children, variant, columns, gap, paddingX, paddingTop, paddingBottom]
 * @todo: bedre navngivning af props
 * @author: Kasper Buchholtz
 **/

const sectionVariants = cva('grid', {
  variants: {
    variant: {
      lys: 'bg-lys text-mørk',
      mørk: 'bg-mørk text-lys',
      lilla: 'bg-grå text-mørk',
    },
    columns: {
      default:
        'grid-cols-4 xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24',
      secondary: '',
    },
    gap: {
      default: 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6',
      secondary: '',
    },
    paddingX: {
      default:
        'px-4 xs:px-4 sm:px-13 md:pr-24 md:pl-[10rem] lg:pr-19 lg:pl-[9.5rem] xl:pl-[200px] 2xl:pl-[351px]',
      none: '',
      right: 'pr-4 xs:pr-4 sm:pr-13 md:pr-24 lg:pr-19 xl:pr-36 2xl:pr-52',
      left: 'pl-4 xs:pl-4 sm:pl-13 md:pl-24 lg:pl-19 xl:pl-36 2xl:pl-52',
    },
    paddingTop: {
      default: 'pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 2xl:pt-48',
      none: '',
    },
    paddingBottom: {
      default: 'pb-16 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-40 2xl:pb-48',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'lys',
    columns: 'default',
    gap: 'default',
    paddingX: 'default',
    paddingTop: 'default',
    paddingBottom: 'default',
  },
})

export default function Section({
  data,
  children,
  variant,
  columns,
  paddingBottom,
  paddingTop,
  paddingX,
  gap,
  className = '',
  tag,
  ...props
}: SectionProps & { tag?: React.ElementType }) {
  const SectionComponent = tag || 'section'
  return (
    <>
      <SectionComponent
        {...props}
        className={cn(
          sectionVariants({
            variant,
            columns,
            gap,
            paddingX,
            paddingBottom,
            paddingTop,
            className,
          }),
        )}
      >
        {children}
      </SectionComponent>
    </>
  )
}
