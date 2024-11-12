import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import { urlFor } from '~/sanity/lib/sanity.image'
import { resolveHref } from '~/sanity/lib/sanity.links'

/**
 *
 * @returns: En CompanyCard komponent
 * @example: <CompanyCard />
 * @alias: CompanyCard
 * @summary: Denne komponent bruges til at vise information om en virksomhed.
 * @version: 1.0.0
 * @property: [company]
 * @author: Emilie Hjøllund
 *
 **/

const CompanyCard = ({ company }) => {
  return (
    <div className="relative col-span-2 sm:col-span-4 xl:col-span-8 group ">
      <Link
        href={resolveHref(company._type, company.slug)}
        title={company.name}
      >
        <CompanyCardPortrait data={company} />
        <CompanyCardInfo data={company} />
      </Link>
    </div>
  )
}
export default CompanyCard

function CompanyCardPortrait({ data }) {
  return (
    <div className="relative object-cover w-full overflow-hidden ">
      {data.image && (
        <div className="aspect-w-4 aspect-h-2">
          <Image
            className="object-cover"
            src={urlFor(data.image).dpr(2).url()}
            alt={data.altText || 'Billede af ' + data.title}
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={urlFor(data.image).width(24).height(24).blur(10).url()}
            sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
          />
        </div>
      )}
    </div>
  )
}
function CompanyCardInfo({ data }) {
  return (
    <div className="mt-4">
      {data.name && (
        <Heading spacing="none" type="h5" tag="h5">
          {data.name}
        </Heading>
      )}
      {data.phone && <div>tlf: {data.phone}</div>}
      {data.email && <div>email: {data.email}</div>}
    </div>
  )
}
