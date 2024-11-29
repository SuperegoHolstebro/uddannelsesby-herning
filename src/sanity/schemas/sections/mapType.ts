import { defineField, defineType } from 'sanity'
import { Map } from '@mynaui/icons-react'
import MapArrayInput from '@/components/sanity/MapArrayInput'
import { map } from 'rxjs'
export const mapType = defineType({
  name: 'mapType',
  type: 'object',
  icon: Map,
  title: 'Kort',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
    }),
    defineField({
      name: 'mapArrayField',
      title: 'Placeringer',
      type: 'array',
      of: [
        {
          name: 'placement',
          title: 'Placement',
          type: 'object',
          fields: [
            { name: 'x', type: 'number', title: 'X Position', readOnly: true },
            { name: 'y', type: 'number', title: 'Y Position', readOnly: true },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'category', type: 'string', title: 'Category' },
            { name: 'icon', type: 'IconPicker', title: 'Icon' },
          ],
        },
      ],
      components: {
        input: MapArrayInput,
      },
    }),
  ],
  preview: {
    select: {
      mapArrayField: 'mapArrayField',
    },
    prepare(selection) {
      const { mapArrayField } = selection
      return {
        title: 'Kort',
        subtitle: mapArrayField
          ? `${mapArrayField.length} placeringer`
          : 'Ingen placeringer',
      }
    },
  },
})
