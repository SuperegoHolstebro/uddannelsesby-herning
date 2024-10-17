import React from 'react'
import Image from 'next/image'
export default function Text() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full bg-cover pointer-events-none"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="absolute bottom-0 right-0 z-10 max-w-xl pointer-events-none text-signal-gul">
        <h1 className="px-8 pb-8 text-center pointer-events-none text-giant max-w-prose font-display text-balance">
          <div className="font-display text-giant"> se </div>
          <div className="font-display text-giant"> dET </div>
          <div className="font-display text-giant"> FOr </div>
          <div className="font-display text-giant"> diG </div>
        </h1>
      </div>

      <div className="absolute bottom-0 left-0 z-10 pb-4 pl-8 font-sans pointer-events-none text-signal-gul sm:max-w-md md:max-w-xl">
        <p>
          Ea fugiat ut officia mollit cillum amet dolore quis tempor Lorem do
          dolor. Dolor occaecat consequat elit nisi velit exercitation dolor
          dolore exercitation qui irure esse. Quis occaecat consectetur nulla
          nulla exercitation elit deserunt magna duis fugiat ut qui quis ipsum
          elit. Nostrud ipsum dolore duis. Occaecat irure tempor pariatur
          occaecat consectetur laborum enim.
        </p>
      </div>
    </>
  )
}
