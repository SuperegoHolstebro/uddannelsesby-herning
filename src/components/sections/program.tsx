'use client'
import React, { useState } from 'react'
import Section from './Section'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import { createPortal } from 'react-dom'
import Photo from '../atoms/Photo'
import Icon from '../atoms/Icons'
import { motion, AnimatePresence } from 'framer-motion'
import EducationContent from '../molecules/EducationContent'
import { ProgramListItem } from '../atoms/ProgramListItem'
const Program = ({ data }) => {
  // Sort items by start time
  const sortedItems = data.items.sort((a, b) => {
    const timeA = a.time.start
    const timeB = b.time.start
    return timeA.localeCompare(timeB)
  })

  // Group items by unique start times
  const groupedItems = sortedItems.reduce((acc, item) => {
    const { start } = item.time
    acc[start] = acc[start] || []
    acc[start].push(item)
    return acc
  }, {})

  return (
    <Section data={data}>
      <div className="col-span-full">
        <Heading
          tag="h2"
          type="h2"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
      </div>

      <div className="col-span-full">
        {Object.entries(groupedItems).map(([time, items], index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:mb-16 mb-8 md:pb-16 pb-8 border-b border-grå last:border-none"
          >
            <div className="w-full font-bold md:w-1/5">
              <Heading tag="h4" type="h4">{`KL. ${time}`}</Heading>
            </div>
            <ul className="w-full space-y-3 md:w-4/5">
              {(items as Array<any>).map((item, itemIndex) => (
                <ProgramListItem key={itemIndex} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Program
