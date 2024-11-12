import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { formatDate } from '@/utils/date'
import { EVENT_QUERY } from '@/sanity/lib/sanity.queries'
import { urlFor } from '~/sanity/lib/sanity.image'
import Image from 'next/image'
import { generatePageMetadata } from '~/utils/metadataUtils'
import { stegaClean } from '@sanity/client/stega'
import EventSignUpForm from '@/components/sections/EventSignUpForm'
import { Button } from '~/components/atoms/Button'
import { AdvancedButton } from '~/components/atoms/AdvancedButton'
import TextContainer from '~/components/sections/textContainer'
import EventSection from '~/components/sections/EventSection'
import Icon from '~/components/atoms/Icons'
interface Params {
  slug: string[]
  locale: string
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<Params>
}) {
  const resolvedParams = await params // Await the Promise
  const slug = `${resolvedParams.slug.join('/')}`
  const page = await loadPage(slug, 'da', EVENT_QUERY)

  if (!page) {
    notFound()
  }

  return (
    <PageContainer>
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="none"
        className="pb-16 pt-36 min-h-screen/3 bg-signal-pink"
      >
        <div className="flex justify-between my-auto col-span-full">
          <div className="">
            <Heading spacing="small">{page.title}</Heading>
          </div>
          <div>
            <AdvancedButton variant="primary">Book billet</AdvancedButton>
          </div>
        </div>

        <div className="flex gap-3 col-span-full">
          <Paragraph spacing="none" className="leading-none">
            <span className="bg-mørk p-2 text-lys rounded-xl">
              {page.category}
            </span>
          </Paragraph>
          <Paragraph spacing="none" className="leading-none">
            <span className="bg-mørk p-2 text-lys rounded-xl">
              {page.price} KR.
            </span>
          </Paragraph>
        </div>
      </Section>

      {/* info boxes */}
      <Section paddingBottom="none" paddingTop="none" tag={'div'}>
        {' '}
        <div className="grid grid-cols-1 gap-4 text-center col-span-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:p-12 md:flex-row rounded-2xl">
          <div className="flex flex-col items-center justify-start space-y-5 ">
            <Icon type="calendar" className="w-8 h-8" />
            <Heading type="h5" tag="h5" spacing="default">
              {/* Use eventDateRange and pass the correct properties */}
              {eventDateRange(page.startDate, page.endDate, page.isMultiDay)}
            </Heading>
            <Paragraph spacing="none">Dato</Paragraph>
          </div>

          <div className="flex flex-col items-center justify-start space-y-5 md:border-l md:border-grå md:pl-4">
            <Icon type="clock" className="w-8 h-8" />
            <Heading type="h5" tag="h5" spacing="default">
              18.30-21.00
            </Heading>
            <Paragraph spacing="none">Tidspunkt</Paragraph>
          </div>

          <div className="flex flex-col items-center justify-start space-y-5 md:border-l md:border-grå md:pl-4">
            <Icon type="streetSign" className="w-8 h-8" />
            <Heading type="h5" tag="h5" spacing="default">
              {page.location}
            </Heading>
            <Paragraph spacing="none">Lokation</Paragraph>
          </div>

          <div className="flex flex-col items-center justify-start space-y-5 md:border-l md:border-grå md:pl-4">
            <Icon type="tickets" className="w-8 h-8" />
            <Heading type="h5" tag="h5" spacing="default">
              {/* Use eventDateRange and pass the correct properties */}
              {eventDateRange(page.startDate, page.endDate, page.isMultiDay)}
            </Heading>
            <Paragraph spacing="none">Billetter tilgængelige</Paragraph>
          </div>
        </div>
      </Section>

      {/* image */}
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="none"
        className="col-span-full "
      >
        <div className="col-span-full">
          <Image
            className="object-cover h-full"
            src={urlFor(page.image).dpr(2).url()}
            alt=""
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={urlFor(page.image).width(24).height(24).blur(10).url()}
            sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  40vw"
          />
        </div>
      </Section>

      <TextContainer>
        <Heading type="h3" tag="h3" spacing="small">
          {page.title}
        </Heading>
        <Paragraph portableText>{page.description}</Paragraph>
      </TextContainer>

      {/* Include the EventSignUpForm component */}
      <Section variant="primary" className="col-span-full">
        <Heading spacing="small" className="col-span-full">
          Tilmelding
        </Heading>

        <EventSignUpForm event={page} />
      </Section>

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

const eventDateRange = (startDate, endDate, isMultiDay) => {
  const formattedStart = new Date(startDate).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedEnd =
    isMultiDay && endDate
      ? new Date(endDate).toLocaleDateString('da-DK', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : null

  return formattedEnd ? `${formattedStart} - ${formattedEnd}` : formattedStart
}
