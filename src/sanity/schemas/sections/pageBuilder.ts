import { defineArrayMember, defineType } from 'sanity'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  type: 'array',
  title: 'Indhold',
  options: {
    sortable: true,
    layout: 'tags',
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        {
          name: 'grid',
        },
        { name: 'list' },
      ],
      groups: [
        {
          name: 'hero',
          title: 'Topbanner',
          of: ['hero', 'PageTitle'],
        },
        {
          name: 'gallery',
          title: 'Galleri',
          of: ['Gallery', 'LogoGallery', 'LogoGallery2'],
        },
        {
          name: 'content',
          title: 'Indhold',
          of: ['textWithIllustration', 'textContainer'],
        },
      ],
    },
  },
  of: [
    defineArrayMember({
      name: 'mapType',
      type: 'mapType',
    }),
    defineArrayMember({
      name: 'companiesType',
      type: 'companiesType',
    }),
    defineArrayMember({
      name: 'hero',
      type: 'hero',
    }),
    defineArrayMember({
      name: 'TextAndCollage',
      type: 'TextAndCollage',
    }),
    defineArrayMember({
      name: 'EmployeesType',
      type: 'EmployeesType',
    }),
    defineArrayMember({
      name: 'contactFormType',
      type: 'contactFormType',
    }),
    defineArrayMember({
      name: 'ArticlesType',
      type: 'ArticlesType',
    }),
    defineArrayMember({
      name: 'CallToAction2',
      type: 'CallToAction2',
    }),
    defineArrayMember({
      name: 'DiscountsType',
      type: 'DiscountsType',
    }),
    defineArrayMember({
      name: 'EventType',
      type: 'EventType',
    }),
    defineArrayMember({
      name: 'EventWithFilterType',
      type: 'EventWithFilterType',
    }),
    defineArrayMember({
      name: 'MediaType',
      type: 'MediaType',
    }),
    defineArrayMember({
      name: 'textWithIllustration',
      type: 'textWithIllustration',
    }),
    defineArrayMember({
      name: 'textContainer',
      type: 'textContainer',
    }),
    defineArrayMember({
      name: 'info',
      type: 'info',
    }),
    defineArrayMember({
      name: 'QuickLinks',
      type: 'QuickLinks',
    }),
    defineArrayMember({
      name: 'Quote',
      type: 'Quote',
    }),
    defineArrayMember({
      name: 'PageTitle',
      type: 'PageTitle',
    }),
    defineArrayMember({
      name: 'DownloadsAndLinksType',
      type: 'DownloadsAndLinksType',
    }),
  ],
})
