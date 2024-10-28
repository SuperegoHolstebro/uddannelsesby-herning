import { defineField, defineType } from 'sanity'
import { ButtonIcon } from '@/components/sanity/PageBuilderIcons'
export const buttonType = defineType({
  name: 'button',
  icon: ButtonIcon,
  type: 'object',
  groups: [
    { title: 'Design', name: 'design' },
    { title: 'Indhold', name: 'content' },
  ],
  description:
    'Knappen er et visuelt iøjnefaldende link på hjemmesiden, og kan bruges til at udføre en specifik handling. F.eks. at føre brugeren videre til ny side.',
  title: 'Knap',
  fields: [
    defineField({
      description: 'Teksten der vises på knappen',
      group: 'content',
      name: 'link',
      title: 'Link',
      type: 'link',
    }),

    defineField({
      group: 'design',
      description: 'Vælg en stil for knappen',
      name: 'style',
      type: 'string',
      title: 'Stil',
      options: {
        layout: 'radio',
        list: [
          { title: 'Standard', value: 'default' },
          { title: 'Primær', value: 'primary' },
          { title: 'Sekundær', value: 'secondary' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'link.label',
      subtitle: 'style',
      url: 'link.url',
    },
    prepare({ title, subtitle, url }) {
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle: `${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)} | ${url}`,
      }
    },
  },
})
