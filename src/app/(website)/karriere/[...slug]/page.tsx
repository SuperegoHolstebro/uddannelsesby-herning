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
        className="h-screen/3 bg-signal-pink"
      >
        <div className="flex flex-col justify-center col-span-full">
          <div className="">
            <Heading spacing="none">{page.name}</Heading>
          </div>
          <div className="flex col-span-full h-fit">
            <Paragraph className="bg-mørk uppercase text-lys rounded-full px-2 py-1">
              kategori{' '}
            </Paragraph>
          </div>
        </div>
      </Section>

      {/* info boxes */}
      <Section paddingBottom="none" paddingTop="none" tag={'div'}>
        {' '}
        <div className="grid grid-cols-1 gap-4 text-center col-span-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 md:p-12 md:flex-row rounded-2xl">
          <div className="flex flex-col items-center justify-start ">
            <Icon type="calendar" className="mb-3 size-8" />
            <div className="space-y-.5">
              <Heading type="h5" tag="p" spacing="none">
                Information
              </Heading>
              <Paragraph spacing="none">Dato</Paragraph>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start  md:border-l md:border-grå md:pl-4">
            <Icon type="clock" className="mb-3 size-8" />
            <div className="space-y-.5">
              <Heading type="h5" tag="h5" spacing="none">
                {page?.address}
              </Heading>
              <Paragraph spacing="none">Tidspunkt</Paragraph>
            </div>
          </div>
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

      <TextContainer asChild>
        {page.description && (
          <>
            <Heading type="h3" tag="h3">
              Om {page.name}
            </Heading>
            <Paragraph>{page.description}</Paragraph>
          </>
        )}
        {page.address && <Paragraph>Adresse: {page.address}</Paragraph>}
        {page.email && (
          <Paragraph>
            Mail: <a href={`mailto:${page.email}`}>{page.email}</a>
          </Paragraph>
        )}
        {page.phone && (
          <Paragraph>
            Tlf.: <a href={`tel:${page.phone}`}>{page.phone}</a>
          </Paragraph>
        )}

        {page.fields && (
          <>
            <Heading type="h6" tag="h6" spacing="none">
              Fagområder
            </Heading>
            <ul>
              {page.fields.map((field) => (
                <li key={field._id}>{field.title}</li>
              ))}
            </ul>
          </>
        )}
        <Button
          href={page.website}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Besøg hjemmeside
        </Button>
      </TextContainer>
      {isUserAssignedToCompany && <EditButton />}
      {page.pageBuilder && <PageBuilder sections={page.pageBuilder} />}
    </PageContainer>
  )
}
