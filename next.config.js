const { createClient } = require('@sanity/client')
// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-07',
  token: process.env.SANITY_API_READ_TOKEN, // Add this if your dataset is private
})
async function generateRedirects() {
  const query = `
    *[_type == 'redirect'][0] {
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

  // Log the raw results for debugging
  console.log('Raw results from Sanity:', results)

  // Check if results and results.subLinks are valid arrays
  const subLinks = results?.subLinks || []

  const redirects = subLinks
    .filter(
      (link) =>
        (link.source || link.sourceUrl) &&
        (link.destination || link.destinationUrl),
    ) // Ensure both source/sourceUrl and destination/destinationUrl are present
    .map((link) => {
      const formattedSource = `${link.source || link.sourceUrl}`
      const formattedDestination = link.isInternal
        ? `${link.destination || link.destinationUrl}`
        : link.destinationUrl // Internal links have leading slash, external links remain unchanged

      if (!formattedDestination) {
        return null // Skip this redirect if destination is missing
      }

      return {
        source: formattedSource,
        destination: formattedDestination,
        permanent: true,
      }
    })
    .filter(Boolean) // Filter out any null redirects

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
  env: {
    FASTMAIL_USER: process.env.FASTMAIL_USER,
    FASTMAIL_PASS: process.env.FASTMAIL_PASS,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = config.externals || []
      config.externals.push('@mapbox/node-pre-gyp')
    }
    return config
  },
}
module.exports = nextConfig
