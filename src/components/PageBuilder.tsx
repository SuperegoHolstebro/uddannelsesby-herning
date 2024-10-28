import React from 'react'
import InnerBlocks from '@/components/molecules/InnerBlocks'
import ArticlesSection from '@/components/sections/ArticlesSection'
import CallToActionSection2 from './sections/CallToActionSection2'
import EventSection from '@/components/sections/EventSection'
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
import TextAndImage from './sections/TextAndImage'

const PageBuilder = ({ sections }) => {
  return (
    <React.Fragment>
      {sections?.map((section, index) => {
        switch (section?._type) {
          case 'EmployeesType':
            return <EmployeesSection key={index} section={section} />
          case 'CallToAction2':
            return <CallToActionSection2 key={index} section={section} />
          case 'hero':
            return (
              <React.Fragment key={index}>
                <Hero data={section} />
                <Breadcrumbs />
              </React.Fragment>
            )
          case 'TextAndImage':
            return <TextAndImage key={index} data={section} />
          case 'companiesType':
            return <Companies key={index} section={section} />
          case 'LogoGallery':
            return (
              <React.Fragment key={index}>
                <LogoGallery data={section} />
              </React.Fragment>
            )
          case 'LogoGallery2':
            return (
              <React.Fragment key={index}>
                <LogoGallery2 data={section} />
              </React.Fragment>
            )

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
          case 'textContainer':
            return (
              <React.Fragment key={index}>
                <TextContainer
                  paddingTop={section?.design?.padding?.spacingTop}
                  paddingBottom={section?.design?.padding?.spacingBottom}
                  variant={section?.design?.color?.color}
                >
                  <InnerBlocks blocks={section.innerBlocks} />
                </TextContainer>
              </React.Fragment>
            )
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
