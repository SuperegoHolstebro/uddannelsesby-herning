'use client';
import React, { useState } from 'react'
import Section from './Section'
import Heading from '../atoms/Heading'
import { ProgramListItem } from '../atoms/ProgramListItem'
import { AnimatePresence } from 'framer-motion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

const Program = ({ data }) => {
  // Extract unique education titles for the filter dropdown
  const uniqueEducations = Array.from(
    new Set(data.items.map((item) => item.edducation?.title).filter(Boolean)),
  )

  // State for selected education filter
  const [selectedEducation, setSelectedEducation] = useState('All')

  // Filter items based on selected education
  const filteredItems =
    selectedEducation === 'All'
      ? data.items
      : data.items.filter(
          (item) => item.edducation?.title === selectedEducation,
        )

  // Group filtered items by their start time
  const groupedItems = filteredItems.reduce((acc, item) => {
    const { start } = item.time
    if (!acc[start]) {
      acc[start] = []
    }
    acc[start].push(item)
    return acc
  }, {})

  return (
    <Section data={data}>
      <div className="flex flex-col items-center justify-between mb-8 text-center col-span-full md:flex-row md:text-left">
        <Heading
          tag="h2"
          type="h2"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
        {/* Filter Dropdown */}
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedEducation}
          onChange={(e) => setSelectedEducation(e.target.value)}
        >
          <option value="All">Alle</option>
          {uniqueEducations.map((education: number, index) => (
            <option key={index} value={education}>
              {education}
            </option>
          ))}
        </select>
      </div>

      {/* 
        NavigationMenu replaces the <ul>. 
        Wrap your entire schedule in <NavigationMenu.Root> and <NavigationMenu.List> 
      */}
      <NavigationMenu.Root className="col-span-full">
        <NavigationMenu.List className="col-span-full">
          {Object.entries(groupedItems).map(([time, items]) => (
            /*
              Each time-group is now a <NavigationMenu.Item>. You can keep your 
              styling and layout inside. 
            */
            <NavigationMenu.Item
              key={time}
              className="flex flex-col items-start pb-8 mb-8 border-b border-gray-300 md:flex-row md:mb-16 md:pb-16 last:border-none"
            >
              <div className="w-full font-bold md:w-1/5">
                <Heading
                  className="text-center md:text-left"
                  tag="h4"
                  type="h4"
                >
                  {`KL. ${time}`}
                </Heading>
              </div>

              {/* 
                A second <NavigationMenu.List> for the items in this group. 
                This is optional depending on how you'd like your “menu” structure. 
              */}
              <div className="w-full space-y-3 md:w-4/5">

              <NavigationMenu.List >
                <AnimatePresence presenceAffectsLayout>
                  {(items as unknown as any[]).map((item, itemIndex) => (
                    <ProgramListItem 
                      itemIndex={itemIndex} 
                      key={itemIndex} 
                      item={item} 
                    />
                  ))}
                </AnimatePresence>
              </NavigationMenu.List>
              </div>

            </NavigationMenu.Item>
            
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </Section>
  )
}

export default Program
