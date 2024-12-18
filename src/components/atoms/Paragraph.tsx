import { PortableText } from '@portabletext/react'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/utils/utils'
import { ParagraphProps } from '@/types/ParagraphProps'
import Heading from './Heading'

/**
 *
 * @returns: En tekstboks-komponent, der kan bruges til at indtaste tekst.
 * @example: <Paragraph />
 * @alias: Paragraph
 * @module: components/global/Paragraph
 * @summary: Denne komponent bruges til at vise en tekstboks-komponent, der kan bruges til at indtaste tekst.
 * @see: src/components/global/Paragraph.tsx
 * @version: 1.0.0
 * @property: [size, spacing, portableText]
 * @author: Kasper Buchholtz
 *
 **/

const ParagraphVariants = cva('font-sans space-y-2', {
  variants: {
    size: {
      regular: 'text-regular',
      increased: 'text-increased',
      medium: 'text-medium',
    },
    spacing: {
      large: 'mb-12 ',
      default: 'first-of-type:mt-8',
      small: 'mb-4',
      none: '',
    },
  },
  defaultVariants: {
    size: 'regular',
    spacing: 'default',
  },
})

type ExtendedParagraphProps = ParagraphProps &
  VariantProps<typeof ParagraphVariants>

const Paragraph: React.FC<ExtendedParagraphProps> = ({
  size,
  spacing,
  children,
  portableText,
  className,
  ...props
}) => {
  return (
    <>
      {portableText ? (
        <div className={cn(ParagraphVariants({ size, spacing }))}>
          <TextComponent value={children} />
        </div>
      ) : (
        <>
          <p className={cn(ParagraphVariants({ size, className, spacing }))}>
            {children}
          </p>
        </>
      )}
    </>
  )
}

const myPortableTextComponents = {
  types: {
    myBlock: ({ children }) => <div className="my-block">{children}</div>,
  },
  marks: {
    em: ({ children }) => <em className="italic font-semibold">{children}</em>,
    link: ({ children, value }) => {
      const rel =
        value && value.href && !value.href.startsWith('/')
          ? 'noreferrer noopener'
          : undefined
      return (
        <a
          className="font-bold underline transition-all custom-a text-superego-green hover:text-superego-purple"
          href={value.href}
          target={value.blank ? '_blank' : '_self'}
          title={children}
          rel={rel}
        >
          {children}
        </a>
      )
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="font-sans custom-p text-regular empty:mb-4 ">{children}</p>
    ),
    h1: ({ children }) => (
      <Heading
        tag="h1"
        type="h1"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ),
    h2: ({ children }) => (
      <Heading
        tag="h2"
        type="h2"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ),
    h3: ({ children }) => (
      <Heading
        tag="h3"
        type="h3"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ),
    h4: ({ children }) => (
      <Heading
        tag="h4"
        type="h4"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ),
    h5: ({ children }) => (
      <Heading
        tag="h5"
        type="h5"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ),
    h6: ({ children }) => (
      <Heading
        tag="h6"
        type="h6"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ),
    ul: ({ children }) => (
      <ul className="ml-5 list-disc list-outside custom-ul"> {children} </ul>
    ),
    ol: ({ children }) => <ol className="">{children}</ol>,
    strong: ({ children }) => (
      <strong className="font-bold custom-strong">{children}</strong>
    ),
    em: ({ children }) => <em className="italic custom-em">{children}</em>,
    code: ({ children }) => (
      <code className="px-1 py-0 bg-gray-200 rounded custom-code">
        {children}
      </code>
    ),
    pre: ({ children }) => <pre className="custom-pre">{children}</pre>,
    sub: ({ children }) => <sub className="custom-sub">{children}</sub>,
    sup: ({ children }) => <sup className="custom-sup">{children}</sup>,
    blockquote: ({ children }) => (
      <blockquote className="pl-4 italic border-l-2 border-superego-grey/50 ">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mt-1 space-y-2 prose-li:ml-6 prose-li:list-disc prose-li:list-item">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="prose-li:ml-6 prose-li:list-decimal prose-li:list-item">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc list-outside custom-li list-image-star">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="py-2 list-decimal list-outside bg-blue-500 custom-li">
        {children}
      </li>
    ),
  },
}

const TextComponent = (props) => {
  return (
    <PortableText
      value={props.value}
      components={myPortableTextComponents as any}
    />
  )
}

export default Paragraph
