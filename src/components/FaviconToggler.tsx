// components/FaviconToggler.tsx
'use client'

import { useEffect } from 'react'

export default function FaviconToggler() {
  useEffect(() => {
    const link = document.querySelector(
      "link[rel*='icon']",
    ) as HTMLLinkElement | null
    const favicon1 = '/images/backend/favicon.ico' // Update paths to your favicons
    const favicon2 = '/images/backend/fav.ico' // Path for the alternate favicon
    let currentFavicon = favicon1

    function toggleFavicon() {
      if (link) {
        currentFavicon = currentFavicon === favicon1 ? favicon2 : favicon1
        link.href = currentFavicon
      }
    }

    const interval = setInterval(toggleFavicon, 2000) // Toggle every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return null
}
