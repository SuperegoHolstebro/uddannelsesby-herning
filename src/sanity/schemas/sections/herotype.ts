// ./schemas/heroType.ts

import { defineField, defineType } from 'sanity'
import { HeroIcon } from '@/components/sanity/PageBuilderIcons'
export const heroType = defineType({
  name: 'hero',
  type: 'object',
  icon: HeroIcon,
  groups: [
    { title: 'Media', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'Content', name: 'content' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  description: 'Øverste modul på forsiden.',
  title: 'Hero 1',
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
        title: title || 'Ingen titel',
        type: 'Hero',
        subtitle: 'Topbanner',
        media,
      }
    },
  },
})
