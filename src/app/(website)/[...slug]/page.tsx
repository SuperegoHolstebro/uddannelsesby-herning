import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '~/utils/metadataUtils'
import { stegaClean } from '@sanity/client/stega'

export default async function DynamicRoute({
  params: { slug: slugArray, locale },
}: {
  params: { slug: string[]; locale: string }
}) {
  const slug = `${slugArray.join('/')}`
  const page = await loadPage(slug, 'da')

  
  if (!page) {
    notFound()
  }

  return (
    <PageContainer>
      {page.pageBuilder && <PageBuilder sections={page.pageBuilder} />}
    </PageContainer>
  )
}


export async function generateMetadata({ params }: { params: { slug: string[], } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const slug = `${params.slug.join('/')}`;
  const page = await loadPage(slug, 'da');

  return generatePageMetadata(page, baseUrl);
}