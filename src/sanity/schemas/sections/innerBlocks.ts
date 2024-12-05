// ./schemas/innerBlocks.js

import { defineArrayMember, defineType } from 'sanity'
import PageBuilderInput from '@/components/sanity/PageBuilderInput'
import { FileText } from '@mynaui/icons-react'

export const innerBlocks = defineType({
  name: 'innerBlocks',
  type: 'array',
  title: 'Inner blocks',
  icon: FileText,
  options: {
    sortable: true,
  },

  of: [
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
    defineArrayMember({
      name: 'accordion',
      type: 'accordion',
    }),
    defineArrayMember({
      name: 'DownloadsAndLinksType',
      type: 'DownloadsAndLinksType',
    }),
  ],
})
