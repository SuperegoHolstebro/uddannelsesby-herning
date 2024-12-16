import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { resolveHrefLang } from '@/sanity/lib/sanity.links'
import { formatDate } from '@/utils/date'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En artikel card, der viser information om en artikel.
 * @example: <ArticleCard />
 * @alias: ArticleCard
 * @module: components/atoms/ArticleCard
 * @summary: Denne komponent bruges til at vise information om en artikel.
 * @see: src/components/atoms/ArticleCard.tsx
 * @version: 1.0.0
 * @property: [article]
 * @author: Kasper Buchholtz
 **/

const ArticleCard = ({ article }) => {
  return (
    <>
      <div
        key={article?._key}
        className="relative overflow-hidden shadow-md col-span-full xs:col-span-2 sm:col-span-4 xl:col-span-6 group rounded-xl bg-light-base text-dark"
      >
        {article?.slug && (
          <Link
            className="absolute inset-0 z-10 w-full h-full "
            href={resolveHrefLang(
              article?.locale,
              article?._type,
              article?.slug?.current,
            )}
          ></Link>
        )}
        {article?.image && (
          <div className="relative object-cover w-full overflow-hidden aspect-w-4 aspect-h-3">
            <Photo image={article.image} objectFit="cover" />
          </div>
        )}
        <div className="flex flex-col justify-between p-8 space-y-10 xs:p-10 min-h-40 ">
          <Heading text="wrap" type="h4" tag="h4" spacing="none" clamp={3}>
            {article?.title}
          </Heading>
          {article?.date && (
            <div className="text-green">
              <Paragraph>{formatDate(article.date)}</Paragraph>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ArticleCard
