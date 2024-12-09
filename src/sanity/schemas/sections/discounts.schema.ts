import { defineField, defineType } from 'sanity'
import { Sparkles } from '@mynaui/icons-react'
export const DiscountsType = defineType({
  name: 'DiscountsType',
  icon: Sparkles,
  title: 'Studierabatter',
  description: 'Viser en liste af studierabatter',
  type: 'object',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'design',
      type: 'design',
      title: 'Design',
    }),
    defineField({
      // group: "settings",
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
})
