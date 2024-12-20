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

  // Deduplicate categories and only show categories with discounts
  const uniqueCategories = categories.filter((category) =>
    discounts.some((event) =>
      event.tags?.some((tag) => tag.title === category.category),
    ),
  )

  return (
    <Section>
      <div className="grid grid-cols-6 gap-4 pb-6 col-span-full">
        <FilterButtons
          categories={categories}
          selectedCategory={selectedCategory}
          uniqueCategories={uniqueCategories}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
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

function FilterButtons({
  categories,
  selectedCategory,
  uniqueCategories,
  setSelectedCategory,
}) {
  return (
    <>
      {useMediaQuery('(max-width: 768px)') ? (
        <div className="col-span-full">
          <Swiper spaceBetween={'16'} slidesPerView={2.8}>
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
                  {category.title}
                </FilterButton>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <>
          <FilterButton
            className="w-full gap-6 border-r border-grå [&:nth-child(6)]:border-r-0 [&:nth-child(12)]:border-r-0 [&:nth-child(18)]:border-r-0 [&:nth-child(24)]:border-r-0 [&:nth-child(30)]:border-r-0 relative space-y-5"
            icon="map"
            category="all"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          >
            Udforsk alle
          </FilterButton>
          {uniqueCategories.map((category, index) => (
            <FilterButton
              className="w-full gap-6 border-r border-grå [&:nth-child(6)]:border-r-0 [&:nth-child(12)]:border-r-0 [&:nth-child(18)]:border-r-0 [&:nth-child(24)]:border-r-0 [&:nth-child(30)]:border-r-0 relative space-y-5"
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
    </>
  )
}

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
