import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '~/utils/metadataUtils'
import { SCHOOLPAGE_QUERY } from '~/sanity/lib/sanity.queries'
import Section from '~/components/sections/Section'
import Heading from '~/components/atoms/Heading'
import Paragraph from '~/components/atoms/Paragraph'
import Icon from '~/components/atoms/Icons'
import Image from 'next/image'
import TextContainer from '~/components/sections/textContainer'
import { urlFor } from '~/sanity/lib/sanity.image'
import { CallToAction2 } from '~/sanity/schemas/sections/CallToAction2'
import CallToActionSection2 from '~/components/sections/CallToActionSection2'
import Photo from '~/components/atoms/Photo'
import { Params } from '~/types/Params.types'
import { ExtendedPagePayload } from '../../[locale]/page'

export default async function DynamicRoute({
  params,
}: {
  params: Promise<Params>
}) {
  const resolvedParams = await params // Await the Promise
  const slug = `${resolvedParams.slug.join('/')}`
  const page = (await loadPage(
    slug,
    'da',
    SCHOOLPAGE_QUERY,
  )) as ExtendedPagePayload

  if (!page) {
    notFound()
  }

  return (
    <PageContainer>
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="none"
        className="h-screen/3 bg-signal-pink"
      >
        <div className="flex flex-col justify-center col-span-full">
          <div className="">
            <Heading spacing="none">{page.title}</Heading>
          </div>
        </div>
      </Section>
      {/* image */}
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="default"
        className="col-span-full"
      >
        {page.mainImage && (
          <div className="pt-24 col-span-full h-screen/1.6">
            <Photo image={page.mainImage} objectFit="cover" />
          </div>
        )}
      </Section>

      <TextContainer asChild paddingBottom="default" paddingTop="none">
        <Paragraph portableText>{page.schoolInfo?.description}</Paragraph>
      </TextContainer>

      <TextContainer asChild paddingBottom="default" paddingTop="none">
        <Paragraph portableText>{page.educationInfo?.description}</Paragraph>
      </TextContainer>

      <CallToActionSection2 section={CallToAction2} />

      {page.pageBuilder && <PageBuilder sections={page.pageBuilder} />}
    </PageContainer>
  )
}
