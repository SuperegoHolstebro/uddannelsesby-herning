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
import Paragraph from '../atoms/Paragraph'

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
    `)
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
  const paddingX =
    'px-4 xs:px-4 sm:px-13 md:pr-24 md:pl-[10rem] lg:pr-19 lg:pl-[9.5rem] xl:pl-[200px] 2xl:pl-[351px]'
  const paddingY = 'pt-[15vw] sm:pt-[5vw]'

  return (
    <>
      <footer
        className={`${gridCols} ${gridGap} ${paddingX} ${paddingY} pb-6 text-mørk bg-signal-pink`}
      >
        <div className="flex flex-col justify-between pb-12 sm:flex-row col-span-full">
          <Footer.ColumnOne data={data} />
          <Footer.ColumnTwo data={data} />
          <Footer.ColumnThree data={data} />
        </div>
        <Footer.Legal data={data} />
      </footer>
    </>
  )
}

Footer.ColumnOne = ColumnOne
Footer.ColumnTwo = ColumnTwo
Footer.ColumnThree = ColumnThree
Footer.Legal = Legal
function ColumnOne({ data }) {
  const social = data?.social
  return (
    <div className="order-2 md:order-1">
      <div className="texcol-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6t-center md:pb-4 md:text-left">
        <Paragraph className="text-mørk" spacing="none">
          {' '}
          Følg os her:
        </Paragraph>
      </div>
      <ul className="flex flex-wrap justify-center mx-auto max-w-64 md:mx-0 gap-x-4 gap-y-2 md:justify-start">
        {social?.map(
          (item: { platform: string; url: string }, index: number) => (
            <li key={index}>
              <Link
                className="fill-mørk *:size-6 hover:fill-signal-gul transition-colors w-full block"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="" type={item.platform} />
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

function ColumnTwo({ data }) {
  return (
    <div className="order-1 md:order-2">
      <div className="">
        <Link className="text-mørk w-full block" href="/">
          <Logo className="w-full h-auto max-w-xs mx-auto sm:mx-0" />
        </Link>
      </div>
    </div>
  )
}

function ColumnThree({ data }) {
  const phone = data?.object?.telephone
  const email = data?.object?.email
  const logo = data?.logo
  const address = data?.object?.address
  const cvr = data?.object?.cvr
  const companyName = data?.object?.companyName
  return (
    <>
      <div className="order-3 ">
        <div className="uppercase ">
          <Paragraph
            className="text-center text-mørk font-bold md:text-right"
            spacing="none"
          >
            {companyName}
          </Paragraph>
        </div>
        <div className="text-center md:text-right">
          <p>{address}</p>
          <p>CVR {cvr}</p>
        </div>
      </div>
    </>
  )
}

function Legal({ data }) {
  const companyName = data?.object?.companyName
  return (
    <div className="space-y-6 col-span-full">
      <div className="h-px w-full hidden sm:block bg-mørk"></div>
      <div className="flex flex-col justify-center gap-1 text-center sm:text-left sm:flex-row sm:justify-between text-[14px]">
        <div className="flex flex-col justify-start gap-4 sm:gap-8 md:gap-12 sm:flex-row">
          <p className="text-[14px]">{`© ${companyName} ${new Date().getFullYear()}`}</p>
          <p className="text-[14px]">
            <Link href="/" target="_blank" rel="noreferrer">
              Cookiepolitik
            </Link>
          </p>
          <p className="text-[14px]">
            <Link href="/" target="_blank" rel="noreferrer">
              Tilgængelighedserklæring
            </Link>
          </p>
          <p className="text-[14px]">
            <Link
              className="group"
              href="/signin"
              target=""
              rel="noreferrer"
              title="Virksomhedslogin"
            >
              Virksomhedslogin
            </Link>
          </p>
        </div>
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

/* export default function Footer() {
  const [footer, setFooter] = React.useState<FooterType[]>([])
  useEffect(() => {
    getFooter().then((nav) => setFooter(stegaClean(nav)))
  }, [])

  const data = footer[0]

  const gridCols =
    'xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24'
  const gridGap = 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6'
  const paddingX =
    'px-4 xs:px-4 sm:px-13 md:pr-24 md:pl-[10rem] lg:pr-19 lg:pl-[9.5rem] xl:pl-[200px] 2xl:pl-[351px]'
  const paddingY = 'pt-[15vw] sm:pt-[5vw]'

  return (
    <>
      <footer
        className={`${gridCols} ${gridGap} ${paddingX} ${paddingY} pb-6 text-mørk bg-signal-pink`}
      >
        <div
          className={`grid grid-rows-3 md:grid-rows-none col-span-full ${gridCols} ${gridGap} pb-14 md:pb-24`}
        >
          <Footer.ColumnOne data={data} />
          <Footer.ColumnTwo data={data} />
          <Footer.ColumnThree data={data} />
        </div>
        <Footer.Legal data={data} />
      </footer>
    </>
  )
}

Footer.ColumnOne = ColumnOne
Footer.ColumnTwo = ColumnTwo
Footer.ColumnThree = ColumnThree
Footer.Legal = Legal

function ColumnOne({ data }) {
  const social = data?.social
  return (
    <div className="col-span-full md:col-span-4 xl:col-span-8">
      <div className="text-center md:text-left">
        <Paragraph className="text-mørk" spacing="none">
          Følg os her:
        </Paragraph>
      </div>
      <ul className="flex flex-wrap justify-center mx-auto max-w-64 md:mx-0 gap-x-4 gap-y-2 md:justify-start">
        {social?.map(
          (item: { platform: string; url: string }, index: number) => (
            <li key={index}>
              <Link
                className="fill-mørk *:size-6 hover:fill-signal-gul transition-colors"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="" type={item.platform} />
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

function ColumnTwo({ data }) {
  return (
    <div className="row-start-1 col-span-full md:col-span-4 xl:col-span-8">
      <div className="">
        <Link className="text-mørk" href="/">
          <Logo className="w-full h-auto max-w-xs mx-auto sm:mx-0" />
        </Link>
      </div>
    </div>
  )
}

function ColumnThree({ data }) {
  const phone = data?.object?.telephone
  const email = data?.object?.email
  const logo = data?.logo
  const address = data?.object?.address
  const cvr = data?.object?.cvr
  const companyName = data?.object?.companyName
  return (
    <>
      <div className="col-span-full md:col-span-4 xl:col-span-8">
        <div className="uppercase ">
          <Paragraph
            className="text-center text-mørk font-bold md:text-right"
            spacing="none"
          >
            {companyName}
          </Paragraph>
        </div>
        <div className="text-center md:text-right">
          <p>{address}</p>
          <p>CVR {cvr}</p>
        </div>
      </div>
    </>
  )
}

function Legal({ data }) {
  const companyName = data?.object?.companyName
  return (
    <div className="space-y-6 col-span-full">
      <div className="h-px w-full hidden sm:block bg-mørk"></div>
      <div className="flex flex-col justify-center gap-1 text-center sm:text-left sm:flex-row sm:justify-between text-[14px]">
        <div className="flex flex-col justify-start gap-4 sm:gap-8 md:gap-12 sm:flex-row">
          <p className="text-[14px]">{`© ${companyName} ${new Date().getFullYear()}`}</p>
          <p className="text-[14px]">
            <a href="/" target="_blank" rel="noreferrer">
              Cookiepolitik
            </a>
          </p>
          <p className="text-[14px]">
            <a href="/" target="_blank" rel="noreferrer">
              Tilgængelighedserklæring
            </a>
          </p>
          <p className="text-[14px]">
            <a href="/signin" target="" rel="noreferrer">
              Virksomhedslogin
            </a>
          </p>
        </div>
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
 */
