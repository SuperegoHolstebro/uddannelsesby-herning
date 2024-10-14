import { defineField, defineType } from 'sanity'
import { CallToActionIcon } from '@/components/sanity/PageBuilderIcons'

const CallToAction2 = defineType({
  name: 'CallToAction2',
  title: 'Call to action 2',
  icon: CallToActionIcon,
  description:
    'Call to actions er fremtrædende bokse eller knapper, der opfordrer brugeren til at udføre en bestemt handling, f.eks. at klikke videre på relaterede sider på hjemmesiden eller tage kontakt til Jer. Call to actions gør oplevelsen mere intuitiv og flydende for brugeren.',
  type: 'object',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      description:
        'Overskriften er det første, brugeren ser, og skal være kort og præcis. Den skal beskrive, hvad brugeren får ud af at klikke på knappen.',
    }),

    {
      name: 'links',
      title: 'Links',
      description: 'Tilføj op til 2 links',
      type: 'array',
      validation(rule) {
        return rule.required().min(1).max(2)
      },
      of: [
        {
          name: 'link',
          title: 'Link',
          type: 'link',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    /*     // link
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),

    // link
    defineField({
      name: 'link2',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }), */

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
      title: 'Call to action',
      amountofCTAs: 'callToActions',
      media: 'callToActions.0.image',
    },
    prepare({ title, amountofCTAs, media }) {
      return {
        title: 'Call to action',
        subtitle: `Antal ${Object.keys(amountofCTAs).length} Call to actions`,

        media: media,
      }
    },
  },
})

export { CallToAction2 }
