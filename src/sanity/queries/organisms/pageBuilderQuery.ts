import groq from 'groq'
import { ArticlesTypeQuery } from '@/sanity/queries/sections/ArticlesTypeQuery'
import { CallToActionQuery2 } from '@/sanity/queries/sections/CallToActionQuery2'
import { ContactFormTypeQuery } from '@/sanity/queries/sections/ContactFormTypeQuery'
import { EmployeesTypeQuery } from '@/sanity/queries/sections/EmployeesTypeQuery'
import { EventTypeQuery } from '@/sanity/queries/sections/EventTypeQuery'
import { EventWithFilterQuery } from '@/sanity/queries/sections/EventWithFilterQuery'
import { DiscountQuery } from '@/sanity/queries/sections/DiscountQuery'
import { GalleryQuery } from '@/sanity/queries/sections/GalleryQuery'
import { LogoGalleryQuery } from '@/sanity/queries/sections/LogoGalleryQuery'
import { LogoGallery2Query } from '@/sanity/queries/sections/LogoGallery2Query'
import { heroQuery } from '@/sanity/queries/sections/HeroQuery'
import { textContainerQuery } from '@/sanity/queries/sections/textContainerQuery'
import { textWithIllustrationQuery } from '@/sanity/queries/sections/TextWithIllustrationQuery'
import { companiesTypeQuery } from '../sections/companiesTypeQuery'
import { TextAndCollageQuery } from '../sections/TextAndCollage.query'
import { INFO_QUERY } from '../sections/InfoQuery'
import { QUICKLINKS_QUERY } from '../sections/QuickLinksQuery'
import { QUOTE_QUERY } from '../sections/QuoteQuery'
import { PAGETITLE_QUERY } from '../sections/PageTitleQuery'
import { DownloadsAndLinksQuery } from '../sections/DownloadsAndLinksQuery'
import { mapTypeQuery } from '../sections/mapType.query'
import { MediaTypeQuery } from '../sections/MediaType.query'
import { programType_QUERY } from '../sections/program.query'
import { SchoolsTypeQuery } from '../sections/SchoolsType.query'
import { LogoBandQuery } from '../sections/LogoBand.query'
import { experience_QUERY } from '../sections/Experiences.query'

export const pageBuilderQuery = groq`
  pageBuilder[] {
    ${textWithIllustrationQuery},
    ${mapTypeQuery},
    ${ArticlesTypeQuery},
    ${EventTypeQuery},
    ${EventWithFilterQuery},
    ${DiscountQuery},
    ${ContactFormTypeQuery},
    ${programType_QUERY},
    ${heroQuery},
    ${SchoolsTypeQuery},
    ${TextAndCollageQuery},
    ${textContainerQuery},
    ${LogoBandQuery},
    ${CallToActionQuery2},
    ${EmployeesTypeQuery},
    ${companiesTypeQuery},
    ${GalleryQuery},
    ${LogoGalleryQuery},
    ${LogoGallery2Query},
    ${INFO_QUERY},
    ${QUICKLINKS_QUERY},
    ${QUOTE_QUERY},
    ${PAGETITLE_QUERY},
    ${DownloadsAndLinksQuery},
    ${MediaTypeQuery},
    ${experience_QUERY}
  }
`
