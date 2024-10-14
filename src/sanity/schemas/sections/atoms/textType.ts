import { defineField, defineType } from "sanity";
import { TextIcon } from "@/components/sanity/PageBuilderIcons";
export const textType = defineType({
  name: "textBlock",
  icon: TextIcon,
  type: "object",
  description: 'Tekstblokken anvendes til generel brødtekst, der giver brugeren den relevante information. Afsnittene anbefales at være kortfattede og opdelte med bl.a. overskrifter og medier.',
  title: "Brødtekst",
  fields: [
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: 'title.heading',
      tagline: 'tagline',
      type: 'type',
      media: 'image',
    },
    prepare({title, tagline, media}) {
      return {
        title: 'Brødtekst',
        type: 'Brødtekst',
        subtitle: 'Brødtekst',
        media,
      }
    },
  },
});
