import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { generatePageMetadata } from '~/utils/metadataUtils'
import { stegaClean } from '@sanity/client/stega'

interface Params {
  slug: string[]
  locale: string
}
export default async function IndexRoute({
  params,
}: {
  params: Promise<Params>
}) {
  const resolvedParams = await params // Await the Promise
  const page = await loadPage('/', 'da')

  return (
    <PageContainer>
      <PageBuilder sections={page.pageBuilder} />
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params }) {
  const { slug: slugArray } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const slug = slugArray.join('/')
  const page = await loadPage(slug, 'da')

  return generatePageMetadata(page, baseUrl)
}
