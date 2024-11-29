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

export default async function DynamicRoute({ params }) {
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await loadPage(slug, 'da', SCHOOLPAGE_QUERY)

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
        <div className="pt-24 col-span-full h-screen/2">
          <Image
            className="object-cover h-full"
            src={urlFor(page.mainImage).dpr(2).url()}
            alt=""
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={urlFor(page.mainImage)
              .width(24)
              .height(24)
              .blur(10)
              .url()}
            sizes="
                (max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                40vw"
          />
        </div>
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

export async function generateMetadata({ params }: { params }) {
  const { slug: slugArray } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const slug = slugArray.join('/')
  const page = await loadPage(slug, 'da')

  return generatePageMetadata(page, baseUrl)
}
