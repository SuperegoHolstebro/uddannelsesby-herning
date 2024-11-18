'use client'
import { motion, useSpring, useTransform } from 'framer-motion'
import React, { useRef, useEffect } from 'react'
import InnerBlocks from '@/components/molecules/InnerBlocks'
import Section from '@/components/sections/Section'
import { TextAndCollageProps } from '@/types/TextWithIllustrationProps'
import { clean } from '~/utils/sanitize'
import Image from 'next/image'
import Icon from '../atoms/Icons'
import { useRafLoop } from 'react-use'

/**
 *
 * @returns: En sektion med tekst og illustration.
 * @example: <TextAndCollage />
 * @alias: TextAndCollage
 * @module: components/sections/TextAndCollage
 * @summary: Dette komponent bruges til at vise en sektion med tekst og en collage.
 * @see: src/components/sections/TextAndCollage.tsx
 * @version: 1.0.0
 * @property: [data]
 * @todo: implementer bedre håndtering af innerBlocks
 * @author: Emilie Hjøllund
 *
 **/
const TextAndCollage = ({ data, popup, flip = false }: TextAndCollageProps) => {
  const marginOne =
    '-mx-4 md:-mr-3 md:mx-0 md:-ml-24 md:-mt-16 md:-mb-20 2xl:-ml-52 xl:-ml-36 '
  const marginTwo =
    '-mx-4 md:mx-0 md:-mr-24 md:-mt-16 md:-mb-20 md:-ml-3 xl:-mr-36 2xl:-mr-52'
  return (
    <>
      <Section
        id={clean(data?.SectionSettings?.anchor?.current)}
        paddingTop={clean(data?.design?.padding?.spacingTop)}
        paddingBottom={clean(data?.design?.padding?.spacingBottom)}
        className="overflow-hidden"
        variant={data?.design?.color?.color}
      >
        <div
          className={`${marginTwo} relative h-screen/2 md:h-screen/1.6 block col-start-1 -col-end-1 md:-col-start-1 md:col-end-7 xl:-col-start-1 xl:-col-end-13 2xl:-col-start-1 2xl:-col-end-13 ${flip ? 'md:flex-row-reverse' : ''}`}
        >
          {data?.images?.map((image, index) => (
            <Portrait key={index} data={image.image} index={index} />
          ))}
        </div>
        <div className="justify-center col-start-1 -col-end-1 md:col-start-1 md:row-start-1 md:flex md:flex-col md:col-end-6 lg:col-start-1 xl:col-end-12">
          <InnerBlocks blocks={data.innerBlocks} />
        </div>
      </Section>
    </>
  )
}

export default TextAndCollage

function Portrait({ data, index }) {
  const translateX =
    index === 0
      ? 'translate-x-[25%] -rotate-2 -mt-8'
      : index === 1
        ? 'translate-x-[75%] rotate-2 mt-8'
        : 'translate-x-[50%]'

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
          filter: index === 0 || index === 1 ? 'blur(0px)' : 'blur(0px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: index === 0 || index === 1 ? 'blur(8px)' : 'blur(0px)',
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ type: 'spring', duration: 1, delay: 0.5 * index }}
    >
      <div
        className={`absolute w-full flex justify-center h-full transform aspect-w-4 aspect-h-3 max-w-96 right-1/2 ${translateX}`}
      >
        <>
          {index === 2 && (
            <motion.div
              className="absolute mt-auto -bottom-20 -left-20 h-52 w-52"
              animate={{ rotate: 360 }} // Full rotation
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: 20, // Duration for one full rotation; adjust as needed
              }}
            >
              <Icon type="stjerne" className="w-full h-full" />
            </motion.div>
          )}
          <Image
            src={data?.asset.url}
            alt={data?.alt}
            width={500}
            height={500}
            className="object-cover"
          />
        </>
      </div>
    </motion.div>
  )
}
