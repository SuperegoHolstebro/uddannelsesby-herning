import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { eventDateRange, formatDate, formatTime } from '@/utils/date'
import { EVENT_QUERY } from '@/sanity/lib/sanity.queries'
import { urlFor } from '~/sanity/lib/sanity.image'
import Image from 'next/image'
import { generatePageMetadata } from '~/utils/metadataUtils'
import EventSignUpForm from '@/components/sections/EventSignUpForm'
import { AdvancedButton } from '~/components/atoms/AdvancedButton'
import TextContainer from '~/components/sections/textContainer'
import Icon from '~/components/atoms/Icons'
import { formatPrice } from '~/utils/price'
import Link from 'next/link'
import Scheduler from '~/components/atoms/Scheduler'
import Badge from '~/components/atoms/badge'
import Box from '~/components/atoms/box'
import Photo from '~/components/atoms/Photo'
import EventInfoBox from '~/components/organisms/EventInfoBox'
import { ExtendedPagePayload } from '../../page'
interface Params {
  slug: string[]
  locale: string
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>
}) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/')
  const page = (await loadPage(
    slug,
    locale,
    EVENT_QUERY,
  )) as ExtendedPagePayload

  if (!page) {
    notFound()
  }

  return (
    <PageContainer locale={page.localeInfo}>
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="none"
        className="pt-48 pb-16 md:pt-36 min-h-screen/3 bg-signal-pink"
      >
        <div className="flex justify-between my-auto col-span-full">
          <div className=" md:basis-3/4">
            <Heading spacing="small">{page.title}</Heading>
          </div>
          <div className="hidden md:block">
            {page?.isExternal && !page?.externalLink ? (
              <Paragraph className="text-right uppercase text-increased">
                TILMELDING ÅBNER SNART
              </Paragraph>
            ) : (
              <Scheduler hasText start={page.open}>
                <AdvancedButton variant="primary">
                  <Link
                    className="text-increased"
                    href={
                      page?.isExternal
                        ? page?.externalLink || `#signup`
                        : `#signup`
                    }
                  >
                    Book billet
                    <span className="overflow-hidden">
                      <span
                        className={`block ml-auto w-10 overflow-hidden transition-all ease-custom duration-735 group-hover/button:w-full`}
                      >
                        <svg
                          className="w-full"
                          preserveAspectRatio="xMinYMin meet"
                          height="6"
                          viewBox="0 0 30 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 4.71024L4.16667 2.85512C6.81894 1.67425 9.84772 1.67425 12.5 2.85512V2.85512C15.1523 4.03599 18.1811 4.03599 20.8333 2.85512V2.85512C23.4856 1.67425 26.5144 1.67425 29.1667 2.85512V2.85512C31.8189 4.03599 34.8477 4.03599 37.5 2.85512V2.85512C40.1523 1.67425 43.1811 1.67425 45.8333 2.85512V2.85512C48.4856 4.03599 51.5144 4.03599 54.1667 2.85512V2.85512C56.8189 1.67425 59.8477 1.67425 62.5 2.85512V2.85512C65.1523 4.03599 68.1811 4.03599 70.8333 2.85512V2.85512C73.4856 1.67425 76.5144 1.67425 79.1667 2.85512V2.85512C81.8189 4.03599 84.8477 4.03599 87.5 2.85512V2.85512C90.1523 1.67425 93.1811 1.67425 95.8333 2.85512V2.85512C98.4856 4.03599 101.514 4.03599 104.167 2.85512V2.85512C106.819 1.67425 109.848 1.67425 112.5 2.85512V2.85512C115.152 4.03599 118.181 4.03599 120.833 2.85512V2.85512C123.486 1.67425 126.514 1.67425 129.167 2.85512V2.85512C131.819 4.03599 134.848 4.03599 137.5 2.85512V2.85512C140.152 1.67425 143.181 1.67425 145.833 2.85512V2.85512C148.486 4.03599 151.514 4.03599 154.167 2.85512V2.85512C156.819 1.67425 159.848 1.67425 162.5 2.85512V2.85512C165.152 4.03599 168.181 4.03599 170.833 2.85512V2.85512C173.486 1.67425 176.514 1.67425 179.167 2.85512V2.85512C181.819 4.03599 184.848 4.03599 187.5 2.85512V2.85512C190.152 1.67425 193.181 1.67425 195.833 2.85512V2.85512C198.486 4.03599 201.514 4.03599 204.167 2.85512V2.85512C206.819 1.67425 209.848 1.67425 212.5 2.85512V2.85512C215.152 4.03599 218.181 4.03599 220.833 2.85512V2.85512C223.486 1.67425 226.514 1.67425 229.167 2.85512V2.85512C231.819 4.03599 234.848 4.03599 237.5 2.85512V2.85512C240.152 1.67425 243.181 1.67425 245.833 2.85512V2.85512C248.486 4.03599 251.514 4.03599 254.167 2.85512V2.85512C256.819 1.67425 259.848 1.67425 262.5 2.85512V2.85512C265.152 4.03599 268.181 4.03599 270.833 2.85512V2.85512C273.486 1.67425 276.514 1.67425 279.167 2.85512V2.85512C281.819 4.03599 284.848 4.03599 287.5 2.85512V2.85512C290.152 1.67425 293.181 1.67425 295.833 2.85511L300 4.71024"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    </span>
                  </Link>
                </AdvancedButton>
              </Scheduler>
            )}
          </div>
        </div>

        <div className="flex gap-3 uppercase col-span-full">
          <Badge variant="dark">{page?.category?.title}</Badge>
          <Badge variant="dark">{formatDate(page?.startDate)}</Badge>
        </div>
        <div className="block md:hidden col-span-full">
          {page?.isExternal && !page?.externalLink ? (
            <Paragraph className="uppercase text-increased">
              TILMELDING ÅBNER SNART
            </Paragraph>
          ) : (
            <Scheduler hasText start={page.open}>
              <AdvancedButton asChild variant="primary">
                <Link
                  className="text-increased"
                  href={
                    page?.isExternal && page?.externalLink
                      ? page?.externalLink
                      : `#signup`
                  }
                >
                  Book billet
                  <span className="overflow-hidden">
                    <span
                      className={`block ml-auto w-10 overflow-hidden transition-all ease-custom duration-735 group-hover/button:w-full`}
                    >
                      <svg
                        className="w-full"
                        preserveAspectRatio="xMinYMin meet"
                        height="6"
                        viewBox="0 0 30 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 4.71024L4.16667 2.85512C6.81894 1.67425 9.84772 1.67425 12.5 2.85512V2.85512C15.1523 4.03599 18.1811 4.03599 20.8333 2.85512V2.85512C23.4856 1.67425 26.5144 1.67425 29.1667 2.85512V2.85512C31.8189 4.03599 34.8477 4.03599 37.5 2.85512V2.85512C40.1523 1.67425 43.1811 1.67425 45.8333 2.85512V2.85512C48.4856 4.03599 51.5144 4.03599 54.1667 2.85512V2.85512C56.8189 1.67425 59.8477 1.67425 62.5 2.85512V2.85512C65.1523 4.03599 68.1811 4.03599 70.8333 2.85512V2.85512C73.4856 1.67425 76.5144 1.67425 79.1667 2.85512V2.85512C81.8189 4.03599 84.8477 4.03599 87.5 2.85512V2.85512C90.1523 1.67425 93.1811 1.67425 95.8333 2.85512V2.85512C98.4856 4.03599 101.514 4.03599 104.167 2.85512V2.85512C106.819 1.67425 109.848 1.67425 112.5 2.85512V2.85512C115.152 4.03599 118.181 4.03599 120.833 2.85512V2.85512C123.486 1.67425 126.514 1.67425 129.167 2.85512V2.85512C131.819 4.03599 134.848 4.03599 137.5 2.85512V2.85512C140.152 1.67425 143.181 1.67425 145.833 2.85512V2.85512C148.486 4.03599 151.514 4.03599 154.167 2.85512V2.85512C156.819 1.67425 159.848 1.67425 162.5 2.85512V2.85512C165.152 4.03599 168.181 4.03599 170.833 2.85512V2.85512C173.486 1.67425 176.514 1.67425 179.167 2.85512V2.85512C181.819 4.03599 184.848 4.03599 187.5 2.85512V2.85512C190.152 1.67425 193.181 1.67425 195.833 2.85512V2.85512C198.486 4.03599 201.514 4.03599 204.167 2.85512V2.85512C206.819 1.67425 209.848 1.67425 212.5 2.85512V2.85512C215.152 4.03599 218.181 4.03599 220.833 2.85512V2.85512C223.486 1.67425 226.514 1.67425 229.167 2.85512V2.85512C231.819 4.03599 234.848 4.03599 237.5 2.85512V2.85512C240.152 1.67425 243.181 1.67425 245.833 2.85512V2.85512C248.486 4.03599 251.514 4.03599 254.167 2.85512V2.85512C256.819 1.67425 259.848 1.67425 262.5 2.85512V2.85512C265.152 4.03599 268.181 4.03599 270.833 2.85512V2.85512C273.486 1.67425 276.514 1.67425 279.167 2.85512V2.85512C281.819 4.03599 284.848 4.03599 287.5 2.85512V2.85512C290.152 1.67425 293.181 1.67425 295.833 2.85511L300 4.71024"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </AdvancedButton>
            </Scheduler>
          )}
        </div>
      </Section>

      {/* info boxes */}
      <EventInfoBox page={page} />

      {/* image */}
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="none"
        className="col-span-full "
      >
        <div className="col-span-full h-screen/2">
          <Photo image={page.image} objectFit="cover" />
        </div>
      </Section>

      <TextContainer asChild>
        {(await params).locale === 'da' ? (
          <Paragraph portableText>{page.description}</Paragraph>
        ) : (
          <Paragraph portableText>
            {page.descriptionEN || page.description}
          </Paragraph>
        )}
      </TextContainer>

      {/* Include the EventSignUpForm component */}
      <Scheduler start={page.open}>
        {!page.isExternal ? (
          <Section
            variant="primary"
            className="col-span-full"
            id="signup"
            paddingBottom="none"
            paddingTop="none"
          >
            <EventSignUpForm event={page} />
          </Section>
        ) : null}
      </Scheduler>
    </PageContainer>
  )
} /* 

export async function generateMetadata({ params }: { params }) {
  const { slug: slugArray } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const slug = slugArray.join('/')
  const page = await loadPage(slug, 'da')

  return generatePageMetadata(page, baseUrl)
}
 */
