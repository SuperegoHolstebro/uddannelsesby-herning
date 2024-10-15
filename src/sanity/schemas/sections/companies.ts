import { defineField, defineType } from 'sanity'
import { Store } from '@mynaui/icons-react'
export const companiesType = defineType({
  name: 'companiesType',
  icon: Store,
  title: 'Virksomheder',
  description: 'Viser en liste af virksomheder',
  type: 'object',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'heading',
      type: 'string',
    }),
    defineField({
      group: 'content',
      name: 'view',
      title: 'view',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Alle', value: 'all' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'manual', // Set "public" as the default value
    }),
    {
      group: 'content',
      name: 'companies',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'manual',
      of: [{ type: 'reference', to: [{ type: 'company' }] }],
    },
    {
      name: 'design',
      type: 'design',
      group: 'content',
    },
    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
})
