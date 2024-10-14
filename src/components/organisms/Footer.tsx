'use client'
import Link from 'next/link'
import { groq } from 'next-sanity'
import React, { useEffect } from 'react'
import Heading from '@/components/atoms/Heading'
import { client } from '@/sanity/lib/sanity.client'
import Icon from '../atoms/Icons'
import Logo from '../atoms/Logo'
import { FooterType } from '~/types/Footer.types'
import { stegaClean } from '@sanity/client/stega'

/**
 *
 * @returns: En footer, der viser virksomhedsoplysninger og links til sociale medier.
 * @example: <Footer />
 * @alias: Footer
 * @module: components/Footer
 * @summary: Denne komponent bruges til at vise virksomhedsoplysninger og links til sociale medier.
 * @see: src/components/Footer.tsx
 * @version: 1.0.0
 * @property: []
 * @author: Kasper Buchholtz
 *
 **/

export async function getFooter() {
  return client.fetch(groq`
    *[_type == "footer"] {
      title,
      logo {
        asset-> {
          _id,
          url,
          _type,
          altText,
          description,
          title,
          metadata {
            blurHash,
            dimensions
          }
        }
      },
      object {
        companyName,
        address,
        telephone,
        email,
        cvr
      },
      social[] {
        platform,
        url
      },
      openingHours[] {
        day,
        hours
      }
    }
    `
  );
}


export default function Footer() {
  const [footer, setFooter] = React.useState<FooterType[]>([])
  useEffect(() => {
    getFooter().then((nav) => setFooter(stegaClean(nav)))
  }, [])

  const data = footer[0]

  const gridCols =
    'xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24'
  const gridGap = 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6'
  const paddingX = 'px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52'
  const paddingY = 'pt-[15vw] sm:pt-[5vw]'

  return (
    <>
      <footer
        className={`${gridCols} ${gridGap} ${paddingX} ${paddingY} grid pb-20 text-light-base bg-dark *:mx-auto md:*:mx-0`}
      >
        <Footer.ColumnOne data={data} />
        <Footer.ColumnTwo data={data} />
        <Footer.ColumnThree data={data} />
        <Footer.ColumnFour data={data} />
        <Footer.Legal data={data} />
      </footer>
    </>
  )
}

Footer.ColumnOne = ColumnOne
Footer.ColumnTwo = ColumnTwo
Footer.ColumnThree = ColumnThree
Footer.ColumnFour = ColumnFour
Footer.Legal = Legal
function ColumnOne({ data }) {
  const social = data?.social
  return (
    <div className="col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6">
      <div className="">
        <Link className="text-light-base" href="/">
          <Logo className="w-full h-auto max-w-xs" />
        </Link>
      </div>
      <ul className="flex flex-wrap justify-center mx-auto mt-8 max-w-64 md:mx-0 gap-x-4 gap-y-2 md:justify-start">
        {social?.map((item, index) => (
          <li key={index}>
            <Link
              className="fill-white *:size-6 hover:fill-green transition-colors"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="" type={item.platform} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ColumnTwo({ data }) {
  const logo = data?.logo
  const address = data?.object?.address
  const cvr = data?.object?.cvr
  return (
    <div className=" col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6">
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-light-light md:text-left"
          spacing="none"
          tag="h5"
          type="h5"
        >
          Addresse
        </Heading>
      </div>
      <div className="space-y-2 text-center md:text-left">
        <p>{address}</p>
        <p>{cvr}</p>
      </div>
    </div>

  )
}

function ColumnThree({ data }) {
  const phone = data?.object?.telephone
  const email = data?.object?.email
  return (
    <div className=" col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6">
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-light-light md:text-left"
          spacing="none"
          tag="h5"
          type="h5"
        >
          Kontakt
        </Heading>
      </div>
      <div className="*:block space-y-2 text-center md:text-left">
        <a href={`tel:${phone}`}>{phone}</a>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  )
}

function ColumnFour({ data }) {
  const openingHours = data?.openingHours
  return (
    <div className=" col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6">
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-light-light md:text-left"
          spacing="none"
          tag="h5"
          type="h5"
        >
          Åbningstider
        </Heading>
      </div>

      <ul className="space-y-2 text-center md:text-left">
        {openingHours?.map((item, listIndex) => (
          <li className="text-center md:text-left" key={listIndex}>
            <span>{item.day}</span>
            <span> - </span>
            <span>{item.hours}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Legal({ data }) {
  const companyName = data?.object?.companyName
  return (
    <div className="space-y-6 col-span-full">
      <div className="h-0.5 w-full hidden sm:block bg-green"></div>
      <div className="flex flex-col justify-center gap-1 text-center sm:text-left sm:flex-row sm:justify-between text-[14px]">
        <p className="text-[14px]">{`© ${new Date().getFullYear()} ${companyName}`}</p>
        <p className="text-[14px]">
          <a href="/" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
        </p>
        <p className="text-[14px]">
          <a href="/" target="_blank" rel="noreferrer">
          Cookiepolitik
          </a>
        </p>
        <p className="relative transition-all text-[14px] group">
          <a
            className="before:absolute before:-right-[11px] before:rounded-full before:animate-bounce duration-1000 before:bottom-[5px] before:size-[7px] before:block before:transition-all ease-linear transition-all group-hover:before:bg-green"
            href="https://superego.nu/kontakt/holstebro"
            target="_blank"
            rel="noreferrer"
          >
            Website by
            <span className="transition-all decoration-green ">
              &nbsp;Superego
            </span>
          </a>
        </p>
      </div>
    </div>
  )
}