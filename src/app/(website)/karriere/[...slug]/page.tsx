import 'swiper/css'
import React from 'react'
import { loadPage, PagePayload } from '@/sanity/queries/loadPage'
import PageBuilder from '~/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { COMPANY_QUERY } from '@/sanity/lib/sanity.queries'
import TextContainer from '@/components/sections/textContainer'
import Image from 'next/image'
import { urlFor } from '~/sanity/lib/sanity.image'
import EditButton from '~/components/atoms/EditButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/sanity/lib/authOptions'
import Icon from '~/components/atoms/Icons'
import { getMonth } from '~/utils/date'
import { Button } from '~/components/atoms/Button'
import Badge from '~/components/atoms/badge'
import Photo from '~/components/atoms/Photo'
import { AdvancedButton } from '~/components/atoms/AdvancedButton'
import Link from 'next/link'
import CallToActionSection2 from '~/components/sections/CallToActionSection2'
interface Params {
  slug: string[]
  locale: string
}
export interface UserProfile {
  name?: string
  email?: string
  image?: string
  company?: string
  provider?: any
  webiste?: string
}
// extend the PagePayload
export type ExtendedPagePayload = PagePayload & {
  dates: {
    startdate: string
    enddate: string
  }
  address: string
  email: string
  phone: string
  website: string
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = (await loadPage(
    slug,
    'da',
    COMPANY_QUERY,
  )) as ExtendedPagePayload
  const session = await getServerSession(authOptions)

  if (!page) {
    notFound()
  }

  const isUserAssignedToCompany = session?.user?.company === page.name

  return (
    <PageContainer>
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="none"
        className="pt-48 pb-16 md:pt-36 min-h-screen/3 bg-signal-pink"
      >
        <div className="flex flex-col justify-center col-span-full">
          <div className="">
            <Heading spacing="none">{page?.name}</Heading>
          </div>

          <div className="flex flex-wrap gap-3 col-span-full h-fit">
            {page?.fields?.map((field, index) => (
              <Badge key={index} variant="dark">
                {field?.title}{' '}
              </Badge>
            ))}
          </div>
        </div>
      </Section>
      {/* info boxes */}
      <Section paddingBottom="none" paddingTop="none" tag={'div'}>
        {' '}
        <div
          className={` grid grid-cols-1 gap-4 text-center col-span-full md:grid-cols-2 items-center py-12 md:py-13 space-y-4 md:space-y-0 md:p-12 md:flex-row md:divide-x md:border-grå`}
        >
          {(page.phone || page.email) && (
            <div className="flex flex-col items-center justify-start ">
              <Icon type="contact" className="mb-3 size-8" />
              <div className="space-y-.5">
                {page.phone && (
                  <Heading type="h5" tag="p" spacing="none">
                    Tlf: <a href={`tel:${page.phone}`}>{page.phone}</a>
                  </Heading>
                )}
                {page.email && (
                  <Heading type="h5" tag="p" spacing="none">
                    Mail: <a href={`mailto:${page.email}`}>{page.email}</a>
                  </Heading>
                )}
                <Paragraph spacing="none">Kontakt</Paragraph>
              </div>
            </div>
          )}
          {page.address && (
            <div className="flex flex-col items-center justify-start md:border-l md:border-grå md:pl-4">
              <Icon type="streetSign" className="mb-3 size-8" />
              <div className="space-y-.5">
                <Heading type="h5" tag="h5" spacing="none">
                  {page?.address}
                </Heading>
                <Paragraph spacing="none">Lokation</Paragraph>
              </div>
            </div>
          )}
        </div>
      </Section>
      {/* image */}
      <Section
        variant="primary"
        paddingTop="none"
        paddingBottom="none"
        className="col-span-full"
      >
        <div className="col-span-full h-screen/2">
          <Photo image={page.image} objectFit="cover" />
        </div>
      </Section>
      <TextContainer asChild>
        {page.description && (
          <>
            <Heading type="h3" tag="h3">
              Om {page.name}
            </Heading>
            <Paragraph className="whitespace-pre-line" spacing="none">{page.description}</Paragraph>
          </>
        )}
        <div className="pt-12">
          {page.website && (
            <div className="pt-12">
              <AdvancedButton variant="primary">
                <Link
                  className="text-increased"
                  href={`https://${page.website}`}
                  target="_blank"
                >
                  Læs mere om os
                  <span className="overflow-hidden">
                    <span
                      className={`block mr-auto w-10 overflow-hidden transition-all ease-custom duration-735 group-hover/button:w-full`}
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
            </div>
          )}
        </div>
      </TextContainer>
      {isUserAssignedToCompany && <EditButton />}
      <CallToActionSection2 section={customCTA} />
    </PageContainer>
  )
}

const customCTA = {
  heading: 'mere end 178 jobmuligheder undersøg efter dit studie?',
  link: {
    label: 'Læs mere om os',
    url: '/din-karriere',
  },
  MediaObject: {
    media: {
      imageObject: {
        image: {
          asset: {
            title: null,
            metadata: {
              blurHash: 'VaHx{A_3k9%MWB%Q%NWBa#Rik.bYM{RjRPajRQR%ofog',
              dimensions: {
                height: 1720,
                _type: 'sanity.imageDimensions',
                width: 2192,
                aspectRatio: 1.2744186046511627,
              },
            },
            _id: 'image-a67c3670a0bb4264c90d60d9c551a79b88aa0e13-2192x1720-png',
            url: 'https://cdn.sanity.io/images/9l811vbz/production/a67c3670a0bb4264c90d60d9c551a79b88aa0e13-2192x1720.png',
            _type: 'sanity.imageAsset',
            altText: null,
            description: null,
          },
        },
      },
    },
  },
}
