// ./schemas/heroType.ts
import { PanelTop } from '@mynaui/icons-react'

import { defineField, defineType } from 'sanity'
import { HeroIcon } from '@/components/sanity/PageBuilderIcons'
export const heroType = defineType({
  name: 'hero',
  type: 'object',
  icon: PanelTop,
  groups: [
    { title: 'Media', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'Content', name: 'content' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  description: 'Øverste modul på forsiden.',
  title: 'Forside Hero',
  fields: [
    {
      group: 'media',
      name: 'Video',
      title: 'Baggrundsvideo',
      type: 'file',
    },
    {
      name: 'text',
      type: 'text',
      title: 'Tekst',
    },
    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: 'Afskrabende video',
        type: 'Hero',
        subtitle: 'Topbanner',
        media,
      }
    },
  },
})
