'use client'
import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
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

  useEffect(() => {
    const targetDuration = 3 // Duration in seconds for all counters to finish around the same time
    animate(count, data.number, {
      duration: targetDuration,
      ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for a smooth ease-out
    })
  }, [data.number, count])

  return (
    <motion.div
      className="col-span-full md:col-span-4 xl:col-span-8 prose-headings:text-center md:prose-headings:text-left"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
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
