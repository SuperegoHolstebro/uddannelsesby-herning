import { defineField, defineType } from 'sanity'
import { Click } from '@mynaui/icons-react'

const CallToAction2 = defineType({
  name: 'CallToAction2',
  title: 'Call to action',
  icon: Click,
  description:
    'Call to actions er fremtrædende bokse eller knapper, der opfordrer brugeren til at udføre en bestemt handling, f.eks. at klikke videre på relaterede sider på hjemmesiden eller tage kontakt til Jer. Call to actions gør oplevelsen mere intuitiv og flydende for brugeren.',
  type: 'object',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
    { title: 'Medie', name: 'medie' },
  ],
  fields: [
    {
      group: 'medie',
      name: 'MediaObject',
      title: 'Medie',
      type: 'MediaObject',
    },
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
    }),

    defineField({
      name: 'link',
      title: 'Knap',
      type: 'link',
      validation: (Rule) => Rule.required(),
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
      title: 'heading',
      media: 'callToActions.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Call to action',
        subtitle: 'Call to action',
        media: media,
      }
    },
  },
})

export { CallToAction2 }
