import { defineField, defineType } from 'sanity'
import IconPickerInput from '@/components/sanity/IconPickerInput'

export const IconPicker = defineType({
  title: 'Ikoner',
  name: 'IconPicker',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Ikoner',
      components: {
        input: IconPickerInput,
      },
      options: {
        layout: 'dropdown',
        list: [
          { title: 'Træ', value: 'tree' },
          { title: 'Bølge', value: 'wave' },
          { title: 'Kalender', value: 'calendar' },
          { title: 'Ur', value: 'clock' },
          { title: 'Vejskilt', value: 'streetSign' },
          { title: 'Billetter', value: 'tickets' },
          { title: 'Sport', value: 'sport' },
          { title: 'Palette', value: 'palette' },
          { title: 'Tavle', value: 'board' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Bar', value: 'bar' },
          { title: 'Fitness', value: 'fitness' },
          { title: 'Shopping', value: 'shopping' },
          { title: 'Kort', value: 'map' },
          { title: 'Bibliotek', value: 'bibliotek' },
          { title: 'Cafe', value: 'Cafe' },
          { title: 'Purchase', value: 'purchase' },
          { title: 'Coffee', value: 'coffee' },
          { title: 'Games', value: 'games' },
          { title: 'Transport', value: 'transport' },
          { title: 'Health', value: 'health' },
          { title: 'Link Arrow', value: 'linkArrow' },
          { title: 'House', value: 'house' },
        ],
      },
      initialValue: 'wave',
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
    },
    prepare(selection) {
      return {
        title: selection.icon.charAt(0).toUpperCase() + selection.icon.slice(1),
      }
    },
  },
})
