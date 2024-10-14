import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { generatePageMetadata } from '~/utils/metadataUtils'
import { stegaClean } from '@sanity/client/stega'

export default async function IndexRoute({ params }: { params: { locale: string } }) {
  const page = await loadPage('/', 'da')


  return (
    <PageContainer>
      <PageBuilder sections={page.pageBuilder} />
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const page = await loadPage('/', 'da')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return generatePageMetadata(page, baseUrl);
}
