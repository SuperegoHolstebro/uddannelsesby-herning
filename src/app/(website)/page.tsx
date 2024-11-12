import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { generatePageMetadata } from '~/utils/metadataUtils'
import { stegaClean } from '@sanity/client/stega'
import { notFound } from 'next/navigation'

export default async function DynamicRoute() {
  const page = await loadPage('/', 'da')

  if (!page) {
    notFound()
  }

  return (
    <PageContainer>
      {page.pageBuilder && <PageBuilder sections={page.pageBuilder} />}
    </PageContainer>
  )
}

export async function generateMetadata() {
  const page = await loadPage('/', 'da')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  return generatePageMetadata(page, baseUrl)
}
