// ./schemas/innerBlocks.js

import { defineArrayMember, defineType } from 'sanity'
import PageBuilderInput from '@/components/sanity/PageBuilderInput'

export const innerBlocks = defineType({
  name: 'innerBlocks',
  type: 'array',
  title: 'Inner blocks',
  components: {
    input: PageBuilderInput,
  },
  options: {
    sortable: true,
  },
  of: [
    defineArrayMember({
      name: 'accordion',
      type: 'accordion',
    }),
    defineArrayMember({
      name: 'heading',
      type: 'heading',
    }),
    defineArrayMember({
      name: 'textBlock',
      type: 'textBlock',
    }),
    defineArrayMember({
      name: 'button',
      type: 'button',
    }),
  ],
})
