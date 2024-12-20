import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import { urlFor } from '~/sanity/lib/sanity.image'
import { resolveHref } from '~/sanity/lib/sanity.links'
import { clean } from '~/utils/sanitize'
import Badge from '../atoms/badge'
import Photo from '../atoms/Photo'

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
    <li className="relative col-span-full sm:col-span-4 xl:col-span-8  border-b-grå border-b pb-6 mb-6">
      <Link
        className={`flex flex-col h-full w-full group `}
        href={clean(resolveHref(company._type, company.slug))}
        title={clean(company.name)}
      >
        <CompanyCardPortrait data={company} />
        <CompanyCardInfo data={company} />
      </Link>
    </li>
  )
}
export default CompanyCard

function CompanyCardPortrait({ data }) {
  return (
    <div className="relative object-cover w-full overflow-hidden ">
      {data.image && (
        <div className="transition-all aspect-w-4 aspect-h-2 ease-custom duration-735 group-hover:scale-110">
          <Photo image={data.image} objectFit="cover" />
        </div>
      )}
    </div>
  )
}
function CompanyCardInfo({ data }) {
  return (
    <>
      {data.name && (
        <Heading spacing="none" type="h4" tag="h4" className="my-4">
          {data.name}
        </Heading>
      )}
      {data.fields && data.fields.length > 0 && (
        <ul className="flex flex-row flex-wrap gap-2.5  mt-auto">
          <Badge variant="dark" className="">
            {data.fields[0].title}
          </Badge>
          {data.fields.length > 1 && (
            <Badge variant="dark" className="">
              + {data.fields.length - 1} FLERE
            </Badge>
          )}
        </ul>
      )}
    </>
  )
}
