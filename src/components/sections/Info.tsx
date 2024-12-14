'use client'
import React, { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion'
import Section from './Section'
import Heading from '../atoms/Heading'

const Info = ({ data }) => {
  return (
    <Section
      paddingBottom={'none'}
      paddingTop={'none'}
      className="py-4 bg-signal-pink md:py-6 xl:py-8"
    >
      {data?.infomation.map((info, index) => (
        <InfoBlock data={info} key={index} />
      ))}
    </Section>
  )
}

export default Info

function InfoBlock({ data }) {
  const count = useMotionValue(0)
  const roundedCount = useTransform(count, (value) => Math.round(value))

  // Create a ref to track the component's visibility
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  useEffect(() => {
    if (isInView) {
      const targetDuration = 3 // Duration in seconds for all counters to finish around the same time
      animate(count, data.number, {
        duration: targetDuration,
        ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for a smooth ease-out
      })
    }
  }, [isInView, data.number, count])

  return (
    <motion.div
      ref={ref}
      className="col-span-full md:col-span-4 xl:col-span-8 prose-headings:text-center md:prose-headings:text-left"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      <Heading
        tag="h2"
        type="h2"
        spacing="none"
        className="pb-1 lg:pb-2 xl:pb-3"
      >
        <motion.span>{roundedCount}</motion.span>
      </Heading>
      <Heading tag="h5" type="h5" spacing="none" className="font-extralight">
        {data.title}
      </Heading>
    </motion.div>
  )
}
