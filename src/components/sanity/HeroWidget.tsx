import React from 'react'
import Heading from '@/components/atoms/Heading'
import Image from 'next/image'

const removeHttps = (url: string): string => {
  return url.replace('https://', '')
}

const HeroWidget = () => {
  return (
    <div className="flex items-center justify-between py-10 pl-6 bg-grey first:prose-headings:text-light-0">
      <Heading
        type="h2"
        spacing="none"
        className="leading-tight max-w-[75%] font-light"
      >
        Velkommen til <br /> nem redigering af
        <br />{' '}
        <span className="text-green">
          {' '}
          {removeHttps(process.env.NEXT_PUBLIC_BASE_URL)}{' '}
        </span>
      </Heading>
      <img
        src="/images/backend/superego-blomst.png"
        alt="Sanity logo"
        width={100}
        height={100}
        className=""
      />
    </div>
  )
}

export default HeroWidget
