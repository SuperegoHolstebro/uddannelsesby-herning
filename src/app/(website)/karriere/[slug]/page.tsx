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
import { COMPANY_QUERY } from '@/sanity/lib/sanity.queries'
import TextContainer from '@/components/sections/textContainer'
import { generatePageMetadata } from '~/utils/metadataUtils'
import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import { urlFor } from '~/sanity/lib/sanity.image'
import EditButton from '~/components/atoms/EditButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '~/app/api/auth/[...nextauth]/route'
import { useSession } from 'next-auth/react'

export default async function DynamicRoute({
  params: { slug: slug, locale },
}: {
  params: { slug: string[] | any; locale: string }
}) {
  const page = await loadPage(slug, 'da', COMPANY_QUERY)
  const session = await getServerSession(authOptions)

  if (!page) {
    notFound()
  }
  const isUserAssignedToCompany = session?.user?.company === page.name

  return (
    <PageContainer>
      <Section>
        <div className="col-span-full">
          {page.name && <Heading>{page.name}</Heading>}

          <div className="flex flex-row justify-between gap-12">
            {page.image && (
              <Image
                className="object-cover"
                src={urlFor(page.image).dpr(2).url()}
                alt={page.altText || 'Billede af ' + page.title}
                width={1920}
                height={1080}
                placeholder="blur"
                blurDataURL={urlFor(page.image)
                  .width(24)
                  .height(24)
                  .blur(10)
                  .url()}
                sizes="
             (max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             40vw"
              />
            )}
            <div className="flex-col prose-p:pb-4">
              {page.description && (
                <>
                  <Heading type="h6" tag="h6" spacing="none">
                    Om os
                  </Heading>
                  <Paragraph spacing="none">{page.description}</Paragraph>
                </>
              )}
              {page.address && (
                <>
                  <Heading type="h6" tag="h6" spacing="none">
                    Adresse
                  </Heading>
                  <Paragraph>{page.address}</Paragraph>
                </>
              )}
              {page.phone && (
                <>
                  <Heading type="h6" tag="h6" spacing="none">
                    Telefon
                  </Heading>
                  <Paragraph>{page.phone}</Paragraph>
                </>
              )}
              {page.email && (
                <>
                  <Heading type="h6" tag="h6" spacing="none">
                    Email
                  </Heading>
                  <Paragraph>{page.email}</Paragraph>
                </>
              )}
              {isUserAssignedToCompany && <EditButton />}
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
