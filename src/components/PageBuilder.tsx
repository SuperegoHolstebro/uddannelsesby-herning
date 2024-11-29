import React from 'react'
import InnerBlocks from '@/components/molecules/InnerBlocks'
import ArticlesSection from '@/components/sections/ArticlesSection'
import CallToActionSection2 from './sections/CallToActionSection2'
import EventSection from '@/components/sections/EventSection'
import EventWithFilter from '@/components/sections/EventWithFilter'
import GallerySection from '@/components/sections/GallerySection'
import Hero from '@/components/sections/HeroSection'
import Media from '@/components/sections/MediaSection'
import TextWithIllustration from '@/components/sections/TextWithIllustration'
import EmployeesSection from './sections/EmployeesSection'
import Breadcrumbs from './molecules/Breadcrumbs'
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

const PageBuilder = ({ sections }) => {
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
            return (
              <React.Fragment key={index}>
                <Hero data={section} />
                <Breadcrumbs />
              </React.Fragment>
            )
          case 'TextAndCollage':
            return <TextAndCollage key={index} data={section} />
          case 'companiesType':
            return <Companies key={index} section={section} />
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

          case 'textContainer':
            return <TextContainer key={index} data={section} />
          case 'MediaType':
            return <Media key={index} data={section} index={undefined} />

          default:
            return null
        }
      })}
    </React.Fragment>
  )
}

export default PageBuilder
