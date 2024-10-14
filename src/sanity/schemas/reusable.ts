// ./schemas/pageType.ts

import { defineField, defineType} from 'sanity'

export const reusable = defineType({
  name: 'reusable',
  type: 'document',
  title: 'Forside',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: "Indhold",
      description: 'Indholdet på siden (Sectioner / Blokke)',
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),
  ],
})

