import { defineField, defineType } from 'sanity'

export const QuickLinks = defineType({
  name: 'QuickLinks',
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
})
