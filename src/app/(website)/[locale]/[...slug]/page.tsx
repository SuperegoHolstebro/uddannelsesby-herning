import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { ExtendedPagePayload } from '../page'
import { Params } from '~/types/Params.types'

export interface PageParams {
  params: Promise<Params>
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>
}) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/')
  const page = (await loadPage(slug, locale)) as ExtendedPagePayload

  if (!page) {
    notFound()
  }

  return (
    <PageContainer locale={page.localeInfo}>
      {page.pageBuilder && (
        <PageBuilder locale={locale} sections={page.pageBuilder} />
      )}
    </PageContainer>
  )
}

/* export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/')
  const page = await loadPage(slug, locale)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  return generatePageMetadata({ locale }, page, baseUrl)
}
 */
