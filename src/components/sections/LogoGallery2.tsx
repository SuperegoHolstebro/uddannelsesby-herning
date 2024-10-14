'use client'
import 'swiper/css'
import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import { Swiper, SwiperSlide } from 'swiper/react'
import { clean } from '~/utils/sanitize'

const LogoGallery2 = ({ data }) => {
  return (
    <Section 
    className="bg-green"
    id={clean(data?.SectionSettings?.anchor?.current)}
    paddingTop={clean(data?.design?.padding?.spacingTop)}
    paddingBottom={clean(data?.design?.padding?.spacingBottom)}
>
      <div className="col-span-full">
        <Heading size="h2" className="mb-4">
          {data.title}
        </Heading>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 bg-white shadow-lg rounded-2xl col-span-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:p-12 md:flex-row">
        <Swiper
          className="!w-full col-span-full"
          slidesPerView={1}
          loop={true}
          spaceBetween={32}
          onAutoplay={(swiper) => {
            swiper.autoplay.start()
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            428: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            12080: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1920: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            2500: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {data.images.map((image, index) => (
            <SwiperSlide className="" key={index}>
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  width={300}
                  height={300}
                  src={image.asset.url}
                  alt={image.alt || ''}
                  className="object-cover mx-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  )
}

export default LogoGallery2
