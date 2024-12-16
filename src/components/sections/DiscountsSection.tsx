'use client'

import React, { useState, useEffect } from 'react'
import Section from './Section'
import EventCardFilter from '../molecules/EventCardFilter'
import Icon from '../atoms/Icons'
import { clean } from '~/utils/sanitize'
import DiscountsCard from '../atoms/DiscountsCard'

const DiscountsSection = ({ section }) => {
  const [data, setData] = useState(section)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Fetch data if not provided via props
    if (!section) {
      fetch('/api/discounts') // Assuming you have an API route for this
        .then((res) => res.json())
        .then(setData)
    }
  }, [section])

  if (!data) return <div>Loading...</div>

  const { discounts, categories } = data

  // Deduplicate categories
  const uniqueCategories = categories

  return (
    <Section>
      {/* Filter Buttons */}
      <div className="grid grid-cols-6 pb-6 col-span-full ">
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
            icon={category.icon.icon}
            key={index}
            category={category.title}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          >
            {category.title}
          </FilterButton>
        ))}
      </div>

      {/* Event Cards */}
      <div className="pt-4 col-span-full">
        <Section tag="ul" paddingX="none" paddingTop="none">
          {discounts
            .filter(
              (event) =>
                selectedCategory === 'all' ||
                event.tags?.some((tag) => tag.title === selectedCategory),
            )
            .map((event, index) => (
              <DiscountsCard key={index} data={clean(event)} />
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
      className={`border-grå border-l [&:nth-child(6)]:border-l-0  [&:nth-child(12)]:border-l-0 [&:nth-child(18)]:border-l-0 [&:nth-child(24)]:border-l-0 [&:nth-child(30)]:border-l-0 relative w-full mx-6 px-6 space-y-5 ${selectedCategory === category ? '' : 'bg-hvid'}`}
    >
      <Icon className="mx-auto size-8" type={icon} />
      <span className="block">{children}</span>
    </button>
  )
}
