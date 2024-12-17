'use client'

import React, { useState, useEffect } from 'react'
import Section from './Section'
import EventCardFilter from '../molecules/EventCardFilter'
import Icon from '../atoms/Icons'
import { clean } from '~/utils/sanitize'
import DiscountsCard from '../atoms/DiscountsCard'
import { SwiperSlide, Swiper } from 'swiper/react'
import { useMediaQuery } from '~/hooks/useMediaQuery'

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
      {useMediaQuery('(max-width: 768px)') ? (
        <div className="col-span-full">
          <Swiper spaceBetween={'16'} slidesPerView={3.3}>
            <SwiperSlide>
              <FilterButton
                icon="map"
                category="all"
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              >
                Udforsk alle
              </FilterButton>
            </SwiperSlide>
            {uniqueCategories.map((category, index) => (
              <SwiperSlide key={index}>
                <FilterButton
                  icon={category.icon.icon}
                  category={category.category}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                >
                  {category.category}
                </FilterButton>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <>
          <FilterButton
            className=""
            icon="map"
            category="all"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          >
            Udforsk alle
          </FilterButton>
          {uniqueCategories.map((category, index) => (
            <FilterButton
              className=""
              icon={category.icon.icon}
              key={index}
              category={category.title}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              {category.title}
            </FilterButton>
          ))}
        </>
      )}
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
  className = '',
  category,
  selectedCategory,
  setSelectedCategory,
  icon,
  children,
}) {
  return (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`${className} border-grå relative w-full space-y-5 ${selectedCategory === category ? '' : 'bg-hvid'}`}
    >
      <Icon className="mx-auto size-8" type={icon} />
      <span className="block">{children}</span>
    </button>
  )
}
