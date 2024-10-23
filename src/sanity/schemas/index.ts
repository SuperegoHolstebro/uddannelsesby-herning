export { requiredLinkField } from '@/sanity/schemas/customFields/LinkField/helpers/requiredLinkField' //./helpers/requiredLinkField
export {
  isCustomLink,
  isEmailLink,
  isExternalLink,
  isInternalLink,
  isPhoneLink,
} from '@/sanity/schemas/customFields/LinkField/helpers/typeGuards' // ./helpers/typeGuards
export { linkField } from '@/sanity/schemas/customFields/LinkField/linkField' // ./linkField
export type {
  CustomizableLink,
  CustomLink,
  CustomLinkType,
  CustomLinkTypeOptions,
  EmailLink,
  ExternalLink,
  InternalLink,
  LinkFieldOptions,
  LinkFieldPluginOptions,
  LinkInputProps,
  LinkSchemaType,
  LinkType,
  LinkValue,
  PhoneLink,
} from '@/sanity/schemas/customFields/LinkField/Types'
import { SchemaTypeDefinition } from 'sanity'
import { IconPicker } from '@/sanity/schemas/sections/atoms/IconPickerInput'
import blockContent from '@/sanity/schemas/blockContent'
import { reusable } from '@/sanity/schemas/reusable'
import category from '@/sanity/schemas/management/category'
import employee from '@/sanity/schemas/management/employee'
import position from '@/sanity/schemas/management/position'
import article from '@/sanity/schemas/documents/article'
import event from '@/sanity/schemas/documents/event'
import page from '@/sanity/schemas/documents/page-document'
import { ArticlesType } from '@/sanity/schemas/sections/ArticlesType'
import { accordionType } from '@/sanity/schemas/sections/atoms/accordionType'
import { buttonType } from '@/sanity/schemas/sections/atoms/ButtonType'
import { figureType } from '@/sanity/schemas/sections/atoms/figureType'
import { headingType } from '@/sanity/schemas/sections/atoms/headingType'
import { textType } from '@/sanity/schemas/sections/atoms/textType'
import { CallToAction } from '@/sanity/schemas/sections/callToAction'
import { CallToAction2 } from '@/sanity/schemas/sections/CallToAction2'
import { contactFormType } from '@/sanity/schemas/sections/contactForm'
import { EmployeesType } from '@/sanity/schemas/sections/EmployeesType'
import { EventType } from '@/sanity/schemas/sections/EventsType'
import { formType } from '@/sanity/schemas/sections/formType'
import { Gallery } from '@/sanity/schemas/sections/GalleryType'
import { LogoGallery } from '@/sanity/schemas/sections/LogoGalleryType'
import { LogoGallery2 } from '@/sanity/schemas/sections/LogoGallery2Type'
import { ReusableSectionType } from '@/sanity/schemas/sections/ReusableSection'
import { innerBlocks } from '@/sanity/schemas/sections/innerBlocks'
import { MediaType } from '@/sanity/schemas/sections/MediaType'
import { pageBuilder } from '@/sanity/schemas/sections/pageBuilder'
import { Color } from '@/sanity/schemas/sections/settings/Color'
import { Design } from '@/sanity/schemas/sections/settings/Design'
import { Media } from '@/sanity/schemas/sections/settings/Media'
import { Padding } from '@/sanity/schemas/sections/settings/Padding'
import { SectionSettings } from '@/sanity/schemas/sections/settings/SectionSettings'
import { Seo } from '@/sanity/schemas/sections/settings/Seo'
import { textContainerType } from '@/sanity/schemas/sections/textContainerType'
import { textWithIllustration } from '@/sanity/schemas/sections/textWithIllustration'
import { videoType } from '@/sanity/schemas/sections/videoType'
import footer from '@/sanity/schemas/settings/footer'
import navigation from '@/sanity/schemas/settings/navigation'
import settings from '@/sanity/schemas/settings/settings'
import redirects from './settings/redirects'
import { heroType } from '@/sanity/schemas/sections/herotype'
import { MediaObject } from './sections/atoms/MediaObject'
import { companiesType } from './sections/companies'
import company from './documents/company'
import companyLogin from './documents/companyLogin'
import field from './management/field'
export const schemaTypes = [
  heroType,
  textWithIllustration,
  formType,
  videoType,
  textContainerType,
  EmployeesType,
  blockContent,
  companiesType,
  contactFormType,
  EventType,
  ArticlesType,
  Gallery,
  LogoGallery,
  LogoGallery2,
  MediaType,
  CallToAction,
  CallToAction2,
  IconPicker,
  ReusableSectionType,
  // atoms
  figureType,
  headingType,
  accordionType,
  MediaObject,
  textType,
  buttonType,
  // Settings Sections
  Design,
  Media,
  pageBuilder,
  innerBlocks,
  Padding,
  Color,
  Seo,
  SectionSettings,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Pages
    reusable,
    page,
    event,
    article,
    companiesType,
    company,
    companyLogin,
    field,
    // Management
    settings,
    redirects,
    footer,
    navigation,
    position,
    heroType,
    employee,
    category,
    // Objects
    blockContent,
    Gallery,
    LogoGallery,
    LogoGallery2,
    CallToAction,
    CallToAction2,
    ArticlesType,
    IconPicker,
    textWithIllustration,
    formType,
    videoType,
    textContainerType,
    EmployeesType,
    contactFormType,
    EventType,
    MediaType,
    ReusableSectionType,
    // Atoms
    figureType,
    headingType,
    accordionType,
    MediaObject,
    textType,
    buttonType,
    /*  */
    pageBuilder,
    Design,
    Seo,
    Media,
    Padding,
    Color,
    innerBlocks,
    SectionSettings,
  ],
}
