import React from 'react'
import ArticlesSection from '@/components/sections/ArticlesSection'
import CallToActionSection2 from './sections/CallToActionSection2'
import EventSection from '@/components/sections/EventSection'
import EventWithFilter from '@/components/sections/EventWithFilter'
import DiscountsSection from '@/components/sections/DiscountsSection'
import GallerySection from '@/components/sections/GallerySection'
import Hero from '@/components/sections/HeroSection'
import MediaSection from '@/components/sections/MediaSection'
import TextWithIllustration from '@/components/sections/TextWithIllustration'
import EmployeesSection from './sections/EmployeesSection'
import TextContainer from './sections/textContainer'
import LogoGallery from './sections/LogoGallery'
import LogoGallery2 from './sections/LogoGallery2'
import ContactFormSection from './sections/ContactFormSection'
import Companies from './sections/Companies'
import TextAndCollage from './sections/TextAndCollage'
import Info from './sections/Info'
import QuickLinks from './sections/QuickLinks'
import Quote from './sections/Quote'
import PageTitle from './sections/PageTitle'
import DownloadsAndLinks from './sections/DownloadsAndLinks'
import Map from './sections/Map'
import Program from './sections/program'
import Schools from './sections/schools'
import LogoBand from './sections/LogoBand'
import Experiences from './sections/Experiences'
import { PageBuilderTypes } from '~/types/PageBuilder.types'

const PageBuilder = ({ sections, locale }: PageBuilderTypes) => {
  return (
    <React.Fragment>
      {sections?.map((section, index) => {
        switch (section?._type) {
          case 'EmployeesType':
            return <EmployeesSection key={index} section={section} />
          case 'CallToAction2':
            return <CallToActionSection2 key={index} section={section} />
          case 'mapType':
            return <Map data={section} key={index} />
          case 'hero':
            return <Hero data={section} key={index} />
          case 'TextAndCollage':
            return <TextAndCollage key={index} data={section} />
          case 'companiesType':
            return <Companies locale={locale} key={index} section={section} />
          case 'logoband':
            return <LogoBand key={index} data={section} />
          case 'experienceType':
            return (
              <Experiences
                amount={section.amount}
                section={section}
                key={index}
              />
            )
          case 'info':
            return <Info data={section} key={index} />
          case 'QuickLinks':
            return <QuickLinks data={section} key={index} />
          case 'Quote':
            return <Quote key={index} section={section} />
          case 'PageTitle':
            return <PageTitle key={index} data={section} />
          case 'LogoGallery':
            return <LogoGallery data={section} key={index} />
          case 'LogoGallery2':
            return <LogoGallery2 data={section} key={index} />
          case 'DownloadsAndLinksType':
            return <DownloadsAndLinks key={index} data={section} />

          case 'textWithIllustration':
            return <TextWithIllustration key={index} data={section} />
          case 'contactFormType':
            return <ContactFormSection key={index} data={section} />
          case 'Gallery':
            return <GallerySection key={index} section={section} />
          case 'ArticlesType':
            return (
              <ArticlesSection
                key={index}
                section={section}
                amount={section.amount}
              />
            )
          case 'SchoolsType':
            return <Schools key={index} data={section} />
          case 'EventType':
            return (
              <EventSection
                amount={section.amount}
                section={section}
                key={index}
              />
            )
          case 'EventWithFilterType':
            return <EventWithFilter section={section} key={index} />

          case 'DiscountsType':
            return (
              <DiscountsSection locale={locale} key={index} section={section} />
            )
          case 'programType':
            return <Program key={index} data={section} />
          case 'textContainer':
            return <TextContainer key={index} data={section} />
          case 'MediaType':
            return <MediaSection key={index} data={section} />

          default:
            return null
        }
      })}
    </React.Fragment>
  )
}

export default PageBuilder
