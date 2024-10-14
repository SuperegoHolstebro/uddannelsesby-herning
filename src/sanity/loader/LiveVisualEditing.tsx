'use client'

import { useLiveMode } from '@sanity/react-loader'
import { VisualEditing } from 'next-sanity'
import { useEffect } from 'react'
import { client } from '@/sanity/lib/sanity.client'

// Always enable stega in Live Mode
const stegaClient = client.withConfig({ stega: true })

export default function LiveVisualEditing() {
  useLiveMode({ client: stegaClient })
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (process.env.NEXT_PUBLIC_SANITY_DATASET !== 'production' && window === parent) {
      location.href = '/api/draft-mode/disable'
    }
  }, [])

  return <VisualEditing />
}
