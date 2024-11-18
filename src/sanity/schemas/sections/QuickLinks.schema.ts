import { defineField, defineType } from 'sanity'
import { Link } from '@mynaui/icons-react'

export const QuickLinks = defineType({
  name: 'QuickLinks',
  icon: Link,
  title: 'Hurtig-links',
  description:
    'Call to actions er fremtrædende bokse eller knapper, der opfordrer brugeren til at udføre en bestemt handling, f.eks. at klikke videre på relaterede sider på hjemmesiden eller tage kontakt til Jer. Call to actions gør oplevelsen mere intuitiv og flydende for brugeren.',
  type: 'object',

  fields: [
    defineField({
      name: 'quickLinks',
      type: 'array',
      of: [{ type: 'link', name: 'link' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      amount: 'quickLinks',
      icon: 'icon',
    },
    prepare(selection) {
      return {
        title: 'Hurtig links',
        subtitle: `Antal: ${selection.amount.length}` || 'Ingen hurtig links',
        media: selection.icon,
      }
    },
  },
})
