const { createClient } = require('@sanity/client')
// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-11-28',
  token: process.env.SANITY_API_TOKEN, // Add this if your dataset is private
})
async function generateRedirects() {
  const query = `
    *[_type == 'redirect'] {
      subLinks[] {
        isInternal,
        "sourceUrl": sourceUrl.current,
        "destinationUrl": destinationUrl.current,
        "source": source->slug.current,
        "destination": destinationPage->slug.current,
      }
    }
  `
  const results = await client.fetch(query)
  // Log the raw results from Sanity for debugging
  console.log('Raw results from Sanity:', results)
  const redirects = results.flatMap(
    (redirect) =>
      redirect.subLinks
        .filter(
          (link) =>
            (link.source || link.sourceUrl) &&
            (link.destination || link.destinationUrl),
        ) // Ensure both source/sourceUrl and destination/destinationUrl are present
        .map((link) => {
          const formattedSource = `${link.source || link.sourceUrl}`
          const formattedDestination = link.isInternal
            ? `${link.destination || link.destinationUrl}`
            : link.destinationUrl // Add leading slash for internal links, external link remains unchanged
          // Check if destination exists to prevent null values
          if (!formattedDestination) {
            // console.warn(`Missing destination for source: ${formattedSource}`);
            return null // Skip this redirect if destination is missing
          }
          return {
            source: formattedSource,
            destination: formattedDestination,
            permanent: true,
          }
        })
        .filter(Boolean), // Filter out any null redirects
  )
  // Log the formatted redirects for Next.js
  console.log('Formatted redirects:', redirects)
  return redirects
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const redirects = await generateRedirects()
    return redirects
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'vimeo.com',
      },
      {
        protocol: 'https',
        hostname: 'superego.nu',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
}
module.exports = nextConfig
