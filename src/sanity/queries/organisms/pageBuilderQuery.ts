import groq from 'groq'
import { ArticlesTypeQuery } from '@/sanity/queries/sections/ArticlesTypeQuery'
import { CallToActionQuery } from '@/sanity/queries/sections/CallToActionQuery'
import { CallToActionQuery2 } from '@/sanity/queries/sections/CallToActionQuery2'
import { ContactFormTypeQuery } from '@/sanity/queries/sections/ContactFormTypeQuery'
import { EmployeesTypeQuery } from '@/sanity/queries/sections/EmployeesTypeQuery'
import { EventTypeQuery } from '@/sanity/queries/sections/EventTypeQuery'
import { GalleryQuery } from '@/sanity/queries/sections/GalleryQuery'
import { LogoGalleryQuery } from '@/sanity/queries/sections/LogoGalleryQuery'
import { LogoGallery2Query } from '@/sanity/queries/sections/LogoGallery2Query'
import { heroQuery } from '@/sanity/queries/sections/HeroQuery'
import { textContainerQuery } from '@/sanity/queries/sections/textContainerQuery'
import { textWithIllustrationQuery } from '@/sanity/queries/sections/TextWithIllustrationQuery'
import { hero2Query } from '@/sanity/queries/sections/Hero2Query'
import { hero3Query } from '@/sanity/queries/sections/Hero3Query'

export const pageBuilderQuery = groq`
  pageBuilder[] {
    ${textWithIllustrationQuery},
    ${ArticlesTypeQuery},
    ${EventTypeQuery},
    ${ContactFormTypeQuery},
    ${heroQuery},
    ${hero2Query},
    ${hero3Query},
    ${textContainerQuery},
    ${CallToActionQuery},
    ${CallToActionQuery2},
    ${EmployeesTypeQuery},
    ${GalleryQuery},
    ${LogoGalleryQuery},
    ${LogoGallery2Query},
  }
`
