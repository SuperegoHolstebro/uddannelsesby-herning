import type { QueryParams } from 'next-sanity'
import type { UnfilteredResponseQueryOptions } from '@sanity/client'
import { draftMode } from 'next/headers'
import 'server-only'
import { client } from '@/sanity/lib/sanity.client'
import { readToken } from '@/sanity/lib/sanity.api'
import { PAGE_QUERY } from '@/sanity/lib/sanity.queries'

export type PagePayload = {
  image?: any
  _id?: string
  _type: string
  slug: { current: string }
  title?: string
  body?: any
  pageBuilder: any[]
  seoGroup: {
    seoTitle?: string
    seoDescription?: string
    image?: string
  }
  description?: string
  date?: string
}

const DEFAULT_PARAMS = {} as QueryParams

export async function loadQuery<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  groqQuery,
}: {
  query: string
  params?: QueryParams
  groqQuery?: string
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled
  const token = readToken

  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.',
    )
  }

  const perspective = isDraftMode ? 'previewDrafts' : 'published'

  const options = {
    filterResponse: false,
    useCdn: false,
    resultSourceMap: isDraftMode ? 'withKeyArraySelector' : false,
    token: isDraftMode ? token : undefined,
    perspective,
    next: {
      tags: ['sanity'],
      revalidate: isDraftMode ? 0 : undefined,
    },
  } satisfies UnfilteredResponseQueryOptions
  const result = await client.fetch<QueryResponse>(query, params, {
    ...options,
    stega: isDraftMode,
  } as UnfilteredResponseQueryOptions)
  return result.result
}

export async function loadPage(
  slug: string,
  locale: string,
  groqQuery?: string,
) {
  return loadQuery<PagePayload | null>({
    query: groqQuery || PAGE_QUERY,
    params: { slug },
  })
}
