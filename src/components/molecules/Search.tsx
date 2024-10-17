'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { groq } from 'next-sanity'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { AdvancedButton } from '@/components/atoms/AdvancedButton'
import Icon from '@/components/atoms/Icons'
import { client } from '@/sanity/lib/sanity.client'
import Heading from '../atoms/Heading'
import { resolveHref } from '@/sanity/lib/sanity.links'

const DEBOUNCE_DELAY = 300

export async function getSearchResults(query: string) {
  const formattedQuery = `*${query.toLowerCase()}*`

  return client.fetch(
    groq`
      *[_type in ["page", "event", "article"] && (lower(title) match $formattedQuery || lower(description) match $formattedQuery)]{
        _rev,
        _createdAt,
        _type,
        _id,
        "slug": slug.current,
        title,
        _updatedAt
      }`,
    { formattedQuery },
  )
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = useCallback(async () => {
    if (query.trim() === '') return
    setIsLoading(true)
    setError(null)
    try {
      const searchResults = await getSearchResults(query)
      setResults(searchResults)
    } catch (err) {
      setError('Failed to fetch search results.')
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch()
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(debounceTimeout)
  }, [query, handleSearch])

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev)
    if (isSearchOpen) {
      setQuery('')
      setResults([])
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      toggleSearch()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchOpen])

  return (
    <>
      <button
        onClick={toggleSearch}
        className="relative z-[999999999] md:-col-start-3 -col-start-1 -col-end-2 md:-col-end-3 group size-11.5 my-auto w-full"
        aria-label="Open search"
      >
        <Icon
          className="my-auto ml-auto mr-4 transition-all md:mx-auto size-8 fill-signal-gul group-hover:rotate-12 filter bg-blend-exclusion group-hover:fill-signal-gul"
          type="Search"
        />
      </button>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%', transition: { duration: 0.25 } }}
            transition={{ duration: 0.3, ease: [0.77, 0, 0.18, 1] }}
            className="fixed pt-2.5 h-20 pb-2.5 top-0 right-0 w-full px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52 bg-lys z-[calc(infinity+1)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <h2 id="search-title" className="sr-only">
              Search
            </h2>
            <label className="relative block w-full" htmlFor="text">
              <input
                autoFocus
                className="w-full px-4 transition-all border rounded-lg h-14 border-mørk ring-0 ring-green ring-offset-0 focus-within:ring-2 focus-within:ring-signal-gul focus-within:ring-offset-2"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search query"
              />
              <div className="absolute -translate-y-1/2 right-4 top-1/2">
                <AdvancedButton onClick={toggleSearch} variant="default">
                  Search
                </AdvancedButton>
              </div>
            </label>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="mt-4 space-y-4 overflow-y-auto rounded max-h-96">
              {results.map((result) => (
                <SearchResult key={result._rev} result={result} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.button
            className="fixed z-[998] top-0 right-0 w-screen h-screen bg-mørk/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={toggleSearch}
            aria-label="Close search"
          />
        )}
      </AnimatePresence>
    </>
  )
}

const SearchResult = ({ result }) => {
  return (
    <li className="relative" page-type={result._type} key={result.title}>
      <Link
        href={resolveHref(result?._type, result.slug)}
        target="_self"
        className="block px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 bg-lys"
      >
        <Heading spacing="none" type="h6" tag="h6">
          {result.title}
        </Heading>

        <span className="absolute px-2 py-1 -translate-y-1/2 border rounded-md text-small bg-mørk text-lys top-1/2 right-4 ">
          {result._type === 'event'
            ? 'Begivenhed'
            : result._type === 'article'
              ? 'Artikel'
              : 'Side'}
        </span>
      </Link>
    </li>
  )
}
