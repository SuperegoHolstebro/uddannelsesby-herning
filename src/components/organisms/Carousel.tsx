"use client"
import 'swiper/css'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import { AdvancedButton } from '../atoms/AdvancedButton'
import Icon from '../atoms/Icons'
import CarouselNavigation from '../atoms/CarouselNavigation'

/**
 *
 * @returns: En sektion med galleri.
 * @example: <Carousel
        slidesPerView={1.2}
        loop={true}
        spaceBetween={32}
        breakpoints={{
          428: {
            slidesPerView: 1.08,
            spaceBetween: 20,
          },
        }}
      > </Carousel>
 * @alias: GallerySection
 * @module: components/sections/GallerySection
 * @summary: Denne komponent bruges til at oprette en ny sektion med galleri.
 * @see: src/components/sections/GallerySection.tsx
 * @version: 2.0.0
 * @property: [sectiom]
 * @author: Kasper Buchholtz
 *
 **/

interface CarouselProps extends SwiperOptions {
  spaceBetween?: number
  slidesPerView?: number
  children: any
  loop?: boolean
  breakpoints?: {
    428?: {
      slidesPerView: number
      spaceBetween: number
    }
    768?: {
      slidesPerView: number
      spaceBetween: number
    }
    1024?: {
      slidesPerView: number
      spaceBetween: number
    }
    1280?: {
      slidesPerView: number
      spaceBetween: number
    }
    1440?: {
      slidesPerView: number
      spaceBetween: number
    }
    1920?: {
      slidesPerView: number
      spaceBetween: number
    }
    2500?: {
      slidesPerView: number
      spaceBetween: number
    }
    [key: number]: {
      slidesPerView: number
      spaceBetween: number
    }

  }
}

const Carousel = ({ spaceBetween, slidesPerView, loop, breakpoints, children, ...props }: CarouselProps,) => {
  const swiperRef = useRef(null)
  return (
    <>
      <div className='relative col-span-full'>
        <Swiper
          {...props}
          ref={swiperRef}
          spaceBetween={spaceBetween}
          slidesPerView={1}
          loop={loop || false}
          breakpoints={breakpoints}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
        <CarouselNavigation swiperRef={swiperRef} />
      </div>
    </>
  )
}

export default Carousel