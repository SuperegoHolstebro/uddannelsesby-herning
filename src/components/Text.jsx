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
        <h1 className="px-8 pb-8 font-light text-center pointer-events-none text-giant max-w-prose font-display text-balance">
          <div className="font-light font-display text-giant"> se </div>
          <div className="font-light font-display text-giant"> dET </div>
          <div className="font-light font-display text-giant"> FOr </div>
          <div className="font-light font-display text-giant"> diG </div>
        </h1>
      </div>

      <div className="absolute bottom-0 left-0 z-10 pb-8 font-sans pointer-events-none pl-36 text-lys sm:max-w-md md:max-w-3xl">
        <p>
          Kan du se det for dig? Med en uddannelse i Uddannelsesby Herning får
          du ikke bare et trygt studieliv og en perlerække af fede events inden
          for sport og kultur. Du bliver en del af en visionær by, hvor drømme
          og potentialer er håndgribelige. For vi kan se det for os. Din fremtid
          begynder i Herning.
        </p>
      </div>
    </>
  )
}
