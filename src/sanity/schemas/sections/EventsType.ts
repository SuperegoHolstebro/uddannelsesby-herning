import { defineArrayMember, defineField, defineType } from 'sanity'
import { Calendar } from '@mynaui/icons-react'

export const EventType = defineType({
  name: 'EventType',
  title: 'Begivenheder',
  description: 'Viser en liste af begivenheder',
  type: 'object',
  icon: Calendar,
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'view',
      title: 'view',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Nyeste', value: 'newest' },
          { title: 'Alle', value: 'all' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'manual', // Set "public" as the default value
    }),
    {
      group: 'content',
      name: 'events',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'manual',
      validation: (Rule) => Rule.unique(),
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    },
    defineField({
      group: 'content',
      name: 'amount',
      type: 'number',
      hidden: ({ parent }) => parent?.view !== 'newest',
      title: 'Antal begivenheder',
      initialValue: 4,
    }),
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
      view: 'view',
    },
    prepare({  view }) {
      return {
        title: 'Begivenheder',
        subtitle: `${view === 'manual' ? 'Manuel' : view === 'newest' ? 'Nyeste' : 'Alle'} Visning`,
      }
    },
  },
})
