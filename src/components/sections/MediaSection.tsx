'use client'
import React from 'react'
import Section from '@/components/sections/Section'
import { clean } from '~/utils/sanitize'
import Media from '../organisms/Media'
import { FadeUp } from '../interactions/AnimateFadeIn'
import TextContainer from './textContainer'

/**
 *
 * @returns: En sektion med media.
 * @example: <Media />
 * @alias: Media
 * @module: components/sections/Media
 * @summary: Denne komponent bruges til at vise en sektion med media.
 * @see: src/components/sections/Media.tsx
 * @version: 1.0.0
 * @property: [section, index]
 * @todo: Tilføj flere mediatyper
 * @author: Kasper Buchholtz
 *
 **/

const MediaSection = ({ data }) => {
  return (
    <Section className="*:w-full">
      <div className="col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-4 xl:-col-end-4 2xl:col-start-4 2xl:-col-end-4">
        <FadeUp>
          <div className="w-full">
            <Media data={data.MediaObject?.media} />
          </div>
        </FadeUp>
      </div>
    </Section>
  )
}

export default MediaSection
