'use client'
import React, { useState } from 'react'
import Section from './Section'
import EventCardFilter from '../molecules/EventCardFilter'
import { clean } from '~/utils/sanitize'
import Icon from '../atoms/Icons'
import { AnimatePresence, motion } from 'framer-motion'

const DiscountsSection = ({ section }) => {
  const { events, categoriesInUse } = section
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Deduplicate categories
  const uniqueCategories = Array.from(
    new Set(categoriesInUse.map((category) => category.category)),
  ).map((category) => {
    return categoriesInUse.find((item) => item.category === category)
  })

  return (
    <Section>
      {/* Filter Buttons */}
      <div className="divide-x-2 pb-6 col-span-full divide-solid divide-grå grid grid-cols-6">
        <FilterButton
          icon="map"
          category="all"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        >
          Udforsk alle
        </FilterButton>
        {uniqueCategories.map((category, index) => (
          <FilterButton
            icon={category.icon}
            key={index}
            category={category.category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          >
            {category.category}
          </FilterButton>
        ))}
      </div>

      {/* Event Cards */}
      <div className="pt-4 col-span-full">
        <Section tag={'ul'} paddingX="none" paddingTop="none">
          {events
            .filter(
              (event) =>
                selectedCategory === 'all' ||
                (event.category && event.category.title === selectedCategory),
            )
            .map((event, index) => (
              <EventCardFilter key={index} event={clean(event)} />
            ))}
        </Section>
      </div>
    </Section>
  )
}

export default DiscountsSection

function FilterButton({
  category,
  selectedCategory,
  setSelectedCategory,
  icon,
  children,
}) {
  return (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`relative w-full mx-6 px-6 space-y-5 ${selectedCategory === category ? '' : 'bg-hvid'}`}
    >
      <Icon className="mx-auto size-8" type={icon} />
      <span className="block">
        <span className="block">{children}</span>
        <AnimatePresence mode="wait" presenceAffectsLayout>
          <span
            className={`block translate-y-6 absolute -mt-1 overflow-hidden duration-500 ease-in-out w-full ml-auto`}
          >
            <svg
              className="w-full"
              preserveAspectRatio="xMinYMin meet"
              height="6"
              viewBox="0 0 30 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {selectedCategory === category && (
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
                  exit={{ pathLength: 0 }}
                  d="M0 4.71024L4.16667 2.85512C6.81894 1.67425 9.84772 1.67425 12.5 2.85512V2.85512C15.1523 4.03599 18.1811 4.03599 20.8333 2.85512V2.85512C23.4856 1.67425 26.5144 1.67425 29.1667 2.85512V2.85512C31.8189 4.03599 34.8477 4.03599 37.5 2.85512V2.85512C40.1523 1.67425 43.1811 1.67425 45.8333 2.85512V2.85512C48.4856 4.03599 51.5144 4.03599 54.1667 2.85512V2.85512C56.8189 1.67425 59.8477 1.67425 62.5 2.85512V2.85512C65.1523 4.03599 68.1811 4.03599 70.8333 2.85512V2.85512C73.4856 1.67425 76.5144 1.67425 79.1667 2.85512V2.85512C81.8189 4.03599 84.8477 4.03599 87.5 2.85512V2.85512C90.1523 1.67425 93.1811 1.67425 95.8333 2.85512V2.85512C98.4856 4.03599 101.514 4.03599 104.167 2.85512V2.85512C106.819 1.67425 109.848 1.67425 112.5 2.85512V2.85512C115.152 4.03599 118.181 4.03599 120.833 2.85512V2.85512C123.486 1.67425 126.514 1.67425 129.167 2.85512V2.85512C131.819 4.03599 134.848 4.03599 137.5 2.85512V2.85512C140.152 1.67425 143.181 1.67425 145.833 2.85512V2.85512C148.486 4.03599 151.514 4.03599 154.167 2.85512V2.85512C156.819 1.67425 159.848 1.67425 162.5 2.85512V2.85512C165.152 4.03599 168.181 4.03599 170.833 2.85512V2.85512C173.486 1.67425 176.514 1.67425 179.167 2.85512V2.85512C181.819 4.03599 184.848 4.03599 187.5 2.85512V2.85512C190.152 1.67425 193.181 1.67425 195.833 2.85512V2.85512C198.486 4.03599 201.514 4.03599 204.167 2.85512V2.85512C206.819 1.67425 209.848 1.67425 212.5 2.85512V2.85512C215.152 4.03599 218.181 4.03599 220.833 2.85512V2.85512C223.486 1.67425 226.514 1.67425 229.167 2.85512V2.85512C231.819 4.03599 234.848 4.03599 237.5 2.85512V2.85512C240.152 1.67425 243.181 1.67425 245.833 2.85512V2.85512C248.486 4.03599 251.514 4.03599 254.167 2.85512V2.85512C256.819 1.67425 259.848 1.67425 262.5 2.85512V2.85512C265.152 4.03599 268.181 4.03599 270.833 2.85512V2.85512C273.486 1.67425 276.514 1.67425 279.167 2.85512V2.85512C281.819 4.03599 284.848 4.03599 287.5 2.85512V2.85512C290.152 1.67425 293.181 1.67425 295.833 2.85511L300 4.71024"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              )}
            </svg>
          </span>
        </AnimatePresence>
      </span>
    </button>
  )
}