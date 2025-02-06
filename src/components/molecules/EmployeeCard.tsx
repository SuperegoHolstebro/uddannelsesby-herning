import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Icon from '@/components/atoms/Icons'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En employee card, der viser information om en medarbejder.
 * @example: <EmployeeCard />
 * @alias: EmployeeCard
 * @module: components/atoms/EmployeeCard
 * @summary: Denne komponent bruges til at vise information om en medarbejder.
 * @see: src/components/atoms/EmployeeCard.tsx
 * @version: 1.0.0
 * @property: [employee]
 * @author: Kasper Buchholtz
 *
 **/

// split every 2 digits with a space
const splitEveryTwoDigits = (str) => {
  return str.replace(/(\d{2})(?=\d)/g, '$1 ')
}

const EmployeeCard = ({ employee }) => {
  return (
    <div className="col-span-2 sm:col-span-4 xl:col-span-6 group ">
      <EmployeeCard.Portrait employee={employee} />
      <EmployeeCard.Info employee={employee} />
    </div>
  )
}
export default EmployeeCard

EmployeeCard.Portrait = Portrait
EmployeeCard.Info = Info

function Portrait({ employee }) {
  return (
    <div className="relative object-cover w-full overflow-hidden rounded-md">
      <div className="aspect-w-4 aspect-h-5">
        <Photo image={employee.image} objectFit="cover" />
      </div>
      {employee.socials && (
        <div className="absolute z-10 flex flex-col gap-2 right-2 bottom-2">
          {employee.socials.map((social, index) => (
            <Link target="_blank" href={social.url} key={index}>
              <Icon
                className="size-5 fill-light-light hover:fill-green transition-fill"
                type={social.platform}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
function Info({ employee }) {
  return (
    <div className="mt-4">
      <Heading spacing="none" type="h5" tag="h5">
        {employee.title}
      </Heading>
      <div className="mt-1.5">
        {employee.employeePosition.stilling.map((position, index) => (
          <span className="text-regular" key={position._rev}>
            {position.title}
            {index !== employee.employeePosition.stilling.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <Link
          className="flex gap-3 text-regular"
          href={`tel:${employee.phone}`}
        >
          <Icon className="size-6 fill-green" type={'Phone'} />
          {employee.phone}
        </Link>
        <Link
          className="flex gap-3 text-regular"
          href={`mailto:${employee.email}`}
        >
          <Icon className="size-6 fill-green" type={'Envelope'} />
          {employee.email}
        </Link>
      </div>
    </div>
  )
}
