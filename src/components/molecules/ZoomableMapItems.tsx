'use client'
import 'swiper/css/grid'
import React from 'react'
import Carousel from '../organisms/Carousel'
import Icon from '../atoms/Icons'
import { useMediaQuery } from '~/hooks/useMediaQuery'
import { Grid } from 'swiper/modules'

const ZoomableMapItems = ({ data }) => {
  const uniqueCategories = data.categoriesInUse.filter(
    (category, index, self) =>
      index ===
      self.findIndex(
        (t) => t?.title === category?.title && t?.icon === category?.icon,
      ),
  )

  return (
    <>
      {useMediaQuery('(max-width: 768px)') ? (
        <ul className="col-span-full">
          <Carousel
            grid={{
              rows: 3,
              fill: 'row',
            }}
            modules={[Grid]}
            centeredSlides={false}
            loop={false}
            hideNavigation
            breakpoints={{
              '0': {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              '428': {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              '768': {
                slidesPerView: 1,
                spaceBetween: 16,
              },
            }}
          >
            {uniqueCategories.map((category, index) => (
              <li key={index} className="flex w-full gap-6">
                <Icon className="size-8" type={category?.icon} />
                {category?.title}
              </li>
            ))}
          </Carousel>
        </ul>
      ) : (
        <ul className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 col-span-full">
          {uniqueCategories.map((category, index) => (
            <li
              key={index}
              className="flex items-center w-full gap-6 border-r border-grå [&:nth-child(6)]:border-r-0 [&:nth-child(12)]:border-r-0 [&:nth-child(18)]:border-r-0 [&:nth-child(24)]:border-r-0 [&:nth-child(30)]:border-r-0"
            >
              <Icon className="size-8" type={category?.icon} />
              {category?.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default ZoomableMapItems
