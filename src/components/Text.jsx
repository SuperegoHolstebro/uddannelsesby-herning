import React from 'react'
import Image from 'next/image'
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
      <div className="absolute bottom-0 right-0 z-10 max-w-xl pointer-events-none text-signal-gul">
        <h1 className="px-8 py-4 pb-8 font-light text-right pointer-events-none text-giant max-w-prose font-display text-balance xl:pt-8 xl:pb-2">
          <div className="font-light font-display text-giant"> se </div>
          <div className="font-light font-display text-giant"> dET </div>
          <div className="font-light font-display text-giant"> FOr </div>
          <div className="font-light font-display text-giant"> diG </div>
        </h1>
      </div>

      <div className="absolute bottom-0 left-0 z-10 pb-8 font-sans pointer-events-none pl-36 text-lys sm:max-w-md md:max-w-3xl">
        <p>{textContent}</p>
      </div>
    </>
  )
}
