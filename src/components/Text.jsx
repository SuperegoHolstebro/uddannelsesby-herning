'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import Paragraph from './atoms/Paragraph'
import { FadeUp } from './interactions/AnimateFadeIn'
import { clean } from '~/utils/sanitize'
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  {
    ssr: false,
  },
)

export default function Text({ videoSrc, textContent, type }) {
  return (
    <>
      <div className="absolute inset-0 z-10 pointer-events-none size-full bg-gradient-to-b from-transparent via-transparent to-mørk/40" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-screen bg-cover pointer-events-none"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {clean(type) === type.regular && (
        <div className="absolute right-0 z-10 py-0 pointer-events-none xl:pb-0 top-28 md:top-20 xl:top-1/2 xl:-translate-y-1/2 scale-[.9] ">
          <FadeUp delay={0.5}>
            <Player
              autoplay
              loop
              hover
              src="/lottie/SE-DET-FOR-DIG.json"
              className="max-w-52 sm:max-w-xs md:max-w-md xl:max-w-lg "
            ></Player>
          </FadeUp>
        </div>
      )}

      <div className="absolute bottom-0 left-0 z-10 pb-8 pl-6 font-sans pointer-events-none md:pl-32 lg:pl-36 text-lys xs:max-w-md sm:max-w-md md:max-w-xl lg:max-w-3xl">
        <FadeUp>
          <Paragraph>{textContent}</Paragraph>
        </FadeUp>
      </div>
    </>
  )
}
