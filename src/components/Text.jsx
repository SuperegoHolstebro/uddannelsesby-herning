'use client'
import React from 'react'
import Image from 'next/image'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function Text({ videoSrc, textContent }) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full bg-cover pointer-events-none"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute right-0 z-10 w-1/3 h-screen py-16 pointer-events-none top-28 xl:top-0 ">
        <DotLottieReact
          src="lottie/SE-DET-FOR-DIG.lottie"
          loop
          autoplay
          className="*:bg-cover bg-cover size-full"
        />
        {/*   <h1 className="px-8 py-4 pb-8 font-light text-right pointer-events-none text-giant max-w-prose font-display text-balance xl:pt-8 xl:pb-2">
          <div className="font-light font-display text-giant"> se </div>
          <div className="font-light font-display text-giant"> dET </div>
          <div className="font-light font-display text-giant"> FOr </div>
          <div className="font-light font-display text-giant"> diG </div>
        </h1> */}
      </div>

      <div className="absolute bottom-0 left-0 z-10 pb-8 pl-6 font-sans pointer-events-none md:pl-32 lg:pl-36 text-lys xs:max-w-md sm:max-w-md md:max-w-xl lg:max-w-3xl">
        <p>{textContent}</p>
      </div>
    </>
  )
}
