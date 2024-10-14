import { defineField, defineType } from "sanity";
import { TextIcon } from "@/components/sanity/PageBuilderIcons";

export const textContainerType = defineType({
  name: "textContainer",
  type: "object",
  icon: TextIcon,
  title: "Indholdsblok",
  groups: [
    { title: "Indhold", name: "content" },
    { title: "Design", name: "design" },
    {title: 'indstillinger', name: 'settings'}
  ],
  fields: [
    defineField({
      name: "innerBlocks",
      type: "innerBlocks",
      title: "Indhold",
      group: "content",
    }),
    {
      name: "design",
      type: "design",
      group: "design",
    },

    {
          group: 'settings',
          name: 'SectionSettings',
          title: 'Indstillinger',
          type: 'SectionSettings'
        }
  ],
  preview: {
    select: {
      title: "title.heading",
      tagline: "tagline",
      type: "type",
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Indholdsblok",
        type: "Indholdsblok",
        subtitle: "Indholdsblok",
        media,
      };
    },
  },
});
