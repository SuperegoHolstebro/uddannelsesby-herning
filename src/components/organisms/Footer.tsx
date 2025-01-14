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
import Section from '../sections/Section'
import { FOOTER_QUERY } from '~/sanity/lib/sanity.queries'

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

export default function Footer({ locale }) {
  const useFooterData = () => {
    const [data, setData] = React.useState(null)
    useEffect(() => {
      const fetchData = async () => {
        let result = await client.fetch(FOOTER_QUERY, {
          locale: locale.locale || 'da',
        })
        result = await stegaClean(result)
        setData(result)
      }
      fetchData()
    }, [])
    return data
  }
  const data = useFooterData()

  const gridCols =
    'xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24'
  const gridGap = 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6'
  const paddingX =
    'px-4 xs:px-4 sm:px-13 md:pr-24 md:pl-[10rem] lg:pr-19 lg:pl-[9.5rem] xl:pl-[200px] 2xl:pl-[351px]'
  const paddingY = 'pt-[15vw] sm:pt-[5vw]'

  return (
    <>
      <Section
        paddingBottom="none"
        paddingTop="none"
        tag="footer"
        className={`pb-6 text-mørk bg-signal-pink pt-[15vw] sm:pt-[5vw]`}
      >
        <div className="flex flex-col justify-between pb-12 sm:flex-row col-span-full">
          <Footer.ColumnOne data={data} />
          <Footer.ColumnTwo data={data} />
          <Footer.ColumnThree data={data} />
        </div>
        <Footer.Legal data={data} />
      </Section>
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
    <div className="order-2 mx-auto mt-12 md:order-1 md:mx-0 md:mt-0">
      <div className="mb-4 texcol-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6t-center md:pb-4 md:text-left md:mb-2">
        <Paragraph className="text-mørk" spacing="none">
          Følg os her:
        </Paragraph>
      </div>
      <ul className="flex flex-wrap justify-center max-w-64 gap-x-4 gap-y-2 md:justify-start">
        {social?.map(
          (item: { platform: string; url: string }, index: number) => (
            <li key={index}>
              <Link
                className="fill-mørk hover:fill-signal-gul transition-colors w-full block"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="size-8 md:size-7" type={item.platform} />
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
  const address = data?.object?.address
  const cvr = data?.object?.cvr
  const companyName = data?.object?.companyName
  return (
    <>
      <div className="order-3 mt-12 md:mt-0">
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
      <div className="h-px w-full  bg-mørk"></div>
      <div className="flex flex-col justify-center gap-1 text-center sm:text-left sm:flex-row sm:justify-between text-[14px]">
        <div className="flex flex-col justify-start gap-4 sm:gap-8 md:gap-12 sm:flex-row">
          <p className="text-[14px]">{`© ${companyName} ${new Date().getFullYear()}`}</p>
          <p className="text-[14px]">
            <Link href="/cookiepolitik" rel="noreferrer">
              Cookiepolitik
            </Link>
          </p>
          {/*  <p className="text-[14px]">
            <Link href="/" target="_blank" rel="noreferrer">
              Tilgængelighedserklæring
            </Link>
          </p> */}
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
        <p className="relative transition-all text-[14px] group mt-2 sm:mt-0 ">
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
