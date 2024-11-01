import { defineLive } from 'next-sanity'
import { client } from '@/sanity/lib/sanity.client'
import { readToken } from '@/sanity/lib/sanity.api'
const token = readToken

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
})
