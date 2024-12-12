'use client'
import 'swiper/css'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import { AdvancedButton } from '../atoms/AdvancedButton'
import Icon from '../atoms/Icons'
import { useSwiperSlide } from 'swiper/react'
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
  hideNavigation?: boolean
  children: any
  loop?: boolean
  centeredSlidesBounds?: boolean
  centeredSlides?: boolean
  breakpoints?: {
    0?: {
      slidesPerView: number
      spaceBetween: number
    }
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

const Carousel = ({
  spaceBetween,
  slidesPerView = 1.2,
  loop = true,
  centeredSlidesBounds = true,
  centeredSlides = true,
  breakpoints,
  hideNavigation = false,
  children,
  ...props
}: CarouselProps) => {
  const swiperRef = useRef(null)
  const swiperSlide = useSwiperSlide() || {}
  return (
    <>
      <div className="relative col-span-full">
        <Swiper
          {...props}
          ref={swiperRef}
          spaceBetween={spaceBetween || '24'}
          slidesPerView={slidesPerView}
          loop={loop}
          centeredSlidesBounds={centeredSlidesBounds}
          breakpoints={breakpoints}
          centeredSlides={centeredSlides}
          onSwiper={(swiper) => console.log(swiper)}
          className="!overflow-visible transition-all event-cards !overflow-x-clip"
        >
          {children.map((child, index) => (
            <SwiperSlide className="hover:z-50" key={index}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
        {!hideNavigation && <CarouselNavigation swiperRef={swiperRef} />}
      </div>
    </>
  )
}

export default Carousel
