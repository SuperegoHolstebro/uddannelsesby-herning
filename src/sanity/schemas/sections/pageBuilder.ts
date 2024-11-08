import { defineArrayMember, defineType } from 'sanity'
import PageBuilderInput from '@/components/sanity/PageBuilderInput'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  type: 'array',
  title: 'Indhold',
  components: {
    input: PageBuilderInput,
  },
  options: {
    sortable: true,
  },
  of: [
    defineArrayMember({
      name: 'companiesType',
      type: 'companiesType',
    }),
    defineArrayMember({
      name: 'hero',
      type: 'hero',
    }),
    defineArrayMember({
      name: 'TextAndImage',
      type: 'TextAndImage',
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
      name: 'EventType',
      type: 'EventType',
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
  ],
})
