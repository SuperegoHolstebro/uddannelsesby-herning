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
import BannerWidget from '@/components/sanity/BannerWidget'
import NewsWidget from '@/components/sanity/NewsWidget'
import ProjectManagerWidget from '@/components/sanity/ProjectManagerWidget'
import SuperegoWidget from '@/components/sanity/SuperegoWidget'
import LinksWidget from '@/components/sanity/LinksWidget'
import { buildLegacyTheme } from 'sanity'
import { DocumentStatus } from '~/sanity/lib/sanity.badge'
import { CustomToolMenu } from '~/components/sanity/ToolMenu'
import Sidebar from '~/components/sanity/Sidebar.component'
import { createVisualAction } from '~/sanity/lib/sanity.actions'
import { DownloadAttendeesAction } from '~/utils/DownloadAttendeesAction'

const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3333'

const theme = _theme as import('sanity').StudioTheme

const props = {
  /* standard farver */
  '--my-blue': '#4285f4',
  '--my-red': '#db4437',
  '--my-yellow': '#f4b400',

  /* superego farver */
  '--my-dark': '#242B31',
  '--my-grey': '#5F727F',
  '--my-white': '#FCFCFC',
  '--my-grey-40': '#AFB7BD',
  '--my-grey-10': '#EFF1F2',
  '--my-green': '#3BE086',
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-dark'],
  '--white': props['--my-white'],

  '--gray': '#666',
  '--gray-base': '#666',

  '--component-bg': props['--my-white'],
  '--component-text-color': props['--my-dark'],

  /* Brand */
  '--brand-primary': props['--my-dark'],

  // Default button
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--my-dark'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],
  '--default-button-danger-color': props['--my-red'],

  /* State */
  '--state-info-color': props['--my-blue'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-yellow'],
  '--state-danger-color': props['--my-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-dark'],
  '--main-navigation-color--inverted': props['--my-white'],

  '--focus-color': props['--my-dark'],

  '--font-family-base': 'SuperSans, sans-serif',
})

export default defineConfig({
  basePath: '/super-login',
  name: 'project-name',
  title: 'Superweb Studio',
  subtitle: 'Superweb Studio',
  projectId,
  theme: myTheme,
  icon: SuperegoLogo,
  dataset,
  schema,
  studio: {
    components: {
      toolMenu: CustomToolMenu,
    },
  },
  plugins: [
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
