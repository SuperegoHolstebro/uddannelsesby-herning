import 'server-only'
import { draftMode } from 'next/headers'
import { createClient, type QueryOptions, type QueryParams } from 'next-sanity'
import { stegaClean } from '@sanity/client/stega'
import { readToken } from '@/sanity/lib/sanity.api'
import { apiVersion, dataset, projectId } from '@/sanity/lib/sanity.api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    studioUrl: '/super-login',
  },
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  const isDraftMode = (await draftMode()).isEnabled
  if (isDraftMode && !readToken) {
    throw new Error('Missing environment variable SANITY_API_READ_TOKEN')
  }

  let dynamicRevalidate = revalidate
  if (isDraftMode) {
    // Do not cache in Draft Mode
    dynamicRevalidate = 0
  } else if (tags.length) {
    // Cache indefinitely if tags supplied, purge with revalidateTag()
    dynamicRevalidate = false
  }

  const data = await client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        token: readToken,
        perspective: 'previewDrafts',
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  })

  return stegaClean(data)
}
