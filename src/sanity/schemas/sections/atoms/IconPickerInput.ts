import { defineField, defineType } from 'sanity';
import IconPickerInput from '@/components/sanity/IconPickerInput';

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
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'Github', value: 'github' },
          { title: 'Google', value: 'google' },
          { title: 'Youtube', value: 'youtube' },
          { title: 'Apple', value: 'apple' },
          { title: 'Snapchat', value: 'snapchat' },
          { title: 'Pinterest', value: 'pinterest' },
          { title: 'Figma', value: 'figma' },
          { title: 'Dribble', value: 'dribble' },
          { title: 'Reddit', value: 'reddit' },
          { title: 'Discord', value: 'discord' },
          { title: 'Tiktok', value: 'tiktok' },
          { title: 'Clubhouse', value: 'clubhouse' },
          { title: 'Slack', value: 'slack' },
        ],
      },
      initialValue: 'facebook',
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
    },
    prepare(selection) {
      return {
        title: selection.icon.charAt(0).toUpperCase() + selection.icon.slice(1),
      };
    },
  },
});