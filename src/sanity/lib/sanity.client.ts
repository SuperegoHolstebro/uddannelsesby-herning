import { createClient, type SanityClient } from 'next-sanity'
import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
  writeToken, // Ensure this is the token with write access
  readToken,
} from '@/sanity/lib/sanity.api'

export function getClient(preview?: { token: string }): SanityClient {
  // Initialize the Sanity client with common configuration
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: true,
      studioUrl: '/super-login',
    },
  })

  // If writeToken is available, use it for write operations
  if (writeToken) {
    return client.withConfig({
      token: writeToken,
      useCdn: false,
      perspective: 'published',
    })
  }

  // Fallback to the default client
  return client
}

// Export the client with the appropriate token based on the environment
export const client = getClient()
