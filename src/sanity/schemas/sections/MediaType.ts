import { ImageRectangle } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const MediaType = defineType({
  name: 'MediaType',
  type: 'object',
  icon: ImageRectangle,
  description: 'En medie blok til billeder og video.',
  title: 'Medie',
  groups: [
    { title: 'Medie', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    {
      group: 'media',
      name: 'MediaObject',
      title: 'Medie',
      type: 'MediaObject',
    },

    /* Design */
    {
      name: 'design',
      type: 'design',
      group: 'design',
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
      title: 'select',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title:
          title === 'image' ? 'Billede' : title === 'video' ? 'Video' : 'Vimeo',
        media,
      }
    },
  },
})
