'use client'
import { daDKLocale } from '@sanity/locale-da-dk'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { apiVersion, dataset, projectId } from '@/sanity/lib/sanity.api'
import { schema } from '@/sanity/schemas'
import { linkField } from '~/sanity/schemas/customFields/LinkField/linkField'
import { theme as _theme } from './theme'
import { structure } from './src/sanity/structure'
import * as resolve from '@/sanity/lib/sanity.resolve'
import { presentationTool } from 'sanity/presentation'
import '@/styles/global.css'
import SuperegoLogo from '@/components/sanity/SuperegoLogo'
import { dashboardTool } from '@sanity/dashboard'
import HeroWidget from '@/components/sanity/HeroWidget'
import NewsWidget from '@/components/sanity/NewsWidget'
import ProjectManagerWidget from '@/components/sanity/ProjectManagerWidget'
import SuperegoWidget from '@/components/sanity/SuperegoWidget'
import LinksWidget from '@/components/sanity/LinksWidget'
import { DocumentStatus } from '~/sanity/lib/sanity.badge'
import { CustomToolMenu } from '~/components/sanity/ToolMenu'
import { createVisualAction } from '~/sanity/lib/sanity.actions'
import { DownloadAttendeesAction } from '~/utils/DownloadAttendeesAction'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'
import { CreateCompanyLoginAction } from '~/sanity/actions/createCompanyLogin.action'
import { GoToCompanyLoginAction } from '~/sanity/actions/goToCompantLogin.action'
import { documentInternationalization } from '@sanity/document-internationalization'
import Appconfig from './config'
import { SendEmailToCompanyAction } from '~/sanity/actions/SendEmailToCompany'

const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3333'

export default defineConfig({
  basePath: '/super-login',
  name: 'UddannelsesbyHerning',
  title: 'Superweb Studio',
  subtitle: 'Superweb Studio',
  projectId,
  icon: SuperegoLogo,
  dataset,
  schema,
  studio: {
    components: {
      toolMenu: CustomToolMenu,
    },
  },
  plugins: [
    documentInternationalization({
      // Required configuration
      supportedLanguages: [...Appconfig.i18n.locales],
      schemaTypes: [
        'page',
        'navigation',
        'footer',
        'settings',
        'article',
        'school',
      ],
      languageField: 'locale',
    }),

    imageHotspotArrayPlugin(),
    dashboardTool({
      title: 'Startside',
      widgets: [
        {
          name: 'HeroWidget',
          component: HeroWidget,
          layout: { width: 'full' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
        {
          name: 'links',
          component: LinksWidget,
          layout: { width: 'auto', height: 'large' },
        },
        {
          name: 'NewsWidget',
          component: NewsWidget,
          layout: { width: 'medium', height: 'large' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
        {
          name: 'ProjectManagerWidget',
          component: ProjectManagerWidget,
          layout: { width: 'medium', height: 'medium' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
        {
          name: 'SuperegoWidget',
          component: SuperegoWidget,
          layout: { width: 'medium', height: 'auto' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
      ],
    }),
    structureTool({ structure, title: 'Indhold' }),
    presentationTool({
      resolve,
      /*  components: {
        unstable_navigator: {
          component: Sidebar,
          maxWidth: 350,
          minWidth: 150,
        },
      }, */
      title: 'Visuel redigering',
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    media(),
    visionTool({ defaultApiVersion: apiVersion, title: 'Udviklingsværktøj' }),
    daDKLocale({ title: 'Dansk' }),
    unsplashImageAsset(),
    linkField(),
  ],
  document: {
    actions: (prev, context) => {
      // Include the custom DownloadAttendeesAction for event documents
      if (context.schemaType === 'event') {
        return [...prev, DownloadAttendeesAction] // Add the custom action
      }

      if (context.schemaType === 'company') {
        return [
          ...prev,
          CreateCompanyLoginAction,
          GoToCompanyLoginAction,
          SendEmailToCompanyAction,
        ]
      }

      return prev.map((originalAction) =>
        originalAction.action === 'publish'
          ? createVisualAction(originalAction)
          : originalAction,
      )
    },
    badges: (prev, context) => {
      if (
        context.schemaType === 'page' ||
        context.schemaType === 'article' ||
        context.schemaType === 'events'
      ) {
        return [DocumentStatus, ...prev]
      }
      return prev
    },
  },
})
