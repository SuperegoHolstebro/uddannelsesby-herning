'use client'
import { motion } from 'framer-motion'
import React from 'react'
import InnerBlocks from '@/components/molecules/InnerBlocks'
import Section from '@/components/sections/Section'
import { TextAndCollageProps } from '@/types/TextWithIllustrationProps'
import { clean } from '~/utils/sanitize'
import Icon from '../atoms/Icons'
import { FadeUp } from '../interactions/AnimateFadeIn'
import Photo from '../atoms/Photo'

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
        className="pt-0 overflow-y-visible overflow-x-clip sm:pt-0 md:pt-24 lg:pt-32 xl:pt-40 2xl:pt-48"
        variant={data?.design?.color?.color}
      >
        <div /* h-screen/2 md:h-screen/1.6 */
          className={`${marginTwo} md:h-screen/1.6 relative col-start-1 -col-end-1 md:-col-start-1 md:col-end-7 xl:-col-start-1 xl:-col-end-13 2xl:-col-start-1 2xl:-col-end-13 ${flip ? 'md:flex-row-reverse' : ''}`}
        >
          {/* hidden md:block */}
          <div className="hidden md:block">
            {data?.images?.map((image, index) => (
              <Portrait key={index} data={image.image} index={index} />
            ))}
          </div>
          {/* gird grid-cols-3 md:hidden */}
          <div className="grid h-auto grid-cols-4 md:hidden">
            {data?.images?.map((image, index) => (
              <Portraitmd key={index} data={image.image} index={index} />
            ))}
          </div>
        </div>
        <div className="justify-center col-start-1 pt-14 md:pt-0 -col-end-1 md:col-start-1 md:row-start-1 md:flex md:flex-col md:col-end-6 lg:col-start-1 xl:col-end-12">
          <InnerBlocks blocks={data.innerBlocks} index={0} />
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
    <>
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
        transition={{
          type: 'spring',
          duration: 1,
          delay: 0.5 * index,
          ease: [0.86, 0, 0.07, 1],
        }}
      >
        <div
          className={`absolute w-full flex justify-center h-full transform aspect-w-3 aspect-h-2 max-w-[24rem] xl:max-w-[29rem] right-1/2 ${translateX}`}
        >
          {index === 2 && (
            <FadeUp delay={1.5}>
              <motion.div
                className="absolute mt-auto -bottom-20 -left-20 size-44 md:size-52"
                animate={{ rotate: 360 }} // Full rotation
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 20, // Duration for one full rotation; adjust as needed
                }}
              >
                <Icon type="stjerne" className="w-full h-full" />
              </motion.div>
            </FadeUp>
          )}
          <>
            <Photo image={data} objectFit="cover" />
          </>
        </div>
      </motion.div>
    </>
  )
}

function Portraitmd({ data, index }) {
  return (
    <motion.div className="first:-mt-14  first:z-20 even:-mt-14 even:z-20 first:pr-2 even:pl-2 last:col-span-full last:row-start-1 first:col-span-1 even:col-span-3 even:h-screen/5 first:h-screen/5 last:h-screen/2.5">
      <div className={`w-full flex justify-center h-full`}>
        {index === 2 && (
          <motion.div
            className="absolute mt-auto transform translate-x-1/2 -top-20 -right-20 h-52 w-52"
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
        <Photo
          className="object-cover w-full h-full"
          image={data}
          objectFit="cover"
        />
      </div>
    </motion.div>
  )
}
