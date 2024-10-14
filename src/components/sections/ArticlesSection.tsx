import React from 'react'
import ArticleCard from '../molecules/ArticleCard'
import Heading from '../atoms/Heading'
import Section from './Section'
import { clean } from '~/utils/sanitize'
/**
 *
 * @returns: En sektion med artikler.
 * @example: <ArticlesSection
 * @alias: ArticlesSection
 * @module: components/sections/ArticlesSection
 * @summary: Denne komponent bruges til at vise en sektion med artikler.
 * @see: src/components/sections/ArticlesSection.tsx
 * @version: 1.0.0
 * @property: [section, amount]
 * @author: Kasper Buchholtz
 *
 **/
const sanitizeString = (str) => {
  return str.replace(/[^\x20-\x7E]/g, '')
}

const ArticlesSection = ({ section, amount }) => {
  const { articles } = section
  return (
    <Section
      variant={clean(section?.design?.color?.color || 'default')}
      id={clean(section?.SectionSettings?.anchor?.current)}
      paddingTop={clean(section?.design?.padding?.spacingTop)}
      paddingBottom={clean(section?.design?.padding?.spacingBottom)}

    >
      <ArticlesSection.Title section={section} />
      <div className="grid grid-cols-4 gap-4 col-span-full xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6">
        <ArticlesSection.All section={section} articles={articles} />
        <ArticlesSection.Manual section={section} articles={articles} />
        <ArticlesSection.Newest
          amount={amount}
          section={section}
          articles={articles}
        />
      </div>
    </Section>
  )
}

export default ArticlesSection

ArticlesSection.Title = Title
ArticlesSection.All = All
ArticlesSection.Manual = Manual
ArticlesSection.Newest = Newest

function Title({ section }) {
  return (
    <div className="col-span-full">
      <Heading size="h2">
        {section.heading}
      </Heading>
    </div>
  )
}

function All({ section, articles }) {
  return (
    <>
      {sanitizeString(section.view) === 'all' && (
        <>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </>
      )}
    </>
  )
}

function Manual({ section, articles }) {
  return (
    <>
      {sanitizeString(section.view) === 'manual' && (
        <>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </>
      )}
    </>
  )
}

function Newest({ section, articles, amount }) {
  return (
    <>
      {sanitizeString(section.view) === 'newest' && (
        <>
          {articles.slice(0, amount).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </>
      )}
    </>
  )
}
