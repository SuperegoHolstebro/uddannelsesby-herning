import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import { urlFor } from '~/sanity/lib/sanity.image'
import { resolveHref } from '~/sanity/lib/sanity.links'
import { clean } from '~/utils/sanitize'
import Badge from '../atoms/badge'

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
    <div className="relative col-span-full sm:col-span-4 xl:col-span-8 group ">
      <Link
        href={clean(resolveHref(company._type, company.slug))}
        title={clean(company.name)}
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
    <div className="py-4 border-b border-b-grå">
      {data.name && (
        <Heading spacing="none" type="h5" tag="h5">
          {data.name}
        </Heading>
      )}
      {data.fields && data.fields.length > 0 && (
        <ul className="flex flex-row flex-wrap gap-2.5 pt-5">
          <Badge variant="dark" className="text-small">
            {data.fields[0].title}
          </Badge>
          {data.fields.length > 1 && (
            <Badge variant="dark" className="text-small">
              + {data.fields.length - 1} FLERE
            </Badge>
          )}
        </ul>
      )}
    </div>
  )
}
